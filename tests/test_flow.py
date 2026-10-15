"""Step-by-step flow: every planning page ends with Back and Next buttons, the tabs
carry the same step numbers, and every place the app tells you to go somewhere
offers a real button that goes there."""
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = '{label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}'
STEPS = [("interview", "Plan"), ("destinations", "Trips"), ("trip", "Itinerary"),
         ("navigate", "Navigate"), ("weather", "Weather & Roads"), ("budget", "Budget & Booking")]


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 834, "height": 1194}, accept_downloads=True)
        pg = ctx.new_page()
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())  # offline: drive times stay estimates
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}")
        yield pg
        b.close()


def current_tab(page):
    return page.get_attribute("#tabs button[aria-selected=true]", "data-tab")


def test_tabs_show_the_step_numbers(page):
    for i, (tab, name) in enumerate(STEPS, start=1):
        label = page.inner_text(f"#tabs [data-tab={tab}]")
        assert label.startswith(str(i)) and name.lower() in label.lower(), (tab, label)


def test_next_walks_through_every_step_and_back_returns(page):
    page.click("#tabs [data-tab=interview]")
    for i, (tab, name) in enumerate(STEPS, start=1):
        bar = page.locator(".stepbar")
        assert bar.count() == 1, f"{tab}: no step bar at the end of the page"
        assert f"step {i} of {len(STEPS)}" in bar.inner_text().lower(), bar.inner_text()
        last = page.evaluate("[...document.querySelector('#view').children].pop().className")
        assert "stepbar" in last, f"{tab}: the step bar is not the last thing on the page"
        if i == len(STEPS):
            assert bar.locator("[data-act=saveTrip]").count() == 1, "the last step saves the trip"
            break
        nxt = bar.locator(".step-next")
        assert STEPS[i][1].split(" ")[0].lower() in nxt.inner_text().lower() or i == 2, nxt.inner_text()
        nxt.click()
        page.wait_for_function(f"document.querySelector('#tabs button[aria-selected=true]').dataset.tab === '{STEPS[i][0]}'", timeout=15000)
    page.locator(".stepbar .step-back").click()
    assert current_tab(page) == "weather"


def test_the_trip_hint_offers_real_buttons(page):
    page.evaluate("localStorage.removeItem('rtp:tripHint')")
    page.click("#tabs [data-tab=destinations]")
    page.locator(".stepbar .step-next").click()
    page.wait_for_selector(".hint", timeout=15000)
    hint = page.locator(".hint")
    for tab in ("navigate", "weather", "budget"):
        assert hint.locator(f"button[data-act=go][data-t={tab}]").count() == 1, f"hint names {tab} without a button"
    hint.locator("button[data-t=navigate]").click()
    assert current_tab(page) == "navigate"
