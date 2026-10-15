"""Live National Weather Service checks (api.weather.gov). Free, no key.

NWS requires a User-Agent that identifies your app and a contact. Set
ROADTRIP_NWS_USER_AGENT, for example "(my-roadtrip, me@example.com)".
NWS forecasts reach about 7 days ahead; dates beyond that report "not yet available".
"""
from __future__ import annotations

import os
from datetime import date

import requests

from .trip import Trip

API = "https://api.weather.gov"


def _get(url: str, ua: str) -> dict:
    r = requests.get(url, headers={"User-Agent": ua, "Accept": "application/geo+json"}, timeout=20)
    r.raise_for_status()
    return r.json()


def forecast_page(lat: float, lon: float) -> str:
    return f"https://forecast.weather.gov/MapClick.php?lat={lat:.4f}&lon={lon:.4f}"


def check_point(lat: float, lon: float, on: date, ua: str) -> dict:
    point = _get(f"{API}/points/{lat:.4f},{lon:.4f}", ua)["properties"]
    periods = _get(point["forecast"], ua)["properties"]["periods"]
    day_periods = [p for p in periods if p["startTime"][:10] == on.isoformat()]
    alerts = _get(f"{API}/alerts/active?point={lat:.4f},{lon:.4f}", ua)["features"]
    return {
        "forecast": [f"{p['name']}: {p['temperature']}{p['temperatureUnit']}, {p['shortForecast']}" for p in day_periods]
                    or ["Not yet available (NWS forecasts reach about 7 days ahead)"],
        "alerts": [a["properties"]["headline"] for a in alerts],
        "page": forecast_page(lat, lon),
    }


def check_trip(trip: Trip, ua: str | None = None) -> list[dict]:
    ua = ua or os.environ.get("ROADTRIP_NWS_USER_AGENT")
    if not ua:
        raise SystemExit("Set ROADTRIP_NWS_USER_AGENT, for example '(my-roadtrip, me@example.com)'")
    seen, out = set(), []
    for day in trip.days:
        for s in day.stops:
            if not s.has_coords:
                continue
            key = (day.date, round(s.lat, 2), round(s.lon, 2))
            if key in seen:
                continue
            seen.add(key)
            try:
                res = check_point(s.lat, s.lon, day.date, ua)
            except requests.RequestException as e:
                res = {"forecast": [f"UNVERIFIED: request failed ({e.__class__.__name__})"], "alerts": [],
                       "page": forecast_page(s.lat, s.lon)}
            out.append({"day": day.label, "stop": s.name, **res})
    return out
