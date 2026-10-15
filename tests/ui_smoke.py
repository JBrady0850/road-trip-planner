"""Headless browser smoke test of the full app flow with live services mocked.

Run: python tests/ui_smoke.py [screenshot_dir]
Needs: pip install playwright && playwright install chromium
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

APP = (Path(__file__).resolve().parents[1] / "app" / "index.html").as_uri()
SHOTS = Path(sys.argv[1]) if len(sys.argv) > 1 else None

NOMINATIM = [{"display_name": "Knoxville, Knox County, Tennessee, United States", "lat": "35.9606", "lon": "-83.9207",
              "address": {"state": "Tennessee"}}]


def osrm(route):
    coords = route.request.url.split("/driving/")[1].split("?")[0].split(";")
    n = len(coords) - 1
    body = {"code": "Ok", "routes": [{"legs": [{"duration": 1800, "distance": 40000} for _ in range(n)],
                                      "geometry": {"coordinates": [list(map(float, c.split(","))) for c in coords]}}]}
    route.fulfill(json=body, headers={"Access-Control-Allow-Origin": "*"})


def nws(route):
    u = route.request.url
    if "/points/" in u:
        body = {"properties": {"forecast": "https://api.weather.gov/gridpoints/MRX/1,1/forecast", "timeZone": "America/New_York"}}
    elif "/forecast" in u:
        body = {"properties": {"periods": [{"name": "Today", "startTime": "2099-01-01T06:00:00-05:00", "temperature": 60, "temperatureUnit": "F", "shortForecast": "Sunny"}]}}
    else:
        body = {"features": []}
    route.fulfill(json=body, headers={"Access-Control-Allow-Origin": "*"})


def main():
    errors = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, vp in [("desktop", {"width": 1280, "height": 900}), ("tablet", {"width": 820, "height": 1180})]:
            ctx = b.new_context(viewport=vp, accept_downloads=True)
            page = ctx.new_page()
            page.on("pageerror", lambda e: errors.append(f"{name} pageerror: {e}"))
            page.on("console", lambda m: m.type == "error" and errors.append(f"{name} console: {m.text}"))
            page.on("dialog", lambda d: d.accept())
            page.route("https://nominatim.openstreetmap.org/**", lambda r: r.fulfill(json=NOMINATIM, headers={"Access-Control-Allow-Origin": "*"}))
            page.route("https://router.project-osrm.org/**", osrm)
            page.route("https://api.weather.gov/**", nws)
            page.goto(APP)
            page.evaluate("localStorage.clear()")
            page.reload()

            # interview
            page.fill("#homeQ", "Knoxville, TN")
            page.click("[data-act=homeSearch]")
            page.click("#homeResults [data-pick='0']")
            page.wait_for_selector("text=Home set:")
            for _ in range(2):
                page.click("[data-act=stepNext]")
            page.click("[data-act=interest][data-k=waterfalls]")
            page.click("[data-act=interest][data-k=hiking]")
            for _ in range(3):
                page.click("[data-act=stepNext]")
            page.click("[data-act=toggleState][data-s=TN]")
            page.click("[data-act=stepNext]")
            page.wait_for_selector("text=Review")
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-1-review.png"), full_page=True)
            page.click("[data-act=findDest]")
            page.wait_for_selector("text=Recommended destinations")
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-2-destinations.png"), full_page=True)
            first = page.inner_text(".grid .card strong")

            # build and check
            page.click("[data-act=build][data-i='0']")
            page.wait_for_selector("[data-act=routeAll]")
            page.click("[data-act=routeAll]")
            page.wait_for_selector("text=routed", timeout=15000)
            page.click("[data-act=retime]")
            travel_errors = page.locator(".finding.ERROR:has-text('travel')").count()
            day_count = page.locator("h2:has-text('Day ')").count()
            print(f"[{name}] days {day_count}, travel errors after re-time {travel_errors}")
            assert travel_errors == 0, "re-time should clear travel errors"
            assert day_count == 5, "4 nights should give 5 days"
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-3-trip.png"), full_page=True)

            # navigate, downloads
            page.click("#tabs [data-tab=navigate]")
            nav_links = page.locator("a[href^='https://www.google.com/maps/dir/']").count()
            waze_links = page.locator("a[href^='https://waze.com/ul']").count()
            with page.expect_download() as d:
                page.click("[data-act=dlIcs]")
            ics = Path(d.value.path()).read_text()
            with page.expect_download() as d:
                page.click("[data-act=dlCsv]")
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-4-navigate.png"), full_page=True)

            # weather, budget, tracker, settings
            page.click("#tabs [data-tab=weather]")
            page.click("[data-act=weather]")
            page.wait_for_selector("text=No active alerts")
            road_links = page.locator("a[href^='https://highways.dot.gov/traffic-info/'], a[href='https://drivenc.gov/']").count()
            page.click("#tabs [data-tab=budget]")
            total = page.inner_text("table tr:last-child")
            page.click("#tabs [data-tab=tracker]")
            visited = page.inner_text("text=of 50 visited")
            page.click("#tabs [data-tab=settings]")
            with page.expect_download() as d:
                page.click("[data-act=backup]")
            backup = json.loads(Path(d.value.path()).read_text())
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-5-settings.png"), full_page=True)

            # persistence
            page.reload()
            persisted = page.inner_text("h1")

            # optional AI path with a mocked Anthropic response
            ai_trip = {"name": "AI Sample Trip", "states": ["TN"], "days": [{"date": "2099-05-01", "title": "AI day", "stops": [
                {"name": "Home", "address": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "depart": "08:30"},
                {"name": "Sugarlands Visitor Center", "address": "1420 Fighting Creek Gap Rd, Gatlinburg, TN", "lat": 35.6853, "lon": -83.5367, "arrive": "09:40", "depart": "10:30", "notes": "Hours UNVERIFIED"},
                {"name": "Home", "address": "Knoxville, TN", "lat": 35.9606, "lon": -83.9207, "arrive": "12:00"}]}]}
            seen = {}
            def anthropic(route):
                seen["headers"] = route.request.headers
                seen["body"] = json.loads(route.request.post_data)
                route.fulfill(json={"content": [{"type": "text", "text": json.dumps(ai_trip)}]}, headers={"Access-Control-Allow-Origin": "*"})
            page.route("https://api.anthropic.com/**", anthropic)
            page.evaluate("RT.state.profile.aiKey = 'test-key-not-real'")
            page.click("#tabs [data-tab=destinations]")
            page.click("[data-act=buildAI][data-i='0']")
            page.wait_for_selector("h1:has-text('AI Sample Trip')")
            assert seen["headers"].get("x-api-key") == "test-key-not-real"
            assert seen["headers"].get("anthropic-dangerous-direct-browser-access") == "true"
            assert "Plan a" in seen["body"]["messages"][0]["content"]
            print(f"[{name}] AI path ok: model {seen['body']['model']}")
            page.evaluate("RT.state.profile.aiKey = ''")

            print(f"[{name}] top destination: {first}")
            print(f"[{name}] google links {nav_links}, waze links {waze_links}, ics events {ics.count('BEGIN:VEVENT')}")
            print(f"[{name}] road links {road_links}; budget row: {total!r}; tracker: {visited}")
            print(f"[{name}] backup has trip: {bool(backup.get('trip'))}, key blanked: {backup['profile']['aiKey'] == ''}; after reload h1: {persisted}")
            assert nav_links >= 2 and waze_links >= 3 and ics.count("BEGIN:VEVENT") >= 3 and road_links >= 1
            ctx.close()
        b.close()
    if errors:
        print("ERRORS:\n" + "\n".join(errors))
        sys.exit(1)
    print("UI smoke test passed")


if __name__ == "__main__":
    main()
