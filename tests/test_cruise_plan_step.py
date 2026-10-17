"""A cruise port as the destination on the first Plan step: Where to offers "Cruise
port", the step asks for the port and the ship's times instead of home and nights,
and step 2 shows the three port-day plans. Picking a plan builds the itinerary."""
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
CHARLOTTETOWN = [{"display_name": "Charlottetown, Prince Edward Island, Canada", "lat": "46.2382", "lon": "-63.1311",
                  "address": {"city": "Charlottetown", "state": "Prince Edward Island", "country": "Canada"}}]
WHERE = "#cityList-state"


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})

        def nominatim(route):
            q = parse_qs(urlparse(route.request.url).query).get("q", [""])[0]
            body = CHARLOTTETOWN if q.lower().startswith("charlottetown") else []
            route.fulfill(status=200, content_type="application/json", body=json.dumps(body))
        pg.route("https://nominatim.openstreetmap.org/**", nominatim)
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        yield pg
        b.close()


def choose_cruise(page, port="grand-cayman", line="Carnival"):
    page.select_option(WHERE, "@cruise")
    if port:
        page.select_option("#view [data-bind='profile.cruise.portId']", port)
    page.select_option("#view [data-bind='profile.cruise.line']", line)


def test_where_to_offers_a_cruise_port_that_swaps_the_questions(page):
    labels = page.eval_on_selector_all(f"{WHERE} option", "os => os.map(o => o.textContent)")
    assert "Cruise port (one day ashore)" in labels
    assert page.locator("#homeQ").count() == 1 and page.locator("[data-bind=nights]").count() == 1
    page.select_option(WHERE, "@cruise")
    assert page.evaluate("RT.state.profile.cruise.on") is True
    assert page.evaluate("RT.state.profile.destState") == "", "the cruise choice is not stored as a state"
    assert page.locator("#homeQ").count() == 0, "a port day needs no home town"
    assert page.locator("[data-bind=nights]").count() == 0 and page.locator("[data-city]").count() == 0
    for k in ("portId", "typed", "date", "arrive", "depart", "buffer", "line"):
        assert page.locator(f"#view [data-bind='profile.cruise.{k}']").count() == 1, k
    assert page.locator("#view [data-act=interest]").count() == 24
    assert page.locator("#fishPlan").count() == 0
    assert "Show me port plans" in page.text_content(".stepbar")


def test_next_shows_three_port_plans_and_one_builds_the_itinerary(page):
    choose_cruise(page)
    page.click(".stepbar [data-act=findPorts]")
    page.wait_for_selector("#cruiseOut .plan-card")
    assert page.evaluate("RT.state.tab") == "destinations"
    assert "Port plans: George Town, Grand Cayman" in page.inner_text("h1")
    assert page.locator("#cruiseOut .plan-card").count() == 3
    bar = page.text_content(".stepbar")
    assert "Step 2 of 6" in bar and "Port plans" in bar
    page.click(".stepbar [data-act=cruiseUse]")
    page.wait_for_function("RT.state.tab === 'trip'")
    trip = page.evaluate("RT.state.trip")
    assert trip["cruise"]["portId"] == "grand-cayman" and trip["cruise"]["plan"] == "excursion"
    assert len(trip["days"]) == 1


def test_interest_changes_on_step_two_update_the_plans(page):
    choose_cruise(page)
    page.click(".stepbar [data-act=findPorts]")
    page.wait_for_selector("#cruiseOut .plan-card")
    before = page.inner_text("#cruiseOut")
    page.evaluate("document.querySelector('details.more').open = true")
    for k in ("scenic", "parks", "food"):
        page.click(f"#view [data-act=interest][data-k={k}]")
    page.click("#view [data-act=interest][data-k=drinks]")
    page.wait_for_selector("#cruiseOut .plan-card")
    assert page.inner_text("#cruiseOut") != before
    assert page.evaluate("document.querySelector('details.more').open"), "the chips stay open while you tap"


def test_next_without_a_port_stays_on_the_plan_step(page):
    choose_cruise(page, port="")
    page.click(".stepbar [data-act=findPorts]")
    page.wait_for_timeout(300)
    assert page.evaluate("RT.state.tab") == "interview"
    assert "Pick your port" in page.inner_text("#toast")


def test_a_typed_port_is_looked_up_when_next_is_tapped(page):
    choose_cruise(page, port="")
    page.fill("#view [data-bind='profile.cruise.typed']", "Charlottetown")
    page.click(".stepbar [data-act=findPorts]")
    page.wait_for_selector("#cruiseOut h2")
    assert page.evaluate("RT.state.tab") == "destinations"
    assert "Charlottetown" in page.inner_text("#cruiseOut h2")


def test_switching_back_restores_the_road_trip_and_survives_a_reload(page):
    choose_cruise(page)
    page.wait_for_timeout(200)
    page.reload()
    assert page.evaluate("RT.state.profile.cruise.on") is True, "the cruise choice is saved"
    assert page.locator("#homeQ").count() == 0
    page.select_option(WHERE, "TN")
    assert page.evaluate("RT.state.profile.cruise.on") is False
    assert page.evaluate("RT.state.profile.destState") == "TN"
    assert page.locator("#homeQ").count() == 1 and page.locator("[data-city]").count() == 1
    assert "Show me trips" in page.text_content(".stepbar")


def test_a_profile_saved_before_this_change_opens_as_a_road_trip(page):
    page.evaluate("""() => { const s = JSON.parse(localStorage.getItem('rtp:v1') || '{}');
        s.profile = s.profile || {}; s.profile.cruise = { portId: 'cozumel', arrive: '08:00', depart: '17:00', buffer: 30 };
        localStorage.setItem('rtp:v1', JSON.stringify(s)); }""")
    page.reload()
    assert page.evaluate("RT.state.profile.cruise.on") is False
    assert page.locator("#homeQ").count() == 1


@pytest.mark.parametrize("size", [(834, 1194), (800, 1280)])
def test_the_cruise_plan_step_fits_a_tablet_without_sideways_scroll(page, size):
    page.set_viewport_size({"width": size[0], "height": size[1]})
    choose_cruise(page)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Plan step scrolls sideways"
    page.click(".stepbar [data-act=findPorts]")
    page.wait_for_selector("#cruiseOut .plan-card")
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Port plans scroll sideways"
