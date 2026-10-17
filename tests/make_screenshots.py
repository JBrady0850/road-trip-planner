"""Regenerate README screenshots with sample data: python tests/make_screenshots.py

Live services are replaced with realistic offline stand-ins so the images are
repeatable: routing uses road-distance estimates, weather shows sample forecasts.
"""
import json
import math
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
APP = (ROOT / "app" / "index.html").as_uri()
OUT = ROOT / "docs" / "images"
OUT.mkdir(parents=True, exist_ok=True)
HOME = [{"display_name": "Knoxville, Knox County, Tennessee, United States", "lat": "35.9606", "lon": "-83.9207", "address": {"state": "Tennessee"}}]


def osrm(route):
    pts = [tuple(map(float, c.split(","))) for c in route.request.url.split("/driving/")[1].split("?")[0].split(";")]
    legs = []
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        d = 6371000 * 2 * math.asin(math.sqrt(math.sin(math.radians(y2 - y1) / 2) ** 2 + math.cos(math.radians(y1)) * math.cos(math.radians(y2)) * math.sin(math.radians(x2 - x1) / 2) ** 2)) * 1.3
        legs.append({"distance": d, "duration": d / 22.0})  # about 49 mph
    route.fulfill(json={"code": "Ok", "routes": [{"legs": legs, "geometry": {"coordinates": [list(p) for p in pts]}}]}, headers={"Access-Control-Allow-Origin": "*"})


TRIP_DATES = []


def nws(route):
    u = route.request.url
    if "/points/" in u:
        body = {"properties": {"forecast": "https://api.weather.gov/gridpoints/GSP/1,1/forecast", "timeZone": "America/New_York"}}
    elif "/forecast" in u:
        body = {"properties": {"periods": [p for d in TRIP_DATES for p in (
            {"name": "Today", "startTime": f"{d}T06:00:00-04:00", "temperature": 64, "temperatureUnit": "F", "shortForecast": "Mostly Sunny"},
            {"name": "Tonight", "startTime": f"{d}T18:00:00-04:00", "temperature": 41, "temperatureUnit": "F", "shortForecast": "Clear"})]}}
    else:
        body = {"features": []}
    route.fulfill(json=body, headers={"Access-Control-Allow-Origin": "*"})


