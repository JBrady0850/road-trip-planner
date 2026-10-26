"""Checks added after the v0.8.0 review: the interview belongs to one trip, a place is
never added twice, port days are left alone, added places get times at once, day-trip
experiences are not offered again, older AI trips are marked in every export, the list
of recommendations stays short, and AI answers with no text or a ZIP code are handled."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = '{label: "Knoxville, TN", lat: 35.9606, lon: -83.9207, state: "Tennessee"}'
CORS = {"Access-Control-Allow-Origin": "*"}


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.route("https://api.anthropic.com/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}")
        yield pg
        b.close()


def smokies(page, nights=5):
    page.evaluate("""n => { const p = RT.state.profile; p.interests = ["scenic", "parks"];
        RT.state.trip = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-06-11", n, RT_CATALOG); }""", nights)


def finish_interview(page):
    for _ in range(5):
        page.click("#uq [data-act=uqNext]")
    page.wait_for_selector("#uq .uq-opt")


def test_the_itinerary_interview_closes_when_the_trip_changes(page):
    smokies(page)
    page.click("#tabs [data-tab=trip]")
    page.click("[data-act=uqOpen]")
    finish_interview(page)
    page.locator("#uq .uq-opt.place [data-act=uqPick]").first.click()
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=build][data-i='1']")
    page.locator("[data-act=build][data-i='1']").first.click()
    page.wait_for_selector(".stop")
    assert page.locator("#uq").count() == 0, "an interview for the old trip is still open"
    assert page.evaluate("RT.state.uq") is None


def test_a_place_is_never_added_twice(page):
    smokies(page)
    r = page.evaluate("""() => { const t = RT.state.trip, c = RT.recommendPlaces(t, RT_CATALOG, RT.state.profile)[0];
        const a = RT.addPlace(t, 1, c), b = RT.addPlace(t, 2, c);
        return { first: !!a, second: b, count: t.days.flatMap(d => d.stops).filter(s => s.name === c.name).length }; }""")
    assert r == {"first": True, "second": None, "count": 1}, r


def test_interview_options_drop_places_added_since(page):
    smokies(page)
    page.click("#tabs [data-tab=trip]")
    page.click("[data-act=uqOpen]")
    finish_interview(page)
    name = page.locator("#uq .uq-opt.place .uq-name").first.inner_text().strip()
    page.evaluate("""n => { const t = RT.state.trip, o = RT.state.uq.res.options.find(x => x.name === n); RT.addPlace(t, 1, o); }""", name)
    page.locator("#uq .uq-opt [data-act=uqPick]").last.click()  # any re-render of the same list
    names = page.eval_on_selector_all("#uq .uq-name", "els => els.map(e => e.textContent.trim())")
    assert name not in names


def test_port_days_have_no_interview_and_get_no_additions(page):
    r = page.evaluate("""() => { const p = RT.state.profile, port = RT_PORTS[0];
        const t = RT.portTrip(p, port, { arrive: "08:00", depart: "17:00", buffer: 30, line: "" }, "2027-02-10", "excursion");
        RT.state.trip = t;
        const u = RT.uniqueOptions(p, RT_CATALOG, RT.uniqueDefaults("trip"), { trip: t });
        const add = RT.addUnique(t, [{ kind: "place", name: "X", address: "Y", lat: 25.7, lon: -80.2, minutes: 30 }], RT_CATALOG);
        return { n: u.options.length, added: add.added.length, recs: RT.recommendPool(t, RT_CATALOG, p).length }; }""")
    assert r == {"n": 0, "added": 0, "recs": 0}, r
    page.click("#tabs [data-tab=trip]")
    assert page.locator("[data-act=uqOpen]").count() == 0


def test_an_added_place_gets_estimated_times_offline(page):
    smokies(page)
    s = page.evaluate("""() => { const t = RT.state.trip, c = RT.recommendPlaces(t, RT_CATALOG, RT.state.profile)[0];
        const s = RT.addPlace(t, 1, c), d = t.days[1]; return { s, end: d.stops[d.stops.length - 1].arrive, ics: RT.ics(t).includes(c.name) }; }""")
    assert s["s"]["arrive"] and s["s"]["depart"], s
    assert s["end"] > s["s"]["depart"], "the day's end comes after the new stop"
    assert s["ics"], "the calendar includes the new stop"


def test_day_trip_experiences_are_not_offered_again(page):
    r = page.evaluate("""() => { const p = RT.state.profile; p.interests = ["scenic"];
        const t = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-06-11", 6, RT_CATALOG);
        const near = RT.nearbyDestinations(t, RT_CATALOG, p).find(n => n.dest.experiences && n.dest.experiences.length);
        if (!RT.fillFreeDays(t, p, near)) return { skip: true };
        const a = { standout: ["sky", "history", "nature"], unusual: "mix", effort: "any", reach: "day", notes: "" };
        const out = RT.uniqueOptions(p, RT_CATALOG, a, { trip: t }).options.filter(o => o.kind === "experience").map(o => o.name);
        return { exp: near.dest.experiences, out }; }""")
    if r.get("skip"):
        pytest.skip("no free day to fill")
    assert not set(r["exp"]) & set(r["out"]), r


