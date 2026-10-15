"""Save a planned trip to the device in every way the app runs, then load it back.

Versions covered:
  computer, downloaded copy   app/index.html opened from the folder (file://)
  computer, start script      desktop/roadtrip_desktop.py serving http://127.0.0.1
  computer, desktop window    pywebview window (its Save dialog is stood in for)
  iPad, hosted or home screen share sheet with Save to Files
  iPad, older iPadOS          no file sharing: falls back to a download
  Android tablet, hosted      Chrome download
Run: python tests/save_smoke.py
"""
import json
import mimetypes
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
APP_DIR = ROOT / "app"
SAMPLE = ROOT / "examples" / "sample_trip.json"
HOST = "https://rtp.test/road-trip-planner/"
IPAD = "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1"
ANDROID = "Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
mimetypes.add_type("application/manifest+json", ".webmanifest")
EXPECT = json.loads(SAMPLE.read_text())

SHARE_MOCK = """() => { window.__shared = []; navigator.canShare = d => !!(d && d.files && d.files.length);
  navigator.share = async d => { for (const f of d.files) window.__shared.push({ name: f.name, type: f.type, text: await f.text() }); }; }"""
NO_SHARE = "() => { navigator.canShare = () => false; }"
DESKTOP_WINDOW = """() => { window.__saved = []; window.pywebview = { api: { save_file: (name, text) => {
  window.__saved.push({ name, text }); return Promise.resolve('C:\\\\Users\\\\Sam\\\\Documents\\\\' + name); } } }; }"""


def serve(route):
    path = route.request.url.split(HOST, 1)[1].split("?")[0] or "index.html"
    f = APP_DIR / path
    if f.is_file():
        route.fulfill(body=f.read_bytes(), content_type=mimetypes.guess_type(f.name)[0] or "application/octet-stream")
    else:
        route.fulfill(status=404, body="not found")


def same_trip(saved_text, label):
    j = json.loads(saved_text)
    assert j.get("format") == "road-trip-planner/1", f"{label}: not a trip file"
    got = [[s["name"] for s in d["stops"]] for d in j["trip"]["days"]]
    want = [[s["name"] for s in d["stops"]] for d in EXPECT["days"]]
    assert j["trip"]["name"] == EXPECT["trip"]["name"] and got == want, f"{label}: saved trip does not match"


def load_sample(page):
    page.click("#tabs [data-tab=trip]")
    page.set_input_files("input[data-act=loadTrip]", str(SAMPLE))
    page.wait_for_selector(f"h1:has-text('{EXPECT['trip']['name']}')")


def toast(page):
    page.wait_for_function("document.querySelector('#toast').classList.contains('show')")
    return page.inner_text("#toast")


