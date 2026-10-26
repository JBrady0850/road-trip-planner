"""Four AI providers with the traveler's own key: Claude, ChatGPT, Gemini, and Grok.
Settings links each provider's official key page; each request goes only to that
provider's API with its own sign-in header; the answer becomes a trip marked AI with
the provider and model named. Request and answer shapes follow each provider's API
reference (checked 2026-10-26): Anthropic Messages, OpenAI and xAI Responses, Gemini
generateContent."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = '{label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}'
CORS = {"Access-Control-Allow-Origin": "*"}
TRIP = {"name": "Provider Trip", "states": ["TN"], "days": [{"date": "2099-05-01", "title": "Day", "stops": [
    {"name": "Home", "address": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "depart": "08:30"},
    {"name": "Sugarlands Visitor Center", "address": "1420 Fighting Creek Gap Rd, Gatlinburg, TN", "lat": 35.6853, "lon": -83.5367, "arrive": "09:40", "depart": "10:30"},
    {"name": "Home", "address": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "arrive": "12:00"}]}]}
TEXT = json.dumps(TRIP)
PROVIDERS = {
    # id: (API address prefix, answer body, key page, default model, short name)
    "anthropic": ("https://api.anthropic.com/v1/messages", {"content": [{"type": "text", "text": TEXT}]}, "https://platform.claude.com/settings/keys", "claude-sonnet-5-5", "Claude"),
    "openai": ("https://api.openai.com/v1/responses", {"output": [{"type": "reasoning", "summary": []}, {"type": "message", "content": [{"type": "output_text", "text": TEXT}]}]}, "https://platform.openai.com/api-keys", "gpt-6-astra", "ChatGPT"),
    "gemini": ("https://generativelanguage.googleapis.com/v1beta/models/", {"candidates": [{"content": {"parts": [{"text": TEXT}]}}]}, "https://aistudio.google.com/apikey", "gemini-3.8-flash", "Gemini"),
    "xai": ("https://api.x.ai/v1/responses", {"output": [{"type": "message", "content": [{"type": "output_text", "text": TEXT}]}]}, "https://console.x.ai/team/default/api-keys", "grok-4.7", "Grok"),
}
HOSTS = ["api.anthropic.com", "api.openai.com", "generativelanguage.googleapis.com", "api.x.ai"]


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 834, "height": 1194}, accept_downloads=True)
        pg = ctx.new_page()
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}")
        yield pg
        b.close()


def set_key(page, pid, key="test-key-not-real"):
    page.evaluate("""([pid, key]) => { const p = RT.state.profile; p.aiProvider = pid;
        if (pid === "anthropic") p.aiKey = key; else p.aiKeys[pid] = key; }""", [pid, key])


@pytest.mark.parametrize("pid", list(PROVIDERS))
def test_each_provider_builds_a_marked_trip_through_its_own_api(page, pid):
    url, answer, _, model, short = PROVIDERS[pid]
    seen = []
    def handler(route):
        seen.append({"url": route.request.url, "headers": route.request.headers, "body": json.loads(route.request.post_data)})
        route.fulfill(json=answer, headers=CORS)
    for h in HOSTS:
        page.route(f"https://{h}/**", handler)
    set_key(page, pid)
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI][data-i='0']")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_selector("h1:has-text('Provider Trip')")
    assert len(seen) == 1 and seen[0]["url"].startswith(url), [s["url"] for s in seen]
    h, body = seen[0]["headers"], seen[0]["body"]
    if pid == "anthropic":
        assert h.get("x-api-key") == "test-key-not-real" and body["model"] == model
    elif pid == "gemini":
        assert h.get("x-goog-api-key") == "test-key-not-real" and "authorization" not in h
        assert seen[0]["url"].startswith(url + model + ":generateContent")
        assert "test-key-not-real" not in seen[0]["url"], "the key never goes in the address"
        assert body["contents"][0]["parts"][0]["text"].startswith("Plan a")
    else:
        assert h.get("authorization") == "Bearer test-key-not-real" and body["model"] == model
        assert body["input"][1]["role"] == "user" and body["input"][1]["content"].startswith("Plan a")
    t = page.evaluate("RT.state.trip")
    assert t["aiBy"] == f"{short}, model {model}"
    assert all(s.get("aiBy") == t["aiBy"] for d in t["days"] for s in d["stops"] if s.get("ai"))
    assert short in page.inner_text(".ai-legend")


def test_settings_offers_each_provider_with_its_official_key_page(page):
    page.click("#tabs [data-tab=settings]")
    for pid, (_, _, key_url, model, short) in PROVIDERS.items():
        page.select_option("select[data-bind='profile.aiProvider']", pid)
        card = page.locator("#aiCard")
        a = card.locator(f"a[href='{key_url}']")
        assert a.count() == 1, f"{pid}: no link to {key_url}"
        assert a.get_attribute("target") == "_blank" and "noopener" in a.get_attribute("rel")
        assert short in card.inner_text()
        if pid != "anthropic":
            assert card.locator("input[data-bind^='profile.aiModels.']").get_attribute("placeholder") == model
        page.fill("#aiCard input[type=password]", f"key-{pid}")
        page.dispatch_event("#aiCard input[type=password]", "change")
    keys = page.evaluate("[RT.state.profile.aiKey, RT.state.profile.aiKeys]")
    assert keys[0] == "key-anthropic" and keys[1] == {"openai": "key-openai", "gemini": "key-gemini", "xai": "key-xai"}


def test_only_the_selected_provider_is_used(page):
    calls = []
    def blocker(host):
        return lambda route: (calls.append(host), route.abort())
    for h in HOSTS:
        page.route(f"https://{h}/**", blocker(h))
    page.evaluate("RT.state.profile.aiKeys.openai = 'x'; RT.state.profile.aiProvider = 'gemini'")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    assert page.locator("[data-act=buildAI]").count() == 0, "no key for the selected provider: no AI buttons"
    page.evaluate("RT.state.profile.aiProvider = 'openai'; RT.state.recs = []")
    page.click("#tabs [data-tab=interview]")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI]")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_function("() => !RT.state.busy")
    assert calls == ["api.openai.com"], calls


def test_backup_blanks_every_key(page):
    page.evaluate("RT.state.profile.aiKey = 'a'; RT.state.profile.aiKeys = {openai: 'b', gemini: 'c', xai: 'd'}")
    page.click("#tabs [data-tab=settings]")
    with page.expect_download() as d:
        page.click("[data-act=backup]")
    j = json.loads(Path(d.value.path()).read_text(encoding="utf-8"))
    assert j["profile"]["aiKey"] == ""
    assert j["profile"]["aiKeys"] == {"openai": "", "gemini": "", "xai": ""}


def test_an_error_names_the_provider(page):
    page.route("https://api.x.ai/**", lambda r: r.fulfill(status=401, json={"code": "unauthenticated", "error": "Incorrect API key"}, headers=CORS))
    set_key(page, "xai")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=buildAI]")
    page.click("[data-act=buildAI][data-i='0']")
    page.wait_for_function("() => document.querySelector('#toast').textContent.includes('Grok')")
    assert "HTTP 401" in page.inner_text("#toast")