def test_an_older_ai_trip_is_marked_in_every_export(page):
    page.evaluate("""() => { const p = RT.state.profile;
        const t = { name: "Old AI", states: ["TN"], createdBy: "ai", days: [{ date: "2099-05-01", title: "Old", stops: [
          RT.mkStop("Home", "Knoxville, TN", 35.96, -83.92, { type: "Home", depart: "08:30" }),
          RT.mkStop("Old Stop", "1 A St, Gatlinburg, TN", 35.71, -83.51, { arrive: "10:00", depart: "11:00" }),
          RT.mkStop("Home", "Knoxville, TN", 35.96, -83.92, { type: "Home", arrive: "13:00" })] }] };
        RT.state.trip = t; }""")
    page.click("#tabs [data-tab=trip]")
    assert "every stop" in page.inner_text(".ai-legend").lower()
    out = page.evaluate("[RT.csv(RT.state.trip), RT.ics(RT.state.trip), RT.kmlDay(RT.state.trip, 0, null)]")
    for x in out:
        assert "Old Stop (AI)" in x and "Home (AI)" not in x
    # an AI pick added later keeps the older-trip warning
    page.evaluate("""() => RT.addPlace(RT.state.trip, 0, { name: "New AI", address: "2 B St, Gatlinburg, TN", lat: 35.7, lon: -83.5, minutes: 30, ai: true, aiBy: "Claude, model x" })""")
    page.click("#tabs [data-tab=navigate]")
    page.click("#tabs [data-tab=trip]")
    assert "every stop" in page.inner_text(".ai-legend").lower()


def test_recommendations_stay_short_with_many_picks(page):
    smokies(page)
    r = page.evaluate("""() => { const t = RT.state.trip, pool = RT.recommendPool(t, RT_CATALOG, RT.state.profile), size = RT.recommendSize(pool);
        const picked = new Set(pool.slice(0, 4).map(c => c.name));
        const few = RT.recommendNext(pool, picked, new Set(), size).list.length;
        const many = new Set(pool.slice(0, 6).map(c => c.name));
        return { size, few, many: RT.recommendNext(pool, many, new Set(), size).list.length }; }""")
    assert r["few"] == r["size"], r
    assert r["many"] == max(r["size"], 9), "six picks show three new places"


def test_hawaii_and_alaska_get_no_drive_to_near_trips(page):
    out = page.evaluate("""() => ["HI", "AK"].map(s => RT.rankWithPick(RT.state.profile, RT_CATALOG, 7, 5, s, null).filter(r => r.near).length)""")
    assert out == [0, 0]


def test_gemini_answer_without_text_gives_a_plain_error(page):
    page.route("https://generativelanguage.googleapis.com/**", lambda r: r.fulfill(json={"candidates": [{"finishReason": "SAFETY"}]}, headers=CORS))
    page.evaluate("RT.state.profile.aiProvider = 'gemini'; RT.state.profile.aiKeys.gemini = 'k'")
    msg = page.evaluate("RT.services.aiText(RT.state.profile, 's', 'u').then(() => 'ok', e => e.message)")
    assert "Gemini sent no answer" in msg and "SAFETY" in msg, msg


def test_a_zip_code_does_not_hide_the_state(page):
    st = page.evaluate("""() => RT.uniqueOptions(RT.state.profile, [{ id: "z", name: "Z", states: ["GA"], base: ["X, GA", 34, -83], months: [1,2,3,4,5,6,7,8,9,10,11,12], tags: [],
        stops: [["P", "1 A St, Greenville, SC 29601", 34.85, -82.4, 30, ["caves"]]] }], RT.uniqueDefaults("plan"), { nights: 4 }).options.find(o => o.kind === "place").state""")
    assert st == "SC", "the state comes from the address, not the trip's first state"


def test_ai_booking_links_keep_only_web_addresses(page):
    trip = {"name": "T", "states": ["TN"], "days": [{"date": "2099-05-01", "title": "D", "stops": [
        {"name": "Home", "address": "Knoxville, TN", "lat": 35.96, "lon": -83.92},
        {"name": "Bad", "address": "1 A St, Gatlinburg, TN", "lat": 35.7, "lon": -83.5, "booking_url": "javascript:alert(1)"},
        {"name": "Good", "address": "2 B St, Gatlinburg, TN", "lat": 35.71, "lon": -83.51, "booking_url": "https://example.org/book"}]}]}
    page.unroute("https://api.anthropic.com/**")
    page.route("https://api.anthropic.com/**", lambda r: r.fulfill(json={"content": [{"type": "text", "text": json.dumps(trip)}]}, headers=CORS))
    page.evaluate("RT.state.profile.aiKey = 'k'")
    urls = page.evaluate("RT.services.aiDraft(RT.state.profile, null, '2099-05-01', 1, '').then(t => t.days[0].stops.map(s => s.booking_url))")
    assert urls == ["", "", "https://example.org/book"], urls