def check_download_version(b, label, url, **ctx_args):
    ctx = b.new_context(accept_downloads=True, **ctx_args)
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    if url.startswith(HOST):
        page.route("https://rtp.test/**", serve)
    page.goto(url)
    page.evaluate("localStorage.clear()")
    page.reload()
    load_sample(page)
    with page.expect_download() as d:
        page.click("[data-act=saveTrip]")
    dl = d.value
    saved = Path(tempfile.mkdtemp()) / dl.suggested_filename
    dl.save_as(saved)
    same_trip(saved.read_text(), label)
    msg = toast(page)
    assert "Downloads folder" in msg, f"{label}: toast should say where it went: {msg!r}"
    with page.expect_download() as d:
        page.click("[data-act=itinerary]")
    assert "<table" in Path(d.value.path()).read_text()
    page.reload()  # the trip is also kept on the device between visits
    page.wait_for_selector(f"h1:has-text('{EXPECT['trip']['name']}')")
    page.click("#tabs [data-tab=settings]")
    with page.expect_download() as d:
        page.click("[data-act=backup]")
    backup = Path(tempfile.mkdtemp()) / "backup.json"
    d.value.save_as(backup)
    ctx.close()

    ctx = b.new_context(**ctx_args)  # restore on a fresh device
    page = ctx.new_page()
    if url.startswith(HOST):
        page.route("https://rtp.test/**", serve)
    page.goto(url)
    page.click("#tabs [data-tab=trip]")  # open the saved trip file itself
    page.set_input_files("input[data-act=loadTrip]", str(saved))
    page.wait_for_selector(f"h1:has-text('{EXPECT['trip']['name']}')")
    page.evaluate("localStorage.clear()")
    page.reload()
    page.click("#tabs [data-tab=settings]")
    page.set_input_files("input[data-act=restore]", str(backup))
    page.wait_for_selector(f"h1:has-text('{EXPECT['trip']['name']}')")
    ctx.close()
    assert not errors, f"{label}: {errors}"
    print(f"[{label}] saved {dl.suggested_filename}, itinerary saved, kept after reload, trip file and backup both open on a fresh device")


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def main():
    with sync_playwright() as p:
        b = p.chromium.launch()

        check_download_version(b, "computer, downloaded copy", (APP_DIR / "index.html").as_uri(), viewport={"width": 1280, "height": 900})

        port = free_port()
        server = subprocess.Popen([sys.executable, str(ROOT / "desktop" / "roadtrip_desktop.py"), "--no-browser", "--port", str(port)],
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            for _ in range(50):
                try:
                    urllib.request.urlopen(f"http://127.0.0.1:{port}/index.html", timeout=1)
                    break
                except OSError:
                    time.sleep(0.1)
            check_download_version(b, "computer, start script", f"http://127.0.0.1:{port}/index.html", viewport={"width": 1280, "height": 900})
        finally:
            server.terminate()

        check_download_version(b, "Android tablet, hosted", HOST, viewport={"width": 800, "height": 1280}, user_agent=ANDROID,
                               has_touch=True, is_mobile=True, service_workers="block")
        # iPad without file sharing: download fallback
        ctx = b.new_context(accept_downloads=True, viewport={"width": 834, "height": 1194}, user_agent=IPAD, has_touch=True, is_mobile=True, service_workers="block")
        ctx.add_init_script(f"({NO_SHARE})()")
        page = ctx.new_page()
        page.route("https://rtp.test/**", serve)
        page.goto(HOST)
        load_sample(page)
        with page.expect_download() as d:
            page.click("[data-act=saveTrip]")
        same_trip(Path(d.value.path()).read_text(), "iPad fallback")
        ctx.close()
        print("[iPad, older iPadOS] no file sharing, so the trip downloads instead")

        # iPad with the share sheet (Safari or the home-screen app)
        ctx = b.new_context(viewport={"width": 834, "height": 1194}, user_agent=IPAD, has_touch=True, is_mobile=True, service_workers="block")
        ctx.add_init_script(f"({SHARE_MOCK})()")
        page = ctx.new_page()
        page.route("https://rtp.test/**", serve)
        page.goto(HOST)
        load_sample(page)
        page.click("[data-act=saveTrip]")
        page.wait_for_function("window.__shared.length === 1")
        f = page.evaluate("window.__shared[0]")
        assert f["name"].endswith(".json") and f["type"] == "application/json"
        same_trip(f["text"], "iPad share")
        assert "Save to Files" in toast(page)
        page.click("#tabs [data-tab=navigate]")
        page.click("[data-act=dlKml]")
        page.wait_for_function("window.__shared.length === 1 + %d" % len(EXPECT["days"]))
        page.click("[data-act=dlIcs]")
        page.wait_for_function("window.__shared.length === 2 + %d" % len(EXPECT["days"]))
        assert "BEGIN:VCALENDAR" in page.evaluate("window.__shared[window.__shared.length - 1].text")
        ctx.close()
        print(f"[iPad, share sheet] trip file, {len(EXPECT['days'])} route layers in one sheet, and calendar offered to Save to Files")

        # desktop window: the app hands files to the Save dialog
        ctx = b.new_context(viewport={"width": 1200, "height": 850})
        ctx.add_init_script(f"({DESKTOP_WINDOW})()")
        page = ctx.new_page()
        page.goto((APP_DIR / "index.html").as_uri())
        load_sample(page)
        page.click("[data-act=saveTrip]")
        page.wait_for_function("window.__saved.length === 1")
        same_trip(page.evaluate("window.__saved[0].text"), "desktop window")
        msg = toast(page)
        assert "Documents" in msg, msg
        ctx.close()
        print(f"[computer, desktop window] trip handed to the Save dialog; app says {msg!r}")
        b.close()
    print("Save smoke test passed")


if __name__ == "__main__":
    main()
