"""Checks added after the v0.8.1 review of the Fix, Override, and Fix with AI buttons:
AI answers are checked field by field, cruise port days are never moved, the AI fix keeps
what the traveler had for the same place, override keys keep levels apart, a trip opened
during a lookup is left alone, one build runs at a time, the continuity fix keeps a real
first stop, the "too long" error goes away with the stop that caused it, a fix only counts
when the problem is gone, sunset uses the zone where the day ends, and a long drive that
stretches the trip is reported."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = {"label": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "state": "Tennessee"}
FAR = {"label": "Miami, FL", "lat": 25.7617, "lon": -80.1918, "state": "Florida"}
CORS = {"Access-Control-Allow-Origin": "*"}


def osrm(route):
    pts = [list(map(float, c.split(","))) for c in route.request.url.split("/driving/")[1].split("?")[0].split(";")]
    legs = []
    for a, b in zip(pts, pts[1:]):
        d = ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5 * 69
        legs.append({"duration": d / 45 * 3600, "distance": d * 1609})
    route.fulfill(json={"code": "Ok", "routes": [{"duration": sum(x["duration"] for x in legs), "legs": legs, "geometry": {"coordinates": pts}}]}, headers=CORS)


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.route("https://router.project-osrm.org/**", osrm)
        pg.route("https://nominatim.openstreetmap.org/**", lambda r: r.abort())
        pg.on("dialog", lambda d: d.accept())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {json.dumps(HOME)}")
        yield pg
        b.close()


def check(page):
    if not page.evaluate("document.querySelector('details.more.inline').open"):
        page.click("details.more.inline > summary")
    page.click("[data-act=check]")


def catalog_trip(page):
    page.evaluate("""() => { const p = RT.state.profile; p.interests = ["scenic", "parks"];
        RT.state.trip = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-06-11", 3, RT_CATALOG); RT.state.routes = {};
        const d = RT.state.trip.days[0]; d.stops[d.stops.length - 1].arrive = "11:00"; }""")
    page.click("#tabs [data-tab=interview]")
    page.click("#tabs [data-tab=trip]")


def answers(page, replies):
    calls = []

    def h(route):
        calls.append(json.loads(route.request.post_data))
        body = replies[min(len(calls) - 1, len(replies) - 1)]
        route.fulfill(json={"content": [{"type": "text", "text": json.dumps(body)}]}, headers=CORS)
    page.route("https://api.anthropic.com/**", h)
    page.evaluate("RT.state.profile.aiKey = 'test-key-not-real'")
    return calls


def test_a_badly_typed_ai_fix_answer_is_cleaned_and_the_app_survives_a_reload(page):
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    catalog_trip(page)
    t0 = page.evaluate("RT.state.trip")
    reply = {"name": 7, "states": "TN", "days": [{"title": d["title"], "stops": [{**s, "address": 1000 + i} for i, s in enumerate(d["stops"])]} for d in t0["days"]]}
    reply["days"][1]["stops"].insert(1, {"name": "Odd Place", "address": 12345, "lat": "35.70", "lon": -83.5, "arrive": "25:99",
                                         "depart": {"x": 1}, "minutes": "lots", "booking_url": "javascript:alert(1)", "checkin": "yes"})
    answers(page, [reply])
    check(page)
    page.click("[data-act=aiFix]")
    page.wait_for_function("() => !RT.state.busy && RT.state.trip.days[1].stops.some(s => s.name === 'Odd Place')", timeout=20000)
    t = page.evaluate("RT.state.trip")
    assert all(isinstance(s["address"], str) for d in t["days"] for s in d["stops"])
    odd = [s for d in t["days"] for s in d["stops"] if s["name"] == "Odd Place"][0]
    assert odd["address"] == "12345" and odd["lat"] == 35.7 and odd["booking_url"] == "" and odd["checkin"] is False and odd["minutes"] == 0, odd
    assert isinstance(t["name"], str)
    page.reload()
    page.click("#tabs [data-tab=trip]")
    assert "Odd Place" in page.inner_text("#view")
    assert not errors, errors


def test_a_malformed_ai_draft_gives_a_plain_error_and_keeps_the_trip(page):
    answers(page, [{"name": "X", "days": [{"date": "2099-05-01", "stops": {"a": 1}}, None]}])
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI][data-i='0']")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_function("() => document.querySelector('#toast').textContent.includes('without a start and an end')", timeout=20000)
    assert page.evaluate("RT.state.trip") is None


def test_cruise_port_days_get_no_time_fixes_and_the_ai_hears_about_the_ship(page):
    r = page.evaluate("""() => { const p = RT.state.profile; p.interests = ["history", "food", "scenic"];
        const port = RT_PORTS.find(x => x.id === "halifax"), o = { arrive: "10:00", depart: "22:00", buffer: 30, line: "" };
        const t = RT.portTrip(p, port, o, "2027-12-10", "driver"); t.days[0].tz = "America/Halifax"; RT.state.trip = t;
        const f = RT.checkTrip(t, p, {}).filter(x => x.level !== "INFO"), before = JSON.stringify(t.days);
        return { checks: f.map(x => x.check), labels: f.map(x => RT.quickFixLabel(t, x, p, {})), fixed: f.map(x => RT.quickFix(t, x, p, {})), same: before === JSON.stringify(t.days) }; }""")
    assert "sunset" in r["checks"], r
    assert not any(r["labels"]) and not any(r["fixed"]) and r["same"], r
    calls = answers(page, [{"days": []}])
    page.evaluate("() => RT.services.aiFix(RT.state.profile, RT.state.trip, RT.checkTrip(RT.state.trip, RT.state.profile, {}), {}).then(() => 1, e => e.message)")
    prompt = calls[0]["messages"][0]["content"]
    assert "cruise ship" in prompt and "be back aboard by 21:30" in prompt, prompt[:400]
    assert "starts at home" not in prompt and "self-drive" not in prompt


def test_the_ai_fix_keeps_timed_entries_links_and_marks_of_the_same_place(page):
    catalog_trip(page)
    page.evaluate("""() => { const s = RT.state.trip.days[1].stops[1]; s.timed_entry = "10:30"; s.booking_url = "https://tickets.example/1"; }""")
    t0 = page.evaluate("RT.state.trip")
    keep = t0["days"][1]["stops"][1]
    fixed = json.loads(json.dumps(t0))
    for d in fixed["days"]:
        for s in d["stops"]:
            s.pop("timed_entry", None)
            s.pop("booking_url", None)
    fixed["days"][1]["stops"][1]["address"] += " 37738"
    fixed["days"][0]["stops"][-1]["arrive"] = "15:00"
    calls = answers(page, [fixed])
    check(page)
    page.click("[data-act=aiFix]")
    page.wait_for_function("() => !RT.state.busy && RT.state.aiUndo", timeout=20000)
    s = page.evaluate("RT.state.trip.days[1].stops[1]")
    assert s["name"] == keep["name"]
    assert s["timed_entry"] == "10:30" and s["booking_url"] == "https://tickets.example/1", s
    assert s["address"] == keep["address"] and not s.get("ai"), s
    assert '"timed_entry":"10:30"' in calls[0]["messages"][0]["content"], "the AI sees the timed entry"


def test_override_keys_keep_levels_apart_and_overrides_stay_out_of_the_ai_request(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const day = { date: "2027-06-01", title: "Long", stops: [S("A", "A", 35, -84, { depart: "08:30" }), S("B", "B", 36, -84, { arrive: "15:00" })] };
        const trip = { days: [day] };
        const w = RT.checkTrip(trip, p, { "2027-06-01": { legs: [{ seconds: 6.7 * 3600, meters: 1 }] } }).find(f => f.check === "drive cap");
        trip.overrides = [RT.findingKey(w)];
        const e = RT.checkTrip(trip, p, { "2027-06-01": { legs: [{ seconds: 11 * 3600, meters: 1 }] } }).find(f => f.check === "drive cap");
        return { w: w.level, e: e.level, hidden: RT.isOverridden(trip, e) }; }""")
    assert r == {"w": "WARN", "e": "ERROR", "hidden": False}, r
    catalog_trip(page)
    page.evaluate("""() => { const t = RT.state.trip; t.days[1].stops[0] = RT.mkStop("Somewhere else", "9 Other Rd, Sevierville, TN", 35.87, -83.56, { depart: "08:30" }); }""")
    t0 = page.evaluate("RT.state.trip")
    calls = answers(page, [t0])
    check(page)
    page.locator(".finding.WARN:has-text('check-in') [data-act=override]").click()
    page.click("[data-act=aiFix]")
    page.wait_for_function("() => !RT.state.busy && RT.state.aiUndo", timeout=20000)
    probs = calls[0]["messages"][0]["content"].split("Problems found:")[1].split("Measured drive times")[0]
    assert "continuity" in probs and "check-in" not in probs, probs


