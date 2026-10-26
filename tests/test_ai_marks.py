"""Everything the AI writes with the traveler's own key is marked AI: the trip, each
day plan, each stop, on screen and in the saved itinerary, links page, CSV, calendar,
and map files. Catalog trips carry no AI marks."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = '{label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}'
AI_TRIP = {"name": "AI Sample Trip", "states": ["TN"], "days": [
    {"date": "2099-05-01", "title": "AI day one", "stops": [
        {"name": "Home", "address": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "depart": "08:30"},
        {"name": "Sugarlands Visitor Center", "address": "1420 Fighting Creek Gap Rd, Gatlinburg, TN", "lat": 35.6853, "lon": -83.5367, "arrive": "09:40", "depart": "10:30"},
        {"name": "AI Lodge", "address": "1 Test Rd, Gatlinburg, TN", "lat": 35.71, "lon": -83.51, "arrive": "15:00", "checkin": True}]},
    {"date": "2099-05-02", "title": "AI day two", "stops": [
        {"name": "AI Lodge", "address": "1 Test Rd, Gatlinburg, TN", "lat": 35.71, "lon": -83.51, "depart": "09:00"},
        {"name": "Home", "address": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "arrive": "11:00"}]}]}


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 834, "height": 1194}, accept_downloads=True)
        pg = ctx.new_page()
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.route("https://api.anthropic.com/**", lambda r: r.fulfill(json={"content": [{"type": "text", "text": json.dumps(AI_TRIP)}]}, headers={"Access-Control-Allow-Origin": "*"}))
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}; RT.state.profile.aiKey = 'test-key-not-real'")
        yield pg
        b.close()


def build_ai(page):
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI][data-i='0']")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_selector("h1:has-text('AI Sample Trip')")


def text_of(download):
    return Path(download.path()).read_text(encoding="utf-8")


def test_ai_trip_marks_the_trip_each_day_and_each_stop(page):
    build_ai(page)
    t = page.evaluate("RT.state.trip")
    stops = [s for d in t["days"] for s in d["stops"]]
    assert all(s.get("ai") is True for s in stops if s["name"] != "Home"), "every AI stop carries the mark"
    assert all(not s.get("ai") for s in stops if s["name"] == "Home"), "home is the traveler's own"
    assert all(d.get("ai") is True for d in t["days"])
    assert page.locator("h1 .tag.ai").count() == 1, "the trip title says AI"
    assert page.locator(".dayhead .tag.ai").count() == 2, "each AI day plan says AI"
    shown = page.locator(".stop .tag.ai").count()
    assert shown == sum(1 for s in stops if s.get("ai")), shown
    legend = page.locator(".ai-legend")
    assert legend.count() == 1 and "UNVERIFIED" in legend.inner_text()


def test_exports_mark_ai_items(page):
    build_ai(page)
    with page.expect_download() as d:
        page.click("[data-act=itinerary]")
    html = text_of(d.value)
    assert html.count("(AI)") >= 3 and "AI marks" in html, "the saved itinerary marks AI stops and explains the mark"
    csv = page.evaluate("RT.csv(RT.state.trip)")
    assert "Sugarlands Visitor Center (AI)" in csv and "Home (AI)" not in csv
    ics = page.evaluate("RT.ics(RT.state.trip)")
    assert "SUMMARY:Sugarlands Visitor Center (AI)" in ics
    kml = page.evaluate("RT.kmlDay(RT.state.trip, 0, null)")
    assert "<name>Sugarlands Visitor Center (AI)</name>" in kml
    page.click("#tabs [data-tab=navigate]")
    with page.expect_download() as d2:
        page.click("[data-act=dlLinks]")
    assert "(AI)" in text_of(d2.value)


def test_catalog_trip_has_no_ai_marks(page):
    page.evaluate("RT.state.profile.aiKey = ''")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=build][data-i='0']")
    page.locator("[data-act=build][data-i='0']").first.click()
    page.wait_for_selector(".stop")
    assert page.locator(".tag.ai").count() == 0
    assert page.locator(".ai-legend").count() == 0
    with page.expect_download() as d:
        page.click("[data-act=itinerary]")
    assert "(AI)" not in text_of(d.value)


def test_an_older_ai_trip_without_marks_says_so(page):
    page.evaluate("""() => { const t = JSON.parse(JSON.stringify(%s)); t.createdBy = "ai";
        t.days.forEach(d => d.stops = d.stops.map(s => RT.mkStop(s.name, s.address, s.lat, s.lon, s)));
        RT.state.trip = t; }""" % json.dumps(AI_TRIP))
    page.click("#tabs [data-tab=trip]")
    legend = page.locator(".ai-legend")
    assert legend.count() == 1
    assert "every stop" in legend.inner_text().lower()


def test_ai_marks_survive_save_and_reload(page):
    build_ai(page)
    saved = page.evaluate("RT.tripJson(RT.state.trip, RT.state.profile)")
    page.evaluate("t => { RT.state.trip = JSON.parse(t).trip; }", saved)
    page.reload()
    page.click("#tabs [data-tab=trip]")
    assert page.locator(".stop .tag.ai").count() >= 3
