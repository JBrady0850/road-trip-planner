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


# Ocean, Gulf, and Great Lakes states. Alaska is coastal but has no lighthouse that a
# visitor can reach by road near the catalog trip (Seward); it is listed in
# docs/CATALOG.md as the one exception.
COASTAL = {"ME", "NH", "MA", "RI", "CT", "NY", "NJ", "DE", "MD", "VA", "NC", "SC", "GA", "FL",
           "AL", "MS", "LA", "TX", "CA", "OR", "WA", "HI", "MN", "WI", "MI", "IL", "IN", "OH", "PA"}
DEST = re.compile(r'\{id:"([^"]+)".*?states:\[([^\]]*)\].*?tags:\[([^\]]*)\](.*?)stops:\[(.*?)\]\]\}', re.S)


STOP_FULL = re.compile(r'\[("(?:[^"\\]|\\.)*"),\s*"(?:[^"\\]|\\.)*",\s*-?[\d.]+,\s*-?[\d.]+,\s*\d+,\s*(\[[^\]]*\])\]')


def destinations():
    text = CATALOG.read_text(encoding="utf-8")
    return [{"id": m[1], "states": json.loads(f"[{m[2]}]"), "tags": json.loads(f"[{m[3]}]"), "head": m[4],
             "stops": [(json.loads(n), json.loads(t)) for n, t in STOP_FULL.findall(m[5] + "]")]} for m in DEST.finditer(text)]


def test_catalog_parser_reads_every_destination_and_stop():
    ds = destinations()
    assert len(ds) == len(re.findall(r'\{id:"', CATALOG.read_text(encoding="utf-8")))
    assert sum(len(d["stops"]) for d in ds) == len(stops()), "the destination parser must see every stop"


def test_every_coastal_state_has_a_lighthouse():
    covered = set()
    for d in destinations():
        if any("lighthouses" in tags for _, tags in d["stops"]):
            covered.update(d["states"])
    assert COASTAL <= covered, f"coastal states without a lighthouse stop: {sorted(COASTAL - covered)}"


def test_lighthouse_stops_are_tagged_and_so_is_their_destination():
    for d in destinations():
        for name, tags in d["stops"]:
            if re.search(r"light(house| station)|\blight\b", name, re.I) and "Lights" not in name:
                assert "lighthouses" in tags, f"{d['id']}: {name} is not tagged lighthouses"
        if any("lighthouses" in tags for _, tags in d["stops"]):
            assert "lighthouses" in d["tags"], f"{d['id']} has lighthouse stops but no lighthouses tag"


def test_every_destination_has_unique_experiences():
    for d in destinations():
        found = re.search(r"experiences:\[(.*?)\]", d["head"], re.S)
        assert found, f"{d['id']} has no experiences"
        items = json.loads(f"[{found.group(1)}]")
        assert 1 <= len(items) <= 3 and all(len(x) > 15 for x in items), (d["id"], items)


ENGINE = CATALOG.parents[1] / "js" / "engine.js"


def interest_keys():
    text = ENGINE.read_text(encoding="utf-8")
    block = text[text.index("RT.INTEREST_GROUPS = ["):]
    block = block[:block.index("];")]
    return re.findall(r'\["([a-z]+)", "[^"]+"\]', block)


def test_every_tag_is_an_interest_the_app_offers():
    keys = set(interest_keys())
    assert len(keys) == 24, sorted(keys)
    for d in destinations():
        unknown = (set(d["tags"]) | {t for _, tags in d["stops"] for t in tags}) - keys
        assert not unknown, f"{d['id']}: tags with no chip: {unknown}"


def test_every_interest_has_places_in_at_least_five_trips():
    for k in interest_keys():
        trips = [d["id"] for d in destinations() if any(k in tags for _, tags in d["stops"])]
        assert len(trips) >= 5, f"{k}: only {len(trips)} trips have a {k} place: {trips}"


NEW_INTERESTS = {"wildlife", "gardens", "camping", "golf", "music", "drinks", "art", "themeparks", "family", "spa", "markets"}


def test_new_interest_places_mark_their_trip():
    for d in destinations():
        for k in NEW_INTERESTS:
            if any(k in tags for _, tags in d["stops"]):
                assert k in d["tags"], f"{d['id']} has a {k} place but no {k} tag"
