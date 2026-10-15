"""Load and validate a trip file (JSON). The trip file is the single source of truth."""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from datetime import date, datetime, time
from pathlib import Path

DEFAULT_RULES = {
    "max_drive_hours": 7.0,
    "checkin_target": "15:00",
    "checkin_window_minutes": 60,
    "ticket_margin_minutes": 30,
    "arrive_before_sunset": True,
    "travel_slack_minutes": 10,
}


@dataclass
class Stop:
    name: str
    address: str
    type: str = "Stop"
    lat: float | None = None
    lon: float | None = None
    arrive: time | None = None
    depart: time | None = None
    checkin: bool = False
    timed_entry: time | None = None
    booking_url: str | None = None
    notes: str | None = None

    @property
    def has_coords(self) -> bool:
        return self.lat is not None and self.lon is not None

    @property
    def location(self) -> str:
        """Best location string: coordinates when known, otherwise the address."""
        return f"{self.lat},{self.lon}" if self.has_coords else self.address


@dataclass
class Day:
    date: date
    title: str
    tz: str
    stops: list[Stop] = field(default_factory=list)

    @property
    def label(self) -> str:
        return f"{self.date.strftime('%a %b')} {self.date.day}"


@dataclass
class Trip:
    name: str
    traveler: str
    days: list[Day]
    rules: dict
    map_url: str | None = None

    def all_stops(self):
        """Yield (number, day, stop) in travel order. The first stop of every day
        after Day 1 repeats the previous overnight and is not numbered again."""
        n = 0
        for i, day in enumerate(self.days):
            for j, stop in enumerate(day.stops):
                if i > 0 and j == 0:
                    continue
                n += 1
                yield n, day, stop


def _t(value):
    if value in (None, ""):
        return None
    return datetime.strptime(value, "%H:%M").time()


def _stop(d: dict) -> Stop:
    for key in ("name", "address"):
        if not d.get(key):
            raise ValueError(f"stop is missing '{key}': {d}")
    return Stop(
        name=d["name"], address=d["address"], type=d.get("type", "Stop"),
        lat=d.get("lat"), lon=d.get("lon"),
        arrive=_t(d.get("arrive")), depart=_t(d.get("depart")),
        checkin=bool(d.get("checkin", False)), timed_entry=_t(d.get("timed_entry")),
        booking_url=d.get("booking_url"), notes=d.get("notes"),
    )


APP_RULES = {"maxDriveHours": "max_drive_hours", "checkinTarget": "checkin_target",
             "checkinWindow": "checkin_window_minutes", "ticketMargin": "ticket_margin_minutes",
             "arriveBeforeSunset": "arrive_before_sunset"}


def _from_app(raw: dict) -> dict:
    """Convert a trip file saved by the browser app to this module's shape."""
    t = raw["trip"]
    rules = {APP_RULES[k]: v for k, v in (raw.get("rules") or {}).items() if k in APP_RULES}
    for d in t["days"]:
        for s in d["stops"]:
            for k in ("lat", "lon"):
                if s.get(k) in ("", None):
                    s[k] = None
                else:
                    s[k] = float(s[k])
    return {"trip": {"name": t.get("name", "Road Trip"), "rules": rules}, "days": t["days"]}


def load(path: str | Path) -> Trip:
    raw = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    if str(raw.get("format", "")).startswith("road-trip-planner/"):
        raw = _from_app(raw)
    meta = raw.get("trip", {})
    rules = {**DEFAULT_RULES, **meta.get("rules", {})}
    default_tz = meta.get("timezone", "America/New_York")
    days = []
    for d in raw["days"]:
        stops = [_stop(s) for s in d["stops"]]
        if len(stops) < 2:
            raise ValueError(f"day {d.get('date')} needs at least a start and an end stop")
        days.append(Day(date=date.fromisoformat(d["date"]), title=d.get("title", ""),
                        tz=d.get("tz", default_tz), stops=stops))
    if not days:
        raise ValueError("trip has no days")
    return Trip(name=meta.get("name", "Road Trip"), traveler=meta.get("traveler", "Traveler"),
                days=days, rules=rules, map_url=meta.get("map_url"))
