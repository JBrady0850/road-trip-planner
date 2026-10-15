"""Where to: a traveler who already knows the town types it in the City field.

A catalog city goes straight to the top of the Trips page. Any other town is looked
up once (OpenStreetMap Nominatim, mocked here) and built from the catalog places
within about an hour's drive of it. A town that cannot be found says so and the state
ranking stays."""
import json
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = '{label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}'
PIGEON_FORGE = [{"display_name": "Pigeon Forge, Sevier County, Tennessee, United States",
                 "lat": "35.7884", "lon": "-83.5543", "address": {"town": "Pigeon Forge", "state": "Tennessee"}}]
LOOKUPS = []


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 834, "height": 1194})
        pg = ctx.new_page()

        def nominatim(route):
            q = parse_qs(urlparse(route.request.url).query).get("q", [""])[0]
            LOOKUPS.append(q)
            body = PIGEON_FORGE if q.lower().startswith("pigeon forge") else []
            route.fulfill(status=200, content_type="application/json", body=json.dumps(body))
        pg.route("https://nominatim.openstreetmap.org/**", nominatim)
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}")
        yield pg
        b.close()


def plan(page, state, city):
    page.set_default_timeout(8000)
    page.click("#tabs [data-tab=interview]")
    page.select_option("[data-bind='profile.destState']", state)
    page.fill("[data-bind='profile.destCity']", city)
    page.locator("[data-bind='profile.destCity']").dispatch_event("change")
    page.click(".stepbar [data-act=findDest]")
    page.wait_for_selector(".grid .card.dest", timeout=15000)


def test_where_to_has_a_city_field_that_suggests_catalog_cities(page):
    page.click("#tabs [data-tab=interview]")
    page.select_option("[data-bind='profile.destState']", "TN")
    city = page.locator("[data-bind='profile.destCity']")
    assert city.count() == 1, "the Where to block has a City field"
    same_block = page.evaluate("""() => document.querySelector("[data-bind='profile.destCity']").closest('.where')
        === document.querySelector("[data-bind='profile.destState']").closest('.where')""")
    assert same_block, "City sits in the Where to block, beside the state"
    options = page.eval_on_selector_all(f"#{city.get_attribute('list')} option", "os => os.map(o => o.value)")
    assert "Gatlinburg, TN" in options and "Chattanooga, TN" in options, options
    assert "Boone, NC" not in options, "suggestions follow the chosen state"


def test_a_catalog_city_comes_first_without_a_lookup(page):
    LOOKUPS.clear()
    plan(page, "TN", "gatlinburg")
    first = page.locator(".grid .card.dest").first
    assert "Great Smoky Mountains" in first.inner_text()
    assert "your city" in first.inner_text().lower()
    assert "gatlinburg" in page.inner_text(".stepbar .step-next").lower() or "smoky" in page.inner_text(".stepbar .step-next").lower()
    assert LOOKUPS == [], "a catalog city needs no place search"
    assert page.locator("[data-bind='profile.destCity']").count() == 1, "the Trips page shows the City field too"


def test_any_other_town_is_found_and_built_from_nearby_places(page):
    plan(page, "TN", "Pigeon Forge")
    assert any(q.lower().startswith("pigeon forge") for q in LOOKUPS), LOOKUPS
    first = page.locator(".grid .card.dest").first
    text = first.inner_text()
    assert "Pigeon Forge, TN" in text and "your city" in text.lower(), text
    assert "Sugarlands Visitor Center" in text, "nearby catalog places fill the trip"
    page.click(".stepbar .step-next")
    page.wait_for_function("RT.state.trip && RT.state.tab === 'trip'", timeout=15000)
    trip = page.evaluate("RT.state.trip")
    assert trip["base"]["addr"] == "Pigeon Forge, TN"
    assert trip["destId"].startswith("city:")
    sights = [s["name"] for d in trip["days"] for s in d["stops"] if s["type"] not in ("Home", "Hotel")]
    assert sights, "the trip has places to see, not only free days"


def test_a_town_that_cannot_be_found_says_so_and_keeps_the_ranking(page):
    plan(page, "TN", "Nowhereville")
    assert "could not find nowhereville" in page.inner_text("#toast").lower()
    assert page.locator(".card.dest.pick").count() == 0
    assert "Tennessee" in page.inner_text("h1")
    assert page.locator(".grid .card.dest").count() >= 2


def test_clearing_the_city_returns_to_the_plain_ranking(page):
    plan(page, "TN", "")
    assert page.locator(".card.dest.pick").count() == 0
    assert "best match" in page.inner_text(".grid .card.best").lower()


def test_a_town_trip_stays_within_an_hour_and_names_only_its_own_states(page):
    r = page.evaluate("""() => { const d = RT.cityDestination({label: "Pigeon Forge, TN", lat: 35.7884, lon: -83.5543, abbr: "TN"}, RT_CATALOG);
        return { far: d.stops.filter(s => RT.util.estDriveHours([35.7884, -83.5543], [s[2], s[3]]) > RT.CITY_REACH_H).map(s => s[0]),
                 states: d.states, n: d.stops.length, addrs: d.stops.map(s => s[1]) }; }""")
    assert r["n"] >= 5 and not r["far"], r
    assert set(r["states"]) == {s[-2:] for s in r["addrs"]} | {"TN"}, r["states"]


# ---- review findings, 2026-10-15: each case reproduced a defect before the fix ----

