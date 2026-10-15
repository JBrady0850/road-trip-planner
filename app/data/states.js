/* 50 states. Road-condition links use the official FHWA state traffic-info pages
   (https://highways.dot.gov/traffic-info), which link to each state's own 511 or
   DOT traveler site. "dot" overrides with a verified direct state site. */
window.RT_STATES = [
  ["AL","Alabama","alabama","https://algotraffic.com/"],["AK","Alaska","alaska"],["AZ","Arizona","arizona"],
  ["AR","Arkansas","arkansas"],["CA","California","california"],["CO","Colorado","colorado"],
  ["CT","Connecticut","connecticut"],["DE","Delaware","delaware"],["FL","Florida","florida","https://fl511.com/"],
  ["GA","Georgia","georgia","https://511ga.org/"],["HI","Hawaii","hawaii"],["ID","Idaho","idaho"],
  ["IL","Illinois","illinois"],["IN","Indiana","indiana"],["IA","Iowa","iowa"],["KS","Kansas","kansas"],
  ["KY","Kentucky","kentucky"],["LA","Louisiana","louisiana"],["ME","Maine","maine"],["MD","Maryland","maryland"],
  ["MA","Massachusetts","massachusetts"],["MI","Michigan","michigan"],["MN","Minnesota","minnesota"],
  ["MS","Mississippi","mississippi"],["MO","Missouri","missouri"],["MT","Montana","montana"],
  ["NE","Nebraska","nebraska"],["NV","Nevada","nevada"],["NH","New Hampshire","new-hampshire"],
  ["NJ","New Jersey","new-jersey"],["NM","New Mexico","new-mexico"],["NY","New York","new-york"],
  ["NC","North Carolina","north-carolina","https://drivenc.gov/"],["ND","North Dakota","north-dakota"],
  ["OH","Ohio","ohio"],["OK","Oklahoma","oklahoma"],["OR","Oregon","oregon"],["PA","Pennsylvania","pennsylvania"],
  ["RI","Rhode Island","rhode-island"],["SC","South Carolina","south-carolina"],["SD","South Dakota","south-dakota"],
  ["TN","Tennessee","tennessee"],["TX","Texas","texas"],["UT","Utah","utah"],["VT","Vermont","vermont"],
  ["VA","Virginia","virginia"],["WA","Washington","washington"],["WV","West Virginia","west-virginia"],
  ["WI","Wisconsin","wisconsin"],["WY","Wyoming","wyoming"]
].map(([abbr, name, slug, dot]) => ({abbr, name, slug,
  roads: dot || `https://highways.dot.gov/traffic-info/${slug}`,
  fhwa: `https://highways.dot.gov/traffic-info/${slug}`}));
window.RT_STATE_BY_NAME = Object.fromEntries(window.RT_STATES.map(s => [s.name.toLowerCase(), s]));
window.RT_STATE_BY_ABBR = Object.fromEntries(window.RT_STATES.map(s => [s.abbr, s]));
