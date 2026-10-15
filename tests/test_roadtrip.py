"""Offline tests. Each case reproduces a planning error the tool must catch."""
import copy
import json
from datetime import date
from pathlib import Path

import pytest

from roadtrip import check, export, links, trip as trip_mod
from roadtrip.routing import DayRoute, Leg
from roadtrip.sun import sunset

SAMPLE = Path(__file__).resolve().parents[1] / "examples" / "sample_trip.json"


def load_variant(tmp_path, mutate):
    raw = json.loads(SAMPLE.read_text(encoding="utf-8"))
    mutate(raw)
    p = tmp_path / "trip.json"
    p.write_text(json.dumps(raw), encoding="utf-8")
    return trip_mod.load(p)


def levels(findings, check_name):
    return [f.level for f in findings if f.check == check_name]


def test_sample_passes_offline_checks():
    t = trip_mod.load(SAMPLE)
    findings = check.check_trip(t)
    assert not [f for f in findings if f.level in ("ERROR", "WARN")]


def test_out_of_order_times_are_errors(tmp_path):
    def m(raw):
        raw["days"][0]["stops"][2]["arrive"] = "08:30"  # before leaving the previous stop
    t = load_variant(tmp_path, m)
    assert "ERROR" in levels(check.check_trip(t), "order")


def test_late_checkin_warns(tmp_path):
    def m(raw):
        raw["days"][0]["stops"][-1]["arrive"] = "17:30"
    t = load_variant(tmp_path, m)
    assert "WARN" in levels(check.check_trip(t), "check-in")


def test_drive_cap_and_travel_time_use_routes():
    t = trip_mod.load(SAMPLE)
    day = t.days[0]
    legs = [Leg(seconds=3 * 3600, meters=300_000) for _ in day.stops[1:]]
    routes = {day.date: DayRoute(legs=legs, geometry=[[-83.9, 35.9], [-83.3, 35.5]])}
    findings = check.check_trip(t, routes)
    assert "ERROR" in levels(findings, "drive cap")
    assert "ERROR" in levels(findings, "travel")


def test_timed_entry_margin(tmp_path):
    def m(raw):
        raw["days"][0]["stops"][1]["timed_entry"] = "09:15"
    t = load_variant(tmp_path, m)
    assert "WARN" in levels(check.check_trip(t), "tickets")


def test_continuity_between_days(tmp_path):
    def m(raw):
        raw["days"][1]["stops"][0]["address"] = "Somewhere Else, NC"
    t = load_variant(tmp_path, m)
    assert "WARN" in levels(check.check_trip(t), "continuity")


def test_after_sunset_warns(tmp_path):
    def m(raw):
        raw["days"][0]["stops"][-1]["arrive"] = "20:30"
        raw["trip"]["rules"]["checkin_window_minutes"] = 600
    t = load_variant(tmp_path, m)
    assert "WARN" in levels(check.check_trip(t), "sunset")


def test_sunset_is_plausible():
    ss = sunset(date(2026, 12, 19), 36.22, -81.66, "America/New_York")
    assert 17 <= ss.hour <= 17 and 0 <= ss.minute <= 30  # Boone, NC sets about 5:10 p.m.


def test_google_link_splits_over_nine_waypoints():
    stops = [trip_mod.Stop(name=f"S{i}", address=f"{i} Main St, Town, ST") for i in range(14)]
    legs = links.split_legs(stops)
    assert len(legs) == 2
    assert all(len(leg) <= links.MAX_WAYPOINTS + 2 for leg in legs)
    assert legs[0][-1] is legs[1][0]  # second leg starts where the first ended
    assert sum(len(leg) for leg in legs) - (len(legs) - 1) == len(stops)


def test_waze_uses_coordinates_or_search():
    with_coords = trip_mod.Stop(name="A", address="x", lat=35.1, lon=-83.2)
    no_coords = trip_mod.Stop(name="B", address="Dowdell's Knob, Pine Mountain, GA")
    assert links.waze_link(with_coords) == ("https://waze.com/ul?ll=35.1%2C-83.2&navigate=yes", False)
    url, search = links.waze_link(no_coords)
    assert search and "q=Dowdell%27s%20Knob" in url


def test_stop_list_numbers_run_in_travel_order():
    t = trip_mod.load(SAMPLE)
    md = export.stop_list_md(t)
    nums = [int(line.split("|")[1]) for line in md.splitlines() if line.startswith("| ") and line[2].isdigit()]
    assert nums == list(range(1, len(nums) + 1))
    # the overnight that starts Day 2 is not numbered twice
    assert len(nums) == sum(len(d.stops) for d in t.days) - (len(t.days) - 1)


def test_ics_has_one_event_per_timed_stop():
    t = trip_mod.load(SAMPLE)
    cal = export.ics(t)
    timed = sum(1 for _, _, s in t.all_stops() if s.arrive)
    assert cal.count("BEGIN:VEVENT") == timed
    assert "DTSTART:20271016T130000Z" in cal  # 9:00 a.m. EDT


def test_kml_is_single_linestring_without_folders():
    t = trip_mod.load(SAMPLE)
    route = DayRoute(legs=[Leg(60, 1000)], geometry=[[-83.92, 35.96], [-83.31, 35.48]])
    kml = export.route_kml(t, 0, route)
    assert kml.count("<LineString>") == 1 and "<Folder>" not in kml and "<MultiGeometry>" not in kml


def test_loads_trip_file_saved_by_app(tmp_path):
    app_file = {"format": "road-trip-planner/1", "rules": {"maxDriveHours": 6, "checkinTarget": "15:00"},
                "trip": {"name": "App Trip", "days": [{"date": "2027-05-01", "title": "Day", "stops": [
                    {"name": "Home", "address": "Knoxville, TN", "lat": 35.96, "lon": -83.92, "depart": "08:30", "arrive": ""},
                    {"name": "Hotel", "address": "Brevard, NC", "lat": "", "lon": "", "arrive": "15:10", "depart": "", "checkin": True}]}]}}
    p = tmp_path / "app.json"
    p.write_text(json.dumps(app_file), encoding="utf-8")
    t = trip_mod.load(p)
    assert t.rules["max_drive_hours"] == 6 and t.days[0].stops[1].lat is None and t.days[0].stops[1].checkin


def test_missing_address_is_rejected(tmp_path):
    def m(raw):
        del raw["days"][0]["stops"][1]["address"]
    with pytest.raises(ValueError):
        load_variant(tmp_path, m)
