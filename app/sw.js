/* Offline support for the app shell. Files come from the network first, so a
   connected device always gets the newest version; the cached copy is used only
   when offline. Live services (routing, weather, place search, AI) still need a
   connection and are never cached. Bump VERSION when the file list changes. */
const VERSION = "rtp-v0.4.1";
const FILES = ["./", "index.html", "css/style.css", "js/engine.js", "js/services.js", "js/app.js",
  "data/catalog.js", "data/states.js", "manifest.webmanifest", "icon.svg", "icon-180.png",
  "icon-192.png", "icon-512.png", "icon-maskable-512.png", "qr-app.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // never touch live API calls
  e.respondWith(fetch(e.request).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match("index.html"))));
});
