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
    traveler: "", home: { label: "", lat: null, lon: null, state: "" }, party: 1,
    vehicle: { mpg: 25, heightIn: 0, fuelPrice: 3.25 },
    rules: { maxDriveHours: 7, budgetCap: 1500, walkMiles: 5, nightsMin: 3, nightsMax: 7, checkinTarget: "15:00", checkinWindow: 60, ticketMargin: 30, arriveBeforeSunset: true, startTime: "08:30" },
    lodging: { brand: "Any", nightlyLow: 120, nightlyHigh: 180, freeBreakfast: true },
    dining: { diet: "No restriction", upscaleDinners: 1, lunchCap: 30, foodPerDay: 55 },
    interests: ["scenic"], months: [], flyOk: false, visited: [], aiKey: "", aiModel: "claude-sonnet-5-5"
  });

  // ---------- destination scoring ----------
  RT.scoreDestinations = (profile, catalog, month) => {
    const home = profile.home.lat != null ? [profile.home.lat, profile.home.lon] : null;
    const visited = new Set(profile.visited || []);
    return catalog.map(d => {
      const reasons = [];
      let score = 0;
      const hit = d.tags.filter(t => profile.interests.includes(t));
      score += hit.length * 12;
      if (hit.length) reasons.push(`matches ${hit.join(", ")}`);
      const stopHits = d.stops.reduce((n, s) => n + s[5].filter(t => profile.interests.includes(t)).length, 0);
      score += Math.min(stopHits, 8) * 2;
      if (month) {
        if (d.months.includes(month)) { score += 15; reasons.push("in season"); }
        else { score -= 30; reasons.push("off season for the month chosen"); }
      }
      const newStates = d.states.filter(s => !visited.has(s));
      score += newStates.length * 6;
      if (newStates.length) reasons.push(`adds ${newStates.join(", ")}`);
      let driveH = null;
      if (d.fly) {
        if (!profile.flyOk) { score -= 100; reasons.push("needs a flight"); } else reasons.push("fly and drive");
      } else if (home) {
        driveH = estDriveHours(home, [d.base[1], d.base[2]]);
        const days = Math.ceil(driveH / profile.rules.maxDriveHours);
        if (days > Math.floor(profile.rules.nightsMax / 2)) { score -= 40; reasons.push(`about ${Math.round(driveH)} h away, too far for ${profile.rules.nightsMax} nights`); }
        else { score += Math.max(0, 20 - driveH * 1.5); reasons.push(`about ${Math.round(driveH)} h drive each way (estimate)`); }
      }
      return { dest: d, score: Math.round(score), driveH, reasons };
    }).sort((a, b) => b.score - a.score);
  };

  // ---------- itinerary drafting ----------
  const mkStop = (name, address, lat, lon, extra = {}) => ({ name, address, lat, lon, type: extra.type || "Stop", arrive: extra.arrive || "", depart: extra.depart || "", checkin: !!extra.checkin, timed_entry: extra.timed_entry || "", booking_url: extra.booking_url || "", notes: extra.notes || "", minutes: extra.minutes || 0, state: extra.state || "" });
  RT.mkStop = mkStop;

  // Order stops by nearest neighbor starting from a point.
  const nearestOrder = (start, items) => { const left = items.slice(), out = []; let cur = start; while (left.length) { let bi = 0, bd = Infinity; left.forEach((s, i) => { const d = haversineMi(cur, [s[2], s[3]]); if (d < bd) { bd = d; bi = i; } }); const nx = left.splice(bi, 1)[0]; out.push(nx); cur = [nx[2], nx[3]]; } return out; };

  /* Draft a trip: drive days to and from the base, then sightseeing days that fill
     with catalog stops until the day's time runs out, with check-in near the target. */
  RT.draftTrip = (profile, dest, startDate, nights) => {
    const r = profile.rules, home = profile.home;
    const homeStop = extra => mkStop("Home", home.label, home.lat, home.lon, { type: "Home", state: home.state, ...extra });
    const base = { name: `Lodging near ${dest.base[0]}`, addr: dest.base[0], lat: dest.base[1], lon: dest.base[2] };
    const hotel = extra => mkStop(base.name, base.addr, base.lat, base.lon, { type: "Hotel", state: dest.states[0], booking_url: RT.lodgingSearchUrl(profile.lodging.brand, base.addr, base.lat, base.lon), ...extra });
    const driveH = dest.fly ? 0 : estDriveHours([home.lat, home.lon], [base.lat, base.lon]);
    const travelDays = dest.fly ? 0 : Math.max(1, Math.ceil(driveH / r.maxDriveHours));
    const pool = nearestOrder([base.lat, base.lon], dest.stops.filter(s => s[5].some(t => profile.interests.includes(t))).concat(dest.stops.filter(s => !s[5].some(t => profile.interests.includes(t)))));
    const days = [];
    let date = startDate, used = 0;
    const typeOf = s => s[5][0] ? s[5][0][0].toUpperCase() + s[5][0].slice(1) : "Stop";
    // Add pool stops after `from` while time allows; returns {stops, t, cur}.
    const fill = (from, t, endMin, maxStops) => {
      const stops = []; let cur = from, driveMin = 0;
      while (pool.length && stops.length < maxStops) {
        const s = pool[0];
        const legMin = estDriveHours(cur, [s[2], s[3]]) * 60;
        const back = estDriveHours([s[2], s[3]], [base.lat, base.lon]) * 60;
        if (t + legMin + s[4] + back > endMin || (driveMin + legMin + back) / 60 > r.maxDriveHours) break;
        pool.shift();
        t += legMin; const arr = t; t += s[4]; driveMin += legMin;
        stops.push(mkStop(s[0], s[1], s[2], s[3], { type: typeOf(s), arrive: fromMin(arr), depart: fromMin(t), minutes: s[4], state: dest.states[0] }));
        cur = [s[2], s[3]];
      }
      return { stops, t, cur };
    };
    const checkinMin = toMin(r.checkinTarget);
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
          // Early arrival: see nearby sights first so check-in lands near the target.
          const f = fill([base.lat, base.lon], arrive, checkinMin + 30, 3);
          mid = f.stops; if (mid.length) arrive = f.t + estDriveHours(f.cur, [base.lat, base.lon]) * 60;
        }
        const s1 = last ? hotel({ arrive: fromMin(arrive), checkin: true }) : mkStop("Overnight en route", "En route (choose a town)", null, null, { type: "Hotel", arrive: fromMin(arrive), checkin: true });
        days.push({ date, title: last ? `Drive to ${dest.base[0]}` : `Drive toward ${dest.base[0]}`, stops: [s0, ...mid, s1] });
        date = addDays(date, 1); used++;
      }
    }
    // sightseeing days: spread the remaining stops evenly; days without stops stay open
    const sightDays = Math.max(1, nights + 1 - used - (dest.fly ? 0 : travelDays));
    for (let k = 0; k < sightDays; k++) {
      const perDay = Math.ceil(pool.length / (sightDays - k)) || 0;
      const f = fill([base.lat, base.lon], toMin(r.startTime), checkinMin + 180, perDay);
      const back = f.t + estDriveHours(f.cur, [base.lat, base.lon]) * 60;
      const open = !f.stops.length;
      const stops = [hotel({ depart: r.startTime }), ...f.stops, hotel(open ? { notes: "Open day: add stops with the search box below." } : { arrive: fromMin(back) })];
      days.push({ date, title: open ? `Open day near ${dest.base[0]}` : `${dest.name}, day ${k + 1}`, stops });
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
    return { name: `${dest.name} Road Trip`, destId: dest.id, states: dest.states.slice(), fly: !!dest.fly, days, createdBy: "catalog" };
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
