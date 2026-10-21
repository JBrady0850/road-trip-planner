"""Finding a cruise port by typing it, and plans that follow the picked interests.

A traveler typed "Montego Bay Jamaica" and got a port with no places: Enter did
nothing, and a typed port only borrowed places from the road-trip catalog. Typed text
that names a listed port now picks it, Enter and Go run the search, and a port that is
not listed gets the listed-port places within reach. When too few places match the
picked interests, the plan fills the day with other places and says so."""
import json
import re
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
# Nominatim answers, copied from real lookups on 2026-10-20 (docs/catalog-check.md).
LUCEA = [{"display_name": "Lucea, Hanover, Cornwall County, Jamaica", "lat": "18.4472", "lon": "-78.1729",
          "address": {"town": "Lucea", "county": "Hanover", "country": "Jamaica", "country_code": "jm"}}]
LOOKUPS = []


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})

        def nominatim(route):
            q = parse_qs(urlparse(route.request.url).query).get("q", [""])[0]
            LOOKUPS.append(q)
            body = LUCEA if q.lower().startswith("lucea") else []
            route.fulfill(status=200, content_type="application/json", body=json.dumps(body))
        pg.route("https://nominatim.openstreetmap.org/**", nominatim)
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.route("https://api.weather.gov/**", lambda r: r.abort())
        pg.goto(APP)
        yield pg
        b.close()


def cruise_tab(page, interests=None):
    page.evaluate("localStorage.clear()")
    page.reload()
    page.click("#tabs [data-tab=cruise]")
    if interests is not None:
        for k in page.evaluate("RT.state.profile.interests"):
            page.click(f"#view [data-act=interest][data-k={k}]")
        for k in interests:
            page.click(f"#view [data-act=interest][data-k={k}]")
    LOOKUPS.clear()


def match(page, text):
    return page.evaluate("t => { const p = RT.matchPort(t, RT_PORTS); return p ? p.id : null; }", text)


def test_typed_text_that_names_a_listed_port_picks_it_without_a_lookup(page):
    cruise_tab(page)
    page.fill("[data-bind='profile.cruise.typed']", "Montego Bay Jamaica")
    page.click("[data-act=cruiseFind]")
    page.wait_for_function("RT.state.profile.cruise.portId === 'montego-bay'", timeout=5000)
    assert LOOKUPS == [], "a listed port needs no map lookup"
    assert page.eval_on_selector("[data-bind='profile.cruise.portId']", "s => s.value") == "montego-bay"
    for plan in ("excursion", "driver", "rental"):
        assert page.locator(f"#cruiseOut [data-plan={plan}] .plan-stops li").count() >= 1, plan
    assert "Traffic drives on the left" in page.inner_text("#cruiseOut")


def test_enter_in_the_port_box_runs_the_search(page):
    cruise_tab(page)
    page.fill("[data-bind='profile.cruise.typed']", "Montego Bay Jamaica")
    page.press("[data-bind='profile.cruise.typed']", "Enter")
    page.wait_for_function("RT.state.profile.cruise.portId === 'montego-bay'", timeout=5000)
    LOOKUPS.clear()
    page.fill("[data-bind='profile.cruise.typed']", "Lucea, Jamaica")
    box = page.locator("[data-bind='profile.cruise.typed']")
    box.press("Enter")
    box.press("Enter")  # a second Enter while the map answers does not ask again
    page.wait_for_function("document.querySelector('#cruiseOut h2') && document.querySelector('#cruiseOut h2').innerText.includes('Lucea')", timeout=8000)
    page.wait_for_timeout(1500)
    assert [q for q in LOOKUPS if q.lower().startswith("lucea")] == ["Lucea, Jamaica"], LOOKUPS


@pytest.mark.parametrize("text,want", [
    ("Montego Bay Jamaica", "montego-bay"), ("montego bay", "montego-bay"), ("MoBay", "montego-bay"),
    ("Rome", "civitavecchia"), ("Rome, Italy", "civitavecchia"), ("St Thomas", "st-thomas"),
    ("Saint Thomas, US Virgin Islands", "st-thomas"), ("Grand Cayman", "grand-cayman"), ("Cozumel Mexico", "cozumel"),
    ("Cabo", "cabo"), ("Galveston TX", "galveston"), ("Portland", "portland-maine"), ("cruise port of Nassau", "nassau"),
    ("Civitavecchia Italy", "civitavecchia"), ("Halifax, Nova Scotia", "halifax"), ("Fort Lauderdale FL", "fort-lauderdale"),
    ("Southampton UK", "southampton"), ("Sydney", "sydney"), ("Sydney NS", "sydney-ns"), ("Saint John", "saint-john"),
    ("Falmouth, England", None), ("Portland Oregon", None), ("San Juan del Sur", None), ("Grand", None), ("", None),
    # a country, a region, or one word of a longer name picks no port
    ("Jamaica", None), ("France", None), ("Nova Scotia", None), ("British Columbia", None), ("Crete", None),
    ("Oregon", None), ("Maine", None), ("Charlotte", None), ("Beach", None), ("Harbor", None), ("Victoria Seychelles", None),
    ("Kingston Jamaica", None),
])
def test_match_port_reads_names_and_other_names_but_not_other_places(page, text, want):
    assert match(page, text) == want


