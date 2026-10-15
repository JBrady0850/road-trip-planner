"""Plan checker: catches schedule errors before an itinerary goes out.

Checks, per day:
  order      times run forward (arrive <= depart <= next arrive)
  travel     the gap between stops covers the routed drive time (needs routes)
  drive cap  routed driving stays under rules.max_drive_hours (needs routes)
  check-in   hotel check-ins land near rules.checkin_target
  tickets    arrival leaves rules.ticket_margin_minutes before a timed entry
  sunset     the check-in or final arrival happens before local sunset
  continuity each day starts where the previous day ended
  links      days over 9 waypoints split; stops without coordinates use Waze search
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, time

from .links import MAX_WAYPOINTS
from .routing import DayRoute
from .sun import sunset
from .trip import Day, Trip


@dataclass
class Finding:
    level: str  # ERROR, WARN, INFO
    day: str
    check: str
    message: str

    def __str__(self) -> str:
        return f"[{self.level}] {self.day} | {self.check}: {self.message}"


def _dt(day: Day, t: time) -> datetime:
    return datetime.combine(day.date, t)


def _hm(t: time) -> str:
    return t.strftime("%I:%M %p").lstrip("0")


def check_trip(trip: Trip, routes: dict | None = None) -> list[Finding]:
    routes = routes or {}
    out: list[Finding] = []
    r = trip.rules
    for i, day in enumerate(trip.days):
        lbl = day.label
        route: DayRoute | None = routes.get(day.date)
        stops = day.stops

        # order
        for s in stops:
            if s.arrive and s.depart and s.depart < s.arrive:
                out.append(Finding("ERROR", lbl, "order", f"{s.name}: departs {_hm(s.depart)} before arriving {_hm(s.arrive)}"))
        for a, b in zip(stops, stops[1:]):
            if a.depart and b.arrive and b.arrive < a.depart:
                out.append(Finding("ERROR", lbl, "order", f"{b.name} arrival {_hm(b.arrive)} is before leaving {a.name} at {_hm(a.depart)}"))

        # travel and drive cap
        if route:
            slack = timedelta(minutes=r["travel_slack_minutes"])
            for (a, b), leg in zip(zip(stops, stops[1:]), route.legs):
                if a.depart and b.arrive:
                    gap = _dt(day, b.arrive) - _dt(day, a.depart)
                    need = timedelta(seconds=leg.seconds)
                    if gap + slack < need:
                        out.append(Finding("ERROR", lbl, "travel",
                                           f"{a.name} to {b.name} needs about {int(need.total_seconds() // 60)} min of driving; the plan allows {int(gap.total_seconds() // 60)} min"))
            if route.total_hours > r["max_drive_hours"]:
                out.append(Finding("ERROR", lbl, "drive cap",
                                   f"{route.total_hours:.1f} h routed driving exceeds the {r['max_drive_hours']} h cap ({route.total_miles:.0f} mi)"))
            elif route.total_hours > r["max_drive_hours"] - 0.5:
                out.append(Finding("WARN", lbl, "drive cap",
                                   f"{route.total_hours:.1f} h is within 30 min of the cap; routing has no traffic data"))

        # check-in
        target = datetime.strptime(r["checkin_target"], "%H:%M").time()
        window = timedelta(minutes=r["checkin_window_minutes"])
        for s in stops:
            if s.checkin and s.arrive:
                diff = _dt(day, s.arrive) - _dt(day, target)
                if abs(diff) > window:
                    side = "after" if diff > timedelta(0) else "before"
                    out.append(Finding("WARN", lbl, "check-in",
                                       f"{s.name} check-in {_hm(s.arrive)} is {int(abs(diff).total_seconds() // 60)} min {side} the {_hm(target)} target"))

        # timed entry
        margin = timedelta(minutes=r["ticket_margin_minutes"])
        for s in stops:
            if s.timed_entry and s.arrive and _dt(day, s.arrive) > _dt(day, s.timed_entry) - margin:
                out.append(Finding("WARN", lbl, "tickets",
                                   f"{s.name}: arrive {_hm(s.arrive)} leaves less than {r['ticket_margin_minutes']} min before the {_hm(s.timed_entry)} entry"))

        # sunset
        if r["arrive_before_sunset"]:
            target_stop = next((s for s in stops if s.checkin), stops[-1])
            if target_stop.arrive and target_stop.has_coords:
                ss = sunset(day.date, target_stop.lat, target_stop.lon, day.tz)
                if ss and target_stop.arrive > ss.time():
                    out.append(Finding("WARN", lbl, "sunset",
                                       f"arrive {target_stop.name} {_hm(target_stop.arrive)} after sunset ({_hm(ss.time())})"))

        # continuity
        if i > 0:
            prev_end, start = trip.days[i - 1].stops[-1], stops[0]
            if prev_end.address.strip().lower() != start.address.strip().lower():
                out.append(Finding("WARN", lbl, "continuity",
                                   f"day starts at {start.name}, but the previous day ended at {prev_end.name}"))

        # links
        if len(stops) - 2 > MAX_WAYPOINTS:
            out.append(Finding("INFO", lbl, "links",
                               f"{len(stops) - 2} waypoints; the Google Maps link splits into legs (app limit {MAX_WAYPOINTS})"))
        for s in stops:
            if not s.has_coords:
                out.append(Finding("INFO", lbl, "links", f"{s.name} has no coordinates; Waze opens an address search and routing skips this day"))
    return out
