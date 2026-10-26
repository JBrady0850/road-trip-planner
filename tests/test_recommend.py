"""Recommendations follow the picked interests: drafts put matching places first, the
Trips page always offers at least five trips, and every itinerary lists at least five
places to add, each with a real Add button."""
import re
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
HOME = {"label": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "state": "Tennessee"}


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())  # offline: drive times stay estimates
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        yield pg
        b.close()


def draft(page, dest_id, interests, nights=3):
    return page.evaluate("""([destId, interests, nights, home]) => {
        const p = RT.defaultProfile(); p.home = home; p.interests = interests;
        const dest = RT_CATALOG.find(d => d.id === destId);
        const trip = RT.draftTrip(p, dest, "2027-06-11", nights, RT_CATALOG);
        const placed = trip.days.flatMap(d => d.stops.filter(s => s.type !== "Hotel" && s.type !== "Home").map(s => s.name));
        const match = dest.stops.filter(s => s[5].some(t => interests.includes(t))).map(s => s[0]);
        return { placed, match };
    }""", [dest_id, list(interests), nights, HOME])


@pytest.mark.parametrize("dest,interests", [("tn-smokies", ["history"]), ("tn-smokies", ["fishing"]), ("nc-high-country", ["fishing", "water"])])
def test_drafts_place_interest_matches_before_other_places(page, dest, interests):
    r = draft(page, dest, interests)
    assert r["match"], "the case needs a matching place"
    for name in r["match"]:
        assert name in r["placed"], f"{name} matches {interests} but the draft left it out: {r['placed']}"
    first = r["placed"][: len(r["match"])]
    assert set(first) == set(r["match"]), f"matching places should come first: {r['placed']}"


def test_a_stop_that_cannot_fit_does_not_block_the_rest_of_the_trip(page):
    days = page.evaluate("""([home]) => {
        const p = RT.defaultProfile(); p.home = home; p.interests = ["history"];
        const dest = JSON.parse(JSON.stringify(RT_CATALOG.find(d => d.id === "tn-smokies")));
        dest.stops.unshift(["Far history stop", "Nowhere, TN", 36.6, -82.2, 600, ["history"]]);  // ten hours on site
        const trip = RT.draftTrip(p, dest, "2027-06-11", 3, RT_CATALOG);
        return trip.days.map(d => ({ title: d.title, n: d.stops.length }));
    }""", [HOME])
    sight = [d for d in days if not d["title"].startswith("Drive")]
    assert any(d["n"] > 2 for d in sight), f"one oversized stop emptied every day: {days}"


def test_every_state_gets_at_least_five_trips(page):
    out = page.evaluate("""([home]) => {
        const p = RT.defaultProfile(); p.home = home; p.interests = ["scenic", "parks"];
        return RT_STATES.map(s => { const r = RT.rankWithPick(p, RT_CATALOG, 6, 5, s.abbr, null);
            const inState = r.filter(x => x.dest.states.includes(s.abbr));
            return { st: s.abbr, n: r.length, inState: inState.length, firstNear: r.findIndex(x => x.near),
                     near: r.filter(x => x.near).map(x => ({ states: x.dest.states, reason: x.reasons[0], fly: !!x.dest.fly })),
                     ranks: r.map(x => x.rank) }; });
    }""", [HOME])
    assert len(out) == 50
    for s in out:
        if s["st"] in ("HI", "AK"):
            assert not s["near"], f"{s['st']}: fly-and-drive states get no drive-to trips as nearby"
            continue
        assert s["n"] >= 5, f"{s['st']}: only {s['n']} trips"
        assert s["ranks"] == list(range(1, s["n"] + 1)), f"{s['st']}: ranks {s['ranks']}"
        if s["near"]:
            assert s["firstNear"] == s["inState"], f"{s['st']}: the state's own trips come first"
            for x in s["near"]:
                assert s["st"] not in x["states"], x
                assert x["reason"].lower().startswith("near "), x
                assert not x["fly"], f"{s['st']}: a fly-and-drive trip was added as a nearby trip"


def test_trips_page_shows_five_cards_for_a_one_trip_state(page):
    page.evaluate(f"RT.state.profile.home = {HOME}")
    page.click("#tabs [data-tab=interview]")
    page.select_option("#cityList-state", "SC")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    cards = page.locator(".card.dest")
    assert cards.count() >= 5, cards.count()
    near = page.locator(".card.dest.near")
    assert near.count() >= 1
    assert "Near South Carolina" in near.first.inner_text()
    assert "nearest trips" in page.inner_text("#view").lower(), "the page says why other states appear"


def recs(page, dest_id, interests, nights=4):
    return page.evaluate("""([destId, interests, nights, home]) => {
        const p = RT.defaultProfile(); p.home = home; p.interests = interests;
        const trip = RT.draftTrip(p, RT_CATALOG.find(d => d.id === destId), "2027-06-11", nights, RT_CATALOG);
        const have = new Set(trip.days.flatMap(d => d.stops.map(s => s.name)));
        const reach = (p.rules.maxDriveHours - 1) / 2;
        return { list: RT.recommendPlaces(trip, RT_CATALOG, p), have: [...have], reach };
    }""", [dest_id, list(interests), nights, HOME])


