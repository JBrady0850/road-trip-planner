"""Tester feedback: the app's Give feedback card and the GitHub issue forms it fills.

GitHub fills an issue form field from a URL query parameter named after the field's
`id` (docs.github.com, "Syntax for GitHub's form schema"), so every parameter the app
sends must be an id in the form, or the tester's words are silently dropped."""
import re
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
APP = (ROOT / "app" / "index.html").as_uri()
FORMS = ROOT / ".github" / "ISSUE_TEMPLATE"
REPO = "https://github.com/JBrady0850/road-trip-planner"


def form_ids(path):
    text = path.read_text(encoding="utf-8")
    return re.findall(r"^\s+id:\s*([A-Za-z0-9_-]+)\s*$", text, re.M)


def form_key(path, key):
    m = re.search(rf"^{key}:\s*(.+)$", path.read_text(encoding="utf-8"), re.M)
    return m.group(1).strip().strip('"') if m else None


def test_issue_forms_are_well_formed():
    forms = sorted(FORMS.glob("*.yml"))
    names = {f.name for f in forms}
    assert {"tester-feedback.yml", "bug-report.yml", "suggest-improvement.yml", "config.yml"} <= names, names
    for f in forms:
        if f.name == "config.yml":
            continue
        assert len(form_key(f, "name") or "") > 3, f"{f.name}: name must be more than 3 characters"
        ids = form_ids(f)
        assert ids and len(ids) == len(set(ids)), f"{f.name}: ids must exist and be unique: {ids}"
    cfg = (FORMS / "config.yml").read_text(encoding="utf-8")
    assert "blank_issues_enabled:" in cfg and f"{REPO}/discussions" in cfg


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 834, "height": 1194}, accept_downloads=True)
        pg = ctx.new_page()
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate("window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }")
        yield pg
        b.close()


def test_feedback_card_fills_the_github_form(page):
    page.evaluate("""RT.state.profile.home = { label: "Knoxville, TN", lat: 35.96, lon: -83.92, state: "Tennessee" };
        RT.state.trip = RT.draftTrip(RT.state.profile, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-10-15", 3, RT_CATALOG);""")
    page.click("#tabs [data-tab=feedback]")
    page.wait_for_selector("h1:has-text('Give feedback')")
    assert page.input_value("[data-fb=device]"), "device is filled in for the tester"
    page.fill("[data-fb=task]", "Planned a weekend in the Smokies")
    page.click("[data-fb-ease='4']")
    page.fill("[data-fb=problems]", "The free day was confusing")
    page.fill("[data-fb=ideas]", "Show lighthouses on the map")
    page.check("[data-fb=includeTrip]")
    page.click("[data-act=fbGithub]")
    url = page.evaluate("window.__opened[window.__opened.length - 1]")
    u = urlparse(url)
    assert f"{u.scheme}://{u.netloc}{u.path}" == f"{REPO}/issues/new", url
    q = {k: v[0] for k, v in parse_qs(u.query).items()}
    assert q["template"] == "tester-feedback.yml"
    ids = set(form_ids(FORMS / "tester-feedback.yml"))
    sent = set(q) - {"template", "title", "labels"}
    assert sent <= ids, f"fields GitHub would drop: {sent - ids}"
    assert q["task"] == "Planned a weekend in the Smokies" and q["ease"].startswith("4")
    assert "Great Smoky Mountains" in q["trip"]
    assert "Knoxville" not in url, "home never leaves the device in feedback"
    assert len(url) < 7000, "stay well under GitHub's URL limit"


def test_long_answers_keep_the_link_short(page):
    page.click("#tabs [data-tab=feedback]")
    for k in ("task", "liked", "problems", "ideas"):
        page.fill(f"[data-fb={k}]", "word and space " * 400)
    url = page.evaluate("RT.feedbackUrl()")
    assert len(url) < 8000, len(url)


def test_feedback_saves_as_a_file_without_a_github_account(page):
    page.click("#tabs [data-tab=feedback]")
    page.fill("[data-fb=ideas]", "Bigger buttons on the phone")
    with page.expect_download() as d:
        page.click("[data-act=fbSave]")
    text = Path(d.value.path()).read_text(encoding="utf-8")
    assert d.value.suggested_filename.startswith("road-trip-planner-feedback") and "Bigger buttons on the phone" in text
    assert "Knoxville" not in text


def test_feedback_links_to_ideas_discussions(page):
    page.click("#tabs [data-tab=feedback]")
    assert page.locator(f"a[href='{REPO}/discussions/categories/ideas']").count() >= 1
