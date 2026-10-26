"""Make my trip unique: a five-question interview on the Trips and Itinerary pages that
shows at least eight options, grouped by area, and puts the picks into the trip. With
the traveler's own AI key, AI ideas join the list, each marked AI and UNVERIFIED."""
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
        pg.route("https://api.anthropic.com/**", lambda r: r.abort())  # no key in most tests; never reach the network
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {HOME}")
        yield pg
        b.close()


def answer(page, standout=("nature",), unusual="rare", effort="some", reach=None, notes=""):
    """Walk the five questions; return the question titles seen."""
    seen = []
    for i in range(5):
        q = page.locator("#uq .uq-q")
        seen.append(q.inner_text().strip())
        assert f"question {i + 1} of 5" in page.inner_text("#uq").lower()
        if i == 0:
            for k in standout:
                page.click(f"#uq [data-act=uqAns][data-q=standout][data-k={k}]")
        elif i == 1:
            page.click(f"#uq [data-act=uqAns][data-q=unusual][data-k={unusual}]")
        elif i == 2:
            page.click(f"#uq [data-act=uqAns][data-q=effort][data-k={effort}]")
        elif i == 3 and reach:
            page.click(f"#uq [data-act=uqAns][data-q=reach][data-k={reach}]")
        elif i == 4 and notes:
            page.fill("#uqNotes", notes)
        page.click("#uq [data-act=uqNext]")
    page.wait_for_selector("#uq .uq-opt")
    return seen


def test_engine_gives_eight_or_more_options_that_follow_the_answers(page):
    r = page.evaluate("""() => { const p = RT.state.profile; p.interests = ["scenic"];
        const a = { standout: ["nature"], unusual: "rare", effort: "some", reach: "any", notes: "" };
        const out = RT.uniqueOptions(p, RT_CATALOG, a, { nights: 5, month: 6 });
        const b = { standout: ["history"], unusual: "rare", effort: "some", reach: "any", notes: "" };
        const out2 = RT.uniqueOptions(p, RT_CATALOG, b, { nights: 5, month: 6 });
        const pick = o => ({ kind: o.kind, name: o.name, tags: o.tags || [], why: o.why, dest: o.destId, src: o.source });
        return { a: out.options.map(pick), b: out2.options.map(pick), groups: out.groups.map(g => g.dest.id) }; }""")
    assert len(r["a"]) >= 8 and len(r["b"]) >= 8
    assert {o["kind"] for o in r["a"]} <= {"place", "experience"}
    assert any(o["kind"] == "experience" for o in r["a"]), "Only-here experiences are offered"
    for o in r["a"]:
        assert o["why"], o
        assert o["src"] == "catalog"
    nature = {"waterfalls", "caves", "spa"}
    top_a = [o for o in r["a"] if o["kind"] == "place"][:4]
    assert all(nature & set(o["tags"]) or "falls" in o["name"].lower() or "cave" in o["name"].lower() for o in top_a), top_a
    assert [o["name"] for o in r["a"]][:5] != [o["name"] for o in r["b"]][:5], "different answers give different options"
    assert len(r["groups"]) >= 2, "options come from more than one area"


def test_typed_words_pull_matching_places_up(page):
    names = page.evaluate("""() => { const p = RT.state.profile;
        const a = { standout: [], unusual: "mix", effort: "any", reach: "any", notes: "lighthouse" };
        return RT.uniqueOptions(p, RT_CATALOG, a, { nights: 7, month: 7 }).options.slice(0, 4).map(o => o.name + " " + (o.text || "")); }""")
    assert all("light" in n.lower() for n in names), names


def test_trips_page_interview_builds_a_trip_with_the_picks(page):
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector("[data-act=uqOpen]")
    page.click("[data-act=uqOpen]")
    seen = answer(page, standout=("nature", "history"), reach="trip")
    assert len(set(seen)) == 5, seen
    opts = page.locator("#uq .uq-opt")
    assert opts.count() >= 8, opts.count()
    assert page.locator("#uq .uq-group").count() >= 2, "options are grouped by area"
    assert page.locator("#uq .uq-opt.experience").count() >= 1, "Only-here experiences stay in the mix"
    group = page.locator("#uq .uq-group").first
    places = group.locator(".uq-opt.place")
    assert places.count() >= 1
    picked = [places.nth(i).locator(".uq-name").inner_text().strip() for i in range(min(2, places.count()))]
    for i in range(len(picked)):
        places.nth(i).locator("[data-act=uqPick]").click()
    exp = group.locator(".uq-opt.experience")
    exp_text = ""
    if exp.count():
        exp_text = exp.first.locator(".uq-name").inner_text().strip()
        exp.first.locator("[data-act=uqPick]").click()
    assert page.locator("#uq [data-act=uqPick][aria-pressed=true]").count() == len(picked) + (1 if exp_text else 0)
    page.click("#uq [data-act=uqBuild]")
    page.wait_for_function("() => RT.state.tab === 'trip' && RT.state.trip")
    names = page.evaluate("RT.state.trip.days.flatMap(d => d.stops.map(s => s.name))")
    for n in picked:
        assert n in names, f"picked {n} is not in the trip"
    if exp_text:
        assert exp_text in page.inner_text(".exp-card"), "a picked experience shows on the trip"


