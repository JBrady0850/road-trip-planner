"""Offline sunset time (NOAA solar position equations). Accuracy is about one to two
minutes for planning, which is enough to check "arrive before dark". No API needed."""
from __future__ import annotations

import math
from datetime import date, datetime, timedelta, timezone
from zoneinfo import ZoneInfo


def sunset(d: date, lat: float, lon: float, tz: str) -> datetime | None:
    """Local sunset time, or None for polar day or night."""
    n = d.timetuple().tm_yday
    gamma = 2 * math.pi / 365 * (n - 1 + 0.5)
    eqtime = 229.18 * (0.000075 + 0.001868 * math.cos(gamma) - 0.032077 * math.sin(gamma)
                       - 0.014615 * math.cos(2 * gamma) - 0.040849 * math.sin(2 * gamma))
    decl = (0.006918 - 0.399912 * math.cos(gamma) + 0.070257 * math.sin(gamma)
            - 0.006758 * math.cos(2 * gamma) + 0.000907 * math.sin(2 * gamma)
            - 0.002697 * math.cos(3 * gamma) + 0.00148 * math.sin(3 * gamma))
    lat_r = math.radians(lat)
    cos_ha = (math.cos(math.radians(90.833)) / (math.cos(lat_r) * math.cos(decl))
              - math.tan(lat_r) * math.tan(decl))
    if cos_ha < -1 or cos_ha > 1:
        return None
    ha = math.degrees(math.acos(cos_ha))
    minutes_utc = 720 - 4 * (lon - ha) - eqtime
    base = datetime(d.year, d.month, d.day, tzinfo=timezone.utc)
    return (base + timedelta(minutes=minutes_utc)).astimezone(ZoneInfo(tz))