def loaded_file(tmp_path):
    f = tmp_path / "loaded.json"
    f.write_text(json.dumps({"format": "road-trip-planner/1", "trip": {"name": "My Loaded Trip", "states": ["TN"], "days": [
        {"date": "2027-07-01", "title": "Day A", "stops": [
            {"name": "Home", "address": "Knoxville, TN", "lat": 35.96, "lon": -83.92, "type": "Home", "depart": "09:00"},
            {"name": "Park", "address": "1 Park Rd, Gatlinburg, TN", "lat": 35.7, "lon": -83.5, "arrive": "10:00", "depart": "12:00"},
            {"name": "Home", "address": "Knoxville, TN", "lat": 35.96, "lon": -83.92, "type": "Home", "arrive": "13:00"}]}]}}))
    return str(f)


def build_far_trip_with_slow_town_lookup(page):
    page.evaluate(f"RT.state.profile.home = {json.dumps(FAR)}")
    page.unroute("https://nominatim.openstreetmap.org/**")
    page.route("https://nominatim.openstreetmap.org/**", lambda r: r.fulfill(json={"address": {"city": "Macon", "state": "Georgia"}}, headers=CORS))
    page.evaluate("""() => { const o = RT.services.townAt; RT.services.townAt = async (a, b) => { await new Promise(r => setTimeout(r, 1500)); return o(a, b); }; }""")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    i = page.evaluate("id => RT.state.recs.findIndex(r => r.dest.id === id)", "ga-nc-waterfalls")
    page.locator(f"[data-act=build][data-i='{i}']").first.click()
    page.wait_for_function("() => RT.state.busy === 'Finding the overnight town…'", timeout=10000)


