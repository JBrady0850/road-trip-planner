"""Routed drive times and route geometry from an OSRM server.

Default server: the public OSRM demo (router.project-osrm.org). It is for light,
non-commercial use and has no traffic data. Point ROADTRIP_OSRM_URL at your own
server for heavier use. Every stop used for routing needs lat and lon.
"""
from __future__ import annotations

import hashlib
import json
import os
from dataclasses import dataclass
from pathlib import Path

import requests

from .trip import Day

DEFAULT_OSRM = "https://router.project-osrm.org"


@dataclass
class Leg:
    seconds: float
    meters: float


@dataclass
class DayRoute:
    legs: list[Leg]
    geometry: list[list[float]]  # [lon, lat] pairs

    @property
    def total_hours(self) -> float:
        return sum(l.seconds for l in self.legs) / 3600

    @property
    def total_miles(self) -> float:
        return sum(l.meters for l in self.legs) / 1609.344


def route_day(day: Day, base_url: str | None = None, cache_dir: Path | None = None,
              timeout: int = 30) -> DayRoute:
    missing = [s.name for s in day.stops if not s.has_coords]
    if missing:
        raise ValueError(f"{day.date}: routing needs lat/lon for: {', '.join(missing)}")
    coords = ";".join(f"{s.lon},{s.lat}" for s in day.stops)
    cache = None
    if cache_dir:
        cache_dir.mkdir(parents=True, exist_ok=True)
        digest = hashlib.sha1(coords.encode()).hexdigest()[:12]
        cache = cache_dir / f"route-{day.date.isoformat()}-{digest}.json"
        if cache.exists():
            data = json.loads(cache.read_text())
            return _parse(data)
    base = base_url or os.environ.get("ROADTRIP_OSRM_URL", DEFAULT_OSRM)
    url = f"{base.rstrip('/')}/route/v1/driving/{coords}?overview=full&geometries=geojson"
    r = requests.get(url, timeout=timeout, headers={"User-Agent": "road-trip-planner-agent"})
    r.raise_for_status()
    data = r.json()
    if data.get("code") != "Ok":
        raise RuntimeError(f"OSRM error for {day.date}: {data.get('code')} {data.get('message', '')}")
    if cache:
        cache.write_text(json.dumps(data))
    return _parse(data)


def _parse(data: dict) -> DayRoute:
    route = data["routes"][0]
    legs = [Leg(seconds=l["duration"], meters=l["distance"]) for l in route["legs"]]
    return DayRoute(legs=legs, geometry=route["geometry"]["coordinates"])
