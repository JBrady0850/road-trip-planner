"""Saving to the computer: desktop window Save dialog and command-line export."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "desktop"))
sys.path.insert(0, str(ROOT))

import roadtrip_desktop  # noqa: E402
from roadtrip.__main__ import main as cli  # noqa: E402

SAMPLE = ROOT / "examples" / "sample_trip.json"


def test_desktop_window_saves_where_the_person_picks(tmp_path):
    target = tmp_path / "My Trips" / "smokies.json"
    api = roadtrip_desktop.SaveApi(ask_path=lambda name: target)
    text = SAMPLE.read_text()
    assert api.save_file("smokies.json", text) == str(target)
    assert json.loads(target.read_text())["trip"]["name"] == "Sample Smokies Weekend"


def test_desktop_window_cancel_writes_nothing(tmp_path):
    api = roadtrip_desktop.SaveApi(ask_path=lambda name: None)
    assert api.save_file("smokies.json", "{}") == ""
    assert not any(tmp_path.iterdir())


def test_desktop_window_suggests_a_plain_file_name():
    seen = []
    roadtrip_desktop.SaveApi(ask_path=lambda name: seen.append(name)).save_file("../../evil/trip.json", "{}")
    assert seen == ["trip.json"]


def test_desktop_window_keeps_calendar_line_endings(tmp_path):
    target = tmp_path / "trip.ics"
    roadtrip_desktop.SaveApi(ask_path=lambda name: target).save_file("trip.ics", "BEGIN:VCALENDAR\r\nEND:VCALENDAR\r\n")
    assert target.read_bytes() == b"BEGIN:VCALENDAR\r\nEND:VCALENDAR\r\n"


def test_command_line_export_writes_trip_files(tmp_path, capsys):
    assert cli(["export", str(SAMPLE), "--out", str(tmp_path)]) == 0
    for name in ("stops.md", "links.md", "links.html", "mymaps-stops.csv", "trip.ics"):
        assert (tmp_path / name).stat().st_size > 0, name
    assert "BEGIN:VEVENT" in (tmp_path / "trip.ics").read_text()
