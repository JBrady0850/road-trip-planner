"""Interest categories: grouped chips on the Plan page, and every chip backed by real
catalog places, so picking it changes which trips rank first."""
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
NEW = ["wildlife", "gardens", "camping", "golf", "music", "drinks", "art", "themeparks", "family", "spa", "markets"]
# Four requested categories widen chips that already existed, so saved trips keep their picks.
MERGED = {"hiking": "nature trails", "history": "historic sites", "scenic": "overlooks", "lights": "fairs"}
GROUPS = ["Outdoors and nature", "Coast and water", "Culture and entertainment", "Family and relaxation"]


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        yield pg
        b.close()


def test_chips_are_grouped_and_include_every_new_category(page):
    page.click("#tabs [data-tab=interview]")
    heads = page.eval_on_selector_all(".chip-group .chip-head", "hs => hs.map(h => h.textContent.trim())")
    assert heads == GROUPS, heads
    keys = page.eval_on_selector_all(".chip-group [data-act=interest]", "cs => cs.map(c => c.dataset.k)")
    assert len(keys) == len(set(keys)) == 24, keys
    for k in NEW:
        assert k in keys, f"no chip for {k}"
    for k, words in MERGED.items():
        assert words in page.inner_text(f".chip-group [data-k={k}]").lower(), k
    assert page.locator(".chip-group [data-act=interest] svg use").count() == 24, "every chip has its icon"
    for k in NEW:
        assert page.locator(f"svg symbol#i-{k}").count() == 1, f"icon i-{k} is missing"


def test_each_new_category_ranks_a_trip_with_that_kind_of_place_first(page):
    for k in NEW:
        top = page.evaluate("""k => { const p = RT.defaultProfile(); p.interests = [k];
            p.home = { label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee" }; p.flyOk = true;
            const r = RT.scoreDestinations(p, RT_CATALOG, null, 7)[0];
            return { name: r.dest.name, hits: r.stopsRanked[0].hits, reason: r.reasons.join("; ") }; }""", k)
        assert top["hits"] >= 1, f"{k}: the best match has no {k} place: {top}"
        assert page.evaluate("k => RT.interestName(k) !== k", k), f"{k} has no plain name for the reasons"


def test_the_interests_page_on_trips_uses_the_same_groups(page):
    page.evaluate('RT.state.profile.home = {label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}')
    page.click("#tabs [data-tab=destinations]")
    page.click("summary:has-text('Your interests')")
    assert page.locator("details .chip-group").count() == len(GROUPS)
