"""Phone navigation links.

Google Maps: one link per day with every stop in order. The Google Maps app accepts
at most 9 waypoints between origin and destination, so longer days split into
consecutive legs that share an endpoint.

Waze: a Waze link takes exactly one destination, so every stop gets its own link.
"""
from __future__ import annotations

from urllib.parse import quote

from .trip import Day, Stop

MAX_WAYPOINTS = 9
GOOGLE_DIR = "https://www.google.com/maps/dir/?api=1&travelmode=driving"


def google_link(stops: list[Stop], navigate: bool = True) -> str:
    if len(stops) < 2:
        raise ValueError("a route needs at least two stops")
    # Addresses keep stop names readable in the Google Maps app.
    locs = [s.address for s in stops]
    url = f"{GOOGLE_DIR}&origin={quote(locs[0], safe='')}&destination={quote(locs[-1], safe='')}"
    if len(locs) > 2:
        url += "&waypoints=" + quote("|".join(locs[1:-1]), safe="")
    if navigate:
        url += "&dir_action=navigate"
    return url


def split_legs(stops: list[Stop], max_waypoints: int = MAX_WAYPOINTS) -> list[list[Stop]]:
    """Split a stop list into chunks of at most max_waypoints + 2 stops.
    Each chunk starts where the previous one ended."""
    size = max_waypoints + 2
    if len(stops) <= size:
        return [stops]
    legs, i = [], 0
    while i < len(stops) - 1:
        leg = stops[i:i + size]
        legs.append(leg)
        i += size - 1
    return legs


def day_links(day: Day) -> list[str]:
    return [google_link(leg) for leg in split_legs(day.stops)]


def waze_link(stop: Stop) -> tuple[str, bool]:
    """Return (url, is_search). Coordinates go straight to the spot; an address opens
    a Waze search that the driver should confirm."""
    if stop.has_coords:
        return f"https://waze.com/ul?ll={stop.lat}%2C{stop.lon}&navigate=yes", False
    return f"https://waze.com/ul?q={quote(stop.address, safe='')}&navigate=yes", True