def test_opening_a_trip_during_the_town_lookup_leaves_it_alone(page, tmp_path):
    build_far_trip_with_slow_town_lookup(page)
    page.set_input_files("input[data-act=loadTrip]", loaded_file(tmp_path))
    page.wait_for_function("() => RT.state.trip && RT.state.trip.name === 'My Loaded Trip' && !RT.state.busy", timeout=10000)
    page.wait_for_timeout(2500)
    times = page.evaluate("RT.state.trip.days[0].stops.map(s => (s.arrive || '-') + '/' + (s.depart || '-'))")
    assert times == ["-/09:00", "10:00/12:00", "13:00/-"], times
    assert page.evaluate("Object.keys(RT.state.routes).length") == 0, "the old build routed the loaded trip"


def test_clearing_the_trip_during_the_town_lookup_clears_the_busy_message(page):
    build_far_trip_with_slow_town_lookup(page)
    page.click("details.more.inline > summary")
    page.click("[data-act=clearTrip]")
    page.wait_for_function("() => !RT.state.trip && !RT.state.busy", timeout=8000)


def test_a_second_tap_on_build_does_nothing_while_the_first_works(page):
    page.evaluate(f"RT.state.profile.home = {json.dumps(FAR)}")
    n = {"over": 0}

    def handler(route):
        if "overview=simplified" in route.request.url:
            n["over"] += 1
        osrm(route)
    page.unroute("https://router.project-osrm.org/**")
    page.route("https://router.project-osrm.org/**", handler)
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    i = page.evaluate("id => RT.state.recs.findIndex(r => r.dest.id === id)", "ga-nc-waterfalls")
    page.evaluate("() => { const o = RT.services.routeOverview; RT.services.routeOverview = async (a, b) => { await new Promise(r => setTimeout(r, 800)); return o(a, b); }; }")
    page.evaluate(f"() => {{ const el = document.querySelector(\"[data-act=build][data-i='{i}']\"); el.click(); setTimeout(() => el.click(), 200); }}")
    page.wait_for_function("() => RT.state.trip && !RT.state.busy && Object.keys(RT.state.routes).length > 0", timeout=20000)
    page.wait_for_timeout(1500)
    assert n["over"] == 1, n


