"""Road Trip Planner desktop launcher.

Serves the app folder on this computer only (127.0.0.1) and opens it. With the
optional pywebview package installed it opens in its own window; otherwise it
opens your default browser. Standard library only; Python 3.9 or newer.

    python desktop/roadtrip_desktop.py            # open the app
    python desktop/roadtrip_desktop.py --port 8765 --no-browser
"""
from __future__ import annotations

import argparse
import functools
import http.server
import socket
import socketserver
import sys
import threading
import webbrowser
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1] / "app"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".js": "text/javascript", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml"}

    def log_message(self, *args):  # keep the console readable
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def free_port(preferred: int) -> int:
    for port in (preferred, 0):
        with socket.socket() as s:
            try:
                s.bind(("127.0.0.1", port))
                return s.getsockname()[1]
            except OSError:
                continue
    raise SystemExit("No free local port")


def main() -> int:
    ap = argparse.ArgumentParser(description="Run Road Trip Planner on this computer.")
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--no-browser", action="store_true", help="start the server without opening a window")
    a = ap.parse_args()
    if not (APP_DIR / "index.html").exists():
        raise SystemExit(f"App files not found in {APP_DIR}")

    port = free_port(a.port)
    handler = functools.partial(QuietHandler, directory=str(APP_DIR))
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.ThreadingTCPServer(("127.0.0.1", port), handler)
    url = f"http://127.0.0.1:{port}/index.html"
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    print(f"Road Trip Planner is running at {url}")
    print("Your data stays in this browser on this computer. Press Ctrl+C to stop.")

    try:
        if not a.no_browser:
            try:
                import webview  # optional: pip install pywebview
                webview.create_window("Road Trip Planner", url, width=1200, height=850)
                webview.start()
                return 0
            except ImportError:
                webbrowser.open(url)
        threading.Event().wait()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.shutdown()
    return 0


if __name__ == "__main__":
    sys.exit(main())
