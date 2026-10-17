/* Live services. All are free and called directly from the browser:
   OpenStreetMap Nominatim (place search), OSRM (routing), National Weather Service
   (forecasts, alerts, time zones), and optionally the Anthropic API with the
   user's own key. Each call fails soft so the app keeps working offline. */
(function () {
  const RT = (window.RT = window.RT || {});
  const S = (RT.services = {});
  const settings = () => RT.state?.profile || {};

  async function getJSON(url, opts = {}, timeoutMs = 20000) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeoutMs);
    try { const r = await fetch(url, { ...opts, signal: ctl.signal }); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); }
    finally { clearTimeout(t); }
  }

  // Nominatim usage policy: at most 1 request per second, identify the application.
  let lastGeo = 0;
  const throttle = async () => { const wait = 1100 - (Date.now() - lastGeo); if (wait > 0) await new Promise(r => setTimeout(r, wait)); lastGeo = Date.now(); };
  S.geocode = async (q, world = false) => {
    await throttle();
    const email = settings().contactEmail ? `&email=${encodeURIComponent(settings().contactEmail)}` : "";
    const res = await getJSON(`https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1${world ? "" : "&countrycodes=us"}&limit=5&q=${encodeURIComponent(q)}${email}`);
    return res.map(x => ({ label: x.display_name, lat: +x.lat, lon: +x.lon, state: (x.address && (x.address.state || "")) || "", country: (x.address && x.address.country) || "" }));
  };

  // Name the town at a point (used once after "Use my location"; nothing else leaves the device).
  S.reverse = async (lat, lon) => {
    await throttle();
    const email = settings().contactEmail ? `&email=${encodeURIComponent(settings().contactEmail)}` : "";
    const x = await getJSON(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&lat=${(+lat).toFixed(5)}&lon=${(+lon).toFixed(5)}${email}`);
    const a = x.address || {};
    const town = a.city || a.town || a.village || a.municipality || a.county || "";
    const abbr = window.RT_STATE_BY_NAME && a.state && RT_STATE_BY_NAME[a.state.toLowerCase()];
    return { label: [town, abbr ? abbr.abbr : a.state].filter(Boolean).join(", ") || x.display_name || "Your location", lat: +lat, lon: +lon, state: a.state || "" };
  };
  // The browser's own location (asks permission; nothing is sent anywhere).
  S.myPosition = () => new Promise((ok, no) => {
    if (!navigator.geolocation) { no(new Error("this browser cannot share its location")); return; }
    navigator.geolocation.getCurrentPosition(p => ok({ lat: p.coords.latitude, lon: p.coords.longitude }), e => no(new Error(e.code === 1 ? "location permission was turned down" : "location is not available right now")), { timeout: 12000, maximumAge: 600000 });
  });

  S.osrmBase = () => (settings().osrmUrl || "https://router.project-osrm.org").replace(/\/$/, "");
  S.routeDay = async (day) => {
    const pts = day.stops.filter(s => s.lat !== "" && s.lat != null && s.lon !== "" && s.lon != null);
    if (pts.length !== day.stops.length || pts.length < 2) throw new Error("every stop needs coordinates");
    const coords = pts.map(s => `${(+s.lon).toFixed(5)},${(+s.lat).toFixed(5)}`).join(";");
    const d = await getJSON(`${S.osrmBase()}/route/v1/driving/${coords}?overview=full&geometries=geojson`, {}, 30000);
    if (d.code !== "Ok") throw new Error(d.code || "routing failed");
    const rt = d.routes[0];
    return { legs: rt.legs.map(l => ({ seconds: l.duration, meters: l.distance })), geometry: rt.geometry.coordinates };
  };

  const NWS = "https://api.weather.gov";
  S.nwsPoint = async (lat, lon) => {
    const p = await getJSON(`${NWS}/points/${(+lat).toFixed(4)},${(+lon).toFixed(4)}`, { headers: { Accept: "application/geo+json" } });
    return p.properties;
  };
  S.weatherFor = async (lat, lon, iso) => {
    const p = await S.nwsPoint(lat, lon);
    const [fc, al] = await Promise.all([
      getJSON(p.forecast, { headers: { Accept: "application/geo+json" } }),
      getJSON(`${NWS}/alerts/active?point=${(+lat).toFixed(4)},${(+lon).toFixed(4)}`, { headers: { Accept: "application/geo+json" } })]);
    const periods = fc.properties.periods.filter(x => x.startTime.slice(0, 10) === iso);
    return {
      tz: p.timeZone,
      forecast: periods.length ? periods.map(x => `${x.name}: ${x.temperature}°${x.temperatureUnit}, ${x.shortForecast}`) : ["Not yet available (NWS forecasts reach about 7 days ahead)"],
      alerts: al.features.map(f => f.properties.headline),
      page: `https://forecast.weather.gov/MapClick.php?lat=${(+lat).toFixed(4)}&lon=${(+lon).toFixed(4)}`
    };
  };
  S.forecastPage = (lat, lon) => `https://forecast.weather.gov/MapClick.php?lat=${(+lat).toFixed(4)}&lon=${(+lon).toFixed(4)}`;

  /* Optional AI itinerary. The key stays in this browser only and is sent only to
     api.anthropic.com. The model returns the app's trip JSON, which is then checked
     like any other plan. */
  S.aiDraft = async (profile, dest, startDate, nights, notes) => {
    if (!profile.aiKey) throw new Error("add your Anthropic API key in Settings first");
    const sys = "You are a careful road-trip planner. Return ONLY JSON, no prose. Never invent hours, prices, or closures; put anything unverified in a stop's notes as 'UNVERIFIED'.";
    const want = `Plan a ${nights}-night self-drive road trip starting ${startDate} for ${profile.party} traveler(s).
Home: ${profile.home.label} (${profile.home.lat}, ${profile.home.lon}).
Destination focus: ${dest ? dest.name + " (" + dest.states.join(", ") + ")" : "your best match for the interests"}.
Interests: ${profile.interests.join(", ")}. Max driving ${profile.rules.maxDriveHours} h/day. Walks under ${profile.rules.walkMiles} mi.
Budget cap $${profile.rules.budgetCap}. Lodging brand: ${profile.lodging.brand}. Hotel check-in near ${profile.rules.checkinTarget}. Diet: ${profile.dining.diet}. At most ${profile.dining.upscaleDinners} upscale dinner(s); lunches under $${profile.dining.lunchCap}.
Extra notes: ${notes || "none"}.
JSON shape: {"name": str, "states": [two-letter codes], "days": [{"date": "YYYY-MM-DD", "title": str, "stops": [{"name": str, "address": str (full street address when one exists), "lat": number, "lon": number, "type": str, "arrive": "HH:MM" or "", "depart": "HH:MM" or "", "checkin": bool, "notes": str}]}]}.
Each day's first stop is where the day starts (home or last night's hotel); the last stop is where it ends. Day 1 starts at home and the last day ends at home.`;
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": profile.aiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({ model: profile.aiModel || "claude-sonnet-5-5", max_tokens: 8000, system: sys, messages: [{ role: "user", content: want }] })
    });
    if (!r.ok) throw new Error(`AI request failed: HTTP ${r.status}`);
    const data = await r.json();
    const text = data.content.map(c => c.text || "").join("");
    const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    json.days.forEach(d => d.stops = d.stops.map(s => RT.mkStop(s.name, s.address, s.lat ?? null, s.lon ?? null, s)));
    json.createdBy = "ai"; json.destId = dest ? dest.id : null;
    return json;
  };
})();
