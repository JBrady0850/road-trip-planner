/* Road Trip Planner UI. Plain JavaScript, no build step, runs from a file, a local
   server, or any static host. Data stays in this browser (localStorage). */
(function () {
  const RT = window.RT, U = RT.util, esc = RT.esc;
  const KEY = "rtp:v1";
  const INTERESTS = [["scenic","Scenic drives and views"],["parks","National and state parks"],["waterfalls","Waterfalls"],["beach","Beaches"],["fishing","Fishing"],["water","Kayak, boat, and water sports"],["history","History and museums"],["food","Food and local dining"],["lights","Holiday lights and festivals"],["hiking","Easy hikes"],["caves","Caves"],["town","Small towns and shopping"]];
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DIETS = ["No restriction","Low carb or carnivore","Vegetarian","Vegan","Gluten free","Seafood friendly"];
  const STEPS = ["Traveler","Trip","Interests","Driving","Lodging and dining","Budget and states","Review"];

  // ---------- state ----------
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const saved = load();
  const st = RT.state = {
    profile: Object.assign(RT.defaultProfile(), saved.profile || {}),
    trip: saved.trip || null, routes: saved.routes || {}, weather: [], recs: [], findings: [],
    step: 0, tab: saved.trip ? "trip" : "interview", startDate: saved.startDate || nextFriday(), nights: saved.nights || 4, month: null, busy: ""
  };
  ["rules","vehicle","lodging","dining","home"].forEach(k => st.profile[k] = Object.assign(RT.defaultProfile()[k], (saved.profile || {})[k] || {}));
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify({ profile: st.profile, trip: st.trip, routes: st.routes, startDate: st.startDate, nights: st.nights })); } catch (e) { /* storage blocked: keep working in memory */ } };
  function nextFriday() { const d = new Date(); d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7) + 28); return d.toISOString().slice(0, 10); }

  // ---------- helpers ----------
  const $ = s => document.querySelector(s);
  const view = $("#view");
  const toast = msg => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 3200); };
  const money = n => "$" + Math.round(n).toLocaleString();
  const download = (name, text, type = "text/plain") => { const b = new Blob([text], { type }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); };
  const slug = s => (s || "trip").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const field = (label, inner, cls = "") => `<div class="field ${cls}"><label>${label}</label>${inner}</div>`;
  const num = (path, v, attrs = "") => `<input type="number" data-bind="${path}" value="${esc(v)}" ${attrs}>`;
  const getPath = p => p.split(".").reduce((o, k) => o?.[k], st);
  const setPath = (p, v) => { const ks = p.split("."); const last = ks.pop(); const o = ks.reduce((x, k) => x[k], st); o[last] = v; };
  const tripStates = () => { if (!st.trip) return []; const s = new Set(st.trip.states || []); if (st.profile.home.state) { const h = RT_STATE_BY_NAME[st.profile.home.state.toLowerCase()]; if (h) s.add(h.abbr); } return [...s]; };

  // ---------- tabs ----------
  function setTab(t) { st.tab = t; document.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.tab === t))); render(); view.focus(); window.scrollTo(0, 0); }
  $("#tabs").addEventListener("click", e => { const b = e.target.closest("button[data-tab]"); if (b) setTab(b.dataset.tab); });

  function render() {
    const fn = { interview: vInterview, destinations: vDestinations, trip: vTrip, navigate: vNavigate, weather: vWeather, budget: vBudget, tracker: vTracker, settings: vSettings }[st.tab];
    view.innerHTML = fn();
    persist();
  }

  // ---------- interview ----------
  function vInterview() {
    const p = st.profile, s = st.step;
    const steps = `<div class="steps">${STEPS.map((n, i) => `<span class="${i === s ? "on" : ""}">${i + 1}. ${n}</span>`).join("")}</div>`;
    let body = "";
    if (s === 0) body = `<h2>Who is traveling, and from where?</h2>
      <div class="row">${field("Your first name (optional)", `<input type="text" data-bind="profile.traveler" value="${esc(p.traveler)}">`)}
      ${field("Travelers in the vehicle", num("profile.party", p.party, 'min="1" max="9"'))}</div>
      ${field("Home city or address", `<div class="row"><input type="text" id="homeQ" value="${esc(p.home.label)}" placeholder="e.g. Knoxville, TN"><button class="btn" data-act="homeSearch">Find</button></div>`)}
      <div id="homeResults"></div>
      <p class="small muted">${p.home.lat != null ? `Home set: ${esc(p.home.label)} (${p.home.lat.toFixed(3)}, ${p.home.lon.toFixed(3)})` : "Home sets the starting point for every drive."}</p>`;
    if (s === 1) body = `<h2>When and how long?</h2>
      <div class="row">${field("Start date", `<input type="date" data-bind="startDate" value="${esc(st.startDate)}">`)}
      ${field("Nights", num("nights", st.nights, `min="1" max="21"`))}</div>
      <div class="row">${field("Shortest trip you like (nights)", num("profile.rules.nightsMin", p.rules.nightsMin, 'min="1"'))}
      ${field("Longest trip you like (nights)", num("profile.rules.nightsMax", p.rules.nightsMax, 'min="1"'))}</div>
      <label class="row"><input type="checkbox" data-bind="profile.flyOk" ${p.flyOk ? "checked" : ""}> Include fly-and-drive trips (Alaska, Hawaii)</label>`;
    if (s === 2) body = `<h2>What do you enjoy?</h2><p class="muted">Pick as many as you like. Destinations are scored on these.</p>
      <div class="chips">${INTERESTS.map(([k, l]) => `<button class="chip" data-act="interest" data-k="${k}" aria-pressed="${p.interests.includes(k)}">${l}</button>`).join("")}</div>
      ${field("Longest walk you want on one stop (miles, round trip)", num("profile.rules.walkMiles", p.rules.walkMiles, 'min="0" step="0.5"'))}`;
    if (s === 3) body = `<h2>Driving and vehicle</h2>
      <div class="row">${field("Most driving hours per day", num("profile.rules.maxDriveHours", p.rules.maxDriveHours, 'min="1" max="14" step="0.5"'))}
      ${field("Usual start time each morning", `<input type="time" data-bind="profile.rules.startTime" value="${esc(p.rules.startTime)}">`)}</div>
      <div class="row">${field("Vehicle fuel economy (MPG)", num("profile.vehicle.mpg", p.vehicle.mpg, 'min="5" max="80"'))}
      ${field("Fuel price ($ per gallon)", num("profile.vehicle.fuelPrice", p.vehicle.fuelPrice, 'min="1" step="0.05"'))}
      ${field("Vehicle height in inches (0 to skip)", num("profile.vehicle.heightIn", p.vehicle.heightIn, 'min="0" max="200"'))}</div>
      <label class="row"><input type="checkbox" data-bind="profile.rules.arriveBeforeSunset" ${p.rules.arriveBeforeSunset ? "checked" : ""}> Warn me when I would reach the hotel after sunset</label>`;
    if (s === 4) body = `<h2>Lodging and dining</h2>
      <div class="row">${field("Hotel brand", `<select data-bind="profile.lodging.brand">${RT.BRANDS.map(b => `<option ${b === p.lodging.brand ? "selected" : ""}>${b}</option>`).join("")}</select>`)}
      ${field("Nightly rate, low ($)", num("profile.lodging.nightlyLow", p.lodging.nightlyLow, 'min="0"'))}
      ${field("Nightly rate, high ($)", num("profile.lodging.nightlyHigh", p.lodging.nightlyHigh, 'min="0"'))}</div>
      <div class="row">${field("Preferred check-in time", `<input type="time" data-bind="profile.rules.checkinTarget" value="${esc(p.rules.checkinTarget)}">`)}
      ${field("Check-in tolerance (minutes)", num("profile.rules.checkinWindow", p.rules.checkinWindow, 'min="0"'))}</div>
      <div class="row">${field("Diet", `<select data-bind="profile.dining.diet">${DIETS.map(d => `<option ${d === p.dining.diet ? "selected" : ""}>${d}</option>`).join("")}</select>`)}
      ${field("Upscale dinners per trip", num("profile.dining.upscaleDinners", p.dining.upscaleDinners, 'min="0"'))}
      ${field("Lunch limit ($)", num("profile.dining.lunchCap", p.dining.lunchCap, 'min="0"'))}
      ${field("Food per day ($)", num("profile.dining.foodPerDay", p.dining.foodPerDay, 'min="0"'))}</div>`;
    if (s === 5) body = `<h2>Budget and states already visited</h2>
      ${field("Trip budget cap, all-in ($)", num("profile.rules.budgetCap", p.rules.budgetCap, 'min="0" step="50"'))}
      <p class="muted">Tap the states you have already visited. New states score higher.</p>${statesGrid(true)}`;
    if (s === 6) body = `<h2>Review</h2><div class="tablewrap"><table>
      <tr><th>Home</th><td>${esc(p.home.label || "not set")}</td></tr>
      <tr><th>Dates</th><td>${U.dayLabel(st.startDate)}, ${st.nights} nights</td></tr>
      <tr><th>Interests</th><td>${p.interests.map(k => INTERESTS.find(i => i[0] === k)?.[1] || k).join(", ") || "none"}</td></tr>
      <tr><th>Driving</th><td>${p.rules.maxDriveHours} h/day max, ${p.vehicle.mpg} MPG, start ${U.hm12(p.rules.startTime)}</td></tr>
      <tr><th>Lodging</th><td>${esc(p.lodging.brand)}, ${money(p.lodging.nightlyLow)} to ${money(p.lodging.nightlyHigh)}/night, check-in near ${U.hm12(p.rules.checkinTarget)}</td></tr>
      <tr><th>Dining</th><td>${esc(p.dining.diet)}; ${p.dining.upscaleDinners} upscale dinner(s); lunch under ${money(p.dining.lunchCap)}</td></tr>
      <tr><th>Budget</th><td>${money(p.rules.budgetCap)} cap</td></tr>
      <tr><th>States visited</th><td>${p.visited.length} of 50</td></tr></table></div>
      ${p.home.lat == null ? `<p class="lvl WARN">Set your home on step 1 so drive times can be estimated.</p>` : ""}`;
    const nav = `<div class="row noprint" style="margin-top:12px">${s > 0 ? `<button class="btn ghost" data-act="stepBack">Back</button>` : ""}
      ${s < STEPS.length - 1 ? `<button class="btn" data-act="stepNext">Next</button>` : `<button class="btn" data-act="findDest">Find destinations</button>`}</div>`;
    return `<h1>Plan a road trip</h1><div class="card">${steps}${body}${nav}</div>`;
  }

  function statesGrid(editable) {
    const planned = new Set(st.trip ? st.trip.states || [] : []), v = new Set(st.profile.visited);
    return `<div class="states">${RT_STATES.map(s => `<button class="state ${v.has(s.abbr) ? "visited" : ""} ${planned.has(s.abbr) && !v.has(s.abbr) ? "planned" : ""}" ${editable ? `data-act="toggleState" data-s="${s.abbr}"` : ""} aria-pressed="${v.has(s.abbr)}">${s.abbr} <span class="small">${s.name}</span></button>`).join("")}</div>`;
  }

  // ---------- destinations ----------
  function vDestinations() {
    if (!st.recs.length) st.recs = RT.scoreDestinations(st.profile, RT_CATALOG, st.month || +st.startDate.slice(5, 7));
    const ai = !!st.profile.aiKey;
    return `<h1>Recommended destinations</h1>
      <p class="muted">Ranked for ${U.dayLabel(st.startDate)} from your interests, the season, new states, and estimated drive time. Drive times here are straight-line estimates; the Trip tab checks routed times.</p>
      <div class="row noprint" style="margin-bottom:10px">${field("Month to score for", `<select data-bind="month" data-rescore="1"><option value="">Trip month</option>${MONTHS.map((m, i) => `<option value="${i + 1}" ${st.month == i + 1 ? "selected" : ""}>${m}</option>`).join("")}</select>`)}
      ${ai ? `<button class="btn ghost" data-act="aiOpen">Ask AI for a custom trip</button>` : `<span class="small muted">Add an Anthropic API key in Settings for AI-written itineraries.</span>`}</div>
      <div class="grid">${st.recs.slice(0, 12).map((r, i) => `<div class="card">
        <div class="row" style="justify-content:space-between"><strong>${esc(r.dest.name)}</strong><span class="score">${r.score}</span></div>
        <div class="small muted">${r.dest.states.join(", ")} | best ${r.dest.months.map(m => MONTHS[m - 1]).join(" ")}</div>
        <ul class="small">${r.reasons.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <div class="small">${r.dest.stops.map(s => esc(s[0])).join(" · ")}</div>
        <div class="row" style="margin-top:8px"><button class="btn small" data-act="build" data-i="${i}">Build itinerary</button>${ai ? `<button class="btn small ghost" data-act="buildAI" data-i="${i}">Build with AI</button>` : ""}</div></div>`).join("")}</div>`;
  }

  // ---------- trip editor ----------
  function vTrip() {
    const t = st.trip;
    if (!t) return `<h1>Trip</h1><div class="card"><p>No trip yet. Finish the interview and pick a destination, or load a saved trip file.</p><div class="row"><button class="btn" data-act="go" data-t="interview">Start the interview</button><label class="btn ghost">Load trip file<input type="file" accept=".json" data-act="loadTrip" hidden></label></div></div>`;
    const f = st.findings, errs = f.filter(x => x.level === "ERROR").length, warns = f.filter(x => x.level === "WARN").length;
    let n = 0;
    return `<h1>${esc(t.name)}</h1>
      <div class="card noprint"><div class="row">
        <button class="btn" data-act="check">Check plan</button>
        <button class="btn ghost" data-act="routeAll">Route check (live drive times)</button>
        <button class="btn ghost" data-act="retime" ${Object.keys(st.routes).length ? "" : "disabled"}>Re-time from routes</button>
        <button class="btn ghost" data-act="saveTrip">Save trip file</button>
        <label class="btn ghost">Load trip file<input type="file" accept=".json" data-act="loadTrip" hidden></label>
        <button class="btn ghost" data-act="itinerary">Download itinerary</button>
        <button class="btn ghost" data-act="print">Print</button>
        <button class="btn warn" data-act="clearTrip">Clear trip</button></div>
        ${st.busy ? `<p class="muted">${esc(st.busy)}</p>` : ""}
        ${f.length ? `<h3>Plan check: ${errs} error(s), ${warns} warning(s)</h3>${f.map(x => `<div class="finding ${x.level}"><span class="lvl ${x.level}">${x.level}</span>${esc(x.day)} | ${esc(x.check)}: ${esc(x.msg)}</div>`).join("")}` : `<p class="small muted">Run Check plan after every change. Route check calls the free OSRM router for real drive times.</p>`}
      </div>
      ${t.days.map((d, di) => { const r = st.routes[d.date]; return `<div class="card">
        <div class="row" style="justify-content:space-between"><h2 style="margin:0">Day ${di + 1} | ${U.dayLabel(d.date)}</h2>
        ${r ? `<span class="small muted">${Math.round(r.legs.reduce((a, l) => a + l.meters, 0) / 1609.344)} mi, ${(r.legs.reduce((a, l) => a + l.seconds, 0) / 3600).toFixed(1)} h routed</span>` : ""}</div>
        <input type="text" data-tripbind="days.${di}.title" value="${esc(d.title)}" aria-label="Day title">
        ${d.stops.map((s, si) => { const shown = !(di > 0 && si === 0); if (shown) n++; return `<div class="stop"><div class="num">${shown ? n : "↺"}</div><div>
          <div class="edit">
            <input class="wide" type="text" data-tripbind="days.${di}.stops.${si}.name" value="${esc(s.name)}" aria-label="Stop name">
            <input class="wide" type="text" data-tripbind="days.${di}.stops.${si}.address" value="${esc(s.address)}" aria-label="Address">
            ${field("Arrive", `<input type="time" data-tripbind="days.${di}.stops.${si}.arrive" value="${esc(s.arrive)}">`)}
            ${field("Depart", `<input type="time" data-tripbind="days.${di}.stops.${si}.depart" value="${esc(s.depart)}">`)}
            ${field("Timed entry", `<input type="time" data-tripbind="days.${di}.stops.${si}.timed_entry" value="${esc(s.timed_entry)}">`)}
            ${field("Booking link", `<input type="url" data-tripbind="days.${di}.stops.${si}.booking_url" value="${esc(s.booking_url)}">`)}
          </div>
          <div class="row small"><label><input type="checkbox" data-tripbind="days.${di}.stops.${si}.checkin" ${s.checkin ? "checked" : ""}> Hotel check-in</label>
            <span class="muted">${s.lat != null && s.lat !== "" ? `${(+s.lat).toFixed(4)}, ${(+s.lon).toFixed(4)}` : "no coordinates"}</span>
            <button class="btn small ghost" data-act="locate" data-d="${di}" data-s="${si}">Find location</button>
            <button class="btn small ghost" data-act="up" data-d="${di}" data-s="${si}" aria-label="Move up">↑</button>
            <button class="btn small ghost" data-act="down" data-d="${di}" data-s="${si}" aria-label="Move down">↓</button>
            <button class="btn small warn" data-act="del" data-d="${di}" data-s="${si}">Remove</button></div>
          ${s.notes ? `<div class="small muted">${esc(s.notes)}</div>` : ""}<div id="loc-${di}-${si}"></div></div></div>`; }).join("")}
        <div class="row noprint" style="margin-top:8px"><input type="text" id="add-${di}" placeholder="Add a stop: place name or address"><button class="btn small" data-act="addStop" data-d="${di}">Search</button></div><div id="addres-${di}"></div>
      </div>`; }).join("")}
      <div class="row noprint"><button class="btn ghost" data-act="addDay">Add a day</button></div>`;
  }

  // ---------- navigate ----------
  function vNavigate() {
    const t = st.trip; if (!t) return noTrip();
    return `<h1>Navigate</h1>
      <div class="card"><h2>Google Maps, one route per day</h2><p class="small muted">Opens the full day with every stop in order. Days over 9 waypoints split into parts (Google Maps app limit). Tap Start for voice navigation.</p>
      <ul>${t.days.map((d, i) => { const L = RT.dayLinks(d); return L.map((u, k) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">Day ${i + 1}, ${U.dayLabel(d.date)}: ${esc(d.title)}${L.length > 1 ? ` (part ${k + 1} of ${L.length})` : ""}</a></li>`).join(""); }).join("")}</ul></div>
      <div class="card"><h2>Waze, one link per stop</h2><p class="small muted">Waze links take one destination. Tap the next link when you arrive. "(search)" opens an address search; confirm the result.</p>
      <ol style="padding-left:20px">${RT.allStops(t).map(({ day, s }) => { const w = RT.wazeLink(s); return `<li><a href="${esc(w.url)}" target="_blank" rel="noopener">${esc(s.name)}</a> <span class="small muted">${U.dayLabel(day.date)}${w.search ? " (search)" : ""}</span></li>`; }).join("")}</ol></div>
      <div class="card noprint"><h2>Downloads and sharing</h2><div class="row">
        <button class="btn" data-act="share">Share links</button>
        <button class="btn ghost" data-act="dlIcs">Calendar (.ics)</button>
        <button class="btn ghost" data-act="dlCsv">My Maps stops (.csv)</button>
        <button class="btn ghost" data-act="dlKml">Route layers (.kml)</button>
        <button class="btn ghost" data-act="dlLinks">Links sheet (.html)</button></div>
        <p class="small muted">Google My Maps: create a map, import the CSV for pins, then import each day's KML as its own layer to draw the driving routes (run Route check first). The Google Maps phone app does not show My Maps routes, so use the links above on the road.</p></div>`;
  }
  const noTrip = () => `<div class="card"><p>Build a trip first.</p><button class="btn" data-act="go" data-t="interview">Start the interview</button></div>`;

  // ---------- weather and roads ----------
  function vWeather() {
    const t = st.trip; if (!t) return noTrip();
    const states = tripStates().map(a => RT_STATE_BY_ABBR[a]).filter(Boolean);
    const overnights = []; t.days.forEach(d => { const s = d.stops[d.stops.length - 1]; if (s.lat != null && s.lat !== "") overnights.push([d, s]); });
    return `<h1>Weather and road watch</h1>
      <div class="card"><div class="row"><button class="btn" data-act="weather">Check live weather and alerts</button><span class="small muted">National Weather Service, free. Forecasts reach about 7 days ahead; check again 48 hours before you leave and each morning.</span></div>
      ${st.weather.length ? st.weather.map(w => `<div class="finding ${w.alerts.length ? "WARN" : "INFO"}"><strong>${esc(w.day)} | ${esc(w.stop)}</strong><br>${w.forecast.map(esc).join("<br>")}<br>${w.alerts.length ? `<span class="lvl WARN">ALERTS</span>${w.alerts.map(esc).join("; ")}` : "No active alerts"} · <a href="${esc(w.page)}" target="_blank" rel="noopener">forecast page</a></div>`).join("") : ""}</div>
      <div class="card"><h2>Road conditions by state</h2><ul>${states.map(s => `<li><a href="${esc(s.roads)}" target="_blank" rel="noopener">${esc(s.name)} road conditions</a>${s.roads !== s.fhwa ? ` · <a href="${esc(s.fhwa)}" target="_blank" rel="noopener">FHWA page</a>` : ""}</li>`).join("")}
        <li><a href="https://www.nps.gov/planyourvisit/alerts.htm" target="_blank" rel="noopener">National Park Service alerts and closures</a></li></ul>
        <p class="small muted">State links go to official Federal Highway Administration pages, which link to each state's 511 or DOT site.</p></div>
      <div class="card"><h2>Forecast pages for each overnight</h2><ul>${overnights.map(([d, s]) => `<li><a href="${esc(RT.services.forecastPage(s.lat, s.lon))}" target="_blank" rel="noopener">${esc(U.dayLabel(d.date))}: ${esc(s.name)}</a></li>`).join("")}</ul></div>`;
  }

  // ---------- budget and booking ----------
  function vBudget() {
    const t = st.trip; if (!t) return noTrip();
    const b = RT.budget(t, st.profile, st.routes); const over = b.total[1] - b.cap;
    const book = []; t.days.forEach(d => d.stops.forEach((s, i) => { if ((s.type === "Hotel" || s.checkin) && i === d.stops.length - 1 && !book.some(x => x.s.address === s.address && x.type === "hotel" && x.d === d)) book.push({ type: "hotel", d, s }); if (s.timed_entry || (s.booking_url && s.type !== "Hotel")) book.push({ type: "ticket", d, s }); }));
    return `<h1>Budget and booking</h1>
      <div class="card"><h2>Budget estimate</h2><div class="tablewrap"><table><tr><th>Category</th><th>Low</th><th>High</th><th>Basis</th></tr>
      ${b.lines.map(l => `<tr><td>${l[0]}</td><td>${money(l[1])}</td><td>${money(l[2])}</td><td class="small muted">${esc(l[3])}</td></tr>`).join("")}
      <tr><th>Total</th><th>${money(b.total[0])}</th><th>${money(b.total[1])}</th><td class="small">${b.routed ? "routed miles" : "estimated miles; run Route check"}</td></tr></table></div>
      <p class="${over > 0 ? "lvl WARN" : "small"}">${over > 0 ? `High estimate is ${money(over)} over your ${money(b.cap)} cap.` : `Within your ${money(b.cap)} cap.`}</p>
      <p class="small muted">Estimates only. Replace with real hotel rates and admission prices before you book.</p></div>
      <div class="card"><h2>Booking checklist</h2><p class="small muted">You book. The app never reserves or pays.</p><ul>
      ${book.map(x => x.type === "hotel" ? `<li>☐ Hotel: ${esc(x.s.name)}, night of ${U.dayLabel(x.d.date)} · ${x.s.booking_url ? `<a href="${esc(x.s.booking_url)}" target="_blank" rel="noopener">book or search</a>` : `<a href="${esc(RT.lodgingSearchUrl(st.profile.lodging.brand, x.s.address))}" target="_blank" rel="noopener">search hotels</a>`}</li>` : `<li>☐ ${esc(x.s.name)}, ${U.dayLabel(x.d.date)}${x.s.timed_entry ? ` (entry ${U.hm12(x.s.timed_entry)})` : ""} ${x.s.booking_url ? `· <a href="${esc(x.s.booking_url)}" target="_blank" rel="noopener">book</a>` : ""}</li>`).join("")}</ul>
      <p class="small muted">Add official booking links in the Trip tab, Booking link field, for every ticket and reservation.</p></div>`;
  }

  // ---------- tracker ----------
  function vTracker() {
    const v = st.profile.visited.length;
    return `<h1>50-state tracker</h1><div class="card"><div class="row" style="justify-content:space-between"><strong>${v} of 50 visited</strong><span class="small muted">Gold outline: in the current trip</span></div>
      <div class="bar" aria-hidden="true"><i style="width:${v * 2}%"></i></div><p class="small muted">A state counts as visited when you made a planned stop or stayed overnight there. Tap to toggle.</p>${statesGrid(true)}
      ${st.trip ? `<div class="row" style="margin-top:10px"><button class="btn" data-act="markDone">Trip completed: mark its states visited</button></div>` : ""}</div>`;
  }

  // ---------- settings ----------
  function vSettings() {
    const p = st.profile;
    return `<h1>Settings</h1>
      <div class="card"><h2>Optional AI itineraries</h2><p class="small muted">Your own Anthropic API key, stored only in this browser and sent only to api.anthropic.com. Usage is billed to your account.</p>
      ${field("API key", `<input type="password" data-bind="profile.aiKey" value="${esc(p.aiKey)}" autocomplete="off">`)}
      ${field("Model", `<input type="text" data-bind="profile.aiModel" value="${esc(p.aiModel)}">`)}</div>
      <div class="card"><h2>Services</h2>
      ${field("Contact email for OpenStreetMap place search (recommended by their usage policy)", `<input type="email" data-bind="profile.contactEmail" value="${esc(p.contactEmail || "")}">`)}
      ${field("Routing server (OSRM)", `<input type="url" data-bind="profile.osrmUrl" value="${esc(p.osrmUrl || "")}" placeholder="https://router.project-osrm.org">`)}
      <p class="small muted">The public OSRM demo server is for light use and has no traffic data.</p></div>
      <div class="card"><h2>Your data</h2><p class="small muted">Everything stays in this browser. Back it up or move it to another device with a file.</p>
      <div class="row"><button class="btn" data-act="backup">Back up all data</button><label class="btn ghost">Restore from file<input type="file" accept=".json" data-act="restore" hidden></label><button class="btn warn" data-act="reset">Erase all data</button></div></div>
      <div class="card"><h2>About</h2><p class="small">Road Trip Planner, open source (MIT). Map data © OpenStreetMap contributors. Routing by OSRM. Weather from the National Weather Service. Destination details change: verify hours, prices, and closures before you travel.</p></div>`;
  }

  // ---------- actions ----------
  async function searchInto(q, targetSel, onPick) {
    const box = $(targetSel); if (!q.trim()) return;
    box.innerHTML = `<p class="muted small">Searching…</p>`;
    try {
      const res = await RT.services.geocode(q);
      if (!res.length) { box.innerHTML = `<p class="small">No match. Try adding the city and state.</p>`; return; }
      box.innerHTML = `<div class="results">${res.map((r, i) => `<button data-pick="${i}">${esc(r.label)}</button>`).join("")}</div>`;
      box.querySelectorAll("[data-pick]").forEach(b => b.onclick = () => onPick(res[+b.dataset.pick]));
    } catch (e) { box.innerHTML = `<p class="small lvl WARN">Place search is unavailable (${esc(e.message)}). You can still type an address; links will use it.</p>`; }
  }

  function guessTZ(lat, lon) { // rough continental guess; NWS supplies the exact zone after a weather check
    if (lat > 50 && lon < -130) return "America/Anchorage"; if (lat < 23 && lon < -150) return "Pacific/Honolulu";
    if (lon < -114.5) return "America/Los_Angeles"; if (lon < -102) return "America/Denver"; if (lon < -87.5) return "America/Chicago"; return "America/New_York";
  }
  function stampTZ(trip) { trip.days.forEach(d => { if (!d.tz) { const s = d.stops.find(x => x.lat != null && x.lat !== ""); if (s) d.tz = guessTZ(+s.lat, +s.lon); } }); }

  function runCheck() { if (!st.trip) return; stampTZ(st.trip); st.findings = RT.checkTrip(st.trip, st.profile, st.routes); }

  const actions = {
    go: el => setTab(el.dataset.t),
    stepNext: () => { st.step = Math.min(STEPS.length - 1, st.step + 1); render(); },
    stepBack: () => { st.step = Math.max(0, st.step - 1); render(); },
    homeSearch: () => searchInto($("#homeQ").value, "#homeResults", r => { st.profile.home = { label: r.label.split(",").slice(0, 3).join(","), lat: r.lat, lon: r.lon, state: r.state }; toast("Home set"); render(); }),
    interest: el => { const k = el.dataset.k, a = st.profile.interests; const i = a.indexOf(k); i >= 0 ? a.splice(i, 1) : a.push(k); el.setAttribute("aria-pressed", String(i < 0)); persist(); },
    toggleState: el => { const a = st.profile.visited, s = el.dataset.s, i = a.indexOf(s); i >= 0 ? a.splice(i, 1) : a.push(s); render(); },
    findDest: () => { if (st.profile.home.lat == null) { toast("Set your home first (step 1)"); st.step = 0; render(); return; } st.recs = []; setTab("destinations"); },
    build: el => { const r = st.recs[+el.dataset.i]; st.trip = RT.draftTrip(st.profile, r.dest, st.startDate, +st.nights); st.routes = {}; st.weather = []; runCheck(); toast("Draft built. Review times and run Route check."); setTab("trip"); },
    buildAI: async el => { const r = st.recs[+el.dataset.i]; await aiBuild(r.dest); },
    aiOpen: async () => { const notes = prompt("Describe the trip you want (places, pace, must-sees):") || ""; await aiBuild(null, notes); },
    check: () => { runCheck(); render(); },
    routeAll: async () => { const t = st.trip; let ok = 0, skip = 0; for (const d of t.days) { st.busy = `Routing ${U.dayLabel(d.date)}…`; render(); try { st.routes[d.date] = await RT.services.routeDay(d); ok++; } catch (e) { skip++; } } st.busy = ""; runCheck(); render(); toast(`Routed ${ok} day(s)${skip ? `, skipped ${skip} (missing coordinates or offline)` : ""}`); },
    retime: () => { let n = 0; st.trip.days.forEach(d => { if (RT.retimeDay(d, st.routes[d.date])) n++; }); runCheck(); render(); toast(n ? `Re-timed ${n} day(s) from routed drive times` : "Run Route check first"); },
    saveTrip: () => download(`${slug(st.trip.name)}.json`, RT.tripJson(st.trip, st.profile), "application/json"),
    clearTrip: () => { if (confirmBox("Clear the current trip?")) { st.trip = null; st.routes = {}; st.findings = []; st.weather = []; render(); } },
    print: () => window.print(),
    itinerary: () => download(`${slug(st.trip.name)}-itinerary.html`, itineraryHtml(), "text/html"),
    locate: el => { const d = +el.dataset.d, s = +el.dataset.s, stop = st.trip.days[d].stops[s]; searchInto(stop.address || stop.name, `#loc-${d}-${s}`, r => { Object.assign(stop, { lat: r.lat, lon: r.lon }); delete st.routes[st.trip.days[d].date]; render(); }); },
    up: el => move(+el.dataset.d, +el.dataset.s, -1), down: el => move(+el.dataset.d, +el.dataset.s, 1),
    del: el => { const d = st.trip.days[+el.dataset.d]; if (d.stops.length <= 2) { toast("A day needs a start and an end"); return; } d.stops.splice(+el.dataset.s, 1); delete st.routes[d.date]; runCheck(); render(); },
    addStop: el => { const di = +el.dataset.d; searchInto($(`#add-${di}`).value, `#addres-${di}`, r => { const d = st.trip.days[di]; d.stops.splice(d.stops.length - 1, 0, RT.mkStop(r.label.split(",")[0], r.label.split(",").slice(0, 4).join(","), r.lat, r.lon, { type: "Stop" })); delete st.routes[d.date]; runCheck(); render(); }); },
    addDay: () => { const t = st.trip, last = t.days[t.days.length - 1], end = last.stops[last.stops.length - 1]; t.days.push({ date: U.addDays(last.date, 1), title: "New day", tz: last.tz, stops: [JSON.parse(JSON.stringify(end)), JSON.parse(JSON.stringify(end))] }); runCheck(); render(); },
    share: async () => { const text = linksText(); if (navigator.share) { try { await navigator.share({ title: st.trip.name, text }); return; } catch (e) { if (e.name === "AbortError") return; } } location.href = `mailto:?subject=${encodeURIComponent(st.trip.name)}&body=${encodeURIComponent(text.slice(0, 1800))}`; },
    dlIcs: () => { stampTZ(st.trip); download(`${slug(st.trip.name)}.ics`, RT.ics(st.trip), "text/calendar"); },
    dlCsv: () => download(`${slug(st.trip.name)}-mymaps.csv`, RT.csv(st.trip), "text/csv"),
    dlKml: () => { const t = st.trip; let n = 0; t.days.forEach((d, i) => { const r = st.routes[d.date]; download(`${slug(t.name)}-day${i + 1}.kml`, RT.kmlDay(t, i, r), "application/vnd.google-earth.kml+xml"); if (r) n++; }); toast(n ? `Downloaded ${t.days.length} KML file(s), ${n} with routes` : "Downloaded pins only; run Route check on the Trip tab for route lines"); },
    dlLinks: () => download(`${slug(st.trip.name)}-links.html`, linksHtml(), "text/html"),
    weather: async () => { st.weather = []; const seen = new Set(); for (const d of st.trip.days) for (const s of d.stops) { if (s.lat == null || s.lat === "") continue; const k = `${d.date}|${(+s.lat).toFixed(2)}|${(+s.lon).toFixed(2)}`; if (seen.has(k)) continue; seen.add(k); st.busy = `Checking ${s.name}…`; try { const w = await RT.services.weatherFor(s.lat, s.lon, d.date); if (w.tz) d.tz = w.tz; st.weather.push({ day: U.dayLabel(d.date), stop: s.name, ...w }); } catch (e) { st.weather.push({ day: U.dayLabel(d.date), stop: s.name, forecast: [`UNVERIFIED: weather service unavailable (${e.message})`], alerts: [], page: RT.services.forecastPage(s.lat, s.lon) }); } render(); } st.busy = ""; runCheck(); render(); },
    markDone: () => { const v = new Set(st.profile.visited); (st.trip.states || []).forEach(s => v.add(s)); st.profile.visited = [...v]; toast("States marked visited"); render(); },
    backup: () => download("road-trip-planner-backup.json", JSON.stringify({ format: "road-trip-planner-backup/1", profile: { ...st.profile, aiKey: "" }, trip: st.trip, routes: st.routes }, null, 2), "application/json"),
    reset: () => { if (confirmBox("Erase all saved data in this browser?")) { try { localStorage.removeItem(KEY); } catch (e) { } location.reload(); } }
  };
  function confirmBox(msg) { return window.confirm(msg); }
  function move(di, si, dir) { const a = st.trip.days[di].stops, j = si + dir; if (j < 0 || j >= a.length) return; [a[si], a[j]] = [a[j], a[si]]; delete st.routes[st.trip.days[di].date]; runCheck(); render(); }

  async function aiBuild(dest, notes) {
    st.busy = "Asking the AI to draft an itinerary…"; setTab("trip");
    try { const t = await RT.services.aiDraft(st.profile, dest, st.startDate, +st.nights, notes); st.trip = t; st.routes = {}; runCheck(); toast("AI draft ready. It is a draft: run Route check and verify every detail."); }
    catch (e) { toast(e.message); }
    st.busy = ""; render();
  }

  function linksText() { const t = st.trip; const L = [`${t.name}`, ""]; t.days.forEach((d, i) => RT.dayLinks(d).forEach((u, k, a) => L.push(`Day ${i + 1} ${U.dayLabel(d.date)}${a.length > 1 ? ` part ${k + 1}` : ""}: ${u}`))); return L.join("\n"); }
  function linksHtml() { const t = st.trip; return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t.name)} links</title><body style="font-family:system-ui;max-width:640px;margin:auto;padding:16px"><h1>${esc(t.name)}</h1><h2>Google Maps, one route per day</h2><ul>${t.days.map((d, i) => RT.dayLinks(d).map((u, k, a) => `<li><a href="${esc(u)}">Day ${i + 1}, ${U.dayLabel(d.date)}: ${esc(d.title)}${a.length > 1 ? ` (part ${k + 1})` : ""}</a></li>`).join("")).join("")}</ul><h2>Waze, one link per stop</h2><ol>${RT.allStops(t).map(({ day, s }) => { const w = RT.wazeLink(s); return `<li><a href="${esc(w.url)}">${esc(s.name)}</a> (${U.dayLabel(day.date)}${w.search ? ", search" : ""})</li>`; }).join("")}</ol></body>`; }
  function itineraryHtml() {
    const t = st.trip, b = RT.budget(t, st.profile, st.routes), states = tripStates().map(a => RT_STATE_BY_ABBR[a]).filter(Boolean);
    const rows = RT.allStops(t).map(({ n, day, s }) => `<tr><td>${n}</td><td>${U.dayLabel(day.date)}</td><td>${U.hm12(s.arrive || s.depart)}</td><td><b>${esc(s.name)}</b>${s.checkin ? " (check-in)" : ""}</td><td>${esc(s.address)}</td></tr>`).join("");
    return `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t.name)}</title>
