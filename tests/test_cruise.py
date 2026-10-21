"""Cruise port day: the traveler gives a port, the ship's arrival and departure, and
the same interests as a road trip. The app fits places between "off the ship" and
"all aboard" three ways (cruise excursion, private driver or taxi, rental car), and
the chosen plan becomes a one-day itinerary. Port data: docs/catalog-check.md."""
import json
import math
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
INTERESTS = {"scenic", "parks", "hiking", "waterfalls", "caves", "wildlife", "gardens", "camping", "golf", "beach",
             "lighthouses", "water", "fishing", "history", "town", "food", "music", "drinks", "art", "themeparks",
             "family", "spa", "markets", "lights"}
LINES = {"Royal Caribbean": "royalcaribbean.com", "Carnival": "carnival.com", "Norwegian": "ncl.com",
         "Princess": "princess.com", "Holland America": "hollandamerica.com", "Celebrity": "celebritycruises.com",
         "Disney": "disneycruise.disney.go.com", "Viking": "vikingcruises.com", "MSC": "msccruisesusa.com"}
# A port that is not on the list (Charlottetown joined the list in 0.7.0). Nominatim
# answer for "Saguenay, Quebec", 2026-10-20.
UNLISTED_PORT = [{"display_name": "Saguenay, Saguenay–Lac-Saint-Jean, Quebec, Canada", "lat": "48.406", "lon": "-71.0692",
             "address": {"city": "Saguenay", "state": "Quebec", "country": "Canada", "country_code": "ca"}}]
LOOKUPS = []


@pytest.fixture(scope="module")
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})

        def nominatim(route):
            q = parse_qs(urlparse(route.request.url).query).get("q", [""])[0]
            LOOKUPS.append(q)
            body = UNLISTED_PORT if q.lower().startswith("saguenay") else []
            route.fulfill(status=200, content_type="application/json", body=json.dumps(body))
        pg.route("https://nominatim.openstreetmap.org/**", nominatim)
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        yield pg
        b.close()


def km(a, b):
    p1, p2 = math.radians(a[0]), math.radians(b[0])
    h = math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(math.radians(b[1] - a[1]) / 2) ** 2
    return 2 * 6371 * math.asin(math.sqrt(h))


def day(page, port_id, arrive="08:00", depart="17:00", buffer=30, interests=("scenic", "beach", "history")):
    return page.evaluate("""([id, arrive, depart, buffer, interests]) => {
        const p = RT.defaultProfile(); p.interests = interests;
        const port = RT_PORTS.find(x => x.id === id);
        const d = RT.portDay(p, port, {arrive, depart, buffer});
        delete d.port; return d; }""", [port_id, arrive, depart, buffer, list(interests)])


def test_port_data_is_complete_and_close_to_each_port(page):
    ports = page.evaluate("RT_PORTS")
    assert len(ports) >= 38, len(ports)
    assert len({p["id"] for p in ports}) == len(ports)
    for p in ports:
        assert p["tender"] in ("pier", "varies", "tender", "unknown"), p["id"]
        assert p["address"] and p["name"] and p["region"], p["id"]
        assert len(p["stops"]) >= 4, (p["id"], len(p["stops"]))
        for name, addr, lat, lon, minutes, tags in p["stops"]:
            assert name and addr and minutes > 0 and tags, (p["id"], name)
            assert set(tags) <= INTERESTS, (p["id"], name, tags)
            assert km((p["lat"], p["lon"]), (lat, lon)) <= 130, (p["id"], name)
    used = {t for p in ports for s in p["stops"] for t in s[5]}
    assert len(used) >= 20, sorted(INTERESTS - used)


def test_the_window_is_arrival_plus_landing_minus_the_buffer(page):
    pier = day(page, "galveston")
    assert (pier["ashore"], pier["backBy"], pier["windowMin"]) == ("08:15", "16:30", 495)
    tender = day(page, "grand-cayman")
    assert (tender["ashore"], tender["backBy"], tender["windowMin"]) == ("08:45", "16:00", 435)
    assert day(page, "galveston", buffer=60)["backBy"] == "16:00"


