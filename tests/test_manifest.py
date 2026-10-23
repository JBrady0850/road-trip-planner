"""The install manifest."""
import json
from pathlib import Path

APP = Path(__file__).resolve().parents[1] / "app"


def test_install_identity_is_this_app_only():
    """Browsers resolve a manifest id against the site's origin, not the app's folder.
    "./" claimed all of the shared github.io site, so Android Chrome reported other
    apps from that site as already installed and their install failed."""
    m = json.loads((APP / "manifest.webmanifest").read_text(encoding="utf-8"))
    assert m["id"] == "/road-trip-planner/"
    assert m["scope"] == "./" and m["start_url"] == "./index.html"