<body style="font-family:system-ui;max-width:760px;margin:auto;padding:16px;color:#1d2422"><h1>${esc(t.name)}</h1>
<p>${U.dayLabel(t.days[0].date)} to ${U.dayLabel(t.days[t.days.length - 1].date)} | ${t.days.length - 1} nights | about ${b.miles} miles | budget ${money(b.total[0])} to ${money(b.total[1])} (cap ${money(b.cap)})</p>
<h2>Stop-by-stop list</h2><table border="1" cellpadding="5" style="border-collapse:collapse;width:100%;font-size:14px"><tr><th>#</th><th>Day</th><th>Time</th><th>Stop</th><th>Address</th></tr>${rows}</table>
<h2>Navigation</h2><ul>${t.days.map((d, i) => RT.dayLinks(d).map((u, k, a) => `<li><a href="${esc(u)}">Day ${i + 1} ${esc(d.title)}${a.length > 1 ? ` part ${k + 1}` : ""}</a></li>`).join("")).join("")}</ul>
<h2>Weather and road watch</h2><ul>${states.map(s => `<li><a href="${esc(s.roads)}">${esc(s.name)} road conditions</a></li>`).join("")}<li><a href="https://www.nps.gov/planyourvisit/alerts.htm">NPS alerts</a></li>${t.days.map(d => { const s = d.stops[d.stops.length - 1]; return s.lat != null && s.lat !== "" ? `<li><a href="${esc(RT.services.forecastPage(s.lat, s.lon))}">Forecast: ${esc(s.name)} (${U.dayLabel(d.date)})</a></li>` : ""; }).join("")}</ul>
<h2>Plan check</h2><ul>${(st.findings.length ? st.findings : [{ level: "INFO", day: "", check: "", msg: "No findings at export time" }]).map(f => `<li><b>${f.level}</b> ${esc(f.day)} ${esc(f.check)} ${esc(f.msg)}</li>`).join("")}</ul>
<p style="font-size:12px;color:#666">Planning only; verify hours, prices, and closures before travel. Map data © OpenStreetMap contributors.</p></body>`;
  }

  // ---------- events ----------
  view.addEventListener("click", e => { const el = e.target.closest("[data-act]"); if (el && el.tagName !== "INPUT" && actions[el.dataset.act]) { e.preventDefault(); actions[el.dataset.act](el); } });
  view.addEventListener("change", e => {
    const el = e.target;
    if (el.dataset.bind) { let v = el.type === "checkbox" ? el.checked : el.type === "number" ? (el.value === "" ? 0 : +el.value) : el.value; if (el.dataset.bind === "month") v = v ? +v : null; setPath(el.dataset.bind, v); if (el.dataset.rescore || el.dataset.bind === "startDate") st.recs = []; if (el.dataset.rescore) render(); else persist(); }
    if (el.dataset.tripbind) { const ks = el.dataset.tripbind.split("."); const last = ks.pop(); const o = ks.reduce((x, k) => x[k], st.trip); o[last] = el.type === "checkbox" ? el.checked : el.value; if (ks[0] === "days") delete st.routes[st.trip.days[+ks[1]].date]; persist(); }
    if (el.dataset.act === "loadTrip" || el.dataset.act === "restore") readFile(el);
  });
  view.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.id === "homeQ") actions.homeSearch(); if (e.key === "Enter" && /^add-/.test(e.target.id)) actions.addStop({ dataset: { d: e.target.id.slice(4) } }); });
  function readFile(el) {
    const f = el.files[0]; if (!f) return; const rd = new FileReader();
    rd.onload = () => { try { const j = JSON.parse(rd.result);
      if (j.format === "road-trip-planner-backup/1") { st.profile = Object.assign(RT.defaultProfile(), j.profile); st.trip = j.trip; st.routes = j.routes || {}; toast("Data restored"); }
      else if (j.trip && j.trip.days) { st.trip = j.trip; if (j.rules) Object.assign(st.profile.rules, j.rules); st.routes = {}; toast("Trip loaded"); }
      else throw new Error("not a trip file");
      runCheck(); setTab("trip"); } catch (e) { toast("Could not read that file: " + e.message); } };
    rd.readAsText(f);
  }

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
  if (st.trip) runCheck();
  setTab(st.tab);
})();
