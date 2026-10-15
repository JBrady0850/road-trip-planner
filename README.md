# Road Trip Planner

A free, self-contained road trip planner for one traveler or a small group. You
answer a short interview, it recommends destinations that fit your interests,
season, and driving limits, drafts a day-by-day itinerary, checks the plan for
mistakes, and gives you phone navigation links, a calendar file, map layers, live
weather and road links, a budget, a booking checklist, and a 50-state tracker.

It runs on a computer or a tablet. Your data stays on your device.

## See it

Screenshots use a sample traveler from Knoxville, TN; weather shown is sample data.

| | |
|---|---|
| **1. Interview.** Seven short steps: home, dates, interests, driving, lodging and dining, budget, states visited. ![Interview](docs/images/01-interview.png) | **2. Destinations.** Ranked for your interests, the season, new states, and drive time, with the reasons shown. ![Destinations](docs/images/02-destinations.png) |
| **3. Trip and plan check.** Edit every stop; the checker flags problems like a late hotel check-in. ![Trip and plan check](docs/images/03-trip-check.png) | **4. Navigate.** Google Maps routes per day, Waze links per stop, calendar, CSV, and KML downloads. ![Navigate](docs/images/04-navigate.png) |
| **5. Weather and roads.** National Weather Service forecasts and alerts, plus official state road-condition pages. ![Weather and roads](docs/images/05-weather-roads.png) | **6. Budget and booking.** Estimate against your cap and a checklist with booking links. ![Budget and booking](docs/images/06-budget-booking.png) |
| **7. 50-state tracker.** Tap states visited; the current trip is outlined. ![50-state tracker](docs/images/07-tracker.png) | **8. Tablet.** The same app on an iPad or Android tablet, added to the home screen. ![Tablet](docs/images/08-tablet.png) |

## Start it

| Device | How |
|---|---|
| Windows | Double-click `Start-Windows.bat` |
| Mac | Double-click `Start-Mac.command` (first time: right-click, Open) |
| Linux | Run `./start-linux.sh` |
| Any computer without Python | Open `app/index.html` in Chrome, Edge, Firefox, or Safari |
| iPad or Android tablet | Open the hosted copy (see below), then Share, Add to Home Screen |

The start scripts use Python 3.9 or newer (standard library only) to run the app on
`http://127.0.0.1` on your own computer. With the optional `pywebview` package
(`pip install pywebview`) it opens in its own window instead of your browser.

**Tablets** cannot run files from a download folder, so host the `app` folder on
any static web host. This repository includes a GitHub Pages workflow
(`.github/workflows/pages.yml`) that publishes `app/`: fork the repository, open
Settings, Pages, and set Source to "GitHub Actions". Open the Pages address on the
tablet and add it to the home screen; after the first visit the app shell works
offline.

## What it does

1. **Interview:** home, dates and nights, interests (scenic, parks, waterfalls,
   beaches, fishing, water sports, history, food, holiday lights, easy hikes, caves,
   towns), daily drive limit, start time, fuel economy, vehicle height, lodging brand
   and nightly range, preferred check-in time, diet and dining limits, budget cap,
   and the states you have already visited.
2. **Destinations:** a built-in catalog of 49 destinations covering all 50 states
   is scored on your interests, the season, new states, and estimated drive time.
3. **Itinerary draft:** drive days sized to your daily limit, sightseeing days that
   spread the stops evenly, nearby stops added when you would reach the hotel early,
   and open days when stops run out.
4. **Plan checker:** times out of order, not enough time to drive between stops,
   daily drive cap, check-in far from your target, timed-entry margin, arriving after
   sunset, days that do not start where the last one ended, and stops without
   coordinates.
5. **Route check and re-time:** real drive times from the free OSRM router, then
   one tap rebuilds every arrival and departure from those times.
6. **Navigate:** Google Maps links with every stop for each day (split automatically
   above the Google Maps app limit of 9 waypoints), Waze links for each stop (Waze
   takes one destination per link), a calendar file, My Maps CSV pins, and KML route
   layers.
7. **Weather and roads:** live National Weather Service forecasts and active alerts
   for every stop, official FHWA road-condition pages for each state on the trip, and
   National Park Service alerts.
8. **Budget and booking:** lodging, fuel, food, attractions, and contingency against
   your cap, plus a booking checklist with lodging search links. You book; the app
   never reserves or pays.
9. **50 states:** tap to mark states visited; finished trips mark their states.
10. **Optional AI itineraries:** add your own Anthropic API key in Settings to have
    Claude write a custom itinerary, which then goes through the same checks.

## Files

```
app/                 the app (open index.html)
  data/catalog.js    destinations: edit or add your own
  data/states.js     50 states and road-condition links
  js/engine.js       scoring, drafting, checker, links, exports (no network)
  js/services.js     place search, routing, weather, optional AI
  js/app.js          interface
desktop/             Python launcher for Windows, Mac, Linux
roadtrip/            Python command-line engine for power users (same checks)
examples/            sample trip file
prompts/             master prompt template for using an AI assistant as a planner
docs/                limits, catalog notes, privacy, roadmap
tests/               Python unit tests and a browser smoke test
```

## Power users: command line

```
pip install -r requirements.txt
python -m roadtrip check examples/sample_trip.json --route
python -m roadtrip links examples/sample_trip.json
python -m roadtrip export examples/sample_trip.json --route --out output
ROADTRIP_NWS_USER_AGENT="(my-roadtrip, me@example.com)" python -m roadtrip weather examples/sample_trip.json
```

## Tests

```
python -m pytest -q          # engine unit tests
python tests/ui_smoke.py     # full app flow in headless Chromium (pip install playwright)
```

## Data sources and credits

Place search: OpenStreetMap Nominatim (© OpenStreetMap contributors, ODbL). Routing:
OSRM public demo server (light use; set your own server in Settings). Weather:
National Weather Service api.weather.gov. Road conditions: Federal Highway
Administration state traffic pages. Hours, prices, and closures change; verify
before you travel. See [docs/LIMITS.md](docs/LIMITS.md).

## License

MIT. See [LICENSE](LICENSE).