def test_the_continuity_fix_keeps_a_real_first_stop(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const d1 = { date: "2027-06-01", title: "D1", stops: [S("Inn", "1 Inn Rd, X, TN", 35, -84, { depart: "08:30" }), S("Inn", "1 Inn Rd, X, TN", 35, -84, { arrive: "17:00" })] };
        const d2 = { date: "2027-06-02", title: "D2", stops: [S("Sunrise Overlook", "Overlook Rd, X, TN", 35.1, -84, { arrive: "08:00", depart: "10:00", minutes: 120, timed_entry: "09:00", booking_url: "https://tickets.example/123" }), S("Inn", "1 Inn Rd, X, TN", 35, -84, { arrive: "17:00" })] };
        const trip = { days: [d1, d2] }, f = RT.checkTrip(trip, p, {}).find(x => x.check === "continuity");
        const ok = RT.quickFix(trip, f, p, {});
        return { ok, names: d2.stops.map(s => s.name), kept: d2.stops[1], start: d2.stops[0].depart, left: RT.checkTrip(trip, p, {}).filter(x => x.check === "continuity").length }; }""")
    assert r["ok"] and r["names"] == ["Inn", "Sunrise Overlook", "Inn"], r
    assert r["kept"]["timed_entry"] == "09:00" and r["kept"]["booking_url"] == "https://tickets.example/123", r
    assert r["kept"]["arrive"] == "08:00" and r["start"] < "08:00", "the place keeps its times; the day leaves the inn before them"
    assert r["left"] == 0


def test_the_too_long_error_goes_away_with_the_stop_that_caused_it(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const day = { date: "2027-06-01", title: "Long", stops: [S("A", "A", 35, -84, { depart: "08:30" }), S("B", "B", 35.1, -84, { arrive: "12:00", depart: "13:00" }), S("C", "C", 35.2, -84, { arrive: "17:00" })] };
        RT.retimeDay(day, { legs: [{ seconds: 12 * 3600 }, { seconds: 6 * 3600 }] });
        const before = RT.checkTrip({ days: [day] }, p, {}).map(x => x.check);
        day.stops.splice(1, 1);
        return { before, after: RT.checkTrip({ days: [day] }, p, {}).map(x => x.check) }; }""")
    assert "too long" in r["before"] and "too long" not in r["after"], r


