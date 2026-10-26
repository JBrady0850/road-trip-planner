"""Long drives plan cleanly: the routed drive from home sets the number of drive days,
each overnight sits on the route and is named after the nearest town, drive-only days
arrive at check-in time (and get home before sunset), and re-timing never rolls past
midnight."""
import json
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
FAR = {"label": "Miami, FL", "lat": 25.7617, "lon": -80.1918, "state": "Florida"}
CORS = {"Access-Control-Allow-Origin": "*"}
DEST = "ga-nc-waterfalls"


def osrm_with(hours):
    """Home-to-base overview answers with `hours`; day routes get 30-minute legs."""
    def handler(route):
        url = route.request.url
        coords = url.split("/driving/")[1].split("?")[0].split(";")
        pts = [list(map(float, c.split(","))) for c in coords]
        if "overview=simplified" in url:
            mid = [(pts[0][0] + pts[1][0]) / 2 + 0.5, (pts[0][1] + pts[1][1]) / 2]
            body = {"code": "Ok", "routes": [{"duration": hours * 3600, "distance": hours * 90000, "geometry": {"coordinates": [pts[0], mid, pts[1]]}}]}
        else:
            body = {"code": "Ok", "routes": [{"duration": 1800 * (len(pts) - 1), "legs": [{"duration": 1800, "distance": 40000} for _ in pts[1:]], "geometry": {"coordinates": pts}}]}
        route.fulfill(json=body, headers=CORS)
    return handler


def reverse(route):
    route.fulfill(json={"address": {"city": "Macon", "state": "Georgia"}}, headers=CORS)


@pytest.fixture()
def page():
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 834, "height": 1194})
        pg.route("https://router.project-osrm.org/**", lambda r: r.abort())
        pg.route("https://nominatim.openstreetmap.org/**", lambda r: r.abort())
        pg.goto(APP)
        pg.evaluate("localStorage.clear()")
        pg.reload()
        pg.evaluate(f"RT.state.profile.home = {json.dumps(FAR)}")
        yield pg
        b.close()


def draft(page, route=None, nights=4):
    return page.evaluate("""([dest, route, nights]) => { const p = RT.state.profile;
        const t = RT.draftTrip(p, RT_CATALOG.find(d => d.id === dest), "2027-11-26", nights, RT_CATALOG, route ? { route } : {});
        return { t, f: RT.checkTrip(t, p) }; }""", [DEST, route, nights])


def test_overnights_sit_on_the_route_with_coordinates(page):
    r = draft(page)
    days = r["t"]["days"]
    nights = [s for d in days for s in d["stops"] if s["name"] == "Overnight en route"]
    assert nights, "a two-day drive needs an overnight"
    for s in nights:
        assert s["lat"] is not None and s["lon"] is not None, s
        assert FAR["lat"] < s["lat"] < r["t"]["base"]["lat"], "the overnight is between home and the base"
    assert days[0]["stops"][-1]["address"] == days[1]["stops"][0]["address"], "day 2 starts where day 1 ended"
    out_night, back_night = days[0]["stops"][-1], days[-1]["stops"][0]
    assert abs(out_night["lat"] - back_night["lat"]) < 0.01, "a two-day drive uses the same overnight both ways"
    checks = {(f["check"], f["level"]) for f in r["f"]}
    assert ("check-in", "WARN") not in checks, [f for f in r["f"] if f["check"] == "check-in"]
    assert not [f for f in r["f"] if f["check"] == "links" and "no coordinates" in f["msg"]], "every stop can be routed"


def test_the_routed_drive_sets_the_drive_days(page):
    one = draft(page, {"hours": 6.5, "line": []})
    assert not any(s["name"] == "Overnight en route" for d in one["t"]["days"] for s in d["stops"]), "6.5 routed hours fit in one day"
    line = [[25.76, -80.19], [33.0, -84.0], [34.88, -83.40]]
    two = draft(page, {"hours": 9.5, "line": line})
    night = two["t"]["days"][0]["stops"][-1]
    assert night["name"] == "Overnight en route"
    assert 29 < night["lat"] < 34, f"the overnight follows the route line: {night}"


