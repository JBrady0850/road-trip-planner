/* Trip engine (no network). Mirrors the Python package in roadtrip/:
   destination scoring, itinerary drafting, plan checker, navigation links,
   sunset, stop list, iCalendar, KML, CSV, and budget. */
(function () {
  const RT = (window.RT = window.RT || {});

  // ---------- helpers ----------
  const toMin = t => { if (!t) return null; const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const fromMin = m => { m = Math.round(m); const h = Math.floor(m / 60) % 24, mm = ((m % 60) + 60) % 60; return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; };
  const hm12 = t => { if (!t) return ""; let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "p.m." : "a.m."; h = h % 12 || 12; return `${h}:${String(m).padStart(2, "0")} ${ap}`; };
  const haversineMi = (a, b) => { const R = 3958.8, r = x => x * Math.PI / 180; const dLat = r(b[0] - a[0]), dLon = r(b[1] - a[1]); const s = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(s)); };
  // Road distance is typically about 1.2 times straight-line; about 58 mph average
  // across interstates and slower roads. Check drive times replaces this with routed times.
  const estDriveHours = (a, b) => haversineMi(a, b) * 1.2 / 58;
  const dayLabel = iso => { const d = new Date(iso + "T12:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
  const addDays = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  RT.util = { toMin, fromMin, hm12, haversineMi, estDriveHours, dayLabel, addDays };

  // ---------- default profile ----------
  RT.defaultProfile = () => ({
    traveler: "", home: { label: "", lat: null, lon: null, state: "" }, party: 2,
    vehicle: { mpg: 25, heightIn: 0, fuelPrice: 3.25 },
    rules: { maxDriveHours: 7, budgetCap: 1500, walkMiles: 5, nightsMin: 3, nightsMax: 7, checkinTarget: "15:00", checkinWindow: 60, ticketMargin: 30, arriveBeforeSunset: true, startTime: "08:30", stopsPerDay: 3, pace: "balanced" },
    lodging: { brand: "Any", nightlyLow: 120, nightlyHigh: 180, freeBreakfast: true, comfort: "mid" },
    dining: { diet: "No restriction", upscaleDinners: 1, lunchCap: 30, foodPerDay: 55 },
    interests: ["scenic", "parks", "food"], months: [], flyOk: false, visited: [], destState: "", destCity: "", destPlace: null, cruise: { on: false, portId: "", typed: "", place: null, date: "", arrive: "08:00", depart: "17:00", buffer: 30, line: "" }, aiKey: "", aiModel: "claude-sonnet-5-5",
    // Other AI providers: an empty model uses that provider's default in js/services.js.
    aiProvider: "anthropic", aiKeys: { openai: "", gemini: "", xai: "" }, aiModels: { openai: "", gemini: "", xai: "" }
  });

  // ---------- presets ----------
  // A pace sets every driving and timing rule at once; a comfort level sets every
  // money field at once. The individual fields stay editable afterwards.
  RT.PACE = {
    relaxed: { label: "Relaxed", blurb: "Short drives, two stops a day, early check-in", maxDriveHours: 5, startTime: "09:00", checkinTarget: "14:00", checkinWindow: 90, walkMiles: 3, stopsPerDay: 2 },
    balanced: { label: "Balanced", blurb: "Up to 7 hours of driving, three stops a day", maxDriveHours: 7, startTime: "08:30", checkinTarget: "15:00", checkinWindow: 60, walkMiles: 5, stopsPerDay: 3 },
    ground: { label: "Cover ground", blurb: "Long days, four stops, late check-in", maxDriveHours: 9, startTime: "07:30", checkinTarget: "17:00", checkinWindow: 60, walkMiles: 5, stopsPerDay: 4 }
  };
  RT.COMFORT = {
    economy: { label: "Economy", blurb: "Budget hotels, casual meals", nightlyLow: 80, nightlyHigh: 120, foodPerDay: 40, lunchCap: 20, upscaleDinners: 0 },
    mid: { label: "Mid-range", blurb: "Standard hotels, one nice dinner", nightlyLow: 120, nightlyHigh: 180, foodPerDay: 55, lunchCap: 30, upscaleDinners: 1 },
    comfort: { label: "Comfort", blurb: "Upscale hotels, good restaurants", nightlyLow: 180, nightlyHigh: 280, foodPerDay: 80, lunchCap: 45, upscaleDinners: 2 }
  };
  RT.applyPace = (profile, key) => { const p = RT.PACE[key]; if (!p) return false; const r = profile.rules; r.pace = key; ["maxDriveHours", "startTime", "checkinTarget", "checkinWindow", "walkMiles", "stopsPerDay"].forEach(k => r[k] = p[k]); return true; };
  // The budget cap is rebuilt from the comfort level and the trip length, rounded to $50.
  RT.suggestCap = (profile, nights) => { const L = profile.lodging, D = profile.dining, n = Math.max(1, nights || 4); const est = n * L.nightlyHigh + (n + 1) * (D.foodPerDay + 25) + 180; return Math.ceil(est * 1.1 / 50) * 50; };
  RT.applyComfort = (profile, key, nights) => { const c = RT.COMFORT[key]; if (!c) return false; const L = profile.lodging, D = profile.dining; L.comfort = key; L.nightlyLow = c.nightlyLow; L.nightlyHigh = c.nightlyHigh; D.foodPerDay = c.foodPerDay; D.lunchCap = c.lunchCap; D.upscaleDinners = c.upscaleDinners; profile.rules.budgetCap = RT.suggestCap(profile, nights); return true; };

  // ---------- interests ----------
  // Each key is a tag on catalog places (docs/CATALOG.md). Keys never change once
  // published, so saved profiles keep their picks; labels may widen.
  RT.INTEREST_GROUPS = [
    ["Outdoors and nature", [["scenic", "Scenic drives, overlooks, and photo spots"], ["parks", "National and state parks"], ["hiking", "Hiking and nature trails"], ["waterfalls", "Waterfalls"], ["caves", "Caves"], ["wildlife", "Wildlife viewing and birding"], ["gardens", "Botanical gardens and nature centers"], ["camping", "Camping and RV parks"], ["golf", "Golf and disc golf"]]],
    ["Coast and water", [["beach", "Beaches"], ["lighthouses", "Lighthouses"], ["water", "Kayak, boat, and water sports"], ["fishing", "Fishing: lakes, rivers, streams, and piers"]]],
    ["Culture and entertainment", [["history", "History, museums, and historic sites"], ["town", "Small towns and shopping"], ["food", "Food and local dining"], ["music", "Live music and performing arts"], ["drinks", "Breweries, wineries, and distilleries"], ["art", "Art galleries and craft markets"], ["themeparks", "Theme parks and attractions"]]],
    ["Family and relaxation", [["family", "Family-friendly attractions"], ["spa", "Spas, hot springs, and wellness"], ["markets", "Farmers markets and orchards"], ["lights", "Festivals, fairs, and holiday lights"]]]
  ];
  RT.INTERESTS = RT.INTEREST_GROUPS.flatMap(g => g[1]);

  // ---------- destination scoring ----------
  const INTEREST_NAMES = { scenic: "scenic drives and views", parks: "parks", waterfalls: "waterfalls", beach: "beaches", fishing: "fishing", water: "water sports", history: "history and historic sites", food: "food", lights: "festivals and holiday lights", hiking: "hiking and nature trails", caves: "caves", town: "small towns", lighthouses: "lighthouses", wildlife: "wildlife and birding", gardens: "gardens and nature centers", camping: "camping and RV parks", golf: "golf and disc golf", music: "live music and shows", drinks: "breweries, wineries, and distilleries", art: "art and crafts", themeparks: "theme parks and attractions", family: "family attractions", spa: "spas and hot springs", markets: "farmers markets and orchards" };
  RT.interestName = k => INTEREST_NAMES[k] || k;
  const hoursText = h => h < 0.75 ? "under an hour" : h < 1.5 ? "about 1 hour" : `about ${Math.round(h)} hours`;
  /* Rank catalog destinations for a profile. `nights` is the trip being planned
     (falls back to the profile's longest trip); `state` limits the list to one
     state's cities. Each result carries a rank, the base city, a plain-word label,
     reasons with the strongest first, and the stops ordered by interest match. */
  RT.scoreDestinations = (profile, catalog, month, nights, state) => {
    const home = profile.home.lat != null ? [profile.home.lat, profile.home.lon] : null;
    const visited = new Set(profile.visited || []);
    const span = nights || profile.rules.nightsMax || 7;
    const list = state ? catalog.filter(d => d.states.includes(state)) : catalog;
    const out = list.map(d => {
      const reasons = [];
      let score = 0, far = false, off = false, flight = false;
      const hit = d.tags.filter(t => profile.interests.includes(t));
      score += hit.length * 12;
      const stopsRanked = d.stops.map(s => ({ name: s[0], hits: s[5].filter(t => profile.interests.includes(t)).length, tags: s[5] })).sort((a, b) => b.hits - a.hits);
      const stopHits = stopsRanked.reduce((n, s) => n + s.hits, 0);
      score += Math.min(stopHits, 8) * 2;
      if (hit.length) reasons.push(`good for ${hit.map(RT.interestName).join(", ")}`);
      // A trip with nothing the traveler picked should not outrank one that has it,
      // however close or new it is.
      const none = !hit.length && !stopHits;
      if (none) score -= 25;
      if (month) {
        if (d.months.includes(month)) { score += 15; reasons.push("in season"); }
        else { score -= 30; off = true; reasons.push("usually out of season that month"); }
      }
      const newStates = d.states.filter(s => !visited.has(s));
      score += newStates.length * 6;
      if (newStates.length) reasons.push(`new state${newStates.length > 1 ? "s" : ""}: ${newStates.join(", ")}`);
      let driveH = null;
      if (d.fly) {
        flight = true;
        if (!profile.flyOk) { score -= 100; reasons.unshift("needs a flight"); } else reasons.push("fly and drive");
      } else if (home) {
        driveH = estDriveHours(home, [d.base[1], d.base[2]]);
        const days = Math.ceil(driveH / profile.rules.maxDriveHours);
        if (days > Math.max(1, Math.floor(span / 2))) { score -= 40; far = true; reasons.unshift(`${hoursText(driveH)} from home, too far for ${span} nights`); }
        else { score += Math.max(0, 20 - driveH * 1.5); reasons.push(`${hoursText(driveH)} from home`); }
      }
      if (none) reasons.push("none of your interests here");
      score = Math.round(score);
      const label = flight && !profile.flyOk ? "Needs a flight" : far ? "Far for this trip" : off ? "Out of season" : score >= 50 ? "Great fit" : score >= 30 ? "Good fit" : "Possible";
      return { dest: d, city: d.base[0], score, driveH, reasons, label, stopsRanked };
    }).sort((a, b) => b.score - a.score);
    out.forEach((r, i) => r.rank = i + 1);
    return out;
  };

  // ---------- a town the traveler names ----------
  const cityKey = s => String(s || "").toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim().replace(/\bsaint\b/g, "st").replace(/\bmount\b/g, "mt");
  /* Split typed text into a town and a two-letter state: "Gatlinburg", "Gatlinburg, TN",
     "Gatlinburg TN", or "Gatlinburg, Tennessee". The state part is "" when absent. */
  const stateAbbr = s => { const k = cityKey(s); if (!k) return ""; const by = window.RT_STATE_BY_NAME || {}, ab = window.RT_STATE_BY_ABBR || {};
    return by[k] ? cityKey(by[k].abbr) : ab[k.toUpperCase()] ? k : null; };
  RT.splitTown = text => {
    const raw = String(text || "").trim();
    if (raw.includes(",")) { const i = raw.lastIndexOf(","); const s = stateAbbr(raw.slice(i + 1)); return [cityKey(raw.slice(0, i)), s || ""]; }
    const w = cityKey(raw).split(" ");
    for (const n of [2, 1]) { if (w.length > n) { const s = stateAbbr(w.slice(-n).join(" ")); if (s) return [w.slice(0, -n).join(" "), s]; } }
    return [cityKey(raw), ""];
  };
  /* The catalog trip based in the typed town, or null. With a state picked, a trip that
     includes that state wins a tie. */
  RT.matchCatalogCity = (text, catalog, state) => {
    const [c, s] = RT.splitTown(text);
    if (!c) return null;
    const hits = catalog.filter(d => { const [bc, bs] = d.base[0].split(",").map(cityKey); return bc === c && (!s || bs === s); });
    return hits.find(d => !state || d.states.includes(state)) || hits[0] || null;
  };
  /* A trip based in any town: every catalog place within about an hour's drive (the
     estimate, so mountain roads can take longer). `place` is {label, lat, lon, abbr}.
     States come from the places' addresses; seasons and "Only here" ideas come from
     the catalog trips those places belong to. */
  RT.CITY_REACH_H = 1;
  RT.cityDestination = (place, catalog) => {
    const at = [place.lat, place.lon], seen = new Set(), stops = [], from = new Map();
    catalog.filter(d => !d.fly).forEach(d => d.stops.forEach(s => {
      if (seen.has(s[0]) || estDriveHours(at, [s[2], s[3]]) > RT.CITY_REACH_H) return;
      seen.add(s[0]); stops.push(s); from.set(d.id, d);
    }));
    const src = [...from.values()], abbr = /^[A-Z]{2}$/.test(place.abbr || "") ? place.abbr : "";
    const months = [...new Set(src.flatMap(d => d.months))].sort((a, b) => a - b);
    return {
      id: "city:" + cityKey(place.label).replace(/[^a-z0-9]+/g, "-"), name: place.label, city: true,
      states: [...new Set([abbr, ...stops.map(s => (String(s[1]).match(/,\s*([A-Z]{2})$/) || [])[1])].filter(Boolean))],
      base: [place.label, place.lat, place.lon], months: months.length ? months : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      tags: [...new Set(stops.flatMap(s => s[5]))], stops, nearIds: src.map(d => d.id),
      experiences: src.flatMap(d => d.experiences || []).slice(0, 3)
    };
  };
  /* Rank with the traveler's own pick (a catalog trip or a town) first, marked
     `pick`, and every other trip ranked after it from #1. */
  /* A state with fewer than RT.MIN_RECS catalog trips gets the nearest drive-to trips
     from other states after its own, marked `near`, so there are always at least that
     many to choose from. Nearest means the shortest estimated drive from any of the
     state's own trip bases (or the traveler's town). */
  RT.MIN_RECS = 5;
  const stateName = ab => ((window.RT_STATE_BY_ABBR || {})[ab] || {}).name || ab;
  RT.stateName = stateName;
  const addNearby = (profile, catalog, month, nights, state, pick, rest) => {
    const need = RT.MIN_RECS - rest.length; if (need <= 0) return rest;
    // Alaska and Hawaii: every trip there is fly-and-drive, so no drive-to trip is near.
    if (rest.length && rest.every(r => r.dest.fly)) return rest;
    const anchors = rest.map(r => r.dest.base); if (pick) anchors.unshift(pick.base);
    const taken = new Set(rest.map(r => r.dest.id).concat(pick ? [pick.id] : []));
    const near = catalog.filter(d => !taken.has(d.id) && !d.fly && !d.states.includes(state)).map(d => {
      let h = Infinity, from = "";
      anchors.forEach(a => { const x = estDriveHours([a[1], a[2]], [d.base[1], d.base[2]]); if (x < h) { h = x; from = a[0]; } });
      return { d, h, from };
    }).sort((a, b) => a.h - b.h).slice(0, need + 3);
    const add = RT.scoreDestinations(profile, near.map(x => x.d), month, nights, "").slice(0, need);
    add.forEach(r => { const x = near.find(n => n.d.id === r.dest.id); r.near = state; r.reasons.unshift(`near ${stateName(state)}: ${hoursText(x.h)} from ${x.from}`); });
    const out = rest.concat(add); out.forEach((r, i) => r.rank = i + 1);
    return out;
  };
  RT.rankWithPick = (profile, catalog, month, nights, state, pick) => {
    let rest = RT.scoreDestinations(profile, pick ? catalog.filter(d => d.id !== pick.id) : catalog, month, nights, state);
    if (state) rest = addNearby(profile, catalog, month, nights, state, pick, rest);
    if (!pick) return rest;
    const p = RT.scoreDestinations(profile, [pick], month, nights, "")[0];
    p.pick = true; p.rank = 0;
    if (pick.city) p.reasons.unshift(pick.stops.length ? `${pick.stops.length} catalog places within about an hour's drive` : "no catalog places within an hour yet: add your own stops on the Itinerary page");
    return [p, ...rest];
  };

  // ---------- itinerary drafting ----------
  // `ai` is set only on stops the AI model wrote with the traveler's key; `aiBy` names
  // the provider and model.
  const mkStop = (name, address, lat, lon, extra = {}) => ({ name, address, lat, lon, type: extra.type || "Stop", arrive: extra.arrive || "", depart: extra.depart || "", checkin: !!extra.checkin, timed_entry: extra.timed_entry || "", booking_url: extra.booking_url || "", notes: extra.notes || "", minutes: extra.minutes || 0, state: extra.state || "", ...(extra.ai ? { ai: true, ...(extra.aiBy ? { aiBy: extra.aiBy } : {}) } : {}) });
  RT.mkStop = mkStop;

  // Order stops by nearest neighbor starting from a point.
  const nearestOrder = (start, items) => { const left = items.slice(), out = []; let cur = start; while (left.length) { let bi = 0, bd = Infinity; left.forEach((s, i) => { const d = haversineMi(cur, [s[2], s[3]]); if (d < bd) { bd = d; bi = i; } }); const nx = left.splice(bi, 1)[0]; out.push(nx); cur = [nx[2], nx[3]]; } return out; };

  /* Draft a trip: drive days to and from the base, then sightseeing days that fill
     with catalog stops until the day's time runs out, with check-in near the target. */
  const typeOf = s => s[5][0] ? s[5][0][0].toUpperCase() + s[5][0].slice(1) : "Stop";
  const matchesProfile = (profile, s) => s[5].some(t => profile.interests.includes(t));
  // Places that match the picked interests come first, each group in nearest-neighbor
  // order from the base, so a nearby place with none of the interests never takes the
  // slot of a place that has them.
  const orderForProfile = (profile, from, stops) => nearestOrder(from, stops.filter(s => matchesProfile(profile, s))).concat(nearestOrder(from, stops.filter(s => !matchesProfile(profile, s))));
  /* Add stops from `pool` after `from` while the day has time and driving left. The
     first place in priority order that still fits is taken; one that does not fit
     waits for a later day instead of ending this one. Pool entries are catalog stops,
     optionally with a state (index 6) and extra stop fields such as the AI mark
     (index 7). Mutates pool. Returns {stops, t, cur}. */
  const fillDay = (profile, pool, base, from, t, endMin, maxStops, state) => {
    const r = profile.rules, stops = []; let cur = from, driveMin = 0;
    const cost = s => { const legMin = estDriveHours(cur, [s[2], s[3]]) * 60, back = estDriveHours([s[2], s[3]], [base.lat, base.lon]) * 60; return { legMin, ok: !(t + legMin + s[4] + back > endMin || (driveMin + legMin + back) / 60 > r.maxDriveHours) }; };
    while (pool.length && stops.length < maxStops) {
      const i = pool.findIndex(x => cost(x).ok);
      if (i < 0) break;
      const s = pool.splice(i, 1)[0], { legMin } = cost(s);
      t += legMin; const arr = t; t += s[4]; driveMin += legMin;
      stops.push(mkStop(s[0], s[1], s[2], s[3], { ...(s[7] || {}), type: typeOf(s), arrive: fromMin(arr), depart: fromMin(t), minutes: s[4], state: s[6] || state }));
      cur = [s[2], s[3]];
    }
    return { stops, t, cur };
  };
  const shiftDay = (stops, min) => stops.forEach(s => { if (s.arrive) s.arrive = fromMin(toMin(s.arrive) + min); if (s.depart) s.depart = fromMin(toMin(s.depart) + min); });
  const FREE = "Free day near ";
  RT.isFreeDay = d => (d.title || "").startsWith(FREE);
  /* Other catalog destinations within the day's driving reach of the trip's base,
     nearest first, with their own interest score. */
  RT.nearbyDestinations = (trip, catalog, profile) => {
    const b = trip.base; if (!b) return [];
    const own = new Set([trip.destId, ...(trip.nearIds || [])]);
    return catalog.filter(d => !own.has(d.id) && !d.fly).map(d => {
      const h = estDriveHours([b.lat, b.lon], [d.base[1], d.base[2]]);
      const hits = d.stops.reduce((n, s) => n + s[5].filter(t => profile.interests.includes(t)).length, 0);
      return { dest: d, hours: h, hits };
    }).filter(x => x.hours * 2 <= profile.rules.maxDriveHours - 1).sort((a, b) => (b.hits - a.hits) || (a.hours - b.hours));
  };
  const freeNote = (trip, catalog, profile) => {
    const near = catalog ? RT.nearbyDestinations(trip, catalog, profile).slice(0, 3) : [];
    return near.length ? `Free day. Ideas within reach: ${near.map(n => `${n.dest.name} (${hoursText(n.hours)} away)`).join("; ")}. Tap one of the "Free days: add a day trip" buttons near the top of this page, or search for your own stops below.` : "Free day: add stops with the search box below.";
  };

  /* Draft a trip: drive days to and from the base, then sightseeing days packed to
     the pace's stops per day; days left over become free days with nearby ideas. */
  RT.draftTrip = (profile, dest, startDate, nights, catalog, opt = {}) => {
    const r = profile.rules, home = profile.home, perDay = r.stopsPerDay || 3;
    const homeStop = extra => mkStop("Home", home.label, home.lat, home.lon, { type: "Home", state: home.state, ...extra });
    const base = { name: `Lodging near ${dest.base[0]}`, addr: dest.base[0], lat: dest.base[1], lon: dest.base[2] };
    const hotel = extra => mkStop(base.name, base.addr, base.lat, base.lon, { type: "Hotel", state: dest.states[0], booking_url: RT.lodgingSearchUrl(profile.lodging.brand, base.addr, base.lat, base.lon), ...extra });
    // opt.route: the routed drive from home ({hours, line: [[lat, lon], ...]}). Without it
    // the straight-line estimate decides the drive days, and overnights go on a straight line.
    const routed = opt.route && opt.route.hours > 0 ? opt.route : null;
    const driveH = dest.fly ? 0 : routed ? routed.hours : estDriveHours([home.lat, home.lon], [base.lat, base.lon]);
    const travelDays = dest.fly ? 0 : Math.max(1, Math.ceil(driveH / r.maxDriveHours));
    const line = routed && routed.line && routed.line.length > 1 ? routed.line : [[home.lat, home.lon], [base.lat, base.lon]];
    // An overnight on the way, at the share `f` of the drive from home: a point on the route
    // the app later names after the nearest town.
    const overnight = (f, extra) => { const p = RT.pointAlong(line, f), lat = +(+p[0]).toFixed(5), lon = +(+p[1]).toFixed(5);
      return mkStop("Overnight en route", `En route near ${lat.toFixed(2)}, ${lon.toFixed(2)} (choose a town)`, lat, lon, { type: "Hotel", ...extra }); };
    // Places the traveler picked (opt.must, catalog stop arrays) go before everything else.
    const must = opt.must || [], mustNames = new Set(must.map(s => s[0]));
    const pool = nearestOrder([base.lat, base.lon], must).concat(orderForProfile(profile, [base.lat, base.lon], dest.stops.filter(s => !mustNames.has(s[0]))));
    const days = [];
    let date = startDate, used = 0;
    const fill = (from, t, endMin, maxStops) => fillDay(profile, pool, base, from, t, endMin, maxStops, dest.states[0]);
    const checkinMin = toMin(r.checkinTarget);
    const trip = { name: `${dest.name} Road Trip`, destId: dest.id, states: dest.states.slice(), fly: !!dest.fly, base, days, createdBy: "catalog" };
    if (dest.nearIds) trip.nearIds = dest.nearIds.slice();
    // outbound
    if (!dest.fly) {
      const legH = driveH / travelDays;
      for (let k = 0; k < travelDays; k++) {
        const startT = toMin(r.startTime);
        let arrive = startT + legH * 60 + (legH > 3 ? 60 : 0); // an hour for fuel and lunch on long legs
        const last = k === travelDays - 1;
        const s0 = k === 0 ? homeStop({ depart: r.startTime }) : overnight(k / travelDays, { depart: r.startTime });
        let mid = [];
        if (last && arrive < checkinMin - r.checkinWindow) {
          // Early arrival: see sights on the way in until the check-in window.
          const f = fill([base.lat, base.lon], arrive, checkinMin + r.checkinWindow, perDay);
          mid = f.stops; if (mid.length) arrive = f.t + estDriveHours(f.cur, [base.lat, base.lon]) * 60;
        }
        const s1 = last ? hotel({ arrive: fromMin(arrive), checkin: true }) : overnight((k + 1) / travelDays, { arrive: fromMin(arrive), checkin: true });
        const stops = [s0, ...mid, s1];
        // Still early? Leave home later so check-in lands on the target.
        if (last && arrive < checkinMin - r.checkinWindow) { shiftDay(stops, checkinMin - arrive); s0.notes = `Leaving later so you arrive at check-in time (${hm12(r.checkinTarget)}). Leave earlier if you would rather have more time at the stops.`; }
        days.push({ date, title: last ? `Drive to ${dest.base[0]}` : `Drive toward ${dest.base[0]}`, stops });
        date = addDays(date, 1); used++;
      }
    }
    // sightseeing days: pack each to the pace, then free days with nearby ideas
    const sightDays = Math.max(1, nights + 1 - used - (dest.fly ? 0 : travelDays));
    for (let k = 0; k < sightDays; k++) {
      const f = fill([base.lat, base.lon], toMin(r.startTime), checkinMin + 180, perDay);
      const back = f.t + estDriveHours(f.cur, [base.lat, base.lon]) * 60;
      const open = !f.stops.length;
      const stops = [hotel({ depart: r.startTime }), ...f.stops, hotel(open ? { notes: freeNote(trip, catalog, profile) } : { arrive: fromMin(back) })];
      days.push({ date, title: open ? `${FREE}${dest.base[0]}` : `${dest.name}, day ${k + 1}`, stops });
      date = addDays(date, 1); used++;
    }
    // return
    if (!dest.fly) {
      const legH = driveH / travelDays;
      for (let k = 0; k < travelDays; k++) {
        const first = k === 0, last = k === travelDays - 1;
        const arrive = toMin(r.startTime) + legH * 60 + 60;
        const s0 = first ? hotel({ depart: r.startTime }) : overnight(1 - k / travelDays, { depart: r.startTime });
        const s1 = last ? homeStop({ arrive: fromMin(arrive) }) : overnight(1 - (k + 1) / travelDays, { arrive: fromMin(arrive), checkin: true });
        days.push({ date, title: last ? "Drive home" : "Drive toward home", stops: [s0, s1] });
        date = addDays(date, 1);
      }
    }
    must.forEach(s => { if (s[6] && !trip.states.includes(s[6]) && trip.days.some(d => d.stops.some(x => x.name === s[0]))) trip.states.push(s[6]); });
    trip.days.forEach(d => RT.alignDriveDay(d, profile));
    // A long drive can make the trip longer than asked; the plan check says so.
    if (trip.days.length - 1 > nights) trip.longer = { asked: nights, nights: trip.days.length - 1, driveDays: travelDays };
    return trip;
  };

  /* Turn free days into day trips to another catalog destination. Returns the
     number of days filled. */
  RT.fillFreeDays = (trip, profile, near) => {
    if (!near || !trip.base) return 0;
    const d2 = near.dest, r = profile.rules, base = trip.base, perDay = r.stopsPerDay || 3;
    const have = new Set(trip.days.flatMap(d => d.stops.map(s => s.name)));
    const pool = orderForProfile(profile, [base.lat, base.lon], d2.stops.filter(s => !have.has(s[0])));
    let n = 0;
    trip.days.filter(RT.isFreeDay).forEach(day => {
      if (!pool.length) return;
      const start = day.stops[0], end = day.stops[day.stops.length - 1];
      const f = fillDay(profile, pool, base, [base.lat, base.lon], toMin(start.depart || r.startTime), toMin(r.checkinTarget) + 180, perDay, d2.states[0]);
      if (!f.stops.length) return;
      end.arrive = fromMin(f.t + estDriveHours(f.cur, [base.lat, base.lon]) * 60); end.notes = "";
      day.stops = [start, ...f.stops, end]; day.title = `Day trip: ${d2.name}`; n++;
    });
    if (n) d2.states.forEach(s => { if (!trip.states.includes(s)) trip.states.push(s); });
    return n;
  };

  // ---------- recommended places for a trip ----------
  /* Catalog places the trip does not have yet, in the order they are offered: places
     that match the picked interests within a day trip of the base (most matches, then
     nearest), then other places within a day trip (marked `filler`), then places up to
     one full day's drive away (marked `beyond`). A fly-and-drive trip offers only places
     on its own catalog trip. */
  RT.REC_MIN = 5; RT.REC_MAX = 8;
  const hasCoord = s => s.lat != null && s.lat !== "" && s.lon != null && s.lon !== "";
  RT.tripAnchor = trip => {
    if (!trip) return null;
    if (trip.base && trip.base.lat != null && trip.base.lat !== "") return [+trip.base.lat, +trip.base.lon];
    const all = trip.days.flatMap(d => d.stops).filter(s => s.type !== "Home" && hasCoord(s));
    const h = all.find(s => s.type === "Hotel" || s.checkin); if (h) return [+h.lat, +h.lon];
    return all.length ? [all.reduce((a, s) => a + +s.lat, 0) / all.length, all.reduce((a, s) => a + +s.lon, 0) / all.length] : null;
  };
  // A day trip there and back leaves an hour of the day's driving to spare.
  RT.dayReachH = profile => Math.max(0.5, (profile.rules.maxDriveHours - 1) / 2);
  const stopState = (addr, fallback) => (String(addr || "").trim().match(/,\s*([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?$/) || [])[1] || fallback || "";
  RT.recommendPool = (trip, catalog, profile) => {
    if (!trip || trip.cruise) return [];
    const at = RT.tripAnchor(trip); if (!at) return [];
    const have = new Set(trip.days.flatMap(d => d.stops.map(s => s.name)));
    const reach = RT.dayReachH(profile), far = profile.rules.maxDriveHours;
    const own = catalog.find(d => d.id === trip.destId);
    const src = trip.fly || (own && own.fly) ? (own ? [own] : []) : catalog.filter(d => !d.fly);
    const seen = new Set(), all = [];
    src.forEach(d => d.stops.forEach(s => {
      if (have.has(s[0]) || seen.has(s[0])) return; seen.add(s[0]);
      const hours = estDriveHours(at, [s[2], s[3]]); if (hours > far) return;
      const hits = s[5].filter(t => profile.interests.includes(t));
      all.push({ name: s[0], address: s[1], lat: s[2], lon: s[3], minutes: s[4], tags: s[5], hits, hours, destId: d.id, destName: d.name, state: stopState(s[1], d.states[0]), filler: !hits.length, beyond: hours > reach });
    }));
    const grp = c => c.beyond ? 2 : c.hits.length ? 0 : 1;
    return all.sort((a, b) => grp(a) - grp(b) || b.hits.length - a.hits.length || a.hours - b.hours);
  };
  // How many to show: every interest match up to RT.REC_MAX, and never fewer than RT.REC_MIN.
  RT.recommendSize = pool => Math.min(pool.length, Math.max(RT.REC_MIN, Math.min(RT.REC_MAX, pool.filter(c => c.hits.length && !c.beyond).length)));
  /* One view of the list: the picked places (kept, in pool order) and then places not
     shown yet, filling the list to `size`, or picks plus three when more are picked.
     When the unseen ones run out the list starts over (`wrapped`). */
  RT.recommendNext = (pool, picked, seen, size) => {
    const keep = pool.filter(c => picked.has(c.name)), rest = pool.filter(c => !picked.has(c.name));
    const need = Math.min(rest.length, Math.max(3, size - keep.length)); // at least three new places per view
    let fresh = rest.filter(c => !seen.has(c.name)).slice(0, need), wrapped = false;
    if (fresh.length < need) { wrapped = true; fresh = fresh.concat(rest.filter(c => !fresh.includes(c)).slice(0, need - fresh.length)); }
    return { list: keep.concat(fresh), wrapped };
  };
  RT.recommendPlaces = (trip, catalog, profile) => { const pool = RT.recommendPool(trip, catalog, profile); return RT.recommendNext(pool, new Set(), new Set(), RT.recommendSize(pool)).list; };
  // The day a new place goes to by default: a free day, else the sightseeing day with the
  // fewest stops; drive days only when the trip has nothing else.
  RT.bestDayFor = trip => {
    const n = trip.days.length; if (!n) return 0;
    const free = trip.days.findIndex(RT.isFreeDay); if (free >= 0) return free;
    const all = trip.days.map((d, i) => i), inner = n > 2 ? all.slice(1, -1) : all;
    const sight = inner.filter(i => !/^Drive /.test(trip.days[i].title || "")), pool = sight.length ? sight : inner;
    return pool.reduce((b, i) => trip.days[i].stops.length < trip.days[b].stops.length ? i : b, pool[0]);
  };
  /* Put a place into a day, before the day's last stop. A free day becomes a day of the
     traveler's picks. Returns the new stop. */
  // Re-time a day from estimated drive times (used until routed times arrive).
  RT.estimateDay = day => { const st = day.stops; if (st.length < 2 || !st.every(hasCoord)) return false;
    return RT.retimeDay(day, { legs: st.slice(1).map((s, k) => ({ seconds: estDriveHours([+st[k].lat, +st[k].lon], [+s.lat, +s.lon]) * 3600 })) }); };
  RT.addPlace = (trip, di, c) => {
    const d = trip.days[di]; if (!d || d.stops.length < 1 || trip.cruise) return null;
    if (trip.days.some(x => x.stops.some(s => s.name === c.name))) return null; // already in the trip
    const tag = (c.tags || [])[0];
    const s = mkStop(c.name, c.address, c.lat, c.lon, { type: tag ? tag[0].toUpperCase() + tag.slice(1) : "Stop", minutes: c.minutes || 60, state: c.state || "", notes: c.notes || "", ai: !!c.ai, aiBy: c.aiBy });
    d.stops.splice(Math.max(1, d.stops.length - 1), 0, s);
    if (RT.isFreeDay(d)) { d.title = `Your picks near ${trip.base ? trip.base.addr : d.title.slice(FREE.length)}`; d.stops[d.stops.length - 1].notes = ""; }
    if (c.state && trip.states && !trip.states.includes(c.state)) trip.states.push(c.state);
    RT.estimateDay(d);
    return s;
  };

  // Catalog trips whose Only-here experiences the itinerary shows: its own, the trips a
  // town trip draws from, and any day trips.
  RT.tripExpIds = (t, catalog) => [...new Set([t.destId, ...(t.nearIds || []), ...t.days.filter(d => /^Day trip: /.test(d.title || "")).map(d => (catalog.find(x => x.name === d.title.slice(10)) || {}).id)])].filter(Boolean);

  // ---------- make my trip unique: the interview ----------
  RT.UNIQUE_QUESTIONS = [
    { id: "standout", multi: true, title: "What would make this trip stand out?", hint: "Pick any that appeal to you, or none.", options: [
      ["nature", "Natural wonders: waterfalls, caves, gorges, hot springs"], ["sky", "Sunrise, sunset, and night sights"],
      ["history", "Living history: forts, old towns, ghost tours"], ["water", "On the water: ferries, snorkeling, paddling, lighthouses"],
      ["wildlife", "Wildlife up close"], ["local", "Local flavor: only-here food, makers, and music"]] },
    { id: "unusual", title: "How unusual should the picks be?", hint: "Unusual means a kind of place that is rare in this app's catalog.", options: [["twist", "Well-known places with a twist"], ["mix", "A mix"], ["rare", "As unusual as possible"]] },
    { id: "effort", title: "How much effort is fine?", options: [["easy", "Easy: overlooks and short walks"], ["some", "Some walking or a short hike"], ["any", "Anything within my walking limit"]] },
    { id: "reach", title: "How far would you go for something unique?" },
    { id: "notes", text: true, title: "Anything else that would make it yours? (optional)", hint: "A few words, for example: lighthouses, ghost tours, barbecue. The catalog search uses these words, and so does the AI when you have a key." }
  ];
  RT.UNIQUE_REACH = {
    plan: [["home", "Close to home: one day's drive or less"], ["trip", "As far as this trip's length allows"], ["any", "Anywhere I can drive"]],
    trip: [["near", "Near my hotel: about an hour"], ["day", "A day trip from my hotel"]]
  };
  RT.uniqueDefaults = mode => ({ standout: [], unusual: "mix", effort: "some", reach: mode === "trip" ? "day" : "trip", notes: "" });
  const THEMES = {
    nature: { label: "natural wonders", tags: ["waterfalls", "caves", "spa"], words: ["falls", "waterfall", "cave", "cavern", "gorge", "canyon", "spring", "arch", "dune", "geyser", "glacier", "crater"] },
    sky: { label: "sunrise, sunset, and night sights", tags: ["lights"], words: ["sunrise", "sunset", "dawn", "dusk", "night", "star", "firefl", "lights", "glow", "moon"] },
    history: { label: "living history", tags: ["history"], words: ["fort", "ghost", "historic", "civil war", "oldest", "mission", "battle", "colonial"] },
    water: { label: "on the water", tags: ["water", "lighthouses", "beach"], words: ["ferry", "snorkel", "kayak", "paddle", "boat", "lighthouse", "island", "reef"] },
    wildlife: { label: "wildlife", tags: ["wildlife"], words: ["elk", "bison", "whale", "bird", "manatee", "alligator", "horses", "bear", "seal", "puffin", "turtle", "moose", "wildlife"] },
    local: { label: "local flavor", tags: ["food", "markets", "drinks", "art", "music"], words: ["taste", "barbecue", "market", "distill", "winery", "craft", "music", "festival", "oyster", "lobster"] }
  };
  RT.UNIQUE_THEMES = THEMES;
  let tagCount = null;
  const tagCounts = catalog => { if (tagCount && tagCount.src === catalog) return tagCount.n; const n = {}; catalog.forEach(d => d.stops.forEach(s => s[5].forEach(t => n[t] = (n[t] || 0) + 1))); tagCount = { src: catalog, n }; return n; };
  const noteWords = text => [...new Set(String(text || "").toLowerCase().split(/[^a-z]+/).filter(w => w.length >= 4).map(w => w.length > 5 && w.endsWith("s") ? w.slice(0, -1) : w))];
  /* Score one candidate (a catalog place or an Only-here experience) against the answers.
     Returns {score, why}: the reasons are plain words shown on the option card. */
  const uniqueScore = (kind, text, tags, a, profile, counts) => {
    let score = kind === "experience" ? 8 : 0; const why = [];
    if (kind === "experience") why.push("only here, from the app's list of unique experiences");
    const hay = (text + " " + tags.join(" ")).toLowerCase();
    (a.standout || []).forEach(k => { const th = THEMES[k]; if (th && (tags.some(t => th.tags.includes(t)) || th.words.some(w => hay.includes(w)))) { score += 20; why.push(th.label); } });
    if (kind === "place" && tags.length) {
      const rare = tags.reduce((b, t) => (counts[t] || 999) < (counts[b] || 999) ? t : b, tags[0]), n = counts[rare] || 999;
      score += (100 / n) * ({ twist: 0.3, mix: 1, rare: 2 }[a.unusual] ?? 1);
      if (n <= 20) why.push(`unusual: only ${n} places in the app have ${RT.interestName(rare)}`);
      const mine = tags.filter(t => profile.interests.includes(t));
      score += mine.length * 3; if (mine.length) why.push(`your interests: ${mine.map(RT.interestName).join(", ")}`);
    }
    noteWords(a.notes).forEach(w => { if (hay.includes(w)) { score += 25; why.push(`matches "${w}"`); } });
    const effortful = tags.includes("hiking") || /\b(hike|climb|summit|trail)\b/.test(hay);
    if (a.effort === "easy" && effortful) score -= 12; else if (a.effort === "any" && effortful) score += 3;
    return { score, why };
  };
  /* The interview's options. ctx.trip set: places and experiences within reach of the
     trip's base that the trip does not have yet. Otherwise: places and experiences of
     catalog trips within reach of home for ctx.nights. At most three options per area
     and six areas; at least eight options when the catalog has them. Returns
     {options, groups: [{dest, hours, options}]}. */
  RT.UNIQUE_MIN = 8;
  RT.uniqueOptions = (profile, catalog, a, ctx = {}) => {
    const counts = tagCounts(catalog), trip = ctx.trip || null, home = profile.home.lat != null ? [profile.home.lat, profile.home.lon] : null;
    const span = Math.max(1, Math.floor((ctx.nights || profile.rules.nightsMax || 7) / 2)), maxH = profile.rules.maxDriveHours;
    let dests, at = null, have = new Set(), expHave = new Set();
    if (trip) {
      at = trip.cruise ? null : RT.tripAnchor(trip); if (!at) return { options: [], groups: [] };
      have = new Set(trip.days.flatMap(d => d.stops.map(s => s.name)));
      const own = catalog.find(d => d.id === trip.destId);
      dests = trip.fly || (own && own.fly) ? (own ? [own] : []) : catalog.filter(d => !d.fly);
      RT.tripExpIds(trip, catalog).forEach(id => { const d = catalog.find(x => x.id === id); (d && d.experiences || []).forEach(e => expHave.add(e)); });
      (trip.uniqueAdds || []).forEach(x => expHave.add(x.text));
    } else dests = catalog.filter(d => !d.fly || profile.flyOk);
    const reachH = trip ? (a.reach === "near" ? RT.CITY_REACH_H : RT.dayReachH(profile)) : Infinity;
    const fitsPlan = h => h == null || a.reach === "any" || (a.reach === "home" ? h <= maxH : Math.ceil(h / maxH) <= span);
    const cands = [];
    dests.forEach(d => {
      const baseH = d.fly ? null : home ? estDriveHours(home, [d.base[1], d.base[2]]) : null;
      if (!trip && !fitsPlan(baseH)) return;
      const season = ctx.month && !d.months.includes(ctx.month) ? -15 : 0;
      d.stops.forEach(s => {
        if (have.has(s[0])) return;
        const h = trip ? estDriveHours(at, [s[2], s[3]]) : baseH;
        if (trip && h > RT.dayReachH(profile)) return;
        const { score, why } = uniqueScore("place", s[0], s[5], a, profile, counts);
        cands.push({ id: `p:${d.id}:${s[0]}`, kind: "place", source: "catalog", name: s[0], address: s[1], lat: s[2], lon: s[3], minutes: s[4], tags: s[5], state: stopState(s[1], d.states[0]), destId: d.id, hours: h, farther: trip ? h > reachH : false, score: score + season - (trip && h > reachH ? 30 : 0), why });
      });
      const dh = trip ? estDriveHours(at, [d.base[1], d.base[2]]) : baseH;
      if (trip && dh > RT.dayReachH(profile)) return;
      (d.experiences || []).forEach((e, i) => {
        if (expHave.has(e)) return;
        const { score, why } = uniqueScore("experience", e, [], a, profile, counts);
        cands.push({ id: `e:${d.id}:${i}`, kind: "experience", source: "catalog", name: e, text: e, destId: d.id, state: d.states[0], hours: dh, farther: trip ? dh > reachH : false, score: score + season - (trip && dh > reachH ? 30 : 0), why });
      });
    });
    cands.sort((x, y) => y.score - x.score || (x.hours ?? 0) - (y.hours ?? 0));
    // Keep a mix: the three best Only-here experiences follow the five best places, so
    // high-scoring rare places never crowd every experience out of the list.
    const pl = cands.filter(c => c.kind === "place"), ex = cands.filter(c => c.kind === "experience");
    const order = pl.slice(0, 5).concat(ex.slice(0, 3), pl.slice(5), ex.slice(3));
    const groups = new Map(), options = [];
    for (const c of order) {
      if (options.length >= 12) break;
      const g = groups.get(c.destId);
      if (g ? g.options.length >= 3 : groups.size >= 6) continue;
      if (c.farther && options.filter(o => !o.farther).length >= RT.UNIQUE_MIN) continue;
      if (c.farther) c.why.unshift(`farther than you asked: ${hoursText(c.hours)} from your hotel`);
      const dest = catalog.find(d => d.id === c.destId);
      if (!g) groups.set(c.destId, { dest, hours: c.kind === "place" && trip ? null : c.hours, options: [c] }); else g.options.push(c);
      options.push(c);
    }
    return { options, groups: [...groups.values()] };
  };
  const townOf = addr => { const p = String(addr || "").split(",").map(x => x.trim().replace(/\s*\d{5}(-\d{4})?$/, "")).filter(Boolean); return p.length >= 2 ? p.slice(-2).join(", ") : p[0] || ""; };
  const pickArr = o => [o.name, o.address, +o.lat, +o.lon, o.minutes || 60, o.tags || [], o.state || stopState(o.address), o.ai ? { ai: true, aiBy: o.aiBy, notes: o.note || "" } : null];
  const expAdd = (o, catalog, fallback) => ({ text: o.name, near: ((catalog.find(d => d.id === o.destId) || {}).base || [fallback])[0], destId: o.destId || "" });
  /* Build a trip from interview picks: the area with the most picks is the base (an
     AI-only pick list is based in the first pick's town), picks within a day trip go
     first in the draft, and the rest are listed in trip.leftOut with the reason. */
  // The base for a list of interview picks: the area with the most picks, or (AI picks
  // only) a town trip around the first pick.
  RT.uniqueBase = (picks, catalog) => {
    const places = picks.filter(o => o.kind === "place"), count = new Map();
    picks.forEach(o => { if (o.destId) count.set(o.destId, (count.get(o.destId) || 0) + 1); });
    if (count.size) { const best = Math.max(...count.values()); return catalog.find(d => d.id === [...count.keys()].find(k => count.get(k) === best)) || null; }
    if (places.length) { const p0 = places[0]; return RT.cityDestination({ label: townOf(p0.address) || p0.name, lat: +p0.lat, lon: +p0.lon, abbr: p0.state || stopState(p0.address) }, catalog); }
    return null;
  };
  RT.buildUnique = (profile, catalog, picks, startDate, nights, opt = {}) => {
    const places = picks.filter(o => o.kind === "place"), exps = picks.filter(o => o.kind === "experience");
    const dest = RT.uniqueBase(picks, catalog);
    if (!dest) return null;
    const at = [dest.base[1], dest.base[2]], reach = RT.dayReachH(profile), ownNames = new Set(dest.stops.map(s => s[0]));
    const fit = [], out = [];
    places.forEach(o => (ownNames.has(o.name) || dest.fly || estDriveHours(at, [+o.lat, +o.lon]) <= reach ? fit : out).push(o));
    const trip = RT.draftTrip(profile, dest, startDate, nights, catalog, { must: fit.map(pickArr), route: opt.route });
    if (exps.length) trip.uniqueAdds = exps.map(o => expAdd(o, catalog, dest.base[0]));
    const placed = new Set(trip.days.flatMap(d => d.stops.map(s => s.name)));
    const left = out.map(o => ({ name: o.name, why: `too far from ${dest.base[0]} for a day trip` })).concat(fit.filter(o => !placed.has(o.name)).map(o => ({ name: o.name, why: "did not fit in the days" })));
    if (left.length) trip.leftOut = left;
    return trip;
  };
  /* Let the app schedule it: keep an AI trip's places and let the app build the days
     around one base. The base is the catalog trip the AI was asked about, or the drive-to
     catalog trip nearest the middle of the AI's places. Places within a day trip of the
     base go first in the draft (still marked AI); the rest are listed in trip.leftOut. */
  RT.scheduleTrip = (profile, catalog, trip, opt = {}) => {
    const seen = new Set(), places = [];
    trip.days.forEach(d => d.stops.forEach(s => {
      if (/^home$/i.test(s.type || "") || /^home$/i.test(s.name || "") || s.type === "Hotel" || s.checkin || !hasCoord(s) || seen.has(s.name)) return;
      seen.add(s.name); places.push(s);
    }));
    const own = catalog.find(d => d.id === trip.destId);
    let dest = own || null;
    if (!dest && places.length) {
      const mid = [places.map(s => +s.lat).sort((a, b) => a - b)[places.length >> 1], places.map(s => +s.lon).sort((a, b) => a - b)[places.length >> 1]];
      dest = catalog.filter(d => !d.fly || profile.flyOk).reduce((b, d) => !b || haversineMi(mid, [d.base[1], d.base[2]]) < haversineMi(mid, [b.base[1], b.base[2]]) ? d : b, null);
    }
    if (!dest) return null;
    const at = [dest.base[1], dest.base[2]], reach = RT.dayReachH(profile), fit = [], out = [];
    places.forEach(s => (dest.fly || estDriveHours(at, [+s.lat, +s.lon]) <= reach ? fit : out).push(s));
    const must = fit.map(s => [s.name, s.address, +s.lat, +s.lon, s.minutes || (s.arrive && s.depart ? Math.max(15, toMin(s.depart) - toMin(s.arrive)) : 60), [], s.state || stopState(s.address), s.ai ? { ai: true, aiBy: s.aiBy, notes: s.notes || "" } : { notes: s.notes || "" }]);
    const nights = Math.max(1, trip.days.length - 1);
    const t = RT.draftTrip(profile, dest, trip.days[0].date, nights, catalog, { must, route: opt.route });
    const placed = new Set(t.days.flatMap(d => d.stops.map(s => s.name)));
    const left = out.map(s => ({ name: s.name, why: `too far from ${dest.base[0]} for a day trip` })).concat(fit.filter(s => !placed.has(s.name)).map(s => ({ name: s.name, why: "did not fit in the days" })));
    if (left.length) t.leftOut = left;
    t.name = `${trip.name} (scheduled by the app)`; t.fromAI = trip.aiBy || ""; t.aiMarked = true;
    return t;
  };
  // Add interview picks to the current trip. Returns {added, days} (day indexes changed).
  RT.addUnique = (trip, picks, catalog) => {
    const added = [], days = new Set(); if (trip.cruise) return { added, days: [] };
    picks.filter(o => o.kind === "place").forEach(o => { const di = RT.bestDayFor(trip); if (RT.addPlace(trip, di, { ...o, notes: o.ai ? o.note || "" : "" })) { added.push(o.name); days.add(di); } });
    const have = new Set((trip.uniqueAdds || []).map(x => x.text)), exps = picks.filter(o => o.kind === "experience" && !have.has(o.name));
    if (exps.length) trip.uniqueAdds = (trip.uniqueAdds || []).concat(exps.map(o => expAdd(o, catalog, trip.base ? trip.base.addr : "")));
    return { added: added.concat(exps.map(o => o.name)), days: [...days] };
  };

  // The point at share `f` (0 to 1) of the distance along a line of [lat, lon] points.
  RT.pointAlong = (line, f) => {
    if (line.length < 2) return line[0];
    const seg = line.slice(1).map((p, i) => haversineMi(line[i], p)), tot = seg.reduce((a, b) => a + b, 0);
    let goal = tot * Math.min(1, Math.max(0, f));
    for (let i = 0; i < seg.length; i++) { if (goal <= seg[i]) { const t = seg[i] ? goal / seg[i] : 0; return [line[i][0] + (line[i + 1][0] - line[i][0]) * t, line[i][1] + (line[i + 1][1] - line[i][1]) * t]; } goal -= seg[i]; }
    return line[line.length - 1];
  };
  /* A day that only drives (its start and its end, nothing between) is timed to its
     end: an overnight check-in lands on the check-in target (leave later on a short
     drive, up to 90 minutes earlier than usual on a long one), and the drive
     home ends before sunset when the rules ask for it (never leaving before 6 a.m.).
     Returns true when the times moved. */
  RT.alignDriveDay = (day, profile) => {
    const st = day.stops, r = profile.rules, a = st[0], end = st[st.length - 1];
    if (st.length !== 2 || !/^Drive /.test(day.title || "") || !a.depart || !end.arrive) return false;
    const dep = toMin(a.depart), arr = toMin(end.arrive), start = toMin(r.startTime);
    let shift = 0, why = "";
    if (end.checkin) {
      const gap = toMin(r.checkinTarget) - arr;
      if (gap > r.checkinWindow) { shift = gap; why = `Leaving later so you arrive at check-in time (${hm12(r.checkinTarget)}). Leave earlier if you would rather have more time on the road.`; }
      // A long drive day may leave up to 90 minutes before the usual start (never before
      // 6 a.m.) so check-in lands on the target.
      else if (gap < -r.checkinWindow) { shift = Math.max(gap, Math.max(360, start - 90) - dep); if (shift < 0) why = `Leaving at ${hm12(fromMin(dep + shift))} so you reach check-in near ${hm12(r.checkinTarget)} on a long drive day.`; else shift = 0; }
    } else if (r.arriveBeforeSunset && hasXY(end) && day.date) {
      const ss = RT.sunsetLocal(day.date, +end.lat, +end.lon), sun = ss ? toMin(RT.localHM(ss, RT.tzAt(day, end), +end.lon)) : null;
      if (sun != null && arr > sun - 15) { shift = Math.max(sun - 15 - arr, 360 - dep); if (shift < 0) why = `Leaving at ${hm12(fromMin(dep + shift))} so you get home before sunset (about ${hm12(fromMin(sun))}).`; else shift = 0; }
    }
    if (!shift) return false;
    shift = (shift < 0 ? Math.floor((dep + shift) / 5) : Math.ceil((dep + shift) / 5)) * 5 - dep; // leave on a 5-minute mark
    shiftDay(st, shift); a.notes = why.replace(/Leaving at [0-9:]+ [ap]\.m\./, `Leaving at ${hm12(a.depart)}`);
    return true;
  };
  // Name an overnight after the town found at its point.
  RT.nameOvernight = (s, town, profile) => { s.name = `Overnight in ${town}`; s.address = town; s.booking_url = RT.lodgingSearchUrl(profile.lodging.brand, town, s.lat, s.lon); };
  RT.isUnnamedOvernight = s => /^En route/.test(s.address || "");

  /* Rebuild one day's times from routed legs: keep the first departure and each
     stop's time on site (its minutes, or its current arrive-to-depart span). */
  RT.stopSig = day => day.stops.map(s => `${s.name}|${s.lat}|${s.lon}`).join(";");
  RT.retimeDay = (day, route) => {
    if (!route || route.legs.length !== day.stops.length - 1) return false;
    const st = day.stops; let t = toMin(st[0].depart || "08:30");
    // Work out every time first; a day that would run past midnight keeps its times, and
    // the plan check reports the drive and travel problems instead of times that wrap.
    const next = [];
    for (let k = 1; k < st.length; k++) {
      const s = st[k];
      const stay = s.minutes || (s.arrive && s.depart ? Math.max(0, toMin(s.depart) - toMin(s.arrive)) : 0);
      t = Math.ceil((t + route.legs[k - 1].seconds / 60) / 5) * 5;
      const arrive = t;
      if (k < st.length - 1) t += stay;
      next.push([arrive, k < st.length - 1 ? t : null]);
    }
    // lateRetime holds the stop list it was found for, so the error goes away once a stop is
    // dropped, moved, or added.
    if (next.some(([a, d]) => a >= 1440 || (d != null && d >= 1440))) { day.lateRetime = RT.stopSig(day); return false; }
    delete day.lateRetime;
    next.forEach(([a, d], i) => { const s = st[i + 1]; s.arrive = fromMin(a); if (d != null) s.depart = fromMin(d); });
    return true;
  };

  // ---------- lodging search links ----------
  const BRANDS = {
    "Any": null, "Hilton": "hilton", "Marriott": "marriott", "IHG": "ihg", "Hyatt": "hyatt",
    "Choice": "choicehotels", "Wyndham": "wyndham", "Best Western": "bestwestern"
  };
  RT.BRANDS = Object.keys(BRANDS);
  RT.lodgingSearchUrl = (brand, addr, lat, lon) => {
    const q = brand && brand !== "Any" ? `${brand} hotels near ${addr}` : `hotels near ${addr}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  };

  // ---------- navigation links ----------
  RT.MAX_WAYPOINTS = 9;
  const hasXY = s => s.lat != null && s.lon != null && s.lat !== "" && s.lon !== "";
  const routable = stops => stops.filter(s => hasXY(s) || (s.address && !/^En route/.test(s.address)));
  RT.splitLegs = (stops, max = RT.MAX_WAYPOINTS) => { const size = max + 2; if (stops.length <= size) return [stops]; const legs = []; let i = 0; while (i < stops.length - 1) { legs.push(stops.slice(i, i + size)); i += size - 1; } return legs; };
  RT.googleLink = stops => { const loc = s => s.address || `${s.lat},${s.lon}`; const L = stops.map(loc); let u = `https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=${encodeURIComponent(L[0])}&destination=${encodeURIComponent(L[L.length - 1])}`; if (L.length > 2) u += "&waypoints=" + encodeURIComponent(L.slice(1, -1).join("|")); return u + "&dir_action=navigate"; };
  RT.dayLinks = day => { const st = routable(day.stops); return st.length < 2 ? [] : RT.splitLegs(st).map(RT.googleLink); };
  RT.wazeLink = s => hasXY(s) ? { url: `https://waze.com/ul?ll=${s.lat}%2C${s.lon}&navigate=yes`, search: false } : { url: `https://waze.com/ul?q=${encodeURIComponent(s.address)}&navigate=yes`, search: true };
  RT.allStops = trip => { const out = []; let n = 0; trip.days.forEach((d, i) => d.stops.forEach((s, j) => { if (i > 0 && j === 0) return; out.push({ n: ++n, day: d, s }); })); return out; };

  // ---------- sunset (NOAA equations, offline) ----------
  RT.sunsetLocal = (iso, lat, lon) => {
    const d = new Date(iso + "T00:00:00Z"); const start = Date.UTC(d.getUTCFullYear(), 0, 0); const n = Math.floor((d - start) / 864e5);
    const g = 2 * Math.PI / 365 * (n - 1 + 0.5);
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    const la = lat * Math.PI / 180; const c = Math.cos(90.833 * Math.PI / 180) / (Math.cos(la) * Math.cos(dec)) - Math.tan(la) * Math.tan(dec);
    if (c < -1 || c > 1) return null;
    const ha = Math.acos(c) * 180 / Math.PI; const utcMin = 720 - 4 * (lon - ha) - eq;
    return new Date(d.getTime() + utcMin * 60000); // a UTC instant
  };
  // Local clock time at a location: estimate the offset from longitude (15 degrees per hour)
  // unless an IANA time zone is given.
  /* A time zone from a location, for the United States and nearby; a weather check
     supplies the exact zone. The zone lines are [lat, lon] points from south to north
     along the county lines of the split states (Florida's panhandle, Alabama and Georgia,
     Tennessee, Kentucky, Indiana, Michigan, the Dakotas, Nebraska, Kansas, Texas, Idaho,
     Oregon); a place west of a line is in the zone to the west. Arizona keeps standard
     time all year (the Navajo Nation, which keeps daylight time, is not split out).
     Outside the covered area the answer is undefined and clock times use longitude. */
  const ZONE_LINES = [
    ["America/Chicago", [[24, -85.35], [29.8, -85.35], [30.4, -85.0], [31.0, -85.0], [32.85, -85.18], [35.0, -85.6], [35.9, -84.85], [36.6, -84.9], [37.0, -85.0], [37.35, -85.4],
      [37.7, -86.0], [38.0, -86.3], [38.2, -86.6], [38.4, -87.2], [38.55, -87.6], [40.7, -87.6], [40.8, -87.0], [41.1, -86.9], [41.2, -86.5], [41.76, -86.5], [41.77, -87.0],
      [44.0, -87.0], [44.01, -86.6], [45.4, -86.6], [45.55, -87.3], [46.25, -88.1], [46.3, -89.0], [46.5, -89.9], [50, -89.9]]],
    ["America/Denver", [[24, -104.9], [32.0, -104.9], [32.01, -103.04], [37.0, -103.04], [37.01, -102.05], [37.7, -102.05], [37.71, -101.5], [40.0, -101.5], [40.01, -101.4],
      [41.0, -101.4], [41.01, -101.0], [44.5, -101.0], [44.51, -100.6], [46.0, -100.6], [46.01, -101.3], [47.6, -101.3], [47.61, -104.05], [50, -104.05]]],
    ["America/Los_Angeles", [[24, -114.82], [32.72, -114.72], [33.6, -114.53], [34.15, -114.36], [34.3, -114.14], [34.45, -114.38], [35.0, -114.63], [36.0, -114.74], [36.1, -114.05],
      [42.0, -114.05], [42.01, -118.2], [44.3, -118.2], [44.31, -117.0], [45.5, -117.0], [45.51, -114.6], [47.0, -115.4], [47.9, -116.05], [50, -116.05]]]
  ];
  const lineLon = (pts, lat) => { if (lat <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) { const [a, b] = [pts[i - 1], pts[i]]; if (lat <= b[0]) return a[1] + (b[1] - a[1]) * (lat - a[0]) / (b[0] - a[0]); }
    return pts[pts.length - 1][1]; };
  RT.guessTZ = (lat, lon) => {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return undefined;
    if (lat > 18 && lat < 23 && lon > -161 && lon < -154) return "Pacific/Honolulu";
    if (lat > 54.6 && lon < -130) return "America/Anchorage";
    if (lat > 17.5 && lat < 18.8 && lon > -67.5 && lon < -64.5) return "America/Puerto_Rico";
    if (lat > 49.5 && lat < 60 && lon > -141 && lon < -89) return lon < -114.5 ? "America/Los_Angeles" : lon < -102 ? "America/Denver" : "America/Chicago";
    if (lat < 24.3 || lat > 49.5 || lon < -125 || lon > -66.8) return undefined;
    // West to east: Pacific, then Arizona, Mountain, Central, Eastern.
    if (lon < lineLon(ZONE_LINES[2][1], lat)) return "America/Los_Angeles";
    if (lat >= 31.3 && lat <= 37.0 && lon <= -109.045) return "America/Phoenix";
    if (lon < lineLon(ZONE_LINES[1][1], lat)) return "America/Denver";
    if (lon < lineLon(ZONE_LINES[0][1], lat)) return "America/Chicago";
    return "America/New_York";
  };
  // The day's time zone: the one stored on the day, else the guess from its first located
  // stop (the same guess the app stamps before a plan check).
  RT.dayTZ = day => { if (day.tz) return day.tz; const s = (day.stops || []).find(x => x.lat != null && x.lat !== ""); return s ? RT.guessTZ(+s.lat, +s.lon) : undefined; };
  // The zone at one stop: the day's stored zone when the whole day stays in the stop's
  // zone, else the stop's own guessed zone (a drive home that crosses into another zone).
  RT.tzAt = (day, s) => { const g = RT.guessTZ(+s.lat, +s.lon), one = (day.stops || []).every(x => x.lat == null || x.lat === "" || RT.guessTZ(+x.lat, +x.lon) === g);
    return one || !g ? day.tz || g : g; };
  RT.localHM = (instant, tz, lon) => { if (tz) { try { return instant.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }); } catch (e) { /* fall through */ } } const off = Math.round(lon / 15); const m = instant.getUTCHours() * 60 + instant.getUTCMinutes() + off * 60 + (isDST(instant) ? 60 : 0); return fromMin(((m % 1440) + 1440) % 1440); };
  const isDST = d => { const y = d.getUTCFullYear(); const mar = new Date(Date.UTC(y, 2, 8)); const s = new Date(Date.UTC(y, 2, 8 + (7 - mar.getUTCDay()) % 7, 7)); const nov = new Date(Date.UTC(y, 10, 1)); const e = new Date(Date.UTC(y, 10, 1 + (7 - nov.getUTCDay()) % 7, 6)); return d >= s && d < e; };

  // ---------- plan checker ----------
  RT.checkTrip = (trip, profile, routes = {}) => {
    const r = profile.rules, out = [];
    // Each finding names its day (date) and the stop it is about (subject), so a fix or an
    // override can find it again.
    const add = (level, day, check, msg, subject = "") => out.push({ level, day: dayLabel(day.date), date: day.date, check, msg, subject });
    const L = trip.longer; if (L && trip.days.length && trip.days.length - 1 === L.nights) add("INFO", trip.days[0], "trip length", `the drive takes ${L.driveDays} days each way, so this trip runs ${L.nights} nights instead of the ${L.asked} you asked for`);
    trip.days.forEach((day, i) => {
      const st = day.stops;
      if (day.lateRetime && day.lateRetime === RT.stopSig(day)) add("ERROR", day, "too long", "with real drive times this day would run past midnight: drop or move stops, or split the drive");
      st.forEach(s => { if (s.arrive && s.depart && toMin(s.depart) < toMin(s.arrive)) add("ERROR", day, "order", `${s.name}: departs ${hm12(s.depart)} before arriving ${hm12(s.arrive)}`, s.name); });
      for (let k = 1; k < st.length; k++) { const a = st[k - 1], b = st[k]; if (a.depart && b.arrive && toMin(b.arrive) < toMin(a.depart)) add("ERROR", day, "order", `${b.name} arrival ${hm12(b.arrive)} is before leaving ${a.name} at ${hm12(a.depart)}`, b.name); }
      const route = routes[day.date];
      if (route && route.legs.length === st.length - 1) {
        route.legs.forEach((leg, k) => { const a = st[k], b = st[k + 1]; if (a.depart && b.arrive) { const gap = toMin(b.arrive) - toMin(a.depart), need = leg.seconds / 60; if (gap + 10 < need) add("ERROR", day, "travel", `${a.name} to ${b.name} needs about ${Math.round(need)} min of driving; the plan allows ${gap} min`, b.name); } });
        const h = route.legs.reduce((x, l) => x + l.seconds, 0) / 3600, mi = route.legs.reduce((x, l) => x + l.meters, 0) / 1609.344;
        if (h > r.maxDriveHours) add("ERROR", day, "drive cap", `${h.toFixed(1)} h routed driving exceeds the ${r.maxDriveHours} h cap (${Math.round(mi)} mi)`);
        else if (h > r.maxDriveHours - 0.5) add("WARN", day, "drive cap", `${h.toFixed(1)} h is within 30 min of the cap; routing has no traffic data`);
      } else if (!route) {
        let est = 0; for (let k = 1; k < st.length; k++) { const a = st[k - 1], b = st[k]; if (hasXY(a) && hasXY(b)) est += estDriveHours([+a.lat, +a.lon], [+b.lat, +b.lon]); }
        if (est > r.maxDriveHours) add("WARN", day, "drive cap", `about ${est.toFixed(1)} h estimated driving; tap Check drive times for routed times`);
      }
      st.forEach(s => { if (s.checkin && s.arrive) { const diff = toMin(s.arrive) - toMin(r.checkinTarget); if (Math.abs(diff) > r.checkinWindow) add("WARN", day, "check-in", `${s.name} check-in ${hm12(s.arrive)} is ${Math.abs(diff)} min ${diff > 0 ? "after" : "before"} the ${hm12(r.checkinTarget)} target`, s.name); } });
      st.forEach(s => { if (s.timed_entry && s.arrive && toMin(s.arrive) > toMin(s.timed_entry) - r.ticketMargin) add("WARN", day, "tickets", `${s.name}: arrive ${hm12(s.arrive)} leaves less than ${r.ticketMargin} min before the ${hm12(s.timed_entry)} entry`, s.name); });
      if (r.arriveBeforeSunset) { const t = st.find(s => s.checkin) || st[st.length - 1]; if (t && t.arrive && hasXY(t)) { const ss = RT.sunsetLocal(day.date, +t.lat, +t.lon); if (ss) { const loc = RT.localHM(ss, RT.tzAt(day, t), +t.lon); if (toMin(t.arrive) > toMin(loc)) add("WARN", day, "sunset", `arrive ${t.name} ${hm12(t.arrive)} after sunset (about ${hm12(loc)})`, t.name); } } }
      if (i > 0) { const pe = trip.days[i - 1].stops.slice(-1)[0], s0 = st[0]; if (String(pe.address || "").trim().toLowerCase() !== String(s0.address || "").trim().toLowerCase()) add("WARN", day, "continuity", `day starts at ${s0.name}, but the previous day ended at ${pe.name}`, s0.name); }
      if (st.length - 2 > RT.MAX_WAYPOINTS) add("INFO", day, "links", `${st.length - 2} waypoints; the Google Maps link splits into legs (app limit ${RT.MAX_WAYPOINTS})`);
      st.forEach(s => { if (!hasXY(s)) add("INFO", day, "links", `${s.name} has no coordinates; Waze opens an address search`, s.name); });
      st.forEach(s => { if (/^En route/.test(s.address || "")) add("WARN", day, "lodging", `choose an overnight town for "${s.name}"`, s.name); });
    });
    return out;
  };

  // ---------- one-tap fixes and overrides ----------
  // A finding's key: day, level, check, stop, and the message with its numbers and clock
  // times taken out, so a WARN and an ERROR of one check (or two kinds of "order" problem
  // for one stop) never share a key, while a number that changes keeps the same key.
  const msgShape = m => String(m || "").toLowerCase().replace(/-?\d+(?:[.:]\d+)*(?:\s*[ap]\.m\.)?/g, "#");
  // A stop renamed (an overnight named after its town) keeps the traveler's overrides.
  RT.renameInOverrides = (trip, from, to) => { if (!trip.overrides || from === to) return;
    trip.overrides = trip.overrides.map(k => { const p = k.split("|"); if (p.length !== 5) return k; if (p[3] === from) p[3] = to; p[4] = p[4].split(msgShape(from)).join(msgShape(to)); return p.join("|"); }); };
  RT.findingKey = f => `${f.date}|${f.level}|${f.check}|${f.subject || ""}|${msgShape(f.msg)}`;
  // The traveler's overrides: findings they chose to keep as they are.
  RT.isOverridden = (trip, f) => (trip.overrides || []).includes(RT.findingKey(f));
  // What the app can fix by itself for a finding, as a button label, or "" when nothing
  // simple applies. The label shows only when a trial run on a copy of the trip works.
  // Name the town needs a lookup, so the app runs that one.
  RT.quickFixLabel = (trip, f, profile, routes = {}) => {
    const r = profile.rules, day = trip.days.find(d => d.date === f.date); if (!day) return "";
    // A cruise port day is fixed by the ship's times, so the app never moves it.
    if (trip.cruise) return "";
    if (f.check === "lodging") { const s = day.stops.find(x => x.name === f.subject); return s && hasXY(s) ? "Name the town" : ""; }
    const label = { "check-in": `Shift the day to check in at ${hm12(r.checkinTarget)}`, sunset: "Leave earlier", order: "Re-time this day", travel: "Re-time this day", continuity: "Start where the last day ended" }[f.check];
    if (!label) return "";
    // The trial copies only the day a fix changes; a fix never changes another day.
    const copy = { ...trip, days: trip.days.map(d => d === day ? JSON.parse(JSON.stringify(d)) : d) };
    return RT.quickFix(copy, f, profile, routes) ? label : "";
  };
  const RANK = { INFO: 0, WARN: 1, ERROR: 2 };
  // A stop where a day starts rather than a place to see: home, a hotel, or a stop with no
  // time on site and no timed entry.
  const startPoint = s => /^(home|hotel)$/i.test(s.type || "") || !(+s.minutes > 0 || s.timed_entry || s.booking_url || s.arrive);
  /* Apply the simple fix for a finding. Returns true only when the finding is gone and the
     day has no new problem as serious as the one fixed; otherwise the day is put back as it
     was. Times move as a block, never before 6 a.m. or past 11:30 p.m., and never on a day
     with a timed entry. Cruise port days are left alone. */
  RT.quickFix = (trip, f, profile, routes = {}) => {
    const r = profile.rules, day = trip.days.find(d => d.date === f.date); if (!day || trip.cruise) return false;
    const i = trip.days.indexOf(day), key = RT.findingKey(f), rank = RANK[f.level] ?? 1;
    // Only this day and the day before it can change this day's findings.
    const found = () => RT.checkTrip({ ...trip, days: trip.days.slice(Math.max(0, i - 1), i + 1) }, profile, routes).filter(x => x.date === day.date && x.level !== "INFO");
    const before = new Set(found().map(RT.findingKey)), saved = JSON.stringify(day);
    if (!before.has(key)) return false; // already gone
    const restore = () => { const back = JSON.parse(saved); Object.keys(day).forEach(k => delete day[k]); Object.assign(day, back); };
    const attempt = fn => {
      if (fn()) { const after = found(); if (!after.some(x => RT.findingKey(x) === key) && after.every(x => before.has(RT.findingKey(x)) || RANK[x.level] < rank)) return true; }
      restore(); return false;
    };
    const times = () => day.stops.flatMap(s => [s.arrive, s.depart]).filter(Boolean).map(toMin);
    const room = shift => { const t = times(); return !t.length || (Math.min(...t) + shift >= 360 && Math.max(...t) + shift <= 1410); };
    const timed = () => day.stops.some(s => s.timed_entry);
    if (f.check === "check-in") {
      if (timed()) return false;
      if (attempt(() => RT.alignDriveDay(day, profile))) return true;
      return attempt(() => {
        const s = day.stops.find(x => x.name === f.subject && x.checkin) || day.stops.find(x => x.checkin); if (!s || !s.arrive) return false;
        const gap = toMin(r.checkinTarget) - toMin(s.arrive); if (!gap || !room(gap)) return false;
        shiftDay(day.stops, gap); return true;
      });
    }
    if (f.check === "sunset") return !timed() && attempt(() => {
      const st = day.stops, t = st.find(x => x.checkin) || st[st.length - 1]; if (!t || !t.arrive || !hasXY(t)) return false;
      const ss = RT.sunsetLocal(day.date, +t.lat, +t.lon); if (!ss) return false;
      const sun = toMin(RT.localHM(ss, RT.tzAt(day, t), +t.lon)), gap = sun - 15 - toMin(t.arrive);
      const shift = Math.max(gap, 360 - Math.min(...times()));
      if (shift >= 0) return false;
      shiftDay(st, shift); st[0].notes = `Leaving at ${hm12(st[0].depart)} to arrive before sunset (about ${hm12(fromMin(sun))}).`; return true;
    });
    if (f.check === "order" || f.check === "travel") return attempt(() => routes[day.date] ? RT.retimeDay(day, routes[day.date]) : RT.estimateDay(day));
    if (f.check === "continuity") return i > 0 && attempt(() => {
      // The day starts where the last one ended. A start point is replaced; a place to see
      // stays, right after the new start.
      const st = day.stops, s0 = st[0], pe = trip.days[i - 1].stops.slice(-1)[0];
      const start = { ...JSON.parse(JSON.stringify(pe)), arrive: "", depart: s0.depart || r.startTime, checkin: false, notes: "", timed_entry: "", minutes: 0 };
      if (startPoint(s0)) { st[0] = start; return true; }
      // Keep the place's times: leave the new start early enough to reach it.
      const at = s0.arrive ? toMin(s0.arrive) : s0.depart ? toMin(s0.depart) - (+s0.minutes || 0) : null;
      if (at == null || !hasXY(start) || !hasXY(s0)) { s0.arrive = ""; st.unshift(start); RT.estimateDay(day); return true; }
      const leave = Math.floor((at - estDriveHours([+start.lat, +start.lon], [+s0.lat, +s0.lon]) * 60) / 5) * 5; if (leave < 360) return false; // never before 6 a.m.
      start.depart = fromMin(leave); s0.arrive = fromMin(at); st.unshift(start);
      return true;
    });
    return false;
  };

  // ---------- budget ----------
  RT.budget = (trip, profile, routes = {}) => {
    let miles = 0, routed = true;
    trip.days.forEach(d => { const r = routes[d.date]; if (r) miles += r.legs.reduce((x, l) => x + l.meters, 0) / 1609.344; else { routed = false; for (let k = 1; k < d.stops.length; k++) { const a = d.stops[k - 1], b = d.stops[k]; if (hasXY(a) && hasXY(b)) miles += haversineMi([+a.lat, +a.lon], [+b.lat, +b.lon]) * 1.25; } } });
    const nights = Math.max(0, trip.days.length - 1), v = profile.vehicle, L = profile.lodging, D = profile.dining;
    const fuel = miles / Math.max(1, v.mpg) * v.fuelPrice;
    const lodging = [nights * L.nightlyLow, nights * L.nightlyHigh];
    const food = [trip.days.length * D.foodPerDay * 0.85, trip.days.length * D.foodPerDay * 1.25];
    const attractions = [trip.days.length * 10, trip.days.length * 35];
    const baseLow = lodging[0] + fuel * 0.92 + food[0] + attractions[0], baseHigh = lodging[1] + fuel * 1.08 + food[1] + attractions[1];
    return { miles: Math.round(miles), routed, nights, lines: [
      ["Lodging", lodging[0], lodging[1], `${nights} nights at your nightly range`],
      ["Fuel", fuel * 0.92, fuel * 1.08, `${Math.round(miles)} mi at ${v.mpg} MPG, $${v.fuelPrice.toFixed(2)}/gal ±8%`],
      ["Food", food[0], food[1], `${trip.days.length} days at about $${D.foodPerDay}/day`],
      ["Attractions", attractions[0], attractions[1], "placeholder; replace with real admission prices"],
      ["Contingency (10%)", baseLow * 0.1, baseHigh * 0.1, ""]],
      total: [baseLow * 1.1, baseHigh * 1.1], cap: profile.rules.budgetCap };
  };

  // ---------- cruise port day ----------
  /* A day in port: the ship docks at `arrive`, everyone must be aboard `buffer` minutes
     before `depart`. The plan fits places between the two, three ways: a cruise-line
     excursion, a private driver or taxi, and a rental car. Times and prices are
     estimates (docs/LIMITS.md). Excursion pages were opened and checked 2026-10-17
     (docs/catalog-check.md). */
  RT.CRUISE_LINES = [
    ["Royal Caribbean", "https://www.royalcaribbean.com/booked/shore-excursions"],
    ["Carnival", "https://www.carnival.com/shore-excursions"],
    ["Norwegian", "https://www.ncl.com/shore-excursions"],
    ["Princess", "https://www.princess.com/shore-excursions"],
    ["Holland America", "https://www.hollandamerica.com/en/sf/shorex"],
    ["Celebrity", "https://www.celebritycruises.com/booked/excursions"],
    ["Disney", "https://disneycruise.disney.go.com/why-cruise-disney/whats-included-in-cruise/port-adventures/"],
    ["Viking", "https://www.vikingcruises.com/oceans/why-viking/shore-excursions"],
    ["MSC", "https://www.msccruisesusa.com/excursions"]
  ];
  // Cruise lines list a port as tender, dock, or either depending on the call, so the
  // app says "usually" or "may" and tells the traveler to confirm with the ship.
  RT.TENDER = {
    tender: ["Tender port", "Ships usually anchor offshore and small boats carry guests to land. Allow extra time each way, and expect lines for the boats."],
    varies: ["May be a tender port", "Some calls dock at a pier and some anchor and use tenders. Check your ship's daily schedule before you plan the day."],
    pier: ["Pier", "Ships usually dock at a pier here. Confirm on your ship's schedule."],
    unknown: ["Dock or tender not confirmed", "The sources I checked do not say. Confirm on your ship's schedule."]
  };
  RT.TENDER_MIN = { tender: 30, varies: 15, pier: 0, unknown: 15 }; // extra minutes each way
  RT.DISEMBARK_MIN = 15;
  RT.portLegMin = (a, b) => Math.max(8, Math.round(haversineMi(a, b) * 1.3 / 30 * 60)); // about 30 mph on port roads
  const PORT_PLANS = [
    { key: "excursion", label: "Cruise excursion", lead: 15, tail: 0, per: 0 },
    { key: "driver", label: "Private driver or taxi", lead: 10, tail: 0, per: 5 },
    { key: "rental", label: "Rental car", lead: 35, tail: 25, per: 10 }
  ];
  const fitPort = (profile, port, cfg, start, back) => {
    const pool = port.stops.slice(), hits = s => s[5].filter(k => profile.interests.includes(k)).length;
    const home = [port.lat, port.lon], limit = back - cfg.tail, cap = Math.max(2, profile.rules.stopsPerDay || 3) + 1;
    // Places that match a picked interest come first. When they run out, the nearest
    // other places fill the day and say so (`extra`), so the plan never looks like a
    // match it is not.
    const picked = profile.interests.length > 0;
    let t = start + cfg.lead, cur = home; const stops = [], extra = [];
    while (pool.length && stops.length < cap) {
      let best = null;
      pool.forEach(s => {
        const leg = RT.portLegMin(cur, [s[2], s[3]]), ret = RT.portLegMin([s[2], s[3]], home);
        if (t + leg + s[4] + cfg.per + ret > limit) return;
        const h = hits(s), score = h ? 100000 + h * 1000 - leg : -leg; // any match before any filler
        if (!best || score > best.score) best = { s, leg, score };
      });
      if (!best) break;
      pool.splice(pool.indexOf(best.s), 1);
      t += best.leg; const arr = t; t += best.s[4];
      const fill = picked && !hits(best.s);
      stops.push(mkStop(best.s[0], best.s[1], best.s[2], best.s[3], { type: typeOf(best.s), arrive: fromMin(arr), depart: fromMin(t), minutes: best.s[4], state: "", notes: fill ? RT.PORT_FILL_NOTE : "" }));
      extra.push(fill);
      t += cfg.per; cur = [best.s[2], best.s[3]];
    }
    const end = stops.length ? t + RT.portLegMin(cur, home) + cfg.tail : start;
    return { stops, extra, endMin: Math.round(end) };
  };
  RT.PORT_FILL_NOTE = "Not one of your picked interests: added to fill the day.";
  RT.portDay = (profile, port, o) => {
    const arrive = toMin(o.arrive), depart = toMin(o.depart), buffer = Number.isFinite(+o.buffer) ? +o.buffer : 30;
    const extra = RT.TENDER_MIN[port.tender] ?? 15, start = arrive + RT.DISEMBARK_MIN + extra, back = depart - buffer - extra;
    const res = { port, buffer, ashore: fromMin(start), backBy: fromMin(Math.max(0, back)), windowMin: back - start, plans: [], warnings: [] };
    if (arrive == null || depart == null || depart <= arrive) { res.windowMin = 0; res.warnings.push("Departure must be later than arrival on the same day."); return res; }
    if (res.windowMin < 60) { res.warnings.push(`Only ${Math.max(0, res.windowMin)} minutes ashore after getting off the ship and allowing ${buffer} minutes to be back. Stay near the pier.`); return res; }
    if (res.windowMin < 240) res.warnings.push(`A short day: about ${Math.floor(res.windowMin / 60)} h ${res.windowMin % 60} min ashore. Pick one or two places.`);
    const tn = RT.TENDER[port.tender] || RT.TENDER.unknown;
    if (extra) res.warnings.push(port.tender === "tender" ? `The plan adds ${extra} minutes each way for the boat.`
      : `The plan adds ${extra} minutes each way in case the ship uses tender boats.`);
    PORT_PLANS.forEach(cfg => {
      const fit = fitPort(profile, port, cfg, start, back), away = Math.max(1, (fit.endMin - start) / 60);
      const cost = cfg.key === "driver" ? [Math.round(away * 55), Math.round(away * 95)] : cfg.key === "rental" ? [65, 130] : null;
      res.plans.push({ key: cfg.key, label: cfg.label, stops: fit.stops, extra: fit.extra, endMin: fit.endMin, backAboard: fromMin(fit.endMin), spareMin: back - fit.endMin, cost, hoursAway: Math.round(away * 10) / 10 });
    });
    if (port.left) res.warnings.push("Traffic drives on the left here. Check the rental company's rules for visitors.");
    return res;
  };
  /* The chosen plan as a one-day trip (ship, places, ship) so Navigate, the saved
     itinerary, calendar, and CSV work like any trip. */
  RT.portTrip = (profile, port, o, date, planKey) => {
    const day = RT.portDay(profile, port, o), plan = day.plans.find(p => p.key === planKey) || day.plans[1];
    if (!plan) return null;
    // The address is the coordinates, so Google Maps opens the pier area and not a guess from a name.
    const ship = extra => mkStop("Ship at " + port.name, `${port.lat},${port.lon}`, port.lat, port.lon, { type: "Ship", ...extra });
    const stops = [ship({ depart: fromMin(toMin(o.arrive) + RT.DISEMBARK_MIN + (RT.TENDER_MIN[port.tender] ?? 15)), notes: `Pier area at ${port.address}. Confirm your ship's berth on its daily schedule.` }), ...plan.stops, ship({ arrive: plan.backAboard, notes: `All aboard by ${hm12(fromMin(toMin(o.depart) - day.buffer))}; the ship leaves at ${hm12(o.depart)}.` })];
    return { name: `${port.name} port day`, destId: "port:" + port.id, states: [], fly: false, base: { name: "Ship", addr: port.address, lat: port.lat, lon: port.lon }, days: [{ date, title: `${port.name}: ${plan.label}`, stops }], createdBy: "cruise", cruise: { portId: port.id, arrive: o.arrive, depart: o.depart, buffer: day.buffer, plan: plan.key, line: o.line || "" } };
  };
  RT.portLinks = (port, line) => {
    const q = encodeURIComponent, found = RT.CRUISE_LINES.find(l => l[0] === line);
    const lines = found ? [found] : RT.CRUISE_LINES;
    return {
      lines: lines.map(l => ({ label: `${l[0]} shore excursions`, url: l[1] })),
      lineSearch: `https://www.google.com/search?q=${q(`${found ? found[0] + " " : "cruise "}${port.name} shore excursions`)}`,
      independent: `https://www.google.com/search?q=${q(`${port.name} private shore excursion tour cruise passengers`)}`,
      rental: `https://www.google.com/maps/search/?api=1&query=${q(`car rental near ${port.name} cruise port`)}`,
      taxi: `https://www.google.com/maps/search/?api=1&query=${q(`taxi or private driver near ${port.name} cruise port`)}`,
      // Tour marketplaces; search address format checked 2026-10-17 (Cozumel, Skagway).
      tours: [
        { label: "Viator", url: `https://www.viator.com/searchResults/all?text=${q(`${port.name} shore excursions`)}` },
        { label: "GetYourGuide", url: `https://www.getyourguide.com/s/?q=${q(`${port.name} shore excursions`)}` }
      ]
    };
  };
  /* Countries and territories that drive on the left, as ISO 3166 codes, from the table
     in the Wikipedia article "Left- and right-hand traffic" (read 2026-10-20; see
     docs/catalog-check.md). A port in one of them gets the rental-car warning. */
  RT.LEFT_DRIVING = new Set(["ag", "ai", "au", "bb", "bd", "bm", "bn", "bs", "bt", "bw", "cc", "ck", "cx", "cy", "dm", "fj", "fk",
    "gb", "gd", "gg", "gs", "gy", "hk", "id", "ie", "im", "in", "je", "jm", "jp", "ke", "ki", "kn", "ky", "lc", "lk", "ls", "mo",
    "ms", "mt", "mu", "mv", "mw", "my", "mz", "na", "nf", "np", "nr", "nu", "nz", "pg", "pk", "pn", "sb", "sc", "sg", "sh", "sr",
    "sz", "tc", "th", "tl", "to", "tt", "tv", "tz", "ug", "vc", "vg", "vi", "ws", "za", "zm", "zw"]);
  /* Typed text that names a listed port ("Montego Bay Jamaica", "Rome", "St Thomas",
     "Civitavecchia Italy", "Halifax, Nova Scotia") picks that port. A key is the port's
     name, the part of the name before "(" or ",", or another name it goes by (`aka`).
     The key must appear whole in the text, and every other word typed must belong to
     the port's own names, address, area, or country, or be a word such as "cruise" or
     "port", so "Falmouth, England" does not pick Falmouth, Jamaica and a country alone
     ("Jamaica") picks no port. A full name or aka beats a shortened name; text that
     fits two ports equally picks neither. */
  const portKey = s => cityKey(String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, " "));
  const PORT_FILLER = new Set(["cruise", "cruises", "port", "ports", "terminal", "pier", "harbor", "harbour", "dock", "the", "of", "in", "at", "island", "islands", "isle", "city", "usa", "us", "united", "states"]);
  const portKeys = p => {
    const full = [p.name, ...(p.aka || [])].map(n => [portKey(n), 1000]);
    const base = [p.name.split(" (")[0], p.name.split(", ")[0]].map(n => [portKey(n), 500]);
    return [...full, ...base].filter(k => k[0]);
  };
  RT.matchPort = (text, ports) => {
    const q = portKey(text); if (!q) return null;
    let best = null, bestLen = 0, tie = false;
    ports.forEach(p => {
      const own = new Set(portKey([p.name, p.country, p.address, p.area, ...(p.aka || [])].join(" ")).split(" "));
      const st = window.RT_STATE_BY_NAME || {};
      String(p.country || "").split(",").forEach(w => { const s = st[w.trim().toLowerCase()]; if (s) own.add(s.abbr.toLowerCase()); });
      portKeys(p).forEach(([k, bonus]) => {
        let len = 0;
        if (k === q) len = k.length + bonus;
        else if (k.length >= 2 && ` ${q} `.includes(` ${k} `)) {
          const rest = ` ${q} `.replace(` ${k} `, " ").trim().split(" ").filter(Boolean);
          if (rest.every(w => own.has(w) || PORT_FILLER.has(w))) len = k.length + bonus / 10;
        }
        if (!len) return;
        if (len > bestLen) { best = p; bestLen = len; tie = false; } else if (len === bestLen && best !== p) tie = true;
      });
    });
    return tie ? null : best;
  };
  /* A port that is not listed, from a map lookup. Places come from listed ports in the
     same country and, in the US, from the road-trip catalog, within about an hour's
     drive in a straight line (RT.CITY_REACH_H). The map gives territories their parent
     country's code (US Virgin Islands "us", Hong Kong "cn"), so a listed port within
     30 km lends its own code. Straight lines can cross water: the Cruise Day page says
     to check each place can be reached. `place` is {label, lat, lon, cc}. */
  const CC_PARENT = { vi: "us", pr: "us", gu: "us", mq: "fr", gp: "fr", bl: "fr", mf: "fr", pf: "fr", nc: "fr", re: "fr", cw: "nl", bq: "nl", aw: "nl", sx: "nl", hk: "cn", mo: "cn" };
  const ccRoot = c => CC_PARENT[c] || c;
  RT.typedPort = (place, catalog, ports) => {
    const at = [+place.lat, +place.lon], seen = new Set(), stops = [];
    let cc = String(place.cc || "").toLowerCase();
    const near = ports.map(p => [haversineMi(at, [p.lat, p.lon]) * 1.609, p]).sort((a, b) => a[0] - b[0])[0];
    if (near && near[0] <= 30 && (!cc || ccRoot(near[1].cc) === ccRoot(cc))) cc = near[1].cc;
    const add = s => { if (seen.has(s[0]) || estDriveHours(at, [s[2], s[3]]) > RT.CITY_REACH_H) return; seen.add(s[0]); stops.push(s); };
    ports.filter(p => !cc || ccRoot(p.cc) === ccRoot(cc)).forEach(p => p.stops.forEach(add));
    if (!cc || ccRoot(cc) === "us") catalog.filter(d => !d.fly).forEach(d => d.stops.forEach(add));
    const label = String(place.label);
    return { id: "typed", name: label, region: "Your port", country: "", cc, tender: "unknown", left: RT.LEFT_DRIVING.has(cc), address: label, lat: at[0], lon: at[1], stops };
  };

  // ---------- exports ----------
  const esc = x => String(x ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  RT.esc = esc;
  /* A trip the AI drafted before v0.8.0 has no per-stop marks: mark every stop except
     home once, so the screen and every export say AI, and remember that it was guessed. */
  RT.markLegacyAI = t => {
    if (!t || t.createdBy !== "ai" || t.aiMarked) return false;
    t.days.forEach(d => { d.ai = true; d.stops.forEach(s => { if (!/^home$/i.test(s.type || "") && !/^home$/i.test(s.name || "")) s.ai = true; }); });
    t.aiMarked = true; t.aiLegacy = true; return true;
  };
  // " (AI)" after the name of a stop the AI model wrote, in every export.
  const aiMark = s => s.ai ? " (AI)" : "";
  RT.aiMark = aiMark;
  RT.stopListMd = trip => ["| # | Day | Time | Stop | Address |", "|---|---|---|---|---|", ...RT.allStops(trip).map(({ n, day, s }) => `| ${n} | ${dayLabel(day.date)} | ${hm12(s.arrive || s.depart)} | ${s.name}${aiMark(s)} | ${s.address} |`)].join("\n");
  RT.csv = trip => { const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`; return ["Name,Day,Time,Type,Address,Latitude,Longitude", ...RT.allStops(trip).map(({ n, day, s }) => [q(`${n}. ${s.name}${aiMark(s)}`), q(dayLabel(day.date)), q(hm12(s.arrive || s.depart)), q(s.type), q(s.address), s.lat ?? "", s.lon ?? ""].join(","))].join("\r\n"); };
  RT.ics = (trip, tzGuess) => {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
    const icsEsc = x => String(x).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
    const ev = RT.allStops(trip).filter(o => o.s.arrive).map(({ n, day, s }) => {
      const tzid = day.tz || tzGuess;
      const dt = t => `${day.date.replace(/-/g, "")}T${t.replace(":", "")}00`;
      const start = `DTSTART${tzid ? `;TZID=${tzid}` : ""}:${dt(s.arrive)}`;
      const end = `DTEND${tzid ? `;TZID=${tzid}` : ""}:${dt(s.depart && toMin(s.depart) >= toMin(s.arrive) ? s.depart : s.arrive)}`;
      return ["BEGIN:VEVENT", `UID:${day.date}-${n}@road-trip-planner`, `DTSTAMP:${stamp}`, start, end, `SUMMARY:${icsEsc(s.name + aiMark(s))}`, `LOCATION:${icsEsc(s.address)}`, "END:VEVENT"].join("\r\n");
    });
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//road-trip-planner//EN", ...ev, "END:VCALENDAR", ""].join("\r\n");
  };
  RT.kmlDay = (trip, i, route) => {
    const d = trip.days[i]; const title = `Day ${i + 1} route: ${d.title} (${dayLabel(d.date)})`;
    const line = route ? `<Placemark><name>${esc(title)}</name><styleUrl>#route</styleUrl><LineString><tessellate>1</tessellate><coordinates>${route.geometry.map(([x, y]) => `${x.toFixed(6)},${y.toFixed(6)},0`).join(" ")}</coordinates></LineString></Placemark>` : "";
    const pts = d.stops.filter(hasXY).map(s => `<Placemark><name>${esc(s.name + aiMark(s))}</name><description>${esc(s.address)}</description><Point><coordinates>${s.lon},${s.lat},0</coordinates></Point></Placemark>`).join("");
    return `<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>${esc(title)}</name><Style id="route"><LineStyle><color>ffe8731a</color><width>5</width></LineStyle></Style>${line}${pts}</Document></kml>`;
  };
  RT.tripJson = (trip, profile) => JSON.stringify({ format: "road-trip-planner/1", trip, rules: profile.rules }, null, 2);
})();