def main():
    with sync_playwright() as p:
        b = p.chromium.launch()
        for scheme in ("light",):
            ctx = b.new_context(viewport={"width": 1280, "height": 820}, device_scale_factor=1, color_scheme=scheme)
            page = ctx.new_page()
            page.on("dialog", lambda d: d.accept())
            page.route("https://nominatim.openstreetmap.org/**", lambda r: r.fulfill(json=HOME, headers={"Access-Control-Allow-Origin": "*"}))
            page.route("https://router.project-osrm.org/**", osrm)
            page.route("https://api.weather.gov/**", nws)
            page.goto(APP)
            page.evaluate("localStorage.clear()")
            page.reload()
            page.add_style_tag(content="#toast{display:none!important}")
            shot = lambda name: page.screenshot(path=str(OUT / f"{name}.png"))

            page.fill("#homeQ", "Knoxville, TN")
            page.click("[data-act=homeSearch]")
            page.click("#homeResults [data-pick='0']")
            page.wait_for_selector("main .ok")
            page.fill("[data-bind=startDate]", "2027-10-14")
            page.dispatch_event("[data-bind=startDate]", "change")
            for k in ("waterfalls", "hiking"):
                page.click(f"[data-act=interest][data-k={k}]")
            page.click("[data-act=interest][data-k=food]")
            page.evaluate("RT.state.profile.visited = ['FL', 'GA', 'AL']")
            page.evaluate("window.scrollTo(0, 0)")
            page.screenshot(path=str(OUT / "01-interview.png"), full_page=True)
            page.click("[data-act=findDest]")
            page.wait_for_selector("text=Recommended trips")
            shot("02-destinations")

            page.click(".grid .card[data-i='1']")
            page.wait_for_selector("text=drive times checked for", timeout=15000)
            TRIP_DATES.extend(page.evaluate("RT.state.trip.days.map(d => d.date)"))
            page.click("[data-act=hideTripHint]")
            # a deliberate late check-in shows the checker at work
            page.evaluate("RT.state.trip.days[0].stops[RT.state.trip.days[0].stops.length-1].arrive = '17:45'")
            page.click("summary:has-text('Tools')")
            page.click("[data-act=check]")
            page.click("[data-act=toggleStop][data-d='0'][data-s='1']")
            page.evaluate("window.scrollTo(0, 0)")
            shot("03-trip-check")

            page.click("#tabs [data-tab=navigate]")
            shot("04-navigate")
            page.click("#tabs [data-tab=weather]")
            page.click("[data-act=weather]")
            page.wait_for_selector("text=No active alerts")
            shot("05-weather-roads")
            page.click("#tabs [data-tab=budget]")
            shot("06-budget-booking")
            page.click("#tabs [data-tab=tracker]")
            shot("07-tracker")
            page.click("#tabs [data-tab=feedback]")
            page.fill("[data-fb=task]", "Planned a long weekend in the mountains")
            page.click("[data-fb-ease='4']")
            page.fill("[data-fb=ideas]", "More lighthouses on the Great Lakes")
            shot("10-feedback")
            # Where to: a traveler who knows the town gets that trip first
            page.click("#tabs [data-tab=interview]")
            page.select_option("[data-bind='profile.destState']", "TN")
            page.fill("[data-bind='profile.destCity']", "Gatlinburg")
            page.dispatch_event("[data-bind='profile.destCity']", "change")
            page.click(".stepbar [data-act=findDest]")
            page.wait_for_selector(".card.dest.pick")
            page.evaluate("window.scrollTo(0, document.querySelector('.where').getBoundingClientRect().top + window.scrollY - 140)")
            shot("11-city")
            # Cruise Day: one port, three ways to spend the day
            page.click("#tabs [data-tab=cruise]")
            page.select_option("[data-bind='profile.cruise.portId']", "grand-cayman")
            page.select_option("[data-bind='profile.cruise.line']", "Carnival")
            page.dispatch_event("[data-bind='profile.cruise.line']", "change")
            page.evaluate("window.scrollTo(0, document.querySelector('#cruiseOut').getBoundingClientRect().top + window.scrollY - 90)")
            shot("12-cruise")
            # A cruise port chosen in Where to on the first Plan step
            page.click("#tabs [data-tab=interview]")
            page.select_option("#cityList-state", "@cruise")
            page.evaluate("window.scrollTo(0, document.querySelector('#cityList-state').getBoundingClientRect().top + window.scrollY - 140)")
            shot("13-cruise-plan")
            page.select_option("#cityList-state", "")
            ctx.close()

        # tablet, portrait
        ctx = b.new_context(viewport={"width": 820, "height": 1180}, device_scale_factor=1, has_touch=True)
        page = ctx.new_page()
        page.route("https://nominatim.openstreetmap.org/**", lambda r: r.fulfill(json=HOME, headers={"Access-Control-Allow-Origin": "*"}))
        page.goto(APP)
        page.evaluate("localStorage.clear()")
        page.reload()
        page.fill("#homeQ", "Knoxville, TN")
        page.click("[data-act=homeSearch]")
        page.click("#homeResults [data-pick='0']")
        page.wait_for_selector("main .ok")
        page.evaluate("RT.state.profile.interests = ['scenic','beach','fishing','history']; RT.state.startDate='2027-04-15'; RT.state.recs=[]")
        page.click("#tabs [data-tab=destinations]")
        page.wait_for_selector("text=Recommended trips")
        page.add_style_tag(content="#toast{display:none!important}")
        page.screenshot(path=str(OUT / "08-tablet.png"))
        ctx.close()

        # iPad install steps: the tip shows only on a hosted address, so serve the app
        # under a stand-in https name and present an iPad browser.
        ctx = b.new_context(viewport={"width": 834, "height": 1194}, device_scale_factor=1, has_touch=True,
                            user_agent="Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1")
        page = ctx.new_page()
        app_dir = ROOT / "app"
        def serve(route):
            rel = route.request.url.split("rtp.example/", 1)[1].split("?")[0] or "index.html"
            f = app_dir / rel
            route.fulfill(path=str(f)) if f.is_file() else route.fulfill(status=404)
        page.route("https://rtp.example/**", serve)
        page.goto("https://rtp.example/index.html")
        page.wait_for_selector("#install:not([hidden])")
        page.add_style_tag(content="#toast{display:none!important}")
        page.screenshot(path=str(OUT / "09-tablet-install.png"))
        ctx.close()
        b.close()
    print("\n".join(sorted(str(f.relative_to(ROOT)) for f in OUT.glob("*.png"))))


if __name__ == "__main__":
    main()