def test_every_plan_fits_between_leaving_and_returning_to_the_ship(page):
    for port in page.evaluate("RT_PORTS.map(p => p.id)"):
        d = day(page, port)
        assert [p["key"] for p in d["plans"]] == ["excursion", "driver", "rental"], port
        for plan in d["plans"]:
            assert plan["spareMin"] >= 0, (port, plan["key"], plan["spareMin"])
            assert plan["stops"], (port, plan["key"])
            last = "08:00"
            for s in plan["stops"]:
                assert s["arrive"] >= d["ashore"] and s["depart"] <= d["backBy"] and s["arrive"] >= last, (port, s["name"])
                last = s["depart"]


def test_a_short_call_warns_and_a_bad_time_is_refused(page):
    short = day(page, "galveston", arrive="08:00", depart="09:30")
    assert short["plans"] == [] and any("minutes ashore" in w for w in short["warnings"]), short
    bad = day(page, "galveston", arrive="10:00", depart="09:00")
    assert bad["plans"] == [] and any("later than arrival" in w for w in bad["warnings"]), bad
    half = day(page, "galveston", arrive="08:00", depart="12:00")
    assert any("short day" in w.lower() for w in half["warnings"]) and half["plans"], half["warnings"]


def test_tender_ports_say_so_and_pier_ports_do_not(page):
    assert any("30 minutes each way" in w for w in day(page, "grand-cayman")["warnings"])
    assert any("Traffic drives on the left" in w for w in day(page, "grand-cayman")["warnings"])
    assert not any("each way" in w for w in day(page, "galveston")["warnings"])
    assert page.evaluate("RT.TENDER.varies[0]") == "May be a tender port"


def test_the_interests_choose_the_places(page):
    first = lambda ints: day(page, "honolulu", interests=ints)["plans"][1]["stops"][0]["name"]
    assert first(["history"]) in ("Pearl Harbor National Memorial", "Iolani Palace")
    assert first(["beach"]) in ("Waikiki Beach", "Hanauma Bay Nature Preserve")
    assert first(["history"]) != first(["gardens"])


def test_the_plan_becomes_a_one_day_trip_that_navigates_and_saves(page):
    r = page.evaluate("""() => { const p = RT.defaultProfile(); p.interests = ["beach", "history"];
        const port = RT_PORTS.find(x => x.id === "key-west");
        const t = RT.portTrip(p, port, {arrive: "08:00", depart: "17:00", buffer: 30, line: "Carnival"}, "2027-03-05", "driver");
        const json = JSON.parse(RT.tripJson(t, p));
        return { t, links: RT.dayLinks(t.days[0]).length, findings: RT.checkTrip(t, p).filter(f => f.level === "ERROR"),
                 csv: RT.csv(t).split("\\r\\n").length, ics: RT.ics(t, "America/New_York").includes("Ship at"), saved: json.trip.cruise }; }""")
    stops = r["t"]["days"][0]["stops"]
    assert len(r["t"]["days"]) == 1 and stops[0]["type"] == "Ship" and stops[-1]["type"] == "Ship"
    assert stops[0]["name"] == stops[-1]["name"] == "Ship at Key West"
    assert "All aboard by 4:30 p.m." in stops[-1]["notes"], stops[-1]["notes"]
    assert r["t"]["destId"] == "port:key-west" and r["links"] >= 1 and r["findings"] == [], r["findings"]
    assert r["saved"] == {"portId": "key-west", "arrive": "08:00", "depart": "17:00", "buffer": 30, "plan": "driver", "line": "Carnival"}


def test_a_cruise_trip_file_reads_in_the_command_line_tool_and_reloads_in_the_app(page, tmp_path):
    import subprocess, sys
    text = page.evaluate("""() => { const p = RT.defaultProfile(); p.interests = ["beach", "history"];
        const t = RT.portTrip(p, RT_PORTS.find(x => x.id === "galveston"), {arrive: "08:00", depart: "17:00", buffer: 30, line: "Carnival"}, "2027-03-05", "rental");
        return RT.tripJson(t, p); }""")
    f = tmp_path / "cruise-trip.json"
    f.write_text(text, encoding="utf-8")
    root = Path(__file__).resolve().parents[1]
    r = subprocess.run([sys.executable, "-m", "roadtrip", "check", str(f)], cwd=root, capture_output=True, text=True)
    assert r.returncode in (0, 1), (r.returncode, r.stderr[-400:])
    assert "Traceback" not in r.stderr, r.stderr[-400:]
    page.evaluate("localStorage.clear()")
    page.reload()
    page.click("#tabs [data-tab=trip]")
    page.set_input_files("[data-act=loadTrip]", str(f))
    page.wait_for_function("RT.state.trip && RT.state.trip.cruise", timeout=8000)
    assert page.evaluate("RT.state.trip.cruise.portId") == "galveston"