@pytest.mark.parametrize("dest,interests", [("tn-smokies", ["scenic", "parks", "food"]), ("nc-high-country", ["fishing"]), ("ky-mammoth", ["caves"]), ("wy-yellowstone", ["wildlife"])])
def test_itinerary_recommends_at_least_five_new_places(page, dest, interests):
    r = recs(page, dest, interests)
    lst = r["list"]
    assert 5 <= len(lst) <= 8, [x["name"] for x in lst]
    names = [x["name"] for x in lst]
    assert len(names) == len(set(names))
    for x in lst:
        assert x["name"] not in r["have"], f"{x['name']} is already in the trip"
        assert x["lat"] is not None and x["lon"] is not None
    matched = [x for x in lst if x["hits"] and not x["beyond"]]
    filler = [x for x in lst if not x["hits"]]
    assert lst[: len(matched)] == matched, "interest matches come before filler"
    for x in filler:
        assert x["filler"], x


def test_fly_and_drive_trips_recommend_only_places_on_the_same_trip(page):
    r = recs(page, "hi-big-island", ["beach"], nights=2)
    states = {x["address"].rsplit(", ", 1)[-1] for x in r["list"]}
    assert states <= {"HI"}, f"a mainland place was offered for a Hawaii trip: {states}"


def test_refresh_keeps_picks_and_shows_places_not_seen_yet(page):
    r = page.evaluate("""([home]) => {
        const p = RT.defaultProfile(); p.home = home; p.interests = ["scenic", "parks", "food", "history"];
        const trip = RT.draftTrip(p, RT_CATALOG.find(d => d.id === "tn-smokies"), "2027-06-11", 4, RT_CATALOG);
        const pool = RT.recommendPool(trip, RT_CATALOG, p), size = RT.recommendSize(pool);
        const first = RT.recommendNext(pool, new Set(), new Set(), size).list.map(c => c.name);
        const picked = new Set(first.slice(0, 2)), seen = new Set(first.slice(2));
        const second = RT.recommendNext(pool, picked, seen, size);
        let s = new Set(seen), last = second, laps = 0;
        while (!last.wrapped && laps < 50) { last.list.forEach(c => { if (!picked.has(c.name)) s.add(c.name); }); last = RT.recommendNext(pool, picked, s, size); laps++; }
        return { size, pool: pool.length, first, second: second.list.map(c => c.name), wrapped: last.wrapped, wrapList: last.list.map(c => c.name) };
    }""", [HOME])
    assert 5 <= r["size"] <= 8
    assert r["second"][:2] == r["first"][:2], "picked places stay, first in the list"
    fresh = r["second"][2:]
    assert len(fresh) >= 5
    assert not set(fresh) & set(r["first"][2:]), "refresh shows places not seen yet"
    assert r["wrapped"], "the list starts over once every place has been shown"
    assert r["wrapList"][:2] == r["first"][:2]


def test_itinerary_card_picks_refreshes_and_adds_to_the_chosen_days(page):
    page.evaluate(f"RT.state.profile.home = {HOME}; RT.state.profile.interests = ['scenic', 'parks', 'food']")
    page.click("#tabs [data-tab=interview]")
    page.select_option("#cityList-state", "")
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    page.locator("[data-act=build][data-i='0']").first.click()
    page.wait_for_selector("#recs .rec")
    rows = page.locator("#recs .rec")
    assert 5 <= rows.count() <= 8
    names = [rows.nth(i).locator(".rec-name").inner_text().strip() for i in range(rows.count())]
    assert page.locator("#recs [data-act=recAddPicked]").is_disabled(), "nothing picked yet"
    for i in (0, 1):
        page.locator("#recs .rec").nth(i).locator("[data-act=recPick]").click()
    assert page.locator("#recs [data-act=recPick][aria-pressed=true]").count() == 2
    ndays = page.evaluate("RT.state.trip.days.length")
    picked_rows = page.locator("#recs .rec.picked")
    sel = picked_rows.nth(1).locator("select")
    assert sel.locator("option").count() == ndays, "every day can be chosen"
    sel.select_option(index=ndays - 2)
    page.click("#recs [data-act=recMore]")
    after = [page.locator("#recs .rec").nth(i).locator(".rec-name").inner_text().strip() for i in range(page.locator("#recs .rec").count())]
    assert after[:2] == names[:2], f"picks are kept after refresh: {after}"
    assert not set(after[2:]) & set(names[2:]), f"refresh brings other places: {names} then {after}"
    assert page.locator("#recs .rec.picked select").nth(1).input_value() == str(ndays - 2), "the chosen day survives refresh"
    page.click("#recs [data-act=recAddPicked]")
    page.wait_for_function("ns => ns.every(n => RT.state.trip.days.some(d => d.stops.some(s => s.name === n)))", arg=names[:2])
    got = page.evaluate("([n, di]) => { const d = RT.state.trip.days[di]; return { i: d.stops.findIndex(s => s.name === n), len: d.stops.length }; }", [names[1], ndays - 2])
    assert 0 < got["i"] < got["len"] - 1, f"added outside the chosen day's start and end: {got}"
    txt = page.inner_text("#recs")
    assert names[0] not in txt and names[1] not in txt, "added places leave the list"
    assert page.locator("#recs .rec").count() >= 5, "the list refills"
