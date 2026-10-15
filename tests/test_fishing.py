"""Fishing: lakes, rivers, and streams count, and a traveler who picks Fishing gets the
official page to buy each trip state's fishing license online (checked 2026-10-15,
docs/catalog-check.md)."""
import re
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
APP = (ROOT / "app" / "index.html").as_uri()
HOME = '{label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}'


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}")
        yield pg
        b.close()


def draft(page, interests):
    page.evaluate("""interests => { const st = RT.state; st.profile.interests = interests;
        st.trip = RT.draftTrip(st.profile, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-05-14", 4, RT_CATALOG); }""", interests)


def test_every_state_has_an_official_https_license_page(page):
    links = page.evaluate("RT_STATES.map(s => [s.abbr, s.fish])")
    assert len(links) == 50
    for abbr, url in links:
        assert url and url.startswith("https://"), (abbr, url)
    assert len({u for _, u in links}) == 50, "one page per state"


def test_fishing_counts_lakes_rivers_and_streams(page):
    names = page.evaluate("RT_CATALOG.flatMap(d => d.stops.filter(s => s[5].includes('fishing')).map(s => s[0]))")
    fresh = [n for n in names if re.search(r"lake|river|creek|stream|dam|marina|recreation area", n, re.I)]
    assert len(fresh) >= 12, fresh
    assert "rivers" in page.evaluate("RT.INTERESTS.find(i => i[0] === 'fishing')[1]").lower()


def test_picking_fishing_shows_the_license_links_on_the_itinerary_and_booking_pages(page):
    draft(page, ["fishing", "scenic"])
    want = page.evaluate("['TN', 'NC'].map(a => RT_STATE_BY_ABBR[a].fish)")
    for tab in ("trip", "budget"):
        page.click(f"#tabs [data-tab={tab}]")
        hrefs = page.eval_on_selector_all(".fish-license a", "as => as.map(a => a.href)")
        assert set(want) <= set(hrefs), (tab, hrefs)
        assert "fishing license" in page.inner_text(".fish-license").lower()


def test_trips_cards_show_the_license_for_fishing_trips(page):
    page.evaluate("RT.state.profile.interests = ['fishing']; RT.state.recs = []; RT.state.profile.destState = 'MO'")
    page.click("#tabs [data-tab=destinations]")
    card = page.locator(".card.dest").first
    assert card.locator(".fish-license a").count() >= 1, card.inner_text()


def test_no_license_links_without_fishing(page):
    draft(page, ["scenic", "parks"])
    page.click("#tabs [data-tab=trip]")
    assert page.locator(".fish-license").count() == 0