def test_retiming_never_rolls_past_midnight(page):
    r = page.evaluate("""() => { const p = RT.state.profile;
        const day = { date: "2027-11-26", title: "Long day", stops: [RT.mkStop("A", "A", 30, -85, { depart: "08:30" }), RT.mkStop("B", "B", 35, -85, { arrive: "12:00", depart: "13:00" }), RT.mkStop("C", "C", 36, -85, { arrive: "17:00" })] };
        const before = JSON.stringify(day.stops);
        const ok = RT.retimeDay(day, { legs: [{ seconds: 12 * 3600, meters: 1 }, { seconds: 6 * 3600, meters: 1 }] });
        const f = RT.checkTrip({ days: [day] }, p, {});
        return { ok, same: before === JSON.stringify(day.stops), late: !!day.lateRetime, checks: f.map(x => x.check) }; }""")
    assert r["ok"] is False and r["same"] and r["late"], r
    assert "too long" in r["checks"] and "order" not in r["checks"], r


def test_a_drive_home_leaves_earlier_to_beat_sunset(page):
    r = page.evaluate("""() => { const p = RT.state.profile;
        const day = { date: "2027-12-15", title: "Drive home", stops: [RT.mkStop("Hotel", "X", 40.7, -74.0, { depart: "08:30" }), RT.mkStop("Home", "Knoxville, TN", 35.96, -83.92, { type: "Home", arrive: "18:30" })] };
        const moved = RT.alignDriveDay(day, p); return { moved, dep: day.stops[0].depart, arr: day.stops[1].arrive, note: day.stops[0].notes }; }""")
    assert r["moved"] and r["dep"] < "08:30" and r["dep"] >= "06:00", r
    assert "sunset" in r["note"], r


def test_build_names_the_overnight_town_and_uses_routed_hours(page):
    page.unroute("https://router.project-osrm.org/**")
    page.route("https://router.project-osrm.org/**", osrm_with(9.5))
    page.unroute("https://nominatim.openstreetmap.org/**")
    page.route("https://nominatim.openstreetmap.org/**", reverse)
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    i = page.evaluate("id => RT.state.recs.findIndex(r => r.dest.id === id)", DEST)
    page.locator(f"[data-act=build][data-i='{i}']").first.click()
    page.wait_for_function("() => RT.state.trip && !RT.state.busy && Object.keys(RT.state.routes).length > 0", timeout=20000)
    t = page.evaluate("RT.state.trip")
    names = [s["name"] for d in t["days"] for s in d["stops"]]
    assert "Overnight in Macon, GA" in names, names
    f = page.evaluate("RT.state.findings")
    assert not [x for x in f if x["check"] in ("lodging", "check-in")], f
    assert not [x for x in f if x["check"] == "links" and "no coordinates" in x["msg"]], f
    routed = page.evaluate("Object.keys(RT.state.routes).length")
    assert routed == len(t["days"]), "every day, overnights included, gets routed drive times"


def test_build_with_a_short_routed_drive_needs_no_overnight(page):
    page.unroute("https://router.project-osrm.org/**")
    page.route("https://router.project-osrm.org/**", osrm_with(6.5))
    page.click("#tabs [data-tab=destinations]")
    page.wait_for_selector(".card.dest")
    i = page.evaluate("id => RT.state.recs.findIndex(r => r.dest.id === id)", DEST)
    page.locator(f"[data-act=build][data-i='{i}']").first.click()
    page.wait_for_function("() => RT.state.trip && !RT.state.busy", timeout=20000)
    names = page.evaluate("RT.state.trip.days.flatMap(d => d.stops.map(s => s.name))")
    assert not any(n.startswith("Overnight") for n in names), names
