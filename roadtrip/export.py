"""Outputs generated from the trip file: stop list, link sheets, My Maps CSV,
KML route layers, and an iCalendar file. Regenerate after every change so no copy
goes stale."""
from __future__ import annotations

import csv
import html
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape
from zoneinfo import ZoneInfo

from .links import day_links, waze_link
from .routing import DayRoute
from .trip import Trip


def _hm(t) -> str:
    return t.strftime("%I:%M %p").lstrip("0") if t else ""


def stop_list_md(trip: Trip) -> str:
    lines = [f"# {trip.name}: stop-by-stop list", "", "| # | Day | Time | Stop | Type | Address |", "|---|---|---|---|---|---|"]
    for n, day, s in trip.all_stops():
        t = s.arrive or s.depart
        lines.append(f"| {n} | {day.label} | {_hm(t)} | {s.name} | {s.type} | {s.address} |")
    return "\n".join(lines) + "\n"


def links_md(trip: Trip) -> str:
    out = [f"# {trip.name}: navigation links", ""]
    if trip.map_url:
        out += [f"Trip map: {trip.map_url}", ""]
    out += ["## Google Maps (one route per day; tap Start for voice navigation)", ""]
    for day in trip.days:
        links = day_links(day)
        for k, url in enumerate(links, 1):
            part = f" (part {k} of {len(links)})" if len(links) > 1 else ""
            out.append(f"- {day.label}: {day.title}{part}: {url}")
    out += ["", "## Waze (one link per stop; tap the next link at each arrival)", ""]
    for n, day, s in trip.all_stops():
        url, search = waze_link(s)
        out.append(f"{n}. {day.label} {s.name}{' (search: confirm the result)' if search else ''}: {url}")
    return "\n".join(out) + "\n"


def links_html(trip: Trip) -> str:
    rows = []
    for day in trip.days:
        links = day_links(day)
        for k, url in enumerate(links, 1):
            part = f" (part {k} of {len(links)})" if len(links) > 1 else ""
            rows.append(f'<li><a href="{html.escape(url)}">{html.escape(day.label + ": " + day.title + part)}</a></li>')
    waze = []
    for n, day, s in trip.all_stops():
        url, search = waze_link(s)
        waze.append(f'<li><a href="{html.escape(url)}">{n}. {html.escape(day.label + " " + s.name)}</a>{" (search)" if search else ""}</li>')
    map_line = f'<p><a href="{html.escape(trip.map_url)}">Open the trip map</a></p>' if trip.map_url else ""
    return (f'<html><body style="font-family:Arial,sans-serif;max-width:640px;margin:auto">'
            f"<h2>{html.escape(trip.name)}</h2>{map_line}<h3>Google Maps, one route per day</h3><ul>{''.join(rows)}</ul>"
            f"<h3>Waze, one link per stop</h3><ol style='list-style:none;padding-left:0'>{''.join(waze)}</ol></body></html>")


def mymaps_csv(trip: Trip, path: Path) -> None:
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Name", "Day", "Time", "Type", "Address", "Latitude", "Longitude"])
        for n, day, s in trip.all_stops():
            w.writerow([f"{n}. {s.name}", day.label, _hm(s.arrive or s.depart), s.type, s.address, s.lat or "", s.lon or ""])


def route_kml(trip: Trip, day_index: int, route: DayRoute) -> str:
    """One KML per day: a single LineString plus that day's stops, no folders or
    MultiGeometry (My Maps may drop those). Import each file as its own layer."""
    day = trip.days[day_index]
    coords = " ".join(f"{lon:.6f},{lat:.6f},0" for lon, lat in route.geometry)
    marks = "".join(
        f"<Placemark><name>{escape(s.name)}</name><description>{escape(s.address)}</description>"
        f"<Point><coordinates>{s.lon},{s.lat},0</coordinates></Point></Placemark>"
        for s in day.stops if s.has_coords)
    title = f"Day {day_index + 1} route: {day.title} ({day.label})"
    return ('<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document>'
            f"<name>{escape(title)}</name>"
            '<Style id="route"><LineStyle><color>ffe8731a</color><width>5</width></LineStyle></Style>'
            f"<Placemark><name>{escape(title)}</name><description>{route.total_miles:.0f} mi, {route.total_hours:.1f} h routed</description>"
            f"<styleUrl>#route</styleUrl><LineString><tessellate>1</tessellate><coordinates>{coords}</coordinates></LineString></Placemark>"
            f"{marks}</Document></kml>")


def ics(trip: Trip) -> str:
    """iCalendar with one event per timed stop, written in UTC so every calendar app
    shows the right local time."""
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    ev = []
    for n, day, s in trip.all_stops():
        if not s.arrive:
            continue
        tz = ZoneInfo(day.tz)
        start = datetime.combine(day.date, s.arrive, tz).astimezone(timezone.utc)
        end_t = s.depart or s.arrive
        end = datetime.combine(day.date, end_t, tz).astimezone(timezone.utc)
        if end < start:
            end = start
        def esc(x: str) -> str:
            return x.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")
        ev.append("\r\n".join([
            "BEGIN:VEVENT", f"UID:{day.date.isoformat()}-{n}@road-trip-planner-agent", f"DTSTAMP:{stamp}",
            f"DTSTART:{start.strftime('%Y%m%dT%H%M%SZ')}", f"DTEND:{end.strftime('%Y%m%dT%H%M%SZ')}",
            f"SUMMARY:{esc(s.name)}", f"LOCATION:{esc(s.address)}", "END:VEVENT"]))
    return "\r\n".join(["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//road-trip-planner-agent//EN", *ev, "END:VCALENDAR"]) + "\r\n"