def test_a_fix_counts_only_when_the_problem_is_gone(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const day = { date: "2027-06-01", title: "Drive toward X", stops: [S("Home", "Knoxville, TN", 35.96, -83.92, { type: "Home", depart: "08:30" }), S("Overnight", "Y", 33, -90, { arrive: "18:00", checkin: true })] };
        const trip = { days: [day] }, f = RT.checkTrip(trip, p, {}).find(x => x.check === "check-in");
        const ok1 = RT.quickFix(trip, f, p, {}), label1 = RT.quickFixLabel(trip, f, p, {});
        const d2 = { date: "2027-06-02", title: "Drive to Z", stops: [S("O", "Y", 33, -90, { depart: "08:30" }), S("Museum", "M", 33.5, -89, { arrive: "09:30", depart: "10:30", timed_entry: "09:30" }), S("Hotel", "H", 34, -88, { arrive: "12:00", checkin: true })] };
        const t2 = { days: [d2] }, f2 = RT.checkTrip(t2, p, {}).find(x => x.check === "check-in");
        const ok2 = RT.quickFix(t2, f2, p, {});
        return { ok1, label1, dep: day.stops[0].depart, ok2, museum: d2.stops[1].arrive }; }""")
    assert r["ok1"] is False and r["label1"] == "" and r["dep"] == "08:30", "a 3-hour-late check-in cannot be fixed by leaving 90 minutes earlier"
    assert r["ok2"] is False and r["museum"] == "09:30", "a day with a timed entry is not shifted"


def test_sunset_on_a_drive_home_uses_the_zone_where_it_ends(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const day = { date: "2027-12-20", title: "Drive home", stops: [S("Hotel", "H", 36.0, -90.0, { depart: "08:30" }), S("Home", "Atlanta, GA", 33.749, -84.388, { type: "Home", arrive: "17:30" })] };
        const a = JSON.parse(JSON.stringify(day)); RT.alignDriveDay(a, p);
        const b = JSON.parse(JSON.stringify(day)); b.tz = "America/Chicago"; RT.alignDriveDay(b, p);
        return { a: a.stops[0].depart + "-" + a.stops[1].arrive, b: b.stops[0].depart + "-" + b.stops[1].arrive }; }""")
    assert r["a"] == "08:15-17:15" and r["b"] == r["a"], r


def test_a_long_drive_that_stretches_the_trip_is_reported(page):
    page.evaluate(f"RT.state.profile.home = {json.dumps(FAR)}")
    r = page.evaluate("""() => { const p = RT.state.profile, t = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "ga-nc-waterfalls"), "2027-11-26", 2, RT_CATALOG);
        return { nights: t.days.length - 1, info: RT.checkTrip(t, p, {}).filter(f => f.check === "trip length").map(f => f.msg) }; }""")
    assert r["nights"] > 2 and r["info"] and "instead of the 2 you asked for" in r["info"][0], r


