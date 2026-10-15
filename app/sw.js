/* Offline cache for the app shell. Live services (routing, weather, place search,
   AI) still need a connection. Bump VERSION when files change. */
const VERSION = "rtp-v0.1.0";
const FILES = ["./", "index.html", "css/style.css", "js/engine.js", "js/services.js", "js/app.js",
  "data/catalog.js", "data/states.js", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-512.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // never cache live API calls
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
