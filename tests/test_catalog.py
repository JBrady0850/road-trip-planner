"""Catalog coordinate checks. Each case pins a point confirmed in docs/catalog-check.md."""
import json
import math
import re
from pathlib import Path

CATALOG = Path(__file__).resolve().parents[1] / "app" / "data" / "catalog.js"
STOP = re.compile(r'\[("(?:[^"\\]|\\.)*"),\s*("(?:[^"\\]|\\.)*"),\s*(-?\d+\.\d+),\s*(-?\d+\.\d+),')


def stops():
    text = CATALOG.read_text(encoding="utf-8")
    return {json.loads(m[1]): (float(m[3]), float(m[4]), json.loads(m[2])) for m in STOP.finditer(text)}


def km(a, b):
    p1, p2 = math.radians(a[0]), math.radians(b[0])
    dp, dl = p2 - p1, math.radians(b[1] - a[1])
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * 6371 * math.asin(math.sqrt(h))


def test_river_bend_overlook_is_at_the_overlook():
    # OpenStreetMap tourism=viewpoint "Riverbend Overlook", checked 2026-10-15.
    # The old point sat near the North Unit entrance, 9 km east of the overlook.
    # Map links and Find location search the address first, so it must name the
    # overlook; OpenStreetMap finds it only as "Riverbend Overlook".
    lat, lon, address = stops()["North Unit River Bend Overlook"]
    assert km((lat, lon), (47.6087, -103.3782)) < 1.0
    assert address.startswith("Riverbend Overlook")
