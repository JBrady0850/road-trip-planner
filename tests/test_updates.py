"""Releases reach people at once. GitHub Pages lets a browser keep a downloaded file
for 10 minutes (Cache-Control: max-age=600), so the offline worker must ask the server
for the newest copy instead of taking the browser's stored one. Without that, a reload
right after a release can run the older app."""
import functools
import http.server
import os
import shutil
import threading
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

APP = Path(__file__).resolve().parents[1] / "app"


class PagesLike(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "max-age=600")  # what GitHub Pages sends
        super().end_headers()

    def log_message(self, *args):
        pass


@pytest.fixture()
def site(tmp_path):
    root = tmp_path / "app"
    shutil.copytree(APP, root)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(PagesLike, directory=str(root)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield root, f"http://127.0.0.1:{srv.server_address[1]}/"
    srv.shutdown()


def test_a_reload_after_a_release_runs_the_new_app(site):
    root, url = site
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context()
        page = ctx.new_page()
        page.goto(url)
        page.wait_for_function("navigator.serviceWorker.controller !== null || (location.reload(), false)", timeout=15000)
        page.wait_for_function("navigator.serviceWorker.controller !== null", timeout=15000)
        old = page.inner_text("#ver")
        app_js = root / "js" / "app.js"
        app_js.write_text(app_js.read_text(encoding="utf-8").replace(f'APP_VERSION = "{old}"', 'APP_VERSION = "9.9.9"'), encoding="utf-8")
        # Last-Modified has one-second resolution and the new text is the same length,
        # so an edit in the same second would look unchanged to the server (a 304).
        # A real release is a later commit; make the test file's date say so.
        later = app_js.stat().st_mtime + 30
        os.utime(app_js, (later, later))
        # A person opens the app again after the release: a fresh tab in the same browser
        # profile, which still holds the old worker and the old stored files.
        again = ctx.new_page()
        again.goto(url)
        again.wait_for_function("document.querySelector('#ver') && document.querySelector('#ver').textContent !== ''", timeout=15000)
        assert again.inner_text("#ver") == "9.9.9", "the next visit ran a stored copy of the old app"
        b.close()
