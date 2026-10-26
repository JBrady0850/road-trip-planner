"""Problems in the plan check come with buttons: Fix where the app can fix it by itself,
Override to keep it as it is (with Undo), Fix all simple problems, Fix the problems with
AI (with Undo the AI fix), and Let the app schedule it for an AI trip. A new AI draft
with errors gets one automatic fix attempt."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = {"label": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "state": "Tennessee"}
CORS = {"Access-Control-Allow-Origin": "*"}


def stop(name, lat, lon, **k):
    return {"name": name, "address": k.pop("address", f"1 Main St, {name}, TN"), "lat": lat, "lon": lon, **k}


# An AI draft whose day 1 crosses three states: far over the drive cap.
BAD = {"name": "Bad AI Trip", "states": ["TN", "AL", "FL"], "days": [
    {"date": "2099-05-01", "title": "Zig-zag", "stops": [
        stop("Home", 35.9606, -83.9207, address="Knoxville, TN", depart="08:30"),
        stop("Mobile Stop", 30.69, -88.04, address="1 Water St, Mobile, AL", arrive="10:00", depart="11:00"),
        stop("Pensacola Stop", 30.42, -87.21, address="1 Palafox St, Pensacola, FL", arrive="12:00", depart="13:00"),
        stop("Home", 35.9606, -83.9207, address="Knoxville, TN", arrive="15:00")]}]}
GOOD = {"name": "Fixed AI Trip", "states": ["TN"], "days": [
    {"date": "2099-05-01", "title": "Smokies", "stops": [
        stop("Home", 35.9606, -83.9207, address="Knoxville, TN", depart="08:30"),
        stop("Sugarlands Visitor Center", 35.6853, -83.5367, address="1420 Fighting Creek Gap Rd, Gatlinburg, TN", arrive="09:40", depart="10:30"),
        stop("Home", 35.9606, -83.9207, address="Knoxville, TN", arrive="12:00")]}]}


def osrm(route):
    pts = [list(map(float, c.split(","))) for c in route.request.url.split("/driving/")[1].split("?")[0].split(";")]
    # about 45 mph in a straight line: long legs stay long, so the zig-zag day breaks the cap
    legs = []
    for a, b in zip(pts, pts[1:]):
        d = ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5 * 69
        legs.append({"duration": d / 45 * 3600, "distance": d * 1609})
    route.fulfill(json={"code": "Ok", "routes": [{"duration": sum(l["duration"] for l in legs), "legs": legs, "geometry": {"coordinates": pts}}]}, headers=CORS)


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.route("https://router.project-osrm.org/**", osrm)
        pg.route("https://nominatim.openstreetmap.org/**", lambda r: r.abort())
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
        RT.state.trip = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-06-11", 3, RT_CATALOG); RT.state.routes = {}; }""")
    page.click("#tabs [data-tab=interview]")
    page.click("#tabs [data-tab=trip]")


def test_a_check_in_warning_has_a_one_tap_fix(page):
    catalog_trip(page)
    page.evaluate("""() => { const d = RT.state.trip.days[0], s = d.stops[d.stops.length - 1]; s.arrive = "11:00"; }""")
    check(page)
    row = page.locator(".finding.WARN:has-text('check-in')")
    assert row.count() == 1
    row.locator("[data-act=qfix]").click()
    assert page.locator(".finding.WARN:has-text('check-in')").count() == 0


def test_override_stops_counting_a_problem_and_undo_brings_it_back(page):
    catalog_trip(page)
    page.evaluate("""() => { const d = RT.state.trip.days[0], s = d.stops[d.stops.length - 1]; s.arrive = "11:00"; }""")
    check(page)
    status = lambda: page.locator(".card.noprint p.small").first.inner_text()
    assert "look at" in status() or "fix" in status()
    page.locator(".finding.WARN:has-text('check-in') [data-act=override]").click()
    assert page.locator(".finding.WARN:has-text('check-in')").count() == 0
    assert "1 overridden" in page.inner_text("#view")
    assert page.evaluate("RT.state.trip.overrides.length") == 1, "the saved trip remembers the override"
    page.click("summary:has-text('overridden')")
    page.click("[data-act=unoverride]")
    assert page.locator(".finding.WARN:has-text('check-in')").count() == 1


def test_fix_all_applies_every_simple_fix(page):
    catalog_trip(page)
    page.evaluate("""() => { const t = RT.state.trip; t.days[0].stops[t.days[0].stops.length - 1].arrive = "11:00";
        t.days[1].stops[0] = RT.mkStop("Somewhere else", "9 Other Rd, Sevierville, TN", 35.87, -83.56, { depart: "08:30" }); }""")
    check(page)
    assert page.locator("[data-act=fixAll]").count() == 1
    page.click("[data-act=fixAll]")
    checks = page.evaluate("RT.state.findings.map(f => f.check)")
    assert "check-in" not in checks and "continuity" not in checks, checks


