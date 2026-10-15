"""Tablet check: the hosted app as an iPad and an Android tablet would load it.

Serves app/ from a stand-in web address, then checks the install banner, the
per-device steps, the Settings card, the manifest, and the icons.
Run: python tests/tablet_smoke.py [screenshot_dir]
"""
import json
import mimetypes
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
APP_DIR = ROOT / "app"
HOST = "https://rtp.test/road-trip-planner/"
SHOTS = Path(sys.argv[1]) if len(sys.argv) > 1 else None
mimetypes.add_type("application/manifest+json", ".webmanifest")

DEVICES = {
    "ipad": {"ua": "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
             "vp": {"width": 834, "height": 1194}, "expect": "Add to Home Screen", "browser": "Safari"},
    "ipad-desktop-mode": {"ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
                          "vp": {"width": 1024, "height": 1366}, "expect": "Add to Home Screen", "browser": "Safari", "ipados": True},
    "android": {"ua": "Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                "vp": {"width": 800, "height": 1280}, "expect": "Install app", "browser": "Chrome"},
}


def serve(route):
    path = route.request.url.split(HOST, 1)[1].split("?")[0] or "index.html"
    f = APP_DIR / path
    if not f.is_file():
        route.fulfill(status=404, body="not found")
        return
    route.fulfill(body=f.read_bytes(), content_type=mimetypes.guess_type(f.name)[0] or "application/octet-stream")


def main():
    errors = []
    manifest = json.loads((APP_DIR / "manifest.webmanifest").read_text())
    sizes = {i["sizes"] for i in manifest["icons"] if i["type"] == "image/png"}
    assert {"192x192", "512x512"} <= sizes, "Android needs 192 and 512 PNG icons"
    assert any(i.get("purpose") == "maskable" for i in manifest["icons"]), "Android needs a maskable icon"
    for i in manifest["icons"]:
        assert (APP_DIR / i["src"]).is_file(), f"missing icon {i['src']}"
    sw = (APP_DIR / "sw.js").read_text()
    for name in [i["src"] for i in manifest["icons"]] + ["qr-app.png"]:
        assert f'"{name}"' in sw, f"sw.js does not cache {name}"
    print(f"manifest ok: {manifest['display']}, icons {sorted(sizes)} + maskable")

    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, dv in DEVICES.items():
            ctx = b.new_context(viewport=dv["vp"], user_agent=dv["ua"], has_touch=True, is_mobile=True,
                                service_workers="block")
            if dv.get("ipados"):  # iPadOS Safari reports a Mac by default; touch points give it away
                ctx.add_init_script("Object.defineProperty(navigator, 'maxTouchPoints', {get: () => 5}); Object.defineProperty(navigator, 'platform', {get: () => 'MacIntel'});")
            page = ctx.new_page()
            page.on("pageerror", lambda e, n=name: errors.append(f"{n} pageerror: {e}"))
            page.on("console", lambda m, n=name: m.type == "error" and errors.append(f"{n} console: {m.text}"))
            page.route("https://rtp.test/**", serve)
            page.goto(HOST)
            page.evaluate("localStorage.clear()")
            page.reload()

            if name == "android":  # Chrome offers its own install prompt; the banner turns it into a button
                page.evaluate("""() => { const e = new Event('beforeinstallprompt'); e.prompt = () => { window.__prompted = true; };
                                 e.userChoice = Promise.resolve({outcome: 'accepted'}); window.dispatchEvent(e); }""")
            banner = page.locator("#install")
            banner.wait_for(state="visible")
            text = banner.inner_text()
            assert dv["expect"] in text, f"{name}: banner should mention {dv['expect']!r}: {text!r}"
            if name != "android":
                assert dv["browser"] in text
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-banner.png"))

            if name == "android":
                page.click("#install [data-act=install]")
                assert page.evaluate("window.__prompted === true"), "Install button should open Chrome's prompt"
                # after the prompt, Chrome's own menu steps remain
                assert "three dots" in banner.inner_text()

            page.click("#tabs [data-tab=settings]")
            card = page.locator(".card:has-text('Use on a tablet or phone')")
            ctext = card.inner_text()
            assert HOST in ctext, f"{name}: Settings should show this web address"
            assert page.locator(".card .qr").count() == 0, "QR is for the public address only"
            if SHOTS: page.screenshot(path=str(SHOTS / f"{name}-settings.png"), full_page=True)

            page.click("#install [data-act=hideInstall]")
            assert banner.is_hidden()
            page.reload()
            assert banner.is_hidden(), "Not now should be remembered"
            overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            assert overflow <= 0, f"{name}: page scrolls sideways by {overflow}px"
            print(f"[{name}] banner ok ({dv['expect']}), settings shows address, Not now remembered, no sideways scroll")
            ctx.close()

        # a computer opening the downloaded copy sees the public address and QR code in Settings
        ctx = b.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append(f"file pageerror: {e}"))
        page.goto((APP_DIR / "index.html").as_uri())
        assert page.locator("#install").is_hidden(), "no banner on a computer"
        page.click("#tabs [data-tab=settings]")
        assert "https://jbrady0850.github.io/road-trip-planner/" in page.inner_text("main")
        page.wait_for_function("document.querySelector('.card .qr') && document.querySelector('.card .qr').naturalWidth > 0")
        print("[computer] Settings shows the public address and QR code")
        ctx.close()
        b.close()
    if errors:
        print("ERRORS:\n" + "\n".join(errors))
        sys.exit(1)
    print("Tablet smoke test passed")


if __name__ == "__main__":
    main()