ZONES = [
    ("Destin, FL", 30.39, -86.50, "America/Chicago"), ("Mexico Beach, FL", 29.95, -85.42, "America/Chicago"),
    ("Port St. Joe, FL", 29.81, -85.30, "America/New_York"), ("Apalachicola, FL", 29.73, -84.98, "America/New_York"),
    ("Tallahassee, FL", 30.44, -84.28, "America/New_York"), ("Pensacola, FL", 30.42, -87.22, "America/Chicago"),
    ("Dothan, AL", 31.22, -85.39, "America/Chicago"), ("Columbus, GA", 32.46, -84.99, "America/New_York"),
    ("Huntsville, AL", 34.73, -86.59, "America/Chicago"), ("Chattanooga, TN", 35.05, -85.31, "America/New_York"),
    ("Nashville, TN", 36.16, -86.78, "America/Chicago"), ("Crossville, TN", 35.95, -85.03, "America/Chicago"),
    ("Knoxville, TN", 35.96, -83.92, "America/New_York"), ("Louisville, KY", 38.25, -85.76, "America/New_York"),
    ("Bowling Green, KY", 36.99, -86.44, "America/Chicago"), ("Evansville, IN", 37.97, -87.57, "America/Chicago"),
    ("Indianapolis, IN", 39.77, -86.16, "America/New_York"), ("Gary, IN", 41.59, -87.35, "America/Chicago"),
    ("South Bend, IN", 41.68, -86.25, "America/New_York"), ("Chicago, IL", 41.88, -87.63, "America/Chicago"),
    ("Escanaba, MI", 45.75, -87.06, "America/New_York"), ("Iron Mountain, MI", 45.82, -88.07, "America/Chicago"),
    ("Amarillo, TX", 35.22, -101.83, "America/Chicago"), ("El Paso, TX", 31.76, -106.44, "America/Denver"),
    ("Denver, CO", 39.74, -104.99, "America/Denver"), ("Rapid City, SD", 44.08, -103.23, "America/Denver"),
    ("Pierre, SD", 44.37, -100.35, "America/Chicago"), ("Bismarck, ND", 46.81, -100.78, "America/Chicago"),
    ("Dickinson, ND", 46.88, -102.79, "America/Denver"), ("North Platte, NE", 41.12, -100.77, "America/Chicago"),
    ("Boise, ID", 43.62, -116.2, "America/Denver"), ("Coeur d'Alene, ID", 47.68, -116.78, "America/Los_Angeles"),
    ("Ontario, OR", 44.03, -116.96, "America/Denver"), ("Las Vegas, NV", 36.17, -115.14, "America/Los_Angeles"),
    ("Phoenix, AZ", 33.45, -112.07, "America/Phoenix"), ("Yuma, AZ", 32.69, -114.62, "America/Phoenix"),
    ("Lake Havasu City, AZ", 34.48, -114.32, "America/Phoenix"), ("Needles, CA", 34.85, -114.61, "America/Los_Angeles"),
    ("Seattle, WA", 47.61, -122.33, "America/Los_Angeles"), ("Anchorage, AK", 61.22, -149.9, "America/Anchorage"),
    ("Juneau, AK", 58.3, -134.42, "America/Anchorage"), ("Honolulu, HI", 21.31, -157.86, "Pacific/Honolulu"),
    ("San Juan, PR", 18.47, -66.11, "America/Puerto_Rico"), ("Florence, Italy", 43.77, 11.25, None)]


def test_the_time_zone_guess_follows_the_zone_lines(page):
    got = page.evaluate("z => z.map(([n, lat, lon]) => RT.guessTZ(lat, lon) || null)", [list(z[:3]) for z in ZONES])
    wrong = [(z[0], z[3], g) for z, g in zip(ZONES, got) if g != z[3]]
    assert not wrong, wrong


def test_sunset_at_a_central_time_home_in_florida_is_warned(page):
    # Pensacola keeps Central time although it lies east of -87.5, where the old guess drew the line.
    page.evaluate("""() => { const S = RT.mkStop;
        RT.state.trip = { name: "Beach day", states: ["FL"], days: [{ date: "2027-12-20", title: "Beach day", stops: [
          S("Home", "Pensacola, FL", 30.42, -87.22, { type: "Home", depart: "09:00" }),
          S("Pensacola Beach", "Pensacola Beach, FL", 30.33, -87.14, { arrive: "09:30", depart: "16:30", minutes: 420 }),
          S("Home", "Pensacola, FL", 30.42, -87.22, { type: "Home", arrive: "17:20" })] }] }; }""")
    page.click("#tabs [data-tab=trip]")
    check(page)
    assert page.evaluate("RT.state.trip.days[0].tz") == "America/Chicago"
    assert page.evaluate("RT.state.findings.filter(f => f.check === 'sunset').length") == 1, "sunset is near 4:50 p.m. Central in December"


def test_the_ai_fix_keeps_a_check_in_the_answer_leaves_out(page):
    catalog_trip(page)
    t0 = page.evaluate("RT.state.trip")
    fixed = json.loads(json.dumps(t0))
    for d in fixed["days"]:
        for s in d["stops"]:
            s.pop("checkin", None)
    answers(page, [fixed])
    before = page.evaluate("RT.state.trip.days.flatMap(d => d.stops).filter(s => s.checkin).length")
    check(page)
    page.click("[data-act=aiFix]")
    page.wait_for_function("() => !RT.state.busy && RT.state.aiUndo", timeout=20000)
    assert page.evaluate("RT.state.trip.days.flatMap(d => d.stops).filter(s => s.checkin).length") == before >= 1


