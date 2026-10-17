/* Cruise ports for the Cruise Day tab. Coordinates are checked against OpenStreetMap
   (docs/catalog-check.md). Hours, fees, and prices change: verify before you go.
   Tender: tender, varies, pier, or unknown (docs/catalog-check.md lists the sources).
   Stop format is the catalog's: [name, address, lat, lon, minutes, tags] */
window.RT_PORTS = [
  {"id": "nassau", "name": "Nassau", "region": "Caribbean", "country": "Bahamas", "tender": "unknown", "left": true, "address": "Nassau cruise port, Bahamas", "lat": 25.0798, "lon": -77.3424, "stops": [
    ["Queen's Staircase", "Queen's Staircase, Nassau, Bahamas", 25.0732, -77.3376, 30, ["history", "scenic"]],
    ["Fort Fincastle", "Fort Fincastle, Nassau, Bahamas", 25.0736, -77.3385, 45, ["history", "scenic"]],
    ["Junkanoo Beach", "Junkanoo Beach, Nassau, Bahamas", 25.0792, -77.3487, 120, ["beach", "water"]],
    ["Cabbage Beach", "Cabbage Beach, Nassau, Bahamas", 25.0859, -77.3184, 150, ["beach", "water", "family"]],
    ["Atlantis Aquaventure", "1 Casino Drive, Nassau, Bahamas", 25.085, -77.3226, 240, ["themeparks", "family", "water"]],
    ["Straw Market", "Straw Market, Nassau, Bahamas", 25.0786, -77.3434, 60, ["markets", "town"]],
    ["Ardastra Gardens, Zoo and Conservation Centre", "Ardastra Gardens, Zoo and Conservation Centre, Nassau, Bahamas", 25.0759, -77.3621, 90, ["wildlife", "gardens", "family"]]
  ]},
  {"id": "grand-cayman", "name": "George Town, Grand Cayman", "region": "Caribbean", "country": "Cayman Islands", "tender": "tender", "left": true, "address": "George Town cruise port, Cayman Islands", "lat": 19.2954, "lon": -81.3808, "stops": [
    ["Queen Elizabeth II Botanic Park", "Queen Elizabeth II Botanic Park, George Town, Cayman Islands", 19.3171, -81.1695, 90, ["gardens", "hiking", "wildlife"]],
    ["Cayman Islands National Museum", "Cayman Islands National Museum, George Town, Cayman Islands", 19.2941, -81.3827, 45, ["history"]],
    ["Hell, Grand Cayman", "Hell, Grand Cayman, West Bay, Cayman Islands", 19.3755, -81.4079, 30, ["scenic", "town"]],
    ["Pedro St. James", "Pedro St. James, George Town, Cayman Islands", 19.2664, -81.2918, 60, ["history"]],
    ["Cayman Spirits Distillery", "Cayman Spirits Distillery, George Town, Cayman Islands", 19.3015, -81.3713, 60, ["drinks"]]
  ]},
  {"id": "cozumel", "name": "Cozumel", "region": "Caribbean", "country": "Mexico", "tender": "varies", "left": false, "address": "Cozumel cruise port, Mexico", "lat": 20.4759, "lon": -86.9748, "stops": [
    ["Chankanaab Beach Adventure Park", "Chankanaab Beach Adventure Park, San Miguel de Cozumel, Mexico", 20.4427, -86.9938, 180, ["beach", "water", "wildlife", "family"]],
    ["Playa Mia Grand Beach Park", "Playa Mia Grand Beach Park, Casa Birdie, Mexico", 20.3962, -87.0194, 180, ["beach", "family", "water"]],
    ["San Gervasio Mayan Ruins", "San Gervasio Mayan Ruins, San Antonio, Mexico", 20.5011, -86.8468, 90, ["history", "hiking"]],
    ["Punta Sur Eco Beach Park", "Punta Sur Eco Beach Park, El Cedral, Mexico", 20.299, -87.0051, 150, ["lighthouses", "beach", "wildlife", "scenic"]],
    ["Cozumel town plaza", "Parque Benito Juárez 5a Av. Sur, San Miguel de Cozumel, Mexico", 20.5102, -86.9494, 60, ["town", "food", "markets"]],
    ["Mr. Sanchos Beach Club", "Mr. Sanchos Beach Club, Playa Mía, Mexico", 20.3911, -87.0215, 150, ["beach", "food", "water"]],
    ["Cozumel Museum", "Cozumel Museum, San Miguel de Cozumel, Mexico", 20.5131, -86.9478, 45, ["history", "art"]]
  ]},
  {"id": "costa-maya", "name": "Costa Maya", "region": "Caribbean", "country": "Mexico", "tender": "pier", "left": false, "address": "Costa Maya cruise port, Mexico", "lat": 18.7257, "lon": -87.7072, "stops": [
    ["Chacchoben Mayan Ruins", "Chacchoben Mayan Ruins, Chacchoben, Mexico", 19.0362, -88.174, 150, ["history", "hiking", "wildlife"]],
    ["Mahahual malecon", "Mahahual malecon, Mahahual, Mexico", 18.7244, -87.7014, 90, ["beach", "town", "food"]],
    ["Bacalar Lagoon", "Bacalar Lagoon, Othón P. Blanco, Mexico", 18.8556, -88.2369, 180, ["scenic", "water"]],
    ["Cenote Azul", "Cenote Azul, Bacalar, Mexico", 18.647, -88.413, 90, ["water", "scenic"]],
    ["Fuerte de San Felipe Bacalar", "Fuerte de San Felipe Bacalar, Bacalar, Mexico", 18.677, -88.3885, 45, ["history"]]
  ]},
  {"id": "roatan", "name": "Roatan", "region": "Caribbean", "country": "Honduras", "tender": "varies", "left": false, "address": "Roatan cruise port, Honduras", "lat": 16.3211, "lon": -86.5383, "stops": [
    ["West Bay Beach", "West Bay Beach, Roatán, Honduras", 16.2751, -86.5994, 180, ["beach", "water"]],
    ["Gumbalimba Park", "Gumbalimba Park, Roatán, Honduras", 16.2834, -86.5964, 120, ["wildlife", "family", "hiking"]],
    ["Carambola Botanical Gardens", "Carambola Botanical Gardens, Roatán, Honduras", 16.3237, -86.572, 90, ["gardens", "hiking", "wildlife"]],
    ["Maya Key", "Maya Key, Roatán, Honduras", 16.3108, -86.537, 180, ["beach", "family", "wildlife"]]
  ]},
  {"id": "belize-city", "name": "Belize City", "region": "Caribbean", "country": "Belize", "tender": "tender", "left": false, "address": "Belize City cruise port, Belize", "lat": 17.5003, "lon": -88.1989, "stops": [
    ["Altun Ha", "Altun Ha, Belize", 17.7663, -88.3409, 150, ["history", "hiking"]],
    ["Xunantunich", "Xunantunich, Lord's Bank, Belize", 17.5511, -88.3171, 150, ["history", "hiking", "scenic"]],
    ["Lamanai", "Lamanai, Orange Walk, Belize", 17.7683, -88.6539, 180, ["history", "wildlife", "water"]],
    ["Cave tubing at Jaguar Paw", "Cave tubing at Jaguar Paw, Lord's Bank, Belize", 17.5563, -88.3269, 180, ["caves", "water", "hiking"]]
  ]},
  {"id": "ocho-rios", "name": "Ocho Rios", "region": "Caribbean", "country": "Jamaica", "tender": "varies", "left": true, "address": "Ocho Rios cruise port, Jamaica", "lat": 18.4081, "lon": -77.1011, "stops": [
    ["Dunn's River Falls", "Dunn's River Falls, Ocho Rios, Jamaica", 18.4168, -77.1399, 150, ["waterfalls", "hiking", "family"]],
    ["Mystic Mountain", "Mystic Mountain, Ocho Rios, Jamaica", 18.4081, -77.1205, 180, ["themeparks", "family", "scenic"]],
    ["Konoko Falls and Park", "Konoko Falls and Park, Ocho Rios, Jamaica", 18.3973, -77.105, 120, ["waterfalls", "wildlife", "gardens"]],
    ["Fern Gully", "Fern Gully, Ocho Rios, Jamaica", 18.374, -77.0956, 45, ["scenic", "gardens"]],
    ["Bob Marley Centre and Mausoleum", "Bob Marley Centre and Mausoleum, Nine Mile, Jamaica", 18.2976, -77.2783, 150, ["music", "history"]]
  ]},
  {"id": "grand-turk", "name": "Grand Turk", "region": "Caribbean", "country": "Turks and Caicos", "tender": "varies", "left": true, "address": "Grand Turk cruise port, Turks and Caicos", "lat": 21.4713, "lon": -71.1474, "stops": [
    ["Cockburn Town", "Cockburn Town, Turks and Caicos", 21.468, -71.1387, 90, ["town", "history"]],
    ["Turks and Caicos National Museum", "Turks and Caicos National Museum, Cockburn Town, Turks and Caicos", 21.4713, -71.1474, 45, ["history"]],
    ["Grand Turk Lighthouse", "Grand Turk Lighthouse, Cockburn Town, Turks and Caicos", 21.5116, -71.1336, 45, ["lighthouses", "scenic"]],
    ["Governors Beach", "Governors Beach, Cockburn Town, Turks and Caicos", 21.4401, -71.1513, 150, ["beach", "water"]],
    ["Jack's Shack", "Jack's Shack, Cockburn Town, Turks and Caicos", 21.4329, -71.1473, 90, ["food", "beach"]]
  ]},
  {"id": "st-thomas", "name": "St. Thomas", "region": "Caribbean", "country": "US Virgin Islands", "tender": "pier", "left": true, "address": "St. Thomas cruise port, USVI", "lat": 18.33, "lon": -64.9288, "stops": [
    ["Magens Bay Beach", "Magens Bay Beach, Charlotte Amalie West, USVI", 18.3599, -64.9249, 180, ["beach", "water", "family"]],
    ["Coral World Ocean Park", "6450 Coki Point Road, Frydendal, USVI", 18.3495, -64.864, 150, ["wildlife", "family"]],
    ["Paradise Point Tramway", "Paradise Point Tramway, Estate Thomas, USVI", 18.3339, -64.9171, 75, ["scenic"]],
    ["Fort Christian", "280 Forte Strade, Charlotte Amalie West, USVI", 18.3406, -64.9296, 45, ["history"]],
    ["Mountain Top", "Mountain Top, Saint Peter, USVI", 18.3555, -64.9468, 45, ["scenic", "food"]],
    ["Drake's Seat", "Drake's Seat, Charlotte Amalie West, USVI", 18.353, -64.927, 30, ["scenic"]],
    ["Mahogany Run Golf Course", "Mahogany Run Golf Course, Mandal, USVI", 18.3606, -64.9071, 240, ["golf"]]
  ]},
  {"id": "st-maarten", "name": "Philipsburg, St. Maarten", "region": "Caribbean", "country": "Sint Maarten", "tender": "pier", "left": false, "address": "Philipsburg cruise port, St. Maarten", "lat": 18.0251, "lon": -63.0483, "stops": [
    ["Maho Beach", "Maho Beach, Lowlands, St. Maarten", 18.0397, -63.1205, 90, ["beach", "scenic"]],
    ["Orient Bay Beach", "Orient Bay Beach, Baie Orientale, St. Maarten", 18.0878, -63.0256, 180, ["beach", "water"]],
    ["Fort Amsterdam", "Fort Amsterdam, Philipsburg, St. Maarten", 18.0161, -63.0593, 45, ["history", "scenic"]],
    ["Marigot Market", "Marigot Market, Marigot, St. Maarten", 18.0679, -63.0858, 75, ["markets", "town", "food"]],
    ["Loterie Farm", "Loterie Farm, Rambaud, St. Maarten", 18.078, -63.0614, 150, ["hiking", "wildlife", "family"]]
  ]},
  {"id": "san-juan", "name": "San Juan", "region": "Caribbean", "country": "Puerto Rico", "tender": "varies", "left": false, "address": "San Juan cruise port, PR", "lat": 18.4622, "lon": -66.1117, "stops": [
    ["Castillo San Cristobal", "Castillo San Cristobal, San Juan, PR", 18.4674, -66.1107, 90, ["history", "parks"]],
    ["Castillo San Felipe del Morro", "Castillo San Felipe del Morro, San Juan, PR", 18.4708, -66.1242, 90, ["history", "parks", "scenic"]],
    ["El Yunque National Forest", "El Yunque National Forest, Río Grande, PR", 18.2955, -65.7837, 240, ["parks", "hiking", "waterfalls", "wildlife"]],
    ["Old San Juan", "Old San Juan, San Juan, PR", 18.4662, -66.1164, 120, ["town", "food", "art"]],
    ["Condado Beach", "Condado Beach, San Juan, PR", 18.4577, -66.0733, 120, ["beach"]],
    ["Paseo de la Princesa", "Paseo de la Princesa, San Juan, PR", 18.4642, -66.1196, 45, ["scenic", "markets"]]
  ]},
  {"id": "key-west", "name": "Key West", "region": "Caribbean", "country": "Florida, USA", "tender": "pier", "left": false, "address": "Key West cruise port, FL", "lat": 24.5592, "lon": -81.8067, "stops": [
    ["Southernmost Point", "Southernmost Point, Key West, FL", 24.5465, -81.7975, 20, ["scenic"]],
    ["Fort Zachary Taylor Historic State Park", "Fort Zachary Taylor Historic State Park, Key West, FL", 24.5471, -81.8102, 150, ["beach", "history", "parks", "water"]],
    ["Key West Lighthouse", "Key West Lighthouse, Key West, FL", 24.5506, -81.8009, 45, ["lighthouses", "history"]],
    ["Key West Butterfly and Nature Conservatory", "Key West Butterfly and Nature Conservatory, Key West, FL", 24.5476, -81.7969, 60, ["gardens", "wildlife", "family"]],
    ["Duval Street", "Duval Street, Key West, FL", 24.5586, -81.8048, 90, ["town", "food", "music", "drinks"]],
    ["Key West Aquarium", "Key West Aquarium, Key West, FL", 24.5591, -81.8073, 60, ["family", "wildlife"]]
  ]},
  {"id": "bermuda", "name": "Royal Naval Dockyard, Bermuda", "region": "Caribbean", "country": "Bermuda", "tender": "unknown", "left": true, "address": "Royal Naval Dockyard cruise port, Bermuda", "lat": 32.3276, "lon": -64.834, "stops": [
    ["Horseshoe Bay Beach", "Horseshoe Bay Beach, Southampton, Bermuda", 32.2522, -64.8217, 150, ["beach", "water"]],
    ["Gibbs Hill Lighthouse", "Gibbs Hill Lighthouse, Southampton, Bermuda", 32.2528, -64.8347, 60, ["lighthouses", "scenic"]],
    ["Crystal Caves", "8 Crystal Cave Road, Hamilton, Bermuda", 32.3495, -64.7133, 60, ["caves"]],
    ["Hamilton", "Hamilton, Bermuda", 32.2923, -64.785, 90, ["town", "food", "markets"]],
    ["St. George's", "St. George's, Bermuda", 32.3723, -64.6985, 90, ["history", "town"]],
    ["Bermuda Aquarium, Museum and Zoo", "40 North Shore Road, Flatts, Bermuda", 32.3236, -64.7377, 90, ["wildlife", "family"]]
  ]},
  {"id": "aruba", "name": "Oranjestad, Aruba", "region": "Caribbean", "country": "Aruba", "tender": "pier", "left": false, "address": "Oranjestad cruise port, Aruba", "lat": 12.5201, "lon": -70.0371, "stops": [
    ["Eagle Beach", "Eagle Beach, Oranjestad, Aruba", 12.5466, -70.0599, 150, ["beach", "water"]],
    ["Arikok National Park", "Arikok National Park, Santa Cruz, Aruba", 12.4997, -69.9485, 180, ["parks", "hiking", "caves", "wildlife"]],
    ["California Lighthouse", "California Lighthouse, Noord overig, Aruba", 12.6138, -70.0513, 45, ["lighthouses", "scenic"]],
    ["Natural Pool Aruba", "Natural Pool Aruba, Wayaca, Aruba", 12.5526, -69.9745, 120, ["water", "scenic"]],
    ["Alto Vista Chapel", "Alto Vista Chapel, Noord overig, Aruba", 12.576, -70.0109, 30, ["history", "scenic"]],
    ["Butterfly Farm Aruba", "Butterfly Farm Aruba, Bubali, Aruba", 12.5637, -70.05, 60, ["gardens", "wildlife", "family"]]
  ]},
  {"id": "cabo", "name": "Cabo San Lucas", "region": "Mexico", "country": "Mexico", "tender": "tender", "left": false, "address": "Cabo San Lucas cruise port, Mexico", "lat": 22.8855, "lon": -109.9088, "stops": [
    ["El Arco", "El Arco, Cabo San Lucas, Mexico", 22.876, -109.8946, 90, ["scenic", "water", "wildlife"]],
    ["Lover's Beach", "Lover's Beach, Cabo San Lucas, Mexico", 22.8765, -109.8964, 90, ["beach", "water"]],
    ["Medano Beach", "Medano Beach, Cabo San Lucas, Mexico", 22.8951, -109.8936, 150, ["beach", "water", "food"]],
    ["San Jose del Cabo", "San Jose del Cabo, San José del Cabo, Mexico", 23.0621, -109.695, 120, ["town", "art", "food", "drinks"]],
    ["Cabo Wabo Cantina", "Cabo Wabo Cantina, Cabo San Lucas, Mexico", 22.8837, -109.9131, 90, ["music", "drinks"]],
    ["Cabo San Lucas Marina", "Cabo San Lucas Marina, Cabo San Lucas, Mexico", 22.8847, -109.9084, 60, ["town", "scenic"]]
  ]},
  {"id": "puerto-vallarta", "name": "Puerto Vallarta", "region": "Mexico", "country": "Mexico", "tender": "pier", "left": false, "address": "Puerto Vallarta cruise port, Mexico", "lat": 20.6542, "lon": -105.2407, "stops": [
    ["Malecon boardwalk", "Malecon boardwalk, Puerto Vallarta, Mexico", 20.6104, -105.2351, 75, ["scenic", "art", "town"]],
    ["Vallarta Botanical Gardens", "Vallarta Botanical Gardens, Puerto Vallarta, Mexico", 20.4657, -105.2927, 120, ["gardens", "hiking", "wildlife"]],
    ["Church of Our Lady of Guadalupe", "Church of Our Lady of Guadalupe, Puerto Vallarta, Mexico", 20.6082, -105.2348, 30, ["history"]],
    ["Los Muertos Beach", "Los Muertos Beach, Puerto Vallarta, Mexico", 20.6005, -105.239, 150, ["beach", "food", "water"]],
    ["Zona Romantica", "Zona Romantica, Puerto Vallarta, Mexico", 20.6022, -105.2351, 90, ["town", "food", "drinks"]]
  ]},
  {"id": "mazatlan", "name": "Mazatlan", "region": "Mexico", "country": "Mexico", "tender": "pier", "left": false, "address": "Mazatlan cruise port, Mexico", "lat": 23.2036, "lon": -106.4208, "stops": [
    ["Cathedral Basilica of the Immaculate Conception", "Cathedral Basilica of the Immaculate Conception, Mazatlán, Mexico", 23.201, -106.4219, 30, ["history"]],
    ["Faro Mazatlan Lighthouse", "Faro Mazatlan Lighthouse, Mazatlán, Mexico", 23.178, -106.4273, 75, ["lighthouses", "scenic", "hiking"]],
    ["Mazatlan Aquarium", "111 Avenida de los Deportes, Mazatlán, Mexico", 23.2286, -106.4277, 90, ["wildlife", "family"]],
    ["Malecon Mazatlan", "Malecon Mazatlan, Mazatlán, Mexico", 23.2154, -106.4214, 60, ["scenic", "beach"]],
    ["Playa Olas Altas", "Playa Olas Altas, Mazatlán, Mexico", 23.195, -106.4264, 90, ["beach", "food"]]
  ]},
  {"id": "ensenada", "name": "Ensenada", "region": "Mexico", "country": "Mexico", "tender": "pier", "left": false, "address": "Ensenada cruise port, Mexico", "lat": 31.8659, "lon": -116.603, "stops": [
    ["La Bufadora", "La Bufadora, Ensenada, Mexico", 31.7137, -116.6537, 90, ["scenic"]],
    ["Bodegas de Santo Tomas", "Bodegas de Santo Tomas, Municipio de Ensenada, Mexico", 31.5808, -116.4125, 90, ["drinks"]],
    ["Mercado Negro", "Mercado Negro, Ensenada, Mexico", 31.8614, -116.628, 60, ["markets", "food"]],
    ["Hussong's Cantina", "Hussong's Cantina, Ensenada, Mexico", 31.8651, -116.6289, 75, ["drinks", "music", "history"]]
  ]},
  {"id": "galveston", "name": "Galveston", "region": "US homeport", "country": "Texas, USA", "tender": "pier", "left": false, "address": "Galveston cruise port, TX", "lat": 29.3085, "lon": -94.7966, "stops": [
    ["Moody Gardens", "1 Hope Boulevard, Galveston, TX", 29.2746, -94.8524, 240, ["family", "wildlife", "gardens", "themeparks"]],
    ["The Strand Historic District", "The Strand Historic District, Galveston, TX", 29.3055, -94.8008, 120, ["history", "town", "food", "markets"]],
    ["Pleasure Pier", "2501 Seawall Boulevard, Galveston, TX", 29.2866, -94.7899, 150, ["themeparks", "family", "beach"]],
    ["Galveston Island State Park", "Galveston Island State Park, Galveston, TX", 29.2019, -94.9676, 150, ["parks", "beach", "wildlife", "hiking", "camping"]],
    ["Bishop's Palace", "1402 Broadway - Avenue J, Galveston, TX", 29.3031, -94.7821, 75, ["history"]],
    ["Schlitterbahn Galveston", "2026 Lockheed Road, Galveston, TX", 29.2709, -94.8514, 300, ["themeparks", "family", "water"]],
    ["Texas Seaport Museum and Tall Ship Elissa", "Texas Seaport Museum and Tall Ship Elissa, Galveston, TX", 29.3093, -94.7932, 90, ["history"]]
  ]},
  {"id": "new-orleans", "name": "New Orleans", "region": "US homeport", "country": "Louisiana, USA", "tender": "pier", "left": false, "address": "New Orleans cruise port, LA", "lat": 29.9575, "lon": -90.0629, "stops": [
    ["French Quarter", "French Quarter, New Orleans, LA", 29.9595, -90.0655, 150, ["history", "town", "food", "music", "art"]],
    ["Jackson Square", "Jackson Square, New Orleans, LA", 29.9575, -90.0629, 45, ["history", "art"]],
    ["The National WWII Museum", "945 Magazine Street, New Orleans, LA", 29.9421, -90.0708, 180, ["history"]],
    ["New Orleans City Park", "New Orleans City Park, New Orleans, LA", 29.9875, -90.0963, 120, ["parks", "gardens", "family"]],
    ["Cafe du Monde", "800 Decatur Street, New Orleans, LA", 29.9576, -90.0619, 45, ["food"]],
    ["Frenchmen Street", "Frenchmen Street, New Orleans, LA", 29.9652, -90.0579, 120, ["music", "drinks"]],
    ["Audubon Zoo", "Audubon Zoo, New Orleans, LA", 29.9223, -90.1307, 180, ["wildlife", "family"]]
  ]},
  {"id": "miami", "name": "Miami", "region": "US homeport", "country": "Florida, USA", "tender": "pier", "left": false, "address": "Miami cruise port, FL", "lat": 25.7742, "lon": -80.1936, "stops": [
    ["South Beach", "South Beach, Miami Beach, FL", 25.7744, -80.1332, 150, ["beach", "art", "town", "food"]],
    ["Vizcaya Museum and Gardens", "Vizcaya Museum and Gardens, Miami, FL", 25.7447, -80.2116, 150, ["gardens", "history", "art"]],
    ["Wynwood Walls", "2520 Northwest 2nd Avenue, Miami, FL", 25.8011, -80.1953, 75, ["art", "food", "drinks"]],
    ["Little Havana", "Little Havana, Miami, FL", 25.7655, -80.2266, 90, ["food", "music", "history", "town"]],
    ["Zoo Miami", "Zoo Miami, Miami-Dade County, FL", 25.6134, -80.3999, 240, ["wildlife", "family"]],
    ["Everglades Safari Park", "Everglades Safari Park, Miami-Dade County, FL", 25.7608, -80.6263, 120, ["wildlife", "water", "family"]],
    ["Fairchild Tropical Botanic Garden", "10901 Old Cutler Road, Coral Gables, FL", 25.6785, -80.2743, 150, ["gardens"]]
  ]},
  {"id": "fort-lauderdale", "name": "Fort Lauderdale (Port Everglades)", "region": "US homeport", "country": "Florida, USA", "tender": "pier", "left": false, "address": "Fort Lauderdale (Port Everglades) cruise port, FL", "lat": 26.0969, "lon": -80.1273, "stops": [
    ["Fort Lauderdale Beach", "Fort Lauderdale Beach, Fort Lauderdale, FL", 26.147, -80.1013, 150, ["beach", "water", "scenic"]],
    ["Las Olas Boulevard", "Las Olas Boulevard, Fort Lauderdale, FL", 26.1195, -80.1433, 90, ["town", "food", "art", "drinks"]],
    ["Butterfly World", "3600 West Sample Road, Coconut Creek, FL", 26.2687, -80.1716, 120, ["gardens", "wildlife", "family"]],
    ["Flamingo Gardens", "Flamingo Gardens, Davie, FL", 26.0733, -80.3121, 120, ["gardens", "wildlife", "family"]],
    ["Everglades Holiday Park", "Everglades Holiday Park, Broward County, FL", 26.0592, -80.445, 120, ["wildlife", "water", "fishing"]],
    ["Bonnet House Museum and Gardens", "Bonnet House Museum and Gardens, Fort Lauderdale, FL", 26.1351, -80.1056, 120, ["history", "gardens", "art"]]
  ]},
  {"id": "port-canaveral", "name": "Port Canaveral", "region": "US homeport", "country": "Florida, USA", "tender": "pier", "left": false, "address": "Port Canaveral cruise port, FL", "lat": 28.4161, "lon": -80.6078, "stops": [
    ["Kennedy Space Center Visitor Complex", "9500 Space Commerce Way, Merritt Island, FL", 28.5154, -80.6819, 300, ["history", "family", "themeparks"]],
    ["Cocoa Beach Pier", "Cocoa Beach Pier, Cocoa Beach, FL", 28.3678, -80.6018, 120, ["beach", "fishing", "food", "water"]],
    ["Merritt Island National Wildlife Refuge", "Merritt Island National Wildlife Refuge, Brevard County, FL", 28.6202, -80.7422, 150, ["wildlife", "parks", "hiking"]],
    ["Canaveral National Seashore", "Canaveral National Seashore, Oak Hill, FL", 28.8882, -80.8205, 180, ["parks", "beach", "wildlife", "camping"]],
    ["Ron Jon Surf Shop", "4151 North Atlantic Avenue, Cocoa Beach, FL", 28.3563, -80.6077, 60, ["town", "water"]],
    ["Cape Canaveral Lighthouse", "Cape Canaveral Lighthouse, Brevard County, FL", 28.4604, -80.5435, 45, ["lighthouses", "history"]]
  ]},
  {"id": "tampa", "name": "Tampa", "region": "US homeport", "country": "Florida, USA", "tender": "pier", "left": false, "address": "Tampa cruise port, FL", "lat": 27.945, "lon": -82.4583, "stops": [
    ["Ybor City", "Ybor City, Tampa, FL", 27.96, -82.4412, 120, ["history", "food", "drinks", "music"]],
    ["Florida Aquarium", "701 Channelside Drive, Tampa, FL", 27.9441, -82.4449, 150, ["wildlife", "family"]],
    ["Tampa Riverwalk", "Tampa Riverwalk, Tampa, FL", 27.9408, -82.4561, 90, ["scenic", "town", "food"]],
    ["Busch Gardens Tampa Bay", "Busch Gardens Tampa Bay, Tampa, FL", 28.0371, -82.4213, 360, ["themeparks", "family", "wildlife"]],
    ["Clearwater Beach", "Clearwater Beach, Clearwater, FL", 27.9775, -82.8279, 180, ["beach", "water"]],
    ["Lowry Park Zoo", "1101 West Sligh Avenue, Tampa, FL", 28.015, -82.4699, 180, ["wildlife", "family"]]
  ]},
  {"id": "seattle", "name": "Seattle", "region": "US homeport", "country": "Washington, USA", "tender": "pier", "left": false, "address": "Seattle cruise port, WA", "lat": 47.6038, "lon": -122.3301, "stops": [
    ["Pike Place Market", "85 Pike Street, Seattle, WA", 47.6094, -122.3414, 120, ["markets", "food", "town"]],
    ["Space Needle", "400 Broad Street, Seattle, WA", 47.6205, -122.3493, 90, ["scenic", "family"]],
    ["Chihuly Garden and Glass", "305 Harrison Street, Seattle, WA", 47.6205, -122.3502, 90, ["art", "gardens"]],
    ["Museum of Pop Culture", "Museum of Pop Culture, Seattle, WA", 47.6215, -122.3482, 120, ["music", "history", "art"]],
    ["Seattle Aquarium", "1483 Alaskan Way, Seattle, WA", 47.6076, -122.3432, 90, ["wildlife", "family"]],
    ["Hiram M. Chittenden Locks", "3015 Northwest 54th Street, Seattle, WA", 47.666, -122.3978, 75, ["fishing", "wildlife", "gardens", "history"]],
    ["Kerry Park", "Kerry Park, Seattle, WA", 47.6294, -122.3599, 30, ["scenic"]]
  ]},
  {"id": "san-diego", "name": "San Diego", "region": "US homeport", "country": "California, USA", "tender": "pier", "left": false, "address": "San Diego cruise port, CA", "lat": 32.7157, "lon": -117.1638, "stops": [
    ["San Diego Zoo", "2920 Zoo Drive, San Diego, CA", 32.736, -117.1507, 300, ["wildlife", "family", "gardens"]],
    ["Balboa Park", "Balboa Park, San Diego, CA", 32.7317, -117.1465, 180, ["gardens", "art", "history", "family"]],
    ["USS Midway Museum", "910 North Harbor Drive, San Diego, CA", 32.7138, -117.1752, 150, ["history", "family"]],
    ["Cabrillo National Monument", "Cabrillo National Monument, San Diego, CA", 32.6722, -117.2409, 90, ["lighthouses", "parks", "scenic", "history"]],
    ["Gaslamp Quarter", "Gaslamp Quarter, San Diego, CA", 32.7115, -117.1601, 90, ["town", "food", "drinks", "music"]],
    ["La Jolla Cove", "La Jolla Cove, La Jolla, CA", 32.8506, -117.2726, 120, ["beach", "wildlife", "water", "scenic"]],
    ["Coronado Beach", "Coronado Beach, Coronado, CA", 32.6831, -117.1859, 120, ["beach", "history"]]
  ]},
  {"id": "new-york", "name": "New York City (Manhattan)", "region": "US homeport", "country": "New York, USA", "tender": "pier", "left": false, "address": "New York City (Manhattan) cruise port, NY", "lat": 40.7677, "lon": -73.999, "stops": [
    ["Statue of Liberty", "Statue of Liberty, New York, NY", 40.6893, -74.0445, 180, ["history", "scenic"]],
    ["Central Park", "Central Park, New York, NY", 40.7828, -73.9654, 150, ["parks", "gardens", "scenic"]],
    ["Metropolitan Museum of Art", "1000 5th Avenue, New York, NY", 40.7794, -73.9634, 180, ["art", "history"]],
    ["High Line", "High Line, New York, NY", 40.7564, -74.0038, 75, ["parks", "scenic", "art"]],
    ["Times Square", "Times Square, New York, NY", 40.7573, -73.9859, 45, ["music", "town", "family"]],
    ["Brooklyn Bridge", "Brooklyn Bridge, New York, NY", 40.7062, -73.997, 60, ["scenic", "history"]],
    ["Chelsea Market", "75 9th Avenue, New York, NY", 40.7429, -74.007, 75, ["markets", "food"]]
  ]},
  {"id": "boston", "name": "Boston", "region": "US homeport", "country": "Massachusetts, USA", "tender": "pier", "left": false, "address": "Boston cruise port, MA", "lat": 42.344, "lon": -71.0307, "stops": [
    ["Freedom Trail", "Freedom Trail, Boston, MA", 42.3612, -71.057, 180, ["history", "town"]],
    ["Boston Public Garden", "Boston Public Garden, Boston, MA", 42.3541, -71.07, 60, ["gardens", "parks"]],
    ["Faneuil Hall Marketplace", "1 Faneuil Hall Square, Boston, MA", 42.3601, -71.0546, 75, ["markets", "food", "town"]],
    ["New England Aquarium", "1 Boston HarborWalk, Boston, MA", 42.3592, -71.0492, 120, ["wildlife", "family"]],
    ["Fenway Park", "4 Jersey Street, Boston, MA", 42.3465, -71.0971, 75, ["history", "family"]],
    ["Harpoon Brewery", "306 Northern Avenue, Boston, MA", 42.3471, -71.0341, 75, ["drinks"]],
    ["Museum of Fine Arts", "465 Huntington Avenue, Boston, MA", 42.3395, -71.0939, 150, ["art"]]
  ]},
  {"id": "juneau", "name": "Juneau", "region": "Alaska", "country": "Alaska, USA", "tender": "varies", "left": false, "address": "Juneau cruise port, AK", "lat": 58.302, "lon": -134.4197, "stops": [
    ["Mendenhall Glacier", "Mendenhall Glacier, Juneau, AK", 58.4172, -134.5456, 150, ["scenic", "parks", "hiking", "waterfalls", "wildlife"]],
    ["Mount Roberts Tramway", "490 South Franklin Street, Juneau, AK", 58.2962, -134.4009, 120, ["scenic", "hiking"]],
    ["Alaska State Museum", "395 Whittier Street, Juneau, AK", 58.3, -134.4161, 75, ["history", "art"]],
    ["Alaskan Brewing Company", "Alaskan Brewing Company, Juneau, AK", 58.2994, -134.4074, 75, ["drinks"]],
    ["St. Nicholas Russian Orthodox Church", "326 5th Street, Juneau, AK", 58.3031, -134.409, 20, ["history"]]
  ]},
  {"id": "ketchikan", "name": "Ketchikan", "region": "Alaska", "country": "Alaska, USA", "tender": "varies", "left": false, "address": "Ketchikan cruise port, AK", "lat": 55.3431, "lon": -131.6467, "stops": [
    ["Creek Street", "Creek Street, Ketchikan, AK", 55.3424, -131.642, 60, ["history", "town"]],
    ["Totem Bight State Historical Park", "Totem Bight State Historical Park, Mud Bay, AK", 55.4212, -131.7746, 90, ["history", "parks", "art"]],
    ["Saxman Native Village", "Saxman Native Village, Saxman, AK", 55.3193, -131.5966, 90, ["history", "art"]],
    ["Misty Fjords", "Misty Fjords, Alaska, AK", 55.585, -130.4166, 360, ["scenic", "parks", "wildlife"]],
    ["Tongass Historical Museum", "629 Dock Street, Ketchikan, AK", 55.3426, -131.6436, 45, ["history"]],
    ["Ketchikan Lumberjack Show", "Ketchikan Lumberjack Show, Ketchikan, AK", 55.3401, -131.6433, 75, ["family", "history"]],
    ["Ketchikan Salmon Ladder", "Ketchikan Salmon Ladder, Ketchikan, AK", 55.3459, -131.631, 30, ["fishing", "wildlife"]]
  ]},
  {"id": "skagway", "name": "Skagway", "region": "Alaska", "country": "Alaska, USA", "tender": "pier", "left": false, "address": "Skagway cruise port, AK", "lat": 59.457, "lon": -135.3121, "stops": [
    ["White Pass and Yukon Route Railroad", "231 2nd Avenue, Skagway, AK", 59.4532, -135.3178, 210, ["scenic", "history", "family"]],
    ["Gold Rush Cemetery", "Gold Rush Cemetery, Skagway, AK", 59.4731, -135.2894, 45, ["history", "hiking", "waterfalls"]],
    ["Skagway Museum", "700 Spring Street, Skagway, AK", 59.4557, -135.3118, 45, ["history"]],
    ["Dyea", "Dyea, Skagway, AK", 59.5078, -135.3583, 90, ["history", "hiking", "scenic"]],
    ["Red Onion Saloon", "205 Broadway, Skagway, AK", 59.454, -135.3185, 60, ["drinks", "history", "music"]]
  ]},
  {"id": "sitka", "name": "Sitka", "region": "Alaska", "country": "Alaska, USA", "tender": "varies", "left": false, "address": "Sitka cruise port, AK", "lat": 57.0497, "lon": -135.3281, "stops": [
    ["Sitka National Historical Park", "Sitka National Historical Park, Sitka, AK", 57.0515, -135.3313, 90, ["history", "parks", "hiking", "art"]],
    ["Alaska Raptor Center", "1000 Sawmill Creek Road, Sitka, AK", 57.0524, -135.3164, 75, ["wildlife", "family"]],
    ["St. Michael's Cathedral", "240 Lincoln Street, Sitka, AK", 57.05, -135.3353, 30, ["history"]],
    ["Sheldon Jackson Museum", "104 College Drive, Sitka, AK", 57.0505, -135.3223, 45, ["history", "art"]]
  ]},
  {"id": "honolulu", "name": "Honolulu", "region": "Hawaii", "country": "Hawaii, USA", "tender": "varies", "left": false, "address": "Honolulu cruise port, HI", "lat": 21.3067, "lon": -157.8656, "stops": [
    ["Pearl Harbor National Memorial", "Pearl Harbor National Memorial, Aiea, HI", 21.3675, -157.9384, 240, ["history", "parks"]],
    ["Diamond Head State Monument", "Diamond Head State Monument, East Honolulu, HI", 21.2625, -157.8068, 120, ["hiking", "scenic", "parks"]],
    ["Waikiki Beach", "Waikiki Beach, East Honolulu, HI", 21.2741, -157.8243, 180, ["beach", "water", "town"]],
    ["Iolani Palace", "364 South King Street, East Honolulu, HI", 21.3068, -157.8588, 90, ["history"]],
    ["Hanauma Bay Nature Preserve", "Hanauma Bay Nature Preserve, East Honolulu, HI", 21.2696, -157.6938, 180, ["water", "wildlife", "beach", "parks"]],
    ["Honolulu Zoo", "151 Kapahulu Avenue, East Honolulu, HI", 21.2712, -157.8189, 120, ["wildlife", "family"]],
    ["Foster Botanical Garden", "Foster Botanical Garden, East Honolulu, HI", 21.3164, -157.8578, 75, ["gardens"]]
  ]},
  {"id": "maui", "name": "Kahului, Maui", "region": "Hawaii", "country": "Hawaii, USA", "tender": "varies", "left": false, "address": "Kahului cruise port, HI", "lat": 20.8958, "lon": -156.4719, "stops": [
    ["Iao Valley State Monument", "Iao Valley State Monument, Maui County, HI", 20.8806, -156.5471, 90, ["scenic", "hiking", "parks", "waterfalls"]],
    ["Haleakala National Park", "Haleakala National Park, Maui County, HI", 20.6991, -156.1324, 240, ["parks", "scenic", "hiking", "camping"]],
    ["Lahaina Banyan Court", "Lahaina Banyan Court, Lahaina, HI", 20.8717, -156.6776, 45, ["history", "gardens"]],
    ["Maui Ocean Center", "Maui Ocean Center, Maʻalaea, HI", 20.7928, -156.5119, 120, ["wildlife", "family"]],
    ["Ho'okipa Beach", "Ho'okipa Beach, Kuau, HI", 20.9344, -156.3558, 90, ["beach", "water", "wildlife"]],
    ["Maui Tropical Plantation", "1670 Honoapiilani Highway, Waikapu, HI", 20.849, -156.5065, 90, ["markets", "gardens", "food"]]
  ]},
  {"id": "kona", "name": "Kailua-Kona", "region": "Hawaii", "country": "Hawaii, USA", "tender": "tender", "left": false, "address": "Kailua-Kona cruise port, HI", "lat": 19.6392, "lon": -155.9968, "stops": [
    ["Pu'uhonua o Honaunau National Historical Park", "Pu'uhonua o Honaunau National Historical Park, Hōnaunau, HI", 19.4224, -155.9094, 90, ["history", "parks", "beach"]],
    ["Kona coffee farm Greenwell", "81-6581 Mamalahoa Highway, Kealakekua, HI", 19.5112, -155.922, 75, ["food", "drinks", "history"]],
    ["Kealakekua Bay", "Kealakekua Bay, Nāpō‘opo‘o, HI", 19.4813, -155.9365, 150, ["water", "history", "scenic", "wildlife"]],
    ["Magic Sands Beach", "Magic Sands Beach, Kahaluʻu, HI", 19.5943, -155.9719, 120, ["beach", "water"]]
  ]},
  {"id": "hilo", "name": "Hilo", "region": "Hawaii", "country": "Hawaii, USA", "tender": "varies", "left": false, "address": "Hilo cruise port, HI", "lat": 19.7074, "lon": -155.0816, "stops": [
    ["Hawaii Volcanoes National Park", "Hawaii Volcanoes National Park, Hawaiʻi County, HI", 19.2608, -155.3579, 300, ["parks", "hiking", "scenic", "camping"]],
    ["Rainbow Falls", "Rainbow Falls, Hilo, HI", 19.7195, -155.1096, 30, ["waterfalls", "scenic"]],
    ["Akaka Falls State Park", "Akaka Falls State Park, Hawaiʻi County, HI", 19.8547, -155.1536, 75, ["waterfalls", "hiking", "parks"]],
    ["Lyman Museum", "276 Haili Street, Hilo, HI", 19.7222, -155.0907, 60, ["history"]],
    ["Hilo Farmers Market", "20 Mamo Street, Hilo, HI", 19.7231, -155.0846, 75, ["markets", "food"]],
    ["Liliuokalani Gardens", "Liliuokalani Gardens, Hilo, HI", 19.7264, -155.0684, 45, ["gardens", "scenic"]],
    ["Mauna Loa Macadamia Nut Factory", "Mauna Loa Macadamia Nut Factory, Hawaiʻi County, HI", 19.6567, -155.0088, 45, ["food", "family"]]
  ]},
  {"id": "victoria", "name": "Victoria, BC", "region": "Canada and New England", "country": "Canada", "tender": "pier", "left": false, "address": "Victoria cruise port, BC", "lat": 48.4283, "lon": -123.365, "stops": [
    ["Butchart Gardens", "Butchart Gardens, Central Saanich, BC", 48.5653, -123.4696, 150, ["gardens", "scenic", "lights"]],
    ["Royal BC Museum", "675 Belleville Street, Victoria, BC", 48.4197, -123.3679, 120, ["history", "art"]],
    ["Craigdarroch Castle", "1048 Joan Crescent, Victoria, BC", 48.4226, -123.3438, 75, ["history"]],
    ["Inner Harbour", "Inner Harbour, Victoria, BC", 48.4255, -123.3737, 60, ["town", "scenic", "music"]],
    ["Beacon Hill Park", "Beacon Hill Park, Victoria, BC", 48.4125, -123.3625, 75, ["parks", "gardens"]],
    ["Fisherman's Wharf", "Fisherman's Wharf, Victoria, BC", 48.4228, -123.3826, 60, ["food", "wildlife", "water"]]
  ]},
  {"id": "vancouver", "name": "Vancouver", "region": "Canada and New England", "country": "Canada", "tender": "pier", "left": false, "address": "Vancouver cruise port, BC", "lat": 49.2885, "lon": -123.1169, "stops": [
    ["Stanley Park", "Stanley Park, Vancouver, BC", 49.3021, -123.1413, 150, ["parks", "hiking", "scenic", "beach"]],
    ["Capilano Suspension Bridge", "Capilano Suspension Bridge, North Vancouver, BC", 49.3427, -123.116, 120, ["scenic", "hiking", "parks"]],
    ["Granville Island Public Market", "Granville Island Public Market, Vancouver, BC", 49.2707, -123.1343, 90, ["markets", "food", "art"]],
    ["Gastown", "Gastown, Vancouver, BC", 49.2837, -123.1062, 75, ["town", "history", "drinks"]],
    ["Vancouver Aquarium", "845 Avison Way, Vancouver, BC", 49.3005, -123.1312, 120, ["wildlife", "family"]],
    ["Grouse Mountain", "Grouse Mountain, District of North Vancouver, BC", 49.3795, -123.0768, 180, ["scenic", "hiking", "wildlife"]]
  ]},
  {"id": "halifax", "name": "Halifax", "region": "Canada and New England", "country": "Canada", "tender": "pier", "left": false, "address": "Halifax cruise port, NS", "lat": 44.6486, "lon": -63.5859, "stops": [
    ["Halifax Citadel National Historic Site", "Halifax Citadel National Historic Site, Halifax, NS", 44.6484, -63.58, 90, ["history", "scenic"]],
    ["Halifax Waterfront Boardwalk", "Halifax Waterfront Boardwalk, Halifax, NS", 44.6523, -63.5744, 75, ["scenic", "town", "food"]],
    ["Peggy's Cove Lighthouse", "Peggy's Cove Lighthouse, Peggys Cove, NS", 44.4916, -63.919, 90, ["lighthouses", "scenic"]],
    ["Halifax Public Gardens", "Halifax Public Gardens, Halifax, NS", 44.6426, -63.582, 60, ["gardens"]],
    ["Maritime Museum of the Atlantic", "1675 Lower Water Street, Halifax, NS", 44.6476, -63.5709, 90, ["history"]],
    ["Pier 21 Canadian Museum of Immigration", "1055 Marginal Road, Halifax, NS", 44.6377, -63.5661, 75, ["history"]]
  ]},
  {"id": "bar-harbor", "name": "Bar Harbor", "region": "Canada and New England", "country": "Maine, USA", "tender": "tender", "left": false, "address": "Bar Harbor cruise port, ME", "lat": 44.3921, "lon": -68.2041, "stops": [
    ["Acadia National Park Cadillac Mountain", "Acadia National Park Cadillac Mountain, Bar Harbor, ME", 44.3524, -68.2258, 150, ["parks", "scenic", "hiking", "camping"]],
    ["Jordan Pond House", "2928 Park Loop Road, Bar Harbor, ME", 44.3206, -68.2535, 90, ["food", "scenic", "hiking"]],
    ["Bass Harbor Head Light", "Bass Harbor Head Light, Tremont, ME", 44.2225, -68.3379, 45, ["lighthouses", "scenic"]],
    ["Sand Beach", "Sand Beach, Bar Harbor, ME", 44.3292, -68.1823, 90, ["beach", "scenic"]],
    ["Thunder Hole", "1411 Park Loop Road, Bar Harbor, ME", 44.3214, -68.1895, 30, ["scenic"]],
    ["Abbe Museum", "26 Mount Desert Street, Bar Harbor, ME", 44.3869, -68.206, 60, ["history", "art"]],
    ["Bar Harbor Shore Path", "Bar Harbor Shore Path, Bar Harbor, ME", 44.3878, -68.1994, 60, ["scenic", "history"]]
  ]}
];
