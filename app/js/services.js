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
    return res.map(x => ({ label: x.display_name, lat: +x.lat, lon: +x.lon, state: (x.address && (x.address.state || "")) || "", country: (x.address && x.address.country) || "", cc: (x.address && x.address.country_code) || "" }));
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

  /* Optional AI, with the traveler's own key for one of four providers. The key stays in
     this browser and is sent only to that provider's API address below. Each provider
     was checked on 2026-10-26 to accept calls from a web page (CORS) from the hosted
     app, a downloaded copy, and the desktop launcher. */
  S.AI = {
    anthropic: { label: "Claude (Anthropic)", short: "Claude", model: "claude-sonnet-5-5", host: "api.anthropic.com", signup: "https://platform.claude.com", keyUrl: "https://platform.claude.com/settings/keys", keyPage: "Claude Console API keys page" },
    openai: { label: "ChatGPT (OpenAI)", short: "ChatGPT", model: "gpt-6-astra", host: "api.openai.com", signup: "https://platform.openai.com", keyUrl: "https://platform.openai.com/api-keys", keyPage: "OpenAI API keys page" },
    gemini: { label: "Gemini (Google)", short: "Gemini", model: "gemini-3.8-flash", host: "generativelanguage.googleapis.com", signup: "https://aistudio.google.com", keyUrl: "https://aistudio.google.com/apikey", keyPage: "Google AI Studio API key page" },
    xai: { label: "Grok (xAI)", short: "Grok", model: "grok-4.7", host: "api.x.ai", signup: "https://console.x.ai", keyUrl: "https://console.x.ai/team/default/api-keys", keyPage: "xAI Console API keys page" }
  };
  S.aiProvider = p => S.AI[(p || {}).aiProvider] ? p.aiProvider : "anthropic";
  // Claude keeps the original aiKey and aiModel fields, so profiles saved before other
  // providers existed keep working.
  S.aiKey = p => { const k = S.aiProvider(p); return String((k === "anthropic" ? p.aiKey : (p.aiKeys || {})[k]) || "").trim(); };
  S.aiModel = p => { const k = S.aiProvider(p); return String((k === "anthropic" ? p.aiModel : (p.aiModels || {})[k]) || "").trim() || S.AI[k].model; };
  S.aiReady = p => !!S.aiKey(p || {});
  // "ChatGPT, model gpt-6-astra": stored with every AI item so marks name who wrote it.
  S.aiBy = p => `${S.AI[S.aiProvider(p)].short}, model ${S.aiModel(p)}`;

  const aiFail = async (r, who) => { let m = ""; try { const j = await r.json(); m = (j.error && (j.error.message || j.error)) || j.message || ""; } catch (e) { } throw new Error(`AI request failed (${who}, HTTP ${r.status})${m ? `: ${String(m).slice(0, 160)}` : ""}`); };
  // Send one system and one user message; return the reply text.
  S.aiText = async (profile, sys, user, maxTokens = 8000) => {
    const k = S.aiProvider(profile), key = S.aiKey(profile), model = S.aiModel(profile), who = S.AI[k].short;
    if (!key) throw new Error(`add your ${who} API key in Settings first`);
    let r, data;
    if (k === "anthropic") {
      r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST",
        headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model, max_tokens: maxTokens, system: sys, messages: [{ role: "user", content: user }] }) });
      if (!r.ok) await aiFail(r, who);
      data = await r.json(); return (data.content || []).map(c => c.text || "").join("");
    }
    if (k === "gemini") {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, { method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: sys }] }, contents: [{ role: "user", parts: [{ text: user }] }], generationConfig: { responseMimeType: "application/json" } }) });
      if (!r.ok) await aiFail(r, who);
      data = await r.json(); const c = (data.candidates || [])[0] || {}, text = ((c.content || {}).parts || []).map(x => x.text || "").join("");
      if (!text) throw new Error(`${who} sent no answer${c.finishReason ? ` (finish reason ${c.finishReason})` : ""}; try again`);
      return text;
    }
    // OpenAI and xAI share the Responses API shape.
    const url = k === "openai" ? "https://api.openai.com/v1/responses" : "https://api.x.ai/v1/responses";
    const body = { model, input: [{ role: "system", content: sys }, { role: "user", content: user }] };
    if (k === "openai") body.max_output_tokens = maxTokens * 2; // reasoning models spend part of the budget before they answer
    r = await fetch(url, { method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${key}` }, body: JSON.stringify(body) });
    if (!r.ok) await aiFail(r, who);
    data = await r.json();
    if (typeof data.output_text === "string" && data.output_text) return data.output_text;
    return (data.output || []).filter(o => o.type === "message").flatMap(o => o.content || []).map(c => c.text || "").join("");
  };
  const jsonIn = text => { const a = text.indexOf("{"), b = text.lastIndexOf("}"); if (a < 0 || b <= a) throw new Error("the AI answer had no trip data; try again"); return JSON.parse(text.slice(a, b + 1)); };
  const near = (s, h) => h && h.lat != null && s.lat != null && Math.abs(+s.lat - h.lat) < 0.01 && Math.abs(+s.lon - h.lon) < 0.01;
  const isHome = (s, profile) => /^home$/i.test(s.type || "") || /^home$/i.test(s.name || "") || near(s, profile.home);

  /* AI itinerary. The model returns the app's trip JSON, which is then checked like any
     other plan. Every day and every stop except home is marked AI with who wrote it. */
  S.aiDraft = async (profile, dest, startDate, nights, notes) => {
    const sys = "You are a careful road-trip planner. Return ONLY JSON, no prose. Never invent hours, prices, or closures; put anything unverified in a stop's notes as 'UNVERIFIED'.";
    const want = `Plan a ${nights}-night self-drive road trip starting ${startDate} for ${profile.party} traveler(s).
Home: ${profile.home.label} (${profile.home.lat}, ${profile.home.lon}).
Destination focus: ${dest ? dest.name + " (" + dest.states.join(", ") + ")" : "your best match for the interests"}.
Interests: ${profile.interests.join(", ")}. Max driving ${profile.rules.maxDriveHours} h/day. Walks under ${profile.rules.walkMiles} mi.
Budget cap $${profile.rules.budgetCap}. Lodging brand: ${profile.lodging.brand}. Hotel check-in near ${profile.rules.checkinTarget}. Diet: ${profile.dining.diet}. At most ${profile.dining.upscaleDinners} upscale dinner(s); lunches under $${profile.dining.lunchCap}.
Extra notes: ${notes || "none"}.
JSON shape: {"name": str, "states": [two-letter codes], "days": [{"date": "YYYY-MM-DD", "title": str, "stops": [{"name": str, "address": str (full street address when one exists), "lat": number, "lon": number, "type": str, "arrive": "HH:MM" or "", "depart": "HH:MM" or "", "checkin": bool, "notes": str}]}]}.
Each day's first stop is where the day starts (home or last night's hotel); the last stop is where it ends. Day 1 starts at home and the last day ends at home.`;
    const json = jsonIn(await S.aiText(profile, sys, want));
    if (!Array.isArray(json.days) || !json.days.length) throw new Error("the AI answer had no days; try again");
    const by = S.aiBy(profile);
    // Only web addresses are kept as booking links.
    json.days.forEach(d => { d.ai = true; d.stops = (d.stops || []).map(s => RT.mkStop(s.name, s.address, s.lat ?? null, s.lon ?? null, { ...s, booking_url: /^https?:\/\//i.test(s.booking_url || "") ? s.booking_url : "", ai: !isHome(s, profile), aiBy: by })); });
    json.createdBy = "ai"; json.aiBy = by; json.aiMarked = true; json.destId = dest ? dest.id : null;
    return json;
  };

  /* AI ideas for Make my trip unique: up to six real places near `at` ([lat, lon]) that
     fit the interview answers. Places without a usable location are dropped. */
  S.aiUnique = async (profile, answers, place) => {
    const Q = RT.UNIQUE_QUESTIONS, pick = (id, k) => ((Q.find(q => q.id === id) || {}).options || RT.UNIQUE_REACH.plan.concat(RT.UNIQUE_REACH.trip)).find(o => o[0] === k);
    const stand = (answers.standout || []).map(k => (pick("standout", k) || [k, k])[1]).join("; ") || "no preference";
    const sys = "You suggest real, one-of-a-kind places for road trips in the United States. Return ONLY JSON, no prose. Suggest only places that exist and are open to visitors, reachable by car. Never invent hours or prices.";
    const want = `Suggest up to 6 unusual or lesser-known places ${place.where}.
The traveler wants: ${stand}. How unusual: ${(pick("unusual", answers.unusual) || ["", answers.unusual])[1]}. Effort: ${(pick("effort", answers.effort) || ["", answers.effort])[1]}; walks under ${profile.rules.walkMiles} mi.
Interests: ${profile.interests.join(", ")}. Their own words: ${answers.notes || "none"}.
Leave out these places, already planned or listed: ${(place.skip || []).slice(0, 40).join("; ") || "none"}.
JSON shape: {"places": [{"name": str, "address": str (street address with town and two-letter state), "lat": number, "lon": number, "minutes": number (time to spend), "why": str (one sentence, what makes it unique)}]}.`;
    const json = jsonIn(await S.aiText(profile, sys, want, 3000));
    const by = S.aiBy(profile);
    return (json.places || []).filter(x => x && typeof x.name === "string" && x.name.trim() && Number.isFinite(+x.lat) && Number.isFinite(+x.lon) && x.lat !== null && x.lon !== null && x.lat !== "" && x.lon !== "")
      .slice(0, 6).map((x, i) => ({ id: `ai:${i}:${x.name}`, kind: "place", source: "ai", ai: true, aiBy: by, name: x.name.trim(), address: String(x.address || x.name), lat: +x.lat, lon: +x.lon, minutes: Math.min(480, Math.max(15, Math.round(+x.minutes) || 60)), tags: [], why: [String(x.why || "suggested by the AI")], note: `AI suggestion (${by}): ${String(x.why || "").slice(0, 200)} UNVERIFIED: check that it exists, its hours, and access before you go.` }));
  };
})();