def test_a_new_city_typed_on_plan_shows_when_the_trips_tab_is_tapped(page):
    plan(page, "TN", "gatlinburg")
    page.click("#tabs [data-tab=interview]")
    page.fill("[data-bind='profile.destCity']", "Chattanooga")
    page.locator("[data-bind='profile.destCity']").dispatch_event("change")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_function("document.querySelector('.card.dest.pick') && document.querySelector('.card.dest.pick').innerText.includes('Chattanooga')", timeout=8000)
    page.click("#tabs [data-tab=interview]")
    page.fill("[data-bind='profile.destCity']", "")
    page.locator("[data-bind='profile.destCity']").dispatch_event("change")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".grid .card.dest")
    assert page.locator(".card.dest.pick").count() == 0, "a cleared City leaves no old pick behind"


def test_changing_the_state_on_trips_keeps_the_typed_city(page):
    plan(page, "TN", "gatlinburg")
    page.select_option("[data-bind='profile.destState']", "NC")
    page.wait_for_selector(".card.dest.pick", timeout=8000)
    assert "Great Smoky Mountains" in page.inner_text(".card.dest.pick")


def test_town_names_in_other_formats_match_the_catalog(page):
    for text in ("Gatlinburg, Tennessee", "Gatlinburg TN", "gatlinburg, tn", "  Gatlinburg  "):
        found = page.evaluate("t => (RT.matchCatalogCity(t, RT_CATALOG, '') || {}).id", text)
        assert found == "tn-smokies", (text, found)


def test_free_days_on_a_town_trip_never_repeat_its_places(page):
    r = page.evaluate("""() => { const p = RT.defaultProfile(); p.home = {label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"};
        const d = RT.cityDestination({label: "Pigeon Forge, TN", lat: 35.7884, lon: -83.5543, abbr: "TN"}, RT_CATALOG);
        const t = RT.draftTrip(p, d, "2027-05-14", 7, RT_CATALOG);
        const near = RT.nearbyDestinations(t, RT_CATALOG, p);
        const before = t.days.flatMap(x => x.stops.map(s => s.name));
        if (near.length) RT.fillFreeDays(t, p, near[0]);
        const names = t.days.flatMap(x => x.stops.filter(s => s.type !== "Hotel" && s.type !== "Home").map(s => s.name));
        return { near: near.map(n => n.dest.id), nearIds: d.nearIds, dup: names.filter((n, i) => names.indexOf(n) !== i) }; }""")
    assert not set(r["near"]) & set(r["nearIds"]), r
    assert r["dup"] == [], r


def test_a_restored_profile_cannot_inject_markup_through_the_city(page):
    page.evaluate("""() => { const p = RT.state.profile; window.__x = 0; p.destState = "TN"; p.destCity = "Evil";
        p.destPlace = { q: "Evil", st: "TN", label: "Evil<b>town</b>", lat: 35.79, lon: -83.55, abbr: '<img src=x onerror="window.__x=1">' };
        RT.state.recs = []; }""")
    page.click("#tabs [data-tab=interview]")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".grid .card.dest")
    page.wait_for_timeout(300)
    assert page.evaluate("window.__x") == 0
    assert page.locator(".grid img").count() == 0
    assert page.inner_text(".card.dest.pick .dest-name") == "Evil<b>town</b>", "the name shows as text, not markup"


def test_the_saved_itinerary_of_a_town_trip_keeps_its_unique_experiences(page):
    plan(page, "TN", "Pigeon Forge")
    page.click(".stepbar .step-next")
    page.wait_for_function("RT.state.trip && RT.state.tab === 'trip' && !RT.state.busy", timeout=15000)
    with page.expect_download() as d:
        page.evaluate("document.querySelector('[data-act=itinerary]').click()")
    html = Path(d.value.path()).read_text(encoding="utf-8")
    assert "Unique experiences" in html, "the itinerary file lists the nearby trips' experiences"


def test_the_city_field_has_a_label_and_enter_goes_to_trips(page):
    page.click("#tabs [data-tab=interview]")
    assert page.evaluate("document.querySelector(\"[data-bind='profile.destCity']\").labels.length") >= 1
    assert page.evaluate("document.querySelector(\"[data-bind='profile.destState']\").labels.length") >= 1
    page.fill("[data-bind='profile.destCity']", "Chattanooga")
    page.press("[data-bind='profile.destCity']", "Enter")
    page.wait_for_selector(".card.dest.pick", timeout=8000)
    assert "Chattanooga" in page.inner_text(".card.dest.pick")


def test_a_lookup_answer_for_old_text_is_dropped(page):
    """The traveler types one town, taps Next, and changes City before the map answers."""
    held = []
    page.unroute("https://nominatim.openstreetmap.org/**")
    page.route("https://nominatim.openstreetmap.org/**", lambda route: held.append(route))
    page.click("#tabs [data-tab=interview]")
    page.select_option("[data-bind='profile.destState']", "TN")
    page.fill("[data-bind='profile.destCity']", "Pigeon Forge")
    page.locator("[data-bind='profile.destCity']").dispatch_event("change")
    page.click(".stepbar [data-act=findDest]")
    page.wait_for_function("1", timeout=1000)
    for _ in range(50):
        if held: break
        page.wait_for_timeout(100)
    assert held, "the lookup is waiting for an answer"
    page.evaluate("RT.state.profile.destCity = 'gatlinburg'")
    held[0].fulfill(status=200, content_type="application/json", body=json.dumps(PIGEON_FORGE))
    page.wait_for_selector(".card.dest.pick", timeout=8000)
    assert "Great Smoky Mountains" in page.inner_text(".card.dest.pick"), "the answer for the old text is not used"
    assert page.evaluate("RT.state.profile.destPlace.q") == "gatlinburg"