def test_a_ship_stop_navigates_by_coordinates(page):
    links = page.evaluate("""() => { const p = RT.defaultProfile(); p.interests = ["beach"];
        const t = RT.portTrip(p, RT_PORTS.find(x => x.id === "seattle"), {arrive: "07:00", depart: "16:00", buffer: 30}, "2027-06-01", "driver");
        return RT.dayLinks(t.days[0]); }""")
    assert links and "origin=47." in links[0] and "-122." in links[0], links[0]


def test_excursion_pages_are_the_nine_checked_lines(page):
    lines = dict(page.evaluate("RT.CRUISE_LINES"))
    assert set(lines) == set(LINES)
    for name, url in lines.items():
        assert url.startswith("https://") and LINES[name] in url, (name, url)
    links = page.evaluate("""() => RT.portLinks(RT_PORTS.find(x => x.id === "cozumel"), "Carnival")""")
    assert [l["url"] for l in links["lines"]] == ["https://www.carnival.com/shore-excursions"]
    assert "Cozumel" in links["rental"] and "Cozumel" in links["taxi"] and "Cozumel" in links["independent"]
    every = page.evaluate("""() => RT.portLinks(RT_PORTS[0], "").lines.length""")
    assert every == 9


# ---- the Cruise Day tab ----

def open_cruise(page, port="grand-cayman", line="Carnival"):
    page.evaluate("localStorage.clear()")
    page.reload()
    page.click("#tabs [data-tab=cruise]")
    page.select_option("[data-bind='profile.cruise.portId']", port)
    page.select_option("[data-bind='profile.cruise.line']", line)
    page.fill("[data-bind='profile.cruise.arrive']", "08:00")
    page.fill("[data-bind='profile.cruise.depart']", "17:00")
    for k in ("arrive", "depart"):
        page.locator(f"[data-bind='profile.cruise.{k}']").dispatch_event("change")


def test_the_cruise_tab_shows_three_plans_with_links(page):
    open_cruise(page)
    assert page.locator("#cruiseOut .plan-card").count() == 3
    text = page.inner_text("#cruiseOut")
    assert "Tender port" in text and "8:45 a.m." in text and "4:00 p.m." in text
    hrefs = page.eval_on_selector_all("#cruiseOut a", "as => as.map(a => a.href)")
    assert "https://www.carnival.com/shore-excursions" in hrefs
    assert any("car+rental" in h or "car%20rental" in h for h in hrefs)
    assert page.locator("#cruiseOut [data-act=cruiseUse]").count() == 3
    assert "estimate" in text.lower()


def test_viator_and_getyourguide_links_use_the_checked_search_address(page):
    # Search address format opened in a browser on 2026-10-17 for Cozumel and Skagway.
    links = page.evaluate("""() => RT.portLinks(RT_PORTS.find(x => x.id === "skagway"), "")""")
    assert links["tours"] == [
        {"label": "Viator", "url": "https://www.viator.com/searchResults/all?text=Skagway%20shore%20excursions"},
        {"label": "GetYourGuide", "url": "https://www.getyourguide.com/s/?q=Skagway%20shore%20excursions"},
    ]
    open_cruise(page)
    for plan, n in (("excursion", 1), ("driver", 1), ("rental", 0)):
        hrefs = page.eval_on_selector_all(f"#cruiseOut [data-plan={plan}] a", "as => as.map(a => a.href)")
        assert sum("viator.com/searchResults" in h for h in hrefs) == n, (plan, hrefs)
        assert sum("getyourguide.com/s/?q=" in h for h in hrefs) == n, (plan, hrefs)


