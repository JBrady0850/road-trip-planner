"""Browser engine checks (app/js/engine.js) run in headless Chromium, no network.

Each case reproduces a planning weakness the draft builder must avoid."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = {"label": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "state": "Tennessee"}


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.goto(APP)
        yield pg
        b.close()


def draft(page, dest_id, nights, interests=("scenic", "parks", "food"), pace=None):
    return page.evaluate("""([destId, nights, interests, pace, home]) => {
        const p = RT.defaultProfile(); p.home = home; p.interests = interests;
        if (pace) RT.applyPace(p, pace);
        const dest = RT_CATALOG.find(d => d.id === destId);
        const trip = RT.draftTrip(p, dest, "2027-10-15", nights, RT_CATALOG);
        return { trip, findings: RT.checkTrip(trip, p), profile: p };
    }""", [dest_id, nights, list(interests), pace, HOME])


def test_default_draft_does_not_warn_about_its_own_check_in(page):
    r = draft(page, "tn-smokies", 4)
    checkin = [f for f in r["findings"] if f["check"] == "check-in"]
    assert checkin == [], f"the app's own draft warns about check-in: {checkin}"


def test_days_are_packed_before_any_day_is_left_free(page):
    r = draft(page, "tn-smokies", 4)
    days = r["trip"]["days"]
    middle = [len(d["stops"]) - 2 for d in days[1:-1]]  # sightseeing days, minus the hotel at each end
    free = [d for d in days if d["title"].startswith("Free day")]
    assert max(middle) >= 2, f"stops were spread one per day: {middle}"
    for d in free:
        assert d["stops"][-1]["notes"], "a free day lists nearby ideas"
    # free days come after the packed ones, never before
    titles = [d["title"].startswith("Free day") for d in days[1:-1]]
    assert titles == sorted(titles), f"free days should come last: {[d['title'] for d in days]}"


def test_relaxed_pace_takes_fewer_stops_a_day(page):
    relaxed = draft(page, "tn-smokies", 4, pace="relaxed")
    ground = draft(page, "tn-smokies", 4, pace="ground")
    per = lambda r: max(len(d["stops"]) - 2 for d in r["trip"]["days"][:-1])  # busiest day, hotel ends excluded
    assert per(relaxed) < per(ground)
    assert relaxed["profile"]["rules"]["maxDriveHours"] < ground["profile"]["rules"]["maxDriveHours"]


def test_comfort_presets_set_the_budget_fields_together(page):
    got = page.evaluate("""() => { const p = RT.defaultProfile(); RT.applyComfort(p, "comfort", 4);
        return [p.lodging.nightlyHigh, p.dining.foodPerDay, p.rules.budgetCap]; }""")
    economy = page.evaluate("""() => { const p = RT.defaultProfile(); RT.applyComfort(p, "economy", 4);
        return [p.lodging.nightlyHigh, p.dining.foodPerDay, p.rules.budgetCap]; }""")
    assert got[0] > economy[0] and got[1] > economy[1] and got[2] > economy[2]


def test_scores_come_with_a_plain_label_and_strongest_reason_first(page):
    recs = page.evaluate("""([home]) => { const p = RT.defaultProfile(); p.home = home; p.interests = ["scenic", "parks"];
        return RT.scoreDestinations(p, RT_CATALOG, 10, 4).slice(0, 3).map(r => ({ label: r.label, reasons: r.reasons, name: r.dest.name })); }""", [HOME])
    for r in recs:
        assert r["label"] in ("Great fit", "Good fit", "Possible", "Far for this trip", "Out of season", "Needs a flight"), r
        assert not any("(estimate)" in x for x in r["reasons"]), r["reasons"]
    assert recs[0]["label"] == "Great fit"


def test_nearby_destinations_fill_free_days(page):
    r = page.evaluate("""([home]) => { const p = RT.defaultProfile(); p.home = home; p.interests = ["scenic", "parks"];
        const dest = RT_CATALOG.find(d => d.id === "tn-smokies");
        const trip = RT.draftTrip(p, dest, "2027-10-15", 6, RT_CATALOG);
        const before = trip.days.filter(d => d.title.startsWith("Free day")).length;
        const near = RT.nearbyDestinations(trip, RT_CATALOG, p);
        const added = RT.fillFreeDays(trip, p, near[0]);
        const after = trip.days.filter(d => d.title.startsWith("Free day")).length;
        return { before, after, added, near: near.map(n => n.dest.name), states: trip.states }; }""", [HOME])
    assert r["before"] >= 1 and r["added"] >= 1 and r["after"] < r["before"], r
    assert r["near"], "nearby list is empty"


def test_choosing_a_state_ranks_that_states_cities_highest_first(page):
    r = page.evaluate("""([home]) => { const p = RT.defaultProfile(); p.home = home; p.interests = ["waterfalls", "hiking"];
        const recs = RT.scoreDestinations(p, RT_CATALOG, 10, 4, "NC");
        return recs.map(x => ({ rank: x.rank, city: x.city, states: x.dest.states, score: x.score,
            stops: x.stopsRanked.map(s => [s.name, s.hits]) })); }""", [HOME])
    assert r, "North Carolina has catalog cities"
    assert all("NC" in x["states"] for x in r), r
    assert [x["rank"] for x in r] == list(range(1, len(r) + 1))
    assert [x["score"] for x in r] == sorted((x["score"] for x in r), reverse=True)
    assert all(x["city"] for x in r)
    for x in r:  # stops inside each city come interest-matched first
        hits = [s[1] for s in x["stops"]]
        assert hits == sorted(hits, reverse=True), x
