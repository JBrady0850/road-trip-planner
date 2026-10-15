/* Road Trip Planner UI. Plain JavaScript, no build step, runs from a file, a local
   server, or any static host. Data stays in this browser (localStorage). */
(function () {
  const RT = window.RT, U = RT.util, esc = RT.esc;
  const KEY = "rtp:v1";
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DIETS = ["No restriction","Low carb or carnivore","Vegetarian","Vegan","Gluten free","Seafood friendly"];
  const HINT_TRIP = "rtp:tripHint";
  const APP_VERSION = "0.5.0";
  const REPO = "https://github.com/JBrady0850/road-trip-planner";
  const ICONS = new Set(RT.INTERESTS.map(i => i[0]));
  const icon = (k, cls = "ico") => ICONS.has(k) || k === "feedback" || k === "route" || k === "pin" ? `<svg class="${cls}" aria-hidden="true"><use href="#i-${k}"></use></svg>` : "";

  // ---------- state ----------
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const saved = load();
  const st = RT.state = {
    profile: Object.assign(RT.defaultProfile(), saved.profile || {}),
    trip: saved.trip || null, routes: saved.routes || {}, weather: [], recs: [], findings: [],
    tab: saved.trip ? "trip" : "interview", startDate: saved.startDate || nextFriday(), nights: saved.nights || 4, month: null, busy: "", details: false, open: new Set(), tripHint: false,
    fb: Object.assign({ task: "", ease: "", liked: "", problems: "", ideas: "", device: "", includeTrip: true }, saved.fb || {})
  };
  ["rules","vehicle","lodging","dining","home"].forEach(k => st.profile[k] = Object.assign(RT.defaultProfile()[k], (saved.profile || {})[k] || {}));
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify({ profile: st.profile, trip: st.trip, routes: st.routes, startDate: st.startDate, nights: st.nights, fb: st.fb })); } catch (e) { /* storage blocked: keep working in memory */ } };
  function nextFriday() { const d = new Date(); d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7) + 28); return d.toISOString().slice(0, 10); }

  // ---------- helpers ----------
  const $ = s => document.querySelector(s);
  const view = $("#view");
  const toast = msg => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 3200); };
  const money = n => "$" + Math.round(n).toLocaleString();
  const legText = sec => { const m = Math.round(sec / 60); return m < 90 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min`; };
  // Saving files works the same way everywhere: the desktop window opens a Save dialog,
  // iPad and iPhone open the share sheet (Save to Files), and every other browser downloads.
  const appleTouch = () => /iPad|iPhone|iPod/.test(navigator.userAgent || "") || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const blobDownload = f => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([f.text], { type: f.type })); a.download = f.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); };
  async function saveFiles(list, note = "") {
    const what = list.length === 1 ? list[0].name : `${list.length} files`;
    const api = window.pywebview && window.pywebview.api;
    if (api && api.save_file) {
      let saved = [];
      for (const f of list) { try { const where = await api.save_file(f.name, f.text); if (where) saved.push(where); } catch (e) { toast("Could not save: " + e); return; } }
      if (saved.length) toast(`Saved ${saved.length === 1 ? saved[0] : saved.length + " files"}${note}`);
      return;
    }
    if (appleTouch() && navigator.share && navigator.canShare) {
      const files = list.map(f => new File([f.text], f.name, { type: f.type }));
      if (navigator.canShare({ files })) {
        toast("Tap Save to Files to keep it on this device");
        try { await navigator.share({ files }); return; } catch (e) { if (e && e.name === "AbortError") return; }
      }
    }
    list.forEach(blobDownload);
    toast(`Saved ${what}. Look in your Downloads folder.${note}`);
  }
  const download = (name, text, type = "text/plain") => saveFiles([{ name, text, type }]);
  const slug = s => (s || "trip").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const field = (label, inner, cls = "") => `<div class="field ${cls}"><label>${label}</label>${inner}</div>`;
  const num = (path, v, attrs = "") => `<input type="number" data-bind="${path}" value="${esc(v)}" ${attrs}>`;
  const getPath = p => p.split(".").reduce((o, k) => o?.[k], st);
  const setPath = (p, v) => { const ks = p.split("."); const last = ks.pop(); const o = ks.reduce((x, k) => x[k], st); o[last] = v; };
  const tripStates = () => { if (!st.trip) return []; const s = new Set(st.trip.states || []); if (st.profile.home.state) { const h = RT_STATE_BY_NAME[st.profile.home.state.toLowerCase()]; if (h) s.add(h.abbr); } return [...s]; };

  // ---------- tabs ----------
  function setTab(t) { if (t === "destinations" && needsCity()) resolveCity().then(() => { if (st.tab === "destinations") render(); });
    st.tab = t; document.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.tab === t))); render(); view.focus(); window.scrollTo(0, 0); }
  $("#tabs").addEventListener("click", e => { const b = e.target.closest("button[data-tab]"); if (b) setTab(b.dataset.tab); });

  function render() {
    const fn = { interview: vInterview, destinations: vDestinations, trip: vTrip, navigate: vNavigate, weather: vWeather, budget: vBudget, tracker: vTracker, settings: vSettings, feedback: vFeedback }[st.tab];
    view.innerHTML = fn() + stepBar(st.tab);
    persist();
  }

  // ---------- artwork ----------
  // The look borrows from American highway signs: a green guide sign over the road,
  // rank shown as a marker post, and a small scene on every trip card. All drawn
  // inline so the app still works offline and from a downloaded folder.
  function hero() {
    return `<section class="hero" aria-labelledby="hero-title">
      <svg class="hero-art" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs><linearGradient id="hsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="sky-top"/><stop offset="1" class="sky-low"/></linearGradient></defs>
        <rect width="1200" height="300" fill="url(#hsky)"/>
        <circle cx="905" cy="92" r="34" class="sun"/>
        <path class="far" d="M0 190 L120 120 L210 165 L330 95 L450 170 L560 130 L700 185 L700 300 L0 300Z"/>
        <path class="sea" d="M700 182 C800 176 980 180 1200 172 L1200 300 L700 300Z"/>
        <path class="wave" d="M760 205 q15 -6 30 0 t30 0 M900 220 q15 -6 30 0 t30 0 M1040 198 q15 -6 30 0 t30 0"/>
        <path class="head" d="M985 190 C1030 150 1110 140 1200 150 L1200 300 L960 300Z"/>
        <g class="lh" transform="translate(1088 70)"><path class="beam" d="M10 18 L-120 0 L-120 30Z"/><rect x="2" y="10" width="16" height="12" class="lamp"/><path class="tower" d="M0 24 L20 24 L25 82 L-5 82Z"/><path class="band" d="M-1.5 40 L21.5 40 L22.6 52 L-2.6 52Z"/><path class="band" d="M-3.4 64 L23.4 64 L24.3 74 L-4.3 74Z"/><path class="cap" d="M-2 10 L22 10 L10 2Z"/></g>
        <path class="near" d="M0 230 C160 200 300 215 470 196 C560 188 640 205 720 214 L720 300 L0 300Z"/>
        <path class="road" d="M330 300 C420 262 520 236 585 214 C612 205 640 200 660 197 L672 198 C652 204 628 212 606 222 C540 250 480 278 470 300Z"/>
        <path class="dash" d="M400 300 C470 268 548 238 600 216 C626 206 646 201 666 198"/>
      </svg>
      <div class="sign"><p class="sign-kicker">${icon("route")}Road Trip Planner</p><h1 id="hero-title">Plan a road trip</h1>
        <p class="sign-sub">Three questions. Ranked trips. One tap to a checked itinerary.</p></div>
    </section>`;
  }
  // A small scene for a trip card, chosen from what the trip is about.
  const DESERT = new Set(["AZ", "UT", "NV", "NM"]);
  function sceneKind(d) {
    const t = new Set(d.tags), st0 = d.states[0];
    if (d.fly) return "island";
    if (t.has("lighthouses")) return "lighthouse";
    if (t.has("beach")) return "coast";
    if (DESERT.has(st0)) return "desert";
    if (t.has("waterfalls")) return "falls";
    if (t.has("parks") || t.has("hiking")) return "peaks";
    if (t.has("town") || t.has("food")) return "town";
    return "plains";
  }
  const SCENE = {
    lighthouse: `<path class="sea" d="M0 50 C80 46 200 48 320 44 L320 80 L0 80Z"/><path class="wave" d="M30 62 q10 -4 20 0 t20 0 M120 70 q10 -4 20 0 t20 0"/><path class="head" d="M140 56 C180 36 250 32 320 36 L320 80 L120 80Z"/><g transform="translate(196 17)"><path class="beam" d="M6 10 L-70 0 L-70 18Z"/><rect x="1" y="6" width="10" height="7" class="lamp"/><path class="tower" d="M0 14 L12 14 L15 46 L-3 46Z"/><path class="band" d="M-1 24 L13 24 L13.7 31 L-1.7 31Z"/><path class="cap" d="M-1 6 L13 6 L6 1Z"/></g>`,
    coast: `<path class="sea" d="M0 46 C90 42 220 46 320 42 L320 80 L0 80Z"/><path class="wave" d="M40 58 q10 -4 20 0 t20 0 M180 64 q10 -4 20 0 t20 0"/><path class="sand" d="M0 66 C100 60 220 64 320 60 L320 80 L0 80Z"/><circle cx="250" cy="22" r="11" class="sun"/>`,
    desert: `<circle cx="70" cy="22" r="11" class="sun"/><path class="mesa" d="M0 80 L0 52 L40 52 L48 40 L110 40 L118 52 L170 52 L176 46 L232 46 L240 58 L320 58 L320 80Z"/><path class="cactus" d="M268 70 L268 46 M268 56 L260 56 L260 48 M268 52 L276 52 L276 44"/>`,
    falls: `<path class="far" d="M0 80 L0 30 L50 12 L110 22 L140 28 L140 80Z"/><path class="far" d="M180 80 L180 28 L230 14 L320 26 L320 80Z"/><path class="cliff" d="M120 80 L120 28 L142 26 L142 80Z M178 80 L178 26 L200 28 L200 80Z"/><path class="fall" d="M142 26 L178 26 L180 70 L140 70Z"/><path class="stream" d="M150 30 V66 M160 28 V68 M170 30 V66"/><path class="pool" d="M96 68 C140 62 180 62 224 68 L224 80 L96 80Z"/><path class="wave" d="M140 72 q10 -3 20 0 t20 0"/>`,
    peaks: `<path class="far" d="M0 80 L0 56 L70 18 L120 46 L180 12 L250 50 L320 30 L320 80Z"/><path class="snow" d="M58 25 L70 18 L82 25 L76 28 L70 24 L64 28Z M168 19 L180 12 L192 19 L186 22 L180 18 L174 22Z"/><path class="near" d="M0 80 L0 66 C80 56 200 62 320 58 L320 80Z"/>`,
    town: `<path class="bld" d="M30 80 V44 H62 V80 Z M70 80 V30 H96 V80 Z M104 80 V50 H140 V80 Z M210 80 V38 H236 V80 Z M244 80 V54 H290 V80 Z"/><path class="win" d="M76 36 h6 v6 h-6z M86 36 h6 v6 h-6z M76 48 h6 v6 h-6z M86 48 h6 v6 h-6z M216 46 h6 v6 h-6z M226 46 h6 v6 h-6z"/><circle cx="180" cy="20" r="10" class="sun"/>`,
    island: `<path class="sea" d="M0 54 C100 50 220 54 320 50 L320 80 L0 80Z"/><path class="far" d="M90 56 L150 18 L170 22 L230 56Z"/><path class="smoke" d="M156 16 C150 8 166 6 160 0"/><path class="palm" d="M262 60 C264 46 266 36 264 26 M264 26 C252 22 244 26 240 30 M264 26 C276 20 286 24 290 30 M264 26 C262 16 256 12 250 12"/>`,
    plains: `<circle cx="240" cy="24" r="11" class="sun"/><path class="far" d="M0 62 C70 50 160 58 230 50 C270 46 300 50 320 48 L320 80 L0 80Z"/><path class="near" d="M0 80 L0 70 C90 64 200 70 320 66 L320 80Z"/><path class="fence" d="M20 72 V62 M50 71 V61 M80 71 V61 M110 72 V62 M20 65 H110"/>`
  };
  const scene = d => `<svg class="scene scene-${sceneKind(d)}" viewBox="0 0 320 80" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><rect class="sky" width="320" height="80"/>${SCENE[sceneKind(d)]}</svg>`;
  // Fishing: when the traveler picks it, every page that plans the trip links each
  // state's official page for buying a fishing license online (data/states.js).
  const fishingOn = () => st.profile.interests.includes("fishing");
  const fishLinks = states => [...new Set(states)].map(a => RT_STATE_BY_ABBR[a]).filter(s => s && s.fish).map(s => `<a href="${esc(s.fish)}" target="_blank" rel="noopener">${esc(s.name)} fishing license</a>`).join(" · ");
  const fishLine = states => { const l = fishingOn() ? fishLinks(states) : ""; return l ? `<p class="small fish-license">${icon("fishing")}<span>Buy online: ${l}</span></p>` : ""; };
  const experiencesList = (list, cls = "") => list && list.length ? `<div class="exp ${cls}"><p class="exp-title">Only here</p><ul>${list.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : "";

  // ---------- step bar ----------
  // Planning runs in six steps; every step page ends with Back and Next so the way
  // forward is always the button at the bottom.
  const FLOW = [["interview", "Plan"], ["destinations", "Trips"], ["trip", "Itinerary"], ["navigate", "Navigate"], ["weather", "Weather & Roads"], ["budget", "Budget & Booking"]];
  function stepBar(tab) {
    const i = FLOW.findIndex(f => f[0] === tab); if (i < 0) return "";
    const n = FLOW.length, prev = FLOW[i - 1], next = FLOW[i + 1], to = `<span aria-hidden="true">&rarr;</span>`;
    let go = "";
    if (tab === "interview") go = `<button class="btn big step-next" data-act="findDest">Next: Show me trips ${to}</button>`;
    else if (tab === "destinations") go = (st.recs.length ? `<button class="btn big step-next" data-act="build" data-i="0">${st.recs[0].pick ? `Next: Build the ${esc(st.recs[0].dest.name)} trip` : "Next: Build the best match"} ${to}</button>` : "") + (st.trip ? `<button class="btn ghost" data-act="go" data-t="trip">Keep my current trip</button>` : "");
    else if (!st.trip) go = `<button class="btn big step-next" data-act="go" data-t="interview">Plan a trip first</button>`;
    else if (!next) go = `<button class="btn big step-next" data-act="saveTrip">Save my trip</button><button class="btn ghost" data-act="go" data-t="feedback">Give feedback</button>`;
    else go = `<button class="btn big step-next" data-act="go" data-t="${next[0]}">Next: ${esc(next[1])} ${to}</button>`;
    const back = prev ? `<button class="btn ghost step-back" data-act="go" data-t="${prev[0]}"><span aria-hidden="true">&larr;</span> Back: ${esc(prev[1])}</button>` : "";
    const dots = FLOW.map((f, k) => `<span class="dot ${k < i ? "done" : k === i ? "on" : ""}"></span>`).join("");
    return `<nav class="stepbar noprint" aria-label="Planning steps"><div class="step-where"><span class="step-count">Step ${i + 1} of ${n}</span><span class="step-name">${esc(FLOW[i][1])}</span><span class="dots" aria-hidden="true">${dots}</span></div><div class="step-actions">${back}${go}</div></nav>`;
  }

  // ---------- interview ----------
  const chip = (act, k, label, on, extra = "") => `<button class="chip" data-act="${act}" data-k="${k}" aria-pressed="${on}" ${extra}>${icon(k)}${label}</button>`;
  const interestChips = p => RT.INTEREST_GROUPS.map(([g, list]) => `<div class="chip-group"><h3 class="chip-head">${esc(g)}</h3><div class="chips">${list.map(([k, l]) => chip("interest", k, l, p.interests.includes(k))).join("")}</div></div>`).join("");
  // Where to: a state narrows the ranking; a town, when the traveler knows it, goes first.
  const cityOptions = state => [...new Set(RT_CATALOG.filter(d => !state || d.states.includes(state)).map(d => d.base[0]))].sort().map(c => `<option value="${esc(c)}"></option>`).join("");
  function whereTo(p, id) {
    const stName = p.destState ? (RT_STATE_BY_ABBR[p.destState] || {}).name || p.destState : "";
    const lab = (f, text, inner) => `<div class="field"><label for="${id}-${f}">${text}</label>${inner}</div>`;
    return `<div class="row where" role="group" aria-label="Where to">${lab("state", "Where to", `<select id="${id}-state" data-bind="profile.destState" data-rescore="1"><option value="">Anywhere within reach</option>${RT_STATES.map(s => `<option value="${s.abbr}" ${p.destState === s.abbr ? "selected" : ""}>${s.name}</option>`).join("")}</select>`)}
      ${lab("city", "City (optional)", `<input type="text" id="${id}-city" list="${id}" data-bind="profile.destCity" data-city="1" value="${esc(p.destCity || "")}" placeholder="${stName ? `Any city in ${esc(stName)}` : "Any city, e.g. Gatlinburg"}" autocomplete="off" enterkeyhint="go" aria-describedby="${id}-help"><datalist id="${id}">${cityOptions(p.destState)}</datalist>`)}</div>
      <p class="small muted" id="${id}-help">Know the town? Type it, and that trip comes first. Leave it blank to see the best cities for your interests.</p>`;
  }
  function vInterview() {
    const p = st.profile, pace = p.rules.pace || "balanced", comfort = p.lodging.comfort || "mid";
    const homeLine = p.home.lat != null ? `<p class="small ok">Starting from <b>${esc(p.home.label)}</b>. <button class="btn small ghost" data-act="homeClear">Change</button></p>` : `<p class="small muted">Your town sets the drive time to every destination.</p>`;
    const home = p.home.lat != null ? homeLine : `<div class="row"><input type="text" id="homeQ" value="${esc(p.home.label)}" placeholder="Town or address, e.g. Knoxville, TN" aria-label="Home town or address"><button class="btn" data-act="homeSearch">Find</button><button class="btn ghost" data-act="locateMe">Use my location</button></div><div id="homeResults"></div>${homeLine}`;
    const presetRow = (title, table, act, cur) => `<div class="field"><label>${title}</label><div class="chips">${Object.entries(table).map(([k, v]) => `<button class="chip preset" data-act="${act}" data-k="${k}" aria-pressed="${k === cur}"><b>${v.label}</b><span class="small">${v.blurb}</span></button>`).join("")}</div></div>`;
    const details = `<details class="more" ${st.details ? "open" : ""} data-details="1"><summary>Adjust the details (optional)</summary>
      <p class="small muted">Everything here is already filled in with sensible values. Change only what is different for you.</p>
      ${presetRow("Pace", RT.PACE, "pace", pace)}
      ${presetRow("Comfort and budget", RT.COMFORT, "comfort", comfort)}
      <h3>Travelers</h3>
      <div class="row">${field("Your first name (optional)", `<input type="text" data-bind="profile.traveler" value="${esc(p.traveler)}">`)}
      ${field("People in the vehicle", num("profile.party", p.party, 'min="1" max="9"'))}
      ${field("Longest walk at one stop (miles)", num("profile.rules.walkMiles", p.rules.walkMiles, 'min="0" step="0.5"'))}</div>
      <label class="row"><input type="checkbox" data-bind="profile.flyOk" ${p.flyOk ? "checked" : ""}> Include fly-and-drive trips (Alaska, Hawaii)</label>
      <h3>Driving</h3>
      <div class="row">${field("Most driving hours per day", num("profile.rules.maxDriveHours", p.rules.maxDriveHours, 'min="1" max="14" step="0.5"'))}
      ${field("Usual start time", `<input type="time" data-bind="profile.rules.startTime" value="${esc(p.rules.startTime)}">`)}
      ${field("Stops per day", num("profile.rules.stopsPerDay", p.rules.stopsPerDay, 'min="1" max="8"'))}</div>
      <div class="row">${field("Vehicle fuel economy (MPG)", num("profile.vehicle.mpg", p.vehicle.mpg, 'min="5" max="80"'))}
      ${field("Fuel price ($ per gallon)", num("profile.vehicle.fuelPrice", p.vehicle.fuelPrice, 'min="1" step="0.05"'))}
      ${field("Vehicle height in inches (0 to skip)", num("profile.vehicle.heightIn", p.vehicle.heightIn, 'min="0" max="200"'))}</div>
      <label class="row"><input type="checkbox" data-bind="profile.rules.arriveBeforeSunset" ${p.rules.arriveBeforeSunset ? "checked" : ""}> Warn me when I would reach the hotel after sunset</label>
      <h3>Lodging and dining</h3>
      <div class="row">${field("Hotel brand", `<select data-bind="profile.lodging.brand">${RT.BRANDS.map(b => `<option ${b === p.lodging.brand ? "selected" : ""}>${b}</option>`).join("")}</select>`)}
      ${field("Nightly rate, low ($)", num("profile.lodging.nightlyLow", p.lodging.nightlyLow, 'min="0"'))}
      ${field("Nightly rate, high ($)", num("profile.lodging.nightlyHigh", p.lodging.nightlyHigh, 'min="0"'))}</div>
      <div class="row">${field("Preferred check-in time", `<input type="time" data-bind="profile.rules.checkinTarget" value="${esc(p.rules.checkinTarget)}">`)}
      ${field("Check-in tolerance (minutes)", num("profile.rules.checkinWindow", p.rules.checkinWindow, 'min="0"'))}
      ${field("Diet", `<select data-bind="profile.dining.diet">${DIETS.map(d => `<option ${d === p.dining.diet ? "selected" : ""}>${d}</option>`).join("")}</select>`)}</div>
      <div class="row">${field("Upscale dinners per trip", num("profile.dining.upscaleDinners", p.dining.upscaleDinners, 'min="0"'))}
      ${field("Lunch limit ($)", num("profile.dining.lunchCap", p.dining.lunchCap, 'min="0"'))}
      ${field("Food per day ($)", num("profile.dining.foodPerDay", p.dining.foodPerDay, 'min="0"'))}
      ${field("Trip budget cap, all-in ($)", num("profile.rules.budgetCap", p.rules.budgetCap, 'min="0" step="50"'))}</div>
    </details>`;
    return `${hero()}<div class="card">
      <h2>Where are you starting from?</h2>${home}
      <h2>When, where, and for how long?</h2>
      <div class="row">${field("Leaving on", `<input type="date" data-bind="startDate" value="${esc(st.startDate)}">`)}
      ${field("Nights away", num("nights", st.nights, 'min="1" max="21"'))}</div>
      ${whereTo(p, "cityList")}
      <h2>What do you enjoy?</h2><p class="small muted">Three are picked already. Tap to change; more picks sharpen the ranking.</p>
      ${interestChips(p)}
      ${details}
      <p class="small muted" style="margin:14px 0 0">When you are ready, tap <b>Next: Show me trips</b> below. Trips are ranked for your interests, the season, and the drive from home.</p></div>`;
  }

  function statesGrid(editable) {
    const planned = new Set(st.trip ? st.trip.states || [] : []), v = new Set(st.profile.visited);
    return `<div class="states">${RT_STATES.map(s => `<button class="state ${v.has(s.abbr) ? "visited" : ""} ${planned.has(s.abbr) && !v.has(s.abbr) ? "planned" : ""}" ${editable ? `data-act="toggleState" data-s="${s.abbr}"` : ""} aria-pressed="${v.has(s.abbr)}">${s.abbr} <span class="small">${s.name}</span></button>`).join("")}</div>`;
  }

  // ---------- destinations ----------
  function vDestinations() {
    const p = st.profile, state = p.destState || "";
    if (!st.recs.length) st.recs = RT.rankWithPick(p, RT_CATALOG, st.month || +st.startDate.slice(5, 7), +st.nights, state, pickDest());
    const ai = !!p.aiKey, stName = state ? (RT_STATE_BY_ABBR[state] || {}).name || state : "";
    const pick = st.recs[0] && st.recs[0].pick ? st.recs[0] : null, best = pick ? 1 : 0;
    const shown = state ? st.recs : st.recs.slice(0, 12 + best);
    const missing = p.destPlace && p.destPlace.missing ? p.destPlace.q : "";
    const places = r => { const list = r.stopsRanked.slice(0, 10).map(s => s.hits ? `<b>${esc(s.name)}</b>` : esc(s.name)).join(" · "); return r.stopsRanked.length > 10 ? `${list} · and ${r.stopsRanked.length - 10} more` : list; };
    const card = (r, i) => `<div class="card dest ${r.pick ? "pick" : i === best ? "best" : ""}" data-act="build" data-i="${i}" role="button" tabindex="0" aria-label="Build ${esc(r.dest.name)}">
        <div class="dest-art">${scene(r.dest)}${r.pick ? `<span class="rank pin" title="Your city">${icon("pin")}</span><span class="best-tag">Your city</span>` : `<span class="rank" title="Rank ${r.rank}">#${r.rank}</span>${i === best ? `<span class="best-tag">Best match</span>` : ""}`}</div>
        <div class="row" style="justify-content:space-between"><strong class="dest-name">${esc(r.dest.name)}</strong><span class="fit ${r.label.replace(/\s.*/, "")}">${r.label}</span></div>
        <div class="small muted">Stay in <b>${esc(r.city)}</b> · ${esc(r.dest.states.join(", "))} · best ${r.dest.months.map(m => MONTHS[m - 1]).join(" ")}</div>
        <ul class="small">${r.reasons.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        ${r.stopsRanked.length ? `<div class="small"><span class="muted">Places, best matches first:</span> ${places(r)}</div>` : ""}
        ${r.stopsRanked.some(s => s.tags.includes("fishing")) ? fishLine(r.dest.states) : ""}
        ${experiencesList(r.dest.experiences)}
        <div class="row" style="margin-top:8px"><button class="btn small" data-act="build" data-i="${i}">Build this trip</button>${ai ? `<button class="btn small ghost" data-act="buildAI" data-i="${i}">Build with AI</button>` : ""}</div></div>`;
    const title = pick ? `${esc(pick.dest.name)} first, then ${state ? `${esc(stName)} ranked for you` : "more ideas ranked for you"}` : state ? `${esc(stName)}: cities ranked for you` : "Recommended trips";
    const lead = pick ? `Your city is first. ${state ? `Below it, every other catalog trip that includes ${esc(stName)}` : "Below it, other trips"}, ranked by your interests, the season, and the drive from home.` : state ? `Every catalog trip that includes ${esc(stName)}, ranked by your interests, the season, and the drive from home. #1 is the best fit. A trip that crosses the state line may stay in a neighboring state.` : "Ranked for your interests, the season, new states, and the drive from home. Tap a trip to build it.";
    return `<div class="pagehead">${icon("route", "ico big")}<h1>${title}</h1></div>
      <p class="muted">${lead} <button class="btn small ghost" data-act="startOver">Change my answers</button></p>
      ${missing ? `<p class="note warnline">Could not find <b>${esc(missing)}</b> on the map. Check the spelling, add the state (for example ${esc(missing)}, ${esc(state || "TN")}), or leave City blank.</p>` : ""}
      <div class="noprint" style="margin-bottom:10px">${whereTo(p, "cityList2")}
      <div class="row">${field("Month to rank for", `<select data-bind="month" data-rescore="1"><option value="">Trip month</option>${MONTHS.map((m, i) => `<option value="${i + 1}" ${st.month == i + 1 ? "selected" : ""}>${m}</option>`).join("")}</select>`)}
      ${ai ? `<button class="btn ghost" data-act="aiOpen">Ask AI for a custom trip</button>` : ""}</div></div>
      <details class="more"><summary>Your interests and states visited</summary>
        <p class="small muted">Tap to change. New states rank higher.</p>
        ${interestChips(p)}
        ${statesGrid(true)}</details>
      ${shown.length ? `<div class="grid">${shown.map(card).join("")}</div>` : `<div class="card"><p>No catalog city in ${esc(stName)} yet. Type a town in City, pick "Anywhere within reach", or add one (see docs/CATALOG.md in the project).</p></div>`}
      ${!ai ? `<p class="small muted">Optional: AI-written itineraries need your own Anthropic API key. <button class="btn small ghost" data-act="go" data-t="settings">Set it up in Settings</button></p>` : ""}`;
  }
  // The traveler's own pick from the City field: a catalog trip, a looked-up town, or
  // none. A saved pick counts only while City and Where to still say what it was for.
  const cityNow = () => (st.profile.destCity || "").trim();
  const pickFresh = () => { const d = st.profile.destPlace; return !!d && d.q === cityNow() && (d.st || "") === (st.profile.destState || ""); };
  function pickDest() {
    const d = st.profile.destPlace; if (!pickFresh() || d.missing) return null;
    if (d.id) return RT_CATALOG.find(x => x.id === d.id) || null;
    return d.lat != null ? RT.cityDestination({ label: String(d.label || d.q), lat: +d.lat, lon: +d.lon, abbr: RT_STATE_BY_ABBR[d.abbr] ? d.abbr : "" }, RT_CATALOG) : null;
  }
  // Turn the City text into a pick. Catalog towns need no network; any other town is
  // looked up once (OpenStreetMap) and remembered with the profile. One lookup runs at
  // a time, and a result is dropped if City or Where to changed while it ran.
  let resolving = null;
  function resolveCity() {
    if (resolving) return resolving;
    resolving = (async () => {
      const p = st.profile;
      for (let guard = 0; guard < 3 && !pickFresh(); guard++) {
        const q = cityNow(), state = p.destState || "";
        if (!q) { p.destPlace = null; break; }
        const hit = RT.matchCatalogCity(q, RT_CATALOG, state);
        if (hit) { p.destPlace = { q, st: state, id: hit.id }; break; }
        const stName = state ? (RT_STATE_BY_ABBR[state] || {}).name || "" : "";
        const query = q.includes(",") || !stName || RT.splitTown(q)[1] ? q : `${q}, ${stName}`;
        toast(`Looking up ${q}…`);
        let place = null, failed = false;
        try {
          let r = (await RT.services.geocode(query))[0];
          if (!r && query !== q) r = (await RT.services.geocode(q))[0];
          if (r) { const ab = r.state && RT_STATE_BY_NAME[r.state.toLowerCase()]; place = { q, st: state, label: [r.label.split(",")[0].trim(), ab ? ab.abbr : r.state].filter(Boolean).join(", "), lat: r.lat, lon: r.lon, abbr: ab ? ab.abbr : "" }; }
        } catch (e) { failed = true; }
        if (cityNow() !== q || (p.destState || "") !== state) continue; // the traveler changed it meanwhile: look up the new text
        if (failed) { p.destPlace = null; toast(`Could not look up ${q} right now (offline?). Showing the best cities instead.`); break; }
        p.destPlace = place || { q, st: state, missing: true };
        toast(place ? `Found ${place.label}` : `Could not find ${q}. Check the spelling, or leave City blank.`);
      }
      st.recs = [];
    })().finally(() => { resolving = null; });
    return resolving;
  }
  const needsCity = () => !!cityNow() && !pickFresh();

  // ---------- trip editor ----------
  const stopLine = (s, di, si, n, shown, leg) => {
    const k = `${di}-${si}`, open = st.open.has(k);
    const when = s.arrive && s.depart ? `${U.hm12(s.arrive)} to ${U.hm12(s.depart)}` : s.arrive ? `arrive ${U.hm12(s.arrive)}` : s.depart ? `leave ${U.hm12(s.depart)}` : "";
    const editor = `<div class="edit">
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
            <button class="btn small warn" data-act="del" data-d="${di}" data-s="${si}">Remove</button></div><div id="loc-${di}-${si}"></div>`;
    return `<div class="stop ${open ? "open" : ""}"><div class="num">${shown ? n : "↺"}</div><div>
          <div class="row line"><div class="grow"><b>${esc(s.name)}</b>${s.checkin ? ` <span class="tag">check-in</span>` : ""}${s.timed_entry ? ` <span class="tag">entry ${U.hm12(s.timed_entry)}</span>` : ""}<span class="small muted"> ${when}</span>
            <div class="small muted">${esc(s.address)}${leg ? ` · ${leg} drive from the last stop` : ""}</div></div>
            <button class="btn small ghost" data-act="toggleStop" data-d="${di}" data-s="${si}" aria-expanded="${open}">${open ? "Done" : "Edit"}</button></div>
          ${s.notes ? `<div class="small note">${esc(s.notes)}</div>` : ""}
          ${open ? editor : ""}</div></div>`;
  };
  // The trip's own catalog trip, the trips a town trip draws from, and any day trips.
  const tripExpIds = t => [...new Set([t.destId, ...(t.nearIds || []), ...t.days.filter(d => /^Day trip: /.test(d.title)).map(d => (RT_CATALOG.find(x => x.name === d.title.slice(10)) || {}).id)])].filter(Boolean);
  function tripExperiences(t) {
    const ids = tripExpIds(t);
    const items = ids.flatMap(id => { const d = RT_CATALOG.find(x => x.id === id); return d && d.experiences ? d.experiences.map(e => [d, e]) : []; });
    if (!items.length) return "";
    return `<div class="card exp-card"><h2 style="margin-top:0">Unique experiences on this trip</h2><ul class="exp-links">${items.map(([d, e]) => `<li>${esc(e)} <a class="small" href="${esc(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.replace(/\s*\(.*\)$/, "") + " near " + d.base[0])}`)}" target="_blank" rel="noopener">find it on the map</a></li>`).join("")}</ul><p class="small muted">Seasons, tickets, and reservations change: confirm dates and booking before you go.</p></div>`;
  }
  function vTrip() {
    const t = st.trip;
    if (!t) return `<h1>Trip</h1><div class="card"><p>No trip yet. Answer three questions and pick a destination, or open a saved trip file.</p><div class="row"><button class="btn" data-act="go" data-t="interview">Plan a trip</button><label class="btn ghost">Load trip file<input type="file" accept=".json,application/json" data-act="loadTrip" hidden></label></div></div>`;
    const f = st.findings, errs = f.filter(x => x.level === "ERROR").length, warns = f.filter(x => x.level === "WARN").length;
    const routed = t.days.filter(d => st.routes[d.date]).length;
    const near = t.base ? RT.nearbyDestinations(t, RT_CATALOG, st.profile).slice(0, 6) : [];
    const hasFree = t.days.some(RT.isFreeDay);
    let n = 0;
    const status = st.busy ? `<p class="muted">${esc(st.busy)}</p>` : `<p class="small ${errs ? "lvl ERROR" : warns ? "lvl WARN" : "ok"}">${errs ? `${errs} problem${errs > 1 ? "s" : ""} to fix` : warns ? `${warns} thing${warns > 1 ? "s" : ""} to look at` : "Plan checks out"}${routed ? `; drive times checked for ${routed} of ${t.days.length} days` : "; drive times are estimates (Tools, Check drive times)"}.</p>`;
    return `<h1>${esc(t.name)}</h1>
      ${st.tripHint ? `<div class="hint noprint"><div><b>Your trip is drafted and checked.</b> Tap <b>Edit</b> on any stop to change it, or add a stop with the search box under each day. When it looks right, go on to the next steps, or use <b>Next</b> at the bottom of the page:
        <div class="row" style="margin-top:8px"><button class="btn small" data-act="go" data-t="navigate">4 Navigate: driving links</button><button class="btn small ghost" data-act="go" data-t="weather">5 Weather &amp; Roads: forecast</button><button class="btn small ghost" data-act="go" data-t="budget">6 Budget &amp; Booking: costs</button></div></div><button class="btn ghost small" data-act="hideTripHint">Got it</button></div>` : ""}
      <div class="card noprint"><div class="row">
        <button class="btn" data-act="saveTrip">Save trip file</button>
        <button class="btn ghost" data-act="itinerary">Download itinerary</button>
        <label class="btn ghost">Load trip file<input type="file" accept=".json,application/json" data-act="loadTrip" hidden></label>
        <details class="more inline"><summary>Tools</summary><div class="row" style="margin-top:8px">
          <button class="btn small ghost" data-act="check">Check plan</button>
          <button class="btn small ghost" data-act="routeAll">Check drive times</button>
          <button class="btn small ghost" data-act="retime" ${Object.keys(st.routes).length ? "" : "disabled"}>Re-time from drive times</button>
          <button class="btn small ghost" data-act="print">Print</button>
          <button class="btn small warn" data-act="clearTrip">Clear trip</button></div></details></div>
        ${status}
        ${f.length ? f.map(x => `<div class="finding ${x.level}"><span class="lvl ${x.level}">${x.level}</span>${esc(x.day)} | ${esc(x.check)}: ${esc(x.msg)}</div>`).join("") : ""}
      </div>
      ${tripExperiences(t)}
      ${fishingOn() && fishLinks(t.states || []) ? `<div class="card fish-card"><h2 style="margin-top:0">${icon("fishing", "ico big")} Fishing license</h2><p class="fish-license">Buy it online from the state's wildlife agency: ${fishLinks(t.states || [])}</p><p class="small muted">Rules, ages, seasons, and fees differ by state, and national parks can set their own fishing rules. Check before you cast.</p></div>` : ""}
      ${hasFree && near.length ? `<div class="card noprint"><h2 style="margin-top:0">Free days: add a day trip</h2><p class="small muted">Within reach of ${esc(t.base.addr)}. Tap one to fill your free days with its best stops.</p><div class="chips">${near.map(x => `<button class="chip" data-act="addDest" data-id="${x.dest.id}">${esc(x.dest.name)} <span class="small muted">(${x.hours < 1 ? "under an hour" : `about ${Math.round(x.hours)} h`} away)</span></button>`).join("")}</div></div>` : ""}
      ${t.days.map((d, di) => { const r = st.routes[d.date]; return `<div class="card">
        <div class="row dayhead" style="justify-content:space-between"><div class="row"><span class="shield" aria-hidden="true"><small>DAY</small>${di + 1}</span><h2 style="margin:0">Day ${di + 1} | ${U.dayLabel(d.date)}</h2></div>
        ${r ? `<span class="small muted">${Math.round(r.legs.reduce((a, l) => a + l.meters, 0) / 1609.344)} mi, ${(r.legs.reduce((a, l) => a + l.seconds, 0) / 3600).toFixed(1)} h of driving</span>` : ""}</div>
        <input type="text" data-tripbind="days.${di}.title" value="${esc(d.title)}" aria-label="Day title">
        ${d.stops.map((s, si) => { const shown = !(di > 0 && si === 0); if (shown) n++; const leg = r && si > 0 && r.legs[si - 1] ? legText(r.legs[si - 1].seconds) : ""; return stopLine(s, di, si, n, shown, leg); }).join("")}
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
        <p class="small muted">Google My Maps: create a map, import the CSV for pins, then import each day's KML as its own layer to draw the driving routes (check drive times first: <button class="btn small ghost" data-act="routeAll">Check drive times</button>). The Google Maps phone app does not show My Maps routes, so use the links above on the road.</p></div>`;
  }
  const noTrip = () => `<div class="card"><p>There is no trip yet. Plan one, then come back to this step.</p><div class="row"><button class="btn" data-act="go" data-t="interview">Plan a trip</button><label class="btn ghost">Load trip file<input type="file" accept=".json,application/json" data-act="loadTrip" hidden></label></div></div>`;

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
      <tr><th>Total</th><th>${money(b.total[0])}</th><th>${money(b.total[1])}</th><td class="small">${b.routed ? "routed miles" : `estimated miles <button class="btn small ghost" data-act="routeAll">Check drive times</button>`}</td></tr></table></div>
      <p class="${over > 0 ? "lvl WARN" : "small"}">${over > 0 ? `High estimate is ${money(over)} over your ${money(b.cap)} cap.` : `Within your ${money(b.cap)} cap.`}</p>
      <p class="small muted">Estimates only. Replace with real hotel rates and admission prices before you book.</p></div>
      <div class="card"><h2>Booking checklist</h2><p class="small muted">You book. The app never reserves or pays.</p><ul>
      ${book.map(x => x.type === "hotel" ? `<li>☐ Hotel: ${esc(x.s.name)}, night of ${U.dayLabel(x.d.date)} · ${x.s.booking_url ? `<a href="${esc(x.s.booking_url)}" target="_blank" rel="noopener">book or search</a>` : `<a href="${esc(RT.lodgingSearchUrl(st.profile.lodging.brand, x.s.address))}" target="_blank" rel="noopener">search hotels</a>`}</li>` : `<li>☐ ${esc(x.s.name)}, ${U.dayLabel(x.d.date)}${x.s.timed_entry ? ` (entry ${U.hm12(x.s.timed_entry)})` : ""} ${x.s.booking_url ? `· <a href="${esc(x.s.booking_url)}" target="_blank" rel="noopener">book</a>` : ""}</li>`).join("")}</ul>
      ${fishingOn() && fishLinks(t.states || []) ? `<div class="fish-license small">☐ Buy online: ${fishLinks(t.states || [])}</div>` : ""}
      <p class="small muted">To add a booking link, open the itinerary, tap <b>Edit</b> on the stop, and fill in <b>Booking link</b>. <button class="btn small ghost" data-act="go" data-t="trip">Open the itinerary</button></p></div>`;
  }

  // ---------- tracker ----------
  function vTracker() {
    const v = st.profile.visited.length;
    return `<h1>50-state tracker</h1><div class="card"><div class="row" style="justify-content:space-between"><strong>${v} of 50 visited</strong><span class="small muted">Gold outline: in the current trip</span></div>
      <div class="bar" aria-hidden="true"><i style="width:${v * 2}%"></i></div><p class="small muted">A state counts as visited when you made a planned stop or stayed overnight there. Tap to toggle.</p>${statesGrid(true)}
      ${st.trip ? `<div class="row" style="margin-top:10px"><button class="btn" data-act="markDone">Trip completed: mark its states visited</button></div>` : ""}</div>`;
  }

  // ---------- feedback ----------
  // Testers answer here. "Open on GitHub" fills in the repository's tester feedback
  // form (.github/ISSUE_TEMPLATE/tester-feedback.yml): GitHub fills each form field
  // from the URL parameter named after the field's id. Nothing is sent until the
  // tester presses Create on GitHub. Home is never included.
  function deviceText() {
    const ua = navigator.userAgent || "", d = device();
    const where = window.pywebview ? "desktop window" : d.installed ? "home-screen app" : "browser";
    const browser = /Edg\//.test(ua) ? "Edge" : /CriOS|Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "browser";
    const kind = d.ios ? (/iPhone/.test(ua) ? "iPhone" : "iPad") : d.android ? (/Mobile/.test(ua) ? "Android phone" : "Android tablet") : /Windows/.test(ua) ? "Windows computer" : /Mac/.test(ua) ? "Mac" : /Linux/.test(ua) ? "Linux computer" : "computer";
    return `${kind}, ${browser} (${where})`;
  }
  const FB_FIELDS = [["task", "What were you trying to do?", "For example, plan a long weekend near the coast"], ["liked", "What worked well?", ""], ["problems", "What was confusing or did not work?", ""], ["ideas", "What would you add or change?", "A feature, a destination, a lighthouse we missed"]];
  const fbTrip = () => st.fb.includeTrip && st.trip ? `${st.trip.name}, ${Math.max(0, st.trip.days.length - 1)} nights` : "";
  function fbParams() {
    const f = st.fb, clip = (x, n = 1000) => { x = String(x || "").trim(); return x.length > n ? x.slice(0, n) + " (shortened)" : x; };
    const first = (f.task || f.problems || f.ideas || f.liked || "Tester feedback").trim().split("\n")[0].slice(0, 60);
    const out = [["template", "tester-feedback.yml"], ["title", `[Feedback]: ${first}`], ["device", clip(f.device || deviceText(), 120)], ["version", APP_VERSION],
      ["task", clip(f.task)], ["ease", f.ease ? `${f.ease} of 5` : ""], ["liked", clip(f.liked)], ["problems", clip(f.problems)], ["ideas", clip(f.ideas)], ["trip", fbTrip()]];
    return out.filter(([, v]) => v);
  }
  RT.feedbackUrl = () => `${REPO}/issues/new?` + fbParams().map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  function fbText() {
    const f = st.fb, ans = x => (x || "").trim() || "(no answer)";
    return [`# Road Trip Planner feedback`, ``, `Date: ${new Date().toISOString().slice(0, 10)}`, `Device: ${f.device || deviceText()}`, `App version: ${APP_VERSION}`, fbTrip() ? `Trip: ${fbTrip()}` : "", ``,
      `## What were you trying to do?`, ans(f.task), ``, `## How easy was it? (1 hard, 5 easy)`, f.ease ? `${f.ease} of 5` : "(no answer)", ``,
      `## What worked well?`, ans(f.liked), ``, `## What was confusing or did not work?`, ans(f.problems), ``, `## What would you add or change?`, ans(f.ideas), ``].filter((x, i, a) => x !== "" || a[i - 1] !== "").join("\n");
  }
  function vFeedback() {
    const f = st.fb; if (!f.device) f.device = deviceText();
    const ease = [1, 2, 3, 4, 5].map(n => `<button class="ease-btn" data-act="fbEase" data-fb-ease="${n}" aria-pressed="${String(f.ease) === String(n)}">${n}<span class="small">${["", "Hard", "", "Okay", "", "Easy"][n]}</span></button>`).join("");
    return `<div class="pagehead">${icon("feedback", "ico big")}<h1>Give feedback</h1></div>
      <div class="card"><p>Testing the app? Tell us what worked and what got in the way. Short answers are fine, and any question can be skipped.</p>
      ${FB_FIELDS.slice(0, 1).map(([k, l, ph]) => field(l, `<textarea rows="2" data-fb="${k}" placeholder="${esc(ph)}">${esc(f[k])}</textarea>`)).join("")}
      <div class="field"><label>How easy was it? (1 hard, 5 easy)</label><div class="ease" role="group" aria-label="Ease, 1 to 5">${ease}</div></div>
      ${FB_FIELDS.slice(1).map(([k, l, ph]) => field(l, `<textarea rows="3" data-fb="${k}" placeholder="${esc(ph)}">${esc(f[k])}</textarea>`)).join("")}
      <div class="row">${field("Device and browser", `<input type="text" data-fb="device" value="${esc(f.device)}">`)}${field("App version", `<input type="text" value="${APP_VERSION}" readonly>`)}</div>
      <label class="row"><input type="checkbox" data-fb="includeTrip" ${f.includeTrip ? "checked" : ""}> Include the trip I am planning (destination and number of nights only, never your home)</label>
      <div class="row" style="margin-top:12px"><button class="btn" data-act="fbGithub">Open on GitHub</button><button class="btn ghost" data-act="fbSave">Save as a file</button><button class="btn ghost" data-act="fbCopy">Copy text</button></div>
      <p class="small muted">Open on GitHub fills in the tester form on a new page; check it and press Create there. Posting needs a free GitHub account. No account? Tap Save as a file and send it to the person who asked you to test. GitHub pages are public, so leave out your address and booking numbers.</p></div>
      <div class="card"><h2 style="margin-top:0">More ways to help</h2><ul class="links">
        <li><a href="${REPO}/discussions/categories/ideas" target="_blank" rel="noopener">Share an idea or talk it through</a> <span class="small muted">GitHub Discussions</span></li>
        <li><a href="${REPO}/issues/new?template=suggest-improvement.yml" target="_blank" rel="noopener">Suggest an improvement</a></li>
        <li><a href="${REPO}/issues/new?template=bug-report.yml" target="_blank" rel="noopener">Report a problem</a></li>
        <li><a href="${REPO}" target="_blank" rel="noopener">See the project on GitHub</a></li></ul></div>`;
  }

  // ---------- settings ----------
  function vSettings() {
    const p = st.profile;
    return `<h1>Settings</h1>${vDevices()}
      <div class="card"><h2>Optional AI itineraries</h2><p class="small muted">Skip this unless you want Claude to write custom itineraries. Everything else in the app works without it.</p>
      <ol class="steps-list small"><li>Create a Claude Console account at <a href="https://platform.claude.com" target="_blank" rel="noopener">platform.claude.com</a>.</li>
        <li>Make a key on the <a href="https://platform.claude.com/settings/keys" target="_blank" rel="noopener">API keys page</a>, then paste it below.</li></ol>
      <p class="small muted">The key stays in this browser and is sent only to api.anthropic.com. Usage is billed to your Console account.</p>
      ${field("API key", `<input type="password" data-bind="profile.aiKey" value="${esc(p.aiKey)}" autocomplete="off">`)}
      ${field("Model", `<input type="text" data-bind="profile.aiModel" value="${esc(p.aiModel)}">`)}</div>
      <div class="card"><h2>Place search and routing</h2><p class="small muted">Both are free public services. No sign-up or account is needed, and you can leave both boxes empty.</p>
      ${field("Contact email for place search (optional)", `<input type="email" data-bind="profile.contactEmail" value="${esc(p.contactEmail || "")}" placeholder="Leave empty unless you search a lot">`)}
      <p class="small muted">No sign-up: this is not an account. OpenStreetMap asks people who make large numbers of searches to include an email so its volunteers can reach them if there is a problem. Planning a trip is a light load. If you fill it in, it is sent only with place searches to OpenStreetMap.
        <a href="https://operations.osmfoundation.org/policies/nominatim/" target="_blank" rel="noopener">Place search usage policy</a> · <a href="https://nominatim.org/release-docs/latest/api/Search/" target="_blank" rel="noopener">What the email is for</a></p>
      ${field("Routing server (optional)", `<input type="url" data-bind="profile.osrmUrl" value="${esc(p.osrmUrl || "")}" placeholder="https://router.project-osrm.org">`)}
      <p class="small muted">Leave empty to use the free public OSRM demo server. It is for light use and has no traffic data. To use your own OSRM server, paste its address. <a href="https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy" target="_blank" rel="noopener">Demo server usage policy</a></p></div>
      <div class="card"><h2>Your data</h2><p class="small muted">Everything stays in this browser. Back it up or move it to another device with a file.</p>
      <div class="row"><button class="btn" data-act="backup">Back up all data</button><label class="btn ghost">Restore from file<input type="file" accept=".json,application/json" data-act="restore" hidden></label><button class="btn warn" data-act="reset">Erase all data</button></div></div>
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
  function setHome(h) { st.profile.home = h; st.recs = []; toast(`Starting from ${h.label}`); render(); }
  // After a draft: routed drive times, then re-timed stops, in one pass. Fails soft offline.
  async function routeAndRetime() {
    const t = st.trip; if (!t) return;
    let ok = 0, skip = 0;
    for (const d of t.days) { st.busy = `Checking drive times for ${U.dayLabel(d.date)}…`; render(); try { st.routes[d.date] = await RT.services.routeDay(d); ok++; } catch (e) { skip++; } }
    if (ok) t.days.forEach(d => RT.retimeDay(d, st.routes[d.date]));
    st.busy = ""; runCheck(); render();
    toast(ok ? `Drive times checked for ${ok} day(s)${skip ? `; ${skip} skipped (a stop without a location, or offline)` : ""}` : "Could not reach the routing service; times are estimates for now");
  }

  const actions = {
    go: el => setTab(el.dataset.t),
    homeSearch: () => searchInto($("#homeQ").value, "#homeResults", r => { const ab = r.state && RT_STATE_BY_NAME[r.state.toLowerCase()]; setHome({ label: [r.label.split(",")[0].trim(), ab ? ab.abbr : r.state].filter(Boolean).join(", "), lat: r.lat, lon: r.lon, state: r.state }); }),
    homeClear: () => { st.profile.home = { label: "", lat: null, lon: null, state: "" }; st.recs = []; render(); },
    locateMe: async () => {
      toast("Asking this device for its location…");
      let pos; try { pos = await RT.services.myPosition(); } catch (e) { toast(`Could not get a location: ${e.message}. Type your town instead.`); return; }
      let home = { label: `Near ${pos.lat.toFixed(2)}, ${pos.lon.toFixed(2)}`, lat: pos.lat, lon: pos.lon, state: "" };
      try { home = await RT.services.reverse(pos.lat, pos.lon); } catch (e) { /* keep the coordinates; the town name is a nicety */ }
      setHome(home);
    },
    interest: el => { const k = el.dataset.k, a = st.profile.interests; const i = a.indexOf(k); i >= 0 ? a.splice(i, 1) : a.push(k); el.setAttribute("aria-pressed", String(i < 0)); st.recs = []; if (st.tab === "destinations") render(); else persist(); },
    pace: el => { RT.applyPace(st.profile, el.dataset.k); st.details = true; st.recs = []; render(); toast(`${RT.PACE[el.dataset.k].label} pace set`); },
    comfort: el => { RT.applyComfort(st.profile, el.dataset.k, +st.nights); st.details = true; render(); toast(`${RT.COMFORT[el.dataset.k].label}: budget cap now ${money(st.profile.rules.budgetCap)}`); },
    toggleState: el => { const a = st.profile.visited, s = el.dataset.s, i = a.indexOf(s); i >= 0 ? a.splice(i, 1) : a.push(s); st.recs = []; render(); },
    findDest: async () => { const f = $("[data-bind='profile.destCity']"); if (f) st.profile.destCity = f.value; if (st.profile.home.lat == null) { toast("Tell the app where you start: type your town or tap Use my location"); const q = $("#homeQ"); if (q) q.focus(); return; } st.recs = []; await resolveCity(); setTab("destinations"); },
    startOver: () => { st.recs = []; setTab("interview"); },
    build: async el => {
      const r = st.recs[+el.dataset.i]; if (!r) return;
      st.trip = RT.draftTrip(st.profile, r.dest, st.startDate, +st.nights, RT_CATALOG); st.routes = {}; st.weather = []; st.open = new Set();
      let hide = false; try { hide = localStorage.getItem(HINT_TRIP) === "hide"; } catch (e) { }
      st.tripHint = !hide;
      runCheck(); setTab("trip");
      await routeAndRetime();
    },
    addDest: el => { const near = RT.nearbyDestinations(st.trip, RT_CATALOG, st.profile).find(n => n.dest.id === el.dataset.id); const n = RT.fillFreeDays(st.trip, st.profile, near); if (!n) { toast("No free day left to fill"); return; } st.trip.days.forEach(d => { if (d.title.startsWith("Day trip")) delete st.routes[d.date]; }); runCheck(); render(); toast(`Added ${n} day trip${n > 1 ? "s" : ""} to ${near.dest.name}`); },
    toggleStop: el => { const k = `${el.dataset.d}-${el.dataset.s}`; st.open.has(k) ? st.open.delete(k) : st.open.add(k); render(); },
    fbEase: el => { st.fb.ease = st.fb.ease === el.dataset.fbEase ? "" : el.dataset.fbEase; render(); },
    fbGithub: () => { const u = RT.feedbackUrl(); const cut = ["task", "liked", "problems", "ideas"].some(k => (st.fb[k] || "").trim().length > 1000); window.open(u, "_blank", "noopener"); toast(cut ? "GitHub opened. Long answers were shortened there; Save as a file keeps every word." : "GitHub opened in a new tab. Check the form and press Create."); },
    fbSave: () => download(`road-trip-planner-feedback-${new Date().toISOString().slice(0, 10)}.md`, fbText(), "text/markdown"),
    fbCopy: async () => { try { await navigator.clipboard.writeText(fbText()); toast("Feedback copied. Paste it into an email or message."); } catch (e) { toast("Copy is blocked here. Use Save as a file instead."); } },
    hideTripHint: () => { st.tripHint = false; try { localStorage.setItem(HINT_TRIP, "hide"); } catch (e) { } render(); },
    buildAI: async el => { const r = st.recs[+el.dataset.i]; await aiBuild(r.dest); },
    aiOpen: async () => { const notes = prompt("Describe the trip you want (places, pace, must-sees):") || ""; await aiBuild(null, notes); },
    check: () => { runCheck(); render(); },
    routeAll: async () => { const t = st.trip; let ok = 0, skip = 0; for (const d of t.days) { st.busy = `Routing ${U.dayLabel(d.date)}…`; render(); try { st.routes[d.date] = await RT.services.routeDay(d); ok++; } catch (e) { skip++; } } st.busy = ""; runCheck(); render(); toast(`Routed ${ok} day(s)${skip ? `, skipped ${skip} (missing coordinates or offline)` : ""}`); },
    retime: () => { let n = 0; st.trip.days.forEach(d => { if (RT.retimeDay(d, st.routes[d.date])) n++; }); runCheck(); render(); toast(n ? `Re-timed ${n} day(s) from routed drive times` : "Tap Check drive times first"); },
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
    dlKml: () => { const t = st.trip; let n = 0; const files = t.days.map((d, i) => { const r = st.routes[d.date]; if (r) n++; return { name: `${slug(t.name)}-day${i + 1}.kml`, text: RT.kmlDay(t, i, r), type: "application/vnd.google-earth.kml+xml" }; }); saveFiles(files, n ? "" : " Pins only; tap Check drive times (Itinerary, Tools) for route lines."); },
    dlLinks: () => download(`${slug(st.trip.name)}-links.html`, linksHtml(), "text/html"),
    weather: async () => { st.weather = []; const seen = new Set(); for (const d of st.trip.days) for (const s of d.stops) { if (s.lat == null || s.lat === "") continue; const k = `${d.date}|${(+s.lat).toFixed(2)}|${(+s.lon).toFixed(2)}`; if (seen.has(k)) continue; seen.add(k); st.busy = `Checking ${s.name}…`; try { const w = await RT.services.weatherFor(s.lat, s.lon, d.date); if (w.tz) d.tz = w.tz; st.weather.push({ day: U.dayLabel(d.date), stop: s.name, ...w }); } catch (e) { st.weather.push({ day: U.dayLabel(d.date), stop: s.name, forecast: [`UNVERIFIED: weather service unavailable (${e.message})`], alerts: [], page: RT.services.forecastPage(s.lat, s.lon) }); } render(); } st.busy = ""; runCheck(); render(); },
    markDone: () => { const v = new Set(st.profile.visited); (st.trip.states || []).forEach(s => v.add(s)); st.profile.visited = [...v]; toast("States marked visited"); render(); },
    backup: () => download("road-trip-planner-backup.json", JSON.stringify({ format: "road-trip-planner-backup/1", profile: { ...st.profile, aiKey: "" }, trip: st.trip, routes: st.routes }, null, 2), "application/json"),
    install: async () => { if (!installEvt) return; const ev = installEvt; installEvt = null; ev.prompt(); try { await ev.userChoice; } catch (e) { } showInstall(); render(); },
    hideInstall: () => { try { localStorage.setItem(HINT, "hide"); } catch (e) { } showInstall(); toast("Install steps are in Settings any time"); },
    reset: () => { if (confirmBox("Erase all saved data in this browser?")) { try { localStorage.removeItem(KEY); } catch (e) { } location.reload(); } }
  };
  function confirmBox(msg) { return window.confirm(msg); }
  function move(di, si, dir) { const a = st.trip.days[di].stops, j = si + dir; if (j < 0 || j >= a.length) return; [a[si], a[j]] = [a[j], a[si]]; delete st.routes[st.trip.days[di].date]; runCheck(); render(); }

  async function aiBuild(dest, notes) {
    st.busy = "Asking the AI to draft an itinerary…"; setTab("trip");
    try { const t = await RT.services.aiDraft(st.profile, dest, st.startDate, +st.nights, notes); st.trip = t; st.routes = {}; runCheck(); render(); await routeAndRetime(); toast("AI draft ready. It is a draft: verify every detail before you book."); }
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
${(() => { const xs = tripExpIds(t).flatMap(id => (RT_CATALOG.find(x => x.id === id) || {}).experiences || []); return xs.length ? `<h2>Unique experiences</h2><ul>${xs.map(e => `<li>${esc(e)}</li>`).join("")}</ul>` : ""; })()}<h2>Navigation</h2><ul>${t.days.map((d, i) => RT.dayLinks(d).map((u, k, a) => `<li><a href="${esc(u)}">Day ${i + 1} ${esc(d.title)}${a.length > 1 ? ` part ${k + 1}` : ""}</a></li>`).join("")).join("")}</ul>
${fishingOn() && fishLinks(t.states || []) ? `<h2>Fishing licenses</h2><p>Buy online: ${fishLinks(t.states || [])}</p>` : ""}<h2>Weather and road watch</h2><ul>${states.map(s => `<li><a href="${esc(s.roads)}">${esc(s.name)} road conditions</a></li>`).join("")}<li><a href="https://www.nps.gov/planyourvisit/alerts.htm">NPS alerts</a></li>${t.days.map(d => { const s = d.stops[d.stops.length - 1]; return s.lat != null && s.lat !== "" ? `<li><a href="${esc(RT.services.forecastPage(s.lat, s.lon))}">Forecast: ${esc(s.name)} (${U.dayLabel(d.date)})</a></li>` : ""; }).join("")}</ul>
<h2>Plan check</h2><ul>${(st.findings.length ? st.findings : [{ level: "INFO", day: "", check: "", msg: "No findings at export time" }]).map(f => `<li><b>${f.level}</b> ${esc(f.day)} ${esc(f.check)} ${esc(f.msg)}</li>`).join("")}</ul>
<p style="font-size:12px;color:#666">Planning only; verify hours, prices, and closures before travel. Map data © OpenStreetMap contributors.</p></body>`;
  }

  // ---------- use on a tablet or phone ----------
  const PUBLIC_URL = "https://jbrady0850.github.io/road-trip-planner/";
  const HINT = "rtp:installHint";
  let installEvt = null;
  function device() {
    const ua = navigator.userAgent || "";
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const installed = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
    const hosted = /^https?:$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
    return { ios, android: /Android/i.test(ua), installed, hosted };
  }
  function installSteps(d) {
    if (d.installed) return `<p>Installed on this device. Open <b>Road Trips</b> from your home screen.</p>`;
    if (installEvt) return `<p>Add it to this device for one-tap access and offline use.</p><button class="btn" data-act="install">Install app</button>`;
    if (d.ios) return `<ol class="steps-list"><li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button (a square with an arrow pointing up). On iPad it is at the top right; on iPhone it is at the bottom.</li><li>Tap <b>Add to Home Screen</b>, then tap <b>Add</b>.</li></ol>`;
    if (d.android) return `<ol class="steps-list"><li>Open this page in <b>Chrome</b>.</li><li>Tap the menu button (three dots) at the top right.</li><li>Tap <b>Add to Home screen</b> or <b>Install app</b>, then tap <b>Install</b>.</li></ol>`;
    return `<p>On a computer, click the install button at the right end of the address bar in Chrome or Edge, or bookmark this page.</p>`;
  }
  function showInstall() {
    const box = $("#install"), d = device();
    let dismissed = false; try { dismissed = localStorage.getItem(HINT) === "hide"; } catch (e) { }
    const show = !d.installed && !dismissed && d.hosted && (d.ios || d.android || installEvt);
    box.hidden = !show;
    box.innerHTML = show ? `<div><strong>Use it like an app.</strong> Add Road Trip Planner to your home screen so it opens full screen, works offline, and keeps your saved trips.${installSteps(d)}</div><button class="btn ghost small" data-act="hideInstall" aria-label="Hide install tips">Not now</button>` : "";
  }
  function vDevices() {
    const d = device(), here = location.href.split("#")[0].split("?")[0];
    const onPublic = d.hosted && here.startsWith(PUBLIC_URL);
    const addr = d.hosted ? here : PUBLIC_URL;
    const qr = !d.hosted || onPublic ? `<img class="qr" src="qr-app.png" width="160" height="160" alt="QR code for ${esc(PUBLIC_URL)}">` : "";
    return `<div class="card"><h2>Use on a tablet or phone</h2>
      <div class="row" style="align-items:flex-start;gap:16px">${qr}<div style="flex:1;min-width:220px">
      <p>${d.hosted ? "This app runs from this web address. Nothing to download or set up:" : "Open the hosted app in the tablet's web browser. Nothing to download or set up:"}<br><a href="${esc(addr)}">${esc(addr)}</a></p>
      ${qr ? `<p class="small muted">Point the tablet's camera at the code to open it.</p>` : ""}
      <h3>Add it to the home screen</h3>${installSteps(d)}</div></div>
      <p class="small muted">Each device keeps its own trips. To move a trip, use <b>Back up all data</b> below, then <b>Restore from file</b> on the other device. On iPad, the home-screen app and Safari keep separate copies, so plan in the home-screen app.</p></div>`;
  }
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; showInstall(); if (st.tab === "settings") render(); });
  window.addEventListener("appinstalled", () => { installEvt = null; showInstall(); toast("Installed. Open Road Trips from your home screen."); });
  $("#install").addEventListener("click", e => { const el = e.target.closest("[data-act]"); if (el && actions[el.dataset.act]) { e.preventDefault(); actions[el.dataset.act](el); } });

  // ---------- events ----------
  view.addEventListener("click", e => { const el = e.target.closest("[data-act]"); if (el && el.tagName !== "INPUT" && actions[el.dataset.act]) { e.preventDefault(); actions[el.dataset.act](el); } });
  const fbInput = e => { const el = e.target; if (el.dataset && el.dataset.fb) { st.fb[el.dataset.fb] = el.type === "checkbox" ? el.checked : el.value; persist(); } };
  view.addEventListener("input", fbInput);
  view.addEventListener("change", e => {
    fbInput(e);
    const el = e.target;
    if (el.dataset.bind) { let v = el.type === "checkbox" ? el.checked : el.type === "number" ? (el.value === "" ? 0 : +el.value) : el.value; if (el.dataset.bind === "month") v = v ? +v : null; setPath(el.dataset.bind, v); if (el.dataset.rescore || el.dataset.bind === "startDate" || el.dataset.bind === "nights") st.recs = [];
      if (el.dataset.city || (el.dataset.bind === "profile.destState" && cityNow())) { st.recs = []; if (st.tab === "destinations") { render(); resolveCity().then(() => { if (st.tab === "destinations") render(); }); } else if (el.dataset.city) persist(); else render(); }
      else if (el.dataset.rescore) render(); else persist(); }
    if (el.dataset.tripbind) { const ks = el.dataset.tripbind.split("."); const last = ks.pop(); const o = ks.reduce((x, k) => x[k], st.trip); o[last] = el.type === "checkbox" ? el.checked : el.value; if (ks[0] === "days") delete st.routes[st.trip.days[+ks[1]].date]; persist(); }
    if (el.dataset.act === "loadTrip" || el.dataset.act === "restore") readFile(el);
  });
  view.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.dataset && e.target.dataset.city) { e.preventDefault(); st.profile.destCity = e.target.value; st.recs = []; if (st.tab === "interview") actions.findDest(); else { render(); resolveCity().then(() => { if (st.tab === "destinations") render(); }); } return; }
    if (e.key === "Enter" && e.target.id === "homeQ") actions.homeSearch(); if (e.key === "Enter" && /^add-/.test(e.target.id)) actions.addStop({ dataset: { d: e.target.id.slice(4) } }); if ((e.key === "Enter" || e.key === " ") && e.target.matches(".dest[data-act=build]")) { e.preventDefault(); actions.build(e.target); } });
  view.addEventListener("toggle", e => { if (e.target.dataset && e.target.dataset.details) st.details = e.target.open; }, true);
  // Trip files written for the command-line version keep days beside the trip and use snake_case rules.
  function fromCommandLine(j) {
    const map = { max_drive_hours: "maxDriveHours", checkin_target: "checkinTarget", checkin_window_minutes: "checkinWindow", ticket_margin_minutes: "ticketMargin", arrive_before_sunset: "arriveBeforeSunset" };
    Object.entries(j.trip.rules || {}).forEach(([k, v]) => { if (map[k]) st.profile.rules[map[k]] = v; });
    const states = new Set();
    j.days.forEach(d => d.stops.forEach(x => { const m = String(x.address || "").match(/,\s*([A-Z]{2})\b/); if (m && RT_STATE_BY_ABBR[m[1]] && x.type !== "Home") states.add(m[1]); }));
    return { name: j.trip.name || "Road Trip", days: j.days, states: [...states], createdBy: "file" };
  }
  function readFile(el) {
    const f = el.files[0]; if (!f) return; const rd = new FileReader();
    rd.onload = () => { try { const j = JSON.parse(rd.result);
      if (j.format === "road-trip-planner-backup/1") { st.profile = Object.assign(RT.defaultProfile(), j.profile); st.trip = j.trip; st.routes = j.routes || {}; toast("Data restored"); }
      else if (j.trip && j.trip.days) { st.trip = j.trip; if (j.rules) Object.assign(st.profile.rules, j.rules); st.routes = {}; toast("Trip loaded"); }
      else if (j.trip && Array.isArray(j.days)) { st.trip = fromCommandLine(j); st.routes = {}; toast("Trip loaded"); }
      else throw new Error("not a trip file");
      runCheck(); setTab("trip"); } catch (e) { toast("Could not read that file: " + e.message); } };
    rd.readAsText(f);
  }

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
  const foot = $("#foot");
  if (foot) {
    foot.querySelector("#ver").textContent = APP_VERSION;
    foot.addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) { e.preventDefault(); setTab(b.dataset.tab); } });
  }
  if (st.trip) runCheck();
  showInstall();
  setTab(st.tab);
})();
