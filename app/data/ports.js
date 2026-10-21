/* Cruise ports for the Cruise Day tab. Coordinates are checked against OpenStreetMap
   (docs/catalog-check.md). Hours, fees, and prices change: verify before you go.
   Tender: tender, varies, pier, or unknown (docs/catalog-check.md lists the sources).
   cc: country code (ISO 3166). aka: other names a traveler may type. area: region names from
   the OpenStreetMap point, allowed after the port name in typed text (RT.matchPort).
   Stop format is the catalog's: [name, address, lat, lon, minutes, tags] */
window.RT_PORTS = [
  {"id": "nassau", "name": "Nassau", "region": "Caribbean", "country": "Bahamas", "cc": "bs", "aka": ["New Providence", "Paradise Island"], "area": "Nassau, New Providence, The Bahamas", "tender": "unknown", "left": true, "address": "Nassau cruise port, Bahamas", "lat": 25.0798, "lon": -77.3424, "stops": [
    ["Queen's Staircase", "Queen's Staircase, Nassau, Bahamas", 25.0732, -77.3376, 30, ["history", "scenic"]],
    ["Fort Fincastle", "Fort Fincastle, Nassau, Bahamas", 25.0736, -77.3385, 45, ["history", "scenic"]],
    ["Junkanoo Beach", "Junkanoo Beach, Nassau, Bahamas", 25.0792, -77.3487, 120, ["beach", "water"]],
    ["Cabbage Beach", "Cabbage Beach, Nassau, Bahamas", 25.0859, -77.3184, 150, ["beach", "water", "family"]],
    ["Atlantis Aquaventure", "1 Casino Drive, Nassau, Bahamas", 25.085, -77.3226, 240, ["themeparks", "family", "water"]],
    ["Straw Market", "Straw Market, Nassau, Bahamas", 25.0786, -77.3434, 60, ["markets", "town"]],
    ["Ardastra Gardens, Zoo and Conservation Centre", "Ardastra Gardens, Zoo and Conservation Centre, Nassau, Bahamas", 25.0759, -77.3621, 90, ["wildlife", "gardens", "family"]]
  ]},
  {"id": "grand-cayman", "name": "George Town, Grand Cayman", "region": "Caribbean", "country": "Cayman Islands", "cc": "ky", "aka": ["Grand Cayman", "George Town", "Cayman Islands"], "area": "", "tender": "tender", "left": true, "address": "George Town cruise port, Cayman Islands", "lat": 19.2954, "lon": -81.3808, "stops": [
    ["Queen Elizabeth II Botanic Park", "Queen Elizabeth II Botanic Park, George Town, Cayman Islands", 19.3171, -81.1695, 90, ["gardens", "hiking", "wildlife"]],
    ["Cayman Islands National Museum", "Cayman Islands National Museum, George Town, Cayman Islands", 19.2941, -81.3827, 45, ["history"]],
    ["Hell, Grand Cayman", "Hell, Grand Cayman, West Bay, Cayman Islands", 19.3755, -81.4079, 30, ["scenic", "town"]],
    ["Pedro St. James", "Pedro St. James, George Town, Cayman Islands", 19.2664, -81.2918, 60, ["history"]],
    ["Cayman Spirits Distillery", "Cayman Spirits Distillery, George Town, Cayman Islands", 19.3015, -81.3713, 60, ["drinks"]]
  ]},
  {"id": "cozumel", "name": "Cozumel", "region": "Caribbean", "country": "Mexico", "cc": "mx", "aka": [], "area": "San Miguel, San Miguel de Cozumel, Cozumel, Quintana Roo, México", "tender": "varies", "left": false, "address": "Cozumel cruise port, Mexico", "lat": 20.4759, "lon": -86.9748, "stops": [
    ["Chankanaab Beach Adventure Park", "Chankanaab Beach Adventure Park, San Miguel de Cozumel, Mexico", 20.4427, -86.9938, 180, ["beach", "water", "wildlife", "family"]],
    ["Playa Mia Grand Beach Park", "Playa Mia Grand Beach Park, Casa Birdie, Mexico", 20.3962, -87.0194, 180, ["beach", "family", "water"]],
    ["San Gervasio Mayan Ruins", "San Gervasio Mayan Ruins, San Antonio, Mexico", 20.5011, -86.8468, 90, ["history", "hiking"]],
    ["Punta Sur Eco Beach Park", "Punta Sur Eco Beach Park, El Cedral, Mexico", 20.299, -87.0051, 150, ["lighthouses", "beach", "wildlife", "scenic"]],
    ["Cozumel town plaza", "Parque Benito Juárez 5a Av. Sur, San Miguel de Cozumel, Mexico", 20.5102, -86.9494, 60, ["town", "food", "markets"]],
    ["Mr. Sanchos Beach Club", "Mr. Sanchos Beach Club, Playa Mía, Mexico", 20.3911, -87.0215, 150, ["beach", "food", "water"]],
    ["Cozumel Museum", "Cozumel Museum, San Miguel de Cozumel, Mexico", 20.5131, -86.9478, 45, ["history", "art"]]
  ]},
  {"id": "costa-maya", "name": "Costa Maya", "region": "Caribbean", "country": "Mexico", "cc": "mx", "aka": ["Mahahual"], "area": "Othón P. Blanco, Quintana Roo, México", "tender": "unknown", "left": false, "address": "Costa Maya cruise port, Mexico", "lat": 18.7257, "lon": -87.7072, "stops": [
    ["Chacchoben Mayan Ruins", "Chacchoben Mayan Ruins, Chacchoben, Mexico", 19.0362, -88.174, 150, ["history", "hiking", "wildlife"]],
    ["Mahahual malecon", "Mahahual malecon, Mahahual, Mexico", 18.7244, -87.7014, 90, ["beach", "town", "food"]],
    ["Bacalar Lagoon", "Bacalar Lagoon, Othón P. Blanco, Mexico", 18.8556, -88.2369, 180, ["scenic", "water"]],
    ["Cenote Azul", "Cenote Azul, Bacalar, Mexico", 18.647, -88.413, 90, ["water", "scenic"]],
    ["Fuerte de San Felipe Bacalar", "Fuerte de San Felipe Bacalar, Bacalar, Mexico", 18.677, -88.3885, 45, ["history"]]
  ]},
  {"id": "roatan", "name": "Roatan", "region": "Caribbean", "country": "Honduras", "cc": "hn", "aka": ["Mahogany Bay", "Coxen Hole"], "area": "Roatán, Islas de la Bahía", "tender": "varies", "left": false, "address": "Roatan cruise port, Honduras", "lat": 16.3211, "lon": -86.5383, "stops": [
    ["West Bay Beach", "West Bay Beach, Roatán, Honduras", 16.2751, -86.5994, 180, ["beach", "water"]],
    ["Gumbalimba Park", "Gumbalimba Park, Roatán, Honduras", 16.2834, -86.5964, 120, ["wildlife", "family", "hiking"]],
    ["Carambola Botanical Gardens", "Carambola Botanical Gardens, Roatán, Honduras", 16.3237, -86.572, 90, ["gardens", "hiking", "wildlife"]],
    ["Maya Key", "Maya Key, Roatán, Honduras", 16.3108, -86.537, 180, ["beach", "family", "wildlife"]]
  ]},
  {"id": "belize-city", "name": "Belize City", "region": "Caribbean", "country": "Belize", "cc": "bz", "aka": ["Belize"], "area": "Belize District", "tender": "tender", "left": false, "address": "Belize City cruise port, Belize", "lat": 17.5003, "lon": -88.1989, "stops": [
    ["Altun Ha", "Altun Ha, Belize", 17.7663, -88.3409, 150, ["history", "hiking"]],
    ["Xunantunich", "Xunantunich, Lord's Bank, Belize", 17.5511, -88.3171, 150, ["history", "hiking", "scenic"]],
    ["Lamanai", "Lamanai, Orange Walk, Belize", 17.7683, -88.6539, 180, ["history", "wildlife", "water"]],
    ["Cave tubing at Jaguar Paw", "Cave tubing at Jaguar Paw, Lord's Bank, Belize", 17.5563, -88.3269, 180, ["caves", "water", "hiking"]]
  ]},
  {"id": "ocho-rios", "name": "Ocho Rios", "region": "Caribbean", "country": "Jamaica", "cc": "jm", "aka": [], "area": "Saint Ann, Middlesex County", "tender": "varies", "left": true, "address": "Ocho Rios cruise port, Jamaica", "lat": 18.4081, "lon": -77.1011, "stops": [
    ["Dunn's River Falls", "Dunn's River Falls, Ocho Rios, Jamaica", 18.4168, -77.1399, 150, ["waterfalls", "hiking", "family"]],
    ["Mystic Mountain", "Mystic Mountain, Ocho Rios, Jamaica", 18.4081, -77.1205, 180, ["themeparks", "family", "scenic"]],
    ["Konoko Falls and Park", "Konoko Falls and Park, Ocho Rios, Jamaica", 18.3973, -77.105, 120, ["waterfalls", "wildlife", "gardens"]],
    ["Fern Gully", "Fern Gully, Ocho Rios, Jamaica", 18.374, -77.0956, 45, ["scenic", "gardens"]],
    ["Bob Marley Centre and Mausoleum", "Bob Marley Centre and Mausoleum, Nine Mile, Jamaica", 18.2976, -77.2783, 150, ["music", "history"]]
  ]},
  {"id": "grand-turk", "name": "Grand Turk", "region": "Caribbean", "country": "Turks and Caicos", "cc": "tc", "aka": ["Turks and Caicos", "Cockburn Town"], "area": "Front Street, Cockburn Town, Grand Turk", "tender": "varies", "left": true, "address": "Grand Turk cruise port, Turks and Caicos", "lat": 21.4713, "lon": -71.1474, "stops": [
    ["Cockburn Town", "Cockburn Town, Turks and Caicos", 21.468, -71.1387, 90, ["town", "history"]],
    ["Turks and Caicos National Museum", "Turks and Caicos National Museum, Cockburn Town, Turks and Caicos", 21.4713, -71.1474, 45, ["history"]],
    ["Grand Turk Lighthouse", "Grand Turk Lighthouse, Cockburn Town, Turks and Caicos", 21.5116, -71.1336, 45, ["lighthouses", "scenic"]],
    ["Governors Beach", "Governors Beach, Cockburn Town, Turks and Caicos", 21.4401, -71.1513, 150, ["beach", "water"]],
    ["Jack's Shack", "Jack's Shack, Cockburn Town, Turks and Caicos", 21.4329, -71.1473, 90, ["food", "beach"]]
  ]},
  {"id": "st-thomas", "name": "St. Thomas", "region": "Caribbean", "country": "US Virgin Islands", "cc": "vi", "aka": ["Saint Thomas", "Charlotte Amalie"], "area": "Havensight, Charlotte Amalie West, Estate Thomas, USVI", "tender": "pier", "left": true, "address": "St. Thomas cruise port, USVI", "lat": 18.33, "lon": -64.9288, "stops": [
    ["Magens Bay Beach", "Magens Bay Beach, Charlotte Amalie West, USVI", 18.3599, -64.9249, 180, ["beach", "water", "family"]],
    ["Coral World Ocean Park", "6450 Coki Point Road, Frydendal, USVI", 18.3495, -64.864, 150, ["wildlife", "family"]],
    ["Paradise Point Tramway", "Paradise Point Tramway, Estate Thomas, USVI", 18.3339, -64.9171, 75, ["scenic"]],
    ["Fort Christian", "280 Forte Strade, Charlotte Amalie West, USVI", 18.3406, -64.9296, 45, ["history"]],
    ["Mountain Top", "Mountain Top, Saint Peter, USVI", 18.3555, -64.9468, 45, ["scenic", "food"]],
    ["Drake's Seat", "Drake's Seat, Charlotte Amalie West, USVI", 18.353, -64.927, 30, ["scenic"]],
    ["Mahogany Run Golf Course", "Mahogany Run Golf Course, Mandal, USVI", 18.3606, -64.9071, 240, ["golf"]]
  ]},
  {"id": "st-maarten", "name": "Philipsburg, St. Maarten", "region": "Caribbean", "country": "Sint Maarten", "cc": "sx", "aka": ["St. Maarten", "Sint Maarten", "Philipsburg"], "area": "Nederland, St. Maarten", "tender": "pier", "left": false, "address": "Philipsburg cruise port, St. Maarten", "lat": 18.0251, "lon": -63.0483, "stops": [
    ["Maho Beach", "Maho Beach, Lowlands, St. Maarten", 18.0397, -63.1205, 90, ["beach", "scenic"]],
    ["Orient Bay Beach", "Orient Bay Beach, Baie Orientale, St. Maarten", 18.0878, -63.0256, 180, ["beach", "water"]],
    ["Fort Amsterdam", "Fort Amsterdam, Philipsburg, St. Maarten", 18.0161, -63.0593, 45, ["history", "scenic"]],
    ["Marigot Market", "Marigot Market, Marigot, St. Maarten", 18.0679, -63.0858, 75, ["markets", "town", "food"]],
    ["Loterie Farm", "Loterie Farm, Rambaud, St. Maarten", 18.078, -63.0614, 150, ["hiking", "wildlife", "family"]]
  ]},
  {"id": "san-juan", "name": "San Juan", "region": "Caribbean", "country": "Puerto Rico", "cc": "pr", "aka": ["Puerto Rico", "Old San Juan"], "area": "Paseo Dr. Gilberto Concepción de Gracia, Viejo San Juan, San Juan, PR, USA", "tender": "varies", "left": false, "address": "San Juan cruise port, PR", "lat": 18.4622, "lon": -66.1117, "stops": [
    ["Castillo San Cristobal", "Castillo San Cristobal, San Juan, PR", 18.4674, -66.1107, 90, ["history", "parks"]],
    ["Castillo San Felipe del Morro", "Castillo San Felipe del Morro, San Juan, PR", 18.4708, -66.1242, 90, ["history", "parks", "scenic"]],
    ["El Yunque National Forest", "El Yunque National Forest, Río Grande, PR", 18.2955, -65.7837, 240, ["parks", "hiking", "waterfalls", "wildlife"]],
    ["Old San Juan", "Old San Juan, San Juan, PR", 18.4662, -66.1164, 120, ["town", "food", "art"]],
    ["Condado Beach", "Condado Beach, San Juan, PR", 18.4577, -66.0733, 120, ["beach"]],
    ["Paseo de la Princesa", "Paseo de la Princesa, San Juan, PR", 18.4642, -66.1196, 45, ["scenic", "markets"]]
  ]},
  {"id": "key-west", "name": "Key West", "region": "Caribbean", "country": "Florida, USA", "cc": "us", "aka": [], "area": "Key West, Monroe County, Florida, United States, FL", "tender": "unknown", "left": false, "address": "Key West cruise port, FL", "lat": 24.5592, "lon": -81.8067, "stops": [
    ["Southernmost Point", "Southernmost Point, Key West, FL", 24.5465, -81.7975, 20, ["scenic"]],
    ["Fort Zachary Taylor Historic State Park", "Fort Zachary Taylor Historic State Park, Key West, FL", 24.5471, -81.8102, 150, ["beach", "history", "parks", "water"]],
    ["Key West Lighthouse", "Key West Lighthouse, Key West, FL", 24.5506, -81.8009, 45, ["lighthouses", "history"]],
    ["Key West Butterfly and Nature Conservatory", "Key West Butterfly and Nature Conservatory, Key West, FL", 24.5476, -81.7969, 60, ["gardens", "wildlife", "family"]],
    ["Duval Street", "Duval Street, Key West, FL", 24.5586, -81.8048, 90, ["town", "food", "music", "drinks"]],
    ["Key West Aquarium", "Key West Aquarium, Key West, FL", 24.5591, -81.8073, 60, ["family", "wildlife"]]
  ]},
  {"id": "bermuda", "name": "Royal Naval Dockyard, Bermuda", "region": "Caribbean", "country": "Bermuda", "cc": "bm", "aka": ["King's Wharf"], "area": "Sandys", "tender": "unknown", "left": true, "address": "Royal Naval Dockyard cruise port, Bermuda", "lat": 32.3276, "lon": -64.834, "stops": [
    ["Horseshoe Bay Beach", "Horseshoe Bay Beach, Southampton, Bermuda", 32.2522, -64.8217, 150, ["beach", "water"]],
    ["Gibbs Hill Lighthouse", "Gibbs Hill Lighthouse, Southampton, Bermuda", 32.2528, -64.8347, 60, ["lighthouses", "scenic"]],
    ["Crystal Caves", "8 Crystal Cave Road, Hamilton, Bermuda", 32.3495, -64.7133, 60, ["caves"]],
    ["Hamilton", "Hamilton, Bermuda", 32.2923, -64.785, 90, ["town", "food", "markets"]],
    ["St. George's", "St. George's, Bermuda", 32.3723, -64.6985, 90, ["history", "town"]],
    ["Bermuda Aquarium, Museum and Zoo", "40 North Shore Road, Flatts, Bermuda", 32.3236, -64.7377, 90, ["wildlife", "family"]]
  ]},
  {"id": "aruba", "name": "Oranjestad, Aruba", "region": "Caribbean", "country": "Aruba", "cc": "aw", "aka": [], "area": "Nederland", "tender": "pier", "left": false, "address": "Oranjestad cruise port, Aruba", "lat": 12.5201, "lon": -70.0371, "stops": [
    ["Eagle Beach", "Eagle Beach, Oranjestad, Aruba", 12.5466, -70.0599, 150, ["beach", "water"]],
    ["Arikok National Park", "Arikok National Park, Santa Cruz, Aruba", 12.4997, -69.9485, 180, ["parks", "hiking", "caves", "wildlife"]],
    ["California Lighthouse", "California Lighthouse, Noord overig, Aruba", 12.6138, -70.0513, 45, ["lighthouses", "scenic"]],
    ["Natural Pool Aruba", "Natural Pool Aruba, Wayaca, Aruba", 12.5526, -69.9745, 120, ["water", "scenic"]],
    ["Alto Vista Chapel", "Alto Vista Chapel, Noord overig, Aruba", 12.576, -70.0109, 30, ["history", "scenic"]],
    ["Butterfly Farm Aruba", "Butterfly Farm Aruba, Bubali, Aruba", 12.5637, -70.05, 60, ["gardens", "wildlife", "family"]]
  ]},
  {"id": "montego-bay", "name": "Montego Bay", "region": "Caribbean", "country": "Jamaica", "cc": "jm", "aka": ["Mo Bay", "MoBay"], "area": "Saint James, Cornwall County", "tender": "unknown", "left": true, "address": "Montego Bay cruise port, Jamaica", "lat": 18.4725, "lon": -77.9217, "stops": [
    ["Doctor's Cave Beach", "Doctors Cave Beach, Montego Bay, Jamaica", 18.4882, -77.9292, 150, ["beach", "water"]],
    ["Rose Hall Great House", "Rose Hall Great House (1770), Mount Zion, Jamaica", 18.5163, -77.8192, 75, ["history"]],
    ["Greenwood Great House", "Greenwood Great House (1780), Saint James, Jamaica", 18.5032, -77.7425, 60, ["history"]],
    ["Martha Brae Rafters Village", "Martha Brae, Jamaica", 18.4721, -77.6587, 120, ["water", "scenic"]],
    ["Rocklands Bird Sanctuary", "Rocklands Bird Sanctuary, Montego Bay, Jamaica", 18.427, -77.9418, 60, ["wildlife"]],
    ["Sam Sharpe Square", "Sam Sharpe Square, Montego Bay, Jamaica", 18.4738, -77.9228, 30, ["history", "town"]],
    ["Dead End Beach", "Dead End Beach, Montego Bay, Jamaica", 18.4965, -77.9253, 120, ["beach"]],
    ["Dunn's River Falls", "Dunn's River Falls, Ocho Rios, Jamaica", 18.4168, -77.1399, 150, ["waterfalls", "hiking", "family"]]
  ]},
  {"id": "falmouth-jamaica", "name": "Falmouth, Jamaica", "region": "Caribbean", "country": "Jamaica", "cc": "jm", "aka": ["Falmouth"], "area": "Trelawny, Cornwall County", "tender": "pier", "left": true, "address": "Falmouth cruise port, Jamaica", "lat": 18.4947, "lon": -77.6478, "stops": [
    ["Martha Brae Rafters Village", "Martha Brae, Jamaica", 18.4721, -77.6587, 120, ["water", "scenic"]],
    ["Good Hope Great House", "Good Hope Great House (1755), Martha Brae, Jamaica", 18.4176, -77.6772, 75, ["history", "gardens"]],
    ["Glistening Waters", "Glistening Waters, Florence Hall, Jamaica", 18.483, -77.6282, 60, ["water", "wildlife"]],
    ["Greenwood Great House", "Greenwood Great House (1780), Saint James, Jamaica", 18.5032, -77.7425, 60, ["history"]],
    ["Rose Hall Great House", "Rose Hall Great House (1770), Mount Zion, Jamaica", 18.5163, -77.8192, 75, ["history"]],
    ["Dunn's River Falls", "Dunn's River Falls, Ocho Rios, Jamaica", 18.4168, -77.1399, 150, ["waterfalls", "hiking", "family"]],
    ["Falmouth Courthouse", "Falmouth Court House (1926), Falmouth, Jamaica", 18.493, -77.6524, 20, ["history"]]
  ]},
  {"id": "freeport", "name": "Freeport, Grand Bahama", "region": "Caribbean", "country": "Bahamas", "cc": "bs", "aka": ["Grand Bahama", "Lucaya"], "area": "", "tender": "unknown", "left": true, "address": "Freeport cruise port, Bahamas", "lat": 26.5357, "lon": -78.6954, "stops": [
    ["Lucayan National Park", "Lucayan National Park, Freeport, Bahamas", 26.6046, -78.4015, 150, ["parks", "caves", "beach", "hiking"]],
    ["Port Lucaya Marketplace", "Port Lucaya Marketplace, Freeport, Bahamas", 26.5129, -78.642, 90, ["markets", "food", "town"]],
    ["Garden of the Groves", "Garden of the Groves, Freeport, Bahamas", 26.5517, -78.5732, 75, ["gardens"]],
    ["Taino Beach", "Taino Beach, Freeport, Bahamas", 26.5201, -78.6209, 150, ["beach", "water"]],
    ["Rand Nature Centre", "Rand Nature Centre, Freeport, Bahamas", 26.5387, -78.6718, 60, ["wildlife", "hiking"]],
    ["Gold Rock Beach", "Gold Rock Beach, Freeport, Bahamas", 26.5999, -78.4065, 120, ["beach", "scenic"]]
  ]},
  {"id": "puerto-plata", "name": "Puerto Plata (Amber Cove and Taino Bay)", "region": "Caribbean", "country": "Dominican Republic", "cc": "do", "aka": ["Amber Cove", "Taino Bay", "Puerto Plata"], "area": "", "tender": "varies", "left": false, "address": "Puerto Plata cruise port, Dominican Republic", "lat": 19.8339, "lon": -70.7758, "stops": [
    ["Fortaleza San Felipe", "Fortaleza de San Felipe, Puerto Plata, Dominican Republic", 19.8041, -70.6959, 45, ["history"]],
    ["Teleférico de Puerto Plata", "Puerto Plata, Dominican Republic", 19.7883, -70.7103, 90, ["scenic"]],
    ["Museo del Ámbar", "Museo del Ámbar, Puerto Plata, Dominican Republic", 19.7964, -70.6922, 45, ["history"]],
    ["Ocean World Adventure Park", "Ocean World, Puerto Plata, Dominican Republic", 19.8263, -70.7315, 180, ["themeparks", "family", "wildlife"]],
    ["Playa Cabarete", "Playa Cabarete, Cabarete, Dominican Republic", 19.7649, -70.4249, 150, ["beach", "water"]],
    ["Playa Dorada", "Playa Dorada, Puerto Plata, Dominican Republic", 19.7781, -70.6558, 150, ["beach"]]
  ]},
  {"id": "la-romana", "name": "La Romana", "region": "Caribbean", "country": "Dominican Republic", "cc": "do", "aka": ["Casa de Campo"], "area": "", "tender": "unknown", "left": false, "address": "La Romana cruise port, Dominican Republic", "lat": 18.4227, "lon": -68.9663, "stops": [
    ["Altos de Chavón", "Altos de Chavón, La Romana, Dominican Republic", 18.4213, -68.8917, 120, ["history", "art", "scenic"]],
    ["Bayahibe", "Bayahibe, Dominican Republic", 18.3687, -68.8397, 150, ["beach", "town", "water"]],
    ["Cueva de las Maravillas", "Cave of Wonders, Batey El Soco, Dominican Republic", 18.4521, -69.1603, 75, ["caves", "history"]],
    ["Casa de Campo Marina", "La Marina Casa de Campo, La Romana, Dominican Republic", 18.4005, -68.9008, 90, ["town", "food"]],
    ["Playa Dominicus", "Playa Dominicus, San Rafael del Yuma, Dominican Republic", 18.3389, -68.8171, 150, ["beach"]],
    ["Isla Catalina", "Catalina Island, La Romana, Dominican Republic", 18.3589, -69.0081, 240, ["beach", "water"]]
  ]},
  {"id": "samana", "name": "Samaná", "region": "Caribbean", "country": "Dominican Republic", "cc": "do", "aka": ["Samana"], "area": "Samaná", "tender": "varies", "left": false, "address": "Samaná cruise port, Dominican Republic", "lat": 19.2037, "lon": -69.339, "stops": [
    ["Salto El Limón", "Salto El Limón, Samana, Dominican Republic", 19.2703, -69.4462, 180, ["waterfalls", "hiking"]],
    ["Cayo Levantado", "Cayo Levantado, Samana, Dominican Republic", 19.1663, -69.2747, 180, ["beach", "water"]],
    ["Parque Nacional Los Haitises", "Parque Nacional Los Haitises, El Valle, Dominican Republic", 18.9941, -69.6037, 240, ["parks", "caves", "wildlife", "water"]],
    ["Playa Rincón", "Rincon Beach, Samana, Dominican Republic", 19.2911, -69.2518, 180, ["beach"]],
    ["Las Terrenas", "Las Terrenas, Dominican Republic", 19.311, -69.5431, 120, ["town", "beach", "food"]],
    ["Playa Frontón", "Playa Fronton, Samana, Dominican Republic", 19.2949, -69.1513, 150, ["beach", "hiking"]]
  ]},
  {"id": "santo-domingo", "name": "Santo Domingo", "region": "Caribbean", "country": "Dominican Republic", "cc": "do", "aka": [], "area": "Distrito Nacional", "tender": "unknown", "left": false, "address": "Santo Domingo cruise port, Dominican Republic", "lat": 18.4714, "lon": -69.8918, "stops": [
    ["Alcázar de Colón", "Alcázar de Colón, Santo Domingo, Dominican Republic", 18.4774, -69.8827, 60, ["history"]],
    ["Catedral Primada de América", "Basílica Catedral Metropolitana Santa María de la Encarnación Primada de América, Santo Domingo, Dominican Republic", 18.473, -69.8839, 45, ["history"]],
    ["Fortaleza Ozama", "Fortaleza Ozama, Santo Domingo, Dominican Republic", 18.4723, -69.8819, 45, ["history"]],
    ["Los Tres Ojos", "Los Tres Ojos, Santo Domingo Este, Dominican Republic", 18.4814, -69.8436, 75, ["caves", "water", "parks"]],
    ["Jardín Botánico Nacional", "Jardín Botánico Nacional Dr. Rafael María Moscoso, Santo Domingo, Dominican Republic", 18.4949, -69.9541, 90, ["gardens"]],
    ["Calle El Conde", "Calle El Conde, Santo Domingo, Dominican Republic", 18.4729, -69.887, 60, ["markets", "town"]],
    ["Faro a Colón", "Faro a Colón, Santo Domingo Este, Dominican Republic", 18.4786, -69.868, 45, ["history"]]
  ]},
  {"id": "st-croix", "name": "Frederiksted, St. Croix", "region": "Caribbean", "country": "US Virgin Islands", "cc": "vi", "aka": ["St. Croix", "Saint Croix", "Frederiksted"], "area": "Two Brothers, Frederiksted Southeast, Saint Croix District, United States Virgin Islands, United States, USVI", "tender": "pier", "left": true, "address": "Frederiksted cruise port, US Virgin Islands", "lat": 17.7139, "lon": -64.8888, "stops": [
    ["Fort Frederik", "Fort Frederik, Frederiksted, USVI", 17.7153, -64.8834, 45, ["history"]],
    ["Sandy Point National Wildlife Refuge", "Sandy Point National Wildlife Refuge, Frederiksted, USVI", 17.6837, -64.8947, 120, ["beach", "wildlife"]],
    ["Cruzan Rum Distillery", "Cruzan Rum Distillery, Negro Bay, USVI", 17.7046, -64.8259, 60, ["drinks"]],
    ["Christiansted National Historic Site", "Christiansted National Historic Site, Christiansted, USVI", 17.7468, -64.7021, 90, ["history", "town"]],
    ["Estate Whim Museum", "52 Queen Mary Highway / Centerline Road, Frederiksted, USVI", 17.7001, -64.8627, 60, ["history"]],
    ["St. George Village Botanical Garden", "St. George Village Botanical Gardens, Mountain, USVI", 17.7161, -64.83, 75, ["gardens"]],
    ["Rainbow Beach", "Rainbow Beach, William, USVI", 17.7329, -64.8893, 120, ["beach"]],
    ["Point Udall", "Point Udall, Saint Croix District, USVI", 17.7559, -64.5672, 45, ["scenic"]]
  ]},
  {"id": "tortola", "name": "Road Town, Tortola", "region": "Caribbean", "country": "British Virgin Islands", "cc": "vg", "aka": ["Tortola", "Road Town", "BVI"], "area": "Tortola", "tender": "varies", "left": true, "address": "Road Town cruise port, British Virgin Islands", "lat": 18.4223, "lon": -64.613, "stops": [
    ["Cane Garden Bay", "Cane Garden Bay, Road Town, British Virgin Islands", 18.4264, -64.6594, 150, ["beach", "water", "food"]],
    ["Sage Mountain National Park", "Sage Mountain, Road Town, British Virgin Islands", 18.4125, -64.6538, 120, ["parks", "hiking", "scenic"]],
    ["J. R. O'Neal Botanic Gardens", "Joseph Reynold O'Neal Botanic Gardens, Road Town, British Virgin Islands", 18.4274, -64.6224, 45, ["gardens"]],
    ["Smuggler's Cove", "Smuggler's Cove Beach, Road Town, British Virgin Islands", 18.3939, -64.7013, 120, ["beach"]],
    ["Callwood Rum Distillery", "Callwood Distillery, Road Town, British Virgin Islands", 18.4225, -64.6582, 45, ["drinks", "history"]]
  ]},
  {"id": "st-kitts", "name": "Basseterre, St. Kitts", "region": "Caribbean", "country": "Saint Kitts and Nevis", "cc": "kn", "aka": ["St. Kitts", "Saint Kitts", "Port Zante"], "area": "Saint George Basseterre, Saint Kitts", "tender": "varies", "left": true, "address": "Basseterre cruise port, Saint Kitts and Nevis", "lat": 17.2961, "lon": -62.7223, "stops": [
    ["Brimstone Hill Fortress", "Brimstone Hill Fortress, Brimstone Hill, Saint Kitts and Nevis", 17.3469, -62.8364, 90, ["history", "scenic"]],
    ["Romney Manor", "Romney Manor, Old Road Town, Saint Kitts and Nevis", 17.3257, -62.8011, 60, ["gardens", "art", "history"]],
    ["Frigate Bay", "Frigate Bay, Kittian Village, Saint Kitts and Nevis", 17.2788, -62.6885, 120, ["beach"]],
    ["Cockleshell Bay", "Cockleshell Bay, Charlestown, Saint Kitts and Nevis", 17.2271, -62.6341, 150, ["beach", "water"]],
    ["Timothy Hill", "Sir Timothy's Hill, Kittian Village, Saint Kitts and Nevis", 17.2797, -62.6822, 20, ["scenic"]],
    ["Independence Square", "Independence Square, Basseterre, Saint Kitts and Nevis", 17.2963, -62.7223, 30, ["history", "town"]],
    ["St. Kitts Scenic Railway", "Saint Kitts Scenic Railway, Canada, Saint Kitts and Nevis", 17.3392, -62.7108, 180, ["scenic", "history"]]
  ]},
  {"id": "antigua", "name": "St. John's, Antigua", "region": "Caribbean", "country": "Antigua and Barbuda", "cc": "ag", "aka": ["Antigua", "Saint John's Antigua"], "area": "Saint John, Antigua", "tender": "pier", "left": true, "address": "St. John's cruise port, Antigua and Barbuda", "lat": 17.1198, "lon": -61.8482, "stops": [
    ["Nelson's Dockyard", "Nelson's Dockyard National Park, English Harbour, Antigua and Barbuda", 17.0083, -61.7649, 90, ["history"]],
    ["Shirley Heights", "Shirley Heights, English Harbour, Antigua and Barbuda", 17.0023, -61.755, 60, ["scenic", "history", "music"]],
    ["Betty's Hope", "Betty's Hope The Distillery, Pares, Antigua and Barbuda", 17.0809, -61.7463, 45, ["history"]],
    ["Half Moon Bay", "Half Moon Bay, Freetown, Antigua and Barbuda", 17.0376, -61.6871, 150, ["beach"]],
    ["Devil's Bridge", "Devil's Bridge, Antigua, Antigua and Barbuda", 17.1006, -61.6786, 30, ["scenic"]],
    ["Fort James", "Fort James, McKinnon's, Antigua and Barbuda", 17.1308, -61.8637, 45, ["history", "beach"]],
    ["Museum of Antigua and Barbuda", "Museum of Antigua & Barbuda, St. John's, Antigua and Barbuda", 17.1222, -61.8439, 45, ["history"]]
  ]},
  {"id": "st-lucia", "name": "Castries, St. Lucia", "region": "Caribbean", "country": "Saint Lucia", "cc": "lc", "aka": ["St. Lucia", "Saint Lucia", "Castries"], "area": "", "tender": "varies", "left": true, "address": "Castries cruise port, Saint Lucia", "lat": 14.014, "lon": -60.996, "stops": [
    ["Pigeon Island National Landmark", "Pigeon Island National Landmark, Rodney Bay, Saint Lucia", 14.0926, -60.9643, 120, ["history", "hiking", "beach"]],
    ["Sulphur Springs", "Sulphur Springs, Soufrière, Saint Lucia", 13.8386, -61.0466, 75, ["spa", "scenic"]],
    ["Diamond Falls Botanical Gardens", "Diamond Falls, Soufrière, Saint Lucia", 13.8501, -61.0479, 75, ["gardens", "waterfalls"]],
    ["Reduit Beach", "Reduit Beach, Rodney Bay, Saint Lucia", 14.0747, -60.9554, 150, ["beach", "water"]],
    ["Marigot Bay", "Marigot Bay, Coolie Town, Saint Lucia", 13.9657, -61.026, 90, ["scenic", "water", "food"]],
    ["Castries Market", "Castries Market, Castries, Saint Lucia", 14.0119, -60.9892, 45, ["markets", "food"]]
  ]},
  {"id": "barbados", "name": "Bridgetown, Barbados", "region": "Caribbean", "country": "Barbados", "cc": "bb", "aka": ["Bridgetown"], "area": "Saint Michael", "tender": "pier", "left": true, "address": "Bridgetown cruise port, Barbados", "lat": 13.1007, "lon": -59.6282, "stops": [
    ["Harrison's Cave", "Harrison's Cave, Welchman Hall, Barbados", 13.1848, -59.5735, 90, ["caves"]],
    ["Carlisle Bay", "Carlisle Bay, Barbados", 13.0874, -59.6154, 150, ["beach", "water"]],
    ["St. Nicholas Abbey", "St. Nicholas Abbey, Diamond Corner, Barbados", 13.2771, -59.5891, 90, ["history", "drinks", "gardens"]],
    ["Hunte's Gardens", "Hunte's Gardens, Airy Hill, Barbados", 13.1928, -59.5508, 60, ["gardens"]],
    ["Bathsheba", "Bathsheba, Barbados", 13.2129, -59.5227, 60, ["scenic", "beach"]],
    ["Andromeda Botanic Gardens", "Andromeda Botanic Gardens, Bathsheba, Barbados", 13.2075, -59.5181, 60, ["gardens"]],
    ["Animal Flower Cave", "Animal Flower Cave, Greenidge, Barbados", 13.3346, -59.6131, 60, ["caves", "scenic"]],
    ["Oistins Fish Market", "Oistins Fish Market, Oistins, Barbados", 13.0636, -59.5435, 60, ["food", "markets"]]
  ]},
  {"id": "grenada", "name": "St. George's, Grenada", "region": "Caribbean", "country": "Grenada", "cc": "gd", "aka": ["Grenada", "Saint George's Grenada"], "area": "Saint George", "tender": "pier", "left": true, "address": "St. George's cruise port, Grenada", "lat": 12.051, "lon": -61.7554, "stops": [
    ["Grand Anse Beach", "Grand Anse Beach, Grand Anse, Grenada", 12.0274, -61.7566, 150, ["beach"]],
    ["Fort George", "Fort George, St. George's, Grenada", 12.0494, -61.7539, 45, ["history", "scenic"]],
    ["Annandale Falls", "Annandale Falls, Annandale, Grenada", 12.0878, -61.7173, 60, ["waterfalls"]],
    ["Grand Etang National Park", "Grand Etang National Park & Forest Reserve, Vendome, Grenada", 12.0873, -61.6999, 120, ["parks", "hiking", "wildlife"]],
    ["Belmont Estate", "Belmont Estate, Hermitage, Grenada", 12.1746, -61.6269, 75, ["history", "food"]],
    ["Molinere Underwater Sculpture Park", "Underwater Sculpture Garden, Moliniere, Grenada", 12.0831, -61.7631, 120, ["water", "art"]],
    ["River Antoine Rum Distillery", "River Antoine Rum Distillery, Mount Rose, Grenada", 12.1759, -61.6082, 60, ["drinks", "history"]],
    ["Fort Frederick", "Fort Frederick, Morne Jaloux, Grenada", 12.0479, -61.7373, 45, ["history", "scenic"]]
  ]},
  {"id": "dominica", "name": "Roseau, Dominica", "region": "Caribbean", "country": "Dominica", "cc": "dm", "aka": ["Roseau"], "area": "Saint George Parish", "tender": "pier", "left": true, "address": "Roseau cruise port, Dominica", "lat": 15.2961, "lon": -61.3881, "stops": [
    ["Trafalgar Falls", "Trafalgar Falls, Trafalgar, Dominica", 15.3277, -61.334, 120, ["waterfalls", "hiking"]],
    ["Emerald Pool", "Emerald Pool, Saint David Parish, Dominica", 15.3972, -61.3119, 90, ["waterfalls", "hiking"]],
    ["Champagne Reef", "Champagne Reef, Pointe Michel, Dominica", 15.2447, -61.3733, 120, ["water"]],
    ["Titou Gorge", "Titou Gorge, Laudat, Dominica", 15.3293, -61.3243, 60, ["water", "scenic"]],
    ["Morne Trois Pitons National Park", "Morne Trois Pitons National Park, Saint Patrick Parish, Dominica", 15.3277, -61.2926, 180, ["parks", "hiking"]],
    ["Scotts Head", "Scotts Head, Dominica", 15.2146, -61.3734, 90, ["scenic", "water"]]
  ]},
  {"id": "martinique", "name": "Fort-de-France, Martinique", "region": "Caribbean", "country": "Martinique", "cc": "mq", "aka": ["Martinique"], "area": "France", "tender": "pier", "left": false, "address": "Fort-de-France cruise port, Martinique", "lat": 14.6015, "lon": -61.0727, "stops": [
    ["Jardin de Balata", "Jardin de Balata, Fort-de-France, Martinique", 14.6711, -61.092, 90, ["gardens"]],
    ["Saint-Pierre", "Saint-Pierre, Martinique", 14.7452, -61.1311, 120, ["town", "history"]],
    ["Habitation Clément", "Habitation Clément, Le François, Martinique", 14.602, -60.9077, 90, ["drinks", "history", "art"]],
    ["Plage des Salines", "Plage de Petite Anse des Salines, Sainte-Anne, Martinique", 14.4083, -60.8847, 150, ["beach"]],
    ["Fort Saint-Louis", "Fort Saint-Louis, Fort-de-France, Martinique", 14.5997, -61.0663, 45, ["history"]],
    ["Bibliothèque Schœlcher", "1 Rue de la Liberté, Fort-de-France, Martinique", 14.6049, -61.0681, 30, ["history", "art"]],
    ["Distillerie Depaz", "Distillerie Depaz, Saint-Pierre, Martinique", 14.758, -61.1652, 60, ["drinks"]]
  ]},
  {"id": "guadeloupe", "name": "Pointe-à-Pitre, Guadeloupe", "region": "Caribbean", "country": "Guadeloupe", "cc": "gp", "aka": ["Guadeloupe"], "area": "France", "tender": "pier", "left": false, "address": "Pointe-à-Pitre cruise port, Guadeloupe", "lat": 16.2387, "lon": -61.5389, "stops": [
    ["Mémorial ACTe", "Mémorial ACTe, Pointe-à-Pitre, Guadeloupe", 16.2316, -61.5342, 90, ["history"]],
    ["Pointe des Châteaux", "Pointe des Chateaux, Saint-François, Guadeloupe", 16.2449, -61.1737, 90, ["scenic", "hiking"]],
    ["Distillerie Damoiseau", "Distillerie Damoiseau, Le Moule, Guadeloupe", 16.3209, -61.3749, 60, ["drinks"]],
    ["Cascade aux Écrevisses", "Cascade aux Écrevisses, Petit-Bourg, Guadeloupe", 16.1782, -61.6815, 45, ["waterfalls", "family"]]
  ]},
  {"id": "curacao", "name": "Willemstad, Curaçao", "region": "Caribbean", "country": "Curaçao", "cc": "cw", "aka": ["Curacao", "Willemstad"], "area": "Curacao, Netherlands", "tender": "pier", "left": false, "address": "Willemstad cruise port, Curaçao", "lat": 12.1044, "lon": -68.9418, "stops": [
    ["Queen Emma Bridge", "Koningin Emmabrug, Willemstad, Curaçao", 12.1061, -68.9354, 30, ["history", "scenic"]],
    ["Hato Caves", "Hato Caves, Curaçao", 12.1793, -68.9482, 60, ["caves"]],
    ["Christoffel National Park", "Christoffel National Park, Curaçao", 12.3414, -69.1129, 180, ["parks", "hiking", "wildlife"]],
    ["Grote Knip", "Kenepa Grandi Beach, Knip, Curaçao", 12.352, -69.1513, 150, ["beach"]],
    ["Landhuis Chobolobo", "Landhuis Chobolobo, Curaçao", 12.11, -68.9041, 45, ["drinks"]],
    ["Museum Kura Hulanda", "9 Klipstraat, Willemstad, Curaçao", 12.1082, -68.9356, 60, ["history"]],
    ["Mambo Beach", "Mambo Beach, Curaçao", 12.0869, -68.8994, 150, ["beach", "food"]],
    ["Curaçao Sea Aquarium", "Curaçao Sea Aquarium, Willemstad, Curaçao", 12.084, -68.8963, 90, ["wildlife", "family"]],
    ["Fort Amsterdam", "Fort Amsterdam, Willemstad, Curaçao", 12.1048, -68.9347, 30, ["history", "town"]]
  ]},
  {"id": "bonaire", "name": "Kralendijk, Bonaire", "region": "Caribbean", "country": "Bonaire", "cc": "bq", "aka": ["Bonaire", "Kralendijk"], "area": "Netherlands, Netherlands, Caribbean Netherlands", "tender": "pier", "left": false, "address": "Kralendijk cruise port, Bonaire", "lat": 12.1473, "lon": -68.2774, "stops": [
    ["Washington Slagbaai National Park", "Washington Slagbaai National Park, Rincon, Bonaire", 12.2698, -68.3455, 180, ["parks", "wildlife", "hiking"]],
    ["Sorobon Beach", "Sorobon Beach, Bonaire", 12.0921, -68.2359, 150, ["beach", "water"]],
    ["Klein Bonaire", "Klein Bonaire, Kralendijk, Bonaire", 12.1575, -68.3095, 180, ["beach", "water"]],
    ["Donkey Sanctuary Bonaire", "Donkey Sanctuary, Kralendijk, Bonaire", 12.1223, -68.2648, 60, ["wildlife", "family"]],
    ["Gotomeer", "Saliña Goto, Bonaire", 12.2344, -68.3749, 45, ["wildlife", "scenic"]],
    ["Willemstoren Lighthouse", "Willemstoren Lighthouse, Bonaire", 12.0283, -68.2373, 30, ["lighthouses", "history"]]
  ]},
  {"id": "st-vincent", "name": "Kingstown, St. Vincent", "region": "Caribbean", "country": "Saint Vincent and the Grenadines", "cc": "vc", "aka": ["St. Vincent", "Saint Vincent", "Kingstown"], "area": "Saint George", "tender": "pier", "left": true, "address": "Kingstown cruise port, Saint Vincent and the Grenadines", "lat": 13.1482, "lon": -61.224, "stops": [
    ["Fort Charlotte", "Fort Charlotte, Campden Park, Saint Vincent and the Grenadines", 13.1579, -61.2422, 45, ["history", "scenic"]],
    ["Wallilabou Bay", "Wallilabou Bay, Barrouallie, Saint Vincent and the Grenadines", 13.2483, -61.2718, 60, ["scenic", "water"]],
    ["Vermont Nature Trail", "Vermont Nature trail, Vermont, Saint Vincent and the Grenadines", 13.2138, -61.2163, 120, ["hiking", "wildlife"]],
    ["Indian Bay Beach", "Indian Bay Beach, Arnos Vale, Saint Vincent and the Grenadines", 13.1362, -61.2056, 120, ["beach"]]
  ]},
  {"id": "tobago", "name": "Scarborough, Tobago", "region": "Caribbean", "country": "Trinidad and Tobago", "cc": "tt", "aka": ["Tobago", "Scarborough Tobago"], "area": "Tobago", "tender": "unknown", "left": true, "address": "Scarborough cruise port, Trinidad and Tobago", "lat": 11.1853, "lon": -60.735, "stops": [
    ["Fort King George", "Fort King George, Scarborough, Trinidad and Tobago", 11.1777, -60.7268, 45, ["history", "scenic"]],
    ["Pigeon Point Heritage Park", "Pigeon Point Heritage Park, Crown Point, Trinidad and Tobago", 11.166, -60.8407, 150, ["beach", "water"]],
    ["Main Ridge Forest Reserve", "Main Ridge Forest Reserve, Hermitage, Trinidad and Tobago", 11.284, -60.6026, 150, ["parks", "hiking", "wildlife"]],
    ["Store Bay", "Store Bay, Crown Point, Trinidad and Tobago", 11.156, -60.8399, 120, ["beach", "food"]],
    ["Buccoo Reef", "Buccoo Reef, Buccoo, Trinidad and Tobago", 11.1803, -60.8336, 150, ["water", "wildlife"]]
  ]},
  {"id": "st-barts", "name": "Gustavia, St. Barts", "region": "Caribbean", "country": "Saint Barthélemy", "cc": "bl", "aka": ["St. Barts", "St. Barths", "Saint Barthelemy", "Gustavia"], "area": "France", "tender": "varies", "left": false, "address": "Gustavia cruise port, Saint Barthélemy", "lat": 17.8957, "lon": -62.8508, "stops": [
    ["Shell Beach", "Shell Beach, Saint Barthélemy", 17.8925, -62.8481, 120, ["beach"]],
    ["Fort Karl", "Fort Karl, Saint Barthélemy", 17.8931, -62.8497, 30, ["history", "scenic"]],
    ["Saline Beach", "Plage de Saline, Saint Barthélemy", 17.8871, -62.8226, 150, ["beach"]],
    ["Colombier Beach", "Plage Colombier, Saint Barthélemy", 17.9232, -62.8683, 150, ["beach", "hiking"]],
    ["Fort Gustave", "Fort Gustave, Saint Barthélemy", 17.9013, -62.8521, 30, ["history", "scenic", "lighthouses"]],
    ["Wall House Museum", "2 Rue Piteå, Saint Barthélemy", 17.8983, -62.8521, 30, ["history"]]
  ]},
  {"id": "cabo", "name": "Cabo San Lucas", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": ["Cabo", "Los Cabos"], "area": "Crafts & Jewelry, Paseo de La Marina, El Médano Ejidal, Cabo San Lucas", "tender": "tender", "left": false, "address": "Cabo San Lucas cruise port, Mexico", "lat": 22.8855, "lon": -109.9088, "stops": [
    ["El Arco", "El Arco, Cabo San Lucas, Mexico", 22.876, -109.8946, 90, ["scenic", "water", "wildlife"]],
    ["Lover's Beach", "Lover's Beach, Cabo San Lucas, Mexico", 22.8765, -109.8964, 90, ["beach", "water"]],
    ["Medano Beach", "Medano Beach, Cabo San Lucas, Mexico", 22.8951, -109.8936, 150, ["beach", "water", "food"]],
    ["San Jose del Cabo", "San Jose del Cabo, San José del Cabo, Mexico", 23.0621, -109.695, 120, ["town", "art", "food", "drinks"]],
    ["Cabo Wabo Cantina", "Cabo Wabo Cantina, Cabo San Lucas, Mexico", 22.8837, -109.9131, 90, ["music", "drinks"]],
    ["Cabo San Lucas Marina", "Cabo San Lucas Marina, Cabo San Lucas, Mexico", 22.8847, -109.9084, 60, ["town", "scenic"]]
  ]},
  {"id": "puerto-vallarta", "name": "Puerto Vallarta", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": ["Vallarta"], "area": "Francisco Medina Ascencio, Puerto Vallarta, Región Costa Norte", "tender": "pier", "left": false, "address": "Puerto Vallarta cruise port, Mexico", "lat": 20.6542, "lon": -105.2407, "stops": [
    ["Malecon boardwalk", "Malecon boardwalk, Puerto Vallarta, Mexico", 20.6104, -105.2351, 75, ["scenic", "art", "town"]],
    ["Vallarta Botanical Gardens", "Vallarta Botanical Gardens, Puerto Vallarta, Mexico", 20.4657, -105.2927, 120, ["gardens", "hiking", "wildlife"]],
    ["Church of Our Lady of Guadalupe", "Church of Our Lady of Guadalupe, Puerto Vallarta, Mexico", 20.6082, -105.2348, 30, ["history"]],
    ["Los Muertos Beach", "Los Muertos Beach, Puerto Vallarta, Mexico", 20.6005, -105.239, 150, ["beach", "food", "water"]],
    ["Zona Romantica", "Zona Romantica, Puerto Vallarta, Mexico", 20.6022, -105.2351, 90, ["town", "food", "drinks"]]
  ]},
  {"id": "mazatlan", "name": "Mazatlan", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": [], "area": "Sinaloa, México", "tender": "pier", "left": false, "address": "Mazatlan cruise port, Mexico", "lat": 23.2036, "lon": -106.4208, "stops": [
    ["Cathedral Basilica of the Immaculate Conception", "Cathedral Basilica of the Immaculate Conception, Mazatlán, Mexico", 23.201, -106.4219, 30, ["history"]],
    ["Faro Mazatlan Lighthouse", "Faro Mazatlan Lighthouse, Mazatlán, Mexico", 23.178, -106.4273, 75, ["lighthouses", "scenic", "hiking"]],
    ["Mazatlan Aquarium", "111 Avenida de los Deportes, Mazatlán, Mexico", 23.2286, -106.4277, 90, ["wildlife", "family"]],
    ["Malecon Mazatlan", "Malecon Mazatlan, Mazatlán, Mexico", 23.2154, -106.4214, 60, ["scenic", "beach"]],
    ["Playa Olas Altas", "Playa Olas Altas, Mazatlán, Mexico", 23.195, -106.4264, 90, ["beach", "food"]]
  ]},
  {"id": "ensenada", "name": "Ensenada", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": [], "area": "Municipio de Ensenada, Baja California, México", "tender": "pier", "left": false, "address": "Ensenada cruise port, Mexico", "lat": 31.8659, "lon": -116.603, "stops": [
    ["La Bufadora", "La Bufadora, Ensenada, Mexico", 31.7137, -116.6537, 90, ["scenic"]],
    ["Bodegas de Santo Tomas", "Bodegas de Santo Tomas, Municipio de Ensenada, Mexico", 31.5808, -116.4125, 90, ["drinks"]],
    ["Mercado Negro", "Mercado Negro, Ensenada, Mexico", 31.8614, -116.628, 60, ["markets", "food"]],
    ["Hussong's Cantina", "Hussong's Cantina, Ensenada, Mexico", 31.8651, -116.6289, 75, ["drinks", "music", "history"]]
  ]},
  {"id": "progreso", "name": "Progreso (Mérida)", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": ["Merida", "Progreso"], "area": "Yucatán", "tender": "pier", "left": false, "address": "Progreso cruise port, Mexico", "lat": 21.3416, "lon": -89.6741, "stops": [
    ["Dzibilchaltún", "Dzibilchaltún, Mérida, Mexico", 21.0982, -89.5987, 90, ["history"]],
    ["Plaza Grande Mérida", "Plaza Grande, Mérida, Mexico", 20.9671, -89.6237, 120, ["history", "town", "food"]],
    ["Malecón de Progreso", "Malecón, Progreso, Mexico", 21.2885, -89.6586, 90, ["beach", "town", "food"]],
    ["Paseo de Montejo", "Paseo Montejo, Mérida, Mexico", 20.9784, -89.619, 60, ["history", "town"]],
    ["Gran Museo del Mundo Maya", "Gran Museo del Mundo Maya, Mérida, Mexico", 21.0344, -89.6285, 90, ["history"]],
    ["Ría Celestún", "Ría Celestún, Celestún, Mexico", 20.8776, -90.3554, 180, ["wildlife", "water"]],
    ["Faro de Progreso", "Faro de Progreso, Progreso, Mexico", 21.2857, -89.6635, 20, ["lighthouses"]]
  ]},
  {"id": "huatulco", "name": "Huatulco", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": ["Bahias de Huatulco"], "area": "La Crucecita, Santa María Huatulco, Oaxaca", "tender": "pier", "left": false, "address": "Huatulco cruise port, Mexico", "lat": 15.7519, "lon": -96.1288, "stops": [
    ["Playa La Entrega", "Playa La Entrega, La Crucecita, Mexico", 15.7435, -96.129, 150, ["beach", "water"]],
    ["Parque Eco-Arqueológico Copalita", "15 (tramo) Boulevard Santa Cruz, Bahía de Conejos, Mexico", 15.7924, -96.0547, 90, ["history", "hiking"]],
    ["La Crucecita", "La Crucecita, Mexico", 15.7692, -96.1355, 60, ["town", "food", "markets"]],
    ["Bahía Maguey", "Bahía Maguey, La Crucecita, Mexico", 15.7312, -96.1492, 150, ["beach"]],
    ["Parque Nacional Huatulco", "Parque Nacional Huatulco, La Crucecita, Mexico", 15.7212, -96.1822, 150, ["parks", "wildlife", "beach"]],
    ["Playa Santa Cruz", "Playa Santa Cruz, La Crucecita, Mexico", 15.7533, -96.1311, 120, ["beach"]]
  ]},
  {"id": "acapulco", "name": "Acapulco", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": [], "area": "Acapulco de Juárez, Guerrero", "tender": "unknown", "left": false, "address": "Acapulco cruise port, Mexico", "lat": 16.8486, "lon": -99.902, "stops": [
    ["La Quebrada", "La Quebrada, Acapulco, Mexico", 16.8461, -99.9156, 45, ["scenic"]],
    ["Fuerte de San Diego", "Fuerte de San Diego, Acapulco, Mexico", 16.8499, -99.9027, 60, ["history"]],
    ["Playa Condesa", "Playa Condesa, Acapulco, Mexico", 16.8567, -99.8683, 150, ["beach"]],
    ["Isla de la Roqueta", "La Roqueta, Acapulco, Mexico", 16.8213, -99.9082, 150, ["beach", "water"]],
    ["Zócalo de Acapulco", "Zócalo de Acapulco, Acapulco, Mexico", 16.8487, -99.9085, 45, ["town"]],
    ["Pie de la Cuesta", "Pie de la Cuesta, Mexico", 16.9207, -100.0136, 90, ["beach", "scenic"]]
  ]},
  {"id": "manzanillo", "name": "Manzanillo", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": [], "area": "Colima", "tender": "pier", "left": false, "address": "Manzanillo cruise port, Mexico", "lat": 19.0551, "lon": -104.3144, "stops": [
    ["Playa La Audiencia", "La Audiencia Beach, Manzanillo, Mexico", 19.1047, -104.3501, 150, ["beach"]],
    ["Monumento al Pez Vela", "Pez Vela, Manzanillo, Mexico", 19.0542, -104.3168, 20, ["art", "town"]],
    ["Playa Miramar", "Playa Miramar, Manzanillo, Mexico", 19.1185, -104.3861, 150, ["beach"]],
    ["Jardín Álvaro Obregón", "Alvaro Obregon Garden, Manzanillo, Mexico", 19.054, -104.3169, 30, ["town"]],
    ["Playa La Boquita", "La Boquita Beach, Manzanillo, Mexico", 19.106, -104.3989, 150, ["beach", "water"]]
  ]},
  {"id": "zihuatanejo", "name": "Zihuatanejo and Ixtapa", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": ["Ixtapa", "Zihuatanejo"], "area": "Zihuatanejo de Azueta, Guerrero", "tender": "unknown", "left": false, "address": "Zihuatanejo and Ixtapa cruise port, Mexico", "lat": 17.6469, "lon": -101.5519, "stops": [
    ["Playa La Ropa", "Playa la Ropa, Zihuatanejo, Mexico", 17.6292, -101.546, 150, ["beach"]],
    ["Playa Las Gatas", "Playa las Gatas, Zihuatanejo, Mexico", 17.6209, -101.5515, 150, ["beach", "water"]],
    ["Isla Ixtapa", "Isla Grande (Isla Ixtapa), San José Ixtapa (Barrio Viejo), Mexico", 17.6766, -101.6585, 180, ["beach", "water", "wildlife"]],
    ["Paseo del Pescador", "Paseo del Pescador, Zihuatanejo, Mexico", 17.6392, -101.5527, 60, ["town", "food", "markets"]],
    ["Museo Arqueológico de la Costa Grande", "Museo de Arqueológico, Zihuatanejo, Mexico", 17.6388, -101.5561, 30, ["history"]],
    ["Xihuacan", "Museo de Sitio Xihuacan, Palos Blancos, Mexico", 17.5325, -101.3297, 60, ["history"]]
  ]},
  {"id": "la-paz", "name": "La Paz", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": [], "area": "Municipio de La Paz, Baja California Sur", "tender": "unknown", "left": false, "address": "La Paz cruise port, Mexico", "lat": 24.162, "lon": -110.3159, "stops": [
    ["Playa Balandra", "Playa Balandra, Municipio de La Paz, Mexico", 24.3207, -110.3229, 150, ["beach", "water", "scenic"]],
    ["Playa El Tecolote", "Playa El Tecolote, Municipio de La Paz, Mexico", 24.3362, -110.3162, 150, ["beach"]],
    ["Todos Santos", "Todos Santos, Mexico", 23.4501, -110.2254, 120, ["town", "art"]],
    ["Isla Espíritu Santo", "Isla Espíritu Santo, Municipio de La Paz, Mexico", 24.4674, -110.3245, 300, ["water", "wildlife", "beach"]]
  ]},
  {"id": "loreto", "name": "Loreto", "region": "Mexico", "country": "Mexico", "cc": "mx", "aka": [], "area": "Municipio de Loreto, Baja California Sur", "tender": "varies", "left": false, "address": "Loreto cruise port, Mexico", "lat": 26.0098, "lon": -111.3453, "stops": [
    ["Misión de Nuestra Señora de Loreto", "Misión de Nuestra Señora de Loreto Conchó, Loreto, Mexico", 26.0104, -111.3434, 30, ["history"]],
    ["Misión San Francisco Javier", "Misión San Francisco Javier de Viggé-Biaundó, San Javier, Mexico", 25.8605, -111.5436, 150, ["history", "scenic"]],
    ["Isla Coronado", "Isla Coronado, Municipio de Loreto, Mexico", 26.1179, -111.2735, 180, ["beach", "water"]],
    ["Malecón de Loreto", "Malecón de Loreto, Loreto, Mexico", 26.0106, -111.3391, 60, ["town", "food"]],
    ["Parque Nacional Bahía de Loreto", "Parque Nacional Bahía de Loreto, Mexico", 25.8599, -111.1671, 240, ["water", "wildlife", "parks"]],
    ["Museo de las Misiones", "123 Calle Salvatierra, Loreto, Mexico", 26.0103, -111.3437, 30, ["history"]]
  ]},
  {"id": "galveston", "name": "Galveston", "region": "US homeport", "country": "Texas, USA", "cc": "us", "aka": [], "area": "Harborside Drive, Galveston, Galveston County, TX", "tender": "pier", "left": false, "address": "Galveston cruise port, TX", "lat": 29.3085, "lon": -94.7966, "stops": [
    ["Moody Gardens", "1 Hope Boulevard, Galveston, TX", 29.2746, -94.8524, 240, ["family", "wildlife", "gardens", "themeparks"]],
    ["The Strand Historic District", "The Strand Historic District, Galveston, TX", 29.3055, -94.8008, 120, ["history", "town", "food", "markets"]],
    ["Pleasure Pier", "2501 Seawall Boulevard, Galveston, TX", 29.2866, -94.7899, 150, ["themeparks", "family", "beach"]],
    ["Galveston Island State Park", "Galveston Island State Park, Galveston, TX", 29.2019, -94.9676, 150, ["parks", "beach", "wildlife", "hiking", "camping"]],
    ["Bishop's Palace", "1402 Broadway - Avenue J, Galveston, TX", 29.3031, -94.7821, 75, ["history"]],
    ["Schlitterbahn Galveston", "2026 Lockheed Road, Galveston, TX", 29.2709, -94.8514, 300, ["themeparks", "family", "water"]],
    ["Texas Seaport Museum and Tall Ship Elissa", "Texas Seaport Museum and Tall Ship Elissa, Galveston, TX", 29.3093, -94.7932, 90, ["history"]]
  ]},
  {"id": "new-orleans", "name": "New Orleans", "region": "US homeport", "country": "Louisiana, USA", "cc": "us", "aka": ["NOLA"], "area": "Orleans Parish, Louisiana, United States, LA", "tender": "pier", "left": false, "address": "New Orleans cruise port, LA", "lat": 29.9575, "lon": -90.0629, "stops": [
    ["French Quarter", "French Quarter, New Orleans, LA", 29.9595, -90.0655, 150, ["history", "town", "food", "music", "art"]],
    ["Jackson Square", "Jackson Square, New Orleans, LA", 29.9575, -90.0629, 45, ["history", "art"]],
    ["The National WWII Museum", "945 Magazine Street, New Orleans, LA", 29.9421, -90.0708, 180, ["history"]],
    ["New Orleans City Park", "New Orleans City Park, New Orleans, LA", 29.9875, -90.0963, 120, ["parks", "gardens", "family"]],
    ["Cafe du Monde", "800 Decatur Street, New Orleans, LA", 29.9576, -90.0619, 45, ["food"]],
    ["Frenchmen Street", "Frenchmen Street, New Orleans, LA", 29.9652, -90.0579, 120, ["music", "drinks"]],
    ["Audubon Zoo", "Audubon Zoo, New Orleans, LA", 29.9223, -90.1307, 180, ["wildlife", "family"]]
  ]},
  {"id": "miami", "name": "Miami", "region": "US homeport", "country": "Florida, USA", "cc": "us", "aka": ["PortMiami"], "area": "Miami-Dade County, Florida, United States, FL", "tender": "pier", "left": false, "address": "Miami cruise port, FL", "lat": 25.7742, "lon": -80.1936, "stops": [
    ["South Beach", "South Beach, Miami Beach, FL", 25.7744, -80.1332, 150, ["beach", "art", "town", "food"]],
    ["Vizcaya Museum and Gardens", "Vizcaya Museum and Gardens, Miami, FL", 25.7447, -80.2116, 150, ["gardens", "history", "art"]],
    ["Wynwood Walls", "2520 Northwest 2nd Avenue, Miami, FL", 25.8011, -80.1953, 75, ["art", "food", "drinks"]],
    ["Little Havana", "Little Havana, Miami, FL", 25.7655, -80.2266, 90, ["food", "music", "history", "town"]],
    ["Zoo Miami", "Zoo Miami, Miami-Dade County, FL", 25.6134, -80.3999, 240, ["wildlife", "family"]],
    ["Everglades Safari Park", "Everglades Safari Park, Miami-Dade County, FL", 25.7608, -80.6263, 120, ["wildlife", "water", "family"]],
    ["Fairchild Tropical Botanic Garden", "10901 Old Cutler Road, Coral Gables, FL", 25.6785, -80.2743, 150, ["gardens"]]
  ]},
  {"id": "fort-lauderdale", "name": "Fort Lauderdale (Port Everglades)", "region": "US homeport", "country": "Florida, USA", "cc": "us", "aka": ["Port Everglades"], "area": "Fort Lauderdale, Broward County, Florida, United States, FL", "tender": "pier", "left": false, "address": "Fort Lauderdale (Port Everglades) cruise port, FL", "lat": 26.0969, "lon": -80.1273, "stops": [
    ["Fort Lauderdale Beach", "Fort Lauderdale Beach, Fort Lauderdale, FL", 26.147, -80.1013, 150, ["beach", "water", "scenic"]],
    ["Las Olas Boulevard", "Las Olas Boulevard, Fort Lauderdale, FL", 26.1195, -80.1433, 90, ["town", "food", "art", "drinks"]],
    ["Butterfly World", "3600 West Sample Road, Coconut Creek, FL", 26.2687, -80.1716, 120, ["gardens", "wildlife", "family"]],
    ["Flamingo Gardens", "Flamingo Gardens, Davie, FL", 26.0733, -80.3121, 120, ["gardens", "wildlife", "family"]],
    ["Everglades Holiday Park", "Everglades Holiday Park, Broward County, FL", 26.0592, -80.445, 120, ["wildlife", "water", "fishing"]],
    ["Bonnet House Museum and Gardens", "Bonnet House Museum and Gardens, Fort Lauderdale, FL", 26.1351, -80.1056, 120, ["history", "gardens", "art"]]
  ]},
  {"id": "port-canaveral", "name": "Port Canaveral", "region": "US homeport", "country": "Florida, USA", "cc": "us", "aka": ["Cape Canaveral", "Orlando"], "area": "Brevard County, Florida, United States, FL", "tender": "unknown", "left": false, "address": "Port Canaveral cruise port, FL", "lat": 28.4161, "lon": -80.6078, "stops": [
    ["Kennedy Space Center Visitor Complex", "9500 Space Commerce Way, Merritt Island, FL", 28.5154, -80.6819, 300, ["history", "family", "themeparks"]],
    ["Cocoa Beach Pier", "Cocoa Beach Pier, Cocoa Beach, FL", 28.3678, -80.6018, 120, ["beach", "fishing", "food", "water"]],
    ["Merritt Island National Wildlife Refuge", "Merritt Island National Wildlife Refuge, Brevard County, FL", 28.6202, -80.7422, 150, ["wildlife", "parks", "hiking"]],
    ["Canaveral National Seashore", "Canaveral National Seashore, Oak Hill, FL", 28.8882, -80.8205, 180, ["parks", "beach", "wildlife", "camping"]],
    ["Ron Jon Surf Shop", "4151 North Atlantic Avenue, Cocoa Beach, FL", 28.3563, -80.6077, 60, ["town", "water"]],
    ["Cape Canaveral Lighthouse", "Cape Canaveral Lighthouse, Brevard County, FL", 28.4604, -80.5435, 45, ["lighthouses", "history"]]
  ]},
  {"id": "tampa", "name": "Tampa", "region": "US homeport", "country": "Florida, USA", "cc": "us", "aka": [], "area": "Hillsborough County, Florida, United States, FL", "tender": "pier", "left": false, "address": "Tampa cruise port, FL", "lat": 27.945, "lon": -82.4583, "stops": [
    ["Ybor City", "Ybor City, Tampa, FL", 27.96, -82.4412, 120, ["history", "food", "drinks", "music"]],
    ["Florida Aquarium", "701 Channelside Drive, Tampa, FL", 27.9441, -82.4449, 150, ["wildlife", "family"]],
    ["Tampa Riverwalk", "Tampa Riverwalk, Tampa, FL", 27.9408, -82.4561, 90, ["scenic", "town", "food"]],
    ["Busch Gardens Tampa Bay", "Busch Gardens Tampa Bay, Tampa, FL", 28.0371, -82.4213, 360, ["themeparks", "family", "wildlife"]],
    ["Clearwater Beach", "Clearwater Beach, Clearwater, FL", 27.9775, -82.8279, 180, ["beach", "water"]],
    ["Lowry Park Zoo", "1101 West Sligh Avenue, Tampa, FL", 28.015, -82.4699, 180, ["wildlife", "family"]]
  ]},
  {"id": "seattle", "name": "Seattle", "region": "US homeport", "country": "Washington, USA", "cc": "us", "aka": [], "area": "King County, Washington, United States, WA", "tender": "pier", "left": false, "address": "Seattle cruise port, WA", "lat": 47.6038, "lon": -122.3301, "stops": [
    ["Pike Place Market", "85 Pike Street, Seattle, WA", 47.6094, -122.3414, 120, ["markets", "food", "town"]],
    ["Space Needle", "400 Broad Street, Seattle, WA", 47.6205, -122.3493, 90, ["scenic", "family"]],
    ["Chihuly Garden and Glass", "305 Harrison Street, Seattle, WA", 47.6205, -122.3502, 90, ["art", "gardens"]],
    ["Museum of Pop Culture", "Museum of Pop Culture, Seattle, WA", 47.6215, -122.3482, 120, ["music", "history", "art"]],
    ["Seattle Aquarium", "1483 Alaskan Way, Seattle, WA", 47.6076, -122.3432, 90, ["wildlife", "family"]],
    ["Hiram M. Chittenden Locks", "3015 Northwest 54th Street, Seattle, WA", 47.666, -122.3978, 75, ["fishing", "wildlife", "gardens", "history"]],
    ["Kerry Park", "Kerry Park, Seattle, WA", 47.6294, -122.3599, 30, ["scenic"]]
  ]},
  {"id": "san-diego", "name": "San Diego", "region": "US homeport", "country": "California, USA", "cc": "us", "aka": [], "area": "San Diego County, California, United States, CA", "tender": "pier", "left": false, "address": "San Diego cruise port, CA", "lat": 32.7157, "lon": -117.1638, "stops": [
    ["San Diego Zoo", "2920 Zoo Drive, San Diego, CA", 32.736, -117.1507, 300, ["wildlife", "family", "gardens"]],
    ["Balboa Park", "Balboa Park, San Diego, CA", 32.7317, -117.1465, 180, ["gardens", "art", "history", "family"]],
    ["USS Midway Museum", "910 North Harbor Drive, San Diego, CA", 32.7138, -117.1752, 150, ["history", "family"]],
    ["Cabrillo National Monument", "Cabrillo National Monument, San Diego, CA", 32.6722, -117.2409, 90, ["lighthouses", "parks", "scenic", "history"]],
    ["Gaslamp Quarter", "Gaslamp Quarter, San Diego, CA", 32.7115, -117.1601, 90, ["town", "food", "drinks", "music"]],
    ["La Jolla Cove", "La Jolla Cove, La Jolla, CA", 32.8506, -117.2726, 120, ["beach", "wildlife", "water", "scenic"]],
    ["Coronado Beach", "Coronado Beach, Coronado, CA", 32.6831, -117.1859, 120, ["beach", "history"]]
  ]},
  {"id": "new-york", "name": "New York City (Manhattan)", "region": "US homeport", "country": "New York, USA", "cc": "us", "aka": ["New York", "NYC", "Manhattan"], "area": "Manhattan, New York County, NY", "tender": "pier", "left": false, "address": "New York City (Manhattan) cruise port, NY", "lat": 40.7677, "lon": -73.999, "stops": [
    ["Statue of Liberty", "Statue of Liberty, New York, NY", 40.6893, -74.0445, 180, ["history", "scenic"]],
    ["Central Park", "Central Park, New York, NY", 40.7828, -73.9654, 150, ["parks", "gardens", "scenic"]],
    ["Metropolitan Museum of Art", "1000 5th Avenue, New York, NY", 40.7794, -73.9634, 180, ["art", "history"]],
    ["High Line", "High Line, New York, NY", 40.7564, -74.0038, 75, ["parks", "scenic", "art"]],
    ["Times Square", "Times Square, New York, NY", 40.7573, -73.9859, 45, ["music", "town", "family"]],
    ["Brooklyn Bridge", "Brooklyn Bridge, New York, NY", 40.7062, -73.997, 60, ["scenic", "history"]],
    ["Chelsea Market", "75 9th Avenue, New York, NY", 40.7429, -74.007, 75, ["markets", "food"]]
  ]},
  {"id": "boston", "name": "Boston", "region": "US homeport", "country": "Massachusetts, USA", "cc": "us", "aka": [], "area": "Seaport, Boston, Suffolk County, Massachusetts, MA", "tender": "pier", "left": false, "address": "Boston cruise port, MA", "lat": 42.344, "lon": -71.0307, "stops": [
    ["Freedom Trail", "Freedom Trail, Boston, MA", 42.3612, -71.057, 180, ["history", "town"]],
    ["Boston Public Garden", "Boston Public Garden, Boston, MA", 42.3541, -71.07, 60, ["gardens", "parks"]],
    ["Faneuil Hall Marketplace", "1 Faneuil Hall Square, Boston, MA", 42.3601, -71.0546, 75, ["markets", "food", "town"]],
    ["New England Aquarium", "1 Boston HarborWalk, Boston, MA", 42.3592, -71.0492, 120, ["wildlife", "family"]],
    ["Fenway Park", "4 Jersey Street, Boston, MA", 42.3465, -71.0971, 75, ["history", "family"]],
    ["Harpoon Brewery", "306 Northern Avenue, Boston, MA", 42.3471, -71.0341, 75, ["drinks"]],
    ["Museum of Fine Arts", "465 Huntington Avenue, Boston, MA", 42.3395, -71.0939, 150, ["art"]]
  ]},
  {"id": "baltimore", "name": "Baltimore", "region": "US homeport", "country": "Maryland, USA", "cc": "us", "aka": [], "area": "Maryland, United States", "tender": "pier", "left": false, "address": "Baltimore cruise port, MD", "lat": 39.2649, "lon": -76.5986, "stops": [
    ["Fort McHenry National Monument and Historic Shrine", "Fort McHenry National Monument and Historic Shrine, Baltimore, MD", 39.2637, -76.5803, 90, ["history"]],
    ["Inner Harbor", "Inner Harbor, Baltimore, MD", 39.2834, -76.6094, 90, ["town", "food"]],
    ["National Aquarium", "501 East Pratt Street, Baltimore, MD", 39.2848, -76.6077, 150, ["wildlife", "family"]],
    ["Walters Art Museum", "600 North Charles Street, Baltimore, MD", 39.2966, -76.6161, 90, ["art"]],
    ["B&O Railroad Museum", "901 West Pratt Street, Baltimore, MD", 39.2847, -76.6335, 90, ["history", "family"]],
    ["American Visionary Art Museum", "American Visionary Art Museum, Baltimore, MD", 39.2801, -76.6069, 75, ["art"]],
    ["Lexington Market", "201 North Eutaw Street, Baltimore, MD", 39.2916, -76.6206, 45, ["food", "markets"]],
    ["Fells Point", "Fells Point, Baltimore, MD", 39.282, -76.593, 75, ["town", "food", "history"]]
  ]},
  {"id": "charleston", "name": "Charleston", "region": "US homeport", "country": "South Carolina, USA", "cc": "us", "aka": [], "area": "Charleston County, South Carolina, United States", "tender": "pier", "left": false, "address": "Charleston cruise port, SC", "lat": 32.7814, "lon": -79.9239, "stops": [
    ["Fort Sumter National Monument", "Fort Sumter, Mount Pleasant, SC", 32.7521, -79.8751, 150, ["history"]],
    ["Rainbow Row", "Rainbow Row (North End), Charleston, SC", 32.7762, -79.9271, 30, ["history", "town"]],
    ["Charleston City Market", "188 Meeting Street, Charleston, SC", 32.7809, -79.9293, 60, ["markets"]],
    ["Magnolia Plantation and Gardens", "3500 Ashley River Road, Charleston, SC", 32.8746, -80.0832, 150, ["gardens", "history"]],
    ["Middleton Place", "Middleton Place, Dorchester County, SC", 32.9018, -80.139, 120, ["gardens", "history"]],
    ["Patriots Point Naval and Maritime Museum", "Patriots Point Naval and Maritime Museum, Mount Pleasant, SC", 32.7906, -79.9059, 120, ["history", "family"]],
    ["Folly Beach", "Folly Beach, SC", 32.6555, -79.9408, 150, ["beach"]],
    ["Angel Oak", "3688 Angel Oak Road, Fenwick Crossroads, SC", 32.717, -80.0804, 30, ["scenic"]]
  ]},
  {"id": "jacksonville", "name": "Jacksonville", "region": "US homeport", "country": "Florida, USA", "cc": "us", "aka": [], "area": "Duval County, Florida, United States", "tender": "pier", "left": false, "address": "Jacksonville cruise port, FL", "lat": 30.4077, "lon": -81.5803, "stops": [
    ["Cummer Museum of Art and Gardens", "829 Riverside Avenue, Jacksonville, FL", 30.3151, -81.6766, 90, ["art", "gardens"]],
    ["Jacksonville Zoo and Gardens", "370 Zoo Parkway, Jacksonville, FL", 30.4023, -81.6433, 150, ["wildlife", "family"]],
    ["Fort Caroline National Memorial", "Fort Caroline National Memorial, Jacksonville, FL", 30.3861, -81.4975, 60, ["history"]],
    ["Kingsley Plantation", "11676 Palmetto Avenue, Jacksonville, FL", 30.4393, -81.4379, 60, ["history"]],
    ["Jacksonville Beach", "Jacksonville Beach, Duval County, FL", 30.2947, -81.3931, 150, ["beach"]],
    ["Fort Clinch State Park", "2601 Atlantic Avenue, Fernandina Beach, FL", 30.6701, -81.4347, 120, ["history", "parks", "beach"]],
    ["Castillo de San Marcos", "1 South Castillo Drive, Saint Augustine, FL", 29.8979, -81.3117, 90, ["history"]],
    ["Huguenot Memorial Park", "Huguenot Memorial Park, Jacksonville, FL", 30.4122, -81.4065, 120, ["beach"]]
  ]},
  {"id": "mobile", "name": "Mobile", "region": "US homeport", "country": "Alabama, USA", "cc": "us", "aka": [], "area": "Mobile County, Alabama, United States", "tender": "pier", "left": false, "address": "Mobile cruise port, AL", "lat": 30.6866, "lon": -88.0377, "stops": [
    ["USS Alabama Battleship Memorial Park", "USS Alabama Battleship Memorial Park, Mobile, AL", 30.6844, -88.0153, 150, ["history", "family"]],
    ["Bellingrath Gardens and Home", "Bellingrath Gardens, Mobile County, AL", 30.431, -88.1409, 150, ["gardens", "history"]],
    ["Mobile Carnival Museum", "355 Government Street, Mobile, AL", 30.6884, -88.0453, 60, ["history", "art"]],
    ["Dauphin Island", "Dauphin Island, AL", 30.2542, -88.1125, 150, ["beach", "wildlife"]],
    ["Fort Gaines", "Fort Gaines, Dauphin Island, AL", 30.2485, -88.0756, 75, ["history"]],
    ["Fort Conde", "150 South Royal Street, Mobile, AL", 30.6888, -88.0398, 30, ["history"]]
  ]},
  {"id": "norfolk", "name": "Norfolk", "region": "US homeport", "country": "Virginia, USA", "cc": "us", "aka": [], "area": "Virginia, United States", "tender": "pier", "left": false, "address": "Norfolk cruise port, VA", "lat": 36.8475, "lon": -76.296, "stops": [
    ["Nauticus", "1 Waterside Drive, Norfolk, VA", 36.8477, -76.2951, 120, ["history", "family"]],
    ["Norfolk Botanical Garden", "Norfolk Botanical Garden, Norfolk, VA", 36.9051, -76.2002, 120, ["gardens"]],
    ["Chrysler Museum of Art", "1 Memorial Place, Norfolk, VA", 36.8564, -76.293, 90, ["art"]],
    ["Virginia Beach Boardwalk", "Boardwalk, Virginia Beach, VA", 36.8493, -75.9744, 150, ["beach", "town"]],
    ["Colonial Williamsburg", "Williamsburg Historic District, Williamsburg, VA", 37.272, -76.6968, 240, ["history"]],
    ["MacArthur Memorial", "198 Bank Street, Norfolk, VA", 36.8474, -76.2886, 60, ["history"]],
    ["Fort Monroe", "Fort Monroe, Hampton, VA", 37.0043, -76.3069, 90, ["history"]],
    ["Virginia Aquarium and Marine Science Center", "717 General Booth Boulevard, Virginia Beach, VA", 36.8211, -75.9837, 150, ["wildlife", "family"]]
  ]},
  {"id": "los-angeles", "name": "Los Angeles (San Pedro)", "region": "US homeport", "country": "California, USA", "cc": "us", "aka": ["San Pedro", "Los Angeles", "LA"], "area": "Los Angeles, Los Angeles County, California, United States", "tender": "pier", "left": false, "address": "Los Angeles cruise port, CA", "lat": 33.7459, "lon": -118.2772, "stops": [
    ["Battleship USS Iowa Museum", "Battleship USS Iowa, Los Angeles, CA", 33.7419, -118.2773, 120, ["history"]],
    ["Point Fermin Lighthouse", "Point Fermin Lighthouse, Los Angeles, CA", 33.7055, -118.2937, 45, ["lighthouses"]],
    ["Cabrillo Marine Aquarium", "3720 Stephen M. White Drive, Los Angeles, CA", 33.7113, -118.2853, 75, ["wildlife", "family"]],
    ["Griffith Observatory", "2800 East Observatory Road, Los Angeles, CA", 34.1182, -118.3003, 120, ["scenic", "family"]],
    ["Santa Monica Pier", "Santa Monica Pier, Santa Monica, CA", 34.0089, -118.4974, 150, ["beach", "themeparks", "family"]],
    ["Hollywood Walk of Fame", "Walk of Fame, Los Angeles, CA", 34.1017, -118.3403, 90, ["town", "music"]],
    ["Korean Bell of Friendship", "Korean Friendship Bell, Los Angeles, CA", 33.7097, -118.2938, 30, ["history", "scenic"]]
  ]},
  {"id": "long-beach", "name": "Long Beach", "region": "US homeport", "country": "California, USA", "cc": "us", "aka": [], "area": "Los Angeles County, California, United States", "tender": "pier", "left": false, "address": "Long Beach cruise port, CA", "lat": 33.7513, "lon": -118.1889, "stops": [
    ["Queen Mary", "Queen Mary, Long Beach, CA", 33.7537, -118.1922, 120, ["history"]],
    ["Aquarium of the Pacific", "Aquarium of the Pacific, Long Beach, CA", 33.762, -118.197, 150, ["wildlife", "family"]],
    ["Rancho Los Alamitos", "6400 East Bixby Hill Road, Long Beach, CA", 33.777, -118.1074, 75, ["history", "gardens"]],
    ["Shoreline Village", "Shoreline Village, Long Beach, CA", 33.7608, -118.1902, 60, ["town", "food"]],
    ["Museum of Latin American Art", "Museum of Latin American Art, Long Beach, CA", 33.7746, -118.1797, 75, ["art"]],
    ["Huntington Beach Pier", "Huntington Beach Pier, Huntington Beach, CA", 33.6546, -118.0047, 150, ["beach"]]
  ]},
  {"id": "san-francisco", "name": "San Francisco", "region": "US homeport", "country": "California, USA", "cc": "us", "aka": [], "area": "California, United States", "tender": "pier", "left": false, "address": "San Francisco cruise port, CA", "lat": 37.8056, "lon": -122.4011, "stops": [
    ["Golden Gate Bridge", "Golden Gate Bridge, San Francisco, CA", 37.8074, -122.476, 60, ["scenic"]],
    ["Alcatraz Island", "Alcatraz Island, San Francisco, CA", 37.8267, -122.4228, 180, ["history"]],
    ["Fisherman's Wharf", "Fisherman's Wharf, San Francisco, CA", 37.8081, -122.4166, 90, ["town", "food"]],
    ["Golden Gate Park", "Golden Gate Park, San Francisco, CA", 37.7694, -122.4822, 120, ["parks", "gardens"]],
    ["Muir Woods National Monument", "Muir Woods National Monument, Marin County, CA", 37.8964, -122.5802, 150, ["parks", "hiking"]],
    ["Ferry Building", "Ferry Building, San Francisco, CA", 37.7956, -122.3944, 60, ["food", "markets"]],
    ["Exploratorium", "Exploratorium, San Francisco, CA", 37.8009, -122.3985, 150, ["family"]],
    ["Sausalito", "Sausalito, CA", 37.859, -122.4855, 90, ["town"]]
  ]},
  {"id": "bayonne", "name": "Cape Liberty (Bayonne)", "region": "US homeport", "country": "New Jersey, USA", "cc": "us", "aka": ["Bayonne", "Cape Liberty"], "area": "Hudson County, New Jersey, United States", "tender": "unknown", "left": false, "address": "Cape Liberty cruise port, NJ", "lat": 40.6687, "lon": -74.1143, "stops": [
    ["Statue of Liberty", "Statue of Liberty, New York, NY", 40.6893, -74.0445, 180, ["history"]],
    ["Liberty State Park", "Liberty State Park, Jersey City, NJ", 40.7013, -74.0492, 90, ["parks", "scenic"]],
    ["Ellis Island", "Ellis Island, Jersey City, NJ", 40.6986, -74.042, 120, ["history"]],
    ["Central Park", "Central Park, New York, NY", 40.7828, -73.9654, 120, ["parks"]],
    ["Liberty Science Center", "222 Jersey City Boulevard, Jersey City, NJ", 40.7082, -74.0547, 150, ["family"]]
  ]},
  {"id": "brooklyn", "name": "Brooklyn (Red Hook)", "region": "US homeport", "country": "New York, USA", "cc": "us", "aka": ["Red Hook", "Brooklyn"], "area": "Brooklyn, Kings County, New York, United States", "tender": "pier", "left": false, "address": "Brooklyn cruise port, NY", "lat": 40.6826, "lon": -74.0135, "stops": [
    ["Brooklyn Bridge", "Brooklyn Bridge, New York, NY", 40.7056, -73.9964, 60, ["scenic", "history"]],
    ["Brooklyn Bridge Park", "Brooklyn Bridge Park, New York, NY", 40.6983, -73.9999, 90, ["parks", "scenic"]],
    ["Prospect Park", "Prospect Park, New York, NY", 40.6618, -73.9711, 90, ["parks"]],
    ["Brooklyn Botanic Garden", "Brooklyn Botanic Garden, New York, NY", 40.6677, -73.9636, 90, ["gardens"]],
    ["Brooklyn Museum", "200 Eastern Parkway, New York, NY", 40.671, -73.9633, 120, ["art", "history"]],
    ["Coney Island", "Coney Island, New York, NY", 40.5765, -73.9929, 180, ["beach", "themeparks", "family"]]
  ]},
  {"id": "astoria", "name": "Astoria, Oregon", "region": "US homeport", "country": "Oregon, USA", "cc": "us", "aka": ["Astoria"], "area": "Clatsop County, Oregon, United States", "tender": "varies", "left": false, "address": "Astoria cruise port, OR", "lat": 46.1882, "lon": -123.832, "stops": [
    ["Astoria Column", "1 Coxcomb Drive, Astoria, OR", 46.1813, -123.8176, 45, ["scenic", "history"]],
    ["Columbia River Maritime Museum", "1792 Marine Drive, Astoria, OR", 46.19, -123.8231, 90, ["history"]],
    ["Fort Clatsop", "Fort Clatsop - Netul Landing - Lewis and Clark National Historical Park, Clatsop County, OR", 46.1282, -123.8985, 90, ["history", "parks"]],
    ["Fort Stevens State Park", "Fort Stevens State Park, Hammond, OR", 46.1934, -123.9753, 120, ["history", "beach", "parks"]],
    ["Haystack Rock", "Haystack Rock, Clatsop County, OR", 45.8845, -123.9684, 120, ["beach", "scenic"]],
    ["Flavel House Museum", "441 8th Street, Astoria, OR", 46.1881, -123.8351, 45, ["history"]],
    ["Astoria Riverwalk", "Astoria Riverwalk, Astoria, OR", 46.1904, -123.8189, 60, ["scenic", "town"]]
  ]},
  {"id": "catalina", "name": "Avalon, Catalina Island", "region": "US homeport", "country": "California, USA", "cc": "us", "aka": ["Catalina", "Catalina Island", "Avalon"], "area": "Los Angeles County, California, United States", "tender": "tender", "left": false, "address": "Avalon cruise port, CA", "lat": 33.3422, "lon": -118.3273, "stops": [
    ["Catalina Casino", "1 Casino Way, Avalon, CA", 33.3489, -118.3258, 60, ["history", "music"]],
    ["Wrigley Memorial and Botanic Garden", "Wrigley Memorial, Avalon, CA", 33.3235, -118.342, 75, ["gardens", "history"]],
    ["Descanso Beach Club", "Descanso Beach, Avalon, CA", 33.3509, -118.3285, 120, ["beach", "water"]],
    ["Green Pleasure Pier", "Green Pleasure Pier, Avalon, CA", 33.344, -118.3247, 30, ["town", "food"]],
    ["Catalina Island Museum", "217 Metropole Avenue, Avalon, CA", 33.3434, -118.328, 45, ["history"]],
    ["Lovers Cove", "Lovers Cove, Avalon, CA", 33.3434, -118.3195, 90, ["water", "wildlife"]]
  ]},
  {"id": "juneau", "name": "Juneau", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Alaska, United States, AK", "tender": "varies", "left": false, "address": "Juneau cruise port, AK", "lat": 58.302, "lon": -134.4197, "stops": [
    ["Mendenhall Glacier", "Mendenhall Glacier, Juneau, AK", 58.4172, -134.5456, 150, ["scenic", "parks", "hiking", "waterfalls", "wildlife"]],
    ["Mount Roberts Tramway", "490 South Franklin Street, Juneau, AK", 58.2962, -134.4009, 120, ["scenic", "hiking"]],
    ["Alaska State Museum", "395 Whittier Street, Juneau, AK", 58.3, -134.4161, 75, ["history", "art"]],
    ["Alaskan Brewing Company", "Alaskan Brewing Company, Juneau, AK", 58.2994, -134.4074, 75, ["drinks"]],
    ["St. Nicholas Russian Orthodox Church", "326 5th Street, Juneau, AK", 58.3031, -134.409, 20, ["history"]]
  ]},
  {"id": "ketchikan", "name": "Ketchikan", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Ketchikan Gateway Borough, Alaska, United States, AK", "tender": "varies", "left": false, "address": "Ketchikan cruise port, AK", "lat": 55.3431, "lon": -131.6467, "stops": [
    ["Creek Street", "Creek Street, Ketchikan, AK", 55.3424, -131.642, 60, ["history", "town"]],
    ["Totem Bight State Historical Park", "Totem Bight State Historical Park, Mud Bay, AK", 55.4212, -131.7746, 90, ["history", "parks", "art"]],
    ["Saxman Native Village", "Saxman Native Village, Saxman, AK", 55.3193, -131.5966, 90, ["history", "art"]],
    ["Misty Fjords", "Misty Fjords, Alaska, AK", 55.585, -130.4166, 360, ["scenic", "parks", "wildlife"]],
    ["Tongass Historical Museum", "629 Dock Street, Ketchikan, AK", 55.3426, -131.6436, 45, ["history"]],
    ["Ketchikan Lumberjack Show", "Ketchikan Lumberjack Show, Ketchikan, AK", 55.3401, -131.6433, 75, ["family", "history"]],
    ["Ketchikan Salmon Ladder", "Ketchikan Salmon Ladder, Ketchikan, AK", 55.3459, -131.631, 30, ["fishing", "wildlife"]]
  ]},
  {"id": "skagway", "name": "Skagway", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Skagway, Alaska, United States, AK", "tender": "pier", "left": false, "address": "Skagway cruise port, AK", "lat": 59.457, "lon": -135.3121, "stops": [
    ["White Pass and Yukon Route Railroad", "231 2nd Avenue, Skagway, AK", 59.4532, -135.3178, 210, ["scenic", "history", "family"]],
    ["Gold Rush Cemetery", "Gold Rush Cemetery, Skagway, AK", 59.4731, -135.2894, 45, ["history", "hiking", "waterfalls"]],
    ["Skagway Museum", "700 Spring Street, Skagway, AK", 59.4557, -135.3118, 45, ["history"]],
    ["Dyea", "Dyea, Skagway, AK", 59.5078, -135.3583, 90, ["history", "hiking", "scenic"]],
    ["Red Onion Saloon", "205 Broadway, Skagway, AK", 59.454, -135.3185, 60, ["drinks", "history", "music"]]
  ]},
  {"id": "sitka", "name": "Sitka", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Barlow Street, Sitka, Alaska, United States, AK", "tender": "varies", "left": false, "address": "Sitka cruise port, AK", "lat": 57.0497, "lon": -135.3281, "stops": [
    ["Sitka National Historical Park", "Sitka National Historical Park, Sitka, AK", 57.0515, -135.3313, 90, ["history", "parks", "hiking", "art"]],
    ["Alaska Raptor Center", "1000 Sawmill Creek Road, Sitka, AK", 57.0524, -135.3164, 75, ["wildlife", "family"]],
    ["St. Michael's Cathedral", "240 Lincoln Street, Sitka, AK", 57.05, -135.3353, 30, ["history"]],
    ["Sheldon Jackson Museum", "104 College Drive, Sitka, AK", 57.0505, -135.3223, 45, ["history", "art"]]
  ]},
  {"id": "seward", "name": "Seward", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Kenai Peninsula Borough, Alaska, United States", "tender": "pier", "left": false, "address": "Seward cruise port, AK", "lat": 60.1196, "lon": -149.4281, "stops": [
    ["Alaska SeaLife Center", "301 Railway Avenue, Seward, AK", 60.0998, -149.4411, 120, ["wildlife", "family"]],
    ["Exit Glacier", "Exit Glacier, Kenai Peninsula Borough, AK", 60.1506, -149.7195, 150, ["parks", "hiking", "scenic"]],
    ["Seward Small Boat Harbor", "Seward Small Boat Harbor, Seward, AK", 60.118, -149.435, 60, ["town", "water", "fishing"]],
    ["Kenai Fjords National Park Visitor Center", "1212 Fourth Avenue, Seward, AK", 60.1162, -149.4397, 45, ["parks"]]
  ]},
  {"id": "whittier", "name": "Whittier", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Unorganized Borough, Alaska, United States", "tender": "pier", "left": false, "address": "Whittier cruise port, AK", "lat": 60.7843, "lon": -148.716, "stops": [
    ["Anton Anderson Memorial Tunnel", "Anton Anderson Memorial Tunnel, Anchorage, AK", 60.7831, -148.7683, 30, ["scenic", "history"]],
    ["Begich, Boggs Visitor Center", "Begich/Boggs Visitor Center Portage Lake View, Anchorage, AK", 60.7832, -148.8409, 75, ["parks", "scenic"]],
    ["Alaska Wildlife Conservation Center", "Alaska Wildlife Conservation Center, Anchorage, AK", 60.8248, -148.9837, 90, ["wildlife", "family"]],
    ["Byron Glacier Trail", "Byron Glacier Trail, Anchorage, AK", 60.7673, -148.8412, 90, ["hiking"]],
    ["Horsetail Falls", "Horsetail Falls Trail, Whittier, AK", 60.7678, -148.677, 60, ["waterfalls", "hiking"]],
    ["Prince William Sound Museum", "Prince William Sound Museum, Whittier, AK", 60.7744, -148.6815, 30, ["history"]]
  ]},
  {"id": "haines", "name": "Haines", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Haines Borough, Alaska, United States", "tender": "unknown", "left": false, "address": "Haines cruise port, AK", "lat": 59.2358, "lon": -135.445, "stops": [
    ["Alaska Chilkat Bald Eagle Preserve", "Alaska Chilkat Bald Eagle Preserve, Haines Borough, AK", 59.374, -135.8363, 120, ["wildlife"]],
    ["Fort William H. Seward", "Fort Seward, Haines, AK", 59.2273, -135.4428, 45, ["history"]],
    ["Sheldon Museum", "11 Main Street, Haines, AK", 59.2345, -135.4431, 45, ["history"]],
    ["Hammer Museum", "108 Main Street, Haines, AK", 59.2352, -135.4441, 30, ["history", "family"]],
    ["Chilkoot Lake State Recreation Site", "Chilkoot Lake, Haines Borough, AK", 59.3538, -135.5983, 90, ["scenic", "fishing"]],
    ["Battery Point Trail", "Battery Point Trail, Haines, AK", 59.214, -135.3775, 90, ["hiking"]]
  ]},
  {"id": "kodiak", "name": "Kodiak", "region": "Alaska", "country": "Alaska, USA", "cc": "us", "aka": [], "area": "Kodiak Island Borough, Alaska, United States", "tender": "unknown", "left": false, "address": "Kodiak cruise port, AK", "lat": 57.7902, "lon": -152.4067, "stops": [
    ["Fort Abercrombie State Historical Park", "Fort Abercrombie State Historical Park, Kodiak Island Borough, AK", 57.8326, -152.356, 90, ["history", "parks", "hiking"]],
    ["Kodiak History Museum", "Kodiak History Museum, Kodiak, AK", 57.7877, -152.4034, 45, ["history"]],
    ["Holy Resurrection Orthodox Cathedral", "308 Kashevaroff Avenue, Kodiak, AK", 57.7885, -152.4027, 30, ["history"]],
    ["Pillar Mountain", "Pillar Mountain, Kodiak, AK", 57.7886, -152.4356, 45, ["scenic"]],
    ["Kodiak National Wildlife Refuge Visitor Center", "Kodiak National Wildlife Refuge Visitor Center, Kodiak, AK", 57.7875, -152.4043, 45, ["wildlife"]]
  ]},
  {"id": "prince-rupert", "name": "Prince Rupert, BC", "region": "Alaska", "country": "Canada", "cc": "ca", "aka": ["Prince Rupert"], "area": "North Coast Regional District, British Columbia, BC", "tender": "pier", "left": false, "address": "Prince Rupert cruise port, BC", "lat": 54.3179, "lon": -130.3226, "stops": [
    ["North Pacific Cannery", "North Pacific Cannery, Port Edward, BC", 54.1944, -130.2248, 90, ["history"]],
    ["Museum of Northern British Columbia", "100 1st Avenue West, Prince Rupert, BC", 54.3164, -130.3241, 60, ["history", "art"]],
    ["Cow Bay", "Cow Bay Rotary Pathway, Prince Rupert, BC", 54.3197, -130.3194, 60, ["town", "food"]],
    ["Butze Rapids Trail", "Butze Rapids Trail, Prince Rupert, BC", 54.3013, -130.2671, 60, ["hiking"]],
    ["Sunken Gardens", "Sunken Gardens, Prince Rupert, BC", 54.3168, -130.3202, 20, ["gardens"]]
  ]},
  {"id": "honolulu", "name": "Honolulu", "region": "Hawaii", "country": "Hawaii, USA", "cc": "us", "aka": ["Oahu"], "area": "Aloha Tower Drive, Downtown, Chinatown, Honolulu, HI", "tender": "varies", "left": false, "address": "Honolulu cruise port, HI", "lat": 21.3067, "lon": -157.8656, "stops": [
    ["Pearl Harbor National Memorial", "Pearl Harbor National Memorial, Aiea, HI", 21.3675, -157.9384, 240, ["history", "parks"]],
    ["Diamond Head State Monument", "Diamond Head State Monument, East Honolulu, HI", 21.2625, -157.8068, 120, ["hiking", "scenic", "parks"]],
    ["Waikiki Beach", "Waikiki Beach, East Honolulu, HI", 21.2741, -157.8243, 180, ["beach", "water", "town"]],
    ["Iolani Palace", "364 South King Street, East Honolulu, HI", 21.3068, -157.8588, 90, ["history"]],
    ["Hanauma Bay Nature Preserve", "Hanauma Bay Nature Preserve, East Honolulu, HI", 21.2696, -157.6938, 180, ["water", "wildlife", "beach", "parks"]],
    ["Honolulu Zoo", "151 Kapahulu Avenue, East Honolulu, HI", 21.2712, -157.8189, 120, ["wildlife", "family"]],
    ["Foster Botanical Garden", "Foster Botanical Garden, East Honolulu, HI", 21.3164, -157.8578, 75, ["gardens"]]
  ]},
  {"id": "maui", "name": "Kahului, Maui", "region": "Hawaii", "country": "Hawaii, USA", "cc": "us", "aka": ["Maui", "Kahului"], "area": "Kahului, Maui County, Hawaii, United States, HI", "tender": "varies", "left": false, "address": "Kahului cruise port, HI", "lat": 20.8958, "lon": -156.4719, "stops": [
    ["Iao Valley State Monument", "Iao Valley State Monument, Maui County, HI", 20.8806, -156.5471, 90, ["scenic", "hiking", "parks", "waterfalls"]],
    ["Haleakala National Park", "Haleakala National Park, Maui County, HI", 20.6991, -156.1324, 240, ["parks", "scenic", "hiking", "camping"]],
    ["Lahaina Banyan Court", "Lahaina Banyan Court, Lahaina, HI", 20.8717, -156.6776, 45, ["history", "gardens"]],
    ["Maui Ocean Center", "Maui Ocean Center, Maʻalaea, HI", 20.7928, -156.5119, 120, ["wildlife", "family"]],
    ["Ho'okipa Beach", "Ho'okipa Beach, Kuau, HI", 20.9344, -156.3558, 90, ["beach", "water", "wildlife"]],
    ["Maui Tropical Plantation", "1670 Honoapiilani Highway, Waikapu, HI", 20.849, -156.5065, 90, ["markets", "gardens", "food"]]
  ]},
  {"id": "kona", "name": "Kailua-Kona", "region": "Hawaii", "country": "Hawaii, USA", "cc": "us", "aka": ["Kona", "Kailua Kona"], "area": "Hillcrest, Kailua, Hawaii, United States, HI", "tender": "tender", "left": false, "address": "Kailua-Kona cruise port, HI", "lat": 19.6392, "lon": -155.9968, "stops": [
    ["Pu'uhonua o Honaunau National Historical Park", "Pu'uhonua o Honaunau National Historical Park, Hōnaunau, HI", 19.4224, -155.9094, 90, ["history", "parks", "beach"]],
    ["Kona coffee farm Greenwell", "81-6581 Mamalahoa Highway, Kealakekua, HI", 19.5112, -155.922, 75, ["food", "drinks", "history"]],
    ["Kealakekua Bay", "Kealakekua Bay, Nāpō‘opo‘o, HI", 19.4813, -155.9365, 150, ["water", "history", "scenic", "wildlife"]],
    ["Magic Sands Beach", "Magic Sands Beach, Kahaluʻu, HI", 19.5943, -155.9719, 120, ["beach", "water"]]
  ]},
  {"id": "hilo", "name": "Hilo", "region": "Hawaii", "country": "Hawaii, USA", "cc": "us", "aka": [], "area": "Hawaii, United States, HI", "tender": "varies", "left": false, "address": "Hilo cruise port, HI", "lat": 19.7074, "lon": -155.0816, "stops": [
    ["Hawaii Volcanoes National Park", "Hawaii Volcanoes National Park, Hawaiʻi County, HI", 19.2608, -155.3579, 300, ["parks", "hiking", "scenic", "camping"]],
    ["Rainbow Falls", "Rainbow Falls, Hilo, HI", 19.7195, -155.1096, 30, ["waterfalls", "scenic"]],
    ["Akaka Falls State Park", "Akaka Falls State Park, Hawaiʻi County, HI", 19.8547, -155.1536, 75, ["waterfalls", "hiking", "parks"]],
    ["Lyman Museum", "276 Haili Street, Hilo, HI", 19.7222, -155.0907, 60, ["history"]],
    ["Hilo Farmers Market", "20 Mamo Street, Hilo, HI", 19.7231, -155.0846, 75, ["markets", "food"]],
    ["Liliuokalani Gardens", "Liliuokalani Gardens, Hilo, HI", 19.7264, -155.0684, 45, ["gardens", "scenic"]],
    ["Mauna Loa Macadamia Nut Factory", "Mauna Loa Macadamia Nut Factory, Hawaiʻi County, HI", 19.6567, -155.0088, 45, ["food", "family"]]
  ]},
  {"id": "nawiliwili", "name": "Nawiliwili, Kauai", "region": "Hawaii", "country": "Hawaii, USA", "cc": "us", "aka": ["Kauai", "Lihue", "Nawiliwili"], "area": "Lihue, Hawaii, United States", "tender": "varies", "left": false, "address": "Nawiliwili cruise port, HI", "lat": 21.9548, "lon": -159.3558, "stops": [
    ["Waimea Canyon State Park", "Waimea Canyon State Park, Hawaii, HI", 22.0708, -159.6649, 180, ["scenic", "hiking", "parks"]],
    ["Wailua Falls", "Wailua Falls, Hawaii, HI", 22.0346, -159.3786, 30, ["waterfalls"]],
    ["Kalapaki Beach", "Kalapaki Beach, Lihue, HI", 21.9602, -159.3517, 120, ["beach"]],
    ["Fern Grotto", "Fern Grotto, Kapaa, HI", 22.038, -159.3584, 90, ["scenic", "gardens"]],
    ["Poipu Beach Park", "Poipu Beach Park, Poipu, HI", 21.8732, -159.4529, 150, ["beach", "wildlife"]],
    ["Spouting Horn", "Spouting Horn, Hawaii, HI", 21.8847, -159.4934, 30, ["scenic"]],
    ["Kilauea Point Lighthouse", "Kilauea Lighthouse, Hawaii, HI", 22.2317, -159.402, 75, ["lighthouses", "wildlife"]],
    ["Opaekaa Falls", "'Opaeka'a Falls, Hawaii, HI", 22.0482, -159.362, 20, ["waterfalls"]]
  ]},
  {"id": "victoria", "name": "Victoria, BC", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": ["Victoria British Columbia"], "area": "Capital Regional District, British Columbia, BC", "tender": "unknown", "left": false, "address": "Victoria cruise port, BC", "lat": 48.4283, "lon": -123.365, "stops": [
    ["Butchart Gardens", "Butchart Gardens, Central Saanich, BC", 48.5653, -123.4696, 150, ["gardens", "scenic", "lights"]],
    ["Royal BC Museum", "675 Belleville Street, Victoria, BC", 48.4197, -123.3679, 120, ["history", "art"]],
    ["Craigdarroch Castle", "1048 Joan Crescent, Victoria, BC", 48.4226, -123.3438, 75, ["history"]],
    ["Inner Harbour", "Inner Harbour, Victoria, BC", 48.4255, -123.3737, 60, ["town", "scenic", "music"]],
    ["Beacon Hill Park", "Beacon Hill Park, Victoria, BC", 48.4125, -123.3625, 75, ["parks", "gardens"]],
    ["Fisherman's Wharf", "Fisherman's Wharf, Victoria, BC", 48.4228, -123.3826, 60, ["food", "wildlife", "water"]]
  ]},
  {"id": "vancouver", "name": "Vancouver", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": [], "area": "Financial District, Downtown, Vancouver, Metro Vancouver Regional District, BC, British Columbia", "tender": "unknown", "left": false, "address": "Vancouver cruise port, BC", "lat": 49.2885, "lon": -123.1169, "stops": [
    ["Stanley Park", "Stanley Park, Vancouver, BC", 49.3021, -123.1413, 150, ["parks", "hiking", "scenic", "beach"]],
    ["Capilano Suspension Bridge", "Capilano Suspension Bridge, North Vancouver, BC", 49.3427, -123.116, 120, ["scenic", "hiking", "parks"]],
    ["Granville Island Public Market", "Granville Island Public Market, Vancouver, BC", 49.2707, -123.1343, 90, ["markets", "food", "art"]],
    ["Gastown", "Gastown, Vancouver, BC", 49.2837, -123.1062, 75, ["town", "history", "drinks"]],
    ["Vancouver Aquarium", "845 Avison Way, Vancouver, BC", 49.3005, -123.1312, 120, ["wildlife", "family"]],
    ["Grouse Mountain", "Grouse Mountain, District of North Vancouver, BC", 49.3795, -123.0768, 180, ["scenic", "hiking", "wildlife"]]
  ]},
  {"id": "halifax", "name": "Halifax", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": [], "area": "Halifax Regional Municipality, Halifax County, Nova Scotia, NS", "tender": "unknown", "left": false, "address": "Halifax cruise port, NS", "lat": 44.6486, "lon": -63.5859, "stops": [
    ["Halifax Citadel National Historic Site", "Halifax Citadel National Historic Site, Halifax, NS", 44.6484, -63.58, 90, ["history", "scenic"]],
    ["Halifax Waterfront Boardwalk", "Halifax Waterfront Boardwalk, Halifax, NS", 44.6523, -63.5744, 75, ["scenic", "town", "food"]],
    ["Peggy's Cove Lighthouse", "Peggy's Cove Lighthouse, Peggys Cove, NS", 44.4916, -63.919, 90, ["lighthouses", "scenic"]],
    ["Halifax Public Gardens", "Halifax Public Gardens, Halifax, NS", 44.6426, -63.582, 60, ["gardens"]],
    ["Maritime Museum of the Atlantic", "1675 Lower Water Street, Halifax, NS", 44.6476, -63.5709, 90, ["history"]],
    ["Pier 21 Canadian Museum of Immigration", "1055 Marginal Road, Halifax, NS", 44.6377, -63.5661, 75, ["history"]]
  ]},
  {"id": "bar-harbor", "name": "Bar Harbor", "region": "Canada and New England", "country": "Maine, USA", "cc": "us", "aka": ["Acadia"], "area": "Ells Pier, Bar Harbor, Hancock County, Maine, United States, ME", "tender": "tender", "left": false, "address": "Bar Harbor cruise port, ME", "lat": 44.3921, "lon": -68.2041, "stops": [
    ["Acadia National Park Cadillac Mountain", "Acadia National Park Cadillac Mountain, Bar Harbor, ME", 44.3524, -68.2258, 150, ["parks", "scenic", "hiking", "camping"]],
    ["Jordan Pond House", "2928 Park Loop Road, Bar Harbor, ME", 44.3206, -68.2535, 90, ["food", "scenic", "hiking"]],
    ["Bass Harbor Head Light", "Bass Harbor Head Light, Tremont, ME", 44.2225, -68.3379, 45, ["lighthouses", "scenic"]],
    ["Sand Beach", "Sand Beach, Bar Harbor, ME", 44.3292, -68.1823, 90, ["beach", "scenic"]],
    ["Thunder Hole", "1411 Park Loop Road, Bar Harbor, ME", 44.3214, -68.1895, 30, ["scenic"]],
    ["Abbe Museum", "26 Mount Desert Street, Bar Harbor, ME", 44.3869, -68.206, 60, ["history", "art"]],
    ["Bar Harbor Shore Path", "Bar Harbor Shore Path, Bar Harbor, ME", 44.3878, -68.1994, 60, ["scenic", "history"]]
  ]},
  {"id": "charlottetown", "name": "Charlottetown", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": ["Prince Edward Island", "PEI"], "area": "Queens County, Prince Edward Island, PE", "tender": "varies", "left": false, "address": "Charlottetown cruise port, PE", "lat": 46.2354, "lon": -63.1265, "stops": [
    ["Green Gables Heritage Place", "Green Gables, Cavendish, PE", 46.4887, -63.3821, 90, ["history", "family"]],
    ["Victoria Park", "Victoria Park, Charlottetown, PE", 46.2299, -63.141, 45, ["parks", "scenic"]],
    ["Cavendish Beach", "Cavendish Beach, Bayview, PE", 46.5042, -63.4408, 150, ["beach", "parks"]],
    ["Point Prim Lighthouse", "Point Prim Lighthouse, Rural Municipality of Belfast, PE", 46.0502, -63.039, 45, ["lighthouses"]],
    ["Confederation Centre of the Arts", "130 Queen Street, Charlottetown, PE", 46.2345, -63.1269, 60, ["art", "music"]],
    ["Beaconsfield Historic House", "2 Kent Street, Charlottetown, PE", 46.2319, -63.1335, 45, ["history"]]
  ]},
  {"id": "saint-john", "name": "Saint John, New Brunswick", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": ["Saint John NB"], "area": "Saint John County, New Brunswick, NB", "tender": "pier", "left": false, "address": "Saint John cruise port, NB", "lat": 45.2687, "lon": -66.062, "stops": [
    ["Reversing Falls", "Reversing Falls, Saint John, NB", 45.261, -66.0869, 45, ["scenic", "water"]],
    ["Fundy Trail Parkway", "Fundy Trail Parkway, Salmon River, NB", 45.4233, -65.4, 180, ["scenic", "hiking"]],
    ["Irving Nature Park", "Irving Nature Park, Saint John, NB", 45.2191, -66.1309, 90, ["parks", "hiking", "wildlife"]],
    ["Saint John City Market", "47 Charlotte Street, Saint John, NB", 45.2739, -66.0599, 45, ["markets", "food"]],
    ["New Brunswick Museum", "New Brunswick Museum, Saint John, NB", 45.269, -66.0822, 60, ["history", "art"]],
    ["St. Martins Sea Caves", "St. Martins Sea Caves, Village of Fundy-St. Martins, NB", 45.3571, -65.5231, 120, ["caves", "scenic"]]
  ]},
  {"id": "sydney-ns", "name": "Sydney, Nova Scotia", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": ["Cape Breton"], "area": "Cape Breton Regional Municipality, Cape Breton County, Nova Scotia, NS", "tender": "varies", "left": false, "address": "Sydney cruise port, NS", "lat": 46.1382, "lon": -60.1942, "stops": [
    ["Fortress of Louisbourg", "Fortress of Louisbourg, Fortress of Louisbourg National Historic Park, NS", 45.8919, -59.9828, 180, ["history"]],
    ["Alexander Graham Bell National Historic Site", "559 Chebucto Street, Baddeck, NS", 46.1035, -60.7451, 90, ["history"]],
    ["Membertou Heritage Park", "Membertou Heritage Park, Sydney, NS", 46.1216, -60.1937, 60, ["history"]],
    ["Cossit House Museum", "Cossit House Museum, Sydney, NS", 46.1434, -60.198, 30, ["history"]],
    ["Louisbourg Lighthouse", "Louisbourg Lighthouse, Louisbourg, NS", 45.9066, -59.9585, 45, ["lighthouses", "scenic"]],
    ["Highland Village Museum", "4119 Highway 223, Iona, NS", 45.9488, -60.8177, 90, ["history"]]
  ]},
  {"id": "quebec-city", "name": "Quebec City", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": ["Quebec"], "area": "Urban agglomeration of Québec, Capitale-Nationale, Quebec, QC", "tender": "unknown", "left": false, "address": "Quebec City cruise port, QC", "lat": 46.8137, "lon": -71.2084, "stops": [
    ["Château Frontenac", "Château Frontenac, Quebec, QC", 46.8113, -71.2051, 45, ["history"]],
    ["Montmorency Falls", "Montmorency Falls, Boischatel, QC", 46.8908, -71.1477, 90, ["waterfalls", "scenic"]],
    ["Plains of Abraham", "Plains of Abraham, Quebec, QC", 46.7977, -71.2288, 60, ["parks", "history"]],
    ["Île d'Orléans", "Île d'Orléans, Saint-Jean-de-l'Île-d'Orléans, QC", 46.9352, -70.9453, 150, ["food", "drinks", "scenic"]],
    ["Petit Champlain", "68 Rue du Petit-Champlain, Quebec, QC", 46.8116, -71.2036, 60, ["markets", "town"]],
    ["Basilica of Sainte-Anne-de-Beaupré", "10018 Avenue Royale, Sainte-Anne-de-Beaupré, QC", 47.0241, -70.9283, 60, ["history"]],
    ["Place Royale", "Place Royale, Quebec, QC", 46.8132, -71.2028, 30, ["history", "town"]]
  ]},
  {"id": "montreal", "name": "Montreal", "region": "Canada and New England", "country": "Canada", "cc": "ca", "aka": [], "area": "Urban agglomeration of Montreal, Montreal (administrative region), Quebec, QC", "tender": "unknown", "left": false, "address": "Montreal cruise port, QC", "lat": 45.5032, "lon": -73.5698, "stops": [
    ["Notre-Dame Basilica", "110 Rue Notre-Dame Ouest, Montreal, QC", 45.5044, -73.556, 60, ["history", "art"]],
    ["Old Montreal", "Old Montreal, Montreal, QC", 45.5022, -73.5554, 120, ["history", "town"]],
    ["Mount Royal Park", "Mount Royal Park, Montreal, QC", 45.5054, -73.5886, 90, ["parks", "hiking", "scenic"]],
    ["Jean-Talon Market", "7070 Avenue Henri-Julien, Montreal, QC", 45.5359, -73.6151, 75, ["markets", "food"]],
    ["Montreal Botanical Garden", "Montreal Botanical Garden, Montreal, QC", 45.5595, -73.5612, 120, ["gardens"]],
    ["Saint Joseph's Oratory", "3800 Queen-Mary Road, Montreal, QC", 45.4921, -73.6167, 60, ["history"]],
    ["Montreal Museum of Fine Arts", "1380 Rue Sherbrooke Ouest, Montreal, QC", 45.4987, -73.5794, 120, ["art"]]
  ]},
  {"id": "portland-maine", "name": "Portland, Maine", "region": "Canada and New England", "country": "Maine, USA", "cc": "us", "aka": ["Portland ME"], "area": "Cumberland County, Maine, United States", "tender": "unknown", "left": false, "address": "Portland cruise port, ME", "lat": 43.6574, "lon": -70.2587, "stops": [
    ["Portland Head Light", "Portland Head Light, Cape Elizabeth, ME", 43.6231, -70.2079, 60, ["lighthouses", "scenic"]],
    ["Old Port", "Old Port, Portland, ME", 43.656, -70.2536, 90, ["town", "food", "markets"]],
    ["Eastern Promenade", "Eastern Promenade, Portland, ME", 43.6686, -70.2424, 45, ["scenic", "parks"]],
    ["Portland Museum of Art", "7 High Street, Portland, ME", 43.6537, -70.262, 90, ["art"]],
    ["Victoria Mansion", "109 Danforth Street, Portland, ME", 43.6515, -70.2607, 60, ["history"]],
    ["Allagash Brewing Company", "100 Industrial Way, Portland, ME", 43.7031, -70.3175, 60, ["drinks"]],
    ["Two Lights State Park", "Two Lights State Park, Cape Elizabeth, ME", 43.5604, -70.2062, 60, ["parks", "lighthouses"]],
    ["Crescent Beach State Park", "Crescent Beach State Park, Cape Elizabeth, ME", 43.5625, -70.2348, 120, ["beach"]]
  ]},
  {"id": "newport-ri", "name": "Newport, Rhode Island", "region": "Canada and New England", "country": "Rhode Island, USA", "cc": "us", "aka": ["Newport RI"], "area": "Newport County, Rhode Island, United States", "tender": "tender", "left": false, "address": "Newport cruise port, RI", "lat": 41.49, "lon": -71.3138, "stops": [
    ["The Breakers", "44 Ochre Point Avenue, Newport, RI", 41.4697, -71.2982, 90, ["history"]],
    ["Cliff Walk", "Cliff Walk, Newport, RI", 41.4758, -71.2973, 90, ["scenic", "hiking"]],
    ["Fort Adams State Park", "Fort Adams State Park, Newport, RI", 41.4758, -71.3388, 75, ["history", "parks"]],
    ["Brenton Point State Park", "Brenton Point State Park, Newport, RI", 41.4519, -71.3541, 45, ["scenic", "parks"]],
    ["International Tennis Hall of Fame", "194 Bellevue Avenue, Newport, RI", 41.4828, -71.3083, 60, ["history"]],
    ["Marble House", "596 Bellevue Avenue, Newport, RI", 41.4621, -71.3057, 60, ["history"]],
    ["Bowen's Wharf", "Bowen's Wharf, Newport, RI", 41.4865, -71.3154, 60, ["town", "food"]]
  ]},
  {"id": "cartagena", "name": "Cartagena", "region": "Central and South America", "country": "Colombia", "cc": "co", "aka": [], "area": "Dique, Bolívar, RAP Caribe", "tender": "pier", "left": false, "address": "Cartagena cruise port, Colombia", "lat": 10.4045, "lon": -75.5317, "stops": [
    ["Castillo San Felipe de Barajas", "Castillo San Felipe de Barajas, Cartagena, Colombia", 10.4227, -75.5394, 75, ["history"]],
    ["Las Bóvedas", "Las Bovedas, Cartagena, Colombia", 10.43, -75.5465, 45, ["markets", "history"]],
    ["Palacio de la Inquisición", "Palacio de la Inquisión, Cartagena, Colombia", 10.4232, -75.5516, 45, ["history"]],
    ["Convento de la Popa", "La Popa, Cartagena, Colombia", 10.4199, -75.5261, 45, ["history", "scenic"]],
    ["Getsemaní", "Getsemaní, Cartagena, Colombia", 10.4208, -75.5467, 90, ["town", "art", "food"]],
    ["Torre del Reloj", "Puerta del Reloj, Cartagena, Colombia", 10.423, -75.5492, 20, ["history", "town"]],
    ["Playa Blanca", "Playa Blanca, Cartagena, Colombia", 10.2243, -75.6078, 240, ["beach"]],
    ["Plaza Santo Domingo", "Plaza de Santo Domingo, Cartagena, Colombia", 10.4243, -75.552, 30, ["town", "art"]]
  ]},
  {"id": "santa-marta", "name": "Santa Marta", "region": "Central and South America", "country": "Colombia", "cc": "co", "aka": [], "area": "Magdalena, RAP Caribe", "tender": "unknown", "left": false, "address": "Santa Marta cruise port, Colombia", "lat": 11.2321, "lon": -74.1951, "stops": [
    ["Quinta de San Pedro Alejandrino", "Quinta de San Pedro Alejandrino, Santa Marta, Colombia", 11.2281, -74.1777, 75, ["history", "gardens"]],
    ["Parque Nacional Natural Tayrona", "Parque Nacional Natural Tayrona, Santa Marta, Colombia", 11.3236, -74.0518, 240, ["parks", "beach", "hiking"]],
    ["Minca", "Minca, Colombia", 11.1428, -74.1169, 180, ["town", "waterfalls", "hiking"]],
    ["Taganga", "Taganga, Colombia", 11.2684, -74.1894, 90, ["town", "beach"]],
    ["Museo del Oro Tairona", "Museo del Oro, Santa Marta, Colombia", 11.2453, -74.2131, 45, ["history"]]
  ]},
  {"id": "colon", "name": "Colón, Panama", "region": "Central and South America", "country": "Panama", "cc": "pa", "aka": ["Colon", "Panama Canal"], "area": "Barrio Sur, Colón", "tender": "pier", "left": false, "address": "Colón cruise port, Panama", "lat": 9.3576, "lon": -79.891, "stops": [
    ["Agua Clara Visitor Center", "Agua Clara Visitor Center, Cristóbal, Panama", 9.2649, -79.9095, 75, ["history", "scenic"]],
    ["Fuerte San Lorenzo", "Fort San Lorenzo, Cristóbal, Panama", 9.3226, -80.0025, 75, ["history", "scenic"]],
    ["Portobelo", "Portobelo, Panama", 9.5538, -79.6549, 120, ["history", "town"]],
    ["Lago Gatún", "Gatún Lake, Colón, Panama", 9.1658, -79.9437, 150, ["water", "wildlife"]],
    ["Parque Nacional Soberanía", "Parque Nacional Soberanía, Colón, Panama", 9.1551, -79.7118, 120, ["parks", "hiking", "wildlife"]],
    ["Miraflores Locks", "Miraflores Locks, Ancón, Panama", 8.9971, -79.5911, 90, ["history"]]
  ]},
  {"id": "fuerte-amador", "name": "Panama City (Fuerte Amador)", "region": "Central and South America", "country": "Panama", "cc": "pa", "aka": ["Panama City", "Amador"], "area": "Isla Naos, Ancón, Distrito de Panamá, Panamá Province", "tender": "varies", "left": false, "address": "Panama City cruise port, Panama", "lat": 8.9161, "lon": -79.5202, "stops": [
    ["Casco Viejo", "San Felipe, Panama City, Panama", 8.9525, -79.5347, 120, ["history", "town", "food"]],
    ["Miraflores Locks", "Miraflores Locks, Arraiján, Panama", 8.9953, -79.5907, 90, ["history"]],
    ["Biomuseo", "Biomuseo, Ancón, Panama", 8.9319, -79.5448, 75, ["history", "art"]],
    ["Parque Natural Metropolitano", "Parque Natural Metropolitano, Ancón, Panama", 8.9854, -79.5467, 90, ["parks", "hiking", "wildlife"]],
    ["Mercado de Mariscos", "Mercado de Mariscos, Santa Ana, Panama", 8.9583, -79.539, 45, ["food", "markets"]]
  ]},
  {"id": "puerto-limon", "name": "Puerto Limón", "region": "Central and South America", "country": "Costa Rica", "cc": "cr", "aka": ["Limon"], "area": "Limón, Limón Province", "tender": "pier", "left": false, "address": "Puerto Limón cruise port, Costa Rica", "lat": 9.9887, "lon": -83.0238, "stops": [
    ["Parque Nacional Cahuita", "Parque Nacional Cahuita, Cahuita, Costa Rica", 9.7365, -82.8166, 150, ["parks", "beach", "wildlife", "hiking"]],
    ["Puerto Viejo de Talamanca", "256 Vía 256, Cahuita, Costa Rica", 9.6497, -82.7751, 120, ["town", "beach", "food"]],
    ["Veragua Rainforest", "Veragua Rainforest Eco-Adventure, Río Blanco, Costa Rica", 9.9258, -83.1911, 180, ["wildlife", "hiking", "family"]],
    ["Jaguar Rescue Center", "Jaguar Rescue Center, Cahuita, Costa Rica", 9.6421, -82.7232, 75, ["wildlife"]],
    ["Sloth Sanctuary of Costa Rica", "Sloth sanctuary, Valle La Estrella, Costa Rica", 9.7991, -82.9145, 75, ["wildlife"]],
    ["Playa Bonita", "Playa Bonita, Limón, Costa Rica", 10.0099, -83.0635, 120, ["beach"]],
    ["Parque Vargas", "Parque Balvanero Vargas, Limón, Costa Rica", 9.9927, -83.0252, 30, ["parks", "town"]]
  ]},
  {"id": "puntarenas", "name": "Puntarenas", "region": "Central and South America", "country": "Costa Rica", "cc": "cr", "aka": ["Puerto Caldera", "Caldera"], "area": "Puntarenas Province", "tender": "unknown", "left": false, "address": "Puntarenas cruise port, Costa Rica", "lat": 9.9773, "lon": -84.8346, "stops": [
    ["Parque Nacional Carara", "Parque Nacional Carara, Garabito, Costa Rica", 9.7193, -84.597, 120, ["parks", "wildlife", "hiking"]],
    ["Paseo de los Turistas", "Paseo de Los Turistas, Puntarenas, Costa Rica", 9.9753, -84.8496, 60, ["town", "beach", "food"]],
    ["Playa Herradura", "Herradura Beach, Jacó, Costa Rica", 9.6512, -84.6601, 120, ["beach"]],
    ["Jacó", "Jacó, Garabito, Costa Rica", 9.6156, -84.6281, 150, ["beach", "town"]],
    ["Catedral de Puntarenas", "Catedral del Sagrado Corazón de Jesús, Puntarenas, Costa Rica", 9.9777, -84.8349, 20, ["history"]],
    ["Isla San Lucas", "Isla San Lucas, Puntarenas, Costa Rica", 9.9425, -84.9082, 180, ["history", "wildlife"]]
  ]},
  {"id": "puerto-quetzal", "name": "Puerto Quetzal (Antigua Guatemala)", "region": "Central and South America", "country": "Guatemala", "cc": "gt", "aka": ["Antigua Guatemala", "Quetzal"], "area": "Empresa Portuaria Quetzal, Santa Rosa, San José, Escuintla", "tender": "unknown", "left": false, "address": "Puerto Quetzal cruise port, Guatemala", "lat": 13.9334, "lon": -90.7889, "stops": [
    ["Arco de Santa Catalina", "Arco de Santa Catalina, Antigua Guatemala, Guatemala", 14.5596, -90.7342, 30, ["history", "town"]],
    ["Volcán de Pacaya", "Pacaya, San Vicente Pacaya, Guatemala", 14.3891, -90.61, 240, ["hiking", "scenic"]],
    ["Autosafari Chapín", "Auto Safari Chapín, Guanagazapa, Guatemala", 14.0981, -90.6276, 150, ["wildlife", "family"]],
    ["Iglesia de San Francisco El Grande", "7a Calle del Hermano Pedro, Antigua Guatemala, Guatemala", 14.5539, -90.7296, 30, ["history"]]
  ]},
  {"id": "santo-tomas", "name": "Santo Tomás de Castilla", "region": "Central and South America", "country": "Guatemala", "cc": "gt", "aka": ["Puerto Barrios", "Santo Tomas"], "area": "Puerto Barrios, Izabal", "tender": "unknown", "left": false, "address": "Santo Tomás de Castilla cruise port, Guatemala", "lat": 15.6866, "lon": -88.6118, "stops": [
    ["Livingston", "Livingston, Guatemala", 15.827, -88.7508, 180, ["town", "water"]],
    ["Castillo de San Felipe de Lara", "Castillo de San Felipe de Lara, Livingston, Guatemala", 15.6371, -88.9941, 60, ["history"]],
    ["Quiriguá", "Quiriguá, Finca Quirigua D.M., Guatemala", 15.2711, -89.0403, 120, ["history"]],
    ["Siete Altares", "Siete Altares, Livingston, Guatemala", 15.854, -88.792, 120, ["waterfalls", "hiking"]],
    ["Río Dulce", "Río Dulce, Izabal, Guatemala", 15.7448, -88.8739, 240, ["water", "wildlife", "scenic"]],
    ["Punta de Palma", "Punta de Palma, Puerto Barrios, Guatemala", 15.7423, -88.6259, 120, ["beach"]]
  ]},
  {"id": "callao", "name": "Lima (Callao)", "region": "Central and South America", "country": "Peru", "cc": "pe", "aka": ["Lima", "Callao"], "area": "Lima Metropolitan Area, Callao", "tender": "unknown", "left": false, "address": "Lima cruise port, Peru", "lat": -12.0523, "lon": -77.1391, "stops": [
    ["Plaza Mayor de Lima", "Main Square of Lima, Lima, Peru", -12.0459, -77.0306, 60, ["history", "town"]],
    ["Huaca Pucllana", "Huaca Pucllana, Miraflores, Peru", -12.1115, -77.034, 60, ["history"]],
    ["Parque del Amor", "Love Park, Miraflores, Peru", -12.1267, -77.0365, 45, ["scenic", "town"]],
    ["Museo Larco", "Museo Larco, Pueblo Libre, Peru", -12.0729, -77.0712, 90, ["history", "art"]],
    ["Barranco", "Barranco, Peru", -12.144, -77.0203, 90, ["town", "art", "food"]],
    ["Pachacamac", "Complejo Santuario Arquelógico Pachacamac, Lurín, Peru", -12.2594, -76.901, 120, ["history"]],
    ["Fortaleza del Real Felipe", "Real Felipe Fortress, Callao, Peru", -12.0627, -77.1493, 45, ["history"]]
  ]},
  {"id": "valparaiso", "name": "Valparaíso (Santiago)", "region": "Central and South America", "country": "Chile", "cc": "cl", "aka": ["Valparaiso", "Santiago", "San Antonio Chile"], "area": "Provincia de Valparaíso, Valparaiso Region", "tender": "pier", "left": false, "address": "Valparaíso cruise port, Chile", "lat": -33.0435, "lon": -71.6127, "stops": [
    ["Cerro Concepción", "Cerro Concepción, Valparaíso, Chile", -33.0423, -71.6265, 90, ["town", "art", "scenic"]],
    ["La Sebastiana", "La Sebastiana, Valparaíso, Chile", -33.0538, -71.6226, 60, ["history", "art"]],
    ["Viña del Mar", "Viña del Mar, Chile", -33.0245, -71.5518, 120, ["beach", "town"]],
    ["Reloj de Flores", "Flower Clock, Viña del Mar, Chile", -33.0233, -71.5672, 20, ["gardens"]],
    ["Casa de Isla Negra", "Centro de Visitantes Casa de Neruda, El Quisco, Chile", -33.4427, -71.684, 75, ["history", "art"]],
    ["Viña Casas del Bosque", "Viña Casas del Bosque, Casablanca, Chile", -33.3188, -71.4355, 120, ["drinks"]]
  ]},
  {"id": "puerto-montt", "name": "Puerto Montt", "region": "Central and South America", "country": "Chile", "cc": "cl", "aka": ["Puerto Varas"], "area": "Provincia de Llanquihue, Los Lagos Region", "tender": "varies", "left": false, "address": "Puerto Montt cruise port, Chile", "lat": -41.4817, "lon": -72.9538, "stops": [
    ["Puerto Varas", "Puerto Varas, Chile", -41.3178, -72.9829, 120, ["town", "scenic", "food"]],
    ["Volcán Osorno", "Volcán Osorno, Puerto Varas, Chile", -41.122, -72.5228, 120, ["scenic", "hiking"]],
    ["Teatro del Lago", "1000 Avenida Bernardo Philippi, Frutillar, Chile", -41.1395, -73.0253, 60, ["music", "art"]],
    ["Feria Artesanal de Angelmó", "Feria Artesanal Angelmó, Puerto Montt, Chile", -41.4833, -72.9584, 60, ["markets", "food"]],
    ["Frutillar", "Frutillar, Chile", -41.1258, -73.0605, 120, ["town", "history"]],
    ["Parque Nacional Vicente Pérez Rosales", "Vicente Pérez Rosales National Park, Los Lagos Region, Chile", -41.0598, -72.169, 150, ["parks", "hiking"]]
  ]},
  {"id": "punta-arenas", "name": "Punta Arenas", "region": "Central and South America", "country": "Chile", "cc": "cl", "aka": [], "area": "Provincia de Magallanes, Magallanes and Chilean Antarctica Region", "tender": "pier", "left": false, "address": "Punta Arenas cruise port, Chile", "lat": -53.17, "lon": -70.9065, "stops": [
    ["Plaza Muñoz Gamero", "Plaza Benjamín Muñoz Gamero, Punta Arenas, Chile", -53.1627, -70.9071, 30, ["history", "town"]],
    ["Cementerio Municipal de Punta Arenas", "Cementerio Municipal Sara Braun, Punta Arenas, Chile", -53.153, -70.8976, 45, ["history"]],
    ["Museo Nao Victoria", "Nao Victoria Museum, Punta Arenas, Chile", -53.1075, -70.8795, 60, ["history"]],
    ["Fuerte Bulnes", "Fuerte Bulnes, Punta Arenas, Chile", -53.63, -70.9188, 90, ["history", "scenic"]],
    ["Seno Otway", "Seno Otway, Provincia de Magallanes, Chile", -53.0883, -71.6873, 180, ["wildlife"]],
    ["Museo Regional de Magallanes", "Museo Regional de Magallanes, Punta Arenas, Chile", -53.1621, -70.9061, 45, ["history"]],
    ["Cerro de la Cruz", "Cerro de la Cruz, Punta Arenas, Chile", -53.1601, -70.9158, 20, ["scenic"]]
  ]},
  {"id": "ushuaia", "name": "Ushuaia", "region": "Central and South America", "country": "Argentina", "cc": "ar", "aka": [], "area": "Departamento Ushuaia, Tierra del Fuego", "tender": "varies", "left": false, "address": "Ushuaia cruise port, Argentina", "lat": -54.8073, "lon": -68.3084, "stops": [
    ["Parque Nacional Tierra del Fuego", "Parque Nacional Tierra del Fuego, Ushuaia, Argentina", -54.8342, -68.4615, 180, ["parks", "hiking", "scenic"]],
    ["Tren del Fin del Mundo", "Tren del Fin del Mundo, Ushuaia, Argentina", -54.828, -68.4377, 150, ["scenic", "history"]],
    ["Glaciar Martial", "Glaciar Martial, Ushuaia, Argentina", -54.7989, -68.3702, 150, ["hiking", "scenic"]],
    ["Museo Marítimo y del Presidio de Ushuaia", "Museo Marítimo de Ushuaia, Ushuaia, Argentina", -54.8034, -68.2963, 90, ["history"]],
    ["Faro Les Éclaireurs", "Les Eclaireurs Lighthouse, Argentina", -54.8715, -68.0832, 180, ["lighthouses", "wildlife", "water"]],
    ["Laguna Esmeralda", "Laguna Esmeralda, Departamento Ushuaia, Argentina", -54.6923, -68.1288, 300, ["hiking", "scenic"]],
    ["Estancia Harberton", "Estancia Harberton, Departamento Ushuaia, Argentina", -54.8778, -67.3294, 180, ["history", "wildlife"]]
  ]},
  {"id": "puerto-madryn", "name": "Puerto Madryn", "region": "Central and South America", "country": "Argentina", "cc": "ar", "aka": [], "area": "Departamento Biedma, Chubut", "tender": "unknown", "left": false, "address": "Puerto Madryn cruise port, Argentina", "lat": -42.7673, "lon": -65.0366, "stops": [
    ["Península Valdés", "Valdes Peninsula, Chubut, Argentina", -42.4752, -64.1149, 300, ["wildlife", "scenic"]],
    ["Ecocentro", "3784 Julio Verne, Municipio de Puerto Madryn, Argentina", -42.7823, -64.9959, 60, ["wildlife", "art"]],
    ["Punta Loma", "Punta Loma, Municipio de Puerto Madryn, Argentina", -42.8126, -64.8998, 90, ["wildlife"]],
    ["Playa El Doradillo", "Playa El Doradillo, Municipio de Puerto Madryn, Argentina", -42.6551, -64.987, 90, ["wildlife", "beach"]],
    ["Museo Paleontológico Egidio Feruglio", "140 Avenida Fontana, Trelew, Argentina", -43.2492, -65.3069, 90, ["history", "family"]],
    ["Gaiman", "Gaiman, Argentina", -43.2915, -65.4983, 120, ["town", "food", "history"]]
  ]},
  {"id": "buenos-aires", "name": "Buenos Aires", "region": "Central and South America", "country": "Argentina", "cc": "ar", "aka": [], "area": "Autonomous City of Buenos Aires", "tender": "pier", "left": false, "address": "Buenos Aires cruise port, Argentina", "lat": -34.5828, "lon": -58.37, "stops": [
    ["Plaza de Mayo", "Plaza de Mayo, Buenos Aires, Argentina", -34.6084, -58.3722, 45, ["history"]],
    ["Casa Rosada", "50 Balcarce, Buenos Aires, Argentina", -34.6081, -58.3703, 45, ["history"]],
    ["Caminito", "Caminito, Buenos Aires, Argentina", -34.6394, -58.3626, 90, ["art", "town", "music"]],
    ["Cementerio de la Recoleta", "Recoleta Cemetry, Buenos Aires, Argentina", -34.5877, -58.3936, 75, ["history", "art"]],
    ["Teatro Colón", "628 Cerrito, Buenos Aires, Argentina", -34.6011, -58.3832, 60, ["music", "art", "history"]],
    ["Mercado de San Telmo", "963 Defensa, Buenos Aires, Argentina", -34.619, -58.3725, 75, ["markets", "food"]],
    ["Puerto Madero", "Puerto Madero, Buenos Aires, Argentina", -34.6104, -58.3622, 60, ["town", "food"]],
    ["El Ateneo Grand Splendid", "1860 Avenida Santa Fe, Buenos Aires, Argentina", -34.596, -58.3943, 30, ["art"]]
  ]},
  {"id": "montevideo", "name": "Montevideo", "region": "Central and South America", "country": "Uruguay", "cc": "uy", "aka": [], "area": "", "tender": "pier", "left": false, "address": "Montevideo cruise port, Uruguay", "lat": -34.9022, "lon": -56.2129, "stops": [
    ["Mercado del Puerto", "Mercado del Puerto, Montevideo, Uruguay", -34.9056, -56.2117, 75, ["food", "markets"]],
    ["Teatro Solís", "Teatro Solís, Montevideo, Uruguay", -34.9079, -56.201, 45, ["music", "history"]],
    ["Plaza Independencia", "Plaza Independencia, Montevideo, Uruguay", -34.9065, -56.1998, 30, ["history"]],
    ["Palacio Salvo", "Palacio Salvo, Montevideo, Uruguay", -34.9068, -56.1984, 30, ["history"]],
    ["Playa Pocitos", "Pocitos Beach, Montevideo, Uruguay", -34.9146, -56.1477, 120, ["beach"]],
    ["Bodega Bouza", "Bodega Bouza, Montevideo, Uruguay", -34.7908, -56.2771, 120, ["drinks", "food"]],
    ["Palacio Legislativo", "Palacio Legislativo, Montevideo, Uruguay", -34.8912, -56.1872, 45, ["history"]]
  ]},
  {"id": "punta-del-este", "name": "Punta del Este", "region": "Central and South America", "country": "Uruguay", "cc": "uy", "aka": [], "area": "Maldonado", "tender": "tender", "left": false, "address": "Punta del Este cruise port, Uruguay", "lat": -34.9632, "lon": -54.944, "stops": [
    ["La Mano", "The Hand, Punta Del Este, Uruguay", -34.9579, -54.9373, 20, ["art"]],
    ["Casapueblo", "Museo – Taller de Casapueblo, Punta Ballena, Uruguay", -34.9088, -55.0446, 90, ["art", "scenic"]],
    ["Faro de José Ignacio", "Faro de José Ignacio, José Ignacio, Uruguay", -34.8463, -54.6328, 90, ["lighthouses", "town"]],
    ["Faro de Punta del Este", "Faro de Punta del Este, Punta Del Este, Uruguay", -34.9689, -54.9516, 30, ["lighthouses"]],
    ["Arboretum Lussich", "Arboretum Lussich, Maldonado, Uruguay", -34.8703, -55.0288, 75, ["gardens"]],
    ["Isla Gorriti", "Isla Gorriti, Uruguay", -34.9546, -54.9716, 180, ["beach", "history"]]
  ]},
  {"id": "rio-de-janeiro", "name": "Rio de Janeiro", "region": "Central and South America", "country": "Brazil", "cc": "br", "aka": ["Rio"], "area": "Southeast Region", "tender": "pier", "left": false, "address": "Rio de Janeiro cruise port, Brazil", "lat": -22.8937, "lon": -43.1874, "stops": [
    ["Cristo Redentor", "Christ the Redeemer, Rio de Janeiro, Brazil", -22.9519, -43.2105, 150, ["history", "scenic"]],
    ["Praia de Copacabana", "Copacabana Beach, Rio de Janeiro, Brazil", -22.9757, -43.1866, 150, ["beach"]],
    ["Praia de Ipanema", "Praia de Ipanema, Rio de Janeiro, Brazil", -22.9873, -43.2021, 150, ["beach"]],
    ["Escadaria Selarón", "Escadaria Selarón, Rio de Janeiro, Brazil", -22.9154, -43.1795, 30, ["art"]],
    ["Jardim Botânico do Rio de Janeiro", "Rio de Janeiro Botanical Garden, Rio de Janeiro, Brazil", -22.9679, -43.2251, 90, ["gardens"]],
    ["Museu do Amanhã", "1 Praça Mauá, Rio de Janeiro, Brazil", -22.8941, -43.1794, 90, ["art", "history"]],
    ["Parque Nacional da Tijuca", "Tijuca National Park, Rio de Janeiro, Brazil", -22.9606, -43.2506, 150, ["parks", "hiking", "waterfalls"]]
  ]},
  {"id": "barcelona", "name": "Barcelona", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": [], "area": "Barcelonès, Barcelona, Catalonia", "tender": "unknown", "left": false, "address": "Barcelona cruise port, Spain", "lat": 41.3826, "lon": 2.1771, "stops": [
    ["Sagrada Família", "Sagrada Família, Barcelona, Spain", 41.404, 2.1751, 90, ["history", "art"]],
    ["Park Güell", "Park Güell, Barcelona, Spain", 41.4139, 2.1526, 90, ["art", "gardens", "scenic"]],
    ["La Rambla", "La Rambla, Barcelona, Spain", 41.3804, 2.1738, 60, ["town", "markets"]],
    ["Mercat de la Boqueria", "91 La Rambla, Barcelona, Spain", 41.3817, 2.1716, 45, ["food", "markets"]],
    ["Casa Batlló", "43 Passeig de Gràcia (lateral Llobregat), Barcelona, Spain", 41.3915, 2.1647, 60, ["art", "history"]],
    ["Montjuïc Castle", "Montjuïc Castle, Barcelona, Spain", 41.3634, 2.1661, 75, ["history", "scenic"]],
    ["Barceloneta Beach", "Platja de la Barceloneta, Barcelona, Spain", 41.3793, 2.193, 120, ["beach"]],
    ["Museu Picasso", "Picasso Museum, Barcelona, Spain", 41.3851, 2.1812, 90, ["art"]],
    ["Montserrat Abbey", "Monestir de Montserrat, Monistrol de Montserrat, Spain", 41.5942, 1.8396, 240, ["history", "scenic", "hiking"]]
  ]},
  {"id": "civitavecchia", "name": "Civitavecchia (Rome)", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": ["Rome", "Roma"], "area": "Roma Capitale, Lazio", "tender": "pier", "left": false, "address": "Civitavecchia cruise port, Italy", "lat": 42.0959, "lon": 11.7887, "stops": [
    ["Colosseum", "Colosseum, Rome, Italy", 41.8909, 12.4919, 120, ["history"]],
    ["Roman Forum", "Roman Forum, Rome, Italy", 41.8916, 12.4867, 90, ["history"]],
    ["Vatican Museums", "Vatican Museums, Vatican City", 41.9062, 12.4527, 180, ["art", "history"]],
    ["St. Peter's Basilica", "Saint Peter's Basilica, Vatican City", 41.9022, 12.4537, 90, ["history", "art"]],
    ["Trevi Fountain", "Trevi Fountain, Rome, Italy", 41.901, 12.4833, 30, ["art", "town"]],
    ["Pantheon", "Pantheon, Rome, Italy", 41.8986, 12.4768, 45, ["history"]],
    ["Necropolis of Tarquinia", "Necropoli dei Monterozzi, Tarquinia, Italy", 42.2497, 11.7699, 90, ["history"]],
    ["Forte Michelangelo", "Forte Michelangelo, Civitavecchia, Italy", 42.0903, 11.7914, 30, ["history"]]
  ]},
  {"id": "naples", "name": "Naples", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": ["Napoli", "Pompeii", "Sorrento"], "area": "Campania", "tender": "varies", "left": false, "address": "Naples cruise port, Italy", "lat": 40.8382, "lon": 14.2602, "stops": [
    ["Pompeii Archaeological Park", "Archaeological Park of Pompeii - Ticket Office Piazza Esedra, Pompei, Italy", 40.7474, 14.4852, 180, ["history"]],
    ["Herculaneum", "Herculaneum, Ercolano, Italy", 40.8054, 14.3471, 120, ["history"]],
    ["Mount Vesuvius", "Mount Vesuvius, Trecase, Italy", 40.8214, 14.4262, 150, ["scenic", "hiking"]],
    ["National Archaeological Museum of Naples", "19 Piazza Museo Nazionale, Naples, Italy", 40.8536, 14.2512, 120, ["history", "art"]],
    ["Castel Nuovo", "Castel Nuovo, Naples, Italy", 40.8383, 14.2537, 45, ["history"]],
    ["Sorrento", "Sorrento, Italy", 40.6249, 14.3748, 150, ["town", "scenic"]],
    ["Royal Palace of Naples", "Royal Palace of Naples, Naples, Italy", 40.8365, 14.2503, 60, ["history"]]
  ]},
  {"id": "livorno", "name": "Livorno (Florence and Pisa)", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": ["Florence", "Firenze", "Pisa"], "area": "Tuscany", "tender": "unknown", "left": false, "address": "Livorno cruise port, Italy", "lat": 43.5507, "lon": 10.3091, "stops": [
    ["Leaning Tower of Pisa", "Leaning Tower of Pisa, Pisa, Italy", 43.723, 10.3966, 90, ["history"]],
    ["Florence Cathedral", "Santa Maria del Fiore, Florence, Italy", 43.7731, 11.2566, 90, ["history", "art"]],
    ["Uffizi Gallery", "Galleria degli Uffizi, Florence, Italy", 43.7683, 11.2558, 150, ["art"]],
    ["Ponte Vecchio", "Ponte Vecchio, Florence, Italy", 43.768, 11.2531, 30, ["history", "town"]],
    ["Walls of Lucca", "Mura di Lucca, Lucca, Italy", 43.8413, 10.5125, 120, ["history", "town"]],
    ["Terrazza Mascagni", "Terrazza Mascagni, Livorno, Italy", 43.5345, 10.3, 30, ["scenic"]],
    ["Fortezza Vecchia", "Fortezza Vecchia, Livorno, Italy", 43.5521, 10.3029, 30, ["history"]],
    ["Galleria dell'Accademia", "58/60 Via Ricasoli, Florence, Italy", 43.7769, 11.2588, 90, ["art"]]
  ]},
  {"id": "la-spezia", "name": "La Spezia (Cinque Terre)", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": ["Cinque Terre"], "area": "Liguria", "tender": "varies", "left": false, "address": "La Spezia cruise port, Italy", "lat": 44.2384, "lon": 9.6912, "stops": [
    ["Vernazza", "Vernazza, Italy", 44.1349, 9.6828, 120, ["town", "scenic", "hiking"]],
    ["Manarola", "Manarola, Italy", 44.1063, 9.7275, 90, ["town", "scenic"]],
    ["Riomaggiore", "Riomaggiore, Italy", 44.099, 9.7387, 90, ["town", "scenic"]],
    ["Portovenere", "Portovenere, Italy", 44.0507, 9.8345, 120, ["town", "history", "scenic"]],
    ["Castello San Giorgio", "Castello San Giorgio, La Spezia, Italy", 44.1065, 9.8216, 45, ["history"]],
    ["Lerici", "Lerici, Italy", 44.0736, 9.9099, 90, ["town"]],
    ["Monterosso al Mare", "Monterosso al Mare, Italy", 44.1465, 9.6556, 150, ["beach", "town"]]
  ]},
  {"id": "genoa", "name": "Genoa", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": ["Genova", "Portofino"], "area": "Liguria", "tender": "pier", "left": false, "address": "Genoa cruise port, Italy", "lat": 44.414, "lon": 8.9192, "stops": [
    ["Aquarium of Genoa", "Aquarium of Genoa, Genoa, Italy", 44.4101, 8.9263, 150, ["wildlife", "family"]],
    ["Palazzo Ducale", "Palazzo Ducale, Genoa, Italy", 44.4075, 8.9333, 60, ["history", "art"]],
    ["Via Garibaldi", "Via Giuseppe Garibaldi, Genoa, Italy", 44.4113, 8.9323, 75, ["history", "art"]],
    ["Boccadasse", "Boccadasse, Genoa, Italy", 44.3898, 8.9748, 60, ["town", "scenic"]],
    ["Portofino", "Portofino, Italy", 44.3033, 9.2096, 150, ["town", "scenic"]],
    ["Genoa Cathedral", "Cattedrale di San Lorenzo, Genoa, Italy", 44.4076, 8.9314, 30, ["history"]],
    ["Spianata Castelletto", "Spianata di Castelletto, Genoa, Italy", 44.4135, 8.9329, 20, ["scenic"]],
    ["Camogli", "Camogli, Italy", 44.3511, 9.1525, 90, ["town"]]
  ]},
  {"id": "trieste", "name": "Trieste", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": [], "area": "Friuli – Venezia Giulia", "tender": "pier", "left": false, "address": "Trieste cruise port, Italy", "lat": 45.65, "lon": 13.7637, "stops": [
    ["Piazza Unità d'Italia", "Piazza Unità d'Italia, Trieste, Italy", 45.6501, 13.7677, 30, ["town", "history"]],
    ["Miramare Castle", "Miramare Castle, Trieste, Italy", 45.7025, 13.7125, 90, ["history", "gardens"]],
    ["Grotta Gigante", "Grotta Gigante / Briškovska jama, Borgo Grotta Gigante / Briščiki, Italy", 45.7087, 13.7652, 75, ["caves"]],
    ["Cathedral of San Giusto", "2 Piazza della Cattedrale, Trieste, Italy", 45.6465, 13.7725, 30, ["history"]],
    ["Castello di San Giusto", "Castello di San Giusto, Trieste, Italy", 45.6469, 13.7742, 45, ["history", "scenic"]],
    ["Piran", "Piran / Pirano, Slovenia", 45.5285, 13.5684, 150, ["town", "scenic"]]
  ]},
  {"id": "ravenna", "name": "Ravenna", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": [], "area": "Emilia-Romagna", "tender": "unknown", "left": false, "address": "Ravenna cruise port, Italy", "lat": 44.3641, "lon": 12.059, "stops": [
    ["Basilica of San Vitale", "Basilica di San Vitale, Ravenna, Italy", 44.4206, 12.1963, 45, ["history", "art"]],
    ["Mausoleum of Galla Placidia", "Mausoleum of Galla Placidia, Ravenna, Italy", 44.421, 12.1971, 30, ["history", "art"]],
    ["Tomb of Dante", "Tomba di Dante, Ravenna, Italy", 44.4162, 12.2009, 20, ["history"]],
    ["Basilica of Sant'Apollinare in Classe", "224 Via Romea Sud, Ravenna, Italy", 44.3803, 12.233, 45, ["history", "art"]],
    ["Basilica of Sant'Apollinare Nuovo", "Basilica di Sant'Apollinare Nuovo, Ravenna, Italy", 44.4168, 12.2048, 30, ["history", "art"]],
    ["Mirabilandia", "Mirabilandia, Ravenna, Italy", 44.3372, 12.2632, 300, ["themeparks", "family"]]
  ]},
  {"id": "messina", "name": "Messina (Taormina)", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": ["Taormina"], "area": "Sicily", "tender": "pier", "left": false, "address": "Messina cruise port, Sicily, Italy", "lat": 38.1935, "lon": 15.5577, "stops": [
    ["Ancient Theatre of Taormina", "1 Via Teatro Greco, Taormina, Italy", 37.8524, 15.2923, 120, ["history", "scenic"]],
    ["Rifugio Sapienza", "Rifugio Sapienza, Nicolosi, Italy", 37.7002, 14.9982, 240, ["scenic", "hiking"]],
    ["Messina Cathedral", "Cathedral of Messina, Messina, Italy", 38.1922, 15.5553, 45, ["history"]],
    ["Isola Bella", "Isola Bella, Taormina, Italy", 37.8503, 15.3007, 90, ["beach", "scenic"]],
    ["Castelmola", "Castelmola, Italy", 37.8583, 15.2773, 60, ["town", "scenic"]],
    ["Gole dell'Alcantara", "Gole dell'Alcantara, Castiglione di Sicilia, Italy", 37.8796, 15.1741, 120, ["water", "scenic", "hiking"]]
  ]},
  {"id": "palermo", "name": "Palermo", "region": "Mediterranean and Atlantic islands", "country": "Italy", "cc": "it", "aka": [], "area": "Sicily", "tender": "pier", "left": false, "address": "Palermo cruise port, Sicily, Italy", "lat": 38.127, "lon": 13.3663, "stops": [
    ["Palermo Cathedral", "Palermo Cathedral, Palermo, Italy", 38.1143, 13.356, 45, ["history"]],
    ["Cappella Palatina", "Palatine Chapel, Palermo, Italy", 38.1109, 13.3535, 60, ["history", "art"]],
    ["Monreale Cathedral", "Monreale Cathedral, Monreale, Italy", 38.082, 13.2923, 75, ["history", "art"]],
    ["Quattro Canti", "Quattro Canti, Palermo, Italy", 38.1157, 13.3615, 20, ["town", "history"]],
    ["Ballarò", "Piazza Ballarò, Palermo, Italy", 38.1116, 13.3611, 60, ["markets", "food"]],
    ["Mondello", "Mondello, Palermo, Italy", 38.2015, 13.3273, 150, ["beach"]],
    ["Teatro Massimo", "Teatro Massimo Vittorio Emanuele, Palermo, Italy", 38.1202, 13.3572, 45, ["music", "history"]],
    ["Cefalù", "Cefalù, Italy", 38.035, 14.0245, 150, ["town", "beach", "history"]]
  ]},
  {"id": "valletta", "name": "Valletta, Malta", "region": "Mediterranean and Atlantic islands", "country": "Malta", "cc": "mt", "aka": ["Malta", "Valletta"], "area": "Port Region", "tender": "pier", "left": true, "address": "Valletta cruise port, Malta", "lat": 35.8919, "lon": 14.5101, "stops": [
    ["St. John's Co-Cathedral", "Saint John's Co-Cathedral, Valletta, Malta", 35.8977, 14.5126, 75, ["history", "art"]],
    ["Upper Barrakka Gardens", "Upper Barrakka Gardens, Valletta, Malta", 35.895, 14.512, 30, ["gardens", "scenic"]],
    ["Mdina", "Mdina, Malta", 35.8859, 14.4027, 120, ["history", "town"]],
    ["Ħal Saflieni Hypogeum", "Ħal Saflieni Hypogeum, Paola, Malta", 35.8695, 14.5069, 60, ["history"]],
    ["Blue Grotto", "Blue Grotto, Qrendi, Malta", 35.8213, 14.4565, 90, ["water", "scenic"]],
    ["Marsaxlokk", "Marsaxlokk, Malta", 35.8418, 14.5448, 90, ["markets", "food", "town"]],
    ["Fort St. Elmo", "Fort Saint Elmo, Valletta, Malta", 35.902, 14.5188, 60, ["history"]],
    ["Ħaġar Qim", "Ħaġar Qim, Qrendi, Malta", 35.8272, 14.4435, 75, ["history"]]
  ]},
  {"id": "piraeus", "name": "Piraeus (Athens)", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Athens"], "area": "Municipality of Piraeus, Regional Unit of Piraeus, Attica", "tender": "pier", "left": false, "address": "Piraeus cruise port, Greece", "lat": 37.9377, "lon": 23.6363, "stops": [
    ["Acropolis of Athens", "Acropolis, Athens, Greece", 37.9717, 23.7263, 150, ["history"]],
    ["Acropolis Museum", "Acropolis Museum, Athens, Greece", 37.9685, 23.7285, 90, ["history", "art"]],
    ["Plaka", "Plaka, Athens, Greece", 37.9729, 23.7301, 90, ["town", "food", "markets"]],
    ["Ancient Agora of Athens", "Ancient Agora of Athens, Athens, Greece", 37.9747, 23.7225, 75, ["history"]],
    ["Temple of Poseidon", "Temple of Poseidon, Lavreotiki Municipal Unit, Greece", 37.6503, 24.0246, 150, ["history", "scenic"]],
    ["National Archaeological Museum", "National Archaeological Museum, Athens, Greece", 37.989, 23.733, 120, ["history", "art"]],
    ["Panathenaic Stadium", "Panathenaic Stadium, Athens, Greece", 37.9684, 23.7409, 45, ["history"]],
    ["Mount Lycabettus", "Lycabettus, Athens, Greece", 37.9819, 23.7432, 60, ["scenic", "hiking"]]
  ]},
  {"id": "santorini", "name": "Santorini (Fira)", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Santorini", "Thira", "Fira"], "area": "Thira Municipal Unit, Municipality of Thira, Thira Regional Unit, South Aegean, Aegean", "tender": "tender", "left": false, "address": "Santorini cruise port, Greece", "lat": 36.4149, "lon": 25.4325, "stops": [
    ["Oia", "Oia, Ia Municipal Unit, Greece", 36.4622, 25.3757, 120, ["town", "scenic"]],
    ["Akrotiri", "Akrotiri, Thira Municipal Unit, Greece", 36.3581, 25.3964, 75, ["history"]],
    ["Red Beach", "Red Beach, Thira Municipal Unit, Greece", 36.3488, 25.3941, 60, ["beach", "scenic"]],
    ["Santo Wines", "Santo Wines, Thira Municipal Unit, Greece", 36.3876, 25.4365, 60, ["drinks", "scenic"]],
    ["Pyrgos Kallistis", "Pyrgos Kallistis, Thira Municipal Unit, Greece", 36.3826, 25.4502, 60, ["town"]],
    ["Kamari Beach", "Kamari Beach, Thira Municipal Unit, Greece", 36.3768, 25.4861, 120, ["beach"]],
    ["Ancient Thera", "Ancient Thera, Thira Municipal Unit, Greece", 36.3636, 25.4782, 90, ["history", "hiking"]]
  ]},
  {"id": "mykonos", "name": "Mykonos", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": [], "area": "Municipality of Mykonos, Mykonos Regional Unit, South Aegean, Aegean", "tender": "varies", "left": false, "address": "Mykonos cruise port, Greece", "lat": 37.4655, "lon": 25.3229, "stops": [
    ["Little Venice", "Little Venice, Mykonos, Greece", 37.4459, 25.3264, 60, ["town", "scenic"]],
    ["Kato Mili", "Windmills, Mykonos, Greece", 37.4446, 25.3257, 30, ["history", "scenic"]],
    ["Paradise Beach", "Paradise Beach, Plintri, Greece", 37.4101, 25.3557, 150, ["beach"]],
    ["Panagia Paraportiani", "Panagia Paraportiani, Mykonos, Greece", 37.4471, 25.3257, 20, ["history"]],
    ["Ornos Beach", "Ornos, Greece", 37.4224, 25.3219, 150, ["beach"]],
    ["Armenistis Lighthouse", "Armenistis Lighthouse, Faros Armenistis, Greece", 37.4897, 25.3146, 45, ["lighthouses", "scenic"]],
    ["Delos", "Delos, Mykonos, Greece", 37.3997, 25.2683, 240, ["history"]]
  ]},
  {"id": "corfu", "name": "Corfu", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Kerkyra"], "area": "Municipality of Central Corfu and Diapontia Islands, Corfu Regional Unit, Ioanian Islands, Peloponnese, Western Greece and the Ionian", "tender": "varies", "left": false, "address": "Corfu cruise port, Greece", "lat": 39.6291, "lon": 19.9011, "stops": [
    ["Achilleion", "Achilleion Palace, Gastouri, Greece", 39.5628, 19.9042, 75, ["history", "gardens"]],
    ["Old Fortress of Corfu", "Old Fortress, Corfu, Greece", 39.6234, 19.9295, 60, ["history"]],
    ["Paleokastritsa", "Palaiokastritsa, Greece", 39.6758, 19.7119, 150, ["beach", "scenic"]],
    ["Liston", "Liston Buildings, Corfu, Greece", 39.624, 19.9236, 60, ["town", "food"]],
    ["Pontikonisi", "Pontikonisi, Corfu, Greece", 39.5864, 19.9179, 45, ["scenic"]],
    ["Mon Repos", "Mon Repos Park, Corfu, Greece", 39.607, 19.9238, 60, ["history", "gardens"]],
    ["New Fortress of Corfu", "New Fortress, Corfu, Greece", 39.6249, 19.9169, 45, ["history"]]
  ]},
  {"id": "katakolon", "name": "Katakolon (Olympia)", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Olympia", "Katakolo"], "area": "Municipality of Pyrgos, Elis Regional Unit, Western Greece, Peloponnese, Western Greece and the Ionian", "tender": "varies", "left": false, "address": "Katakolon cruise port, Greece", "lat": 37.6448, "lon": 21.3245, "stops": [
    ["Archaeological Site of Olympia", "Archaeological Site of Olympia, Archea Olympia, Greece", 37.641, 21.6349, 150, ["history"]],
    ["Museum of Ancient Greek Technology", "Museum of Ancient Greek Technology, Pyrgos, Greece", 37.648, 21.3158, 45, ["history"]],
    ["Mercouri Estate", "Mercouri Estate Winery, Pyrgos, Greece", 37.6768, 21.3098, 75, ["drinks"]],
    ["Agios Andreas Beach", "Agios Andreas, Pyrgos, Greece", 37.665, 21.3097, 120, ["beach"]]
  ]},
  {"id": "rhodes", "name": "Rhodes", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Rodos"], "area": "Municipal Unit of Rhodes, Municipality of Rhodes, Rhodes Regional Unit, South Aegean, Aegean", "tender": "pier", "left": false, "address": "Rhodes cruise port, Greece", "lat": 36.4451, "lon": 28.2333, "stops": [
    ["Palace of the Grand Master of the Knights of Rhodes", "Palace of the Grand Master of the Knights of Rhodes, Rhodes, Greece", 36.4455, 28.2242, 75, ["history"]],
    ["Street of the Knights", "Street of the Knights, Rhodes, Greece", 36.445, 28.2259, 45, ["history", "town"]],
    ["Acropolis of Lindos", "Lindos Acropolis, Lindos, Greece", 36.0912, 28.0885, 150, ["history", "scenic"]],
    ["Valley of the Butterflies", "Petaloudes (Valley of the Butterflies), Rhodes, Greece", 36.3388, 28.0603, 90, ["wildlife", "hiking"]],
    ["Anthony Quinn Bay", "Anthony Quinn Bay, Rhodes, Greece", 36.3224, 28.2102, 120, ["beach"]],
    ["Kallithea Springs", "Kallithea Springs, Rhodes, Greece", 36.3783, 28.2387, 90, ["spa", "beach"]]
  ]},
  {"id": "heraklion", "name": "Heraklion, Crete", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Iraklio"], "area": "Heraklion Municipal Unit, Municipality of Heraklion, Heraklion Regional Unit, Region of Crete", "tender": "pier", "left": false, "address": "Heraklion cruise port, Crete, Greece", "lat": 35.3461, "lon": 25.1505, "stops": [
    ["Knossos", "Knossos, Heraklion Municipal Unit, Greece", 35.2986, 25.16, 120, ["history"]],
    ["Heraklion Archaeological Museum", "Heraklion Archaeological Museum, Heraklion, Greece", 35.3391, 25.1374, 90, ["history"]],
    ["Koules Fortress", "Koules, Heraklion Municipal Unit, Greece", 35.3446, 25.1369, 45, ["history"]],
    ["Morosini Fountain", "Morosini Fountain, Heraklion Municipal Unit, Greece", 35.3392, 25.1332, 15, ["town"]],
    ["Cretaquarium", "Cretaquarium, Gouves Municipal Unit, Greece", 35.3323, 25.2825, 120, ["wildlife", "family"]],
    ["Spinalonga", "Spinalonga, Agios Nikolaos Municipal Unit, Greece", 35.2978, 25.738, 180, ["history"]]
  ]},
  {"id": "chania", "name": "Chania (Souda Bay), Crete", "region": "Mediterranean and Atlantic islands", "country": "Greece", "cc": "gr", "aka": ["Souda", "Chania"], "area": "Municipality of Chania, Chania Regional Unit, Region of Crete", "tender": "pier", "left": false, "address": "Chania cruise port, Crete, Greece", "lat": 35.4922, "lon": 24.0697, "stops": [
    ["Chania Lighthouse", "Venetian Lighthouse, Chania, Greece", 35.5195, 24.0167, 30, ["lighthouses"]],
    ["Balos Lagoon", "Balos, Chania Regional Unit, Greece", 35.5814, 23.589, 240, ["beach", "scenic"]],
    ["Samaria Gorge", "Samaria Gorge, Sfakia, Greece", 35.2913, 23.9585, 360, ["hiking", "parks"]],
    ["Agia Triada Monastery", "Agia Triada Monastery, Stavros, Greece", 35.5607, 24.1352, 45, ["history"]],
    ["Chania Municipal Market", "Municipal Market of Chania, Chania, Greece", 35.5145, 24.0203, 45, ["markets", "food"]]
  ]},
  {"id": "kusadasi", "name": "Kuşadası (Ephesus)", "region": "Mediterranean and Atlantic islands", "country": "Turkey", "cc": "tr", "aka": ["Kusadasi", "Ephesus"], "area": "Aydın, Aegean Region", "tender": "pier", "left": false, "address": "Kuşadası cruise port, Turkey", "lat": 37.8627, "lon": 27.2559, "stops": [
    ["Ephesus", "Ephesus, Selçuk, Turkey", 37.9404, 27.3393, 180, ["history"]],
    ["House of the Virgin Mary", "House of the Virgin Mary, Selçuk, Turkey", 37.9116, 27.334, 60, ["history"]],
    ["Basilica of St. John", "Basilica of St. John, Selçuk, Turkey", 37.9525, 27.3676, 45, ["history"]],
    ["Şirince", "Şirince Mahallesi, Selçuk, Turkey", 37.9424, 27.4328, 90, ["town", "drinks", "food"]],
    ["Ephesus Archaeological Museum", "Ephesus Archaeological Museum, Selçuk, Turkey", 37.949, 27.3679, 60, ["history"]],
    ["Güvercinada", "Güvercinada, Kuşadası, Turkey", 37.8634, 27.2479, 30, ["history", "scenic"]],
    ["Temple of Artemis", "Temple of Artemis (Artemision), Selçuk, Turkey", 37.9498, 27.3636, 30, ["history"]]
  ]},
  {"id": "istanbul", "name": "Istanbul", "region": "Mediterranean and Atlantic islands", "country": "Turkey", "cc": "tr", "aka": [], "area": "Fatih, Istanbul, Marmara Region", "tender": "unknown", "left": false, "address": "Istanbul cruise port, Turkey", "lat": 41.0064, "lon": 28.9759, "stops": [
    ["Hagia Sophia", "1 Ayasofya Meydanı, Istanbul, Turkey", 41.0085, 28.98, 90, ["history", "art"]],
    ["Sultan Ahmed Mosque", "7 Atmeydanı Caddesi, Istanbul, Turkey", 41.0054, 28.9769, 60, ["history"]],
    ["Topkapı Palace", "Topkapı Palace, Istanbul, Turkey", 41.013, 28.9841, 150, ["history"]],
    ["Grand Bazaar", "Grand Bazaar, Istanbul, Turkey", 41.011, 28.968, 120, ["markets"]],
    ["Basilica Cistern", "1 Yerebatan Caddesi, Istanbul, Turkey", 41.0085, 28.9784, 45, ["history"]],
    ["Galata Tower", "Galata Tower, Beyoğlu, Turkey", 41.0256, 28.9742, 60, ["scenic", "history"]],
    ["Spice Bazaar", "Egyptian (Spice) Bazaar, Istanbul, Turkey", 41.0165, 28.9705, 60, ["markets", "food"]],
    ["Dolmabahçe Palace", "Dolmabahçe Palace, Beşiktaş, Turkey", 41.039, 28.9998, 90, ["history"]]
  ]},
  {"id": "dubrovnik", "name": "Dubrovnik", "region": "Mediterranean and Atlantic islands", "country": "Croatia", "cc": "hr", "aka": [], "area": "Dubrovnik-Neretva County", "tender": "varies", "left": false, "address": "Dubrovnik cruise port, Croatia", "lat": 42.6491, "lon": 18.094, "stops": [
    ["Walls of Dubrovnik", "City Walls, Dubrovnik, Croatia", 42.6417, 18.1073, 120, ["history", "scenic"]],
    ["Stradun", "Stradun, Dubrovnik, Croatia", 42.6413, 18.1089, 60, ["town"]],
    ["Dubrovnik Cable Car", "Dubrovnik Cable Car, Dubrovnik, Croatia", 42.6431, 18.1116, 60, ["scenic"]],
    ["Lokrum", "Lokrum, Dubrovnik, Croatia", 42.6276, 18.1207, 180, ["beach", "gardens", "wildlife"]],
    ["Fort Lovrijenac", "Fort Lovrijenac, Dubrovnik, Croatia", 42.6408, 18.1042, 45, ["history"]],
    ["Banje Beach", "Banje, Dubrovnik, Croatia", 42.6416, 18.1164, 120, ["beach"]],
    ["Cavtat", "Cavtat, Croatia", 42.5814, 18.2177, 120, ["town"]]
  ]},
  {"id": "split", "name": "Split", "region": "Mediterranean and Atlantic islands", "country": "Croatia", "cc": "hr", "aka": [], "area": "Grad Split, Split-Dalmatia County", "tender": "varies", "left": false, "address": "Split cruise port, Croatia", "lat": 43.5116, "lon": 16.44, "stops": [
    ["Diocletian's Palace", "Diocletian's Palace, Split, Croatia", 43.5085, 16.4402, 120, ["history", "town"]],
    ["Marjan", "Marjan, Split, Croatia", 43.5112, 16.4386, 90, ["parks", "hiking", "scenic"]],
    ["Trogir", "Trogir, Grad Trogir, Croatia", 43.533, 16.2578, 120, ["town", "history"]],
    ["Klis Fortress", "Klis Fortress, Općina Klis, Croatia", 43.56, 16.5243, 75, ["history", "scenic"]],
    ["Krka National Park", "Krka National Park, Šibenik-Knin County, Croatia", 43.9189, 15.9785, 240, ["parks", "waterfalls"]],
    ["Riva", "Riva, Split, Croatia", 43.5078, 16.4383, 45, ["town", "food"]],
    ["Bačvice", "Gradski kotar Bačvice, Split, Croatia", 43.5038, 16.4472, 120, ["beach"]]
  ]},
  {"id": "kotor", "name": "Kotor", "region": "Mediterranean and Atlantic islands", "country": "Montenegro", "cc": "me", "aka": [], "area": "Kotor Municipality", "tender": "varies", "left": false, "address": "Kotor cruise port, Montenegro", "lat": 42.4261, "lon": 18.7668, "stops": [
    ["Our Lady of the Rocks", "Our Lady of the Rocks, Perast, Montenegro", 42.4867, 18.6888, 90, ["history", "water"]],
    ["Perast", "Perast, Montenegro", 42.4863, 18.6989, 90, ["town", "history"]],
    ["Budva Old Town", "Old town, Budva, Montenegro", 42.2773, 18.8375, 120, ["town", "beach"]],
    ["Lovćen National Park", "Lovćen National Park, Dolovi, Montenegro", 42.3714, 18.8557, 150, ["parks", "scenic"]],
    ["Cathedral of Saint Tryphon", "St. Tryphon Cathedral, Kotor, Montenegro", 42.4242, 18.7715, 30, ["history"]]
  ]},
  {"id": "marseille", "name": "Marseille", "region": "Mediterranean and Atlantic islands", "country": "France", "cc": "fr", "aka": [], "area": "Bouches-du-Rhône, Provence-Alpes-Côte d'Azur, Metropolitan France", "tender": "pier", "left": false, "address": "Marseille cruise port, France", "lat": 43.343, "lon": 5.3328, "stops": [
    ["Notre-Dame de la Garde", "Notre-Dame de la Garde, Marseille, France", 43.2839, 5.3712, 60, ["history", "scenic"]],
    ["Vieux-Port", "Vieux-Port, Marseille, France", 43.2946, 5.3693, 60, ["town", "food", "markets"]],
    ["Calanques National Park", "Parc national des Calanques (cœur), Bouches-du-Rhône, France", 43.1522, 5.4291, 180, ["parks", "hiking", "scenic", "water"]],
    ["MuCEM", "MUCEM, Marseille, France", 43.2984, 5.3628, 90, ["art", "history"]],
    ["Le Panier", "Le Panier, Marseille, France", 43.2994, 5.368, 60, ["town", "art"]],
    ["Château d'If", "Château d'If, Marseille, France", 43.2805, 5.3265, 120, ["history"]],
    ["Palais Longchamp", "Palais Longchamp, Marseille, France", 43.3033, 5.3924, 60, ["gardens", "art"]]
  ]},
  {"id": "villefranche", "name": "Villefranche-sur-Mer (Nice)", "region": "Mediterranean and Atlantic islands", "country": "France", "cc": "fr", "aka": ["Nice", "Villefranche"], "area": "Nice, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan France", "tender": "tender", "left": false, "address": "Villefranche-sur-Mer cruise port, France", "lat": 43.7042, "lon": 7.31, "stops": [
    ["Promenade des Anglais", "Promenade des Anglais, Nice, France", 43.6948, 7.2623, 60, ["scenic", "beach"]],
    ["Vieux Nice", "Vieux Nice, Nice, France", 43.6968, 7.2769, 90, ["town", "food", "markets"]],
    ["Èze", "Èze, France", 43.7289, 7.3621, 120, ["town", "scenic", "gardens"]],
    ["Villa Ephrussi de Rothschild", "1 Avenue Ephrussi de Rothschild, Saint-Jean-Cap-Ferrat, France", 43.6966, 7.3285, 90, ["gardens", "history"]],
    ["Citadelle de Villefranche-sur-Mer", "Citadelle Saint-Elme, Villefranche-sur-Mer, France", 43.7014, 7.311, 45, ["history"]],
    ["Cours Saleya", "Cours Saleya, Nice, France", 43.6956, 7.2751, 60, ["markets"]],
    ["Colline du Château", "Colline du Château, Nice, France", 43.6963, 7.2806, 60, ["scenic", "parks"]],
    ["Saint-Paul-de-Vence", "Saint-Paul-de-Vence, France", 43.698, 7.1216, 120, ["town", "art"]]
  ]},
  {"id": "monaco", "name": "Monte Carlo, Monaco", "region": "Mediterranean and Atlantic islands", "country": "Monaco", "cc": "mc", "aka": ["Monte Carlo"], "area": "", "tender": "varies", "left": false, "address": "Monte Carlo cruise port, Monaco", "lat": 43.7353, "lon": 7.4306, "stops": [
    ["Prince's Palace of Monaco", "Prince's Palace of Monaco, Monaco", 43.7313, 7.4198, 60, ["history"]],
    ["Oceanographic Museum", "Oceanographic Museum of Monaco, Monaco", 43.7307, 7.4255, 120, ["wildlife", "history", "family"]],
    ["Casino de Monte-Carlo", "Monte-Carlo Casino and Opera House, Monaco", 43.7392, 7.428, 45, ["history"]],
    ["Jardin Exotique de Monaco", "Jardin Exotique, Monaco", 43.7326, 7.4148, 60, ["gardens", "scenic"]],
    ["Saint Nicholas Cathedral", "Saint Nicholas Cathedral, Monaco", 43.7302, 7.4227, 30, ["history"]],
    ["Larvotto Beach", "Larvotto Beach, Monaco", 43.7459, 7.4331, 120, ["beach"]],
    ["Japanese Garden", "Japanese Garden, Monaco", 43.7422, 7.4309, 30, ["gardens"]]
  ]},
  {"id": "cannes", "name": "Cannes", "region": "Mediterranean and Atlantic islands", "country": "France", "cc": "fr", "aka": [], "area": "Grasse, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan France", "tender": "tender", "left": false, "address": "Cannes cruise port, France", "lat": 43.5469, "lon": 7.0142, "stops": [
    ["Palais des Festivals et des Congrès", "1 Boulevard de la Croisette, Cannes, France", 43.5507, 7.0177, 30, ["art", "history"]],
    ["Île Sainte-Marguerite", "Île Sainte-Marguerite, Cannes, France", 43.5194, 7.0493, 180, ["history", "beach"]],
    ["Marché Forville", "Marché Forville, Cannes, France", 43.5521, 7.0121, 45, ["markets", "food"]],
    ["Grasse", "Grasse, France", 43.6589, 6.9239, 150, ["art", "town"]],
    ["Antibes", "Antibes, France", 43.5814, 7.1237, 120, ["town", "history"]],
    ["Musée Picasso", "Musée Picasso, Antibes, France", 43.5807, 7.1283, 60, ["art"]]
  ]},
  {"id": "palma", "name": "Palma de Mallorca", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": ["Mallorca", "Majorca", "Palma"], "area": "Balearic Islands", "tender": "unknown", "left": false, "address": "Palma de Mallorca cruise port, Balearic Islands, Spain", "lat": 39.5696, "lon": 2.6501, "stops": [
    ["Palma Cathedral", "Palma Cathedral, Palma, Spain", 39.5675, 2.6482, 75, ["history", "art"]],
    ["Bellver Castle", "Bellver Castle, Palma, Spain", 39.5639, 2.6188, 60, ["history", "scenic"]],
    ["Royal Palace of La Almudaina", "Almudaina Palace, Palma, Spain", 39.568, 2.6472, 45, ["history"]],
    ["Valldemossa", "Valldemossa, Spain", 39.7108, 2.623, 120, ["town", "history"]],
    ["Sóller", "Sóller, Spain", 39.7663, 2.7151, 150, ["town", "scenic"]],
    ["Mercat de l'Olivar", "4 Plaça de l'Olivar, Palma, Spain", 39.5739, 2.6535, 45, ["markets", "food"]]
  ]},
  {"id": "valencia", "name": "Valencia", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": [], "area": "Comarca de València, Valencia, Valencian Community", "tender": "unknown", "left": false, "address": "Valencia cruise port, Spain", "lat": 39.4697, "lon": -0.3763, "stops": [
    ["City of Arts and Sciences", "7 Avinguda del Professor López Piñero (Historiador de la Medicina), Valencia, Spain", 39.4558, -0.3526, 150, ["family", "art"]],
    ["Oceanogràfic", "1 Carrer d'Eduardo Primo Yúfera, Valencia, Spain", 39.453, -0.3472, 180, ["wildlife", "family"]],
    ["Valencia Cathedral", "Valencia Cathedral, Valencia, Spain", 39.4756, -0.3751, 60, ["history"]],
    ["La Lonja de la Seda", "2 Carrer de la Llotja, Valencia, Spain", 39.4744, -0.3783, 45, ["history"]],
    ["Jardín del Turia", "Jardí del Túria - Tram IV, Valencia, Spain", 39.4797, -0.3862, 90, ["parks", "gardens"]],
    ["Albufera", "Centro Comercial Parque Albufera, Alfafar, Spain", 39.4166, -0.3788, 120, ["wildlife", "water"]],
    ["Malvarrosa Beach", "La Malvarrosa Beach, Valencia, Spain", 39.4794, -0.3237, 120, ["beach"]]
  ]},
  {"id": "malaga", "name": "Málaga", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": ["Malaga", "Costa del Sol"], "area": "Málaga-Costa del Sol, Malaga, Andalusia", "tender": "pier", "left": false, "address": "Málaga cruise port, Spain", "lat": 36.7178, "lon": -4.4174, "stops": [
    ["Alcazaba", "Alcazaba de Málaga, Málaga, Spain", 36.721, -4.4159, 75, ["history"]],
    ["Gibralfaro Castle", "Castillo de Gibralfaro, Málaga, Spain", 36.7234, -4.4118, 60, ["history", "scenic"]],
    ["Museo Picasso Málaga", "8 Calle San Agustín, Málaga, Spain", 36.7216, -4.4183, 90, ["art"]],
    ["Málaga Cathedral", "9 Calle Molina Lario, Málaga, Spain", 36.7202, -4.4194, 45, ["history"]],
    ["Mercado Central de Atarazanas", "Mercado de Atarazanas, Málaga, Spain", 36.7184, -4.4241, 45, ["markets", "food"]],
    ["Caminito del Rey", "Caminito del Rey, Ardales, Spain", 36.9288, -4.7839, 240, ["hiking", "scenic"]],
    ["Ronda", "Ronda, Spain", 36.7421, -5.1666, 180, ["town", "scenic", "history"]],
    ["Cueva de Nerja", "Cueva de Nerja, Nerja, Spain", 36.7621, -3.8452, 120, ["caves"]],
    ["La Malagueta", "La Malagueta, Málaga, Spain", 36.7183, -4.4102, 120, ["beach"]]
  ]},
  {"id": "cadiz", "name": "Cádiz (Seville)", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": ["Cadiz", "Seville", "Sevilla"], "area": "Bay of Cádiz, Cádiz, Andalusia", "tender": "pier", "left": false, "address": "Cádiz cruise port, Spain", "lat": 36.5321, "lon": -6.2919, "stops": [
    ["Cádiz Cathedral", "Catedral de la Santa Cruz de Cádiz, Cádiz, Spain", 36.529, -6.2953, 60, ["history"]],
    ["Torre Tavira", "10 Calle Marqués del Real Tesoro, Cádiz, Spain", 36.532, -6.2984, 45, ["scenic", "history"]],
    ["Seville Cathedral", "Cathedral of Seville, Seville, Spain", 37.3859, -5.9931, 90, ["history", "art"]],
    ["Alcázar of Seville", "Alcázar of Seville, Seville, Spain", 37.3832, -5.9902, 120, ["history", "gardens"]],
    ["Bodegas Tío Pepe", "Bodegas Tío Pepe, Jerez, Spain", 36.6809, -6.1431, 90, ["drinks", "history"]],
    ["Playa de la Caleta", "Playa de La Caleta, Cádiz, Spain", 36.5285, -6.3065, 120, ["beach"]],
    ["Mercado Central de Abastos", "Mercado Central de Abastos, Jerez, Spain", 36.6819, -6.1359, 45, ["markets", "food"]],
    ["Plaza de España", "Plaza de España, Cádiz, Spain", 36.5351, -6.2932, 45, ["history", "scenic"]]
  ]},
  {"id": "lisbon", "name": "Lisbon", "region": "Mediterranean and Atlantic islands", "country": "Portugal", "cc": "pt", "aka": ["Lisboa", "Sintra"], "area": "", "tender": "pier", "left": false, "address": "Lisbon cruise port, Portugal", "lat": 38.7102, "lon": -9.1264, "stops": [
    ["Belém Tower", "Tower of Belém, Lisbon, Portugal", 38.6916, -9.2159, 45, ["history"]],
    ["Jerónimos Monastery", "Jerónimos Monastery, Lisbon, Portugal", 38.6978, -9.2056, 90, ["history", "art"]],
    ["Alfama", "Alfama, Lisbon, Portugal", 38.7118, -9.1284, 90, ["town", "music", "history"]],
    ["São Jorge Castle", "São Jorge Castle, Lisbon, Portugal", 38.7139, -9.1335, 75, ["history", "scenic"]],
    ["Pena Palace", "Pena National Palace, Sintra (Santa Maria e São Miguel, São Martinho e São Pedro de Penaferrim), Portugal", 38.7876, -9.3906, 150, ["history", "scenic", "gardens"]],
    ["Praça do Comércio", "Praça do Comércio, Lisbon, Portugal", 38.7069, -9.1361, 30, ["town", "history"]],
    ["Oceanário de Lisboa", "Oceanário de Lisboa, Lisbon, Portugal", 38.7635, -9.0937, 120, ["wildlife", "family"]],
    ["Cascais", "Cascais, Portugal", 38.6969, -9.4204, 150, ["town", "beach"]],
    ["Cabo da Roca", "Cape Roca, Colares, Portugal", 38.7809, -9.4994, 45, ["scenic", "lighthouses"]]
  ]},
  {"id": "gibraltar", "name": "Gibraltar", "region": "Mediterranean and Atlantic islands", "country": "Gibraltar", "cc": "gi", "aka": [], "area": "", "tender": "pier", "left": false, "address": "Gibraltar cruise port, Gibraltar", "lat": 36.1476, "lon": -5.3658, "stops": [
    ["Upper Rock Nature Reserve", "Upper Rock - Gibraltar Nature Reserve, Gibraltar", 36.1327, -5.3459, 150, ["wildlife", "scenic", "hiking"]],
    ["St. Michael's Cave", "St. Michael's Cave, Gibraltar", 36.1263, -5.3455, 60, ["caves"]],
    ["Great Siege Tunnels", "Great Siege Tunnels, Gibraltar", 36.1452, -5.3451, 60, ["history"]],
    ["Gibraltar Cable Car", "Cable Car Lower Station, Gibraltar", 36.1328, -5.352, 45, ["scenic"]],
    ["Europa Point Lighthouse", "Europa Point Trinity Lighthouse, Gibraltar", 36.1097, -5.3448, 30, ["lighthouses", "scenic"]],
    ["Main Street", "Main Street, Gibraltar", 36.1408, -5.3536, 60, ["town", "markets"]],
    ["Gibraltar Botanic Gardens", "Alameda Botanic Gardens, Gibraltar", 36.1316, -5.3512, 30, ["gardens"]]
  ]},
  {"id": "funchal", "name": "Funchal, Madeira", "region": "Mediterranean and Atlantic islands", "country": "Portugal", "cc": "pt", "aka": ["Madeira", "Funchal"], "area": "Madeira", "tender": "unknown", "left": false, "address": "Funchal cruise port, Madeira, Portugal", "lat": 32.6496, "lon": -16.9087, "stops": [
    ["Monte Palace Tropical Garden", "Monte Palace Tropical Garden, Funchal, Portugal", 32.6742, -16.9029, 90, ["gardens"]],
    ["Teleférico do Funchal", "Funchal Cable Car, Funchal, Portugal", 32.6613, -16.9012, 30, ["scenic"]],
    ["Mercado dos Lavradores", "Mercado dos Lavradores, Funchal, Portugal", 32.6487, -16.9035, 45, ["markets", "food"]],
    ["Cabo Girão", "Cabo Girão, Câmara de Lobos, Portugal", 32.6565, -17.0045, 45, ["scenic"]],
    ["Madeira Botanical Garden", "Botanical Garden, Funchal, Portugal", 32.6635, -16.8957, 75, ["gardens"]],
    ["Blandy's Wine Lodge", "28 Avenida Arriaga, Funchal, Portugal", 32.6478, -16.9106, 60, ["drinks", "history"]],
    ["Pico do Arieiro", "Pico do Arieiro, Santana, Portugal", 32.7357, -16.9287, 120, ["scenic", "hiking"]],
    ["Câmara de Lobos", "Câmara de Lobos, Portugal", 32.6485, -16.9752, 60, ["town"]]
  ]},
  {"id": "tenerife", "name": "Santa Cruz de Tenerife", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": ["Tenerife"], "area": "Canary Islands", "tender": "pier", "left": false, "address": "Santa Cruz de Tenerife cruise port, Canary Islands, Spain", "lat": 28.4728, "lon": -16.2459, "stops": [
    ["Teide National Park", "Teide National Park, Santa Cruz de Tenerife, Spain", 28.2688, -16.6374, 240, ["parks", "scenic", "hiking"]],
    ["Loro Parque", "Loro Parque, Puerto de la Cruz, Spain", 28.4086, -16.5643, 180, ["wildlife", "family"]],
    ["San Cristóbal de La Laguna", "San Cristóbal de La Laguna, Spain", 28.4858, -16.3159, 90, ["history", "town"]],
    ["Anaga Rural Park", "Parque Rural de Anaga, Santa Cruz de Tenerife, Spain", 28.5336, -16.2576, 150, ["hiking", "scenic"]],
    ["Playa de las Teresitas", "Playa de las Teresitas, Santa Cruz de Tenerife, Spain", 28.5079, -16.1874, 120, ["beach"]],
    ["Auditorio de Tenerife", "Auditorio de Tenerife Adán Martín, Santa Cruz de Tenerife, Spain", 28.4561, -16.2512, 30, ["art", "music"]],
    ["Puerto de la Cruz", "Puerto de la Cruz, Spain", 28.4159, -16.5533, 120, ["town"]]
  ]},
  {"id": "gran-canaria", "name": "Las Palmas de Gran Canaria", "region": "Mediterranean and Atlantic islands", "country": "Spain", "cc": "es", "aka": ["Gran Canaria", "Las Palmas"], "area": "Canary Islands", "tender": "unknown", "left": false, "address": "Las Palmas de Gran Canaria cruise port, Canary Islands, Spain", "lat": 28.1289, "lon": -15.4349, "stops": [
    ["Playa de Las Canteras", "Playa de Las Canteras, Las Palmas, Spain", 28.1396, -15.4366, 150, ["beach"]],
    ["Vegueta", "Vegueta, Las Palmas, Spain", 28.0988, -15.4161, 90, ["history", "town"]],
    ["Casa de Colón", "1 Calle Colón, Las Palmas, Spain", 28.1014, -15.4141, 45, ["history"]],
    ["Roque Nublo", "Monumento Natural del Roque Nublo, Tejeda, Spain", 27.968, -15.6123, 180, ["hiking", "scenic"]],
    ["Dunas de Maspalomas", "Maspalomas Dunes, San Bartolomé de Tirajana, Spain", 27.7439, -15.5829, 150, ["beach", "scenic"]],
    ["Jardín Botánico Canario Viera y Clavijo", "Jardín Botánico Viera y Clavijo, Las Palmas, Spain", 28.0644, -15.4623, 90, ["gardens"]],
    ["Teror", "Teror, Spain", 28.059, -15.5476, 90, ["town", "history"]],
    ["Caldera de Bandama", "Caldera de Bandama, Santa Brígida, Spain", 28.0321, -15.4545, 75, ["scenic", "hiking"]]
  ]},
  {"id": "southampton", "name": "Southampton", "region": "Northern Europe and British Isles", "country": "England, United Kingdom", "cc": "gb", "aka": [], "area": "England, United Kingdom, UK, Great Britain, Britain", "tender": "pier", "left": true, "address": "Southampton cruise port, England, United Kingdom", "lat": 50.9002, "lon": -1.414, "stops": [
    ["Stonehenge", "Stonehenge, Amesbury, United Kingdom", 51.1775, -1.8274, 120, ["history"]],
    ["Winchester Cathedral", "Winchester Cathedral, Winchester, United Kingdom", 51.0607, -1.3132, 75, ["history"]],
    ["SeaCity Museum", "SeaCity Museum, Southampton, United Kingdom", 50.9082, -1.4075, 75, ["history"]],
    ["New Forest National Park", "New Forest National Park, Hampshire, United Kingdom", 50.8557, -1.5957, 150, ["parks", "wildlife", "hiking"]],
    ["Salisbury Cathedral", "Salisbury Cathedral, Salisbury, United Kingdom", 51.065, -1.7973, 75, ["history"]],
    ["Portsmouth Historic Dockyard", "Portsmouth Historic Dockyard, Portsmouth, United Kingdom", 50.8005, -1.1095, 180, ["history", "family"]],
    ["National Motor Museum", "National Motor Museum, New Forest, United Kingdom", 50.823, -1.4536, 150, ["history", "family"]]
  ]},
  {"id": "dover", "name": "Dover", "region": "Northern Europe and British Isles", "country": "England, United Kingdom", "cc": "gb", "aka": [], "area": "Kent, England, United Kingdom, UK, Great Britain, Britain", "tender": "pier", "left": true, "address": "Dover cruise port, England, United Kingdom", "lat": 51.1136, "lon": 1.315, "stops": [
    ["Dover Castle", "Dover Castle, Dover, United Kingdom", 51.129, 1.3229, 150, ["history", "scenic"]],
    ["White Cliffs of Dover", "White Cliffs of Dover, Dover, United Kingdom", 51.1259, 1.3213, 120, ["scenic", "hiking"]],
    ["Canterbury Cathedral", "Canterbury Cathedral, Canterbury, United Kingdom", 51.2798, 1.0828, 90, ["history"]],
    ["South Foreland Lighthouse", "South Foreland Lighthouse, Dover, United Kingdom", 51.1404, 1.3705, 60, ["lighthouses"]],
    ["Leeds Castle", "Leeds Castle, Maidstone, United Kingdom", 51.2484, 0.63, 150, ["history", "gardens"]],
    ["Walmer Castle", "Walmer Castle, Dover, United Kingdom", 51.2, 1.3999, 60, ["history", "gardens"]]
  ]},
  {"id": "copenhagen", "name": "Copenhagen", "region": "Northern Europe and British Isles", "country": "Denmark", "cc": "dk", "aka": ["København"], "area": "Copenhagen Municipality, Capital Region of Denmark", "tender": "pier", "left": false, "address": "Copenhagen cruise port, Denmark", "lat": 55.7134, "lon": 12.6194, "stops": [
    ["Nyhavn", "Nyhavn, Copenhagen, Denmark", 55.6796, 12.5923, 60, ["town", "food"]],
    ["Tivoli Gardens", "Tivoli Gardens, Copenhagen, Denmark", 55.6734, 12.5692, 180, ["themeparks", "family", "gardens"]],
    ["The Little Mermaid", "The Little Mermaid, Copenhagen, Denmark", 55.6929, 12.5993, 20, ["art"]],
    ["Rosenborg Castle", "Rosenborg Castle, Copenhagen, Denmark", 55.6857, 12.5774, 75, ["history"]],
    ["Christiansborg Palace", "Christiansborg Palace, Copenhagen, Denmark", 55.6757, 12.58, 75, ["history"]],
    ["Strøget", "Nørgaard på Strøget, Copenhagen, Denmark", 55.6786, 12.578, 60, ["town", "markets"]],
    ["Kronborg Castle", "Kronborg Castle, Elsinore, Denmark", 56.0391, 12.6212, 120, ["history"]],
    ["Frederiksborg Castle", "Frederiksborg Palace, Hillerød, Denmark", 55.9351, 12.3017, 120, ["history", "gardens"]],
    ["Louisiana Museum of Modern Art", "Louisiana Museum of Modern Art, Humlebæk, Denmark", 55.9694, 12.5432, 120, ["art"]]
  ]},
  {"id": "stockholm", "name": "Stockholm", "region": "Northern Europe and British Isles", "country": "Sweden", "cc": "se", "aka": [], "area": "Stockholm Municipality, Stockholm County", "tender": "pier", "left": false, "address": "Stockholm cruise port, Sweden", "lat": 59.3455, "lon": 18.1304, "stops": [
    ["Vasa Museum", "Vasa Museum, Stockholm, Sweden", 59.3281, 18.0914, 90, ["history"]],
    ["Gamla stan", "Gamla stan, Stockholm, Sweden", 59.325, 18.0706, 90, ["history", "town"]],
    ["Skansen", "49-51 Djurgårdsslätten, Stockholm, Sweden", 59.3266, 18.1053, 150, ["history", "wildlife", "family"]],
    ["Stockholm Palace", "1 Slottsbacken, Stockholm, Sweden", 59.3269, 18.0702, 75, ["history"]],
    ["ABBA The Museum", "68 Djurgårdsvägen, Stockholm, Sweden", 59.3249, 18.0966, 75, ["music", "family"]],
    ["Drottningholm Palace", "Drottningholm Palace, Ekerö kommun, Sweden", 59.3216, 17.8869, 120, ["history", "gardens"]],
    ["Fotografiska", "22 Stadsgårdshamnen, Stockholm, Sweden", 59.318, 18.0847, 75, ["art"]],
    ["Stockholm City Hall", "1 Hantverkargatan, Stockholm, Sweden", 59.3275, 18.0542, 45, ["history"]]
  ]},
  {"id": "helsinki", "name": "Helsinki", "region": "Northern Europe and British Isles", "country": "Finland", "cc": "fi", "aka": [], "area": "Helsinki sub-region, Uusimaa, Mainland Finland", "tender": "unknown", "left": false, "address": "Helsinki cruise port, Finland", "lat": 60.1666, "lon": 24.9435, "stops": [
    ["Suomenlinna", "Suomenlinna, Helsinki, Finland", 60.1444, 24.9854, 150, ["history", "scenic"]],
    ["Helsinki Cathedral", "29 Unioninkatu, Helsinki, Finland", 60.1704, 24.9522, 30, ["history"]],
    ["Temppeliaukio Church", "3 Lutherinkatu, Helsinki, Finland", 60.173, 24.9252, 30, ["history", "art"]],
    ["Uspenski Cathedral", "1 Kanavakatu, Helsinki, Finland", 60.1685, 24.9599, 30, ["history"]],
    ["Sibelius Monument", "Sibelius Monument, Helsinki, Finland", 60.182, 24.9134, 20, ["music", "art"]],
    ["Seurasaari Open-Air Museum", "Seurasaari open-air museum, Helsinki, Finland", 60.1828, 24.8861, 90, ["history", "parks"]],
    ["Old Market Hall", "9 Eteläranta, Helsinki, Finland", 60.1662, 24.9528, 45, ["food", "markets"]]
  ]},
  {"id": "tallinn", "name": "Tallinn", "region": "Northern Europe and British Isles", "country": "Estonia", "cc": "ee", "aka": [], "area": "Harju County", "tender": "pier", "left": false, "address": "Tallinn cruise port, Estonia", "lat": 59.4479, "lon": 24.7642, "stops": [
    ["Tallinn Town Hall Square", "Town Hall Square, Tallinn, Estonia", 59.4374, 24.7452, 30, ["town", "history"]],
    ["Toompea Castle", "1a Lossi plats, Tallinn, Estonia", 59.4357, 24.7374, 45, ["history"]],
    ["Alexander Nevsky Cathedral", "10 Lossi plats, Tallinn, Estonia", 59.4358, 24.7393, 30, ["history"]],
    ["Kadriorg Palace", "37 August Weizenbergi, Tallinn, Estonia", 59.4385, 24.791, 75, ["art", "history", "gardens"]],
    ["Estonian Open Air Museum", "12 Vabaõhumuuseumi tee, Tallinn, Estonia", 59.436, 24.6353, 120, ["history"]],
    ["Seaplane Harbour", "6 Vesilennuki, Tallinn, Estonia", 59.4517, 24.7384, 120, ["history", "family"]],
    ["Kohtuotsa viewing platform", "Kohtuotsa vaateplatvorm, Tallinn, Estonia", 59.4377, 24.7422, 20, ["scenic"]],
    ["St. Olaf's Church", "50 Lai, Tallinn, Estonia", 59.4413, 24.7479, 45, ["history", "scenic"]]
  ]},
  {"id": "oslo", "name": "Oslo", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": [], "area": "", "tender": "pier", "left": false, "address": "Oslo cruise port, Norway", "lat": 59.9062, "lon": 10.7347, "stops": [
    ["Oslo Opera House", "Oslo Opera House, Oslo, Norway", 59.9075, 10.7527, 45, ["music", "art", "scenic"]],
    ["Akershus Fortress", "Akershus fortress, Oslo, Norway", 59.9076, 10.7372, 60, ["history"]],
    ["Fram Museum", "Fram Museum, Oslo, Norway", 59.9034, 10.6996, 90, ["history", "family"]],
    ["Norwegian Museum of Cultural History", "The Norwegian Museum of Cultural History, Oslo, Norway", 59.9075, 10.6867, 120, ["history"]],
    ["Holmenkollen Ski Jump", "Holmenkollbakken, Oslo, Norway", 59.9644, 10.6668, 90, ["scenic", "history"]],
    ["Munch Museum", "Munchmuseet, Oslo, Norway", 59.9056, 10.7552, 90, ["art"]],
    ["Kon-Tiki Museum", "Kon-Tiki Museum, Oslo, Norway", 59.9035, 10.6981, 60, ["history"]]
  ]},
  {"id": "bergen", "name": "Bergen", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": [], "area": "Vestland", "tender": "unknown", "left": false, "address": "Bergen cruise port, Norway", "lat": 60.3943, "lon": 5.3259, "stops": [
    ["Bryggen", "Bryggen, Bergen, Norway", 60.3962, 5.3249, 75, ["history", "town"]],
    ["Fløibanen", "Fløibanen, Bergen, Norway", 60.3964, 5.3306, 90, ["scenic", "hiking"]],
    ["Bergen Fish Market", "Bergen Fish Market, Bergen, Norway", 60.3946, 5.3237, 45, ["food", "markets"]],
    ["Ulriken", "Ulriken, Bergen, Norway", 60.3775, 5.3869, 120, ["scenic", "hiking"]],
    ["Troldhaugen", "Edvard Grieg Museum Troldhaugen, Bergen, Norway", 60.3196, 5.3295, 90, ["music", "history"]],
    ["Bergenhus Fortress", "Bergenhus Fortress, Bergen, Norway", 60.4001, 5.3179, 45, ["history"]],
    ["Fantoft Stave Church", "Fantoft stavkirke, Bergen, Norway", 60.3393, 5.3533, 45, ["history"]],
    ["KODE", "Kode 2, Bergen, Norway", 60.3902, 5.3248, 90, ["art"]]
  ]},
  {"id": "stavanger", "name": "Stavanger", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": [], "area": "Rogaland", "tender": "unknown", "left": false, "address": "Stavanger cruise port, Norway", "lat": 58.97, "lon": 5.7318, "stops": [
    ["Preikestolen", "Pulpit Rock, Strand, Norway", 58.9878, 6.1904, 300, ["hiking", "scenic"]],
    ["Gamle Stavanger", "Gamle Stavanger, Stavanger, Norway", 58.9721, 5.7257, 60, ["history", "town"]],
    ["Norwegian Petroleum Museum", "The Norwegian Petroleum Museum, Stavanger, Norway", 58.9736, 5.7348, 90, ["history", "family"]],
    ["Sverd i fjell", "Sverd i fjell, Stavanger, Norway", 58.9414, 5.6719, 30, ["history", "art"]],
    ["Lysefjord", "Lysefjorden, Rogaland, Norway", 59.0109, 6.3447, 180, ["scenic", "water"]]
  ]},
  {"id": "geiranger", "name": "Geiranger", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": ["Geirangerfjord"], "area": "Stranda, Møre og Romsdal", "tender": "tender", "left": false, "address": "Geiranger cruise port, Norway", "lat": 62.1006, "lon": 7.2059, "stops": [
    ["Dalsnibba", "Dalsnibba, Stranda, Norway", 62.0479, 7.2713, 90, ["scenic"]],
    ["Flydalsjuvet", "Flydalsjuvet, Geiranger, Norway", 62.0899, 7.2229, 30, ["scenic"]],
    ["Ørnesvingen", "Ørnesvingen, Stranda, Norway", 62.1262, 7.1677, 30, ["scenic"]],
    ["Norsk Fjordsenter", "Norsk Fjordsenter, Geiranger, Norway", 62.0953, 7.2109, 60, ["history"]]
  ]},
  {"id": "flam", "name": "Flåm", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": ["Flam"], "area": "A-feltvegen, Fretheim, Flåm, Aurland, Vestland", "tender": "varies", "left": false, "address": "Flåm cruise port, Norway", "lat": 60.863, "lon": 7.1132, "stops": [
    ["Flåmsbana", "The Flåm Railway, Flåm, Norway", 60.8631, 7.1145, 150, ["scenic", "history"]],
    ["Stegastein", "Stegastein, Aurlandsvangen, Norway", 60.9086, 7.2118, 45, ["scenic"]],
    ["Nærøyfjord", "Nærøyfjord, Aurland, Norway", 60.9439, 6.9397, 180, ["scenic", "water"]],
    ["Ægir Bryggeri", "Ægir bryggeri, Flåm, Norway", 60.8638, 7.1171, 60, ["drinks", "food"]],
    ["Undredal", "Undredal, Norway", 60.9504, 7.1027, 75, ["town", "food"]],
    ["Brekkefossen", "Brekkefossen, Flåm, Norway", 60.8518, 7.1015, 90, ["waterfalls", "hiking"]]
  ]},
  {"id": "alesund", "name": "Ålesund", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": ["Alesund"], "area": "Møre og Romsdal", "tender": "pier", "left": false, "address": "Ålesund cruise port, Norway", "lat": 62.4695, "lon": 6.1498, "stops": [
    ["Aksla", "Aksla, Ålesund, Norway", 62.4752, 6.1678, 75, ["scenic", "hiking"]],
    ["Jugendstilsenteret", "Jugendstilsenteret, Ålesund, Norway", 62.4711, 6.1505, 60, ["art", "history"]],
    ["Sunnmøre Museum", "Sunnmøre museum, Ålesund, Norway", 62.4689, 6.2362, 75, ["history"]],
    ["Alnes Lighthouse", "Alnes fyr, Alnes, Norway", 62.49, 5.9673, 60, ["lighthouses"]]
  ]},
  {"id": "tromso", "name": "Tromsø", "region": "Northern Europe and British Isles", "country": "Norway", "cc": "no", "aka": ["Tromso"], "area": "Troms", "tender": "pier", "left": false, "address": "Tromsø cruise port, Norway", "lat": 69.6787, "lon": 18.9898, "stops": [
    ["Arctic Cathedral", "Arctic Cathedral, Tromsø, Norway", 69.648, 18.9874, 30, ["history", "art"]],
    ["Fjellheisen", "Fjellheisen, Tromsø, Norway", 69.6385, 18.9908, 90, ["scenic"]],
    ["Polaria", "Polaria, Tromsø, Norway", 69.6437, 18.9499, 90, ["wildlife", "family"]],
    ["Polar Museum", "Polarmuseet, Tromsø, Norway", 69.6522, 18.9633, 60, ["history"]],
    ["Tromsø Museum", "Tromsø Museum, Tromsø, Norway", 69.6349, 18.912, 75, ["history"]],
    ["Mack Brewery", "Ludwig Mack Brygghus, Tromsø, Norway", 69.6459, 18.9503, 60, ["drinks"]]
  ]},
  {"id": "reykjavik", "name": "Reykjavík", "region": "Northern Europe and British Isles", "country": "Iceland", "cc": "is", "aka": ["Reykjavik"], "area": "Capital Region", "tender": "pier", "left": false, "address": "Reykjavík cruise port, Iceland", "lat": 64.1564, "lon": -21.8667, "stops": [
    ["Hallgrímskirkja", "1 Hallgrímstorg, Reykjavik, Iceland", 64.1418, -21.9267, 45, ["history", "scenic"]],
    ["Harpa", "2 Austurbakki, Reykjavik, Iceland", 64.1504, -21.9329, 45, ["music", "art"]],
    ["Blue Lagoon", "Blue Lagoon, Grindavík, Iceland", 63.8792, -22.4443, 180, ["spa"]],
    ["Þingvellir National Park", "Þingvellir National Park, Bláskógabyggð, Iceland", 64.2786, -21.0819, 150, ["parks", "history", "hiking"]],
    ["Gullfoss", "Gullfoss, Bláskógabyggð, Iceland", 64.3145, -20.1496, 90, ["waterfalls"]],
    ["Perlan", "1 Varmahlíð, Reykjavik, Iceland", 64.1292, -21.919, 90, ["scenic", "family"]],
    ["Sun Voyager", "Sun Voyager, Reykjavik, Iceland", 64.1476, -21.9223, 15, ["art"]]
  ]},
  {"id": "amsterdam", "name": "Amsterdam", "region": "Northern Europe and British Isles", "country": "Netherlands", "cc": "nl", "aka": [], "area": "North Holland", "tender": "pier", "left": false, "address": "Amsterdam cruise port, Netherlands", "lat": 52.3778, "lon": 4.9153, "stops": [
    ["Rijksmuseum", "Rijksmuseum, Amsterdam, Netherlands", 52.3598, 4.885, 150, ["art"]],
    ["Van Gogh Museum", "7 Paulus Potterstraat, Amsterdam, Netherlands", 52.3584, 4.8811, 120, ["art"]],
    ["Anne Frank House", "267 Prinsengracht, Amsterdam, Netherlands", 52.3752, 4.8841, 90, ["history"]],
    ["Jordaan", "Jordaan, Amsterdam, Netherlands", 52.3754, 4.8811, 90, ["town"]],
    ["Vondelpark", "Vondelpark, Amsterdam, Netherlands", 52.3572, 4.8641, 60, ["parks"]],
    ["Zaanse Schans", "Zaanse Schans, Zaandam, Netherlands", 52.4751, 4.818, 120, ["history", "town"]],
    ["Keukenhof", "Keukenhof, Lisse, Netherlands", 52.2682, 4.5506, 150, ["gardens"]],
    ["Albert Cuyp Market", "1073 Albert Cuypstraat, Amsterdam, Netherlands", 52.3552, 4.8918, 60, ["markets", "food"]]
  ]},
  {"id": "rotterdam", "name": "Rotterdam", "region": "Northern Europe and British Isles", "country": "Netherlands", "cc": "nl", "aka": [], "area": "South Holland", "tender": "pier", "left": false, "address": "Rotterdam cruise port, Netherlands", "lat": 51.906, "lon": 4.487, "stops": [
    ["Kinderdijk", "Kinderdijk, Netherlands", 51.8887, 4.6357, 120, ["history", "scenic"]],
    ["Kubuswoningen", "Kubuswoningen, Rotterdam, Netherlands", 51.9204, 4.4901, 30, ["art"]],
    ["Euromast", "Euromast, Rotterdam, Netherlands", 51.9083, 4.4673, 60, ["scenic"]],
    ["SS Rotterdam", "25 3e Katendrechtsehoofd, Rotterdam, Netherlands", 51.8978, 4.4733, 60, ["history"]],
    ["Erasmusbrug", "Erasmus Bridge, Rotterdam, Netherlands", 51.9096, 4.4855, 15, ["scenic"]],
    ["Markt square, Delft", "Markt, Delft, Netherlands", 52.0117, 4.3592, 120, ["town", "history"]]
  ]},
  {"id": "zeebrugge", "name": "Zeebrugge (Bruges)", "region": "Northern Europe and British Isles", "country": "Belgium", "cc": "be", "aka": ["Bruges", "Brugge", "Brussels"], "area": "Lissewege, Bruges, Brugge, West Flanders, Flanders", "tender": "pier", "left": false, "address": "Zeebrugge cruise port, Belgium", "lat": 51.3353, "lon": 3.2086, "stops": [
    ["Markt square, Bruges", "Markt, Bruges, Belgium", 51.2087, 3.2244, 60, ["history", "town"]],
    ["Belfry of Bruges", "Belfry, Bruges, Belgium", 51.2082, 3.2248, 60, ["history", "scenic"]],
    ["Basilica of the Holy Blood", "13 Burg, Bruges, Belgium", 51.2081, 3.2267, 30, ["history"]],
    ["Groeningemuseum", "12 Dijver, Bruges, Belgium", 51.2059, 3.2258, 75, ["art"]],
    ["Gravensteen", "11 Sint-Veerleplein, Ghent, Belgium", 51.0572, 3.7208, 120, ["history"]],
    ["Minnewater", "Minnewater, Bruges, Belgium", 51.1995, 3.224, 30, ["parks", "scenic"]]
  ]},
  {"id": "le-havre", "name": "Le Havre (Normandy)", "region": "Northern Europe and British Isles", "country": "France", "cc": "fr", "aka": ["Normandy", "Le Havre"], "area": "Seine-Maritime, Normandy, Metropolitan France", "tender": "pier", "left": false, "address": "Le Havre cruise port, France", "lat": 49.4809, "lon": 0.1077, "stops": [
    ["Falaise d'Aval", "Falaise D'Aval, Étretat, France", 49.7073, 0.1936, 120, ["scenic", "hiking"]],
    ["Honfleur", "Honfleur, France", 49.4197, 0.2339, 120, ["town", "art"]],
    ["Rouen Cathedral", "Cathédrale Notre-Dame, Rouen, France", 49.4403, 1.0948, 75, ["history"]],
    ["Musée d'art moderne André Malraux", "Musée d'Art Moderne André Malraux, Le Havre, France", 49.485, 0.1026, 75, ["art"]],
    ["Église Saint-Joseph", "130 Boulevard François 1er, Le Havre, France", 49.491, 0.1012, 30, ["history", "art"]],
    ["Normandy American Cemetery and Memorial", "Normandy American Cemetery and Memorial, Colleville-sur-Mer, France", 49.3586, -0.8547, 90, ["history"]]
  ]},
  {"id": "hamburg", "name": "Hamburg", "region": "Northern Europe and British Isles", "country": "Germany", "cc": "de", "aka": [], "area": "", "tender": "pier", "left": false, "address": "Hamburg cruise port, Germany", "lat": 53.5389, "lon": 9.9974, "stops": [
    ["Miniatur Wunderland", "2-4 Kehrwieder, Hamburg, Germany", 53.5438, 9.9889, 150, ["family"]],
    ["Elbphilharmonie", "1 Platz der Deutschen Einheit, Hamburg, Germany", 53.5413, 9.9842, 60, ["music", "scenic"]],
    ["Speicherstadt", "Speicherstadt, Hamburg, Germany", 53.544, 9.987, 60, ["history", "town"]],
    ["St. Michael's Church", "1A Englische Planke, Hamburg, Germany", 53.5484, 9.9789, 45, ["history", "scenic"]],
    ["Planten un Blomen", "Planten un Blomen, Hamburg, Germany", 53.562, 9.9813, 60, ["gardens", "parks"]],
    ["Fischmarkt", "Fischmarkt, Hamburg, Germany", 53.5459, 9.9522, 45, ["markets", "food"]],
    ["Tierpark Hagenbeck", "2 Lokstedter Grenzstraße, Hamburg, Germany", 53.5968, 9.9381, 150, ["wildlife", "family"]]
  ]},
  {"id": "warnemunde", "name": "Warnemünde (Rostock)", "region": "Northern Europe and British Isles", "country": "Germany", "cc": "de", "aka": ["Warnemunde", "Rostock"], "area": "Seebad Warnemünde, Rostock, Mecklenburg-Vorpommern", "tender": "pier", "left": false, "address": "Warnemünde cruise port, Germany", "lat": 54.1744, "lon": 12.0943, "stops": [
    ["Leuchtturm Warnemünde", "3 Seepromenade, Rostock, Germany", 54.1814, 12.0858, 30, ["lighthouses"]],
    ["St. Mary's Church", "3 Bei der Marienkirche, Rostock, Germany", 54.0895, 12.1388, 60, ["history"]],
    ["Schwerin Castle", "1 Lennéstraße, Schwerin, Germany", 53.6245, 11.4182, 120, ["history", "gardens"]],
    ["Doberaner Münster", "Doberaner Münster, Bad Doberan, Germany", 54.1077, 11.9098, 45, ["history"]],
    ["Molli", "Mecklenburgische Bäderbahn Molli, Bad Doberan, Germany", 54.1133, 11.8986, 90, ["history", "scenic"]],
    ["Warnemünde Beach", "Active Beach Warnemünde, Rostock, Germany", 54.1796, 12.0749, 120, ["beach"]],
    ["Heiligendamm", "Heiligendamm, Bad Doberan, Germany", 54.1424, 11.8422, 75, ["beach", "town"]]
  ]},
  {"id": "riga", "name": "Riga", "region": "Northern Europe and British Isles", "country": "Latvia", "cc": "lv", "aka": [], "area": "", "tender": "unknown", "left": false, "address": "Riga cruise port, Latvia", "lat": 56.9494, "lon": 24.1052, "stops": [
    ["House of the Blackheads", "7 Mazā Grēcinieku iela, Riga, Latvia", 56.9472, 24.1068, 45, ["history"]],
    ["Riga Cathedral", "6 Herdera laukums, Riga, Latvia", 56.9491, 24.1047, 45, ["history", "music"]],
    ["St. Peter's Church", "1 Reformation Square, Riga, Latvia", 56.9475, 24.1093, 45, ["history", "scenic"]],
    ["Riga Central Market", "Central Market, Riga, Latvia", 56.9442, 24.1146, 60, ["markets", "food"]],
    ["Alberta iela", "Alberta iela, Baloži, Latvia", 56.8681, 24.1273, 60, ["art", "history"]],
    ["Freedom Monument", "Freedom Monument, Riga, Latvia", 56.9515, 24.1134, 15, ["history"]],
    ["Jūrmala", "Jūrmala, Latvia", 56.9727, 23.7887, 120, ["beach", "town"]],
    ["Latvian Ethnographic Open-Air Museum", "Latvian Ethnographic Open-Air Museum, Berģi, Latvia", 56.9906, 24.2802, 120, ["history"]]
  ]},
  {"id": "gdynia", "name": "Gdynia (Gdańsk)", "region": "Northern Europe and British Isles", "country": "Poland", "cc": "pl", "aka": ["Gdansk", "Gdańsk", "Gdynia"], "area": "Pomeranian Voivodeship", "tender": "unknown", "left": false, "address": "Gdynia cruise port, Poland", "lat": 54.5165, "lon": 18.5403, "stops": [
    ["Long Market", "Long Market, Gdańsk, Poland", 54.3483, 18.6538, 90, ["history", "town"]],
    ["St. Mary's Church", "5 Podkramarska, Gdańsk, Poland", 54.3498, 18.653, 45, ["history", "scenic"]],
    ["European Solidarity Centre", "1 Plac Solidarności, Gdańsk, Poland", 54.3614, 18.6494, 90, ["history"]],
    ["Museum of the Second World War", "1 Plac Władysława Bartoszewskiego, Gdańsk, Poland", 54.3559, 18.6611, 120, ["history"]],
    ["Malbork Castle", "Malbork Castle, Malbork County, Poland", 54.04, 19.0278, 180, ["history"]],
    ["Sopot Pier", "Sopot Pier, Sopot, Poland", 54.4474, 18.5747, 60, ["scenic", "beach", "town"]],
    ["Westerplatte", "Westerplatte, Gdańsk, Poland", 54.4093, 18.67, 60, ["history"]],
    ["ORP Błyskawica", "ORP Błyskawica, Gdynia, Poland", 54.5196, 18.5512, 45, ["history"]]
  ]},
  {"id": "dublin", "name": "Dublin", "region": "Northern Europe and British Isles", "country": "Ireland", "cc": "ie", "aka": [], "area": "County Dublin, Leinster", "tender": "unknown", "left": true, "address": "Dublin cruise port, Ireland", "lat": 53.3494, "lon": -6.2606, "stops": [
    ["Trinity College Dublin", "Trinity College Dublin, Dublin, Ireland", 53.3437, -6.2544, 75, ["history"]],
    ["Guinness Storehouse", "Guinness Storehouse, Dublin, Ireland", 53.3419, -6.2867, 120, ["drinks"]],
    ["Dublin Castle", "Dublin Castle, Dublin, Ireland", 53.3427, -6.267, 60, ["history"]],
    ["St. Patrick's Cathedral", "Saint Patrick's Cathedral, Dublin, Ireland", 53.3396, -6.2715, 45, ["history"]],
    ["Temple Bar", "Temple Bar, Dublin, Ireland", 53.3455, -6.2631, 60, ["music", "food", "town"]],
    ["Kilmainham Gaol", "Kilmainham Gaol, Dublin, Ireland", 53.3417, -6.3096, 90, ["history"]],
    ["Glendalough", "Glendalough, The Municipal District of Wicklow, Ireland", 53.0113, -6.3261, 180, ["history", "hiking", "scenic"]],
    ["Howth", "Howth, Ireland", 53.3858, -6.0651, 120, ["town", "food", "hiking"]]
  ]},
  {"id": "cobh", "name": "Cobh (Cork)", "region": "Northern Europe and British Isles", "country": "Ireland", "cc": "ie", "aka": ["Cork", "Cobh"], "area": "County Cork, Munster", "tender": "varies", "left": true, "address": "Cobh cruise port, Ireland", "lat": 51.8502, "lon": -8.2951, "stops": [
    ["Blarney Castle", "Blarney Castle, Cork, Ireland", 51.9291, -8.5709, 120, ["history", "gardens"]],
    ["Titanic Experience Cobh", "Titanic Experience, Municipal District of Cobh, Ireland", 51.85, -8.2948, 60, ["history"]],
    ["St. Colman's Cathedral", "St.Colman's Cathedral, Cobh, Ireland", 51.8515, -8.2938, 30, ["history"]],
    ["Spike Island", "Spike Island, County Cork, Ireland", 51.8342, -8.2857, 180, ["history"]],
    ["Fota Wildlife Park", "Fota Wildlife Park, Municipal District of Cobh, Ireland", 51.8925, -8.3132, 120, ["wildlife", "family"]],
    ["Jameson Distillery Midleton", "Jameson Distillery Midleton, The Municipal District of East Cork, Ireland", 51.9138, -8.1683, 90, ["drinks", "history"]],
    ["Kinsale", "Kinsale, Ireland", 51.7057, -8.523, 120, ["town", "food"]],
    ["English Market", "24 Grand Parade, Cork, Ireland", 51.8977, -8.4745, 45, ["markets", "food"]]
  ]},
  {"id": "belfast", "name": "Belfast", "region": "Northern Europe and British Isles", "country": "Northern Ireland, United Kingdom", "cc": "gb", "aka": [], "area": "County Antrim, Northern Ireland, United Kingdom, UK, Great Britain, Britain", "tender": "pier", "left": true, "address": "Belfast cruise port, Northern Ireland, United Kingdom", "lat": 54.6257, "lon": -5.8843, "stops": [
    ["Titanic Belfast", "1 Olympic Way Queens Road, Belfast City District, United Kingdom", 54.6081, -5.9098, 120, ["history"]],
    ["Giant's Causeway", "Giant's Causeway, Causeway Coast and Glens District, United Kingdom", 55.2407, -6.5115, 150, ["scenic", "hiking"]],
    ["Carrick-a-Rede Rope Bridge", "Carrick-a-rede Rope Bridge, Ballintoy, United Kingdom", 55.2395, -6.3324, 75, ["scenic"]],
    ["Belfast City Hall", "Belfast City Hall, Belfast City District, United Kingdom", 54.5964, -5.9295, 45, ["history"]],
    ["St George's Market", "12-20 East Bridge Street, Belfast City District, United Kingdom", 54.5959, -5.922, 60, ["markets", "food"]],
    ["Crumlin Road Gaol", "53-55 Crumlin Road, Belfast City District, United Kingdom", 54.6095, -5.9422, 75, ["history"]],
    ["Ulster Museum", "Ulster Museum, Belfast City District, United Kingdom", 54.5822, -5.9353, 90, ["history", "art"]],
    ["The Dark Hedges", "The Dark Hedges, Causeway Coast and Glens District, United Kingdom", 55.1347, -6.3816, 20, ["scenic"]],
    ["Carrickfergus Castle", "Carrickfergus Castle, Carrickfergus, United Kingdom", 54.7134, -5.8065, 60, ["history"]]
  ]},
  {"id": "edinburgh", "name": "Edinburgh (Leith and South Queensferry)", "region": "Northern Europe and British Isles", "country": "Scotland, United Kingdom", "cc": "gb", "aka": ["Edinburgh", "Leith", "South Queensferry", "Rosyth"], "area": "City of Edinburgh, Scotland, United Kingdom, UK, Great Britain, Britain", "tender": "varies", "left": true, "address": "Edinburgh cruise port, Scotland, United Kingdom", "lat": 55.9804, "lon": -3.1816, "stops": [
    ["Edinburgh Castle", "Edinburgh Castle, Edinburgh, United Kingdom", 55.9487, -3.2004, 120, ["history"]],
    ["Palace of Holyroodhouse", "Palace of Holyroodhouse, Edinburgh, United Kingdom", 55.9527, -3.1716, 75, ["history"]],
    ["Arthur's Seat", "Arthur's Seat, Edinburgh, United Kingdom", 55.9441, -3.1616, 120, ["hiking", "scenic"]],
    ["Royal Yacht Britannia", "100 Ocean Drive, Edinburgh, United Kingdom", 55.9821, -3.1773, 90, ["history"]],
    ["Forth Bridge", "Forth Bridge, North Queensferry, United Kingdom", 55.9998, -3.3883, 20, ["scenic", "history"]],
    ["National Museum of Scotland", "National Museum of Scotland, Edinburgh, United Kingdom", 55.9471, -3.1893, 90, ["history", "family"]],
    ["Royal Botanic Garden Edinburgh", "Royal Botanic Garden Edinburgh, Edinburgh, United Kingdom", 55.9653, -3.2089, 90, ["gardens"]],
    ["Rosslyn Chapel", "Rosslyn Chapel, Roslin, United Kingdom", 55.8554, -3.1599, 60, ["history"]]
  ]},
  {"id": "invergordon", "name": "Invergordon (Inverness)", "region": "Northern Europe and British Isles", "country": "Scotland, United Kingdom", "cc": "gb", "aka": ["Inverness", "Loch Ness"], "area": "Highland, Scotland, United Kingdom, UK, Great Britain, Britain", "tender": "varies", "left": true, "address": "Invergordon cruise port, Scotland, United Kingdom", "lat": 57.6848, "lon": -4.1699, "stops": [
    ["Urquhart Castle", "Urquhart Castle, Lewiston, United Kingdom", 57.3252, -4.4425, 120, ["history", "scenic"]],
    ["Culloden Battlefield", "Culloden Battlefield, Newlands of Culloden, United Kingdom", 57.4765, -4.1001, 90, ["history"]],
    ["Cawdor Castle", "Cawdor Castle, Cawdor, United Kingdom", 57.5242, -3.9266, 90, ["history", "gardens"]],
    ["Fort George", "Fort George, Fortrose, United Kingdom", 57.5838, -4.0703, 75, ["history"]],
    ["Clava Cairns", "Balnuaran of Clava, Newlands of Culloden, United Kingdom", 57.4731, -4.0737, 30, ["history"]],
    ["Glenmorangie Distillery", "Glenmorangie Distillery and Visitor Centre, Tain, United Kingdom", 57.8236, -4.0718, 75, ["drinks"]],
    ["Dunrobin Castle", "Dunrobin Castle, Doll, United Kingdom", 57.9817, -3.9454, 90, ["history", "gardens"]]
  ]},
  {"id": "kirkwall", "name": "Kirkwall, Orkney", "region": "Northern Europe and British Isles", "country": "Scotland, United Kingdom", "cc": "gb", "aka": ["Orkney", "Kirkwall"], "area": "Orkney Islands, Scotland, United Kingdom, UK, Great Britain, Britain", "tender": "varies", "left": true, "address": "Kirkwall cruise port, Orkney, Scotland, United Kingdom", "lat": 58.9817, "lon": -2.9603, "stops": [
    ["Skara Brae", "Skara Brae, Orkney Islands, United Kingdom", 59.0487, -3.3418, 90, ["history"]],
    ["Ring of Brodgar", "Ring of Brodgar, Clouston, United Kingdom", 59.0016, -3.2299, 45, ["history", "scenic"]],
    ["St Magnus Cathedral", "Saint Magnus Cathedral, Kirkwall, United Kingdom", 58.9814, -2.9596, 45, ["history"]],
    ["Italian Chapel", "The Italian Chapel, St Mary's, United Kingdom", 58.8899, -2.8894, 30, ["history", "art"]],
    ["Highland Park Distillery", "Highland Park Distillery, Kirkwall, United Kingdom", 58.9691, -2.9561, 75, ["drinks"]],
    ["Maeshowe", "Maes Howe, Bimbister, United Kingdom", 58.9965, -3.1882, 60, ["history"]],
    ["Standing Stones of Stenness", "Stones of Stenness, Stenness, United Kingdom", 58.994, -3.2081, 20, ["history"]]
  ]},
  {"id": "greenock", "name": "Greenock (Glasgow)", "region": "Northern Europe and British Isles", "country": "Scotland, United Kingdom", "cc": "gb", "aka": ["Glasgow", "Greenock"], "area": "Inverclyde, Scotland, United Kingdom, UK, Great Britain, Britain", "tender": "pier", "left": true, "address": "Greenock cruise port, Scotland, United Kingdom", "lat": 55.9513, "lon": -4.7559, "stops": [
    ["Kelvingrove Art Gallery and Museum", "Kelvingrove Art Gallery and Museum, Glasgow, United Kingdom", 55.8686, -4.2906, 120, ["art", "history"]],
    ["Loch Lomond Shores", "Loch Lomond Shores, Balloch, United Kingdom", 56.0059, -4.5922, 150, ["scenic", "water"]],
    ["Riverside Museum", "100 Pointhouse Place, Glasgow, United Kingdom", 55.8652, -4.3062, 90, ["history", "family"]],
    ["Stirling Castle", "Stirling Castle, Stirling, United Kingdom", 56.124, -3.948, 150, ["history"]],
    ["Glasgow Necropolis", "Glasgow Necropolis, Glasgow, United Kingdom", 55.8627, -4.2308, 45, ["history"]],
    ["Inveraray Castle", "Inveraray Castle, Inveraray, United Kingdom", 56.2375, -5.0735, 90, ["history"]],
    ["Newark Castle", "Newark Castle, Port Glasgow, United Kingdom", 55.9345, -4.6778, 30, ["history"]]
  ]},
  {"id": "liverpool", "name": "Liverpool", "region": "Northern Europe and British Isles", "country": "England, United Kingdom", "cc": "gb", "aka": [], "area": "Liverpool City Region, England, United Kingdom, UK, Great Britain, Britain", "tender": "pier", "left": true, "address": "Liverpool cruise port, England, United Kingdom", "lat": 53.4067, "lon": -2.9984, "stops": [
    ["The Beatles Story", "The Beatles Story, Liverpool, United Kingdom", 53.3993, -2.9921, 90, ["music"]],
    ["Royal Albert Dock", "Royal Albert Dock, Liverpool, United Kingdom", 53.4001, -2.9925, 60, ["town", "history"]],
    ["Liverpool Cathedral", "Liverpool Cathedral, Liverpool, United Kingdom", 53.3973, -2.9732, 60, ["history"]],
    ["The Cavern Club", "Cavern Club, Liverpool, United Kingdom", 53.4063, -2.9879, 60, ["music"]],
    ["Museum of Liverpool", "Museum of Liverpool, Liverpool, United Kingdom", 53.403, -2.9956, 90, ["history"]],
    ["Chester Cathedral", "Chester Cathedral, Chester, United Kingdom", 53.192, -2.8907, 150, ["history", "town"]],
    ["Speke Hall", "Speke Hall, Liverpool, United Kingdom", 53.3368, -2.8742, 75, ["history", "gardens"]],
    ["World Museum", "World Museum Liverpool, Liverpool, United Kingdom", 53.4098, -2.9818, 90, ["history", "family"]]
  ]},
  {"id": "sydney", "name": "Sydney", "region": "Asia and Pacific", "country": "Australia", "cc": "au", "aka": [], "area": "New South Wales, NSW", "tender": "pier", "left": true, "address": "Sydney cruise port, Australia", "lat": -33.8617, "lon": 151.1863, "stops": [
    ["Sydney Opera House", "2 Macquarie Street, Sydney, Australia", -33.8572, 151.2151, 60, ["music", "art"]],
    ["Sydney Harbour Bridge", "Sydney Harbour Bridge, Sydney, Australia", -33.855, 151.2092, 60, ["scenic"]],
    ["The Rocks", "The Rocks, Sydney, Australia", -33.86, 151.2083, 75, ["history", "town", "markets"]],
    ["Royal Botanic Garden Sydney", "Royal Botanic Garden, Sydney, Australia", -33.8628, 151.2157, 75, ["gardens"]],
    ["Bondi Beach", "Bondi Beach, Sydney, Australia", -33.8907, 151.2724, 150, ["beach"]],
    ["Taronga Zoo", "Taronga Zoo, Sydney, Australia", -33.8464, 151.2396, 180, ["wildlife", "family"]],
    ["Manly Beach", "Manly Beach, Sydney, Australia", -33.7977, 151.2889, 150, ["beach", "town"]],
    ["Three Sisters", "Three Sisters, Katoomba, Australia", -33.7354, 150.315, 240, ["scenic", "hiking"]],
    ["Darling Harbour", "Darling Harbour, Sydney, Australia", -33.8676, 151.1996, 60, ["town", "family"]]
  ]},
  {"id": "melbourne", "name": "Melbourne", "region": "Asia and Pacific", "country": "Australia", "cc": "au", "aka": [], "area": "Victoria, VIC", "tender": "unknown", "left": true, "address": "Melbourne cruise port, Australia", "lat": -37.8142, "lon": 144.9632, "stops": [
    ["Federation Square", "Federation Square, Melbourne, Australia", -37.8177, 144.9692, 45, ["art", "town"]],
    ["Queen Victoria Market", "Queen Victoria Market, Melbourne, Australia", -37.8074, 144.9574, 75, ["markets", "food"]],
    ["Royal Botanic Gardens Victoria", "Royal Botanic Gardens, Melbourne, Australia", -37.8295, 144.9813, 90, ["gardens"]],
    ["St Kilda Beach", "St Kilda Beach, Melbourne, Australia", -37.8681, 144.9742, 90, ["beach"]],
    ["Hosier Lane", "Hosier Lane, Melbourne, Australia", -37.8163, 144.9691, 20, ["art"]],
    ["National Gallery of Victoria", "130-180 St Kilda Road, Melbourne, Australia", -37.8229, 144.9687, 120, ["art"]],
    ["Puffing Billy Railway", "Puffing Billy Railway, Melbourne, Australia", -37.9071, 145.357, 180, ["scenic", "history", "family"]],
    ["Healesville Sanctuary", "Healesville Sanctuary, Melbourne, Australia", -37.6865, 145.5243, 150, ["wildlife"]],
    ["Melbourne Zoo", "1 Elliott Avenue, Melbourne, Australia", -37.7848, 144.9515, 150, ["wildlife", "family"]]
  ]},
  {"id": "brisbane", "name": "Brisbane", "region": "Asia and Pacific", "country": "Australia", "cc": "au", "aka": [], "area": "Queensland, QLD", "tender": "pier", "left": true, "address": "Brisbane cruise port, Australia", "lat": -27.4407, "lon": 153.0706, "stops": [
    ["Lone Pine Koala Sanctuary", "708 Jesmond Road, Brisbane, Australia", -27.5352, 152.9684, 150, ["wildlife", "family"]],
    ["South Bank Parklands", "South Bank Parklands, Brisbane, Australia", -27.4776, 153.0224, 90, ["parks", "town", "beach"]],
    ["Mount Coot-tha Lookout", "Mt Coot-Tha Lookout, Brisbane, Australia", -27.485, 152.959, 45, ["scenic"]],
    ["Story Bridge", "Story Bridge, Brisbane, Australia", -27.4637, 153.0357, 20, ["scenic"]],
    ["Queensland Museum", "Queensland Museum, Brisbane, Australia", -27.4728, 153.018, 90, ["history", "family"]],
    ["Gallery of Modern Art", "Gallery of Modern Art, Brisbane, Australia", -27.4705, 153.0171, 90, ["art"]],
    ["City Botanic Gardens", "City Botanic Gardens Riverwalk, Brisbane, Australia", -27.4728, 153.0313, 60, ["gardens"]],
    ["Australia Zoo", "1638 Steve Irwin Way, Landsborough, Australia", -26.8339, 152.9651, 240, ["wildlife", "family"]]
  ]},
  {"id": "auckland", "name": "Auckland", "region": "Asia and Pacific", "country": "New Zealand", "cc": "nz", "aka": [], "area": "Waitematā, Auckland, NZ", "tender": "pier", "left": true, "address": "Auckland cruise port, New Zealand", "lat": -36.8405, "lon": 174.7658, "stops": [
    ["Sky Tower", "Sky Tower, Auckland, New Zealand", -36.8485, 174.7622, 60, ["scenic"]],
    ["Auckland War Memorial Museum", "Auckland War Memorial Museum, Auckland, New Zealand", -36.8608, 174.7778, 120, ["history"]],
    ["Waiheke Island", "Waiheke Island, Waiheke, New Zealand", -36.7931, 175.0884, 300, ["drinks", "beach", "food"]],
    ["Maungawhau", "Maungawhau, Auckland, New Zealand", -36.8677, 174.7585, 60, ["scenic", "hiking"]],
    ["Piha Beach", "North Piha Beach, Waitākere Ranges, New Zealand", -36.9443, 174.4634, 150, ["beach", "scenic"]],
    ["Auckland Domain", "Auckland Domain, Auckland, New Zealand", -36.859, 174.776, 60, ["parks", "gardens"]],
    ["Kelly Tarlton's Sea Life Aquarium", "23 Tāmaki Drive, Ōrākei, New Zealand", -36.8462, 174.8172, 120, ["wildlife", "family"]],
    ["Devonport", "Devonport, Devonport-Takapuna, New Zealand", -36.8297, 174.7975, 90, ["town"]],
    ["Rangitoto Island", "Rangitoto Island, Waiheke, New Zealand", -36.7861, 174.8611, 240, ["hiking", "scenic"]]
  ]},
  {"id": "wellington", "name": "Wellington", "region": "Asia and Pacific", "country": "New Zealand", "cc": "nz", "aka": [], "area": "Wellington City, Wellington, NZ", "tender": "unknown", "left": true, "address": "Wellington cruise port, New Zealand", "lat": -41.2888, "lon": 174.7772, "stops": [
    ["Te Papa", "55 Cable Street, Wellington, New Zealand", -41.2903, 174.7819, 150, ["history", "art", "family"]],
    ["Wellington Cable Car", "Wellington Cable Car, Wellington, New Zealand", -41.2845, 174.7733, 30, ["scenic"]],
    ["Zealandia", "Zealandia, Wellington, New Zealand", -41.2917, 174.7522, 150, ["wildlife", "hiking"]],
    ["Mount Victoria Lookout", "Mount Victoria Lookout, Wellington, New Zealand", -41.296, 174.7943, 30, ["scenic"]],
    ["Wellington Botanic Garden", "Wellington Botanic Garden, Wellington, New Zealand", -41.2826, 174.7679, 60, ["gardens"]],
    ["Wētā Cave", "The Wētā Cave, Wellington, New Zealand", -41.3063, 174.8243, 60, ["art", "family"]],
    ["Beehive", "The Beehive, Wellington, New Zealand", -41.2784, 174.7766, 45, ["history"]],
    ["Cuba Street", "Cuba Street, Wellington, New Zealand", -41.2906, 174.7772, 60, ["town", "food"]]
  ]},
  {"id": "singapore", "name": "Singapore", "region": "Asia and Pacific", "country": "Singapore", "cc": "sg", "aka": [], "area": "", "tender": "pier", "left": true, "address": "Singapore cruise port, Singapore", "lat": 1.2639, "lon": 103.8184, "stops": [
    ["Gardens by the Bay", "Gardens by the Bay, Singapore", 1.2811, 103.865, 120, ["gardens"]],
    ["Marina Bay Sands", "10 Bayfront Avenue, Singapore", 1.2837, 103.8607, 60, ["scenic"]],
    ["Singapore Botanic Gardens", "Singapore Botanic Gardens, Singapore", 1.3146, 103.8156, 90, ["gardens"]],
    ["Universal Studios Singapore", "30 Sentosa Gateway, Singapore", 1.2542, 103.8227, 300, ["themeparks", "family"]],
    ["Singapore Zoo", "80 Mandai Lake Road, Singapore", 1.4037, 103.794, 180, ["wildlife", "family"]],
    ["Chinatown", "Chinatown, Singapore", 1.28, 103.8437, 90, ["town", "food", "markets"]],
    ["Merlion Park", "Merlion Park, Singapore", 1.2857, 103.8542, 20, ["scenic", "art"]],
    ["Little India", "Little India, Singapore", 1.308, 103.8518, 75, ["town", "food", "markets"]],
    ["Lau Pa Sat", "18 Raffles Quay, Singapore", 1.2806, 103.8505, 60, ["food"]]
  ]},
  {"id": "hong-kong", "name": "Hong Kong", "region": "Asia and Pacific", "country": "Hong Kong", "cc": "hk", "aka": [], "area": "China", "tender": "pier", "left": true, "address": "Hong Kong cruise port, Hong Kong", "lat": 22.3059, "lon": 114.2135, "stops": [
    ["Victoria Peak", "Victoria Peak, Hong Kong", 22.276, 114.1455, 120, ["scenic"]],
    ["Star Ferry Pier", "Tsim Sha Tsui Star Ferry Pier, Hong Kong", 22.2936, 114.168, 30, ["scenic", "water"]],
    ["Temple Street Night Market", "Temple Street Night Market, Hong Kong", 22.3064, 114.17, 60, ["markets", "food"]],
    ["Man Mo Temple", "124-126 Hollywood Road, Hong Kong", 22.2839, 114.1502, 30, ["history"]],
    ["Hong Kong Park", "Hong Kong Park, Hong Kong", 22.2774, 114.1615, 60, ["parks", "gardens"]],
    ["Avenue of Stars", "Avenue of Stars, Hong Kong", 22.2941, 114.1758, 30, ["scenic"]],
    ["Ocean Park", "Ocean Park Hong Kong, Hong Kong", 22.2348, 114.1708, 300, ["themeparks", "family", "wildlife"]],
    ["Wong Tai Sin Temple", "Wong Tai Sin Temple, Hong Kong", 22.3428, 114.1936, 45, ["history"]]
  ]},
  {"id": "yokohama", "name": "Yokohama (Tokyo)", "region": "Asia and Pacific", "country": "Japan", "cc": "jp", "aka": ["Tokyo"], "area": "Kanagawa Prefecture", "tender": "unknown", "left": true, "address": "Yokohama cruise port, Japan", "lat": 35.4503, "lon": 139.6344, "stops": [
    ["Sankeien", "Sankeien Tenmangu Shrine, Yokohama, Japan", 35.417, 139.6606, 90, ["gardens", "history"]],
    ["Yokohama Chinatown", "Yokohama Chinatown, Yokohama, Japan", 35.4427, 139.6452, 90, ["food", "town"]],
    ["Yokohama Landmark Tower", "Yokohama Landmark Tower, Yokohama, Japan", 35.4546, 139.6315, 60, ["scenic"]],
    ["Kōtoku-in", "Kōtoku-in, Kamakura, Japan", 35.3168, 139.536, 90, ["history"]],
    ["Tsurugaoka Hachimangū", "Tsurugaoka Hachiman Shrine, Kamakura, Japan", 35.3252, 139.5562, 60, ["history"]],
    ["Sensō-ji", "Sensō-ji, Taito, Japan", 35.7134, 139.7955, 90, ["history"]],
    ["Meiji Jingu", "Meiji Jingu Main Shrine, Shibuya, Japan", 35.6748, 139.6996, 75, ["history", "parks"]],
    ["Cup Noodles Museum Yokohama", "Cupnoodles Museum, Yokohama, Japan", 35.4555, 139.6389, 90, ["family", "food"]],
    ["Tokyo Skytree", "Tokyo Skytree, Sumida, Japan", 35.7101, 139.8107, 90, ["scenic"]]
  ]},
  {"id": "kobe", "name": "Kobe (Osaka and Kyoto)", "region": "Asia and Pacific", "country": "Japan", "cc": "jp", "aka": ["Osaka", "Kyoto", "Kobe"], "area": "Hyogo Prefecture", "tender": "pier", "left": true, "address": "Kobe cruise port, Japan", "lat": 34.6804, "lon": 135.2029, "stops": [
    ["Himeji Castle", "Himeji Castle, Himeji, Japan", 34.8393, 134.694, 150, ["history"]],
    ["Osaka Castle", "Osaka Castle, Osaka, Japan", 34.6872, 135.5254, 120, ["history"]],
    ["Fushimi Inari-taisha", "Fushimi Inari-taisha, Kyoto, Japan", 34.9675, 135.7797, 120, ["history", "hiking"]],
    ["Kiyomizu-dera", "Kiyomizu-dera, Kyoto, Japan", 34.9943, 135.7844, 90, ["history", "scenic"]],
    ["Kinkaku-ji", "Kinkaku-ji, Kyoto, Japan", 35.0395, 135.7295, 60, ["history", "gardens"]],
    ["Nunobiki Herb Gardens", "Kobe Nunobiki Herb Garden, Kobe, Japan", 34.7151, 135.1923, 90, ["gardens", "scenic"]],
    ["Dōtonbori", "Dōtonbori, Osaka, Japan", 34.669, 135.5016, 90, ["food", "town"]],
    ["Ikuta Shrine", "Ikuta Shrine, Kobe, Japan", 34.6946, 135.1906, 30, ["history"]]
  ]},
  {"id": "busan", "name": "Busan", "region": "Asia and Pacific", "country": "South Korea", "cc": "kr", "aka": [], "area": "", "tender": "pier", "left": false, "address": "Busan cruise port, South Korea", "lat": 35.0836, "lon": 129.0828, "stops": [
    ["Gamcheon Culture Village", "Gamcheon Culture Village, Busan, South Korea", 35.0963, 129.0088, 90, ["art", "town"]],
    ["Haedong Yonggungsa", "Haedong Yonggungsa, Busan, South Korea", 35.1884, 129.223, 75, ["history", "scenic"]],
    ["Jagalchi Market", "Jagalchi Market, Busan, South Korea", 35.0967, 129.031, 60, ["food", "markets"]],
    ["Haeundae Beach", "Haeundae Beach, Busan, South Korea", 35.1578, 129.1581, 120, ["beach"]],
    ["Beomeosa", "Beomeosa, Busan, South Korea", 35.2732, 129.0928, 90, ["history", "hiking"]],
    ["Busan Tower", "13 Daecheong-ro 116beon-gil, Busan, South Korea", 35.1013, 129.0322, 45, ["scenic"]],
    ["Taejongdae", "Taejongdae Catholic Church, Busan, South Korea", 35.081, 129.0696, 90, ["scenic", "hiking"]]
  ]},
  {"id": "papeete", "name": "Papeete, Tahiti", "region": "Asia and Pacific", "country": "French Polynesia", "cc": "pf", "aka": ["Tahiti", "Papeete"], "area": "Windward Islands, France", "tender": "tender", "left": false, "address": "Papeete cruise port, French Polynesia", "lat": -17.5374, "lon": -149.566, "stops": [
    ["Marché de Papeete", "Marché Municipal Mapuru a Paraita, Papeete, French Polynesia", -17.5388, -149.5673, 60, ["markets", "food"]],
    ["Pointe Vénus", "Pointe Venus, Māhina, French Polynesia", -17.4944, -149.4943, 75, ["lighthouses", "beach", "history"]],
    ["Cascades de Faarumai", "Les 3 Cascades, Windward Islands, French Polynesia", -17.5386, -149.4007, 60, ["waterfalls", "hiking"]],
    ["Trou du Souffleur", "Trou du souffleur, Windward Islands, French Polynesia", -17.5244, -149.3906, 20, ["scenic"]],
    ["Musée de Tahiti et des Îles", "Musée de Tahiti et des Îles, Windward Islands, French Polynesia", -17.632, -149.6136, 90, ["history"]],
    ["Jardin d'eau de Vaipahi", "Jardin d'Eau de Vaipahi, Teva I Uta, French Polynesia", -17.7599, -149.3882, 60, ["gardens", "waterfalls"]],
    ["Grotte de Maraa", "Māra’a Grotte, Māra’a, French Polynesia", -17.7452, -149.5664, 30, ["caves"]]
  ]},
  {"id": "cape-town", "name": "Cape Town", "region": "Africa and Middle East", "country": "South Africa", "cc": "za", "aka": [], "area": "City of Cape Town, Western Cape", "tender": "pier", "left": true, "address": "Cape Town cruise port, South Africa", "lat": -33.9105, "lon": 18.426, "stops": [
    ["Table Mountain", "Table Mountain, Cape Town, South Africa", -33.9591, 18.4039, 180, ["scenic", "hiking", "parks"]],
    ["V&A Waterfront", "V&A Waterfront, Cape Town, South Africa", -33.906, 18.4195, 90, ["town", "food", "markets"]],
    ["Robben Island", "Robben Island, Robben Island Village, South Africa", -33.8053, 18.3689, 240, ["history"]],
    ["Kirstenbosch National Botanical Garden", "Kirstenbosch Botanical Gardens, Cape Town, South Africa", -33.9856, 18.4301, 120, ["gardens"]],
    ["Boulders Beach", "Boulders Beach, Simon's Town, South Africa", -34.1981, 18.4524, 90, ["wildlife", "beach"]],
    ["Cape Point", "Cape Point, Cape Town, South Africa", -34.3574, 18.4978, 150, ["lighthouses", "scenic"]],
    ["Groot Constantia", "Groot Constantia, Cape Town, South Africa", -34.0304, 18.4176, 90, ["drinks", "history"]],
    ["Bo-Kaap", "Bo-Kaap, Cape Town, South Africa", -33.9211, 18.4141, 45, ["town", "history"]]
  ]},
  {"id": "dubai", "name": "Dubai", "region": "Africa and Middle East", "country": "United Arab Emirates", "cc": "ae", "aka": [], "area": "Dubai Emirate, UAE", "tender": "pier", "left": false, "address": "Dubai cruise port, United Arab Emirates", "lat": 25.0941, "lon": 55.1322, "stops": [
    ["Burj Khalifa", "Burj Khalifa, Dubai, United Arab Emirates", 25.1918, 55.2723, 120, ["scenic"]],
    ["The Dubai Mall", "The Dubai Mall, Dubai, United Arab Emirates", 25.197, 55.279, 120, ["markets", "family"]],
    ["Al Fahidi Historical Neighbourhood", "Al Fahidi Historical Neighbourhood, Dubai, United Arab Emirates", 25.2642, 55.3002, 90, ["history", "town"]],
    ["Gold Souk", "Gold Souk, Dubai, United Arab Emirates", 25.27, 55.2981, 60, ["markets"]],
    ["Jumeirah Mosque", "Jumeirah Mosque, Dubai, United Arab Emirates", 25.234, 55.2655, 45, ["history"]],
    ["Dubai Frame", "Dubai Frame, Dubai, United Arab Emirates", 25.2355, 55.3004, 60, ["scenic"]],
    ["Dubai Miracle Garden", "Dubai Miracle Garden, Dubai Emirate, United Arab Emirates", 25.0597, 55.2446, 90, ["gardens"]]
  ]}
];