def test_every_port_name_and_other_name_picks_its_own_port(page):
    wrong = page.evaluate("""() => RT_PORTS.flatMap(p => [p.name, ...(p.aka || [])]
        .filter(n => { const m = RT.matchPort(n, RT_PORTS); return !m || m.id !== p.id; }).map(n => p.id + ': ' + n))""")
    assert wrong == []


def test_a_port_that_is_not_listed_uses_listed_port_places_within_reach(page):
    cruise_tab(page)
    page.fill("[data-bind='profile.cruise.typed']", "Lucea, Jamaica")
    page.click("[data-act=cruiseFind]")
    page.wait_for_function("document.querySelector('#cruiseOut h2') && document.querySelector('#cruiseOut h2').innerText.includes('Lucea')", timeout=8000)
    assert page.locator("#cruiseOut [data-plan=driver] .plan-stops li").count() >= 1
    names = set(page.evaluate("RT_PORTS.find(p => p.id === 'montego-bay').stops.map(s => s[0])"))
    shown = page.eval_on_selector_all("#cruiseOut [data-plan=driver] .plan-stops li", "ls => ls.map(l => l.innerText)")
    assert any(any(n in s for n in names) for s in shown), shown
    text = page.inner_text("#cruiseOut")
    assert "Traffic drives on the left" in text, "the country code from the lookup sets the warning"
    assert "Dock or tender not confirmed" in text
    assert "some may be across water" in text, "a typed port says its places need checking"


def test_the_plan_marks_places_that_do_not_match_the_picked_interests(page):
    cruise_tab(page, interests=["history", "music"])
    page.select_option("[data-bind='profile.cruise.portId']", "ocho-rios")
    plan = page.evaluate("""() => { const d = RT.portDay(RT.state.profile, RT_PORTS.find(p => p.id === 'ocho-rios'),
        {arrive: '08:00', depart: '17:00', buffer: 30}); return d.plans.find(p => p.key === 'driver'); }""")
    tags = {s[0]: s[5] for s in page.evaluate("RT_PORTS.find(p => p.id === 'ocho-rios').stops")}
    assert len(plan["extra"]) == len(plan["stops"])
    for s, fill in zip(plan["stops"], plan["extra"]):
        matches = bool(set(tags[s["name"]]) & {"history", "music"})
        assert fill is (not matches), s["name"]
        assert (s["notes"] == page.evaluate("RT.PORT_FILL_NOTE")) is fill, s["name"]
    first = [f for f in plan["extra"]]
    assert first[0] is False, "a matching place comes first"
    assert any(plan["extra"]), "Ocho Rios has too few history and music places to fill the day"
    card = page.inner_text("#cruiseOut [data-plan=driver]")
    assert card.count("Not one of your interests") == sum(plan["extra"]) + 1, card
    page.click("#cruiseOut [data-act=cruiseUse][data-plan=driver]")
    page.wait_for_function("RT.state.tab === 'trip'")
    notes = [s["notes"] for s in page.evaluate("RT.state.trip.days[0].stops")]
    assert notes.count(page.evaluate("RT.PORT_FILL_NOTE")) == sum(plan["extra"])
    assert "Not one of your picked interests" in page.inner_text("#view")


def test_with_no_interests_picked_nothing_is_marked(page):
    cruise_tab(page, interests=[])
    plan = page.evaluate("""() => RT.portDay(RT.state.profile, RT_PORTS.find(p => p.id === 'ocho-rios'),
        {arrive: '08:00', depart: '17:00', buffer: 30}).plans[1]""")
    assert plan["stops"] and not any(plan["extra"])


def test_every_port_records_its_country_code_and_driving_side(page):
    bad = page.evaluate("""() => RT_PORTS.filter(p => !/^[a-z]{2}$/.test(p.cc || '') || p.left !== RT.LEFT_DRIVING.has(p.cc))
        .map(p => p.id + ' ' + p.cc + ' ' + p.left)""")
    assert bad == []


