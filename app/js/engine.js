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
  // across interstates and slower roads. Route check replaces this with routed times.
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
    interests: ["scenic", "parks", "food"], months: [], flyOk: false, visited: [], destState: "", aiKey: "", aiModel: "claude-sonnet-5-5"
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

  // ---------- destination scoring ----------
  const INTEREST_NAMES = { scenic: "scenic drives", parks: "parks", waterfalls: "waterfalls", beach: "beaches", fishing: "fishing", water: "water sports", history: "history", food: "food", lights: "lights and festivals", hiking: "easy hikes", caves: "caves", town: "small towns" };
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
      score = Math.round(score);
      const label = flight && !profile.flyOk ? "Needs a flight" : far ? "Far for this trip" : off ? "Out of season" : score >= 50 ? "Great fit" : score >= 30 ? "Good fit" : "Possible";
      return { dest: d, city: d.base[0], score, driveH, reasons, label, stopsRanked };
    }).sort((a, b) => b.score - a.score);
    out.forEach((r, i) => r.rank = i + 1);
    return out;
  };

  // ---------- itinerary drafting ----------
  const mkStop = (name, address, lat, lon, extra = {}) => ({ name, address, lat, lon, type: extra.type || "Stop", arrive: extra.arrive || "", depart: extra.depart || "", checkin: !!extra.checkin, timed_entry: extra.timed_entry || "", booking_url: extra.booking_url || "", notes: extra.notes || "", minutes: extra.minutes || 0, state: extra.state || "" });
  RT.mkStop = mkStop;

  // Order stops by nearest neighbor starting from a point.
  const nearestOrder = (start, items) => { const left = items.slice(), out = []; let cur = start; while (left.length) { let bi = 0, bd = Infinity; left.forEach((s, i) => { const d = haversineMi(cur, [s[2], s[3]]); if (d < bd) { bd = d; bi = i; } }); const nx = left.splice(bi, 1)[0]; out.push(nx); cur = [nx[2], nx[3]]; } return out; };

  /* Draft a trip: drive days to and from the base, then sightseeing days that fill
     with catalog stops until the day's time runs out, with check-in near the target. */
  const typeOf = s => s[5][0] ? s[5][0][0].toUpperCase() + s[5][0].slice(1) : "Stop";
  const orderForProfile = (profile, from, stops) => nearestOrder(from, stops.filter(s => s[5].some(t => profile.interests.includes(t))).concat(stops.filter(s => !s[5].some(t => profile.interests.includes(t)))));
  /* Add stops from `pool` after `from` while the day has time and driving left.
     Mutates pool. Returns {stops, t, cur}. */
  const fillDay = (profile, pool, base, from, t, endMin, maxStops, state) => {
    const r = profile.rules, stops = []; let cur = from, driveMin = 0;
    while (pool.length && stops.length < maxStops) {
      const s = pool[0];
      const legMin = estDriveHours(cur, [s[2], s[3]]) * 60;
      const back = estDriveHours([s[2], s[3]], [base.lat, base.lon]) * 60;
      if (t + legMin + s[4] + back > endMin || (driveMin + legMin + back) / 60 > r.maxDriveHours) break;
      pool.shift();
      t += legMin; const arr = t; t += s[4]; driveMin += legMin;
      stops.push(mkStop(s[0], s[1], s[2], s[3], { type: typeOf(s), arrive: fromMin(arr), depart: fromMin(t), minutes: s[4], state }));
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
    return catalog.filter(d => d.id !== trip.destId && !d.fly).map(d => {
      const h = estDriveHours([b.lat, b.lon], [d.base[1], d.base[2]]);
      const hits = d.stops.reduce((n, s) => n + s[5].filter(t => profile.interests.includes(t)).length, 0);
      return { dest: d, hours: h, hits };
    }).filter(x => x.hours * 2 <= profile.rules.maxDriveHours - 1).sort((a, b) => (b.hits - a.hits) || (a.hours - b.hours));
  };
  const freeNote = (trip, catalog, profile) => {
    const near = catalog ? RT.nearbyDestinations(trip, catalog, profile).slice(0, 3) : [];
    return near.length ? `Free day. Ideas within reach: ${near.map(n => `${n.dest.name} (${hoursText(n.hours)} away)`).join("; ")}. Use "Add a day trip" below, or search for your own stops.` : "Free day: add stops with the search box below.";
  };

  /* Draft a trip: drive days to and from the base, then sightseeing days packed to
     the pace's stops per day; days left over become free days with nearby ideas. */
  RT.draftTrip = (profile, dest, startDate, nights, catalog) => {
    const r = profile.rules, home = profile.home, perDay = r.stopsPerDay || 3;
    const homeStop = extra => mkStop("Home", home.label, home.lat, home.lon, { type: "Home", state: home.state, ...extra });
    const base = { name: `Lodging near ${dest.base[0]}`, addr: dest.base[0], lat: dest.base[1], lon: dest.base[2] };
    const hotel = extra => mkStop(base.name, base.addr, base.lat, base.lon, { type: "Hotel", state: dest.states[0], booking_url: RT.lodgingSearchUrl(profile.lodging.brand, base.addr, base.lat, base.lon), ...extra });
    const driveH = dest.fly ? 0 : estDriveHours([home.lat, home.lon], [base.lat, base.lon]);
    const travelDays = dest.fly ? 0 : Math.max(1, Math.ceil(driveH / r.maxDriveHours));
    const pool = orderForProfile(profile, [base.lat, base.lon], dest.stops);
    const days = [];
    let date = startDate, used = 0;
    const fill = (from, t, endMin, maxStops) => fillDay(profile, pool, base, from, t, endMin, maxStops, dest.states[0]);
    const checkinMin = toMin(r.checkinTarget);
    const trip = { name: `${dest.name} Road Trip`, destId: dest.id, states: dest.states.slice(), fly: !!dest.fly, base, days, createdBy: "catalog" };
    // outbound
    if (!dest.fly) {
      const legH = driveH / travelDays;
      for (let k = 0; k < travelDays; k++) {
        const startT = toMin(r.startTime);
        let arrive = startT + legH * 60 + (legH > 3 ? 60 : 0); // an hour for fuel and lunch on long legs
        const last = k === travelDays - 1;
        const s0 = k === 0 ? homeStop({ depart: r.startTime }) : mkStop("Overnight en route", "En route (choose a town)", null, null, { type: "Hotel", depart: r.startTime });
        let mid = [];
        if (last && arrive < checkinMin - r.checkinWindow) {
          // Early arrival: see sights on the way in until the check-in window.
          const f = fill([base.lat, base.lon], arrive, checkinMin + r.checkinWindow, perDay);
          mid = f.stops; if (mid.length) arrive = f.t + estDriveHours(f.cur, [base.lat, base.lon]) * 60;
        }
        const s1 = last ? hotel({ arrive: fromMin(arrive), checkin: true }) : mkStop("Overnight en route", "En route (choose a town)", null, null, { type: "Hotel", arrive: fromMin(arrive), checkin: true });
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
        const s0 = first ? hotel({ depart: r.startTime }) : mkStop("Overnight en route", "En route (choose a town)", null, null, { type: "Hotel", depart: r.startTime });
        const s1 = last ? homeStop({ arrive: fromMin(arrive) }) : mkStop("Overnight en route", "En route (choose a town)", null, null, { type: "Hotel", arrive: fromMin(arrive), checkin: true });
        days.push({ date, title: last ? "Drive home" : "Drive toward home", stops: [s0, s1] });
        date = addDays(date, 1);
      }
    }
    return trip;
  };

  /* Turn free days into day trips to another catalog destination. Returns the
     number of days filled. */
  RT.fillFreeDays = (trip, profile, near) => {
    if (!near || !trip.base) return 0;
    const d2 = near.dest, r = profile.rules, base = trip.base, perDay = r.stopsPerDay || 3;
    const pool = orderForProfile(profile, [base.lat, base.lon], d2.stops);
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

  /* Rebuild one day's times from routed legs: keep the first departure and each
     stop's time on site (its minutes, or its current arrive-to-depart span). */
  RT.retimeDay = (day, route) => {
    if (!route || route.legs.length !== day.stops.length - 1) return false;
    const st = day.stops; let t = toMin(st[0].depart || "08:30");
    for (let k = 1; k < st.length; k++) {
      const s = st[k];
      const stay = s.minutes || (s.arrive && s.depart ? Math.max(0, toMin(s.depart) - toMin(s.arrive)) : 0);
      t += route.legs[k - 1].seconds / 60;
      s.arrive = fromMin(Math.ceil(t / 5) * 5);
      t = toMin(s.arrive);
      if (k < st.length - 1) { t += stay; s.depart = fromMin(t); }
    }
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
  RT.localHM = (instant, tz, lon) => { if (tz) { try { return instant.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" }); } catch (e) { /* fall through */ } } const off = Math.round(lon / 15); const m = instant.getUTCHours() * 60 + instant.getUTCMinutes() + off * 60 + (isDST(instant) ? 60 : 0); return fromMin(((m % 1440) + 1440) % 1440); };
  const isDST = d => { const y = d.getUTCFullYear(); const mar = new Date(Date.UTC(y, 2, 8)); const s = new Date(Date.UTC(y, 2, 8 + (7 - mar.getUTCDay()) % 7, 7)); const nov = new Date(Date.UTC(y, 10, 1)); const e = new Date(Date.UTC(y, 10, 1 + (7 - nov.getUTCDay()) % 7, 6)); return d >= s && d < e; };

  // ---------- plan checker ----------
  RT.checkTrip = (trip, profile, routes = {}) => {
    const r = profile.rules, out = [];
    const add = (level, day, check, msg) => out.push({ level, day: dayLabel(day.date), check, msg });
    trip.days.forEach((day, i) => {
      const st = day.stops;
      st.forEach(s => { if (s.arrive && s.depart && toMin(s.depart) < toMin(s.arrive)) add("ERROR", day, "order", `${s.name}: departs ${hm12(s.depart)} before arriving ${hm12(s.arrive)}`); });
      for (let k = 1; k < st.length; k++) { const a = st[k - 1], b = st[k]; if (a.depart && b.arrive && toMin(b.arrive) < toMin(a.depart)) add("ERROR", day, "order", `${b.name} arrival ${hm12(b.arrive)} is before leaving ${a.name} at ${hm12(a.depart)}`); }
      const route = routes[day.date];
      if (route && route.legs.length === st.length - 1) {
        route.legs.forEach((leg, k) => { const a = st[k], b = st[k + 1]; if (a.depart && b.arrive) { const gap = toMin(b.arrive) - toMin(a.depart), need = leg.seconds / 60; if (gap + 10 < need) add("ERROR", day, "travel", `${a.name} to ${b.name} needs about ${Math.round(need)} min of driving; the plan allows ${gap} min`); } });
        const h = route.legs.reduce((x, l) => x + l.seconds, 0) / 3600, mi = route.legs.reduce((x, l) => x + l.meters, 0) / 1609.344;
        if (h > r.maxDriveHours) add("ERROR", day, "drive cap", `${h.toFixed(1)} h routed driving exceeds the ${r.maxDriveHours} h cap (${Math.round(mi)} mi)`);
        else if (h > r.maxDriveHours - 0.5) add("WARN", day, "drive cap", `${h.toFixed(1)} h is within 30 min of the cap; routing has no traffic data`);
      } else if (!route) {
        let est = 0; for (let k = 1; k < st.length; k++) { const a = st[k - 1], b = st[k]; if (hasXY(a) && hasXY(b)) est += estDriveHours([+a.lat, +a.lon], [+b.lat, +b.lon]); }
        if (est > r.maxDriveHours) add("WARN", day, "drive cap", `about ${est.toFixed(1)} h estimated driving; run Route check for routed times`);
      }
      st.forEach(s => { if (s.checkin && s.arrive) { const diff = toMin(s.arrive) - toMin(r.checkinTarget); if (Math.abs(diff) > r.checkinWindow) add("WARN", day, "check-in", `${s.name} check-in ${hm12(s.arrive)} is ${Math.abs(diff)} min ${diff > 0 ? "after" : "before"} the ${hm12(r.checkinTarget)} target`); } });
      st.forEach(s => { if (s.timed_entry && s.arrive && toMin(s.arrive) > toMin(s.timed_entry) - r.ticketMargin) add("WARN", day, "tickets", `${s.name}: arrive ${hm12(s.arrive)} leaves less than ${r.ticketMargin} min before the ${hm12(s.timed_entry)} entry`); });
      if (r.arriveBeforeSunset) { const t = st.find(s => s.checkin) || st[st.length - 1]; if (t && t.arrive && hasXY(t)) { const ss = RT.sunsetLocal(day.date, +t.lat, +t.lon); if (ss) { const loc = RT.localHM(ss, day.tz, +t.lon); if (toMin(t.arrive) > toMin(loc)) add("WARN", day, "sunset", `arrive ${t.name} ${hm12(t.arrive)} after sunset (about ${hm12(loc)})`); } } }
      if (i > 0) { const pe = trip.days[i - 1].stops.slice(-1)[0], s0 = st[0]; if ((pe.address || "").trim().toLowerCase() !== (s0.address || "").trim().toLowerCase()) add("WARN", day, "continuity", `day starts at ${s0.name}, but the previous day ended at ${pe.name}`); }
      if (st.length - 2 > RT.MAX_WAYPOINTS) add("INFO", day, "links", `${st.length - 2} waypoints; the Google Maps link splits into legs (app limit ${RT.MAX_WAYPOINTS})`);
      st.forEach(s => { if (!hasXY(s)) add("INFO", day, "links", `${s.name} has no coordinates; Waze opens an address search`); });
      st.forEach(s => { if (/^En route/.test(s.address || "")) add("WARN", day, "lodging", `choose an overnight town for "${s.name}"`); });
    });
    return out;
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

  // ---------- exports ----------
  const esc = x => String(x ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  RT.esc = esc;
  RT.stopListMd = trip => ["| # | Day | Time | Stop | Address |", "|---|---|---|---|---|", ...RT.allStops(trip).map(({ n, day, s }) => `| ${n} | ${dayLabel(day.date)} | ${hm12(s.arrive || s.depart)} | ${s.name} | ${s.address} |`)].join("\n");
  RT.csv = trip => { const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`; return ["Name,Day,Time,Type,Address,Latitude,Longitude", ...RT.allStops(trip).map(({ n, day, s }) => [q(`${n}. ${s.name}`), q(dayLabel(day.date)), q(hm12(s.arrive || s.depart)), q(s.type), q(s.address), s.lat ?? "", s.lon ?? ""].join(","))].join("\r\n"); };
  RT.ics = (trip, tzGuess) => {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
    const icsEsc = x => String(x).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
    const ev = RT.allStops(trip).filter(o => o.s.arrive).map(({ n, day, s }) => {
      const tzid = day.tz || tzGuess;
      const dt = t => `${day.date.replace(/-/g, "")}T${t.replace(":", "")}00`;
      const start = `DTSTART${tzid ? `;TZID=${tzid}` : ""}:${dt(s.arrive)}`;
      const end = `DTEND${tzid ? `;TZID=${tzid}` : ""}:${dt(s.depart && toMin(s.depart) >= toMin(s.arrive) ? s.depart : s.arrive)}`;
      return ["BEGIN:VEVENT", `UID:${day.date}-${n}@road-trip-planner`, `DTSTAMP:${stamp}`, start, end, `SUMMARY:${icsEsc(s.name)}`, `LOCATION:${icsEsc(s.address)}`, "END:VEVENT"].join("\r\n");
    });
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//road-trip-planner//EN", ...ev, "END:VCALENDAR", ""].join("\r\n");
  };
  RT.kmlDay = (trip, i, route) => {
    const d = trip.days[i]; const title = `Day ${i + 1} route: ${d.title} (${dayLabel(d.date)})`;
    const line = route ? `<Placemark><name>${esc(title)}</name><styleUrl>#route</styleUrl><LineString><tessellate>1</tessellate><coordinates>${route.geometry.map(([x, y]) => `${x.toFixed(6)},${y.toFixed(6)},0`).join(" ")}</coordinates></LineString></Placemark>` : "";
    const pts = d.stops.filter(hasXY).map(s => `<Placemark><name>${esc(s.name)}</name><description>${esc(s.address)}</description><Point><coordinates>${s.lon},${s.lat},0</coordinates></Point></Placemark>`).join("");
    return `<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>${esc(title)}</name><Style id="route"><LineStyle><color>ffe8731a</color><width>5</width></LineStyle></Style>${line}${pts}</Document></kml>`;
  };
  RT.tripJson = (trip, profile) => JSON.stringify({ format: "road-trip-planner/1", trip, rules: profile.rules }, null, 2);
})();
