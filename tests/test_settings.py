"""Settings: every outside service the page names comes with its official link, and
nothing implies a sign-up that does not exist. Sources checked 2026-10-15:
Nominatim usage policy and Search API docs (email is optional, for large numbers of
requests), Claude Console API keys page, OSRM demo server usage policy."""
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
LINKS = {
    "https://operations.osmfoundation.org/policies/nominatim/": "place search usage policy",
    "https://nominatim.org/release-docs/latest/api/Search/": "what the email is for",
    "https://platform.claude.com/settings/keys": "where to make an API key",
    "https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy": "routing server usage policy",
}


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.click("#tabs [data-tab=settings]")
        yield pg
        b.close()


def test_every_named_service_links_to_its_official_page(page):
    for href, what in LINKS.items():
        a = page.locator(f"main a[href='{href}']")
        assert a.count() >= 1, f"Settings has no link for {what}"
        assert a.first.get_attribute("target") == "_blank" and "noopener" in (a.first.get_attribute("rel") or "")


def test_contact_email_is_optional_and_needs_no_sign_up(page):
    card = page.locator(".card:has(input[data-bind='profile.contactEmail'])")
    text = card.inner_text().lower()
    assert "optional" in text and "no sign-up" in text, text
    assert "recommended by their usage policy" not in text, "the usage policy does not ask for an email"


def test_destinations_point_to_settings_with_a_button(page):
    page.evaluate('RT.state.profile.home = {label: "Knoxville, TN", lat: 35.96, lon: -83.92, state: "Tennessee"}')
    page.click("#tabs [data-tab=destinations]")
    page.locator("main button[data-act=go][data-t=settings]").click()
    assert page.get_attribute("#tabs button[aria-selected=true]", "data-tab") == "settings"