def test_a_hung_ai_request_stops_and_never_blocks_a_build(page):
    page.route("https://api.anthropic.com/**", lambda r: None)  # never answers
    page.evaluate("RT.state.profile.aiKey = 'test-key-not-real'; RT.services.AI_WAIT_MS = 1500")
    catalog_trip(page)
    check(page)
    page.click("[data-act=aiFix]")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    page.evaluate("window.__t0 = RT.state.trip")
    page.locator("[data-act=build][data-i='0']").first.click()
    page.wait_for_function("() => RT.state.trip && RT.state.trip !== window.__t0 && !RT.state.busy", timeout=20000)
    page.wait_for_function("() => document.querySelector('#toast').textContent.includes('did not answer')", timeout=10000)


def test_the_continuity_fix_keeps_a_searched_stop_with_an_arrival(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const d1 = { date: "2027-06-01", title: "D1", stops: [S("Inn", "1 Inn Rd, X, TN", 35, -84, { depart: "08:30" }), S("Inn", "1 Inn Rd, X, TN", 35, -84, { arrive: "17:00" })] };
        const d2 = { date: "2027-06-02", title: "D2", stops: [S("Diner", "5 Main St, X, TN", 35.05, -84, { type: "Stop", arrive: "07:30", depart: "08:30" }), S("Inn", "1 Inn Rd, X, TN", 35, -84, { arrive: "17:00" })] };
        const trip = { days: [d1, d2] }, f = RT.checkTrip(trip, p, {}).find(x => x.check === "continuity");
        const ok = RT.quickFix(trip, f, p, {});
        const d3 = { date: "2027-06-03", title: "D3", stops: [S("Sunrise", "Overlook Rd, X, TN", 35.6, -84, { arrive: "06:10", depart: "07:00", minutes: 50 }), S("Inn", "1 Inn Rd, X, TN", 35, -84, { arrive: "17:00" })] };
        const t3 = { days: [d2, d3] }, f3 = RT.checkTrip(t3, p, {}).find(x => x.check === "continuity");
        return { ok, names: d2.stops.map(s => s.name), early: RT.quickFix(t3, f3, p, {}), d3: d3.stops.map(s => s.name) }; }""")
    assert r["ok"] and r["names"] == ["Inn", "Diner", "Inn"], r
    assert r["early"] is False and r["d3"] == ["Sunrise", "Inn"], "a start before 6 a.m. is refused"


def test_an_override_survives_a_negative_number_and_a_named_overnight(page):
    r = page.evaluate("""() => { const p = RT.state.profile, S = RT.mkStop;
        const f = m => ({ date: "2027-06-01", level: "ERROR", check: "travel", subject: "B", msg: m });
        const same = RT.findingKey(f("A to B needs about 60 min of driving; the plan allows 20 min")) === RT.findingKey(f("A to B needs about 75 min of driving; the plan allows -10 min"));
        const day = { date: "2027-06-01", title: "Drive toward X", stops: [S("Home", "Knoxville, TN", 35.96, -83.92, { type: "Home", depart: "08:30" }),
          S("Overnight en route", "En route near 33.00, -86.00 (choose a town)", 33, -86, { type: "Hotel", arrive: "12:00", checkin: true })] };
        const trip = { days: [day] }, w = RT.checkTrip(trip, p, {}).find(x => x.check === "check-in");
        trip.overrides = [RT.findingKey(w)];
        const s = day.stops[1], was = s.name; RT.nameOvernight(s, "Clanton, AL", p); RT.renameInOverrides(trip, was, s.name);
        const w2 = RT.checkTrip(trip, p, {}).find(x => x.check === "check-in");
        return { same, renamed: s.name, kept: RT.isOverridden(trip, w2) }; }""")
    assert r == {"same": True, "renamed": "Overnight in Clanton, AL", "kept": True}, r