def test_the_plan_step_finds_a_listed_port_by_typed_name(page):
    page.evaluate("localStorage.clear()")
    page.reload()
    page.select_option("#cityList-state", "@cruise")
    page.fill("#view [data-bind='profile.cruise.typed']", "Montego Bay Jamaica")
    page.click(".stepbar [data-act=findPorts]")
    page.wait_for_selector("#cruiseOut .plan-card")
    assert page.evaluate("RT.state.tab") == "destinations"
    assert "Montego Bay" in page.inner_text("#cruiseOut h2")


def test_matching_places_come_before_any_filler_at_every_port(page):
    bad = page.evaluate("""() => { const out = []; const keys = RT.INTEREST_GROUPS.flatMap(g => g[1].map(i => i[0]));
        RT_PORTS.forEach(port => keys.forEach(k => { const p = RT.defaultProfile(); p.interests = [k];
            RT.portDay(p, port, {arrive: '08:00', depart: '17:00', buffer: 30}).plans.forEach(pl => {
                const first = pl.extra.indexOf(true);
                if (first >= 0 && pl.extra.slice(first).includes(false)) out.push(port.id + ' ' + k + ' ' + pl.key); }); }));
        return out; }""")
    assert bad == [], bad[:10]


def test_an_unlisted_port_borrows_places_only_from_its_own_country(page):
    r = page.evaluate("""() => { const ids = new Set(RT_PORTS.find(p => p.id === 'tortola').stops.map(s => s[0]));
        const st = RT.typedPort({label: 'Cruz Bay, USVI', lat: 18.3311, lon: -64.7937, cc: 'us'}, RT_CATALOG, RT_PORTS);
        return { cc: st.cc, left: st.left, tortola: st.stops.filter(s => ids.has(s[0])).length, n: st.stops.length }; }""")
    assert r["cc"] == "vi" and r["left"] is True, "a listed port within 30 km lends its own code"
    assert r["tortola"] == 0, "no places from the British Virgin Islands across the water"
    assert r["n"] >= 1


def test_a_port_shows_pier_only_where_a_cruise_terminal_was_found(page):
    # A port on neither tender list shows pier only when docs/catalog-check.md names the evidence:
    # an OpenStreetMap cruise or passenger terminal or cruise pier, or a cited guide that names cruise docks.
    doc = (Path(__file__).resolve().parents[1] / "docs" / "catalog-check.md").read_text(encoding="utf-8")
    section = doc[doc.index("more ports (2026-10-20)"):]
    rows = {}
    for line in section.splitlines():
        cells = [c.strip() for c in line.strip("|").split("|")]
        if line.startswith("| ") and len(cells) == 3 and cells[1] in ("pier", "unknown", "unknown (was pier)", "tender", "varies"):
            assert cells[0] not in rows, "one row per port: " + cells[0]
            rows[cells[0]] = cells
    assert len(rows) >= 170, len(rows)
    ports = page.evaluate("RT_PORTS.map(p => [p.id, p.name, p.tender])")
    tender = {pid: t for pid, _, t in ports}
    for pid in ("costa-maya", "key-west", "port-canaveral", "victoria", "vancouver", "halifax", "acapulco"):
        assert tender[pid] == "unknown", pid
    for pid in ("galveston", "miami", "seattle", "new-york", "st-thomas", "skagway", "kobe"):
        assert tender[pid] == "pier", pid
    word = re.compile(r"(?i)cruise|crucer|cruzeir|passenger|pasajer")
    for pid, name, t in ports:
        if t == "pier":
            basis = rows[name][2] if name in rows else ""
            assert rows.get(name, [None, None])[1] == "pier", name
            assert ("OpenStreetMap: " in basis or "guide" in basis) and word.search(basis), (name, basis)
    warn = lambda pid: page.evaluate("""pid => RT.portDay(RT.defaultProfile(), RT_PORTS.find(p => p.id === pid),
        {arrive: '08:00', depart: '17:00', buffer: 30}).warnings""", pid)
    assert "The plan adds 15 minutes each way in case the ship uses tender boats." in warn("vancouver")
    assert "The plan adds 30 minutes each way for the boat." in warn("grand-cayman")


@pytest.mark.parametrize("cc,left", [("jm", True), ("gb", True), ("au", True), ("jp", True), ("vi", True), ("bm", True),
                                     ("us", False), ("mx", False), ("fr", False), ("gi", False), ("aw", False), ("it", False)])
def test_driving_side_matches_the_source_table(page, cc, left):
    # Each pair is stated in the Wikipedia table read on 2026-10-20 (docs/catalog-check.md).
    assert page.evaluate("c => RT.LEFT_DRIVING.has(c)", cc) is left