def test_the_cruise_tab_uses_the_same_interest_chips(page):
    open_cruise(page)
    keys = set(page.eval_on_selector_all("#view [data-act=interest]", "es => es.map(e => e.dataset.k)"))
    assert keys == INTERESTS
    page.click("[data-act=interest][data-k=fishing]")
    assert page.evaluate("RT.state.profile.interests.includes('fishing')") or page.evaluate("!RT.state.profile.interests.includes('fishing')")
    before = page.inner_text("#cruiseOut")
    for k in ("scenic", "parks", "food", "fishing"):
        if page.evaluate(f"RT.state.profile.interests.includes('{k}')"):
            page.click(f"[data-act=interest][data-k={k}]")
    page.click("[data-act=interest][data-k=history]")
    assert page.inner_text("#cruiseOut") != before, "the plans follow the interests"


def test_using_a_plan_opens_it_as_the_itinerary(page):
    open_cruise(page, "key-west", "Princess")
    page.click("#cruiseOut [data-act=cruiseUse][data-plan=driver]")
    page.wait_for_function("RT.state.tab === 'trip'")
    assert "Ship at Key West" in page.inner_text("#view")
    trip = page.evaluate("RT.state.trip")
    assert trip["cruise"]["plan"] == "driver" and trip["cruise"]["line"] == "Princess"


def test_a_port_that_is_not_listed_is_looked_up_once(page):
    open_cruise(page)
    LOOKUPS.clear()
    page.select_option("[data-bind='profile.cruise.portId']", "")
    page.fill("[data-bind='profile.cruise.typed']", "Saguenay")
    page.locator("[data-bind='profile.cruise.typed']").dispatch_event("change")
    page.click("[data-act=cruiseFind]")
    page.wait_for_function("document.querySelector('#cruiseOut') && document.querySelector('#cruiseOut').innerText.includes('Saguenay')", timeout=10000)
    assert any(q.lower().startswith("saguenay") for q in LOOKUPS), LOOKUPS
    assert "Dock or tender not confirmed" in page.inner_text("#cruiseOut")
    assert "No catalog places fit within reach" in page.inner_text("#cruiseOut"), "a port with no nearby places says so"


def test_a_port_that_cannot_be_found_says_so(page):
    open_cruise(page)
    page.select_option("[data-bind='profile.cruise.portId']", "")
    page.fill("[data-bind='profile.cruise.typed']", "Nowhereville")
    page.locator("[data-bind='profile.cruise.typed']").dispatch_event("change")
    page.click("[data-act=cruiseFind]")
    page.wait_for_function("document.querySelector('#toast') && document.querySelector('#toast').innerText.toLowerCase().includes('could not find nowhereville')", timeout=10000)
    assert page.locator("#cruiseOut .plan-card").count() == 0


def test_a_lookup_answer_for_old_text_is_dropped(page):
    open_cruise(page)
    held = []
    page.unroute("https://nominatim.openstreetmap.org/**")
    page.route("https://nominatim.openstreetmap.org/**", lambda route: held.append(route))
    page.select_option("[data-bind='profile.cruise.portId']", "")
    page.fill("[data-bind='profile.cruise.typed']", "Saguenay")
    page.locator("[data-bind='profile.cruise.typed']").dispatch_event("change")
    page.click("[data-act=cruiseFind]")
    for _ in range(50):
        if held: break
        page.wait_for_timeout(100)
    assert held, "the lookup is waiting for an answer"
    page.evaluate("RT.state.profile.cruise.typed = 'Somewhere else'")
    held[0].fulfill(status=200, content_type="application/json", body=json.dumps(UNLISTED_PORT))
    page.wait_for_timeout(500)
    assert page.evaluate("RT.state.profile.cruise.place") is None, "the answer for the old text is not used"


def test_a_restored_profile_cannot_inject_markup_through_the_port(page):
    page.evaluate("""() => { window.__x = 0; const c = RT.state.profile.cruise; c.portId = ""; c.typed = "Evil";
        c.place = { q: "Evil", label: 'Evil<img src=x onerror="window.__x=1">', lat: 35.79, lon: -83.55, abbr: "TN" }; }""")
    page.click("#tabs [data-tab=interview]")
    page.click("#tabs [data-tab=cruise]")
    page.wait_for_timeout(300)
    assert page.evaluate("window.__x") == 0 and page.locator("#view img").count() == 0
