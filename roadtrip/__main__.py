"""Command line: python -m roadtrip <command> trip.json [options]

Commands
  check    run the plan checker (add --route for drive-time and drive-cap checks)
  links    print Google Maps per-day links and Waze per-stop links
  weather  live NWS forecast and active alerts for every stop with coordinates
  export   write stop list, link sheets, My Maps CSV, ICS, and (with --route) KML
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from . import check, export, routing, trip as trip_mod, weather


def _routes(t, args):
    out = {}
    for day in t.days:
        try:
            out[day.date] = routing.route_day(day, base_url=args.osrm, cache_dir=Path(args.out) / ".cache")
        except ValueError as e:
            print(f"[INFO] routing skipped: {e}", file=sys.stderr)
    return out


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(prog="roadtrip", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("command", choices=["check", "links", "weather", "export"])
    ap.add_argument("trip")
    ap.add_argument("--out", default="output", help="output folder (default: output)")
    ap.add_argument("--route", action="store_true", help="call OSRM for routed drive times and route lines")
    ap.add_argument("--osrm", help="OSRM base URL (default: ROADTRIP_OSRM_URL or the public demo server)")
    a = ap.parse_args(argv)

    t = trip_mod.load(a.trip)
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)

    if a.command == "check":
        routes = _routes(t, a) if a.route else {}
        for d in t.days:
            if d.date in routes:
                r = routes[d.date]
                print(f"[INFO] {d.label} | route: {r.total_miles:.0f} mi, {r.total_hours:.1f} h driving")
        findings = check.check_trip(t, routes)
        for f in findings:
            print(f)
        errors = sum(f.level == "ERROR" for f in findings)
        print(f"{errors} error(s), {sum(f.level == 'WARN' for f in findings)} warning(s)")
        return 1 if errors else 0

    if a.command == "links":
        print(export.links_md(t))
        return 0

    if a.command == "weather":
        for r in weather.check_trip(t):
            print(f"{r['day']} | {r['stop']}")
            for line in r["forecast"]:
                print(f"  {line}")
            print("  Alerts: " + ("; ".join(r["alerts"]) if r["alerts"] else "none active"))
            print(f"  {r['page']}")
        return 0

    # export
    (out / "stops.md").write_text(export.stop_list_md(t), encoding="utf-8")
    (out / "links.md").write_text(export.links_md(t), encoding="utf-8")
    (out / "links.html").write_text(export.links_html(t), encoding="utf-8")
    export.mymaps_csv(t, out / "mymaps-stops.csv")
    (out / "trip.ics").write_text(export.ics(t), encoding="utf-8", newline="")
    written = ["stops.md", "links.md", "links.html", "mymaps-stops.csv", "trip.ics"]
    if a.route:
        routes = _routes(t, a)
        for i, d in enumerate(t.days):
            if d.date in routes:
                name = f"day{i + 1}-route.kml"
                (out / name).write_text(export.route_kml(t, i, routes[d.date]), encoding="utf-8")
                written.append(name)
    print("Wrote: " + ", ".join(str(out / w) for w in written))
    return 0


if __name__ == "__main__":
    sys.exit(main())