def test_itinerary_interview_adds_picks_to_the_current_trip(page):
    page.evaluate("""() => { const p = RT.state.profile; p.interests = ["scenic", "parks"];
        RT.state.trip = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-06-11", 5, RT_CATALOG); }""")
    page.click("#tabs [data-tab=trip]")
    page.click("[data-act=uqOpen]")
    answer(page, standout=("nature", "wildlife"), reach="day")
    opts = page.locator("#uq .uq-opt")
    assert opts.count() >= 8
    before = page.evaluate("RT.state.trip.days.flatMap(d => d.stops.map(s => s.name))")
    ndays = page.evaluate("RT.state.trip.days.length")
    place = page.locator("#uq .uq-opt.place").first
    name = place.locator(".uq-name").inner_text().strip()
    assert name not in before, "options are new places, not ones already in the trip"
    place.locator("[data-act=uqPick]").click()
    page.click("#uq [data-act=uqAdd]")
    page.wait_for_function("n => RT.state.trip.days.some(d => d.stops.some(s => s.name === n))", arg=name)
    assert page.evaluate("RT.state.trip.days.length") == ndays, "adding picks keeps the same days"
    assert page.locator("#uq").count() == 0, "the interview closes after adding"


def test_back_keeps_the_answers(page):
    page.click("#tabs [data-tab=destinations]")
    page.click("[data-act=uqOpen]")
    page.click("#uq [data-act=uqAns][data-q=standout][data-k=sky]")
    page.click("#uq [data-act=uqNext]")
    page.click("#uq [data-act=uqBack]")
    assert page.get_attribute("#uq [data-q=standout][data-k=sky]", "aria-pressed") == "true"


def test_ai_ideas_join_the_list_marked_ai_with_a_key(page):
    ideas = {"places": [
        {"name": "Lost Sea Adventure", "address": "140 Lost Sea Rd, Sweetwater, TN", "lat": 35.5336, "lon": -84.4319, "minutes": 90, "why": "A boat ride on an underground lake"},
        {"name": "No coordinates place", "address": "Somewhere", "why": "dropped: no location"}]}
    seen = {}
    def anthropic(route):
        seen["body"] = json.loads(route.request.post_data)
        route.fulfill(json={"content": [{"type": "text", "text": json.dumps(ideas)}]}, headers=CORS)
    page.unroute("https://api.anthropic.com/**")
    page.route("https://api.anthropic.com/**", anthropic)
    page.evaluate("RT.state.profile.aiKey = 'test-key-not-real'")
    page.click("#tabs [data-tab=destinations]")
    page.click("[data-act=uqOpen]")
    answer(page, standout=("nature",), reach="trip", notes="underground")
    page.wait_for_selector("#uq .uq-opt.ai")
    ai = page.locator("#uq .uq-opt.ai")
    assert ai.count() == 1, "an idea without a location is dropped"
    txt = ai.first.inner_text()
    assert "AI" in ai.first.locator(".tag.ai").inner_text() and "UNVERIFIED" in txt
    assert "underground" in seen["body"]["messages"][0]["content"], "the typed words reach the AI"
    assert page.locator("#uq .uq-opt:not(.ai)").count() >= 8, "catalog options stay"
    ai.first.locator("[data-act=uqPick]").click()
    page.click("#uq [data-act=uqBuild]")
    page.wait_for_function("() => RT.state.tab === 'trip' && RT.state.trip")
    stop = page.evaluate("RT.state.trip.days.flatMap(d => d.stops).find(s => s.name === 'Lost Sea Adventure')")
    assert stop and stop["ai"] is True, stop
    assert page.locator(".stop:has-text('Lost Sea Adventure') .tag.ai").count() == 1


def test_without_a_key_nothing_is_sent_to_the_ai(page):
    calls = []
    page.unroute("https://api.anthropic.com/**")
    page.route("https://api.anthropic.com/**", lambda r: (calls.append(1), r.abort()))
    page.click("#tabs [data-tab=destinations]")
    page.click("[data-act=uqOpen]")
    answer(page, reach="trip")
    assert calls == []
    assert page.locator("#uq .uq-opt.ai").count() == 0


def test_the_first_question_is_not_hidden_under_the_header(page):
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.click("[data-act=uqOpen]")
    page.wait_for_timeout(100)
    head = page.evaluate("document.querySelector('.top').getBoundingClientRect().bottom")
    q = page.evaluate("document.querySelector('#uq').getBoundingClientRect().top")
    assert q >= head, f"the interview starts under the header: {q} < {head}"