def answers(page, replies):
    calls = []
    def h(route):
        calls.append(json.loads(route.request.post_data))
        body = replies[min(len(calls) - 1, len(replies) - 1)]
        route.fulfill(json={"content": [{"type": "text", "text": json.dumps(body)}]}, headers=CORS)
    page.route("https://api.anthropic.com/**", h)
    page.evaluate("RT.state.profile.aiKey = 'test-key-not-real'")
    return calls


def test_a_new_ai_draft_with_errors_gets_one_automatic_fix(page):
    calls = answers(page, [BAD, GOOD])
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI][data-i='0']")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_function("() => RT.state.trip && RT.state.trip.name === 'Fixed AI Trip' && !RT.state.busy", timeout=20000)
    assert len(calls) == 2, "one draft and one fix request"
    fix = calls[1]["messages"][0]["content"]
    assert "drive cap" in fix and "Measured drive times" in fix and "Mobile Stop" in fix
    assert page.locator("[data-act=aiUndo]").count() == 1
    page.click("[data-act=aiUndo]")
    assert page.evaluate("RT.state.trip.name") == "Bad AI Trip"


def test_fix_with_ai_button_marks_new_places_and_keeps_old_marks(page):
    catalog_trip(page)
    page.evaluate("""() => { const d = RT.state.trip.days[0], s = d.stops[d.stops.length - 1]; s.arrive = "11:00"; }""")
    t0 = page.evaluate("RT.state.trip")
    fixed = json.loads(json.dumps(t0))
    fixed["days"][0]["stops"][-1]["arrive"] = "15:00"
    fixed["days"][1]["stops"].insert(1, stop("New AI Place", 35.70, -83.50, address="5 New Rd, Gatlinburg, TN", minutes=60))
    calls = answers(page, [fixed])
    check(page)
    page.click("[data-act=aiFix]")
    page.wait_for_function("() => !RT.state.busy && RT.state.trip.days[1].stops.some(s => s.name === 'New AI Place')", timeout=20000)
    t = page.evaluate("RT.state.trip")
    new = [s for d in t["days"] for s in d["stops"] if s["name"] == "New AI Place"][0]
    assert new.get("ai") is True and new.get("aiBy")
    kept = [s for d in t["days"] for s in d["stops"] if s["name"] != "New AI Place" and s["name"] != "Home"]
    assert not any(s.get("ai") for s in kept), "unchanged places keep their own marks"
    assert t["days"][1].get("ai") is True and not t["days"][0].get("ai"), "only the changed day plan is marked AI"
    assert len(calls) == 1


def test_fix_with_ai_rejects_an_answer_with_a_different_number_of_days(page):
    catalog_trip(page)
    page.evaluate("""() => { const d = RT.state.trip.days[0], s = d.stops[d.stops.length - 1]; s.arrive = "11:00"; }""")
    answers(page, [GOOD])
    before = page.evaluate("RT.state.trip.days.length")
    check(page)
    page.click("[data-act=aiFix]")
    page.wait_for_function("() => document.querySelector('#toast').textContent.includes('instead of')", timeout=20000)
    assert page.evaluate("RT.state.trip.days.length") == before


def test_let_the_app_schedule_an_ai_trip(page):
    answers(page, [BAD, BAD])
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI][data-i='0']")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_function("() => RT.state.trip && RT.state.trip.name === 'Bad AI Trip' && !RT.state.busy", timeout=20000)
    assert page.locator("[data-act=scheduleAI]").count() == 1
    page.click("[data-act=scheduleAI]")
    page.wait_for_function("() => RT.state.trip && /scheduled by the app/.test(RT.state.trip.name) && !RT.state.busy", timeout=20000)
    t = page.evaluate("RT.state.trip")
    assert t["base"], "the app picked a base"
    errs = page.evaluate("RT.state.findings.filter(f => f.level === 'ERROR').map(f => f.msg)")
    assert not errs, errs
    names = [s["name"] for d in t["days"] for s in d["stops"]]
    left = [x["name"] for x in t.get("leftOut", [])]
    for n in ("Mobile Stop", "Pensacola Stop"):
        assert n in names or n in left, f"{n} is either scheduled or listed as left out"
    for d in t["days"]:
        for s in d["stops"]:
            if s["name"] in ("Mobile Stop", "Pensacola Stop"):
                assert s.get("ai") is True, "AI places keep their AI mark"


def test_no_key_shows_where_to_add_one(page):
    catalog_trip(page)
    page.evaluate("""() => { const t = RT.state.trip; t.days[0].stops[1].arrive = "23:00"; }""")
    check(page)
    assert page.locator("[data-act=aiFix]").count() == 0
    assert "AI key in Settings" in page.inner_text("#view")
