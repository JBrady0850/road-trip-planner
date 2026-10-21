# Catalog coordinate check (2026-10-15)

## First pass

Every base town and stop in the first release (236 points) was geocoded with OpenStreetMap Nominatim and
compared with the catalog coordinates.

| Result | Points |
|---|---|
| Within 2 km of the OpenStreetMap result | 200 |
| 2 to 5 km (park or town centroid versus the actual visitor area; kept) | 18 |
| Over 5 km, reviewed by hand | 8 |
| No OpenStreetMap match | 10 |

## Over 5 km: decisions

| Stop | Decision |
|---|---|
| Bon Secour National Wildlife Refuge | Kept; OpenStreetMap matched a road, not the refuge |
| Pikes Peak Summit | Kept; OpenStreetMap matched the highway, the catalog point is the summit |
| Bryce Canyon Inspiration Point | Kept; OpenStreetMap returned the park centroid |
| Hoover Dam | Kept; OpenStreetMap matched a lodge |
| Kancamagus Highway | Moved to the Lincoln end of the highway |
| Letchworth State Park | Moved onto the park (OpenStreetMap) |
| Sawtooth Scenic Byway | Moved onto ID-75 at Stanley (OpenStreetMap) |
| Hearst Castle | Moved to the visitor center, where visitors park (OpenStreetMap) |
| Portage Glacier, Exit Glacier | Kept at the visitor and parking areas; OpenStreetMap returned the glaciers |

## No match: status

Confirmed on a second search: Mammoth Cave Visitor Center, Capitol Reef Visitor
Center, Babcock State Park (catalog point is the grist mill, inside the park).
Corrected on a second search: Turnagain Arm Beluga Point.

## Third search (2026-10-15)

The last six points, searched again with other names and with nearby map features:

| Stop | Result |
|---|---|
| Cumberland Falls State Resort Park | Confirmed; 0.1 km from the falls in OpenStreetMap |
| Trail Ridge Road Alpine Visitor Center | Confirmed; 0.05 km from the visitor center |
| Painted Canyon overlook | Confirmed; 0.3 km from the Painted Canyon Visitor Center |
| South Unit Scenic Loop | Confirmed; 0.15 km from the Scenic Loop Drive road line |
| Punaluu Black Sand Beach | Confirmed; 0.1 km from the beach (OpenStreetMap spells it Punalu'u) |
| North Unit River Bend Overlook | Moved 9 km west, from the North Unit entrance area to the overlook; the address now names the overlook as OpenStreetMap spells it (Riverbend Overlook) |

No catalog point remains unchecked. Hours, fees, and seasonal road closures still
change, so confirm those before travel.

## Stops added on 2026-10-15

100 stops were added (187 to 287). Before: 14 destinations had three stops, 30 had
four, 5 had five. After: 1 has four (Acadia; Thunder Hole and Sand Beach were not
found by name), 9 have five, 35 have six, 4 have seven. Every added point was
searched by name in OpenStreetMap Nominatim and the catalog coordinates are the
coordinates Nominatim returned, rounded to four decimals (no hand-typed points).
Places Nominatim could not find, or matched only to a road some distance away
(Sliding Rock, Bellingrath Gardens, Lower Falls of the Yellowstone, Thunder Hole,
Sand Beach, and others), were left out rather than guessed. Minutes to spend are
planning estimates.

## Lighthouses and five coastal trips (2026-10-15)

Every ocean, Gulf, and Great Lakes state now has at least one lighthouse a visitor
can reach, or a public spot to see one from: 40 lighthouse stops in all. 28 new
lighthouse stops were placed from Nominatim results; the 12 already in the catalog
were tagged. Five coastal trips were added where a state had no trip near its shore:
Mississippi Gulf Coast (Biloxi), South Padre Island and Port Isabel (TX), Chicago
Lakefront (IL), Lake Erie Islands and Shores (OH), and Erie and Presque Isle (PA).

Notes:
- Hooper Strait Lighthouse now stands at the Chesapeake Bay Maritime Museum in
  St. Michaels, MD; the stop is placed at the museum. The "Hooper Strait Light" that
  OpenStreetMap returns is the light still in the bay.
- Morris Island (SC) and Sand Island (AL) stand offshore. Their stops use the road
  where visitors look at them (East Ashley Avenue on Folly Beach, Fort Morgan Road).
- Alaska is the one coastal state without a lighthouse stop: none near the Seward
  trip can be reached by road.
- Not found by name and left out: Point Betsie and Grand Traverse (MI), New Canal
  (LA), Drum Point (MD), Hunting Island (SC), Middle Bay (AL, offshore only).

## Address audit (2026-10-15)

Every stop added on 2026-10-15 was compared with its saved Nominatim result. 75
addresses were corrected: house numbers and street names that did not come from
OpenStreetMap were removed. The rule now is: a street address with a house number
only when Nominatim gave both the number and the road; otherwise the place name and
town, which map searches find reliably.

## Interest categories, City, and fishing (2026-10-15)

Eleven interests were added (wildlife, gardens, camping, golf, music, drinks, art, themeparks, family, spa, markets), and four existing ones were widened by label only (hiking, history, scenic, lights), so saved profiles keep their picks. Every interest now has places in at least five trips; the tests check this.

**Method.** New places were searched by name on OpenStreetMap Nominatim from a Windows computer, one request every 3 seconds, and placed at the first matching result. Addresses follow the rule above. Places already in the catalog were tagged by what they are (an aquarium is family-friendly, a wildlife refuge is wildlife viewing, a lake with boat ramps is fishing). Fishing now includes 12 lakes, rivers, and streams already in the catalog and 10 new freshwater places. Holiday light shows were added at Silver Dollar City, Dollywood, the Chicago Botanic Garden, and Longwood Gardens.

**Camping.** A stop is marked when it is an outdoor place (a park, lake, beach, falls, visitor center, and similar; never a museum, aquarium, or lighthouse) and OpenStreetMap has a named campground or RV park within 3 km. Group, backcountry, horse, volunteer, youth, and numbered sites do not count. The Overpass server failed most requests that day, so the check used Nominatim searches for "camp site" and "RV park" inside a 3 km box around each stop.

**Disc golf.** The nearest named course found by a Nominatim search for "disc golf" within 25 km of each base town; school courses and an unnamed one (Bowling Green) were left out. Addresses come from reverse geocoding each course.

**City.** A town typed in City that is not a catalog base is built from catalog places within about an hour's estimated drive (RT.CITY_REACH_H), so it uses only the places checked here.

### New places (92)

| Trip | Place | OpenStreetMap match | km from base |
|---|---|---|---|
| al-gulf-shores | Kiva Dunes Golf Club | Kiva Dunes Golf Course, Osprey Circle, Baldwin County, Alabama, United (leisure/golf_course) | 19 |
| ar-hot-springs | Quapaw Baths and Spa | Quapaw Baths & Spa, 413, Central Avenue, Hot Springs, Garland County,  (leisure/resort) | 1 |
| ar-hot-springs | Superior Bathhouse Brewery | Superior Bathhouse Brewery, 329, Central Avenue, Hot Springs, Garland  (craft/brewery) | 1 |
| az-grand-canyon | Bearizona Wildlife Park | Bearizona Wildlife Park, 1500, Bearizona Road, Williams, Coconino Coun (tourism/zoo) | 46 |
| az-grand-canyon | Sedona Golf Resort | Sedona Golf Resort, 35, Ridge Trail Drive, Village of Oak Creek, Sedon (leisure/golf_course) | 48 |
| az-grand-canyon | The Arboretum at Flagstaff | The Arboretum at Flagstaff, 4001, Flagstaff, Coconino County, Arizona, (leisure/garden) | 8 |
| az-grand-canyon | Tlaquepaque Arts and Shopping Village | Tlaquepaque, Red Rock Scenic Byway, Uptown Sedona, Sedona, Coconino Co (building/retail) | 39 |
| az-grand-canyon | Upper Lake Mary | Upper Lake Mary, Coconino County, Arizona, United States (water/lake) | 21 |
| ca-big-sur | Carmel Valley Village | Carmel Valley Village, Carmel Valley, Monterey County, California, Uni (boundary/census) | 21 |
| ca-big-sur | Elkhorn Slough Reserve | Elkhorn Slough National Estuarine Research Reserve, Elkhorn, Monterey  (leisure/nature_reserve) | 28 |
| ca-big-sur | Pacific Grove Golf Links | Pacific Grove Golf Links, Briggs Avenue, Monarch Pines Mobile Home Par (leisure/golf_course) | 5 |
| ca-big-sur | Pebble Beach Golf Links | Pebble Beach Golf Links, 1700, 17 Mile Drive, Pebble Beach, Del Monte  (amenity/restaurant) | 6 |
| co-rockies | Red Rocks Park and Amphitheatre | Red Rocks Amphitheatre, 18300, West Alameda Parkway, Morrison, Jeffers (amenity/theatre) | 84 |
| co-rockies | SunWater Spa | Sunwater Spa, 425, Washington Avenue, Manitou Springs, El Paso County, (building/commercial) | 177 |
| ct-ri-coast | Newport Vineyards | Newport Vineyards and Winery, 909, East Main Road, Middletown, Newport (craft/winery) | 61 |
| fl-keys | National Key Deer Refuge | National Key Deer Refuge, Big Pine Key, Monroe County, Florida, 33043, (leisure/nature_reserve) | 32 |
| fl-st-augustine | San Sebastian Winery | San Sebastian Winery, King Street, Model Land Historic District, West  (craft/winery) | 1 |
| fl-st-augustine | Washington Oaks Gardens State Park | Washington Oaks Gardens State Park, Hammock Beach, Flagler County, Flo (leisure/park) | 31 |
| ga-nc-waterfalls | Pisgah Center for Wildlife Education (Davidson River) | Pisgah Center for Wildlife Education, Cat Gap Loop Trail, Transylvania (building/yes) | 8 |
| ga-nc-waterfalls | Sierra Nevada Brewing Co. | Sierra Nevada Brewing Co., 100, Sierra Nevada Way, Mills River, Hender (craft/brewery) | 28 |
| ga-nc-waterfalls | Sky Top Orchard | Sky Top Orchard, 1193, Tuxedo, Flat Rock, Henderson County, North Caro (landuse/orchard) | 27 |
| ga-nc-waterfalls | The North Carolina Arboretum | North Carolina Arboretum, 20, Asheville, Buncombe County, North Caroli (leisure/park) | 32 |
| ga-savannah | Coastal Georgia Botanical Gardens | Coastal Georgia Botanical Gardens, 2, Savannah, Chatham County, Georgi (leisure/garden) | 19 |
| ga-savannah | Savannah National Wildlife Refuge | Savannah National Wildlife Refuge, Jasper County, South Carolina, Unit (leisure/nature_reserve) | 9 |
| hi-big-island | Hawaii Tropical Bioreserve and Garden | Hawaiʻi Tropical Botanical Garden, 27-717, Hawaiʻi County, Hawaii, Uni (leisure/garden) | 9 |
| hi-big-island | Palace Theater | Palace Theater, 38, Haili Street, Downtown Hilo, Pu‘u‘eo, Hilo, Hawaiʻ (amenity/theatre) | 0 |
| ia-il-river | Dubuque Arboretum and Botanical Gardens | Dubuque Arboretum and Botanical Gardens, Dubuque, Dubuque Township, Du (leisure/garden) | 6 |
| ia-il-river | Galena Cellars Vineyard and Winery | Galena Cellars, South High Street, Galena Historic District, Galena, W (craft/winery) | 21 |
| ia-il-river | Lock and Dam No. 11 | Lock and Dam No. 11 Historic District, Eagle Point Drive, Eagle Point, (historic/maritime) | 5 |
| id-sawtooth | Sunbeam Hot Springs | Sunbeam Hot Springs, Salmon River Scenic Byway, Custer County, Idaho,  (amenity/public_bath) | 16 |
| il-chicago | Buddy Guy's Legends | Buddy Guy's Legends, 700, South Wabash Avenue, Printer's Row, Loop, Ch (amenity/nightclub) | 0 |
| il-chicago | Chicago Botanic Garden | Model Railroad Garden, Chicago Botanic Gardens Service Road, Northfiel (tourism/attraction) | 33 |
| il-chicago | Green City Market | Green City Market, 900, West Monroe Street, Greektown, West Loop, Near (amenity/marketplace) | 2 |
| in-dunes | Brown County Playhouse | Brown County Playhouse, 70, South Van Buren Street, Nashville, Brown C (amenity/cinema) | 0 |
| in-dunes | Brown County Winery | Brown County Winery, 4520, SR 46, Gnaw Bone, Brown County, Indiana, 47 (craft/winery) | 8 |
| in-dunes | Paynetown State Recreation Area (Lake Monroe) | Paynetown State Recreation Area, Monroe County, Indiana, United States (leisure/nature_reserve) | 21 |
| ky-mammoth | Barren River Lake State Resort Park | Barren River Lake State Resort Park, Barren County, Kentucky, United S (leisure/park) | 39 |
| ky-mammoth | Beech Bend Park | Beech Bend Park, 798, Bowling Green, Warren County, Kentucky, 42101, U (leisure/park) | 10 |
| la-new-orleans | Audubon Aquarium | Audubon Aquarium of the Americas, 1, Canal Street, French Quarter, New (tourism/aquarium) | 1 |
| la-new-orleans | Barataria Preserve | Jean Lafitte National Historic Park and Preserve - Barataria Preserve  (leisure/nature_reserve) | 17 |
| la-new-orleans | Frenchmen Street | Frenchmen Street, French Market, Faubourg Marigny, New Orleans, Orlean (highway/residential) | 2 |
| la-new-orleans | Preservation Hall | Preservation Hall, 726, Saint Peter Street, French Quarter, New Orlean (amenity/theatre) | 1 |
| ma-cape-cod | Cape Cod Beer | Cape Cod Beer, 1336, Phinneys Lane, Village of Barnstable, Barnstable, (amenity/pub) | 3 |
| ma-cape-cod | Cape Playhouse | Cape Cod Playhouse, 820, Route 6A, East Dennis, Dennis, Barnstable Cou (amenity/theatre) | 13 |
| ma-cape-cod | Heritage Museums and Gardens | Heritage Museums & Gardens, 67, Grove Street, Sandwich, Barnstable Cou (tourism/museum) | 21 |
| md-de-nj-shore | Cape May Point State Park | Cape May Point State Park, Sunset Beach, Lower Township, Cape May Coun (leisure/nature_reserve) | 24 |
| me-acadia | Asticou Azalea Garden | Asticou Azalea Garden, Mount Desert, Hancock County, Maine, United Sta (leisure/park) | 11 |
| mi-sleeping-bear | Arcadia Bluffs Golf Club | Arcadia Bluffs Golf Club, 14710, Northwood Highway, Arcadia, Arcadia T (leisure/golf_course) | 60 |
| mi-sleeping-bear | Chateau Chantal | Chateau Chantal, 15900, Rue de Vin, Traverse City, Grand Traverse Coun (craft/winery) | 20 |
| mi-sleeping-bear | Cherry Republic | Cherry Republic, State Street, Glen Arbor, Glen Arbor Township, Leelan (building/yes) | 33 |
| mn-north-shore | Grand Marais Art Colony | Grand Marais Art Colony, 120, West 2nd Street, Grand Marais, Cook Coun (shop/doityourself) | 129 |
| mo-ozarks | Presleys' Country Jubilee | Presleys Country Jubilee, 2920, West 76 Country Boulevard, Branson, Ta (amenity/theatre) | 5 |
| mo-ozarks | Top of the Rock | Top of the Rock Golf Course, 150, Top of the Rock Road, Taney County,  (leisure/golf_course) | 11 |
| ms-gulf-coast | Ohr-O'Keefe Museum of Art | Ohr-O’Keefe Museum of Art, Beach Boulevard, Biloxi, Harrison County, M (tourism/museum) | 2 |
| nc-high-country | Price Lake | Price Lake, Watauga County, North Carolina, United States (water/reservoir) | 11 |
| ne-ks-plains | Lake Minatare State Recreation Area | Lake Minatare, Scotts Bluff County, Nebraska, United States (water/lake) | 18 |
| nm-santa-fe | Canyon Road galleries | Canyon Road, Santa Fe, Santa Fe County, New Mexico, 87501, United Stat (highway/residential) | 2 |
| nm-santa-fe | Santa Fe Botanical Garden | Santa Fe Botanical Garden, 715, Santa Fe, Santa Fe County, New Mexico, (leisure/garden) | 3 |
| nm-santa-fe | Santa Fe Farmers' Market | Santa Fe Farmers Market, 1607, Paseo de Peralta, Santa Fe, Santa Fe Co (amenity/marketplace) | 1 |
| nm-santa-fe | Santa Fe Opera | Santa Fe Opera, 301, Opera Drive, Santa Fe County, New Mexico, 87106,  (amenity/theatre) | 9 |
| nm-santa-fe | Ten Thousand Waves | Ten Thousand Waves, 21, Ten Thousand Waves Way, Santa Fe County, New M (leisure/resort) | 5 |
| ny-finger-lakes | Dr. Konstantin Frank Winery | Dr. Konstantin Frank Wine Cellars, 9749, Middle Road, Catawba, Town of (shop/wine) | 47 |
| ny-finger-lakes | Smith Opera House | Smith Opera House, 82, Seneca Street, City of Geneva, Ontario County,  (amenity/theatre) | 1 |
| ny-finger-lakes | Sonnenberg Gardens and Mansion | Sonnenberg Gardens and Mansion State Historic Park, City of Canandaigu (leisure/park) | 24 |
| oh-hocking-hills | Lake Logan State Park | Lake Logan State Park, Falls Township, Hocking County, Ohio, United St (leisure/park) | 4 |
| oh-lake-erie | Heineman's Winery and Crystal Cave | Heineman Winery, Thompson Road, Waters Edge, Put-in-Bay Township, Otta (craft/winery) | 18 |
| ok-wichita | Lake Lawtonka | Lake Lawtonka, Comanche County, Oklahoma, United States (water/reservoir) | 20 |
| or-coast | Rogue Ales Brewer's on the Bay | Rogue Ales Brewery & Restaurant, 2320, Southeast Marine Science Drive, (building/yes) | 2 |
| pa-gettysburg | Longwood Gardens | Longwood Gardens Visitor Center, 1001, Country Club Road, Red Lion, Ke (information/office) | 57 |
| sc-charleston | Charleston City Market | Charleston City Market, 188, Meeting Street, King Street Fashion Distr (amenity/marketplace) | 1 |
| sc-charleston | Dock Street Theatre | Dock Street Theatre, 135, Church Street, King Street Antique District, (amenity/theatre) | 0 |
| sc-charleston | Kiawah Island Golf Resort | Ocean Course Drive, Otter Island, Kiawah Island, Charleston County, So (highway/residential) | 21 |
| sd-black-hills | Evans Plunge Mineral Springs | Evans Plunge, North River Street, Hot Springs, Fall River County, Sout (leisure/water_park) | 74 |
| sd-black-hills | Reptile Gardens | Reptile Gardens, 8955, South Highway 16, Rapid City, Pennington County (tourism/zoo) | 11 |
| tn-chattanooga | Tivoli Theatre | Tivoli Theatre, 709, Broad Street, North Chattanooga, Chattanooga, Ham (amenity/theatre) | 0 |
| tn-smokies | Dollywood | Dollywood Theme Park, 2700, Dollywood Lane, Pigeon Forge, Sevier Count (tourism/theme_park) | 9 |
| tn-smokies | Great Smoky Arts and Crafts Community | Glades Road, Glade, Gatlinburg, Sevier County, East Tennessee, Tenness (highway/secondary) | 5 |
| tn-smokies | Little River at Metcalf Bottoms | Metcalf Bottoms Picnic Area, Metcalf Bottoms Picnic Area Road North, M (tourism/picnic_site) | 13 |
| tn-smokies | Ole Smoky Distillery | Ole Smoky Distillery, 903, Parkway, Gatlinburg, Sevier County, East Te (shop/wine) | 1 |
| tn-smokies | Ripley's Aquarium of the Smokies | Ripley's Aquarium of the Smokies, Greystone Heights Road, Gatlinburg,  (tourism/aquarium) | 0 |
| tx-hill-country | Becker Vineyards | Becker Vineyards, Becker Farms Road, Gillespie County, Texas, 78671, U (craft/winery) | 17 |
| tx-hill-country | Lady Bird Johnson Municipal Golf Course | Lady Bird Johnson Municipal Golf Course, 341, Golfers Loop, Fredericks (leisure/golf_course) | 6 |
| tx-hill-country | Old Tunnel State Park | Old Tunnel State Park, Mt. Alamo, Kendall County, Texas, United States (leisure/park) | 20 |
| tx-hill-country | Schlitterbahn New Braunfels | Schlitterbahn West, West Austin Street, Landa Park Estates, New Braunf (leisure/water_park) | 95 |
| tx-hill-country | Vogel Orchard | Vogel Orchard, 12862, Gellermann Lane, Fredericksburg, Gillespie Count (building/yes) | 19 |
| wa-olympic | Sol Duc Hot Springs Resort | Sol Duc Hot Springs, Lover's Lane Trail, Clallam County, Washington, U (leisure/swimming_pool) | 36 |
| wi-door-county | Door Peninsula Winery | Door Peninsula Winery, 5806, State Highway 42, Carlsville, Sturgeon Ba (shop/wine) | 21 |
| wi-door-county | Northern Sky Theater | Northern Sky Theater, Nicolet Bay Trail, Town of Gibraltar, Door Count (amenity/theatre) | 4 |
| wi-door-county | Peninsula State Park Golf Course | Peninsula State Park Golf Course, 9890, Shore Road, Ephraim, Door Coun (leisure/golf_course) | 5 |
| wi-door-county | The Ridges Sanctuary | The Ridges Sanctuary, Baileys Harbor, Town of Baileys Harbor, Door Cou (leisure/nature_reserve) | 12 |
| wi-door-county | Wood Orchard Market | Wood Orchard Market, 8112, State Highway 42, Juddville, Egg Harbor, Do (building/yes) | 7 |
| wv-new-river | Tamarack Marketplace | Tamarack, Dickerson Drive, Pine Hills, Beckley, Raleigh County, West V (building/commercial) | 30 |

### Disc golf courses (14)

| Trip | Course | OpenStreetMap | km from base |
|---|---|---|---|
| sc-charleston | Four Poles Park Disc Golf Course | node/12110424356 | 11 |
| fl-panhandle | Ferry Park Disc Golf Course | node/2854344575 | 10 |
| la-new-orleans | Parc Des Families Disc Golf Course | node/11397646101 | 17 |
| tn-chattanooga | The Sinks Disc Golf Course | way/1112762982 | 9 |
| mi-sleeping-bear | Green Lake Disc Golf Park | way/977012376 | 21 |
| az-grand-canyon | Thorpe Disc Golf Park | way/467518768 | 1 |
| ca-big-sur | Ryan Ranch Disc Golf Course | way/594061586 | 7 |
| or-coast | South Beach Disc Golf Course | node/7130251501 | 4 |
| ny-finger-lakes | 5&20 Disc Golf Course | node/6397235192 | 1 |
| pa-gettysburg | TAIT Disc Golf | way/1031657125 | 14 |
| oh-hocking-hills | Eagle's Nest Disc Golf Course | way/1275388508 | 21 |
| in-dunes | Coyote Trace Disc Golf Course | node/11356990827 | 25 |
| id-sawtooth | Stanley Disc Golf Course | way/372411091 | 1 |
| il-chicago | Community Park West Disc Golf Course | node/9875711555 | 29 |

### Places already in the catalog, newly tagged (85)

- **art:** Meow Wolf Santa Fe; Santa Fe Plaza; Art Institute of Chicago; Nashville village; T.C. Steele State Historic Site; Corning Museum of Glass; Provincetown; Kitchen Kettle Village; Intercourse village; Seven Magic Mountains; Carhenge; French Market; Jackson Square
- **drinks:** Maker's Mark Distillery
- **family:** Tennessee Aquarium; Monterey Bay Aquarium; Oregon Coast Aquarium; Mystic Aquarium; Alaska SeaLife Center; National Mississippi River Museum and Aquarium; Lincoln Park Zoo; Field Museum; Cedar Point; Silver Dollar City; Waldameer Park; Hershey; Navy Pier; Sea Turtle Inc.; Meow Wolf Santa Fe; Dune Climb; Jockey's Ridge State Park; Ben and Jerry's Factory
- **fishing:** Stanley Lake; Yellowstone Lake; Lake McDonald; Two Medicine Lake; Lake Crescent; Seneca Lake State Park; Lake Mead Visitor Center; Pedernales Falls State Park; Lamar Valley; Custer State Park; Put-in-Bay; Franconia Notch State Park
- **gardens:** Magnolia Plantation and Gardens; Garvan Woodland Gardens; Rock City Gardens; New Orleans City Park; South Padre Island Birding and Nature Center; Tom Ridge Environmental Center
- **lights:** Silver Dollar City
- **markets:** Lancaster Central Market; Hilo Farmers Market; French Market; Forsyth Park
- **music:** Gruene Hall; Luckenbach
- **spa:** Bathhouse Row
- **themeparks:** Silver Dollar City; Cedar Point; Waldameer Park; Hershey; Navy Pier; Ocean City Boardwalk; Rehoboth Beach Boardwalk; Blue Whale of Catoosa; Rock City Gardens
- **wildlife:** Bon Secour National Wildlife Refuge; Pea Island National Wildlife Refuge; Laguna Atascosa National Wildlife Refuge; South Padre Island Birding and Nature Center; Sea Turtle Inc.; Lamar Valley; Cades Cove Loop; Oconaluftee Visitor Center; Turnagain Arm Beluga Point; Custer State Park; Tallgrass Prairie National Preserve; Assateague Island Visitor Center; Haystack Rock; Yaquina Head Lighthouse; Mount Scott; Many Glacier; Seward small boat harbor; South Unit Scenic Loop

### Camping (50 stops)

| Trip | Stop | Nearest campground in OpenStreetMap | km |
|---|---|---|---|
| ak-kenai | Exit Glacier | Exit Glacier Campground | 0.8 |
| ak-kenai | Kenai Fjords National Park Visitor Center | Tent Area Campground | 1.4 |
| al-gulf-shores | Gulf State Park Pier | Gulf State Park Campground | 2.3 |
| az-grand-canyon | Mather Point | Trailer Village RV Park | 1.0 |
| ca-big-sur | Pfeiffer Big Sur State Park | Riverside Campground & Cabins | 2.3 |
| co-rockies | Beaver Meadows Visitor Center | Spruce Lake RV Park | 1.6 |
| ct-ri-coast | Gillette Castle State Park | Wolf's Den Family Campground | 2.7 |
| fl-keys | Bahia Honda State Park | Buttonwood Campground | 0.3 |
| fl-keys | John Pennekamp Coral Reef State Park | King's Kamp RV Park and Marina | 1.6 |
| fl-panhandle | St. Andrews State Park | Saint Andrews State Park Campground | 0.9 |
| ga-nc-waterfalls | Tallulah Gorge State Park | Terrora Campground | 0.8 |
| ia-il-river | Eagle Point Park | Miller Riverview Park & Campground | 1.9 |
| ia-il-river | Pikes Peak State Park | Pikes Peak State Park | 0.5 |
| id-sawtooth | Redfish Lake | Glacier View Campground | 0.5 |
| id-sawtooth | Stanley Lake | Stanley Lake Campground | 0.7 |
| in-dunes | Brown County State Park | Buffalo Ridge Campground | 0.9 |
| in-dunes | Indiana Dunes State Park | Indiana Dunes State Park Campground | 2.0 |
| ky-mammoth | Cumberland Falls State Resort Park | Clifty Campground | 0.5 |
| ky-mammoth | Mammoth Cave Visitor Center | Mammoth Cave Campground | 0.7 |
| md-de-nj-shore | Cape Henlopen State Park | Cape Henlopen State Park Campground | 0.8 |
| mi-sleeping-bear | Dune Climb | D.H. Day Campground | 2.4 |
| mn-north-shore | Gooseberry Falls State Park | Gooseberry Falls State Park Campground | 0.8 |
| mo-ozarks | Lake Taneycomo trout fishing | Branson Lakeside RV Park | 0.9 |
| mo-ozarks | Table Rock Dam and Lake | Branson Stagecoach RV Park | 1.7 |
| ms-gulf-coast | Davis Bayou, Gulf Islands National Seashore | RV Campground | 2.4 |
| mt-glacier | Apgar Village | Apgar Campground | 0.9 |
| mt-glacier | Lake McDonald | Apgar Campground | 0.7 |
| mt-glacier | Many Glacier | Many Glacier Campground | 1.4 |
| nc-high-country | Grandfather Mountain | McRowdy Campground | 0.6 |
| nd-roosevelt | South Unit Scenic Loop | Cottonwood Campground | 2.5 |
| nh-vt-mountains | Franconia Notch State Park | Lafayette Campground | 0.5 |
| nm-santa-fe | Bandelier National Monument | Juniper Campground Loop A | 2.1 |
| nv-valley-of-fire | Lake Mead Visitor Center | Hemenway Campground | 2.3 |
| ny-finger-lakes | Watkins Glen State Park | Six Nations Campground | 1.6 |
| oh-hocking-hills | Old Man's Cave | Old Man's Cave Campground | 0.5 |
| pa-erie | Tom Ridge Environmental Center | Sara's Campground | 0.2 |
| sd-black-hills | Badlands Ben Reifel Visitor Center | Cedar Pass Campground | 0.9 |
| sd-black-hills | Needles Highway | Sylvan Lake Campground | 2.5 |
| tn-smokies | Cades Cove Loop | Cades Cove Campground | 0.2 |
| tn-smokies | Oconaluftee Visitor Center | Cherokee Riverfront RV Park | 1.6 |
| ut-mighty-five | Bryce Canyon Inspiration Point | Sunset Campground | 0.5 |
| ut-mighty-five | Goblin Valley State Park | Goblin Valley Campground | 3.0 |
| ut-mighty-five | Zion Canyon Visitor Center | Watchman Campground | 0.4 |
| va-shenandoah | Big Meadows | Big Meadows Campground | 0.3 |
| va-shenandoah | Dark Hollow Falls | Big Meadows Campground | 1.6 |
| wa-olympic | Hoh Rain Forest Visitor Center | Hoh Rainforest Campground | 0.3 |
| wa-olympic | Sol Duc Falls | Deer Lake Campground | 2.8 |
| wi-door-county | Peninsula State Park | Fish Creek Campground | 1.9 |
| wv-new-river | Canyon Rim Visitor Center | Chestnut Creek Campground | 1.3 |
| wy-yellowstone | Mammoth Hot Springs | Mammoth Campground | 0.8 |

### Searched and left out

Not found by name, or the match was a different place, so these were left out rather than guessed: Bellingrath Gardens and Home (al-gulf-shores); Wildseed Farms (tx-hill-country); SCAD Museum of Art (ga-savannah); Watauga County Farmers' Market (nc-high-country); Dubuque Farmers' Market (ia-il-river); Red Jacket Orchards (ny-finger-lakes); Lake Estes Marina (co-rockies); Orilla Verde Recreation Area (Rio Grande) (nm-santa-fe); Lake Arrowhead Park (va-shenandoah). Also rejected on review: Sun Valley Golf Course (the matches were courses in Kentucky and Iowa), Sandestin (the match was the community, not the golf resort), and Bernheim Forest (the match was the middle of the forest, far from the visitor center).

### Fishing license pages (all 50 states)

Each state's page was found by a separate research pass and then opened again from a Windows computer on 2026-10-15. 45 pages answered with the page title below and text about fishing licenses. Five refused automated requests (403 or a certificate error, or a page drawn by script); those were opened with a web reader instead, which showed the title in the last column.

| State | Page | Checked |
|---|---|---|
| AL | <https://myoutdooralabama.com/> | Outdoor Alabama - Home |
| AK | <https://www.adfg.alaska.gov/store/> | Welcome to the ADF&G Store - State of Alaska Department of Fish and Game Online Store |
| AZ | <https://license.azgfd.com/> | Home - AZGFD License |
| AR | <https://www.agfc.com/licenses> | Home - Arkansas Game and Fish Commission |
| CA | <https://wildlife.ca.gov/Licensing/Online-Sales> | Online License Sales and Services |
| CO | <https://cpw.state.co.us/buy-apply> | Hunting and Fishing Licenses - Colorado Parks and Wildlife IPAWS |
| CT | <https://portal.ct.gov/DEEP/Fishing/General-Information/Fisheries-Licenses-and-Permits> | Fisheries Licenses and Permits |
| DE | <https://dnrec.delaware.gov/fish-wildlife/licenses/> | Recreational Licensing - DNREC |
| FL | <https://gooutdoorsflorida.com/> | Official Florida Fishing and Hunting Licenses / Go Outdoors Florida |
| GA | <https://gooutdoorsgeorgia.com/> | Official Georgia Fishing and Hunting Licenses / Go Outdoors Georgia |
| HI | <https://dlnr.hawaii.gov/dar/licenses-and-permits/freshwater-game-fishing-license/> | Freshwater Game Fishing License - Division of Aquatic Resources |
| ID | <https://idfg.idaho.gov/buy-online> | Customer Lookup |
| IL | <https://www.exploremoreil.com/> | ExploreMore IL - Home |
| IN | <https://www.in.gov/dnr/fish-and-wildlife/licenses-and-permits/> | Fish and Wildlife: Licenses & Permits |
| IA | <https://gooutdoorsiowa.com/> | Official Iowa Fishing and Hunting Licenses / Go Outdoors Iowa |
| KS | <https://www.gooutdoorskansas.gov/> | Official Kansas Fishing and Hunting Licenses / Go Outdoors Kansas |
| KY | <https://fw.ky.gov/Licenses/Pages/default.aspx> | Licenses - Kentucky Department of Fish & Wildlife |
| LA | <https://www.wlf.louisiana.gov/page/recreational-fishing-licenses-and-permits> | Recreational Fishing Licenses and Permits / Louisiana Department of Wildlife and Fisheries |
| ME | <https://apps1.web.maine.gov/cgi-bin/online/moses_v3/index> | IFW Hunting & Fishing Licenses / Department of Inland Fisheries & Wildlife |
| MD | <https://dnr.maryland.gov/Pages/service_fishing_license.aspx> | Maryland Sport Fishing & Crabbing Licenses |
| MA | <https://www.mass.gov/how-to/buy-your-freshwater-fishing-license> | web reader: Buy your freshwater fishing license (MassFishHunt link) |
| MI | <https://www.mdnr-elicense.com/> | Michigan DNR eLicense Home |
| MN | <https://www.dnr.state.mn.us/licenses/online-sales.html> | Online license sales / Minnesota DNR |
| MS | <https://www.mdwfp.com/licenses-permits> | web reader: Purchase a License (MDWFP) |
| MO | <https://mdc-web.s3licensing.com/> | Online-Sales / Missouri Department of Conservation |
| MT | <https://ols.fwp.mt.gov/> | FWP Online Licenses |
| NE | <https://outdoornebraska.gov/permits/> | web reader: Permits page, Buy a permit (Go Outdoors Nebraska) |
| NV | <https://www.ndow.org/apply-buy/fishing/> | Apply & Buy - Nevada Fishing |
| NH | <https://www.nhfishandgame.com/> | Welcome to New Hampshire Fish and Game Department's online license system |
| NJ | <https://dep.nj.gov/njfw/licenses-and-permits/fishing-and-hunting-license-and-permit-information/> | web reader: Fishing and Hunting License and Permit Information |
| NM | <https://wildlife.dgf.nm.gov/fishing/licenses-permits/> | Licenses & Permits - NMDOW |
| NY | <https://dec.ny.gov/regulatory/permits-licenses/sporting-and-use/sporting/decals> | web reader: DEC Automated Licensing System (DECALS) |
| NC | <https://www.gooutdoorsnorthcarolina.com/> | Official North Carolina Fishing and Hunting Licenses / Go Outdoors North Carolina |
| ND | <https://gf.nd.gov/buy-apply> | Buy and Apply / North Dakota Game and Fish |
| OH | <https://ohiodnr.gov/buy-and-apply/hunting-fishing-boating/fishing-resources/fishing-licenses> | Buy Your Fishing License |
| OK | <https://gooutdoorsoklahoma.com/> | Official Oklahoma Fishing and Hunting Licenses / Go Outdoors Oklahoma |
| OR | <https://myodfw.com/articles/how-buy-license-or-tag> | How to buy a license or tag / Oregon Department of Fish & Wildlife |
| PA | <https://www.huntfish.pa.gov/> | HuntFishPA - Home |
| RI | <https://rio.ri.gov/> | RIO - Rhode Island Outdoors - Home |
| SC | <https://gooutdoorssouthcarolina.com/> | Official South Carolina Fishing and Hunting Licenses / Go Outdoors South Carolina |
| SD | <https://gfp.sd.gov/hunt-fish-license/> | Hunting and Fishing Licenses / South Dakota Game, Fish, and Parks |
| TN | <https://gooutdoorstennessee.com/> | Official Tennessee Fishing and Hunting Licenses / Go Outdoors Tennessee |
| TX | <https://tpwd.texas.gov/business/licenses/online_sales/> | Official Online Fishing & Hunting License Sales |
| UT | <https://wildlife.utah.gov/licenses.html> | Overview - Licenses & permits - Utah Division of Wildlife Resources |
| VT | <https://www.vtfwdsales.com/online/cid_entry.php> | License Sales / Department of Fish & Wildlife |
| VA | <https://gooutdoorsvirginia.com/> | Official Virginia Fishing and Hunting Licenses / Go Outdoors Virginia |
| WA | <https://wdfw.wa.gov/licenses/fishing> | Fishing and shellfishing licenses / Washington Department of Fish & Wildlife |
| WV | <https://wvdnr.gov/buy-a-license/> | Buy Your WV Hunting & Fishing License Online: Easy & Secure - WVDNR |
| WI | <https://dnr.wisconsin.gov/topic/Fishing/outreach/FishingLicenses> | Fishing licenses / Fishing Wisconsin / Wisconsin DNR |
| WY | <https://wgfd.wyo.gov/licenses-applications> | Licenses & Applications / Wyoming Game & Fish Department |

## Cruise Day: ports, excursion pages, and tender ports (2026-10-17)

Shore excursion pages were opened on 2026-10-17 with a page reader. The reader does not report redirects, so the address a visitor finally lands on is UNVERIFIED. Viator and GetYourGuide blocked the reader (robots rules). On 2026-10-17 both search addresses were opened in a desktop Chrome browser for "Cozumel shore excursions" and "Skagway shore excursions": Viator (`https://www.viator.com/searchResults/all?text=...`) showed 200+ and 56 results, and GetYourGuide (`https://www.getyourguide.com/s/?q=...`) showed 252 and 23 results. Viator showed a brief automatic device check that passed without input. The app links both searches beside the nine cruise lines below. Results for the other ports are UNVERIFIED.

| Line | Address | What opened |
|---|---|---|
| Royal Caribbean | <https://www.royalcaribbean.com/booked/shore-excursions> | Opens without a visible sign-in wall; browse by type, no port search (links to port guides). |
| Carnival | <https://www.carnival.com/shore-excursions> | Opens; public excursions page. |
| Norwegian | <https://www.ncl.com/shore-excursions> | Opens; search by destination, port, and activity. |
| Princess | <https://www.princess.com/shore-excursions> | Opens; filters 413 excursions by destination and port. |
| Holland America | <https://www.hollandamerica.com/en/sf/shorex> | Opens; describes the tours, no port search. The booking page asks for sign-in. |
| Celebrity | <https://www.celebritycruises.com/booked/excursions> | Opens without a visible sign-in wall; browse by type, no port search. |
| Disney | <https://disneycruise.disney.go.com/why-cruise-disney/whats-included-in-cruise/port-adventures/> | Opens; describes the Port Adventure types, no list by port. |
| Viking | <https://www.vikingcruises.com/oceans/why-viking/shore-excursions> | Opens; included and optional excursions; booking is in My Viking Journey. |
| MSC | <https://www.msccruisesusa.com/excursions> | Opens; the page reports no redirect; Find an excursion leads to booking. |

### Tender ports

Two lists were read: the [Norwegian Cruise Line tender port list](https://www.ncl.com/ca/en/about/accessible-cruising-tender-ports) (asterisk means the ship can dock or anchor, varies by call) and the [Planet Cruise full tender list](https://help.planetcruise.com/hc/en-gb/articles/6709997918748-Tender-ports-Full-list-by-destination) (notes that some ports are only partial tenders). Hawaii and Alaska were also read in two guides ([Hawaii cruise ports](https://thehawaiivacationguide.com/hawaii-cruise-ports/), [Alaska cruise ports](https://www.cruisehive.com/alaska-cruise-ports/100083)). The Hawaii sources conflict: the Norwegian list names Hilo, Honolulu, Kahului, and Nawiliwili, and the guide calls them piers; the app shows them as May be a tender port. Lahaina is left out: the guide says it has not been in use since the August 2023 fires. Bermuda and Nassau appear on neither list (UNVERIFIED). A ship can dock or tender depending on the call, so the app says usually or may and sends the traveler to the ship's daily schedule.

| Port | In the app | Basis |
|---|---|---|
| Nassau | unknown | Not covered by either list |
| George Town, Grand Cayman | tender | On the Norwegian tender list without an asterisk, or on both lists |
| Cozumel | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Costa Maya | pier | On neither list |
| Roatan | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Belize City | tender | On the Norwegian tender list without an asterisk, or on both lists |
| Ocho Rios | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Grand Turk | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| St. Thomas | pier | On neither list |
| Philipsburg, St. Maarten | pier | On neither list |
| San Juan | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Key West | pier | On neither list |
| Royal Naval Dockyard, Bermuda | unknown | Not covered by either list |
| Oranjestad, Aruba | pier | On neither list |
| Cabo San Lucas | tender | On the Norwegian tender list without an asterisk, or on both lists |
| Puerto Vallarta | pier | On neither list |
| Mazatlan | pier | On neither list |
| Ensenada | pier | On neither list |
| Galveston | pier | On neither list |
| New Orleans | pier | On neither list |
| Miami | pier | On neither list |
| Fort Lauderdale (Port Everglades) | pier | On neither list |
| Port Canaveral | pier | On neither list |
| Tampa | pier | On neither list |
| Seattle | pier | On neither list |
| San Diego | pier | On neither list |
| New York City (Manhattan) | pier | On neither list |
| Boston | pier | On neither list |
| Juneau | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Ketchikan | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Skagway | pier | On neither list |
| Sitka | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Honolulu | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Kahului, Maui | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Kailua-Kona | tender | On the Norwegian tender list without an asterisk, or on both lists |
| Hilo | varies | On a list, marked 'dock or anchor, varies by call', or the two sources disagree |
| Victoria, BC | pier | On neither list |
| Vancouver | pier | On neither list |
| Halifax | pier | On neither list |
| Bar Harbor | tender | On the Norwegian tender list without an asterisk, or on both lists |

Re-checked on 2026-10-20: a port on neither list now shows `pier` only when OpenStreetMap shows a cruise or passenger
terminal, or a cruise pier, there, or a source cited here names its cruise docks (Skagway). Costa Maya, Key West, Port
Canaveral, Victoria, Vancouver, and Halifax now show `unknown` (Dock or tender not confirmed). See "Earlier ports
re-checked" in the 2026-10-20 section below.

### Port points

Distances come from a point for the port. Where OpenStreetMap had no cruise terminal under the name searched, the point is the town or harbor, not the pier (UNVERIFIED terminal position). The ship stop in an itinerary uses that point as coordinates.

| Port | Point found |
|---|---|
| Nassau | Prince George Wharf, Nassau, New Providence, The Bahamas (25.0798, -77.3424) |
| George Town, Grand Cayman | George Town, Cayman Islands (19.2954, -81.3808) |
| Cozumel | Puerta Maya, San Miguel, San Miguel de Cozumel, Cozumel, Quintana Roo, México (20.4759, -86.9748) |
| Costa Maya | Mahahual, Othón P. Blanco, Quintana Roo, 77976, México (18.7257, -87.7072) |
| Roatan | Coxen Hole, Roatán, Islas de la Bahía, 34101, Honduras (16.3211, -86.5383) |
| Belize City | Belize City, Belize District, Belize (17.5003, -88.1989) |
| Ocho Rios | Ocho Rios, Saint Ann, Middlesex County, Jamaica (18.4081, -77.1011) |
| Grand Turk | Turks and Caicos National Museum, Front Street, Cockburn Town, Grand Turk, Turks and Caico (21.4713, -71.1474) |
| St. Thomas | Saint Thomas Harbor, Havensight, Charlotte Amalie West, Estate Thomas, Saint Thomas - Sain (18.3300, -64.9288) |
| Philipsburg, St. Maarten | Philipsburg, Sint Maarten, Nederland (18.0251, -63.0483) |
| San Juan | Muelle 3, Paseo Dr. Gilberto Concepción de Gracia, Viejo San Juan, San Juan, Puerto Rico,  (18.4622, -66.1117) |
| Key West | Mallory Square, Key West, Monroe County, Florida, United States (24.5592, -81.8067) |
| Royal Naval Dockyard, Bermuda | Royal Naval Dockyard, Sandys, MA 01, Bermuda (32.3276, -64.8340) |
| Oranjestad, Aruba | Oranjestad, Aruba, Nederland (12.5201, -70.0371) |
| Cabo San Lucas | Mi Mexico Arts, Crafts & Jewelry, Paseo de La Marina, El Médano Ejidal, Cabo San Lucas, Mu (22.8855, -109.9088) |
| Puerto Vallarta | Terminal marítima, Francisco Medina Ascencio, Puerto Vallarta, Región Costa Norte, Jalisco (20.6542, -105.2407) |
| Mazatlan | Mazatlán, Sinaloa, 82000, México (23.2036, -106.4208) |
| Ensenada | Ensenada, Municipio de Ensenada, Baja California, México (31.8659, -116.6030) |
| Galveston | Port of Galveston Cruise Terminal 25, 2502, Harborside Drive, Galveston, Galveston County, (29.3085, -94.7966) |
| New Orleans | New Orleans, Orleans Parish, Louisiana, United States (29.9575, -90.0629) |
| Miami | Miami, Miami-Dade County, Florida, United States (25.7742, -80.1936) |
| Fort Lauderdale (Port Everglades) | Port Everglades, Fort Lauderdale, Broward County, Florida, 33316, United States (26.0969, -80.1273) |
| Port Canaveral | Port Canaveral, Brevard County, Florida, 32920, United States (28.4161, -80.6078) |
| Tampa | Tampa, Hillsborough County, Florida, United States (27.9450, -82.4583) |
| Seattle | Seattle, King County, Washington, United States (47.6038, -122.3301) |
| San Diego | San Diego, San Diego County, California, United States (32.7157, -117.1638) |
| New York City (Manhattan) | Manhattan Cruise Terminal, Manhattan Community Board 4, Manhattan, New York County, New Yo (40.7677, -73.9990) |
| Boston | Black Falcon Cruise Terminal, Seaport, Boston, Suffolk County, Massachusetts, United State (42.3440, -71.0307) |
| Juneau | Juneau, Alaska, United States (58.3020, -134.4197) |
| Ketchikan | Ketchikan, Ketchikan Gateway Borough, Alaska, 99901, United States (55.3431, -131.6467) |
| Skagway | Broadway, Skagway, Alaska, 99840, United States (59.4570, -135.3121) |
| Sitka | Crescent Harbor, Barlow Street, Sitka, Alaska, 99835, United States (57.0497, -135.3281) |
| Honolulu | Aloha Tower Marketplace, 1, Aloha Tower Drive, Downtown, Chinatown, Honolulu, Honolulu Cou (21.3067, -157.8656) |
| Kahului, Maui | Kahului Harbor, Kahului, Maui County, Hawaii, United States (20.8958, -156.4719) |
| Kailua-Kona | Kailua Pier, Aliʻi Drive, Hillcrest, Kailua, Hawaiʻi County, Hawaii, 96840, United States (19.6392, -155.9968) |
| Hilo | Hilo, Hawaiʻi County, Hawaii, 96720, United States (19.7074, -155.0816) |
| Victoria, BC | Victoria, Capital Regional District, British Columbia, Canada (48.4283, -123.3650) |
| Vancouver | Canada Place, Financial District, Downtown, Vancouver, Metro Vancouver Regional District,  (49.2885, -123.1169) |
| Halifax | Halifax, Halifax Regional Municipality, Halifax County, Nova Scotia, Canada (44.6486, -63.5859) |
| Bar Harbor | Bar Harbor Town Pier, Ells Pier, Bar Harbor, Hancock County, Maine, 04644, United States (44.3921, -68.2041) |

### Places (235)

Each place was searched by name on OpenStreetMap Nominatim, then kept only when a result matched the name and sat within 130 km of the port point. Addresses follow lesson L-028: a house number only when OpenStreetMap gives both number and road.

| Port | Place | Matched on OpenStreetMap | km from port point |
|---|---|---|---|
| Nassau | Queen's Staircase | The Queen's Staircase, Nassau, New Providence, The Bahamas | 0.9 |
| Nassau | Fort Fincastle | Fort Fincastle, Greenwich Street, Nassau, New Providence, The Bahamas | 0.8 |
| Nassau | Junkanoo Beach | Junkanoo Beach, Nassau, New Providence, The Bahamas | 0.6 |
| Nassau | Cabbage Beach | Cabbage Beach, Nassau, New Providence, The Bahamas | 2.5 |
| Nassau | Atlantis Aquaventure | Atlantis Paradise Island, 1, Casino Drive, Nassau, New Providence, The Bahamas | 2.1 |
| Nassau | Straw Market | Straw Market, Market Street, Nassau, New Providence, The Bahamas | 0.2 |
| Nassau | Ardastra Gardens, Zoo and Conservation Centre | Ardastra Gardens, Zoo & Conservation Centre, Infant View Road, Chippingham, Nass | 2.0 |
| George Town, Grand Cayman | Queen Elizabeth II Botanic Park | Queen Elizabeth II Botanic Park, Old Isaacs, George Town, KY1-1105, Cayman Islan | 22.3 |
| George Town, Grand Cayman | Cayman Islands National Museum | National Museum, Goring Avenue, Rock Hole, George Town, KY1-1105, Cayman Islands | 0.3 |
| George Town, Grand Cayman | Hell, Grand Cayman | Hell, West Bay, KY1-1401, Cayman Islands | 9.4 |
| George Town, Grand Cayman | Pedro St. James | Pedro St. James, Pedro Castle Road, Savannah, George Town, KY1-1105, Cayman Isla | 9.9 |
| George Town, Grand Cayman | Cayman Spirits Distillery | Cayman Spirits Co., Esterley Tibbetts Highway, The Rock, Whitehall Estate, Georg | 1.2 |
| Cozumel | Chankanaab Beach Adventure Park | Parque Natural Laguna de Chankanaab, Nojoch Suku'un, San Miguel de Cozumel, Cozu | 4.2 |
| Cozumel | Playa Mia Grand Beach Park | Playa Mia, Casa Birdie, Cozumel, Quintana Roo, México | 10.0 |
| Cozumel | San Gervasio Mayan Ruins | San Gervasio, QR, San Antonio, Cozumel, Quintana Roo, 77680, México | 13.6 |
| Cozumel | Punta Sur Eco Beach Park | Punta Sur Eco Beach Park, Carretera Perimetral Cozumel, Playa Bosh, El Cedral, C | 19.9 |
| Cozumel | Cozumel town plaza | Parque Benito Juárez, 5a Av. Sur, Centro, San Miguel de Cozumel, Cozumel, Quinta | 4.6 |
| Cozumel | Mr. Sanchos Beach Club | Mr Sanchos, Playa Mía, Cozumel, Quintana Roo, México | 10.6 |
| Cozumel | Cozumel Museum | Museo de la Isla de Cozumel, Avenida Rafael E. Melgar, Gonzálo Guerrero, San Mig | 5.0 |
| Costa Maya | Chacchoben Mayan Ruins | Chacchoben, Bacalar, Quintana Roo, México | 60.0 |
| Costa Maya | Mahahual malecon | Calle Malecon, Mahahual, Othón P. Blanco, Quintana Roo, 77976, México | 0.6 |
| Costa Maya | Bacalar Lagoon | Laguna de Bacalar, Othón P. Blanco, Quintana Roo, México | 57.6 |
| Costa Maya | Cenote Azul | Cenote Azul, Boulevard Costera, Bacalar, Quintana Roo, 77933, México | 74.9 |
| Costa Maya | Fuerte de San Felipe Bacalar | Fuerte de San Felipe, Boulevard 1, Bacalar, Quintana Roo, 97326, México | 72.0 |
| Roatan | West Bay Beach | West Bay Beach, West Bay, Roatán, Islas de la Bahía, 33166, Honduras | 8.3 |
| Roatan | Gumbalimba Park | Gumbalimba Park, Carril de Palma, West Bay, Roatán, Islas de la Bahía, 33166, Ho | 7.5 |
| Roatan | Carambola Botanical Gardens | Carambola Gardens, Carretera Principal de la Isla de Roatán, Sandy Bay Point, Co | 3.6 |
| Roatan | Maya Key | Maya Key, Coxen Hole, Roatán, Islas de la Bahía, Honduras | 1.2 |
| Belize City | Altun Ha | Altun Ha, Belize District, Belize | 33.2 |
| Belize City | Xunantunich | Xunantunich Blvd, Lord's Bank, Belize District, Belize | 13.7 |
| Belize City | Lamanai | Lamanai Archaeological Reserve, Orange Walk, Belize | 56.7 |
| Belize City | Cave tubing at Jaguar Paw | Cave Tubing and Zipline with Explore Belize Caves, Old Well Road, Lord's Bank, B | 14.9 |
| Ocho Rios | Dunn's River Falls | Dunn's River Falls, Ocho Rios, Saint Ann, Middlesex County, Jamaica | 4.2 |
| Ocho Rios | Mystic Mountain | Mystic Mountain, Governors Hill Road, Pimento Walk, Murphy Hill, Ocho Rios, Sain | 2.0 |
| Ocho Rios | Konoko Falls and Park | Konoko Falls, Ocho Rios, Saint Ann, Middlesex County, Jamaica | 1.3 |
| Ocho Rios | Fern Gully | Fern Gully, Ocho Rios, Saint Ann, Middlesex County, Jamaica | 3.8 |
| Ocho Rios | Bob Marley Centre and Mausoleum | Bob Marley Mausoleum, Nine Mile Road, Syms Run, Nine Mile, Saint Ann, Middlesex  | 22.4 |
| Grand Turk | Cockburn Town | Grand Turk, Cockburn Town, Grand Turk, Turks and Caicos Islands | 1.0 |
| Grand Turk | Turks and Caicos National Museum | Turks and Caicos National Museum, Front Street, Cockburn Town, Grand Turk, Turks | 0.0 |
| Grand Turk | Grand Turk Lighthouse | Grand Turk Lighthouse, Lighthouse Road, Cockburn Town, Grand Turk, Turks and Cai | 4.7 |
| Grand Turk | Governors Beach | Governor's Beach, Cockburn Town, Grand Turk, Turks and Caicos Islands | 3.5 |
| Grand Turk | Jack's Shack | jack's Shack beach bar, Waterloo Road, Cockburn Town, Grand Turk, Turks and Caic | 4.3 |
| St. Thomas | Magens Bay Beach | Magens Bay, Charlotte Amalie West, Peterborg, Saint Thomas - Saint John District | 3.4 |
| St. Thomas | Coral World Ocean Park | Coral World Ocean Park, 6450, Coki Point Road, Coki Point, Frydendal, Saint Thom | 7.2 |
| St. Thomas | Paradise Point Tramway | Paradise Point Drive, Havensight, Estate Thomas, Saint Thomas - Saint John Distr | 1.3 |
| St. Thomas | Fort Christian | Fort Christian, 280, Forte Strade, Charlotte Amalie Historic District, Fort Chri | 1.2 |
| St. Thomas | Mountain Top | Mountain Top, Saint Peter, Saint Thomas - Saint John District, United States Vir | 3.4 |
| St. Thomas | Drake's Seat | Drake's Seat, Skyline Drive, Zufriedenheit, Charlotte Amalie West, Estate Thomas | 2.6 |
| St. Thomas | Mahogany Run Golf Course | Mahogany Run Golf Course, Mahogany Run North, Mandal, Saint Thomas - Saint John  | 4.1 |
| Philipsburg, St. Maarten | Maho Beach | Maho Beach, Maho, Lowlands, Sint Maarten, Nederland | 7.8 |
| Philipsburg, St. Maarten | Orient Bay Beach | Baie Orientale, Saint-Martin, 97150, France | 7.4 |
| Philipsburg, St. Maarten | Fort Amsterdam | Fort Amsterdam, Philipsburg, Sint Maarten, Nederland | 1.5 |
| Philipsburg, St. Maarten | Marigot Market | Marigot Market, Boulevard de France, Galisbay, Marigot, Saint-Martin, 97150, Fra | 6.2 |
| Philipsburg, St. Maarten | Loterie Farm | La Loterie Farm, 103, Colombier, Rambaud, Saint-Martin, 97150, France | 6.0 |
| San Juan | Castillo San Cristobal | Castillo San Cristóbal, Calle de Norzagaray, La Perla, Viejo San Juan, San Juan, | 0.6 |
| San Juan | Castillo San Felipe del Morro | Castillo San Felipe del Morro, Paseo del Morro, La Perla, Viejo San Juan, San Ju | 1.6 |
| San Juan | El Yunque National Forest | Bosque Nacional El Yunque, Río Grande, Puerto Rico, United States | 39.3 |
| San Juan | Old San Juan | Viejo San Juan, San Juan, Puerto Rico, United States | 0.7 |
| San Juan | Condado Beach | Playita del Condado, Santurce, San Juan, Puerto Rico, United States | 4.1 |
| San Juan | Paseo de la Princesa | Paseo de la Princesa, La Perla, Viejo San Juan, San Juan, Puerto Rico, 00901, Un | 0.9 |
| Key West | Southernmost Point | Southernmost Point Buoy, Southernmost Point, Upper Duval, Old Town, Key West, Mo | 1.7 |
| Key West | Fort Zachary Taylor Historic State Park | Fort Zachary Taylor Historic State Park, 601, Key West, Monroe County, Florida,  | 1.4 |
| Key West | Key West Lighthouse | Key West Lighthouse, Whitehead Street, Bahama Village, Old Town, Key West, Monro | 1.1 |
| Key West | Key West Butterfly and Nature Conservatory | Key West Butterfly & Nature Conservatory, Duval Street, Upper Duval, Old Town, K | 1.6 |
| Key West | Duval Street | Duval Street, Lower Duval, Old Town, Key West, Monroe County, Florida, 33041, Un | 0.2 |
| Key West | Key West Aquarium | Key West Aquarium, Wall Street, Lower Duval, Key West, Monroe County, Florida, 3 | 0.1 |
| Royal Naval Dockyard, Bermuda | Horseshoe Bay Beach | Horseshoe Bay Beach, Southampton, Bermuda | 8.5 |
| Royal Naval Dockyard, Bermuda | Gibbs Hill Lighthouse | Gibbs Hill Lighthouse, St. Anne's Road, Southampton, SN 02, Bermuda | 8.3 |
| Royal Naval Dockyard, Bermuda | Crystal Caves | The Crystal Caves, 8, Crystal Cave Road, Hamilton, CR 04, Bermuda | 11.6 |
| Royal Naval Dockyard, Bermuda | Hamilton | Front Street, City of Hamilton, HM 11, Bermuda | 6.1 |
| Royal Naval Dockyard, Bermuda | St. George's | St. George's, Bermuda | 13.7 |
| Royal Naval Dockyard, Bermuda | Bermuda Aquarium, Museum and Zoo | Bermuda Aquarium, Museum & Zoo, 40, North Shore Road, Flatts, Hamilton, FL 04, B | 9.1 |
| Oranjestad, Aruba | Eagle Beach | Eagle Beach, Bushiri, Oranjestad West, Oranjestad, Aruba, Nederland | 3.8 |
| Oranjestad, Aruba | Arikok National Park | Arikok National Park, San Fuego, Santa Cruz, Aruba, Nederland | 9.9 |
| Oranjestad, Aruba | California Lighthouse | California Lighthouse, Hudishibana, Noord overig, Aruba, Nederland | 10.5 |
| Oranjestad, Aruba | Natural Pool Aruba | New Small Natural Pool, Matividiri, Matidiviri, Wayaca, Santa Cruz, Aruba, Neder | 7.7 |
| Oranjestad, Aruba | Alto Vista Chapel | Alto Vista Chapel, Altovista Trail, Noord overig, Aruba, Nederland | 6.8 |
| Oranjestad, Aruba | Butterfly Farm Aruba | The Butterfly Farm, J.E. Irausquin Boulevard, Bubali, Aruba, Nederland | 5.0 |
| Cabo San Lucas | El Arco | El Arch of Cabo San Lucas, Grand Solmar, Cabo San Lucas, Municipio de Los Cabos, | 1.8 |
| Cabo San Lucas | Lover's Beach | Playa de los Amantes, Cabo San Lucas, Municipio de Los Cabos, Baja California Su | 1.6 |
| Cabo San Lucas | Medano Beach | Playa El Médano, Cabo Bello, Cabo San Lucas, Municipio de Los Cabos, Baja Califo | 1.9 |
| Cabo San Lucas | San Jose del Cabo | Kiosco San José, Plaza Mijares, San José del Cabo, Municipio de Los Cabos, Baja  | 29.4 |
| Cabo San Lucas | Cabo Wabo Cantina | Cabo Wabo Cantina, Calle Vicente Guerrero, Centro, Cabo San Lucas, Municipio de  | 0.5 |
| Cabo San Lucas | Cabo San Lucas Marina | Marina Cabo San Lucas, Paseo de La Marina, El Médano Ejidal, Cabo San Lucas, Mun | 0.1 |
| Puerto Vallarta | Malecon boardwalk | Malecón, Centro, Puerto Vallarta, Región Costa Norte, Jalisco, 48300, México | 4.9 |
| Puerto Vallarta | Vallarta Botanical Gardens | Jardín Botánico de Vallarta, 299, Puerto Vallarta, Cabo Corrientes, Región Costa | 21.6 |
| Puerto Vallarta | Church of Our Lady of Guadalupe | Parroquia de Nuestra Senora de Guadalupe, Hidalgo, Centro, Puerto Vallarta, Regi | 5.1 |
| Puerto Vallarta | Los Muertos Beach | Muelle Playa de Los Muertos, Francisca Rodríguez, Zona Romántica, Puerto Vallart | 6.0 |
| Puerto Vallarta | Zona Romantica | Zona Romántica, Puerto Vallarta, Región Costa Norte, Jalisco, 48300, México | 5.8 |
| Mazatlan | Cathedral Basilica of the Immaculate Conception | Catedral de la Inmaculada Concepción, Calle Guillermo Nelson, CENTRO, Mazatlán,  | 0.3 |
| Mazatlan | Faro Mazatlan Lighthouse | el faro de mazatlan, Cap. Joel Montes Camarena, Mazatlán, Sinaloa, 82000, México | 2.9 |
| Mazatlan | Mazatlan Aquarium | Acuario Mazatlán, 111, Avenida de los Deportes, Los girasoles, López Mateos, Maz | 2.9 |
| Mazatlan | Malecon Mazatlan | Malecon, Malecón de Mazatlán, Ferrocarrilera, Los Pinos, Mazatlán, Sinaloa, 8200 | 1.3 |
| Mazatlan | Playa Olas Altas | Olas Altas, CENTRO, Mazatlán, Sinaloa, 82000, México | 1.1 |
| Ensenada | La Bufadora | La Bufadora, Ensenada, Municipio de Ensenada, Baja California, 22794, México | 17.6 |
| Ensenada | Bodegas de Santo Tomas | Santo Tomas Winery, Carretera Ensenada - Lázaro Cárdenas, Municipio de Ensenada, | 36.5 |
| Ensenada | Mercado Negro | Mercado Negro, Avenida La Marina, Ensenada, Municipio de Ensenada, Baja Californ | 2.4 |
| Ensenada | Hussong's Cantina | Cantina Hussong's, Avenida Ruíz, Ensenada, Municipio de Ensenada, Baja Californi | 2.4 |
| Galveston | Moody Gardens | Moody Gardens, 1, Hope Boulevard, Galveston, Galveston County, Texas, 77554, Uni | 6.6 |
| Galveston | The Strand Historic District | The Strand, Galveston, Galveston County, Texas, 77550, United States | 0.5 |
| Galveston | Pleasure Pier | Galveston Island Historic Pleasure Pier, 2501, Seawall Boulevard, Galveston, Gal | 2.5 |
| Galveston | Galveston Island State Park | Galveston Island State Park, 14901, Galveston, Galveston County, Texas, 77554, U | 20.4 |
| Galveston | Bishop's Palace | 1892 Bishop's Palace, 1402, Broadway - Avenue J, Galveston, Galveston County, Te | 1.5 |
| Galveston | Schlitterbahn Galveston | Schlitterbahn Waterpark Galveston, 2026, Lockheed Road, Galveston, Galveston Cou | 6.8 |
| Galveston | Texas Seaport Museum and Tall Ship Elissa | Texas Seaport Museum, Kempner Avenue - 22nd Street, Galveston, Galveston County, | 0.3 |
| New Orleans | French Quarter | French Quarter, New Orleans, Orleans Parish, Louisiana, 70116, United States | 0.3 |
| New Orleans | Jackson Square | Jackson Square, 700, French Quarter, New Orleans, Orleans Parish, Louisiana, 701 | 0.0 |
| New Orleans | The National WWII Museum | The National World War II Museum, 945, Magazine Street, Warehouse District, Fren | 1.9 |
| New Orleans | New Orleans City Park | New Orleans Botanical Gardens, 5, Faubourg St. John, Lakeview, New Orleans, Orle | 4.6 |
| New Orleans | Cafe du Monde | Café du Monde, 800, Decatur Street, French Market, French Quarter, New Orleans,  | 0.1 |
| New Orleans | Frenchmen Street | Frenchmen Street, French Market, Faubourg Marigny, New Orleans, Orleans Parish,  | 1.0 |
| New Orleans | Audubon Zoo | Audubon Zoo, Tchoupitoulas Street, Greenville, New Orleans, Orleans Parish, Loui | 7.6 |
| Miami | South Beach | South Beach, Miami Beach, Miami-Dade County, Florida, 33139, United States | 6.0 |
| Miami | Vizcaya Museum and Gardens | Vizcaya Museum and Gardens, Brickell Hammock, Miami, Miami-Dade County, Florida, | 3.7 |
| Miami | Wynwood Walls | Wynwood Walls, 2520, Northwest 2nd Avenue, Overtown, Miami, Miami-Dade County, F | 3.0 |
| Miami | Little Havana | Southwest 8th Street, Little Havana, Latin Quarter, Miami, Miami-Dade County, Fl | 3.4 |
| Miami | Zoo Miami | The Miami-Dade Zoological Park and Gardens, The Asian Trail, Miami-Dade County,  | 27.3 |
| Miami | Everglades Safari Park | Everglades Safari Park, Southwest 8th Street, Miami-Dade County, Florida, United | 43.4 |
| Miami | Fairchild Tropical Botanic Garden | Fairchild Tropical Botanic Garden, 10901, Old Cutler Road, Coral Gables, Miami-D | 13.4 |
| Fort Lauderdale (Port Everglades) | Fort Lauderdale Beach | Fort Lauderdale Beach, Birch Ocean Front, Fort Lauderdale, Broward County, Flori | 6.1 |
| Fort Lauderdale (Port Everglades) | Las Olas Boulevard | Las Olas Boulevard, East Las Olas Boulevard, Fort Lauderdale, Broward County, Fl | 3.0 |
| Fort Lauderdale (Port Everglades) | Butterfly World | Butterfly World, 3600, West Sample Road, Coconut Creek, Broward County, Florida, | 19.6 |
| Fort Lauderdale (Port Everglades) | Flamingo Gardens | Flamingo Gardens, Davie, Broward County, Florida, United States | 18.6 |
| Fort Lauderdale (Port Everglades) | Everglades Holiday Park | Everglades Holiday Park, L-67A, Broward County, Florida, 33332, United States | 32.0 |
| Fort Lauderdale (Port Everglades) | Bonnet House Museum and Gardens | Bonnet House Museum and Gardens, 900, Birch Ocean Front, Fort Lauderdale, Browar | 4.8 |
| Port Canaveral | Kennedy Space Center Visitor Complex | Kennedy Space Center Visitor Complex (Visitor Entrance), 9500, Space Commerce Wa | 13.2 |
| Port Canaveral | Cocoa Beach Pier | Cocoa Beach Pier, Meade Avenue, Cocoa Beach, Brevard County, Florida, 32931, Uni | 5.4 |
| Port Canaveral | Merritt Island National Wildlife Refuge | Merritt Island National Wildlife Refuge, Brevard County, Florida, 32899, United  | 26.2 |
| Port Canaveral | Canaveral National Seashore | Canaveral National Seashore, Oak Hill, Volusia County, Florida, United States | 56.5 |
| Port Canaveral | Ron Jon Surf Shop | Ron Jon Surf Shop, 4151, North Atlantic Avenue, Cocoa Beach, Brevard County, Flo | 6.6 |
| Port Canaveral | Cape Canaveral Lighthouse | Cape Canaveral Lighthouse, Lighthouse Road, Launch Complex 9, Brevard County, Fl | 8.0 |
| Tampa | Ybor City | Ybor City, Tampa, Hillsborough County, Florida, 33605, United States | 2.4 |
| Tampa | Florida Aquarium | Florida Aquarium, 701, Channelside Drive, Chamberlins, Harbour Island, Tampa, Hi | 1.3 |
| Tampa | Tampa Riverwalk | Tampa Riverwalk, Riverside, Harbour Island, Tampa, Hillsborough County, Florida, | 0.5 |
| Tampa | Busch Gardens Tampa Bay | Busch Gardens Tampa, Busch Gardens Drop Off/Pickup, Tampa, Hillsborough County,  | 10.9 |
| Tampa | Clearwater Beach | Clearwater Beach, Clearwater, Pinellas County, Florida, 33767, United States | 36.5 |
| Tampa | Lowry Park Zoo | ZooTampa at Lowry Park, 1101, West Sligh Avenue, Willow Pines, Sulphur Springs,  | 7.9 |
| Seattle | Pike Place Market | Pike Place Market, 85, Pike Street, West Edge, Belltown, Seattle, King County, W | 1.1 |
| Seattle | Space Needle | Space Needle, 400, Broad Street, South Lake Union, Cascade, Belltown, Seattle, K | 2.3 |
| Seattle | Chihuly Garden and Glass | Chihuly Garden and Glass, 305, Harrison Street, Uptown, Belltown, Seattle, King  | 2.4 |
| Seattle | Museum of Pop Culture | MoPOP: Museum of Pop Culture, 5th Avenue North, Belltown, Seattle, King County,  | 2.4 |
| Seattle | Seattle Aquarium | Seattle Aquarium, 1483, Alaskan Way, West Edge, Belltown, Seattle, King County,  | 1.1 |
| Seattle | Hiram M. Chittenden Locks | Hiram M. Chittenden Locks, 3015, Northwest 54th Street, Ballard, Seattle, King C | 8.6 |
| Seattle | Kerry Park | Kerry Park, 211, Queen Anne, Seattle, King County, Washington, 98119, United Sta | 3.6 |
| San Diego | San Diego Zoo | San Diego Zoo, 2920, Zoo Drive, Banker's Hill, San Diego, San Diego County, Cali | 2.6 |
| San Diego | Balboa Park | Balboa Park, San Diego, San Diego County, California, United States | 2.4 |
| San Diego | USS Midway Museum | USS Midway Museum, 910, North Harbor Drive, Downtown San Diego, San Diego, San D | 1.1 |
| San Diego | Cabrillo National Monument | Cabrillo National Monument, San Diego, San Diego County, California, United Stat | 8.7 |
| San Diego | Gaslamp Quarter | Gaslamp Quarter, Downtown San Diego, San Diego, San Diego County, California, Un | 0.6 |
| San Diego | La Jolla Cove | La Jolla Cove, La Jolla, San Diego County, California, 02037, United States | 18.1 |
| San Diego | Coronado Beach | Coronado Beach, Coronado, San Diego County, California, United States | 4.2 |
| New York City (Manhattan) | Statue of Liberty | Statue of Liberty, Flagpole Plaza, Manhattan, New York County, New York, 10004,  | 9.5 |
| New York City (Manhattan) | Central Park | Central Park, New York County, New York, 11025, United States | 3.3 |
| New York City (Manhattan) | Metropolitan Museum of Art | The Metropolitan Museum of Art, 1000, 5th Avenue, Upper East Side, Manhattan Com | 3.3 |
| New York City (Manhattan) | High Line | High Line, Chelsea District, Manhattan Community Board 4, Manhattan, New York Co | 1.3 |
| New York City (Manhattan) | Times Square | Times Square, Manhattan Community Board 5, Manhattan, New York County, New York, | 1.6 |
| New York City (Manhattan) | Brooklyn Bridge | Brooklyn Bridge, Manhattan Community Board 3, Manhattan, New York County, New Yo | 6.8 |
| New York City (Manhattan) | Chelsea Market | Chelsea Market, 75, 9th Avenue, Chelsea District, Manhattan Community Board 4, M | 2.8 |
| Boston | Freedom Trail | Freedom Trail, Government Center/Faneuil Hall, Downtown, Boston, Suffolk County, | 2.9 |
| Boston | Boston Public Garden | Boston Public Garden, 4, Beacon Hill, Boston, Suffolk County, Massachusetts, 021 | 3.4 |
| Boston | Faneuil Hall Marketplace | Faneuil Hall Marketplace, 1, Faneuil Hall Square, Government Center/Faneuil Hall | 2.7 |
| Boston | New England Aquarium | New England Aquarium, 1, Boston HarborWalk, Waterfront, Downtown, Boston, Suffol | 2.3 |
| Boston | Fenway Park | Fenway Park, 4, Jersey Street, Fenway-Kenmore, Boston, Suffolk County, Massachus | 5.5 |
| Boston | Harpoon Brewery | Harpoon Brewery, 306, Northern Avenue, Seaport, Boston, Suffolk County, Massachu | 0.4 |
| Boston | Museum of Fine Arts | Museum of Fine Arts, 465, Huntington Avenue, Fenway-Kenmore, Boston, Suffolk Cou | 5.2 |
| Juneau | Mendenhall Glacier | Mendenhall Glacier Visitor Center, Trail of Time, Juneau, Alaska, United States | 14.8 |
| Juneau | Mount Roberts Tramway | Goldbelt Tram, 490, South Franklin Street, Downtown, Juneau, Alaska, 99801, Unit | 1.3 |
| Juneau | Alaska State Museum | Alaska State Museum, 395, Whittier Street, Downtown, Juneau, Alaska, 99801, Unit | 0.3 |
| Juneau | Alaskan Brewing Company | Alaskan Brewing Co, Marine Way, Downtown, Juneau, Alaska, 99802, United States | 0.8 |
| Juneau | St. Nicholas Russian Orthodox Church | St. Nicholas Orthodox Church, 326, 5th Street, Chicken Ridge Neighborhood, Downt | 0.6 |
| Ketchikan | Creek Street | Creek Street, Ketchikan, Ketchikan Gateway Borough, Alaska, 99901, United States | 0.3 |
| Ketchikan | Totem Bight State Historical Park | Totem Bight, Mud Bay, Ketchikan Gateway Borough, Alaska, 99928, United States | 11.9 |
| Ketchikan | Saxman Native Village | Saxman Native Village Gift Shop, Killer Whale Avenue, Saxman, Ketchikan Gateway  | 4.1 |
| Ketchikan | Misty Fjords | Misty Fjords National Monument Wilderness, Alaska, United States | 82.1 |
| Ketchikan | Tongass Historical Museum | Tongass Historical Museum, 629, Dock Street, Ketchikan, Ketchikan Gateway Boroug | 0.2 |
| Ketchikan | Ketchikan Lumberjack Show | Great Alaskan Lumberjack Show, Bawden Street, Ketchikan, Ketchikan Gateway Borou | 0.4 |
| Ketchikan | Ketchikan Salmon Ladder | Ketchikan Creek, Ketchikan, Ketchikan Gateway Borough, Alaska, United States | 1.0 |
| Skagway | White Pass and Yukon Route Railroad | White Pass and Yukon Route Railroad Station, 231, 2nd Avenue, Skagway, Alaska, 9 | 0.5 |
| Skagway | Gold Rush Cemetery | Gold Rush Cemetery, Alaska Street, Skagway, Alaska, 99840, United States | 2.2 |
| Skagway | Skagway Museum | City of Skagway Museum, 700, Spring Street, Skagway, Alaska, 99840, United State | 0.1 |
| Skagway | Dyea | Dyea Historic Townsite Road, Skagway, Alaska, 99840, United States | 6.2 |
| Skagway | Red Onion Saloon | Red Onion Saloon, 205, Broadway, Skagway, Alaska, 99840, United States | 0.5 |
| Sitka | Sitka National Historical Park | Sitka National Historical Park, Sitka, Alaska, United States | 0.3 |
| Sitka | Alaska Raptor Center | Alaska Raptor Center, 1000, Sawmill Creek Road, Sitka, Alaska, 99835, United Sta | 0.8 |
| Sitka | St. Michael's Cathedral | Saint Michael's Russian Orthodox Cathedral, 240, Lincoln Street, Sitka, Alaska,  | 0.4 |
| Sitka | Sheldon Jackson Museum | Sheldon Jackson Museum, 104, College Drive, Sitka, Alaska, 99835, United States | 0.4 |
| Honolulu | Pearl Harbor National Memorial | Pearl Harbor National Memorial, Arizona Street, Āliamanu, Aiea, Honolulu County, | 10.1 |
| Honolulu | Diamond Head State Monument | Diamond Head State Monument, Kaimukī, East Honolulu, Honolulu, Honolulu County,  | 7.8 |
| Honolulu | Waikiki Beach | Waikīkī Beach, Waikīkī, East Honolulu, Honolulu, Honolulu County, Hawaii, United | 5.6 |
| Honolulu | Iolani Palace | ʻIolani Palace, 364, South King Street, Downtown, Hawaii Capital Historic Distri | 0.7 |
| Honolulu | Hanauma Bay Nature Preserve | Hanauma Bay, East Honolulu, Kailua, Honolulu County, Hawaii, 96825, United State | 18.3 |
| Honolulu | Honolulu Zoo | Honolulu Zoo, 151, Kapahulu Avenue, Kapahulu, East Honolulu, Honolulu, Honolulu  | 6.2 |
| Honolulu | Foster Botanical Garden | Foster Botanical Garden, Hawaii Capital Historic District, East Honolulu, Honolu | 1.3 |
| Kahului, Maui | Iao Valley State Monument | ʻĪao Valley State Monument, Maui County, Hawaii, United States | 8.0 |
| Kahului, Maui | Haleakala National Park | Haleakalā National Park, Maui County, Hawaii, United States | 41.5 |
| Kahului, Maui | Lahaina Banyan Court | Lahaina Banyan Court, Lahaina, Maui County, Hawaii, United States | 21.5 |
| Kahului, Maui | Maui Ocean Center | Maui Ocean Center, Maalaea Road, Maʻalaea, Maui County, Hawaii, United States | 12.2 |
| Kahului, Maui | Ho'okipa Beach | Hookipa Park Beach, Kuau, Maui County, Hawaii, United States | 12.8 |
| Kahului, Maui | Maui Tropical Plantation | Maui Tropical Plantation, 1670, Honoapiilani Highway, Waikapu, Maui County, Hawa | 6.3 |
| Kailua-Kona | Pu'uhonua o Honaunau National Historical Park | Pu'uhonua O Honaunau National Historic Park Headquarters, State Route 163, Hōnau | 25.8 |
| Kailua-Kona | Kona coffee farm Greenwell | Greenwell Farms, 81-6581, Mamalahoa Highway, Kealakekua, Hawaiʻi County, Hawaii, | 16.2 |
| Kailua-Kona | Kealakekua Bay | Kealakekua Bay State Historical Park, Nāpō‘opo‘o, Honaunau-Napoopoo, Hawaiʻi Cou | 18.7 |
| Kailua-Kona | Magic Sands Beach | Magic Sands Beach, Kahaluʻu, Kahaluu-Keauhou, Hawaiʻi County, Hawaii, United Sta | 5.6 |
| Hilo | Hawaii Volcanoes National Park | Hawaiʻi Volcanoes National Park, Hawaiʻi County, Hawaii, 96718, United States | 57.5 |
| Hilo | Rainbow Falls | Rainbow Falls, Hilo, Hawaiʻi County, Hawaii, 96720, United States | 3.2 |
| Hilo | Akaka Falls State Park | ʻAkaka Falls State Park, Hawaiʻi County, Hawaii, United States | 18.0 |
| Hilo | Lyman Museum | Lyman Museum, 276, Haili Street, Downtown Hilo, Pu‘u‘eo, Hilo, Hawaiʻi County, H | 1.9 |
| Hilo | Hilo Farmers Market | Hilo Farmers Market - Crafts, 20, Mamo Street, Downtown Hilo, Pu‘u‘eo, Hilo, Haw | 1.8 |
| Hilo | Liliuokalani Gardens | Liliʻuokalani Gardens, Mokaoku, Hilo, Hawaiʻi County, Hawaii, United States | 2.5 |
| Hilo | Mauna Loa Macadamia Nut Factory | Mauna Loa Macadamia Nut Factory, Macadamia Nut Road, Hawaiʻi County, Hawaii, 967 | 9.5 |
| Victoria, BC | Butchart Gardens | The Butchart Gardens, 800, Central Saanich, Capital Regional District, British C | 17.1 |
| Victoria, BC | Royal BC Museum | Royal BC Museum, 675, Belleville Street, James Bay, Victoria, Capital Regional D | 1.0 |
| Victoria, BC | Craigdarroch Castle | Craigdarroch Castle, 1048, Joan Crescent, Rockland, Victoria, Capital Regional D | 1.7 |
| Victoria, BC | Inner Harbour | Victoria Inner Harbour - xʷsey̓’əm, Victoria, Capital Regional District, British | 0.7 |
| Victoria, BC | Beacon Hill Park | Beacon Hill Park, 100, Fairfield, Victoria, Capital Regional District, British C | 1.8 |
| Victoria, BC | Fisherman's Wharf | Fisherman's Wharf, B, James Bay, Victoria, Capital Regional District, British Co | 1.4 |
| Vancouver | Stanley Park | Stanley Park, West End, Vancouver, Metro Vancouver Regional District, British Co | 2.3 |
| Vancouver | Capilano Suspension Bridge | Capilano Suspension Bridge Park, 3735, Edgemont Village, North Vancouver, Metro  | 6.0 |
| Vancouver | Granville Island Public Market | Granville Island, Fairview, Vancouver, Metro Vancouver Regional District, Britis | 2.3 |
| Vancouver | Gastown | Gastown, Downtown, Vancouver, Metro Vancouver Regional District, British Columbi | 0.9 |
| Vancouver | Vancouver Aquarium | Vancouver Aquarium, 845, Avison Way, Vancouver, Metro Vancouver Regional Distric | 1.7 |
| Vancouver | Grouse Mountain | Grouse Mountain, District of North Vancouver, Metro Vancouver Regional District, | 10.5 |
| Halifax | Halifax Citadel National Historic Site | Halifax Citadel National Historic Site, Ta13 Road, Halifax Citadel National Hist | 0.5 |
| Halifax | Halifax Waterfront Boardwalk | Halifax Waterfront Boardwalk, Downtown Halifax, Halifax, Halifax Regional Munici | 1.0 |
| Halifax | Peggy's Cove Lighthouse | Peggy's Cove Lighthouse, Peggys Cove, Halifax Regional Municipality, Halifax Cou | 31.6 |
| Halifax | Halifax Public Gardens | Halifax Public Gardens, Spring Garden Road, Downtown Halifax, Halifax, Halifax R | 0.7 |
| Halifax | Maritime Museum of the Atlantic | Maritime Museum of the Atlantic, 1675, Lower Water Street, Downtown Halifax, Hal | 1.2 |
| Halifax | Pier 21 Canadian Museum of Immigration | Canadian Museum of Immigration at Pier 21, 1055, Marginal Road, South End, Halif | 2.0 |
| Bar Harbor | Acadia National Park Cadillac Mountain | Experience Acadia, Cadillac Summit Road, Bar Harbor, Hancock County, Maine, 0460 | 4.7 |
| Bar Harbor | Jordan Pond House | Jordan Pond House, 2928, Park Loop Road, Bar Harbor, Hancock County, Maine, 0460 | 8.9 |
| Bar Harbor | Bass Harbor Head Light | Bass Harbor Head Light, Base Trail, Tremont, Hancock County, Maine, 04653, Unite | 21.7 |
| Bar Harbor | Sand Beach | Sand Beach, Bar Harbor, Hancock County, Maine, United States | 7.2 |
| Bar Harbor | Thunder Hole | Thunder hole, 1411, Park Loop Road, Bar Harbor, Hancock County, Maine, 04609, Un | 7.9 |
| Bar Harbor | Abbe Museum | Abbe Museum, 26, Mount Desert Street, Bar Harbor, Hancock County, Maine, 04609,  | 0.6 |
| Bar Harbor | Bar Harbor Shore Path | Shore Path, Bar Harbor, Hancock County, Maine, 04644, United States | 0.6 |

### Searched and left out (24)

| Port | Place | Why |
|---|---|---|
| Nassau | Graycliff Chocolatier and Cigar | no match |
| George Town, Grand Cayman | Seven Mile Beach | no match |
| George Town, Grand Cayman | Cayman Turtle Conservation and Education Centre | rejected: matched a dive shop |
| George Town, Grand Cayman | Rum Point | rejected: matched a condo |
| Roatan | Roatan Institute of Marine Sciences | rejected: matched a different institute |
| Belize City | Belize Zoo | rejected: matched the zoo's lodge |
| Ocho Rios | Blue Hole Ocho Rios | rejected: matched a Blue Hole in another parish |
| Ocho Rios | Prospect Plantation | no match |
| Philipsburg, St. Maarten | Butterfly Farm | no match |
| San Juan | Casa Bacardi Distillery | no match |
| Key West | Ernest Hemingway Home and Museum | no match |
| Royal Naval Dockyard, Bermuda | National Museum of Bermuda | rejected: matched the wrong museum |
| Puerto Vallarta | Yelapa | rejected: matched a city neighborhood, not the village |
| Mazatlan | Old Mazatlan | no match |
| Ensenada | Riviera del Pacifico | rejected: matched another Riviera |
| Ensenada | Valle de Guadalupe | rejected: matched far from Ensenada |
| Juneau | Glacier Gardens Rainforest Adventure | no match |
| Juneau | Macaulay Salmon Hatchery | no match |
| Skagway | Klondike Gold Rush National Historical Park | rejected: the only hit is the park's centroid on the Chilkoot Trail, not the visitor center |
| Sitka | Fortress of the Bear | no match |
| Sitka | Sitka Sound Cruises | rejected: matched a Coast Guard office |
| Kahului, Maui | Kaanapali Beach | rejected: matched a hotel |
| Kailua-Kona | Hulihee Palace | no match |
| Kailua-Kona | Kona Farmers Market | no match |

## Cruise Day: 152 more ports (2026-10-20)

Added in 0.7.0 after a traveler searched for Montego Bay and found nothing. The app now lists 192 ports with 1273 places. Every new port point and place was searched on OpenStreetMap Nominatim from the cloud workspace, one request at a time with a pause between requests. A place was kept only when the answer named it (at least 60 percent of the searched words), sat within 130 km of the port point, and was not a hotel, shop, bus stop, information board, or similar. Addresses copy the answer's own parts (lesson L-028); parts written in a non-Latin script are left out so a US reader can follow them. Names, minutes on site, and interest tags are editorial.

### Sources read on 2026-10-20

- [Norwegian Cruise Line tender port list](https://www.ncl.com/ca/en/about/accessible-cruising-tender-ports): 118 ports; an asterisk means the ship can dock or anchor, varies by call.
- [Planet Cruise full tender list](https://help.planetcruise.com/hc/en-gb/articles/6709997918748-Tender-ports-Full-list-by-destination): updated 18 February 2026; it notes that some ports are only partial tenders.
- [Left- and right-hand traffic (Wikipedia)](https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic), table "Worldwide distribution by country", last edited 9 October 2026. The app's list of left-driving codes (`RT.LEFT_DRIVING`) copies it. The article does not name Bonaire or Martinique; the app treats them as right-hand traffic like the Netherlands and France (UNVERIFIED).

### Tender ports (new ports)

Ports on neither list use a stricter rule: `pier` only when OpenStreetMap shows a cruise or passenger terminal, or a cruise pier, at the port (named so in its own name or tag; the basis names it); otherwise `unknown`, which the app shows as "Dock or tender not confirmed" and allows 15 minutes each way. The earlier ports were re-checked under the same rule (next table).

| Port | In the app | Basis |
| --- | --- | --- |
| Montego Bay | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Falmouth, Jamaica | pier | On neither list; OpenStreetMap: Falmouth Cruise Pier (18.4947, -77.6478) |
| Freeport, Grand Bahama | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Puerto Plata (Amber Cove and Taino Bay) | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| La Romana | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Samaná | varies | On the Planet Cruise list only, so the two sources disagree |
| Santo Domingo | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Frederiksted, St. Croix | pier | On neither list; OpenStreetMap: Cruise Ship Pier, Frederiksted (17.7139, -64.8888) |
| Road Town, Tortola | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Basseterre, St. Kitts | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| St. John's, Antigua | pier | On neither list; OpenStreetMap: Cruise Ship Dock, St. John's (17.1198, -61.8482) |
| Castries, St. Lucia | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Bridgetown, Barbados | pier | On neither list; OpenStreetMap: Bridgetown Cruise Terminal (13.1007, -59.6282) |
| St. George's, Grenada | pier | On neither list; OpenStreetMap: Grenada Cruise Ship Terminal (12.051, -61.7554) |
| Roseau, Dominica | pier | On neither list; OpenStreetMap: Roseau Cruise Ship Berth (15.2961, -61.3881) |
| Fort-de-France, Martinique | pier | On neither list; OpenStreetMap: Cruise Terminal, Pointe Simon (14.6015, -61.0727) |
| Pointe-à-Pitre, Guadeloupe | pier | On neither list; OpenStreetMap: Cruise Terminal Guadeloupe Port Caraibes (16.2387, -61.5389) |
| Willemstad, Curaçao | pier | On neither list; OpenStreetMap: Mega Pier (passenger terminal) (12.1044, -68.9418) |
| Kralendijk, Bonaire | pier | On neither list; OpenStreetMap: Cruise Ship Terminal, Kralendijk (12.1473, -68.2774) |
| Kingstown, St. Vincent | pier | On neither list; OpenStreetMap: SVG Cruise Ship Terminal (13.1482, -61.224) |
| Scarborough, Tobago | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Gustavia, St. Barts | varies | On the Planet Cruise list only, so the two sources disagree |
| Progreso (Mérida) | pier | On neither list; OpenStreetMap: Progreso Cruise Pier (21.3416, -89.6741) |
| Huatulco | pier | On neither list; OpenStreetMap: Huatulco Cruise Ship Terminal (15.7519, -96.1288) |
| Acapulco | unknown | On neither list; OpenStreetMap shows only a marina named Terminal Maritima, which does not say cruise or passenger |
| Manzanillo | pier | On neither list; OpenStreetMap: Terminal de Cruceros, Manzanillo (19.0551, -104.3144) |
| Zihuatanejo and Ixtapa | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| La Paz | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Loreto | varies | On the Planet Cruise list only, so the two sources disagree |
| Cartagena | pier | On neither list; OpenStreetMap: Cruise Pier Cartagena (10.4045, -75.5317) |
| Santa Marta | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Colón, Panama | pier | On neither list; OpenStreetMap: Colon 2000 Cruise Terminal (9.3576, -79.891) |
| Panama City (Fuerte Amador) | varies | On the Planet Cruise list only, so the two sources disagree |
| Puerto Limón | pier | On neither list; OpenStreetMap: Cruise Pier Port Limon (9.9887, -83.0238) |
| Puntarenas | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Puerto Quetzal (Antigua Guatemala) | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Santo Tomás de Castilla | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Lima (Callao) | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Valparaíso (Santiago) | pier | On neither list; OpenStreetMap: Valparaiso Terminal de Pasajeros VTP (-33.0435, -71.6127) |
| Puerto Montt | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Punta Arenas | pier | On neither list; OpenStreetMap: Cruise Ship Dock, Punta Arenas (-53.17, -70.9065) |
| Ushuaia | varies | On the Planet Cruise list only, so the two sources disagree |
| Puerto Madryn | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Buenos Aires | pier | On neither list; OpenStreetMap: Terminal de Cruceros Quinquela Martin (-34.5828, -58.37) |
| Montevideo | pier | On neither list; OpenStreetMap: Cruiseship Pier, Montevideo (-34.9022, -56.2129) |
| Punta del Este | tender | On the Norwegian list without an asterisk |
| Rio de Janeiro | pier | On neither list; OpenStreetMap: Terminal Internacional de Cruzeiros (Armazem 4) (-22.8937, -43.1874) |
| Charlottetown | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Saint John, New Brunswick | pier | On neither list; OpenStreetMap: Marco Polo Cruise Ship Terminal (45.2687, -66.062) |
| Sydney, Nova Scotia | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Quebec City | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Montreal | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Portland, Maine | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Newport, Rhode Island | tender | On the Norwegian list without an asterisk |
| Baltimore | pier | On neither list; OpenStreetMap: Cruise Maryland (39.2649, -76.5986) |
| Charleston | pier | On neither list; OpenStreetMap: Charleston Cruise Terminal (32.7814, -79.9239) |
| Jacksonville | pier | On neither list; OpenStreetMap: Jaxport Cruise Terminal (30.4077, -81.5803) |
| Mobile | pier | On neither list; OpenStreetMap: Mobile Alabama Cruise Terminal (30.6866, -88.0377) |
| Norfolk | pier | On neither list; OpenStreetMap: Half Moone Cruise and Celebration Center (36.8475, -76.296) |
| Los Angeles (San Pedro) | pier | On neither list; OpenStreetMap: Los Angeles World Cruise Center (33.7459, -118.2772) |
| Long Beach | pier | On neither list; OpenStreetMap: Long Beach Cruise Terminal (33.7513, -118.1889) |
| San Francisco | pier | On neither list; OpenStreetMap: James R. Herman Cruise Terminal (37.8056, -122.4011) |
| Cape Liberty (Bayonne) | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Brooklyn (Red Hook) | pier | On neither list; OpenStreetMap: Brooklyn Cruise Terminal (40.6826, -74.0135) |
| Astoria, Oregon | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Avalon, Catalina Island | tender | On the Norwegian list without an asterisk |
| Seward | pier | On neither list; OpenStreetMap: Seward Cruise Ship Terminal (60.1196, -149.4281) |
| Whittier | pier | On neither list; OpenStreetMap: New Cruise Ship Terminal, Whittier (60.7843, -148.716) |
| Haines | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Kodiak | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Prince Rupert, BC | pier | On neither list; OpenStreetMap: Prince Rupert Cruise Terminal (54.3179, -130.3226) |
| Nawiliwili, Kauai | varies | On the Norwegian list without an asterisk, but the Hawaii guide calls it a pier: the sources conflict, as for the other Hawaii ports |
| Barcelona | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Civitavecchia (Rome) | pier | On neither list; OpenStreetMap: Rome Cruise Port Terminal (42.0959, 11.7887) |
| Naples | varies | On the Planet Cruise list only, so the two sources disagree |
| Livorno (Florence and Pisa) | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| La Spezia (Cinque Terre) | varies | On the Planet Cruise list only, so the two sources disagree |
| Genoa | pier | On neither list; OpenStreetMap: Stazione Marittima (44.414, 8.9192), Italian for the port's passenger station |
| Trieste | pier | On neither list; OpenStreetMap: Stazione Marittima di Trieste (45.65, 13.7637), Italian for the port's passenger station |
| Ravenna | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Messina (Taormina) | pier | On neither list; OpenStreetMap: Messina Cruise Terminal (38.1935, 15.5577) |
| Palermo | pier | On neither list; OpenStreetMap: Stazione Marittima, Molo Piave (38.127, 13.3663), Italian for the port's passenger station |
| Valletta, Malta | pier | On neither list; OpenStreetMap: Valletta Cruise Port, Pinto Wharf (35.8919, 14.5101) |
| Piraeus (Athens) | pier | On neither list; OpenStreetMap: Cruise Pier Piraeus (37.9377, 23.6363) |
| Santorini (Fira) | tender | On the Norwegian list without an asterisk |
| Mykonos | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Corfu | varies | On the Planet Cruise list only, so the two sources disagree |
| Katakolon (Olympia) | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Rhodes | pier | On neither list; OpenStreetMap: Cruise Terminal, Rhodes (36.4451, 28.2333) |
| Heraklion, Crete | pier | On neither list; OpenStreetMap: Cruise Ship Pier, Heraklion (35.3461, 25.1505) |
| Chania (Souda Bay), Crete | pier | On neither list; OpenStreetMap: Cruise Berth Point, Souda (35.4922, 24.0697) |
| Kuşadası (Ephesus) | pier | On neither list; OpenStreetMap: Cruise-Terminal, Kusadasi (37.8627, 27.2559) |
| Istanbul | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Dubrovnik | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Split | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Kotor | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Marseille | pier | On neither list; OpenStreetMap: Marseille Provence Cruise Terminal (43.343, 5.3328) |
| Villefranche-sur-Mer (Nice) | tender | On the Norwegian list without an asterisk |
| Monte Carlo, Monaco | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Cannes | tender | On the Norwegian list without an asterisk |
| Palma de Mallorca | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Valencia | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Málaga | pier | On neither list; OpenStreetMap: Terminal de Cruceros El Palmeral (36.7178, -4.4174) |
| Cádiz (Seville) | pier | On neither list; OpenStreetMap: Terminal de Cruceros Puerto de Cadiz (36.5321, -6.2919) |
| Lisbon | pier | On neither list; OpenStreetMap: Lisbon Cruise Terminal (38.7102, -9.1264) |
| Gibraltar | pier | On neither list; OpenStreetMap: Cruise Ship Terminal, North Mole (36.1476, -5.3658) |
| Funchal, Madeira | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Santa Cruz de Tenerife | pier | On neither list; OpenStreetMap: Terminal Cruceros Tenerife (28.4728, -16.2459) |
| Las Palmas de Gran Canaria | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Southampton | pier | On neither list; OpenStreetMap: City Cruise Terminal (50.9002, -1.414) |
| Dover | pier | On neither list; OpenStreetMap: Cruise Liner Terminal 1, Dover (51.1136, 1.315) |
| Copenhagen | pier | On neither list; OpenStreetMap: Copenhagen Ocean Cruise Terminal 1 (55.7134, 12.6194) |
| Stockholm | pier | On neither list; OpenStreetMap: Stockholm Cruise Center, Magasin 9 (59.3455, 18.1304) |
| Helsinki | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Tallinn | pier | On neither list; OpenStreetMap: Cruise terminal, Tallinn (59.4479, 24.7642) |
| Oslo | pier | On neither list; OpenStreetMap: Cruise Ship Dock, Akershusstranda (59.9062, 10.7347) |
| Bergen | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Stavanger | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Geiranger | tender | On the Norwegian list without an asterisk |
| Flåm | varies | On the Planet Cruise list only, so the two sources disagree |
| Ålesund | pier | On neither list; OpenStreetMap: Cruise Ship Terminal, Slinningen, Alesund (62.4695, 6.1498) |
| Tromsø | pier | On neither list; OpenStreetMap: Cruise Ship Terminal, Tromso (69.6787, 18.9898) |
| Reykjavík | pier | On neither list; OpenStreetMap: Reykjavik (Skarfabakki) passenger terminal (64.1564, -21.8667) |
| Amsterdam | pier | On neither list; OpenStreetMap: Passenger Terminal Amsterdam (52.3778, 4.9153) |
| Rotterdam | pier | On neither list; OpenStreetMap: Rotterdam Cruise Terminal (51.906, 4.487) |
| Zeebrugge (Bruges) | pier | On neither list; OpenStreetMap: Zeebrugge Cruise Terminal (51.3353, 3.2086) |
| Le Havre (Normandy) | pier | On neither list; OpenStreetMap: Cruise Terminal, Le Havre (49.4809, 0.1077) |
| Hamburg | pier | On neither list; OpenStreetMap: Cruise Center HafenCity (53.5389, 9.9974) |
| Warnemünde (Rostock) | pier | On neither list; OpenStreetMap: Warnemunde Cruise Center 8 (54.1744, 12.0943) |
| Riga | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Gdynia (Gdańsk) | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Dublin | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Cobh (Cork) | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Belfast | pier | On neither list; OpenStreetMap: Belfast Cruise Terminal (54.6257, -5.8843) |
| Edinburgh (Leith and South Queensferry) | varies | South Queensferry is on the Norwegian list without an asterisk and Newhaven on the Planet Cruise list; Leith is on neither; calls use either |
| Invergordon (Inverness) | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Kirkwall, Orkney | varies | On the Norwegian list with an asterisk (dock or anchor, varies by call) |
| Greenock (Glasgow) | pier | On neither list; OpenStreetMap: Greenock Cruise Terminal (55.9513, -4.7559) |
| Liverpool | pier | On neither list; OpenStreetMap: Liverpool Cruise Terminal (53.4067, -2.9984) |
| Sydney | pier | On neither list; OpenStreetMap: White Bay Cruise Terminal (-33.8617, 151.1863) |
| Melbourne | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Brisbane | pier | On neither list; OpenStreetMap: Brisbane Cruise Terminal (-27.4407, 153.0706) |
| Auckland | pier | On neither list; OpenStreetMap: Princes Wharf Cruise Terminal (-36.8405, 174.7658) |
| Wellington | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Singapore | pier | On neither list; OpenStreetMap: Singapore Cruise Centre (HarbourFront) (1.2639, 103.8184) |
| Hong Kong | pier | On neither list; OpenStreetMap: Kai Tak Cruise Terminal Park (22.3059, 114.2135) |
| Yokohama (Tokyo) | unknown | On neither list, and no cruise terminal found on OpenStreetMap near the port point |
| Kobe (Osaka and Kyoto) | pier | On neither list; OpenStreetMap: Kobe Port Terminal (34.6804, 135.2029), tagged as a ferry (passenger) terminal |
| Busan | pier | On neither list; OpenStreetMap: Busan Port International Cruise Ship Terminal (35.0836, 129.0828) |
| Papeete, Tahiti | tender | On the Norwegian list without an asterisk |
| Cape Town | pier | On neither list; OpenStreetMap: Cape Town Cruise Terminal (-33.9105, 18.426) |
| Dubai | pier | On neither list; OpenStreetMap: Dubai Harbour Cruise Terminal B (25.0941, 55.1322) |

### Earlier ports re-checked (22)

The 2026-10-17 table above marks these earlier ports `pier` because they are on neither tender list. Each was searched again on OpenStreetMap Nominatim for a cruise terminal or cruise pier (searches for "cruise", "cruceros", "Cruise Terminal", and the berth names travelers use, such as Canada Place, Ogden Point, Pier 21, Pier B, and the Skagway docks). 16 keep `pier`; 6 now show `unknown`. Skagway keeps `pier` because the Alaska guide cited in the 2026-10-17 section names its four docks, although OpenStreetMap does not tag them for cruise ships. Names accepted as a cruise or passenger terminal include cruise port, cruise facility, and cruise ship dock. The other earlier ports keep their values.

| Port | In the app | Basis |
| --- | --- | --- |
| Costa Maya | unknown (was pier) | Not confirmed. Found: A pier named Costa Maya (no cruise tag) and an office named Planned Second Cruise Liner Terminal |
| St. Thomas | pier | On neither list; OpenStreetMap: St Thomas Cruise Port (18.3326, -64.9228) |
| Philipsburg, St. Maarten | pier | On neither list; OpenStreetMap: Dr. A. C. Wathey Cruise Facility (18.0117, -63.0488) |
| Key West | unknown (was pier) | Not confirmed. Found: Pier B at Mallory Square (tags: pier, attraction; no cruise tag) |
| Oranjestad, Aruba | pier | On neither list; OpenStreetMap: Cruise Ship Dock (12.5212, -70.0436) |
| Puerto Vallarta | pier | On neither list; OpenStreetMap: Cruise Port (20.6543, -105.2411) |
| Mazatlan | pier | On neither list; OpenStreetMap: Cruise Vessel Terminal (23.1929, -106.4174) |
| Ensenada | pier | On neither list; OpenStreetMap: Cruise Ship Terminal (31.8559, -116.6242) |
| Galveston | pier | On neither list; OpenStreetMap: Port of Galveston Cruise Terminal 25 (29.3085, -94.7966) |
| New Orleans | pier | On neither list; OpenStreetMap: Julia St Cruise Terminal (29.9428, -90.0619) |
| Miami | pier | On neither list; OpenStreetMap: Cruise Terminal G (25.7795, -80.1767) |
| Fort Lauderdale (Port Everglades) | pier | On neither list; OpenStreetMap: Cruise Terminal 4 (26.0961, -80.1219) |
| Port Canaveral | unknown (was pier) | Not confirmed. Found: Buildings named Port Canaveral Terminal 1 and Terminal 3 (no cruise or passenger tag) |
| Tampa | pier | On neither list; OpenStreetMap: Port Tampa Bay Cruise Terminal 3 (27.9455, -82.4442) |
| Seattle | pier | On neither list; OpenStreetMap: Smith Cove Cruise Terminal (47.6274, -122.3829) |
| San Diego | pier | On neither list; OpenStreetMap: Cruise Ship Terminal (32.7177, -117.175) |
| New York City (Manhattan) | pier | On neither list; OpenStreetMap: Manhattan Cruise Terminal (40.7677, -73.999) |
| Boston | pier | On neither list; OpenStreetMap: Raymond L. Flynn Black Falcon Cruise Terminal (42.3437, -71.0305) |
| Skagway | pier | On neither list; the Alaska cruise port guide cited above says Skagway offers four spots for ships to dock (Railroad Dock Forward, Railroad Dock Aft, Broadway Dock, Ore Terminal Dock); OpenStreetMap shows Broadway Dock and Ore Dock as piers without a cruise tag |
| Victoria, BC | unknown (was pier) | Not confirmed. Found: Ogden Point as a cape only; no terminal |
| Vancouver | unknown (was pier) | Not confirmed. Found: A street and a building named Canada Place (tagged attraction, no cruise tag); nothing named cruise terminal |
| Halifax | unknown (was pier) | Not confirmed. Found: Pier 21 museum and the Halifax Seaport area, whose address names Port of Halifax - South End Terminal; nothing named cruise or passenger |

### Port points (new ports)

The point is the cruise terminal or pier when one was found; otherwise the town or harbor (UNVERIFIED terminal position).

| Port | Point found |
| --- | --- |
| Montego Bay | Montego Bay, Saint James, Cornwall County, Jamaica (18.4725, -77.9217) |
| Falmouth, Jamaica | Falmouth Cruise Pier (18.4947, -77.6478) |
| Freeport, Grand Bahama | City of Freeport, Bahamas (26.5357, -78.6954) |
| Puerto Plata (Amber Cove and Taino Bay) | Amber Cove Cruise Port (19.8339, -70.7758) |
| La Romana | La Romana, 41302, Dominican Republic (18.4227, -68.9663) |
| Samaná | Samana, Samaná, 82202, Dominican Republic (19.2037, -69.3390) |
| Santo Domingo | Santo Domingo, Distrito Nacional, 03201, Dominican Republic (18.4714, -69.8918) |
| Frederiksted, St. Croix | Cruise Ship Pier, Frederiksted (17.7139, -64.8888) |
| Road Town, Tortola | Cruise Ship Docks, Road Town (18.4223, -64.6130) |
| Basseterre, St. Kitts | Basseterre, Saint George Basseterre, Saint Kitts, Saint Kitts and Nevis (17.2961, -62.7223) |
| St. John's, Antigua | Cruise Ship Dock, St. John's (17.1198, -61.8482) |
| Castries, St. Lucia | Cruise Terminal, Pointe Seraphine (14.0140, -60.9960) |
| Bridgetown, Barbados | Bridgetown Cruise Terminal (13.1007, -59.6282) |
| St. George's, Grenada | Grenada Cruise Ship Terminal (12.0510, -61.7554) |
| Roseau, Dominica | Roseau Cruise Ship Berth (15.2961, -61.3881) |
| Fort-de-France, Martinique | Cruise Terminal, Pointe Simon (14.6015, -61.0727) |
| Pointe-à-Pitre, Guadeloupe | Cruise Terminal Guadeloupe Port Caraibes (16.2387, -61.5389) |
| Willemstad, Curaçao | Mega Pier (passenger terminal) (12.1044, -68.9418) |
| Kralendijk, Bonaire | Cruise Ship Terminal, Kralendijk (12.1473, -68.2774) |
| Kingstown, St. Vincent | SVG Cruise Ship Terminal (13.1482, -61.2240) |
| Scarborough, Tobago | Scarborough, Tobago, Trinidad and Tobago (11.1853, -60.7350) |
| Gustavia, St. Barts | Gustavia, Saint Barthélemy, 97133, France (17.8957, -62.8508) |
| Progreso (Mérida) | Progreso Cruise Pier (21.3416, -89.6741) |
| Huatulco | Huatulco Cruise Ship Terminal (15.7519, -96.1288) |
| Acapulco | Terminal Maritima, Acapulco (16.8486, -99.9020) |
| Manzanillo | Terminal de Cruceros, Manzanillo (19.0551, -104.3144) |
| Zihuatanejo and Ixtapa | Zihuatanejo, Zihuatanejo de Azueta, Guerrero, 40880, Mexico (17.6469, -101.5519) |
| La Paz | La Paz, Municipio de La Paz, Baja California Sur, 23020, Mexico (24.1620, -110.3159) |
| Loreto | Loreto, Municipio de Loreto, Baja California Sur, 23880, Mexico (26.0098, -111.3453) |
| Cartagena | Cruise Pier Cartagena (10.4045, -75.5317) |
| Santa Marta | Santa Marta, Magdalena, RAP Caribe, Colombia (11.2321, -74.1951) |
| Colón, Panama | Colon 2000 Cruise Terminal (9.3576, -79.8910) |
| Panama City (Fuerte Amador) | Panama Cruise Terminal, Isla Perico (8.9161, -79.5202) |
| Puerto Limón | Cruise Pier Port Limon (9.9887, -83.0238) |
| Puntarenas | Puntarenas, Puntarenas Province, 60101, Costa Rica (9.9773, -84.8346) |
| Puerto Quetzal (Antigua Guatemala) | Puerto Quetzal, Empresa Portuaria Quetzal, Santa Rosa, San José, Escuintla, Guatemala (13.9334, -90.7889) |
| Santo Tomás de Castilla | Santo Tomás de Castilla, Puerto Barrios, Izabal, 18013, Guatemala (15.6866, -88.6118) |
| Lima (Callao) | Callao, Lima Metropolitan Area, Callao, 07001, Peru (-12.0523, -77.1391) |
| Valparaíso (Santiago) | Valparaiso Terminal de Pasajeros VTP (-33.0435, -71.6127) |
| Puerto Montt | Terminal Internacional de Pasajeros de Cruceros (-41.4817, -72.9538) |
| Punta Arenas | Cruise Ship Dock, Punta Arenas (-53.1700, -70.9065) |
| Ushuaia | Ushuaia, Departamento Ushuaia, Tierra del Fuego, Argentina (-54.8073, -68.3084) |
| Puerto Madryn | Municipio de Puerto Madryn, Departamento Biedma, Chubut, U9120, Argentina (-42.7673, -65.0366) |
| Buenos Aires | Terminal de Cruceros Quinquela Martin (-34.5828, -58.3700) |
| Montevideo | Cruiseship Pier, Montevideo (-34.9022, -56.2129) |
| Punta del Este | Punta Del Este, Maldonado, 20100, Uruguay (-34.9632, -54.9440) |
| Rio de Janeiro | Terminal Internacional de Cruzeiros (Armazem 4) (-22.8937, -43.1874) |
| Charlottetown | Charlottetown, Queens County, Prince Edward Island, Canada (46.2354, -63.1265) |
| Saint John, New Brunswick | Marco Polo Cruise Ship Terminal (45.2687, -66.0620) |
| Sydney, Nova Scotia | Sydney, Cape Breton Regional Municipality, Cape Breton County, Nova Scotia, Canada (46.1382, -60.1942) |
| Quebec City | Quebec, Urban agglomeration of Québec, Capitale-Nationale, Quebec, Canada (46.8137, -71.2084) |
| Montreal | Montreal, Urban agglomeration of Montreal, Montreal (administrative region), Quebec ... (45.5032, -73.5698) |
| Portland, Maine | Portland, Cumberland County, Maine, United States (43.6574, -70.2587) |
| Newport, Rhode Island | Newport, Newport County, Rhode Island, 02840, United States (41.4900, -71.3138) |
| Baltimore | Cruise Maryland (39.2649, -76.5986) |
| Charleston | Charleston Cruise Terminal (32.7814, -79.9239) |
| Jacksonville | Jaxport Cruise Terminal (30.4077, -81.5803) |
| Mobile | Mobile Alabama Cruise Terminal (30.6866, -88.0377) |
| Norfolk | Half Moone Cruise and Celebration Center (36.8475, -76.2960) |
| Los Angeles (San Pedro) | Los Angeles World Cruise Center (33.7459, -118.2772) |
| Long Beach | Long Beach Cruise Terminal (33.7513, -118.1889) |
| San Francisco | James R. Herman Cruise Terminal (37.8056, -122.4011) |
| Cape Liberty (Bayonne) | Bayonne, Hudson County, New Jersey, 07002, United States (40.6687, -74.1143) |
| Brooklyn (Red Hook) | Brooklyn Cruise Terminal (40.6826, -74.0135) |
| Astoria, Oregon | Astoria, Clatsop County, Oregon, 97103, United States (46.1882, -123.8320) |
| Avalon, Catalina Island | Avalon, Los Angeles County, California, 90704, United States (33.3422, -118.3273) |
| Seward | Seward Cruise Ship Terminal (60.1196, -149.4281) |
| Whittier | New Cruise Ship Terminal, Whittier (60.7843, -148.7160) |
| Haines | Haines, Haines Borough, Alaska, 99840, United States (59.2358, -135.4450) |
| Kodiak | Kodiak, Kodiak Island Borough, Alaska, United States (57.7902, -152.4067) |
| Prince Rupert, BC | Prince Rupert Cruise Terminal (54.3179, -130.3226) |
| Nawiliwili, Kauai | Cruise Ship Terminal, Nawiliwili (21.9548, -159.3558) |
| Barcelona | Barcelona, Barcelonès, Barcelona, Catalonia, Spain (41.3826, 2.1771) |
| Civitavecchia (Rome) | Rome Cruise Port Terminal (42.0959, 11.7887) |
| Naples | Naples Cruise Port, Molo Angioino (40.8382, 14.2602) |
| Livorno (Florence and Pisa) | Livorno, Tuscany, Italy (city) (43.5507, 10.3091) |
| La Spezia (Cinque Terre) | La Spezia, Liguria, Italy (44.2384, 9.6912) |
| Genoa | Stazione Marittima (44.4140, 8.9192) |
| Trieste | Stazione Marittima di Trieste (45.6500, 13.7637) |
| Ravenna | Ravenna, Emilia-Romagna, Italy (44.3641, 12.0590) |
| Messina (Taormina) | Messina Cruise Terminal (38.1935, 15.5577) |
| Palermo | Stazione Marittima, Molo Piave (38.1270, 13.3663) |
| Valletta, Malta | Valletta Cruise Port, Pinto Wharf (35.8919, 14.5101) |
| Piraeus (Athens) | Cruise Pier Piraeus (37.9377, 23.6363) |
| Santorini (Fira) | Fira, Thira Municipal Unit, Municipality of Thira, Thira Regional Unit, South Aegean ... (36.4149, 25.4325) |
| Mykonos | New port Tourlos, cruise dock (37.4655, 25.3229) |
| Corfu | Cruise Terminal, Corfu (39.6291, 19.9011) |
| Katakolon (Olympia) | Cruise Berth Point, Katakolo (37.6448, 21.3245) |
| Rhodes | Cruise Terminal, Rhodes (36.4451, 28.2333) |
| Heraklion, Crete | Cruise Ship Pier, Heraklion (35.3461, 25.1505) |
| Chania (Souda Bay), Crete | Cruise Berth Point, Souda (35.4922, 24.0697) |
| Kuşadası (Ephesus) | Cruise-Terminal, Kusadasi (37.8627, 27.2559) |
| Istanbul | Istanbul, Fatih, Istanbul, Marmara Region, 34122, Turkey (41.0064, 28.9759) |
| Dubrovnik | Dubrovnik, Dubrovnik-Neretva County, Croatia (42.6491, 18.0940) |
| Split | Split, Grad Split, Split-Dalmatia County, Croatia (43.5116, 16.4400) |
| Kotor | Kotor Cruise Pirs (42.4261, 18.7668) |
| Marseille | Marseille Provence Cruise Terminal (43.3430, 5.3328) |
| Villefranche-sur-Mer (Nice) | Villefranche-sur-Mer, Nice, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan ... (43.7042, 7.3100) |
| Monte Carlo, Monaco | Cruise Terminal, Jetee Lucciana (43.7353, 7.4306) |
| Cannes | Cruise Terminal, Cannes (43.5469, 7.0142) |
| Palma de Mallorca | Palma, Balearic Islands, Spain (39.5696, 2.6501) |
| Valencia | Valencia, Comarca de València, Valencia, Valencian Community, Spain (39.4697, -0.3763) |
| Málaga | Terminal de Cruceros El Palmeral (36.7178, -4.4174) |
| Cádiz (Seville) | Terminal de Cruceros Puerto de Cadiz (36.5321, -6.2919) |
| Lisbon | Lisbon Cruise Terminal (38.7102, -9.1264) |
| Gibraltar | Cruise Ship Terminal, North Mole (36.1476, -5.3658) |
| Funchal, Madeira | Funchal, Madeira, Portugal (32.6496, -16.9087) |
| Santa Cruz de Tenerife | Terminal Cruceros Tenerife (28.4728, -16.2459) |
| Las Palmas de Gran Canaria | Las Palmas, Canary Islands, Spain (28.1289, -15.4349) |
| Southampton | City Cruise Terminal (50.9002, -1.4140) |
| Dover | Cruise Liner Terminal 1, Dover (51.1136, 1.3150) |
| Copenhagen | Copenhagen Ocean Cruise Terminal 1 (55.7134, 12.6194) |
| Stockholm | Stockholm Cruise Center, Magasin 9 (59.3455, 18.1304) |
| Helsinki | Helsinki, Helsinki sub-region, Uusimaa, Mainland Finland, Finland (60.1666, 24.9435) |
| Tallinn | Cruise terminal, Tallinn (59.4479, 24.7642) |
| Oslo | Cruise Ship Dock, Akershusstranda (59.9062, 10.7347) |
| Bergen | Bergen, Vestland, Norway (60.3943, 5.3259) |
| Stavanger | Stavanger, Rogaland, Norway (58.9700, 5.7318) |
| Geiranger | Geiranger, Stranda, Møre og Romsdal, 6216, Norway (62.1006, 7.2059) |
| Flåm | Flåm, A-feltvegen, Fretheim, Flåm, Aurland, Vestland, 5743, Norway (60.8630, 7.1132) |
| Ålesund | Cruise Ship Terminal, Slinningen, Alesund (62.4695, 6.1498) |
| Tromsø | Cruise Ship Terminal, Tromso (69.6787, 18.9898) |
| Reykjavík | Reykjavik (Skarfabakki) passenger terminal (64.1564, -21.8667) |
| Amsterdam | Passenger Terminal Amsterdam (52.3778, 4.9153) |
| Rotterdam | Rotterdam Cruise Terminal (51.9060, 4.4870) |
| Zeebrugge (Bruges) | Zeebrugge Cruise Terminal (51.3353, 3.2086) |
| Le Havre (Normandy) | Cruise Terminal, Le Havre (49.4809, 0.1077) |
| Hamburg | Cruise Center HafenCity (53.5389, 9.9974) |
| Warnemünde (Rostock) | Warnemunde Cruise Center 8 (54.1744, 12.0943) |
| Riga | Riga, Latvia (56.9494, 24.1052) |
| Gdynia (Gdańsk) | Gdynia, Pomeranian Voivodeship, Poland (54.5165, 18.5403) |
| Dublin | Dublin, County Dublin, Leinster, Ireland (53.3494, -6.2606) |
| Cobh (Cork) | Cobh, County Cork, Munster, Ireland (51.8502, -8.2951) |
| Belfast | Belfast Cruise Terminal (54.6257, -5.8843) |
| Edinburgh (Leith and South Queensferry) | Cruise Liner Terminal, Leith (55.9804, -3.1816) |
| Invergordon (Inverness) | Invergordon Cruise Berth (57.6848, -4.1699) |
| Kirkwall, Orkney | Kirkwall, Orkney Islands, Scotland, KW15 1DH, United Kingdom (58.9817, -2.9603) |
| Greenock (Glasgow) | Greenock Cruise Terminal (55.9513, -4.7559) |
| Liverpool | Liverpool Cruise Terminal (53.4067, -2.9984) |
| Sydney | White Bay Cruise Terminal (-33.8617, 151.1863) |
| Melbourne | Melbourne, Victoria, Australia (-37.8142, 144.9632) |
| Brisbane | Brisbane Cruise Terminal (-27.4407, 153.0706) |
| Auckland | Princes Wharf Cruise Terminal (-36.8405, 174.7658) |
| Wellington | Wellington, Wellington City, Wellington, 6011, New Zealand (-41.2888, 174.7772) |
| Singapore | Singapore Cruise Centre (HarbourFront) (1.2639, 103.8184) |
| Hong Kong | Kai Tak Cruise Terminal Park (22.3059, 114.2135) |
| Yokohama (Tokyo) | Yokohama, Kanagawa Prefecture, 231-0017, Japan (35.4503, 139.6344) |
| Kobe (Osaka and Kyoto) | Kobe Port Terminal (34.6804, 135.2029) |
| Busan | Busan Port International Cruise Ship Terminal (35.0836, 129.0828) |
| Papeete, Tahiti | Papeete, Windward Islands, French Polynesia, 98714, France (-17.5374, -149.5660) |
| Cape Town | Cape Town Cruise Terminal (-33.9105, 18.4260) |
| Dubai | Dubai Harbour Cruise Terminal B (25.0941, 55.1322) |

### Places (1038)

| Port | Place | Matched on OpenStreetMap | km from port point |
| --- | --- | --- | --- |
| Montego Bay | Doctor's Cave Beach | Doctors Cave Beach, Gloucester Avenue/Jimmy Cliff Boulevard, Montego Bay, Saint ... | 1.9 |
| Montego Bay | Rose Hall Great House | Rose Hall Great House (1770), Rose Hall Road, Mount Zion, Saint James, Cornwall ... | 11.9 |
| Montego Bay | Greenwood Great House | Greenwood Great House (1780), Belgrade Avenue, Greenwood, Saint James, Cornwall ... | 19.2 |
| Montego Bay | Martha Brae Rafters Village | Martha Brae, Trelawny, Cornwall County, Jamaica | 27.7 |
| Montego Bay | Rocklands Bird Sanctuary | Rocklands Bird Sanctuary, Reading Boulevard, Reading, Montego Bay, Saint James ... | 5.5 |
| Montego Bay | Sam Sharpe Square | Sam Sharpe Square, Montego Bay, Saint James, Cornwall County, Jamaica | 0.2 |
| Montego Bay | Dead End Beach | Dead End Beach, Montego Bay, Saint James, Cornwall County, Jamaica | 2.7 |
| Montego Bay | Dunn's River Falls | Dunn's River Falls, Ocho Rios, Saint Ann, Middlesex County, Jamaica | 82.7 |
| Falmouth, Jamaica | Martha Brae Rafters Village | Martha Brae, Trelawny, Cornwall County, Jamaica | 2.8 |
| Falmouth, Jamaica | Good Hope Great House | Good Hope Great House (1755), Martha Brae - Friendship Road, Top Hill, Martha ... | 9.1 |
| Falmouth, Jamaica | Glistening Waters | Glistening Waters, Northern Coastal Highway, Coopers Pen, Florence Hall ... | 2.4 |
| Falmouth, Jamaica | Greenwood Great House | Greenwood Great House (1780), Belgrade Avenue, Greenwood, Saint James, Cornwall ... | 10.0 |
| Falmouth, Jamaica | Rose Hall Great House | Rose Hall Great House (1770), Rose Hall Road, Mount Zion, Saint James, Cornwall ... | 18.2 |
| Falmouth, Jamaica | Dunn's River Falls | Dunn's River Falls, Ocho Rios, Saint Ann, Middlesex County, Jamaica | 54.3 |
| Falmouth, Jamaica | Falmouth Courthouse | Falmouth Court House (1926), Water Square, Falmouth, Trelawny, Cornwall County ... | 0.5 |
| Freeport, Grand Bahama | Lucayan National Park | Lucayan National Park, City of Freeport, Bahamas | 30.2 |
| Freeport, Grand Bahama | Port Lucaya Marketplace | Port Lucaya Marketplace, Seahorse Road, Lucaya, City of Freeport, Bahamas | 5.9 |
| Freeport, Grand Bahama | Garden of the Groves | Garden of the Groves, City of Freeport, Bahamas | 12.3 |
| Freeport, Grand Bahama | Taino Beach | Taino Beach, City of Freeport, Bahamas | 7.6 |
| Freeport, Grand Bahama | Rand Nature Centre | Rand Nature Centre, Lucaya, City of Freeport, Bahamas | 2.4 |
| Freeport, Grand Bahama | Gold Rock Beach | Gold Rock Beach, City of Freeport, Bahamas | 29.6 |
| Puerto Plata (Amber Cove and Taino Bay) | Fortaleza San Felipe | Fortaleza de San Felipe, Av. General Gregorio Luperón, Costámbar, Puerto Plata ... | 9.0 |
| Puerto Plata (Amber Cove and Taino Bay) | Teleférico de Puerto Plata | Puerto Plata, Camino al Teleférico, Barrio Haití, Costámbar, Puerto Plata ... | 8.5 |
| Puerto Plata (Amber Cove and Taino Bay) | Museo del Ámbar | Museo del Ámbar, Calle Juan Pablo Duarte, La Rigola, Costámbar, Puerto Plata ... | 9.7 |
| Puerto Plata (Amber Cove and Taino Bay) | Ocean World Adventure Park | Ocean World, Navarrete - Pto. Plata, Cofresí, Puerto Plata, 32106, Dominican ... | 4.7 |
| Puerto Plata (Amber Cove and Taino Bay) | Playa Cabarete | Playa Cabarete, Cabarete, Sosúa, Puerto Plata, 32107, Dominican Republic | 37.5 |
| Puerto Plata (Amber Cove and Taino Bay) | Playa Dorada | Playa Dorada, Puerto Plata, 32106, Dominican Republic | 14.0 |
| La Romana | Altos de Chavón | Altos de Chavón, La Romana, 41302, Dominican Republic | 7.9 |
| La Romana | Bayahibe | Bayahibe, San Rafael del Yuma, La Altagracia, 41202, Dominican Republic | 14.6 |
| La Romana | Cueva de las Maravillas | Cave of Wonders, Autopista del Este, Playa Nueva Romana, Batey El Soco, Ramón ... | 20.7 |
| La Romana | Casa de Campo Marina | La Marina Casa de Campo, Calle Barloviento, Dársena, La Romana, 41302 ... | 7.3 |
| La Romana | Playa Dominicus | Playa Dominicus, Dominicus, San Rafael del Yuma, La Altagracia, 41202 ... | 18.3 |
| La Romana | Isla Catalina | Catalina Island, Caleta, La Romana, 41302, Dominican Republic | 8.4 |
| Samaná | Salto El Limón | Salto El Limón, Samana, Samaná, 82202, Dominican Republic | 13.5 |
| Samaná | Cayo Levantado | Cayo Levantado, Samana, Samaná, 82202, Dominican Republic | 7.9 |
| Samaná | Parque Nacional Los Haitises | Parque Nacional Los Haitises, El Valle, Hato Mayor, 50901, Dominican Republic | 36.3 |
| Samaná | Playa Rincón | Rincon Beach, Samana, Samaná, 82202, Dominican Republic | 13.4 |
| Samaná | Las Terrenas | Las Terrenas, Samaná, 82201, Dominican Republic | 24.5 |
| Samaná | Playa Frontón | Playa Fronton, Samana, Samaná, 82202, Dominican Republic | 22.2 |
| Santo Domingo | Alcázar de Colón | Alcázar de Colón, Plaza de la Hispanidad, San Diego, Zona Colonial, Santo ... | 1.2 |
| Santo Domingo | Catedral Primada de América | Basílica Catedral Metropolitana Santa María de la Encarnación Primada de ... | 0.9 |
| Santo Domingo | Fortaleza Ozama | Fortaleza Ozama, Calle Las Damas, Zona Colonial, Santo Domingo, Distrito ... | 1.1 |
| Santo Domingo | Los Tres Ojos | Los Tres Ojos, Avenida Las Américas, Reparto Los Tres Ojos, Valle del Este ... | 5.2 |
| Santo Domingo | Jardín Botánico Nacional | Jardín Botánico Nacional Dr. Rafael María Moscoso, Santo Domingo, Distrito ... | 7.1 |
| Santo Domingo | Calle El Conde | Calle El Conde, San Lazaro, Zona Colonial, Santo Domingo, Distrito Nacional ... | 0.5 |
| Santo Domingo | Faro a Colón | Faro a Colón, Avenida Estados Unidos, Residencial Los Tres Ojos, Santo Domingo ... | 2.6 |
| Frederiksted, St. Croix | Fort Frederik | Fort Frederik, King Street, Frederiksted Historic District, Frederiksted, Saint ... | 0.6 |
| Frederiksted, St. Croix | Sandy Point National Wildlife Refuge | Sandy Point National Wildlife Refuge, Point National Wildlife Refuge Plot # ... | 3.4 |
| Frederiksted, St. Croix | Cruzan Rum Distillery | Cruzan Rum Distillery, Rum Factory Road, Adventure, Williams Delight, Negro ... | 6.7 |
| Frederiksted, St. Croix | Christiansted National Historic Site | Christiansted National Historic Site, King Street, Christiansted Historic ... | 20.1 |
| Frederiksted, St. Croix | Estate Whim Museum | Estate Whim Plantation Museum, 52, Queen Mary Highway / Centerline Road ... | 3.2 |
| Frederiksted, St. Croix | St. George Village Botanical Garden | St. George Village Botanical Gardens, Mountain, Saint Croix District, United ... | 6.2 |
| Frederiksted, St. Croix | Rainbow Beach | Rainbow Beach, William, Saint Croix District, United States Virgin Islands ... | 2.1 |
| Frederiksted, St. Croix | Point Udall | Point Udall, East End Road, Saint Croix District, United States Virgin Islands ... | 34.4 |
| Road Town, Tortola | Cane Garden Bay | Cane Garden Bay, Road Town, VG1130, British Virgin Islands | 4.9 |
| Road Town, Tortola | Sage Mountain National Park | Sage Mountain, Road Town, Tortola, VG1130, British Virgin Islands | 4.4 |
| Road Town, Tortola | J. R. O'Neal Botanic Gardens | Joseph Reynold O'Neal Botanic Gardens, Horsepath, Road Town, Tortola, British ... | 1.1 |
| Road Town, Tortola | Smuggler's Cove | Smuggler's Cove Beach, Belmont, Road Town, Tortola, VG1130, British Virgin ... | 9.8 |
| Road Town, Tortola | Callwood Rum Distillery | Callwood Distillery, Cane Garden Bay Road, Arundell, Road Town, Tortola ... | 4.8 |
| Basseterre, St. Kitts | Brimstone Hill Fortress | Brimstone Hill Fortress, Brimstone Hill Road, Brimstone Hill, Saint Thomas ... | 13.4 |
| Basseterre, St. Kitts | Romney Manor | Romney Manor, Wingfield's Road, Old Road Town, Saint Thomas Middle Island ... | 9.0 |
| Basseterre, St. Kitts | Frigate Bay | Frigate Bay, Suncrest, Kittian Village, Saint Kitts and Nevis | 4.1 |
| Basseterre, St. Kitts | Cockleshell Bay | Cockleshell Bay, Charlestown, Saint Kitts and Nevis | 12.1 |
| Basseterre, St. Kitts | Timothy Hill | Sir Timothy's Hill, Kittian Village, Saint George Basseterre, Saint Kitts ... | 4.6 |
| Basseterre, St. Kitts | Independence Square | Independence Square, Port Zante, Basseterre, Saint George Basseterre, Saint ... | 0.0 |
| Basseterre, St. Kitts | St. Kitts Scenic Railway | Saint Kitts Scenic Railway, Island Main Road, Canada, Saint Peter Basseterre ... | 4.9 |
| St. John's, Antigua | Nelson's Dockyard | Nelson's Dockyard National Park, English Harbour, Saint Paul, Antigua, Antigua ... | 15.2 |
| St. John's, Antigua | Shirley Heights | Shirley Heights, Lookout Trail, Shirley Heights, English Harbour, Saint Paul ... | 16.4 |
| St. John's, Antigua | Betty's Hope | Betty's Hope The Distillery, Honey Dew Cane Road, Pares, Saint Peter, Antigua ... | 11.7 |
| St. John's, Antigua | Half Moon Bay | Half Moon Bay, Freetown, Antigua, Antigua and Barbuda | 19.4 |
| St. John's, Antigua | Devil's Bridge | Devil's Bridge, Saint Philip, Antigua, Antigua and Barbuda | 18.2 |
| St. John's, Antigua | Fort James | Fort James, Fort Road, McKinnon's, Saint John, Antigua, Antigua and Barbuda | 2.1 |
| St. John's, Antigua | Museum of Antigua and Barbuda | Museum of Antigua & Barbuda, Soul Alley, St. John's, Saint John, Antigua ... | 0.5 |
| Castries, St. Lucia | Pigeon Island National Landmark | Pigeon Island National Landmark, Rodney Bay, Gros Islet, Saint Lucia | 9.4 |
| Castries, St. Lucia | Sulphur Springs | Sulphur Springs, Sulphur Springs Road, Plat Pays, Soufrière, LC00 124, Saint ... | 20.3 |
| Castries, St. Lucia | Diamond Falls Botanical Gardens | Diamond Falls, Soufrière, LC00 124, Saint Lucia | 19.1 |
| Castries, St. Lucia | Reduit Beach | Reduit Beach, Reduit, Rodney Bay, Gros Islet, Saint Lucia | 8.0 |
| Castries, St. Lucia | Marigot Bay | Marigot Bay, "Billy Goat" Nature Trail, Marigot, Coolie Town, Castries, LC00 ... | 6.3 |
| Castries, St. Lucia | Castries Market | Castries Market, Darling Road, Castries, Saint Lucia | 0.8 |
| Bridgetown, Barbados | Harrison's Cave | Harrison's Cave, Allan View, Allen View, Mount Wilton, Welchman Hall, Saint ... | 11.1 |
| Bridgetown, Barbados | Carlisle Bay | Carlisle Bay, Lower Collymore Rock, BB11000, Barbados | 2.0 |
| Bridgetown, Barbados | St. Nicholas Abbey | St. Nicholas Abbey, Highway B, Castle, Diamond Corner, Saint Peter, BB25012 ... | 20.1 |
| Bridgetown, Barbados | Hunte's Gardens | Hunte's Gardens, Coffee Gully, Airy Hill, Saint Joseph, BB22069, Barbados | 13.2 |
| Bridgetown, Barbados | Bathsheba | Bathsheba, Saint Joseph, BB20001, Barbados | 16.9 |
| Bridgetown, Barbados | Andromeda Botanic Gardens | Andromeda Botanic Gardens, Highway 3, Hackletons, Bathsheba, Saint Joseph ... | 16.8 |
| Bridgetown, Barbados | Animal Flower Cave | Animal Flower Cave, Animal Flower Cave Road, Retreat, Greenidge, Saint Lucy ... | 26.1 |
| Bridgetown, Barbados | Oistins Fish Market | Oistins Fish Market, Oistins Main Road, Oistins, Christ Church, BB15028 ... | 10.1 |
| St. George's, Grenada | Grand Anse Beach | Grand Anse Beach, Fenton Village, Grand Anse, Saint George, Grenada | 2.6 |
| St. George's, Grenada | Fort George | Fort George, Belmont, St. George's, Saint George, Grenada | 0.2 |
| St. George's, Grenada | Annandale Falls | Annandale Falls, Annandale, Saint George, Grenada | 5.8 |
| St. George's, Grenada | Grand Etang National Park | Grand Etang National Park & Forest Reserve, Vendome, Saint George, Grenada | 7.3 |
| St. George's, Grenada | Belmont Estate | Belmont Estate, Hermitage Road, Hermitage, Saint Patrick, Grenada | 19.6 |
| St. George's, Grenada | Molinere Underwater Sculpture Park | Underwater Sculpture Garden, Western Road, Moliniere, Saint George, Grenada | 3.7 |
| St. George's, Grenada | River Antoine Rum Distillery | River Antoine Rum Distillery, Rum Distillery Road, Mount Rose, Saint Patrick ... | 21.2 |
| St. George's, Grenada | Fort Frederick | Fort Frederick, Richmond Hill, Belmont, Morne Jaloux, Saint George, Grenada | 2.0 |
| Roseau, Dominica | Trafalgar Falls | Trafalgar Falls, Botanical Gardens, Trafalgar, Saint George Parish, Dominica | 6.8 |
| Roseau, Dominica | Emerald Pool | Emerald Pool, Saint David Parish, Dominica | 13.9 |
| Roseau, Dominica | Champagne Reef | Champagne Reef, Victoria Street, Pointe Michel, Saint Luke Parish, Dominica | 5.9 |
| Roseau, Dominica | Titou Gorge | Titou Gorge, Laudat, Saint George Parish, Dominica | 7.8 |
| Roseau, Dominica | Morne Trois Pitons National Park | Morne Trois Pitons National Park, Saint Patrick Parish, Dominica | 10.8 |
| Roseau, Dominica | Scotts Head | Scotts Head, Saint Mark Parish, Dominica | 9.2 |
| Fort-de-France, Martinique | Jardin de Balata | Jardin de Balata, Balata Nord, Fort-de-France, Martinique, France | 8.0 |
| Fort-de-France, Martinique | Saint-Pierre | Saint-Pierre, Martinique, France | 17.2 |
| Fort-de-France, Martinique | Habitation Clément | Habitation Clément, D 6, Le François, Le Marin, Martinique, 97240, France | 17.8 |
| Fort-de-France, Martinique | Plage des Salines | Plage de Petite Anse des Salines, Sainte-Anne, Le Marin, Martinique, 97227 ... | 29.5 |
| Fort-de-France, Martinique | Fort Saint-Louis | Fort Saint-Louis, Boulevard Alfassa, Pointe Simon, Fort-de-France, Martinique ... | 0.7 |
| Fort-de-France, Martinique | Bibliothèque Schœlcher | Bibliothèque Schoelcher, 1, Rue de la Liberté, Pointe Simon, Fort-de-France ... | 0.6 |
| Fort-de-France, Martinique | Distillerie Depaz | Distillerie Depaz, Impasse Lakou Romen, Distillerie Depaz, Saint-Pierre ... | 20.0 |
| Pointe-à-Pitre, Guadeloupe | Mémorial ACTe | Mémorial ACTe, Rue Raspail, Darboussier, Pointe-à-Pitre, Guadeloupe, 97110 ... | 0.9 |
| Pointe-à-Pitre, Guadeloupe | Pointe des Châteaux | Pointe des Chateaux, Saint-François, Pointe-à-Pitre, Guadeloupe, 97118, France | 39.0 |
| Pointe-à-Pitre, Guadeloupe | Distillerie Damoiseau | Distillerie Damoiseau, Route de Bellevue, La Baie, Le Moule, Pointe-à-Pitre ... | 19.7 |
| Pointe-à-Pitre, Guadeloupe | Cascade aux Écrevisses | Cascade aux Écrevisses, Petit-Bourg, Basse-Terre, Guadeloupe, 97170, France | 16.6 |
| Willemstad, Curaçao | Queen Emma Bridge | Koningin Emmabrug, Punda, Willemstad, Curacao, 0000 NA, Netherlands | 0.7 |
| Willemstad, Curaçao | Hato Caves | Hato Caves, F.D. Rooseveltweg, Seru Mahuma, Curacao, Netherlands | 8.4 |
| Willemstad, Curaçao | Christoffel National Park | Christoffel National Park, Curacao, Netherlands | 32.3 |
| Willemstad, Curaçao | Grote Knip | Kenepa Grandi Beach, Knip, Curacao, Netherlands | 35.7 |
| Willemstad, Curaçao | Landhuis Chobolobo | Landhuis Chobolobo, Junostraat, Saliña shopping area, Koraal Specht, Curacao ... | 4.1 |
| Willemstad, Curaçao | Museum Kura Hulanda | Museum Kurá Hulanda, 9, Klipstraat, Otrobanda, Willemstad, Curacao, 0000 NA ... | 0.8 |
| Willemstad, Curaçao | Mambo Beach | Mambo Beach, Koraal Specht, Curacao, Netherlands | 5.0 |
| Willemstad, Curaçao | Curaçao Sea Aquarium | Curaçao Sea Aquarium, Bapor Kibra, Koraal Specht, Willemstad, Curacao ... | 5.4 |
| Willemstad, Curaçao | Fort Amsterdam | Fort Amsterdam, Handelskade, Punda, Willemstad, Curacao, 0000 NA, Netherlands | 0.8 |
| Kralendijk, Bonaire | Washington Slagbaai National Park | Washington Slagbaai National Park, Kaya Gilberto R.E. Herrera, Rincon, Bonaire ... | 15.5 |
| Kralendijk, Bonaire | Sorobon Beach | Sorobon Beach, Windsurf Paradise, Bonaire, Netherlands | 7.6 |
| Kralendijk, Bonaire | Klein Bonaire | Klein Bonaire, Kralendijk, Bonaire, Netherlands | 3.7 |
| Kralendijk, Bonaire | Donkey Sanctuary Bonaire | Donkey Sanctuary, Kaya Ir. Randolph Statius van Eps, La Palma Residence ... | 3.1 |
| Kralendijk, Bonaire | Gotomeer | Saliña Goto, Bonaire, Netherlands | 14.4 |
| Kralendijk, Bonaire | Willemstoren Lighthouse | Willemstoren Lighthouse, EEG Boulevard, Bonaire, Netherlands | 13.9 |
| Kingstown, St. Vincent | Fort Charlotte | Fort Charlotte, Fort Charlotte Road, Campden Park, Saint Andrew, VC0100, Saint ... | 2.3 |
| Kingstown, St. Vincent | Wallilabou Bay | Wallilabou Bay, Barrouallie, Saint Vincent and the Grenadines | 12.3 |
| Kingstown, St. Vincent | Vermont Nature Trail | Vermont Nature trail, Vermont, Saint Andrew, Saint Vincent and the Grenadines | 7.3 |
| Kingstown, St. Vincent | Indian Bay Beach | Indian Bay Beach, Villa, Arnos Vale, Saint George, Saint Vincent and the ... | 2.4 |
| Scarborough, Tobago | Fort King George | Fort King George, Fort Street, Bacolet, Scarborough, Tobago, Trinidad and Tobago | 1.2 |
| Scarborough, Tobago | Pigeon Point Heritage Park | Pigeon Point Heritage Park, Bon Accord, Crown Point, Tobago, Trinidad and Tobago | 11.7 |
| Scarborough, Tobago | Main Ridge Forest Reserve | Main Ridge Forest Reserve, Hermitage, Tobago, Trinidad and Tobago | 18.1 |
| Scarborough, Tobago | Store Bay | Store Bay, Bon Accord, Crown Point, Tobago, Trinidad and Tobago | 11.9 |
| Scarborough, Tobago | Buccoo Reef | Buccoo Reef, Buccoo, Trinidad and Tobago | 10.8 |
| Gustavia, St. Barts | Shell Beach | Shell Beach, Lurin, Gustavia, Saint Barthélemy, 97133, France | 0.5 |
| Gustavia, St. Barts | Fort Karl | Fort Karl, Fort Karl Trail, La Pointe, Gustavia, Saint Barthélemy, 97133, France | 0.3 |
| Gustavia, St. Barts | Saline Beach | Plage de Saline, Grande Saline, Gustavia, Saint Barthélemy, 97133, France | 3.1 |
| Gustavia, St. Barts | Colombier Beach | Plage Colombier, Colombier, Gustavia, Saint Barthélemy, 97133, France | 3.6 |
| Gustavia, St. Barts | Fort Gustave | Fort Gustave, Descente à Malennec, La Pointe, Gustavia, Saint Barthélemy ... | 0.6 |
| Gustavia, St. Barts | Wall House Museum | Musée Wall House, 2, Rue Piteå, La Pointe, Gustavia, Saint Barthélemy, 97133 ... | 0.3 |
| Progreso (Mérida) | Dzibilchaltún | Dzibilchaltún, Mérida, Yucatán, 97500, Mexico | 28.2 |
| Progreso (Mérida) | Plaza Grande Mérida | Plaza Grande, Centro, Mérida, Yucatán, Mexico | 42.0 |
| Progreso (Mérida) | Malecón de Progreso | Malecón, Progreso, Yucatán, 97320, Mexico | 6.1 |
| Progreso (Mérida) | Paseo de Montejo | Paseo Montejo, Centro, Mérida, Yucatán, 97000, Mexico | 40.8 |
| Progreso (Mérida) | Gran Museo del Mundo Maya | Gran Museo del Mundo Maya, Calle 60, Colonia Revolución, Sodzil Norte, Mérida ... | 34.5 |
| Progreso (Mérida) | Ría Celestún | Ría Celestún, Carretera Mérida - Celestún, Celestún, Yucatán, 97367, Mexico | 87.5 |
| Progreso (Mérida) | Faro de Progreso | Faro de Progreso, Calle 80, Progreso, Yucatán, 97320, Mexico | 6.3 |
| Huatulco | Playa La Entrega | Playa La Entrega, Sector F, La Crucecita, Santa María Huatulco, Oaxaca, Mexico | 0.9 |
| Huatulco | Parque Eco-Arqueológico Copalita | Parque Eco-arqueológico Copalita, 15 (tramo), Boulevard Santa Cruz, Bahía de ... | 9.1 |
| Huatulco | La Crucecita | La Crucecita, Santa María Huatulco, Oaxaca, 70987, Mexico | 2.1 |
| Huatulco | Bahía Maguey | Bahía Maguey, La Crucecita, Santa María Huatulco, Oaxaca, Mexico | 3.2 |
| Huatulco | Parque Nacional Huatulco | Parque Nacional Huatulco, La Crucecita, Santa María Huatulco, Oaxaca, Mexico | 6.7 |
| Huatulco | Playa Santa Cruz | Playa Santa Cruz, Sector A, La Crucecita, Santa María Huatulco, Oaxaca, Mexico | 0.3 |
| Acapulco | La Quebrada | La Quebrada, Avenida Adolfo López Mateos, Barrio La Pinzona, Acapulco, Acapulco ... | 1.5 |
| Acapulco | Fuerte de San Diego | Fuerte de San Diego, Calle Hornitos, Terminal Marítima, Acapulco, Acapulco de ... | 0.2 |
| Acapulco | Playa Condesa | Playa Condesa, Acapulco, Acapulco de Juárez, Guerrero, 39300, Mexico | 3.7 |
| Acapulco | Isla de la Roqueta | La Roqueta, Acapulco, Acapulco de Juárez, Guerrero, 39300, Mexico | 3.1 |
| Acapulco | Zócalo de Acapulco | Zócalo de Acapulco, Acapulco, Acapulco de Juárez, Guerrero, 39300, Mexico | 0.7 |
| Acapulco | Pie de la Cuesta | Pie de la Cuesta, Coyuca de Benítez, Guerrero, 39900, Mexico | 14.3 |
| Manzanillo | Playa La Audiencia | La Audiencia Beach, Condominios La Punta, Manzanillo, Colima, 28200, Mexico | 6.7 |
| Manzanillo | Monumento al Pez Vela | Pez Vela, Tauro, Centro Histórico, Manzanillo, Colima, 28200, Mexico | 0.3 |
| Manzanillo | Playa Miramar | Playa Miramar, Manzanillo, Colima, 28200, Mexico | 10.3 |
| Manzanillo | Jardín Álvaro Obregón | Alvaro Obregon Garden, Centro Histórico, Manzanillo, Colima, 28200, Mexico | 0.3 |
| Manzanillo | Playa La Boquita | La Boquita Beach, Manzanillo, Colima, 28200, Mexico | 10.5 |
| Zihuatanejo and Ixtapa | Playa La Ropa | Playa la Ropa, Zihuatanejo, Zihuatanejo de Azueta, Guerrero, 40880, Mexico | 2.1 |
| Zihuatanejo and Ixtapa | Playa Las Gatas | Playa las Gatas, Zihuatanejo, Zihuatanejo de Azueta, Guerrero, 40880, Mexico | 2.9 |
| Zihuatanejo and Ixtapa | Isla Ixtapa | Isla Grande (Isla Ixtapa), San José Ixtapa (Barrio Viejo), Zihuatanejo de ... | 11.8 |
| Zihuatanejo and Ixtapa | Paseo del Pescador | Paseo del Pescador, Zihuatanejo, Zihuatanejo de Azueta, Guerrero, 40880, Mexico | 0.9 |
| Zihuatanejo and Ixtapa | Museo Arqueológico de la Costa Grande | Museo de Arqueológico, Paseo del Pescador, Zihuatanejo, Zihuatanejo de Azueta ... | 1.0 |
| Zihuatanejo and Ixtapa | Xihuacan | Museo de Sitio Xihuacan, Carretera Federal Acapulco - Zihuatanejo, Palos ... | 26.8 |
| La Paz | Playa Balandra | Playa Balandra, Municipio de La Paz, Baja California Sur, Mexico | 17.7 |
| La Paz | Playa El Tecolote | Playa El Tecolote, Municipio de La Paz, Baja California Sur, Mexico | 19.4 |
| La Paz | Todos Santos | Todos Santos, Municipio de La Paz, Baja California Sur, 23300, Mexico | 79.7 |
| La Paz | Isla Espíritu Santo | Isla Espíritu Santo, Municipio de La Paz, Baja California Sur, Mexico | 34.0 |
| Loreto | Misión de Nuestra Señora de Loreto | Misión de Nuestra Señora de Loreto Conchó, Calle Salvatierra, Colonia Obrera ... | 0.2 |
| Loreto | Misión San Francisco Javier | Misión San Francisco Javier de Viggé-Biaundó, Carretera San Javier - Loreto ... | 25.9 |
| Loreto | Isla Coronado | Isla Coronado, Municipio de Loreto, Baja California Sur, Mexico | 14.0 |
| Loreto | Malecón de Loreto | Malecón de Loreto, Centro, Loreto, Municipio de Loreto, Baja California Sur ... | 0.6 |
| Loreto | Parque Nacional Bahía de Loreto | Parque Nacional Bahía de Loreto, Mexico | 24.4 |
| Loreto | Museo de las Misiones | Museo de las Misiones Jesuiticas, 123, Calle Salvatierra, Colonia Obrera ... | 0.2 |
| Cartagena | Castillo San Felipe de Barajas | Castillo San Felipe de Barajas, Calle 30, El Espinal, Cartagena, Dique ... | 2.2 |
| Cartagena | Las Bóvedas | Las Bovedas, Cartagena City Walls, San Diego, Cartagena, Dique, Bolívar, RAP ... | 3.3 |
| Cartagena | Palacio de la Inquisición | Palacio de la Inquisión, Calle de la Inquisición, Centro, Cartagena, Dique ... | 3.0 |
| Cartagena | Convento de la Popa | La Popa, Cartagena, Dique, Bolívar, RAP Caribe, 130015, Colombia | 1.8 |
| Cartagena | Getsemaní | Getsemaní, Cartagena, Dique, Bolívar, RAP Caribe, Colombia | 2.4 |
| Cartagena | Torre del Reloj | Puerta del Reloj, Plaza de la Paz, Centro, Cartagena, Dique, Bolívar, RAP ... | 2.8 |
| Cartagena | Playa Blanca | Playa Blanca, Cartagena, Dique, Bolívar, RAP Caribe, Colombia | 21.7 |
| Cartagena | Plaza Santo Domingo | Plaza de Santo Domingo, Centro, Cartagena, Dique, Bolívar, RAP Caribe, Colombia | 3.1 |
| Santa Marta | Quinta de San Pedro Alejandrino | Quinta de San Pedro Alejandrino, Avenida del Libertador, Localidad 2 Histórica ... | 2.0 |
| Santa Marta | Parque Nacional Natural Tayrona | Parque Nacional Natural Tayrona, Santa Marta, Magdalena, RAP Caribe, Colombia | 18.6 |
| Santa Marta | Minca | Minca, Santa Marta, Magdalena, RAP Caribe, 470008, Colombia | 13.1 |
| Santa Marta | Taganga | Taganga, Santa Marta, Magdalena, RAP Caribe, Colombia | 4.1 |
| Santa Marta | Museo del Oro Tairona | Museo del Oro, Calle 13, Centro Histórico de Santa Marta, Localidad 2 Histórica ... | 2.4 |
| Colón, Panama | Agua Clara Visitor Center | Agua Clara Visitor Center, Camino al Mirador de Agua Clara, Gatún, Cristóbal ... | 10.5 |
| Colón, Panama | Fuerte San Lorenzo | Fort San Lorenzo, Camino Fuerte de San Lorenzo, Cristóbal, Colón, Panama | 12.8 |
| Colón, Panama | Portobelo | Portobelo, Colón, Panama | 33.9 |
| Colón, Panama | Lago Gatún | Gatún Lake, Colón, Panama | 22.1 |
| Colón, Panama | Parque Nacional Soberanía | Parque Nacional Soberanía, Colón, Panama | 29.9 |
| Colón, Panama | Miraflores Locks | Miraflores Locks, Calle Bruja, City of Knowledge, Ancón, Distrito de Panamá ... | 51.9 |
| Panama City (Fuerte Amador) | Casco Viejo | San Felipe, Panama City, Distrito de Panamá, Panamá Province, Panama | 4.4 |
| Panama City (Fuerte Amador) | Miraflores Locks | Miraflores Locks, Arraiján, Panamá Oeste, Panama | 11.7 |
| Panama City (Fuerte Amador) | Biomuseo | Biomuseo, Amador Causeway, Ancón, Distrito de Panamá, Panamá Province, 0843 ... | 3.2 |
| Panama City (Fuerte Amador) | Parque Natural Metropolitano | Parque Natural Metropolitano, Avenida Juan Pablo II, Ancón, Distrito de Panamá ... | 8.2 |
| Panama City (Fuerte Amador) | Mercado de Mariscos | Mercado de Mariscos, Avenida Balboa, Barrio Chino, Santa Ana, Distrito de ... | 5.1 |
| Puerto Limón | Parque Nacional Cahuita | Parque Nacional Cahuita, Cahuita, Talamanca, Limón Province, 70403, Costa Rica | 36.1 |
| Puerto Limón | Puerto Viejo de Talamanca | Puerto Viejo de Talamanca, 256, Vía 256, Turrialbeño, Hotel Creek, Cahuita ... | 46.5 |
| Puerto Limón | Veragua Rainforest | Veragua Rainforest Eco-Adventure, Calle Brisas de Veragua, Río Blanco, Limón ... | 19.6 |
| Puerto Limón | Jaguar Rescue Center | Jaguar Rescue Center, Calle Jaguar, Cocles, Cahuita, Talamanca, Limón Province ... | 50.7 |
| Puerto Limón | Sloth Sanctuary of Costa Rica | Sloth sanctuary, Corredor Caribe, I Griega, Valle La Estrella, Limón, Limón ... | 24.2 |
| Puerto Limón | Playa Bonita | Playa Bonita, Portete, Limón, Limón Province, 70101, Costa Rica | 4.9 |
| Puerto Limón | Parque Vargas | Parque Balvanero Vargas, Limón, Limón Province, Costa Rica | 0.5 |
| Puntarenas | Parque Nacional Carara | Parque Nacional Carara, Garabito, Puntarenas Province, Costa Rica | 38.7 |
| Puntarenas | Paseo de los Turistas | Paseo de Los Turistas, Puntarenas, Puntarenas Province, 60101, Costa Rica | 1.7 |
| Puntarenas | Playa Herradura | Herradura Beach, Jacó, Garabito, Puntarenas Province, 61101, Costa Rica | 41.0 |
| Puntarenas | Jacó | Jacó, Garabito, Puntarenas Province, 61101, Costa Rica | 46.1 |
| Puntarenas | Catedral de Puntarenas | Catedral del Sagrado Corazón de Jesús, Calle 5, Puntarenas, Puntarenas ... | 0.1 |
| Puntarenas | Isla San Lucas | Isla San Lucas, Puntarenas, Puntarenas Province, 60101, Costa Rica | 8.9 |
| Puerto Quetzal (Antigua Guatemala) | Arco de Santa Catalina | Arco de Santa Catalina, 5a Avenida Norte, Candelaria, San Felipe de Jesús ... | 69.9 |
| Puerto Quetzal (Antigua Guatemala) | Volcán de Pacaya | Pacaya, Paseo Lunar, El Cedro, San Francisco de Sales, San Vicente Pacaya ... | 54.2 |
| Puerto Quetzal (Antigua Guatemala) | Autosafari Chapín | Auto Safari Chapín, Guanagazapa, Taxisco, Santa Rosa, Guatemala | 25.3 |
| Puerto Quetzal (Antigua Guatemala) | Iglesia de San Francisco El Grande | Iglesia de San Francisco el Grande, 7a, Calle del Hermano Pedro, El Pensativo ... | 69.3 |
| Santo Tomás de Castilla | Livingston | Livingston, Izabal, Guatemala | 21.6 |
| Santo Tomás de Castilla | Castillo de San Felipe de Lara | Castillo de San Felipe de Lara, Carretera a San Felipe de Lara, La Corocera ... | 41.3 |
| Santo Tomás de Castilla | Quiriguá | Quiriguá, Finca Quirigua D.M., Los Amates, Izabal, Guatemala | 65.1 |
| Santo Tomás de Castilla | Siete Altares | Siete Altares, Quehueche, Livingston, Izabal, 30303, Guatemala | 26.8 |
| Santo Tomás de Castilla | Río Dulce | Río Dulce, Izabal, Guatemala | 28.8 |
| Santo Tomás de Castilla | Punta de Palma | Punta de Palma, Puerto Barrios, Izabal, 18001, Guatemala | 6.4 |
| Lima (Callao) | Plaza Mayor de Lima | Main Square of Lima, Urbanización Cercado de Lima, Lima, Province of Lima, Lima ... | 11.8 |
| Lima (Callao) | Huaca Pucllana | Huaca Pucllana, Calle Juana Alarcó de Dammert, América, Miraflores, Province of ... | 13.2 |
| Lima (Callao) | Parque del Amor | Love Park, Miraflores, Province of Lima, Lima Metropolitan Area, Lima, Peru | 13.9 |
| Lima (Callao) | Museo Larco | Museo Larco, Jirón Navarra, Pueblo Libre, Province of Lima, Lima Metropolitan ... | 7.7 |
| Lima (Callao) | Barranco | Barranco, Province of Lima, Lima Metropolitan Area, Lima, Peru | 16.5 |
| Lima (Callao) | Pachacamac | Complejo Santuario Arquelógico Pachacamac, Lurín, Province of Lima, Lima ... | 34.6 |
| Lima (Callao) | Fortaleza del Real Felipe | Real Felipe Fortress, Callao, Lima Metropolitan Area, Callao, Peru | 1.6 |
| Valparaíso (Santiago) | Cerro Concepción | Cerro Concepción, Historic Quarter of the Seaport City of Valparaíso ... | 1.3 |
| Valparaíso (Santiago) | La Sebastiana | La Sebastiana, Cerro Florida, Almendral, Valparaíso, Provincia de Valparaíso ... | 1.5 |
| Valparaíso (Santiago) | Viña del Mar | Viña del Mar, Provincia de Valparaíso, Valparaiso Region, Chile | 6.1 |
| Valparaíso (Santiago) | Reloj de Flores | Flower Clock, Álamos, Cerro Castillo, Recreo, Viña del Mar, Provincia de ... | 4.8 |
| Valparaíso (Santiago) | Casa de Isla Negra | Centro de Visitantes Casa de Neruda, Poeta Neruda, Isla Negra, El Quisco ... | 44.9 |
| Valparaíso (Santiago) | Viña Casas del Bosque | Viña Casas del Bosque, Ruta F-830, Villa Magallanes, Casablanca, Provincia de ... | 34.8 |
| Puerto Montt | Puerto Varas | Puerto Varas, Provincia de Llanquihue, Los Lagos Region, Chile | 18.4 |
| Puerto Montt | Volcán Osorno | Volcán Osorno, Puerto Varas, Provincia de Llanquihue, Los Lagos Region, Chile | 53.8 |
| Puerto Montt | Teatro del Lago | Teatro del Lago, 1000, Avenida Bernardo Philippi, Frutillar Bajo, Loteo ... | 38.5 |
| Puerto Montt | Feria Artesanal de Angelmó | Feria Artesanal Angelmó, Avenida Angelmó, Población Marina Mercante, Angelmó ... | 0.4 |
| Puerto Montt | Frutillar | Frutillar, Provincia de Llanquihue, Los Lagos Region, Chile | 40.6 |
| Puerto Montt | Parque Nacional Vicente Pérez Rosales | Vicente Pérez Rosales National Park, Los Lagos Region, Chile | 80.6 |
| Punta Arenas | Plaza Muñoz Gamero | Plaza Benjamín Muñoz Gamero, Centro de Punta Arenas, Punta Arenas, Provincia de ... | 0.8 |
| Punta Arenas | Cementerio Municipal de Punta Arenas | Cementerio Municipal Sara Braun, Punta Arenas, Provincia de Magallanes ... | 2.0 |
| Punta Arenas | Museo Nao Victoria | Nao Victoria Museum, Rancho Las Cabras, Punta Arenas, Provincia de Magallanes ... | 7.2 |
| Punta Arenas | Fuerte Bulnes | Fuerte Bulnes, Punta Arenas, Provincia de Magallanes, Magallanes and Chilean ... | 51.2 |
| Punta Arenas | Seno Otway | Seno Otway, Provincia de Magallanes, Magallanes and Chilean Antarctica Region ... | 52.9 |
| Punta Arenas | Museo Regional de Magallanes | Museo Regional de Magallanes, Hernando de Magallanes, Centro de Punta Arenas ... | 0.9 |
| Punta Arenas | Cerro de la Cruz | Cerro de la Cruz, Almirante Manuel Señoret, Cerro de la Cruz, Punta Arenas ... | 1.3 |
| Ushuaia | Parque Nacional Tierra del Fuego | Parque Nacional Tierra del Fuego, Ushuaia, Departamento Ushuaia, Tierra del ... | 10.3 |
| Ushuaia | Tren del Fin del Mundo | Tren del Fin del Mundo, Avenida Doctor Raúl Ricardo Alfonsín, Ushuaia ... | 8.6 |
| Ushuaia | Glaciar Martial | Glaciar Martial, Luis Fernando Martial, Luis Martial, Ushuaia, Departamento ... | 4.1 |
| Ushuaia | Museo Marítimo y del Presidio de Ushuaia | Museo Marítimo de Ushuaia, Yaganes, Base Naval, Ushuaia, Departamento Ushuaia ... | 0.9 |
| Ushuaia | Faro Les Éclaireurs | Les Eclaireurs Lighthouse, Argentina | 16.1 |
| Ushuaia | Laguna Esmeralda | Laguna Esmeralda, Sendero Laguna Esmeralda, Departamento Ushuaia, Argentina | 17.2 |
| Ushuaia | Estancia Harberton | Estancia Harberton, Departamento Ushuaia, Tierra del Fuego, Argentina | 63.2 |
| Puerto Madryn | Península Valdés | Valdes Peninsula, Chubut, Argentina | 82.1 |
| Puerto Madryn | Ecocentro | Ecocentro, 3784, Julio Verne, Los Médanos, Municipio de Puerto Madryn ... | 3.7 |
| Puerto Madryn | Punta Loma | Punta Loma, Ruta Provincial A01, Municipio de Puerto Madryn, Departamento ... | 12.2 |
| Puerto Madryn | Playa El Doradillo | Playa El Doradillo, Segunda Bajada, Municipio de Puerto Madryn, Departamento ... | 13.1 |
| Puerto Madryn | Museo Paleontológico Egidio Feruglio | Museum of Paleontology Egidio Feruglio, 140, Avenida Fontana, Unión, Trelew ... | 57.9 |
| Puerto Madryn | Gaiman | Gaiman, Municipio de Gaiman, Departamento Gaiman, Chubut, U9105, Argentina | 69.3 |
| Buenos Aires | Plaza de Mayo | Plaza de Mayo, Monserrat, Buenos Aires, Comuna 1, Autonomous City of Buenos ... | 2.9 |
| Buenos Aires | Casa Rosada | Pink House, 50, Balcarce, Monserrat, Buenos Aires, Comuna 1, Autonomous City of ... | 2.8 |
| Buenos Aires | Caminito | Caminito, La Boca, Buenos Aires, Distrito de Las Artes, Comuna 4, Autonomous ... | 6.3 |
| Buenos Aires | Cementerio de la Recoleta | Recoleta Cemetry, Vicente López, La Isla, Barrio Norte, Recoleta, Buenos Aires ... | 2.2 |
| Buenos Aires | Teatro Colón | Teatro Colón, 628, Cerrito, Microcentro, San Nicolás, Buenos Aires, Comuna 1 ... | 2.4 |
| Buenos Aires | Mercado de San Telmo | Mercado de San Telmo, 963, Defensa, San Telmo, Buenos Aires, Comuna 1 ... | 4.0 |
| Buenos Aires | Puerto Madero | Puerto Madero, Buenos Aires, Comuna 1, Autonomous City of Buenos Aires ... | 3.1 |
| Buenos Aires | El Ateneo Grand Splendid | El Ateneo Grand Splendid, 1860, Avenida Santa Fe, Barrio Norte, Recoleta ... | 2.7 |
| Montevideo | Mercado del Puerto | Mercado del Puerto, Piedras, Ciudad Vieja, Montevideo, 11000, Uruguay | 0.4 |
| Montevideo | Teatro Solís | Teatro Solís, Juncal, Ciudad Vieja, Montevideo, 11000, Uruguay | 1.3 |
| Montevideo | Plaza Independencia | Plaza Independencia, Ciudad Vieja, Montevideo, Uruguay | 1.3 |
| Montevideo | Palacio Salvo | Palacio Salvo, Plaza Independencia, Ciudad Vieja, Montevideo, 11000, Uruguay | 1.4 |
| Montevideo | Playa Pocitos | Pocitos Beach, Pocitos, Montevideo, Uruguay | 6.1 |
| Montevideo | Bodega Bouza | Bodega Bouza, Camino de la Redención, Melilla, Montevideo, 12500, Uruguay | 13.7 |
| Montevideo | Palacio Legislativo | Palacio Legislativo, Avenida de las Leyes, Aguada, Montevideo, 11800, Uruguay | 2.6 |
| Punta del Este | La Mano | The Hand, Rambla General Artigas, Punta Del Este, Maldonado, 20100, Uruguay | 0.8 |
| Punta del Este | Casapueblo | Museo – Taller de Casapueblo, Mar de Liguria, Punta Ballena, Maldonado, 20003 ... | 11.0 |
| Punta del Este | Faro de José Ignacio | Faro de José Ignacio, Calle 8, José Ignacio, Maldonado, 20402, Uruguay | 31.2 |
| Punta del Este | Faro de Punta del Este | Faro de Punta del Este, 2 de Febrero (Calle 10), Punta Del Este, Maldonado ... | 0.9 |
| Punta del Este | Arboretum Lussich | Arboretum Lussich, Maldonado, Uruguay | 12.9 |
| Punta del Este | Isla Gorriti | Isla Gorriti, Maldonado, Uruguay | 2.7 |
| Rio de Janeiro | Cristo Redentor | Christ the Redeemer, Estrada do Corcovado, Santa Teresa, Rio de Janeiro ... | 6.9 |
| Rio de Janeiro | Praia de Copacabana | Copacabana Beach, Copacabana, Rio de Janeiro, Southeast Region, Brazil | 9.1 |
| Rio de Janeiro | Praia de Ipanema | Praia de Ipanema, Ipanema, Rio de Janeiro, Southeast Region, Brazil | 10.5 |
| Rio de Janeiro | Escadaria Selarón | Escadaria Selarón, Rua Manoel Carneiro, Santa Teresa, Rio de Janeiro, Southeast ... | 2.6 |
| Rio de Janeiro | Jardim Botânico do Rio de Janeiro | Rio de Janeiro Botanical Garden, 1008, Jardim Botânico, Rio de Janeiro ... | 9.1 |
| Rio de Janeiro | Museu do Amanhã | Museum of Tomorrow, 1, Praça Mauá, Centro, Rio de Janeiro, Southeast Region ... | 0.8 |
| Rio de Janeiro | Parque Nacional da Tijuca | Tijuca National Park, Rio de Janeiro, Southeast Region, 22470-180, Brazil | 9.9 |
| Charlottetown | Green Gables Heritage Place | Green Gables, Haunted Wood Trail, Cavendish, Resort Municipality of Stanley ... | 34.3 |
| Charlottetown | Victoria Park | Victoria Park, Downtown, Charlottetown, Queens County, Prince Edward Island ... | 1.3 |
| Charlottetown | Cavendish Beach | Cavendish Beach, Bayview, Resort Municipality of Stanley Bridge, Hope River ... | 38.4 |
| Charlottetown | Point Prim Lighthouse | Point Prim Lighthouse, Point Prim Road, Rural Municipality of Belfast, Queens ... | 21.7 |
| Charlottetown | Confederation Centre of the Arts | Confederation Centre of the Arts, 130, Queen Street, Downtown, Charlottetown ... | 0.1 |
| Charlottetown | Beaconsfield Historic House | Beaconsfield Historic House, 2, Kent Street, Downtown, Charlottetown, Queens ... | 0.7 |
| Saint John, New Brunswick | Reversing Falls | Reversing Falls, Saint John West, Saint John, Saint Johns Parish, City of Saint ... | 2.1 |
| Saint John, New Brunswick | Fundy Trail Parkway | Fundy Trail Parkway, Salmon River, Saint Martins Parish, Village of Fundy-St. ... | 54.5 |
| Saint John, New Brunswick | Irving Nature Park | Irving Nature Park, Saint John, Saint Johns Parish, City of Saint John, Saint ... | 7.7 |
| Saint John, New Brunswick | Saint John City Market | City Market, 47, Charlotte Street, Trinity Royal, Uptown, Saint John, Saint ... | 0.6 |
| Saint John, New Brunswick | New Brunswick Museum | New Brunswick Museum, Douglas Avenue, Indiantown, Saint John, Saint Johns ... | 1.6 |
| Saint John, New Brunswick | St. Martins Sea Caves | St. Martins Sea Caves, Big Salmon River Road, Bay View, Saint Martins Parish ... | 43.3 |
| Sydney, Nova Scotia | Fortress of Louisbourg | Fortress of Louisbourg, Fortress of Louisbourg National Historic Park, Cape ... | 31.9 |
| Sydney, Nova Scotia | Alexander Graham Bell National Historic Site | Alexander Graham Bell Museum, 559, Chebucto Street, Baddeck, Municipality of ... | 42.6 |
| Sydney, Nova Scotia | Membertou Heritage Park | Membertou Heritage Park, St Anthony Drive, Sydney, Cape Breton Regional ... | 1.8 |
| Sydney, Nova Scotia | Cossit House Museum | Cossit House Museum, Charlotte Street, Northend, Whitney Pier, Sydney, Cape ... | 0.6 |
| Sydney, Nova Scotia | Louisbourg Lighthouse | Louisbourg Lighthouse, Havenside Road, Louisbourg, Cape Breton Regional ... | 31.5 |
| Sydney, Nova Scotia | Highland Village Museum | Highland Village, 4119, Highway 223, Iona, Municipality of Victoria County ... | 52.5 |
| Quebec City | Château Frontenac | Château Frontenac, Rue des Carrières, Vieux-Québec ... | 0.4 |
| Quebec City | Montmorency Falls | Montmorency Falls, Boischatel, La Côte-de-Beaupré, Capitale-Nationale, Quebec ... | 9.7 |
| Quebec City | Plains of Abraham | Plains of Abraham, Montcalm, La Cité-Limoilou, Quebec, Urban agglomeration of ... | 2.4 |
| Quebec City | Île d'Orléans | Île d'Orléans, Saint-Jean-de-l'Île-d'Orléans, L'Île-d'Orléans ... | 24.1 |
| Quebec City | Petit Champlain | Théâtre du Petit Champlain, 68, Rue du Petit-Champlain, Vieux-Québec ... | 0.4 |
| Quebec City | Basilica of Sainte-Anne-de-Beaupré | Basilique Sainte Anne de Beaupré, 10018, Avenue Royale, Sainte-Anne-de-Beaupré ... | 31.6 |
| Quebec City | Place Royale | Place Royale, Vieux-Québec, Vieux-Québec–Cap-Blanc–Colline-Parlementaire, La ... | 0.4 |
| Montreal | Notre-Dame Basilica | Notre-Dame Basilica, 110, Rue Notre-Dame Ouest, Vieux-Montréal, Ville-Marie ... | 1.1 |
| Montreal | Old Montreal | Old Montreal, Montreal, Urban agglomeration of Montreal, Montreal ... | 1.1 |
| Montreal | Mount Royal Park | Mount Royal Park, Ville-Marie, Montreal, Urban agglomeration of Montreal ... | 1.5 |
| Montreal | Jean-Talon Market | Jean Talon Market, 7070, Avenue Henri-Julien, La Petite-Patrie, Rosemont–La ... | 5.1 |
| Montreal | Montreal Botanical Garden | Montreal Botanical Garden, 4101, Rosemont–La Petite-Patrie, Montreal, Urban ... | 6.3 |
| Montreal | Saint Joseph's Oratory | Saint Joseph's Oratory, 3800, Queen-Mary Road, Côte-des-Neiges ... | 3.9 |
| Montreal | Montreal Museum of Fine Arts | Montreal Museum of Fine Arts, 1380, Rue Sherbrooke Ouest, Ville-Marie ... | 0.9 |
| Portland, Maine | Portland Head Light | Portland Head Light, Captain Strout Circle, Cape Elizabeth, Cumberland County ... | 5.6 |
| Portland, Maine | Old Port | Old Port, Portland, Cumberland County, Maine, 04101, United States | 0.4 |
| Portland, Maine | Eastern Promenade | Eastern Promenade, Portland, Cumberland County, Maine, United States | 1.8 |
| Portland, Maine | Portland Museum of Art | Portland Museum of Art, 7, High Street, Parkside, West End, Portland ... | 0.5 |
| Portland, Maine | Victoria Mansion | Victoria Mansion, 109, Danforth Street, Arts District, Portland, Cumberland ... | 0.7 |
| Portland, Maine | Allagash Brewing Company | Allagash Brewing Company, 100, Industrial Way, Riverton, Portland, Cumberland ... | 6.9 |
| Portland, Maine | Two Lights State Park | Two Lights State Park, Cape Elizabeth, Cumberland County, Maine, 04107, United ... | 11.6 |
| Portland, Maine | Crescent Beach State Park | Crescent Beach State Park, Cape Elizabeth, Cumberland County, Maine, 04107 ... | 10.7 |
| Newport, Rhode Island | The Breakers | The Breakers, 44, Ochre Point Avenue, Newport, Newport County, Rhode Island ... | 2.6 |
| Newport, Rhode Island | Cliff Walk | Cliff Walk, Newport, Newport County, Rhode Island, 02840, United States | 2.1 |
| Newport, Rhode Island | Fort Adams State Park | Fort Adams State Park, Newport, Newport County, Rhode Island, United States | 2.6 |
| Newport, Rhode Island | Brenton Point State Park | Brenton Point State Park, Newport, Newport County, Rhode Island, United States | 5.4 |
| Newport, Rhode Island | International Tennis Hall of Fame | International Tennis Hall of Fame, 194, Bellevue Avenue, Newport, Newport ... | 0.9 |
| Newport, Rhode Island | Marble House | Marble House, 596, Bellevue Avenue, Newport, Newport County, Rhode Island ... | 3.2 |
| Newport, Rhode Island | Bowen's Wharf | Bowen's Wharf, Newport, Newport County, Rhode Island, 02840, United States | 0.4 |
| Baltimore | Fort McHenry National Monument and Historic Shrine | Fort McHenry National Monument and Historic Shrine, Baltimore, Maryland, United ... | 1.6 |
| Baltimore | Inner Harbor | Inner Harbor, Baltimore, Maryland, 21233, United States | 2.3 |
| Baltimore | National Aquarium | National Aquarium, 501, East Pratt Street, Inner Harbor, Baltimore, Maryland ... | 2.3 |
| Baltimore | Walters Art Museum | Walters Art Museum, 600, North Charles Street, Mount Vernon, Sowebo, Baltimore ... | 3.8 |
| Baltimore | B&O Railroad Museum | National Museum of Railroad History & Innovation, 901, West Pratt Street ... | 3.7 |
| Baltimore | American Visionary Art Museum | American Visionary Art Museum, Covington Street Cycletrack, Federal Hill ... | 1.8 |
| Baltimore | Lexington Market | Lexington Market, 201, North Eutaw Street, Chinatown, Downtown, Baltimore ... | 3.5 |
| Baltimore | Fells Point | Fells Point, South Broadway, Fell's Point, Baltimore, Maryland, 21231, United ... | 2.0 |
| Charleston | Fort Sumter National Monument | Fort Sumter, Mount Pleasant, Charleston County, South Carolina, United States | 5.6 |
| Charleston | Rainbow Row | Rainbow Row (North End), Elliott Street, King Street Antique District, French ... | 0.6 |
| Charleston | Charleston City Market | Charleston City Market, 188, Meeting Street, King Street Fashion District ... | 0.5 |
| Charleston | Magnolia Plantation and Gardens | Magnolia Plantation and Gardens, 3500, Ashley River Road, Shadowmoss ... | 18.1 |
| Charleston | Middleton Place | Middleton Place, Middleton Place Road, Dorchester County, South Carolina ... | 24.1 |
| Charleston | Patriots Point Naval and Maritime Museum | Patriots Point Naval and Maritime Museum, Patriots Point Road, Mount Pleasant ... | 2.0 |
| Charleston | Folly Beach | Folly Beach, Charleston County, South Carolina, 29439, United States | 14.1 |
| Charleston | Angel Oak | Angel Oak, 3688, Angel Oak Road, Fenwick Crossroads, Johns Island, Charleston ... | 16.3 |
| Jacksonville | Cummer Museum of Art and Gardens | Cummer Museum of Art, 829, Riverside Avenue, Brooklyn, Jacksonville, Duval ... | 13.8 |
| Jacksonville | Jacksonville Zoo and Gardens | Jacksonville Zoo and Gardens, 370, Zoo Parkway, Holly Ford, Jacksonville, Duval ... | 6.1 |
| Jacksonville | Fort Caroline National Memorial | Fort Caroline National Memorial, Fort Caroline, Jacksonville, Duval County ... | 8.3 |
| Jacksonville | Kingsley Plantation | Kingsley Plantation, 11676, Palmetto Avenue, Fort George Island, Jacksonville ... | 14.1 |
| Jacksonville | Jacksonville Beach | Jacksonville Beach, Duval County, Florida, 32250, United States | 21.9 |
| Jacksonville | Fort Clinch State Park | Fort Clinch State Park, 2601, Atlantic Avenue, Fernandina Beach, Nassau County ... | 32.3 |
| Jacksonville | Castillo de San Marcos | Castillo de San Marcos, 1, South Castillo Drive, Old City, Uptown, Saint ... | 62.3 |
| Jacksonville | Huguenot Memorial Park | Huguenot Memorial Park, Fort George Island, Jacksonville, Duval County ... | 16.7 |
| Mobile | USS Alabama Battleship Memorial Park | USS Alabama Battleship Memorial Park, Mobile County Commission District 3 ... | 2.2 |
| Mobile | Bellingrath Gardens and Home | Bellingrath Gardens, Mobile County Commission District 3, Mobile County ... | 30.1 |
| Mobile | Mobile Carnival Museum | Mobile Carnival Museum, 355, Government Street, Downtown, Mobile County ... | 0.8 |
| Mobile | Dauphin Island | Dauphin Island, Mobile County, Alabama, 36528, United States | 48.6 |
| Mobile | Fort Gaines | Fort Gaines, Mobile County Commission District 3, Dauphin Island, Mobile ... | 48.9 |
| Mobile | Fort Conde | Fort Conde, 150, South Royal Street, Downtown, Mobile County Commission ... | 0.3 |
| Norfolk | Nauticus | Nauticus, 1, Waterside Drive, Downtown, Berkley, Norfolk, Virginia, 23510 ... | 0.1 |
| Norfolk | Norfolk Botanical Garden | Norfolk Botanical Garden, East Beach, Norfolk, Virginia, United States | 10.7 |
| Norfolk | Chrysler Museum of Art | Chrysler Museum of Art, 1, Memorial Place, Norfolk, Virginia, 23510, United ... | 1.0 |
| Norfolk | Virginia Beach Boardwalk | Boardwalk, Virginia Beach, Virginia, 23451, United States | 28.6 |
| Norfolk | Colonial Williamsburg | Williamsburg Historic District, North England Street, Williamsburg, Virginia ... | 59.1 |
| Norfolk | MacArthur Memorial | Macarthur Memorial, 198, Bank Street, Downtown, Berkley, Norfolk, Virginia ... | 0.7 |
| Norfolk | Fort Monroe | Fort Monroe, Ruckman Road, Fort Monroe, Hampton, Virginia, 23651, United States | 17.5 |
| Norfolk | Virginia Aquarium and Marine Science Center | Virginia Aquarium and Marine Science Centers, 717, General Booth Boulevard ... | 27.9 |
| Los Angeles (San Pedro) | Battleship USS Iowa Museum | Battleship USS Iowa, North Front Street, Port of Los Angeles, San Pedro Arts ... | 0.4 |
| Los Angeles (San Pedro) | Point Fermin Lighthouse | Point Fermin Lighthouse, West Paseo del Mar, San Pedro Arts and Cultural ... | 4.7 |
| Los Angeles (San Pedro) | Cabrillo Marine Aquarium | Cabrillo Marine Aquarium, 3720, Stephen M. White Drive, San Pedro Arts and ... | 3.9 |
| Los Angeles (San Pedro) | Griffith Observatory | Griffith Observatory, 2800, East Observatory Road, Los Feliz Neighborhood ... | 41.5 |
| Los Angeles (San Pedro) | Santa Monica Pier | Santa Monica Pier, Santa Monica Pier Trail Underpass, Downtown Santa Monica ... | 35.6 |
| Los Angeles (San Pedro) | Hollywood Walk of Fame | Walk of Fame, North Orange Drive, Hollywood, Los Angeles, Los Angeles County ... | 40.0 |
| Los Angeles (San Pedro) | Korean Bell of Friendship | Korean Friendship Bell, South Gaffey Street, San Pedro Arts and Cultural ... | 4.3 |
| Long Beach | Queen Mary | Queen Mary, Windsor Way, Long Beach, Los Angeles County, California, 90802 ... | 0.4 |
| Long Beach | Aquarium of the Pacific | Aquarium of the Pacific, Bicycle Route 17, Long Beach, Los Angeles County ... | 1.4 |
| Long Beach | Rancho Los Alamitos | Rancho Los Alamitos, 6400, East Bixby Hill Road, Bixby Hill, Los Altos, Long ... | 8.1 |
| Long Beach | Shoreline Village | Shoreline Village, Long Beach, Los Angeles County, California, United States | 1.1 |
| Long Beach | Museum of Latin American Art | Museum of Latin American Art, East 6th Street, Long Beach, Los Angeles County ... | 2.7 |
| Long Beach | Huntington Beach Pier | Huntington Beach Pier, Huntington Beach, Orange County, California, 92648 ... | 20.2 |
| San Francisco | Golden Gate Bridge | Golden Gate Bridge, San Francisco, California, 24129, United States | 6.6 |
| San Francisco | Alcatraz Island | Alcatraz Island, San Francisco, California, United States | 3.0 |
| San Francisco | Fisherman's Wharf | Fisherman's Wharf, North Beach, San Francisco, California, 94133, United States | 1.4 |
| San Francisco | Golden Gate Park | Golden Gate Park, San Francisco, California, United States | 8.2 |
| San Francisco | Muir Woods National Monument | Muir Woods National Monument, Marin County, California, United States | 18.7 |
| San Francisco | Ferry Building | Ferry Building, Harry Bridges Plaza, Financial District, San Francisco ... | 1.3 |
| San Francisco | Exploratorium | Exploratorium, The Embarcadero, Telegraph Hill, Financial District, San ... | 0.6 |
| San Francisco | Sausalito | Sausalito, Marin County, California, 94965, United States | 9.5 |
| Cape Liberty (Bayonne) | Statue of Liberty | Statue of Liberty, Flagpole Plaza, Manhattan, New York County, New York, 10004 ... | 6.3 |
| Cape Liberty (Bayonne) | Liberty State Park | Liberty State Park, Communipaw, Jersey City, Hudson County, New Jersey, United ... | 6.6 |
| Cape Liberty (Bayonne) | Ellis Island | Ellis Island, Manhattan, Communipaw, Jersey City, Hudson County, New Jersey ... | 6.9 |
| Cape Liberty (Bayonne) | Central Park | Central Park, New York County, New York, 11025, United States | 17.8 |
| Cape Liberty (Bayonne) | Liberty Science Center | Liberty Science Center, 222, Jersey City Boulevard, Communipaw, Jersey City ... | 6.7 |
| Brooklyn (Red Hook) | Brooklyn Bridge | Brooklyn Bridge, Seaport, Lower Manhattan, Manhattan, New York County, New ... | 2.9 |
| Brooklyn (Red Hook) | Brooklyn Bridge Park | Brooklyn Bridge Park, 334, Brooklyn, Kings County, New York, 11201, United ... | 2.1 |
| Brooklyn (Red Hook) | Prospect Park | Prospect Park, Brooklyn, Kings County, New York, United States | 4.3 |
| Brooklyn (Red Hook) | Brooklyn Botanic Garden | Brooklyn Botanic Garden, Brooklyn, Kings County, New York, United States | 4.5 |
| Brooklyn (Red Hook) | Brooklyn Museum | Brooklyn Museum, 200, Eastern Parkway, Brooklyn, Kings County, New York, 11238 ... | 4.4 |
| Brooklyn (Red Hook) | Coney Island | Coney Island, Brooklyn, Kings County, New York, 11224, United States | 11.9 |
| Astoria, Oregon | Astoria Column | Astoria Column, 1, Coxcomb Drive, Astoria, Clatsop County, Oregon, 97103 ... | 1.3 |
| Astoria, Oregon | Columbia River Maritime Museum | Columbia River Maritime Museum, 1792, Marine Drive, Astoria, Clatsop County ... | 0.7 |
| Astoria, Oregon | Fort Clatsop | Fort Clatsop - Netul Landing - Lewis and Clark National Historical Park ... | 8.4 |
| Astoria, Oregon | Fort Stevens State Park | Fort Stevens State Park, 1675, Hammond, Warrenton, Clatsop County, Oregon ... | 11.0 |
| Astoria, Oregon | Haystack Rock | Haystack Rock, Clatsop County, Oregon, United States | 35.4 |
| Astoria, Oregon | Flavel House Museum | Flavel House, 441, 8th Street, Downtown, Astoria, Clatsop County, Oregon ... | 0.2 |
| Astoria, Oregon | Astoria Riverwalk | Astoria Riverwalk, Uppertown, Astoria, Clatsop County, Oregon, 97103, United ... | 1.0 |
| Avalon, Catalina Island | Catalina Casino | Catalina Casino, 1, Casino Way, Pebbly Beach, Avalon, Los Angeles County ... | 0.8 |
| Avalon, Catalina Island | Wrigley Memorial and Botanic Garden | Wrigley Memorial, Avalon Canyon Road, Avalon, Los Angeles County, California ... | 2.5 |
| Avalon, Catalina Island | Descanso Beach Club | Descanso Beach, Pebbly Beach, Avalon, Los Angeles County, California, United ... | 1.0 |
| Avalon, Catalina Island | Green Pleasure Pier | Green Pleasure Pier, Pebbly Beach, Avalon, Los Angeles County, California ... | 0.3 |
| Avalon, Catalina Island | Catalina Island Museum | Catalina Island Museum, 217, Metropole Avenue, Pebbly Beach, Avalon, Los ... | 0.1 |
| Avalon, Catalina Island | Lovers Cove | Lovers Cove, Pebbly Beach, Avalon, Los Angeles County, California, 90704 ... | 0.7 |
| Seward | Alaska SeaLife Center | Alaska SeaLife Center, 301, Railway Avenue, Seward, Kenai Peninsula Borough ... | 2.3 |
| Seward | Exit Glacier | Exit Glacier, Kenai Peninsula Borough, Alaska, United States | 16.5 |
| Seward | Seward Small Boat Harbor | Seward Small Boat Harbor, X-Float Road, Seward, Kenai Peninsula Borough ... | 0.4 |
| Seward | Kenai Fjords National Park Visitor Center | Kenai Fjords National Park Visitor Center, 1212, Fourth Avenue, Historic ... | 0.7 |
| Whittier | Anton Anderson Memorial Tunnel | Anton Anderson Memorial Tunnel, Portage Glacier Highway, Anchorage, Unorganized ... | 2.8 |
| Whittier | Begich, Boggs Visitor Center | Begich/Boggs Visitor Center Portage Lake View, Begich Boggs Visitor Center ... | 6.8 |
| Whittier | Alaska Wildlife Conservation Center | Alaska Wildlife Conservation Center, Seward Highway, Anchorage, Alaska, United ... | 15.2 |
| Whittier | Byron Glacier Trail | Byron Glacier Trail, Anchorage, Alaska, United States | 7.1 |
| Whittier | Horsetail Falls | Horsetail Falls Trail, Whittier, Unorganized Borough, Alaska, 99693, United ... | 2.8 |
| Whittier | Prince William Sound Museum | Prince William Sound Museum, Whittier Street, Whittier, Unorganized Borough ... | 2.2 |
| Haines | Alaska Chilkat Bald Eagle Preserve | Alaska Chilkat Bald Eagle Preserve, Haines Borough, Alaska, United States | 27.0 |
| Haines | Fort William H. Seward | Fort Seward, Fort Seward Drive, Port Chilkoot, Haines, Haines Borough, Alaska ... | 1.0 |
| Haines | Sheldon Museum | Sheldon Muesum, 11, Main Street, Port Chilkoot, Haines, Haines Borough, Alaska ... | 0.2 |
| Haines | Hammer Museum | Hammer Museum, 108, Main Street, Port Chilkoot, Haines, Haines Borough, Alaska ... | 0.1 |
| Haines | Chilkoot Lake State Recreation Site | Chilkoot Lake, Haines Borough, Alaska, United States | 15.7 |
| Haines | Battery Point Trail | Battery Point Trail, Haines, Haines Borough, Alaska, United States | 4.5 |
| Kodiak | Fort Abercrombie State Historical Park | Fort Abercrombie State Historical Park, Kodiak Island Borough, Alaska, United ... | 5.6 |
| Kodiak | Kodiak History Museum | Kodiak History Museum, Center Street, Kodiak, Kodiak Island Borough, Alaska ... | 0.3 |
| Kodiak | Holy Resurrection Orthodox Cathedral | Holy Resurrection Russian Orthodox Church, 308, Kashevaroff Avenue, Kodiak ... | 0.3 |
| Kodiak | Pillar Mountain | Pillar Mountain, Kodiak, Kodiak Island Borough, Alaska, United States | 1.7 |
| Kodiak | Kodiak National Wildlife Refuge Visitor Center | Kodiak National Wildlife Refuge Visitor Center, Center Street, Kodiak, Kodiak ... | 0.3 |
| Prince Rupert, BC | North Pacific Cannery | North Pacific Cannery, Fire Lane/Access Road, Port Edward, North Coast Regional ... | 15.1 |
| Prince Rupert, BC | Museum of Northern British Columbia | Museum of Northern British Columbia, 100, 1st Avenue West, Prince Rupert, North ... | 0.2 |
| Prince Rupert, BC | Cow Bay | Cow Bay Marina, Cow Bay, Rotary Pathway, Prince Rupert, North Coast Regional ... | 0.3 |
| Prince Rupert, BC | Butze Rapids Trail | Butze Rapids Trail, Prince Rupert, North Coast Regional District, British ... | 4.1 |
| Prince Rupert, BC | Sunken Gardens | Sunken Gardens, Prince Rupert, North Coast Regional District, British Columbia ... | 0.2 |
| Nawiliwili, Kauai | Waimea Canyon State Park | Waimea Canyon State Park, Kauaʻi County, Hawaii, United States | 34.4 |
| Nawiliwili, Kauai | Wailua Falls | Wailua Falls, Kauaʻi County, Hawaii, United States | 9.2 |
| Nawiliwili, Kauai | Kalapaki Beach | Kalapaki Beach, Lihue, Kauaʻi County, Hawaii, United States | 0.7 |
| Nawiliwili, Kauai | Fern Grotto | Fern Grotto, Kuamo'o Road, Wailua Homesteads, Kapaa, Kauaʻi County, Hawaii ... | 9.3 |
| Nawiliwili, Kauai | Poipu Beach Park | Poʻipū Beach Park, Poipu, Kauaʻi County, Hawaii, United States | 13.5 |
| Nawiliwili, Kauai | Spouting Horn | Spouting Horn, Kauaʻi County, Hawaii, 96756, United States | 16.2 |
| Nawiliwili, Kauai | Kilauea Point Lighthouse | Kilauea Lighthouse, Kilauea Road, Kauaʻi County, Hawaii, 96754, United States | 31.2 |
| Nawiliwili, Kauai | Opaekaa Falls | 'Opaeka'a Falls, Kauaʻi County, Hawaii, 96746, United States | 10.4 |
| Barcelona | Sagrada Família | Sagrada Família, Carrer de la Marina, la Sagrada Família, l'Eixample ... | 2.4 |
| Barcelona | Park Güell | Park Güell, Carrer d'Olot, la Salut, Gràcia, Barcelona, Barcelonès, Barcelona ... | 4.0 |
| Barcelona | La Rambla | La Rambla, Santa Maria del Pi, el Raval, Ciutat Vella, Barcelona, Barcelonès ... | 0.4 |
| Barcelona | Mercat de la Boqueria | Mercat de Sant Josep - La Boqueria, 91, La Rambla, el Raval, Ciutat Vella ... | 0.5 |
| Barcelona | Casa Batlló | Batlló House, 43, Passeig de Gràcia (lateral Llobregat), la Dreta de ... | 1.4 |
| Barcelona | Montjuïc Castle | Montjuïc Castle, Passeig del Migdia, Montjuïc, el Poble-sec, Sants-Montjuïc ... | 2.3 |
| Barcelona | Barceloneta Beach | Platja de la Barceloneta, la Barceloneta, Ciutat Vella, Barcelona, Barcelonès ... | 1.4 |
| Barcelona | Museu Picasso | Picasso Museum, Carrer de la Barra de Ferro, Santa Caterina, Sant Pere, Santa ... | 0.4 |
| Barcelona | Montserrat Abbey | Monestir de Montserrat, Monistrol de Montserrat, Bages, Barcelona, Catalonia ... | 36.7 |
| Civitavecchia (Rome) | Colosseum | Colosseum, Celio, Municipio Roma I, Rome, Roma Capitale, Lazio, 00184, Italy | 62.4 |
| Civitavecchia (Rome) | Roman Forum | Roman Forum, Piazza di Santa Maria Nova, Campitelli, Municipio Roma I, Rome ... | 62.0 |
| Civitavecchia (Rome) | Vatican Museums | Vatican Museums, Viale della Zitella, Vatican City, 00120, Vatican City | 58.8 |
| Civitavecchia (Rome) | St. Peter's Basilica | Saint Peter's Basilica, Piazza San Pietro, Vatican City, 00120, Vatican City | 59.0 |
| Civitavecchia (Rome) | Trevi Fountain | Trevi Fountain, Piazza di Trevi, Trevi, Municipio Roma I, Rome, Roma Capitale ... | 61.4 |
| Civitavecchia (Rome) | Pantheon | Pantheon, Piazza della Rotonda, Colonna, Municipio Roma I, Rome, Roma Capitale ... | 60.9 |
| Civitavecchia (Rome) | Necropolis of Tarquinia | Necropoli dei Monterozzi, Via Ripagretta, Tarquinia, Viterbo, Lazio, 01016 ... | 17.2 |
| Civitavecchia (Rome) | Forte Michelangelo | Forte Michelangelo, La Marina, Borgo Odescalchi, Civitavecchia, Roma Capitale ... | 0.7 |
| Naples | Pompeii Archaeological Park | Archaeological Park of Pompeii - Ticket Office Piazza Esedra, Viale delle ... | 21.5 |
| Naples | Herculaneum | Herculaneum, Corso Resina, Ercolano, Naples, Campania, 80055, Italy | 8.2 |
| Naples | Mount Vesuvius | Mount Vesuvius, Trecase, Naples, Campania, 80040, Italy | 14.1 |
| Naples | National Archaeological Museum of Naples | Naples National Archaeological Museum, 19, Piazza Museo Nazionale, Rione ... | 1.9 |
| Naples | Castel Nuovo | Castel Nuovo, Via Ferdinando Acton, Pizzofalcone, San Ferdinando, Municipalità ... | 0.5 |
| Naples | Sorrento | Sorrento, Naples, Campania, 80067, Italy | 25.6 |
| Naples | Royal Palace of Naples | Royal Palace of Naples, Piazza del Plebiscito, Pizzofalcone, San Ferdinando ... | 0.9 |
| Livorno (Florence and Pisa) | Leaning Tower of Pisa | Leaning Tower of Pisa, Piazza del Duomo, Santa Maria, Porta a Lucca, Pisa ... | 20.4 |
| Livorno (Florence and Pisa) | Florence Cathedral | Santa Maria del Fiore, Piazza del Duomo, Quartiere 1, Florence, Tuscany, 50123 ... | 80.1 |
| Livorno (Florence and Pisa) | Uffizi Gallery | Galleria degli Uffizi, Via dei Girolami, Oltrarno, Quartiere 1, Florence ... | 79.9 |
| Livorno (Florence and Pisa) | Ponte Vecchio | Ponte Vecchio, Oltrarno, Quartiere 1, Florence, Tuscany, 50125, Italy | 79.7 |
| Livorno (Florence and Pisa) | Walls of Lucca | Mura di Lucca, Via della Mura Urbane, Sant'Anna, Monte San Quirico, Lucca ... | 36.2 |
| Livorno (Florence and Pisa) | Terrazza Mascagni | Terrazza Mascagni, Consiglio di Zona 3, Livorno, Tuscany, Italy | 1.9 |
| Livorno (Florence and Pisa) | Fortezza Vecchia | Fortezza Vecchia, Piazzale dei Marmi, Consiglio di Zona 2, Livorno, Tuscany ... | 0.5 |
| Livorno (Florence and Pisa) | Galleria dell'Accademia | Galleria dell'Accademia, 58/60, Via Ricasoli, Quartiere 1, Florence, Tuscany ... | 80.4 |
| La Spezia (Cinque Terre) | Vernazza | Vernazza, La Spezia, Liguria, Italy | 11.5 |
| La Spezia (Cinque Terre) | Manarola | Manarola, Riomaggiore, La Spezia, Liguria, 19017, Italy | 15.0 |
| La Spezia (Cinque Terre) | Riomaggiore | Riomaggiore, La Spezia, Liguria, 19017, Italy | 16.0 |
| La Spezia (Cinque Terre) | Portovenere | Portovenere, La Spezia, Liguria, 19025, Italy | 23.8 |
| La Spezia (Cinque Terre) | Castello San Giorgio | Castello San Giorgio, Via Ventisette Marzo, Vicci, Sarbia, La Spezia, Liguria ... | 18.0 |
| La Spezia (Cinque Terre) | Lerici | Lerici, La Spezia, Liguria, 19032, Italy | 25.3 |
| La Spezia (Cinque Terre) | Monterosso al Mare | Monterosso al Mare, La Spezia, Liguria, 19016, Italy | 10.6 |
| Genoa | Aquarium of Genoa | Aquarium of Genoa, Ponte degli Spìnola, Sottoripa, Prè, Centro Est, Genoa ... | 0.7 |
| Genoa | Palazzo Ducale | Palazzo Ducale, Sottopassaggio De Ferrari, Sant'Andrea, Portoria, Centro Est ... | 1.3 |
| Genoa | Via Garibaldi | Via Giuseppe Garibaldi, Sottoripa, Maddalena, Centro Est, Genoa, Liguria ... | 1.1 |
| Genoa | Boccadasse | Boccadasse, Medio Levante, Genoa, Liguria, 16146, Italy | 5.2 |
| Genoa | Portofino | Portofino, Genoa, Liguria, Italy | 26.2 |
| Genoa | Genoa Cathedral | Cattedrale di San Lorenzo, Piazza di San Lorenzo, Sottoripa, Molo, Centro Est ... | 1.2 |
| Genoa | Spianata Castelletto | Spianata di Castelletto, Ghetto, Maddalena, Centro Est, Genoa, Liguria, 16124 ... | 1.1 |
| Genoa | Camogli | Camogli, Genoa, Liguria, Italy | 19.8 |
| Trieste | Piazza Unità d'Italia | Piazza Unità d'Italia, Cavana, San Vito, Città Nuova-Barriera Nuova-San ... | 0.3 |
| Trieste | Miramare Castle | Miramare Castle, Viale Miramare, Roiano-Gretta-Barcola-Cologna-Scorcola ... | 7.1 |
| Trieste | Grotta Gigante | Grotta Gigante / Briškovska jama, SP29a, Borgo Grotta Gigante / Briščiki ... | 6.5 |
| Trieste | Cathedral of San Giusto | Cattedrale di San Giusto, 2, Piazza della Cattedrale, Rena Vecchia, San Giusto ... | 0.8 |
| Trieste | Castello di San Giusto | Castello di San Giusto, Scala Giovanni Gioacchino Winckelmann, Montuzza ... | 0.9 |
| Trieste | Piran | Piran / Pirano, Upravna enota Piran / Unità amministrativa Pirano, 6630 ... | 20.3 |
| Ravenna | Basilica of San Vitale | Basilica di San Vitale, Piazzetta Luigi Legnani, Corso Nord, Ravenna ... | 12.6 |
| Ravenna | Mausoleum of Galla Placidia | Mausoleum of Galla Placidia, Via Galla Placidia, Corso Nord, Ravenna ... | 12.7 |
| Ravenna | Tomb of Dante | Tomba di Dante, Via Guido Da Polenta, San Rocco, Ravenna, Emilia-Romagna ... | 12.7 |
| Ravenna | Basilica of Sant'Apollinare in Classe | Basilica di Sant'Apollinare in Classe, 224, Via Romea Sud, Classe, Ravenna ... | 13.9 |
| Ravenna | Basilica of Sant'Apollinare Nuovo | Basilica di Sant'Apollinare Nuovo, Via San Giovanni Bosco, San Rocco, Ravenna ... | 13.0 |
| Ravenna | Mirabilandia | Mirabilandia, Via Romea Sud, Ravenna, Emilia-Romagna, 48125, Italy | 16.5 |
| Messina (Taormina) | Ancient Theatre of Taormina | Greek theatre, 1, Via Teatro Greco, Mazzarò, Taormina, Messina, Sicily, 98039 ... | 44.5 |
| Messina (Taormina) | Rifugio Sapienza | Rifugio Sapienza, Nicolosi, Catania, Sicily, 95052, Italy | 73.6 |
| Messina (Taormina) | Messina Cathedral | Cathedral of Messina, Piazza Duomo, Fondo Basicò, Torre Vittoria, IV ... | 0.3 |
| Messina (Taormina) | Isola Bella | Isola Bella, Mazzarò, Taormina, Messina, Sicily, 98039, Italy | 44.3 |
| Messina (Taormina) | Castelmola | Castelmola, Messina, Sicily, 98030, Italy | 44.6 |
| Messina (Taormina) | Gole dell'Alcantara | Gole dell'Alcantara, Sentiero alle Gole dell'Alcantara, Ficarazzi, Castiglione ... | 48.4 |
| Palermo | Palermo Cathedral | Palermo Cathedral, Via dell'Incoronazione, Il Capo, I Circoscrizione, Palermo ... | 1.7 |
| Palermo | Cappella Palatina | Palatine Chapel, Cortile Maqueda, Albergheria, I Circoscrizione, Palermo ... | 2.1 |
| Palermo | Monreale Cathedral | Monreale Cathedral, Via degli Angeli, Intravaia, Aquino, Monreale, Palermo ... | 8.2 |
| Palermo | Quattro Canti | Quattro Canti, La Loggia, I Circoscrizione, Palermo, Sicily, 90140, Italy | 1.3 |
| Palermo | Ballarò | Piazza Ballarò, Albergheria, I Circoscrizione, Palermo, Sicily, 90140, Italy | 1.8 |
| Palermo | Mondello | Mondello, VII Circoscrizione, Palermo, Sicily, Italy | 9.0 |
| Palermo | Teatro Massimo | Teatro Massimo Vittorio Emanuele, Piazza Giuseppe Verdi, Il Capo, I ... | 1.1 |
| Palermo | Cefalù | Cefalù, Palermo, Sicily, 90015, Italy | 58.5 |
| Valletta, Malta | St. John's Co-Cathedral | Saint John's Co-Cathedral, Saint John Street, Camarata, Valletta, Port Region ... | 0.7 |
| Valletta, Malta | Upper Barrakka Gardens | Upper Barrakka Gardens, Lascaris War Rooms Access, L-Arċipierku, Valletta, Port ... | 0.4 |
| Valletta, Malta | Mdina | Mdina, Western Region, Malta | 9.7 |
| Valletta, Malta | Ħal Saflieni Hypogeum | Ħal Saflieni Hypogeum, Triq iċ-Ċimiterju, Paola, Port Region, PLA 1116, Malta | 2.5 |
| Valletta, Malta | Blue Grotto | Blue Grotto, Triq Congrève, Wied iż-Żurrieq, Qrendi, Western Region, QRD 3043 ... | 9.2 |
| Valletta, Malta | Marsaxlokk | Marsaxlokk, Southern Region, Malta | 6.4 |
| Valletta, Malta | Fort St. Elmo | Fort Saint Elmo, Mediterranean Street, Diju Balli, Valletta, Port Region, VLT ... | 1.4 |
| Valletta, Malta | Ħaġar Qim | Ħaġar Qim, Triq il-Panorama, Wied iż-Żurrieq, Qrendi, Western Region, QRD 3043 ... | 9.4 |
| Piraeus (Athens) | Acropolis of Athens | Acropolis, Περίπατος Ακρόπολης (Βόρεια κλιτύς), Anafiotika, Πετράλωνα, 3rd ... | 8.8 |
| Piraeus (Athens) | Acropolis Museum | Acropolis Museum, 15, Διονυσίου Αρεοπαγίτου, Anafiotika, Πετράλωνα, 1st ... | 8.8 |
| Piraeus (Athens) | Plaka | Plaka, 1st District of Athens, Athens, Municipality of Athens, Regional Unit of ... | 9.1 |
| Piraeus (Athens) | Ancient Agora of Athens | Ancient Agora of Athens, 1st District of Athens, Athens, Municipality of ... | 8.6 |
| Piraeus (Athens) | Temple of Poseidon | Temple of Poseidon, Αθήνών - Σουνίου, Kato Sounio, Lavreotiki Municipal Unit ... | 46.7 |
| Piraeus (Athens) | National Archaeological Museum | National Archaeological Museum, 44, Πατησίων, Μουσείο, 1st District of Athens ... | 10.2 |
| Piraeus (Athens) | Panathenaic Stadium | Panathenaic Stadium, Αρχιμήδους, Profitis Ilias, 2nd District of Athens ... | 9.8 |
| Piraeus (Athens) | Mount Lycabettus | Lycabettus, Δώρας Δ' Ίστρια, Kolonaki, Συνοικία Κολωνακίου, 1st District of ... | 10.6 |
| Santorini (Fira) | Oia | Oia, Ia Municipal Unit, Municipality of Thira, Thira Regional Unit, South ... | 7.3 |
| Santorini (Fira) | Akrotiri | Akrotiri, Thira Municipal Unit, Municipality of Thira, Thira Regional Unit ... | 7.1 |
| Santorini (Fira) | Red Beach | Red Beach, Akrotiri, Thira Municipal Unit, Municipality of Thira, Thira ... | 8.1 |
| Santorini (Fira) | Santo Wines | Santo Wines, Φηρών - Περίσσας, Ormos Athinios, Megalochori, Thira Municipal ... | 3.1 |
| Santorini (Fira) | Pyrgos Kallistis | Pyrgos Kallistis, Thira Municipal Unit, Municipality of Thira, Thira Regional ... | 3.9 |
| Santorini (Fira) | Kamari Beach | Kamari Beach, Περιβόλια, Kamari, Thira Municipal Unit, Municipality of Thira ... | 6.4 |
| Santorini (Fira) | Ancient Thera | Ancient Thera, Αρχαίας Θήρας, Kamari, Thira Municipal Unit, Municipality of ... | 7.0 |
| Mykonos | Little Venice | Little Venice, Alefkantra, Mykonos Community, Mykonos, Municipality of Mykonos ... | 2.2 |
| Mykonos | Kato Mili | Windmills, Melpos Aksioti, Fabrika, Mykonos Community, Mykonos, Municipality of ... | 2.3 |
| Mykonos | Paradise Beach | Paradise Beach, Mykonos Community, Plintri, Municipality of Mykonos, Mykonos ... | 6.8 |
| Mykonos | Panagia Paraportiani | Panagia Paraportiani, Paraportianis, Μικρή Βενετία, Mykonos Community, Mykonos ... | 2.1 |
| Mykonos | Ornos Beach | Ornos, Mykonos Community, Ornos, Municipality of Mykonos, Mykonos Regional ... | 4.8 |
| Mykonos | Armenistis Lighthouse | Armenistis Lighthouse, Μυκόνου - Αγίου Στεφάνου, Mykonos Community, Faros ... | 2.8 |
| Mykonos | Delos | Delos, Via dei Leoni, Municipality of Mykonos, Mykonos Regional Unit, South ... | 8.8 |
| Corfu | Achilleion | Achilleion Palace, Kerkyra - Achileio, Pondi, Perama, Gastouri, Municipality of ... | 7.4 |
| Corfu | Old Fortress of Corfu | Old Fortress, Land Peak, Porta Remounda, Old Town of Corfu, Corfu, Municipality ... | 2.5 |
| Corfu | Paleokastritsa | Palaiokastritsa, Municipality of Central Corfu and Diapontia Islands, Corfu ... | 17.0 |
| Corfu | Liston | Liston Buildings, Λιστόν, Annunziata, Kampielo, Old Town of Corfu, Corfu ... | 2.0 |
| Corfu | Pontikonisi | Ποντικονήσι, Perama, Corfu, Corfu Regional Unit, Ioanian Islands, Peloponnese ... | 5.0 |
| Corfu | Mon Repos | Mon Repos Park, Kanoni, Corfu, Municipality of Central Corfu and Diapontia ... | 3.1 |
| Corfu | New Fortress of Corfu | New Fortress, Xenofontos Stratigou, Tenedos, Ag. Pateres, Mantouki, Corfu ... | 1.4 |
| Katakolon (Olympia) | Archaeological Site of Olympia | Archaeological Site of Olympia, Fanaras, Ancient Olympia, Municipal Unit of ... | 27.3 |
| Katakolon (Olympia) | Museum of Ancient Greek Technology | Museum of Ancient Greek Technology, Pyrgou - Katakolou, Agios Andreas, Katakolo ... | 0.8 |
| Katakolon (Olympia) | Mercouri Estate | Mercouri Estate Winery, ΕΠ27, Agios Andreas, Katakolo Community, Municipality ... | 3.8 |
| Katakolon (Olympia) | Agios Andreas Beach | Agios Andreas, Katakolo Community, Municipality of Pyrgos, Elis Regional Unit ... | 2.6 |
| Rhodes | Palace of the Grand Master of the Knights of Rhodes | Palace of the Grand Master of the Knights of Rhodes, Ιπποτών, Medieval city of ... | 0.8 |
| Rhodes | Street of the Knights | Ιπποτών, Medieval city of Rhodes, Municipal Commune of Rhodes, Municipal Unit ... | 0.7 |
| Rhodes | Acropolis of Lindos | Lindos Acropolis, Ακροπόλεως, Lindos, Municipality of Rhodes, Rhodes Regional ... | 41.4 |
| Rhodes | Valley of the Butterflies | Petaloudes (Valley of the Butterflies), Καλαμώνα - Ψίνθου, Epano Kalamonas ... | 19.5 |
| Rhodes | Anthony Quinn Bay | Anthony Quinn Bay, Rhodes, Kalythies, Rhodes Regional Unit, South Aegean ... | 13.8 |
| Rhodes | Kallithea Springs | Kallithea Springs, Καλλιθέας, Kalithea, Rhodes, Koskinou, Municipality of ... | 7.4 |
| Heraklion, Crete | Knossos | Knossos, Heraklion Municipal Unit, Municipality of Heraklion, Heraklion ... | 5.4 |
| Heraklion, Crete | Heraklion Archaeological Museum | Heraklion Archaeological Museum, 2, Ξανθουδίδου Στεφ., Heraklion, Heraklion ... | 1.4 |
| Heraklion, Crete | Koules Fortress | Koules, Νεάρχου, 1st Community of Heraklion - Central, Heraklion Municipal ... | 1.2 |
| Heraklion, Crete | Morosini Fountain | Morosini Fountain, Lions Square, 1st Community of Heraklion - Central ... | 1.7 |
| Heraklion, Crete | Cretaquarium | Cretaquarium, Ελευθερίου Βενιζέλου, Community of Anopolis, Gouves Municipal ... | 12.1 |
| Heraklion, Crete | Spinalonga | Spinalonga, Community of Elounta, Agios Nikolaos Municipal Unit, Municipality ... | 53.6 |
| Chania (Souda Bay), Crete | Chania Lighthouse | Venetian Lighthouse, Ακτή Κουντουριώτη, Εβραϊκή, Άη Γιάννης, Chania ... | 5.7 |
| Chania (Souda Bay), Crete | Balos Lagoon | Balos, Chania Regional Unit, Region of Crete, Greece | 44.6 |
| Chania (Souda Bay), Crete | Samaria Gorge | Samaria Gorge, Municipality of Sfakia, Chania Regional Unit, Region of Crete ... | 24.5 |
| Chania (Souda Bay), Crete | Agia Triada Monastery | Agia Triada Monastery, ΕΠ38, Stavros, Municipality of Chania, Chania Regional ... | 9.7 |
| Chania (Souda Bay), Crete | Chania Municipal Market | Municipal Market of Chania, Πλατεία Μαρκόπουλου, Splantzia, Άη Γιάννης, Chania ... | 5.1 |
| Kuşadası (Ephesus) | Ephesus | Ephesus, Arkadiane, Atatürk Mahallesi, Selçuk, Izmir, Aegean Region, 35920 ... | 11.3 |
| Kuşadası (Ephesus) | House of the Virgin Mary | House of the Virgin Mary, Meryem Ana yolu, Atatürk Mahallesi, Selçuk, Izmir ... | 8.7 |
| Kuşadası (Ephesus) | Basilica of St. John | Basilica of St. John, St. Jean Caddesi, Atatürk Mahallesi, Selçuk, Izmir ... | 14.0 |
| Kuşadası (Ephesus) | Şirince | Şirince Mahallesi, Selçuk, Izmir, Aegean Region, Turkey | 17.9 |
| Kuşadası (Ephesus) | Ephesus Archaeological Museum | Ephesus Archaeological Museum, Ugur Mumcu Sevgi Yolu, Atatürk Mahallesi ... | 13.7 |
| Kuşadası (Ephesus) | Güvercinada | Güvercinada, Hacıfeyzullah Mahallesi, Kuşadası, Aydın, Aegean Region, Turkey | 0.7 |
| Kuşadası (Ephesus) | Temple of Artemis | Temple of Artemis (Artemision), Artemis Tapinagi, Atatürk Mahallesi, Selçuk ... | 13.5 |
| Istanbul | Hagia Sophia | Hagia Sophia, 1, Ayasofya Meydanı, Cankurtaran Mahallesi, Istanbul, Fatih ... | 0.4 |
| Istanbul | Sultan Ahmed Mosque | Blue Mosque, 7, Atmeydanı Caddesi, Sultan Ahmet Mahallesi, Istanbul, Fatih ... | 0.1 |
| Istanbul | Topkapı Palace | Topkapı Palace, Courtyard of the Eunuchs, Cankurtaran Mahallesi, Istanbul ... | 1.0 |
| Istanbul | Grand Bazaar | Grand Bazaar, Beyazıt Mahallesi, Istanbul, Fatih, Istanbul, Marmara Region ... | 0.8 |
| Istanbul | Basilica Cistern | Basilica Cistern (Exit), 1, Yerebatan Caddesi, Alemdar Mahallesi, Istanbul ... | 0.3 |
| Istanbul | Galata Tower | Galata Tower, Büyük Hendek Caddesi, Kuledibi, Bereketzade Mahallesi, Beyoğlu ... | 2.1 |
| Istanbul | Spice Bazaar | Egyptian (Spice) Bazaar, Saka Mehmet Sokağı, Eminönü, Rüstempaşa Mahallesi ... | 1.2 |
| Istanbul | Dolmabahçe Palace | Dolmabahçe Palace, Vişnezade Mahallesi, Beşiktaş, Istanbul, Marmara Region ... | 4.1 |
| Dubrovnik | Walls of Dubrovnik | City Walls, Stradun, Grad, Gradski kotar Grad, Dubrovnik, Dubrovnik-Neretva ... | 1.4 |
| Dubrovnik | Stradun | Stradun, Grad, Gradski kotar Grad, Dubrovnik, Dubrovnik-Neretva County, 20108 ... | 1.5 |
| Dubrovnik | Dubrovnik Cable Car | Dubrovnik Cable Car, Maestra Đela Jusića, Gradski kotar Ploče iza Grada ... | 1.6 |
| Dubrovnik | Lokrum | Lokrum, Gradski kotar Ploče iza Grada, Dubrovnik, Dubrovnik-Neretva County ... | 3.2 |
| Dubrovnik | Fort Lovrijenac | Fort Lovrijenac, Skalini Doktor Marka Foteza, Ilijina glavica, Gradski kotar ... | 1.2 |
| Dubrovnik | Banje Beach | Banje, Gradski kotar Ploče iza Grada, Dubrovnik, Dubrovnik-Neretva County ... | 2.0 |
| Dubrovnik | Cavtat | Cavtat, Općina Konavle, Dubrovnik-Neretva County, Croatia | 12.6 |
| Split | Diocletian's Palace | Diocletian's Palace, Poljana kraljice Jelene, Gradski kotar Grad, Split, Grad ... | 0.3 |
| Split | Marjan | Marjan, Ulica Ćirila i Metoda, Dobri, Gradski kotar Grad, Split, Grad Split ... | 0.1 |
| Split | Trogir | Trogir, Grad Trogir, Split-Dalmatia County, 21219, Croatia | 14.9 |
| Split | Klis Fortress | Klis Fortress, Skalice, Klis-Megdan, Radići, Klis, Općina Klis, Split-Dalmatia ... | 8.7 |
| Split | Krka National Park | Krka National Park, Šibenik-Knin County, 22221, Croatia | 58.5 |
| Split | Riva | Riva, Gradski kotar Grad, Split, Grad Split, Split-Dalmatia County, 21102 ... | 0.4 |
| Split | Bačvice | Gradski kotar Bačvice, Split, Grad Split, Split-Dalmatia County, 21102, Croatia | 1.0 |
| Kotor | Our Lady of the Rocks | Our Lady of the Rocks, M-1, Perast, Kotor Municipality, 85336, Montenegro | 9.3 |
| Kotor | Perast | Perast, Kotor Municipality, 85336, Montenegro | 8.7 |
| Kotor | Budva Old Town | Old town, Starogradski trg, Stari grad, Stari Grad, Budva, Budva Municipality ... | 17.5 |
| Kotor | Lovćen National Park | Lovćen National Park, Dolovi, Old Royal Capital Cetinje, Montenegro | 9.5 |
| Kotor | Cathedral of Saint Tryphon | St. Tryphon Cathedral, Pjaca Svetog Tripuna, Kotor, Kotor Municipality, 85330 ... | 0.4 |
| Marseille | Notre-Dame de la Garde | Notre-Dame de la Garde, Montée de l'Oratoire, Vauban, 6th Arrondissement ... | 7.3 |
| Marseille | Vieux-Port | Vieux-Port, Quai du Port, Hôtel de Ville, 2nd Arrondissement, Marseille ... | 6.1 |
| Marseille | Calanques National Park | Parc national des Calanques (cœur), Bouches-du-Rhône, Provence-Alpes-Côte ... | 22.6 |
| Marseille | MuCEM | MUCEM, Promenade Robert Laffont, La Joliette, 2nd Arrondissement, Marseille ... | 5.5 |
| Marseille | Le Panier | Le Panier, Les Grands Carmes, 2nd Arrondissement, Marseille, Bouches-du-Rhône ... | 5.6 |
| Marseille | Château d'If | Château d'If, Chemin de Saint-Estève, Frioul Islands, 7th Arrondissement ... | 7.0 |
| Marseille | Palais Longchamp | Palais Longchamp, Boulevard Longchamp, Saint-Charles, 1st Arrondissement ... | 6.5 |
| Villefranche-sur-Mer (Nice) | Promenade des Anglais | Promenade des Anglais, Quartier Jean-Médecin, Nice, Maritime Alps ... | 4.0 |
| Villefranche-sur-Mer (Nice) | Vieux Nice | Vieux Nice, Carabacel, Nice, Maritime Alps, Provence-Alpes-Côte d'Azur ... | 2.8 |
| Villefranche-sur-Mer (Nice) | Èze | Èze, Nice, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan France ... | 5.0 |
| Villefranche-sur-Mer (Nice) | Villa Ephrussi de Rothschild | Villa Ephrussi de Rothschild, 1, Avenue Ephrussi de Rothschild ... | 1.7 |
| Villefranche-sur-Mer (Nice) | Citadelle de Villefranche-sur-Mer | Citadelle Saint-Elme, Fossés de la Citadelle, La Citadelle ... | 0.3 |
| Villefranche-sur-Mer (Nice) | Cours Saleya | Cours Saleya, Vieux Nice, Carabacel, Nice, Maritime Alps, Provence-Alpes-Côte ... | 3.0 |
| Villefranche-sur-Mer (Nice) | Colline du Château | Colline du Château, Carabacel, Nice, Maritime Alps, Provence-Alpes-Côte d'Azur ... | 2.5 |
| Villefranche-sur-Mer (Nice) | Saint-Paul-de-Vence | Saint-Paul-de-Vence, Grasse, Maritime Alps, Provence-Alpes-Côte d'Azur ... | 15.2 |
| Monte Carlo, Monaco | Prince's Palace of Monaco | Prince's Palace of Monaco, Tunnel Rocher-Fontvieille, Monaco-Ville, Monaco ... | 1.0 |
| Monte Carlo, Monaco | Oceanographic Museum | Oceanographic Museum of Monaco, Avenue Saint-Martin, Monaco-Ville, Monaco ... | 0.7 |
| Monte Carlo, Monaco | Casino de Monte-Carlo | Monte-Carlo Casino and Opera House, Casino Square, Monte-Carlo, Monaco, 98000 ... | 0.5 |
| Monte Carlo, Monaco | Jardin Exotique de Monaco | Jardin Exotique, Monaco | 1.3 |
| Monte Carlo, Monaco | Saint Nicholas Cathedral | Saint Nicholas Cathedral, Rue de l'Abbaye, Monaco-Ville, Monaco, 98000, Monaco | 0.9 |
| Monte Carlo, Monaco | Larvotto Beach | Larvotto Beach, Larvotto, Monaco | 1.2 |
| Monte Carlo, Monaco | Japanese Garden | Japanese Garden, La Vallée de la Pinède, L'Anse du Portier, Larvotto, Monaco ... | 0.8 |
| Cannes | Palais des Festivals et des Congrès | Palais des Festivals et des Congrès, 1, Boulevard de la Croisette, La Lepre ... | 0.5 |
| Cannes | Île Sainte-Marguerite | Île Sainte-Marguerite, Cannes, Grasse, Maritime Alps, Provence-Alpes-Côte ... | 4.2 |
| Cannes | Marché Forville | Marché Forville, Rue Meynadier, Hautes Vallergues, Cannes, Grasse, Maritime ... | 0.6 |
| Cannes | Grasse | Grasse, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan France, France | 14.4 |
| Cannes | Antibes | Antibes, Grasse, Maritime Alps, Provence-Alpes-Côte d'Azur, Metropolitan ... | 9.6 |
| Cannes | Musée Picasso | Musée Picasso, Place Mariejol, Vieille Ville, Juan-les-Pins, Antibes, Grasse ... | 9.9 |
| Palma de Mallorca | Palma Cathedral | Palma Cathedral, Plaça La Seu, La Seu, Canamunt, Districte Centre, Palma ... | 0.3 |
| Palma de Mallorca | Bellver Castle | Bellver Castle, Carrer de Camilo José Cela, Son Armadans, Districte de Ponent ... | 2.8 |
| Palma de Mallorca | Royal Palace of La Almudaina | Almudaina Palace, Carrer del Palau Reial, La Seu, Canamunt, Districte Centre ... | 0.3 |
| Palma de Mallorca | Valldemossa | Valldemossa, Serra de Tramuntana, Balearic Islands, 07170, Spain | 15.9 |
| Palma de Mallorca | Sóller | Sóller, Serra de Tramuntana, Balearic Islands, Spain | 22.6 |
| Palma de Mallorca | Mercat de l'Olivar | Central Market Olivar, 4, Plaça de l'Olivar, El Mercat, Canamunt, Districte ... | 0.6 |
| Valencia | City of Arts and Sciences | Ciutat de les Arts i les Ciències, 7, Avinguda del Professor López Piñero ... | 2.6 |
| Valencia | Oceanogràfic | Oceanogràfic of Valencia, 1, Carrer d'Eduardo Primo Yúfera, la Punta, Quatre ... | 3.1 |
| Valencia | Valencia Cathedral | Valencia Cathedral, Plaça de l'Almoina, Ciutat Vella, Valencia, Comarca de ... | 0.7 |
| Valencia | La Lonja de la Seda | Silk Exchange, 2, Carrer de la Llotja, Ciutat Vella, Valencia, Comarca de ... | 0.6 |
| Valencia | Jardín del Turia | Jardí del Túria - Tram IV, Extramurs, Valencia, Comarca de València, Valencia ... | 1.4 |
| Valencia | Albufera | Centro Comercial Parque Albufera, Alfafar, l'Horta Sud, Valencia, Valencian ... | 5.9 |
| Valencia | Malvarrosa Beach | La Malvarrosa Beach, Poblats Marítims, Valencia, Comarca de València, Valencia ... | 4.6 |
| Málaga | Alcazaba | Alcazaba de Málaga, Calle de Francisco Bejarano Robles, Ensanche Centro ... | 0.4 |
| Málaga | Gibralfaro Castle | Castillo de Gibralfaro, Camino de Gibralfaro, Centro, Málaga, Málaga-Costa del ... | 0.8 |
| Málaga | Museo Picasso Málaga | Museo Picasso Málaga, 8, Calle San Agustín, Centro Histórico, Málaga ... | 0.4 |
| Málaga | Málaga Cathedral | Catedral de Málaga, 9, Calle Molina Lario, Centro Histórico, Málaga ... | 0.3 |
| Málaga | Mercado Central de Atarazanas | Mercado de Atarazanas, Calle Guillén de Castro, Centro Histórico, Centro ... | 0.6 |
| Málaga | Caminito del Rey | Caminito del Rey, Ardales, Guadalteba, Malaga, Andalusia, 29552, Spain | 40.2 |
| Málaga | Ronda | Ronda, Serranía de Ronda, Malaga, Andalusia, Spain | 66.8 |
| Málaga | Cueva de Nerja | Cueva de Nerja, Sendero de la Cueva, Urbanización Puente Águila, Maro, Nerja ... | 51.2 |
| Málaga | La Malagueta | La Malagueta, Centro, Málaga, Málaga-Costa del Sol, Malaga, Andalusia, Spain | 0.6 |
| Cádiz (Seville) | Cádiz Cathedral | Catedral de la Santa Cruz de Cádiz, Calle Arquitecto Acero, San Juan, Cádiz ... | 0.5 |
| Cádiz (Seville) | Torre Tavira | Torre Tavira, 10, Calle Marqués del Real Tesoro, Centro, Cádiz, Bay of Cádiz ... | 0.6 |
| Cádiz (Seville) | Seville Cathedral | Cathedral of Seville, Calle Almirantazgo, El Arenal, Casco Antiguo, Seville ... | 98.6 |
| Cádiz (Seville) | Alcázar of Seville | Alcázar of Seville, Patio de Banderas, Santa Cruz, Casco Antiguo, Seville ... | 98.4 |
| Cádiz (Seville) | Bodegas Tío Pepe | Bodegas Tío Pepe, Calle Calzada del Arroyo, San Lucas, Jerez, Campiña de Jerez ... | 21.2 |
| Cádiz (Seville) | Playa de la Caleta | Playa de La Caleta, La Viña, Distrito 4, Cádiz, Bay of Cádiz, Cádiz, Andalusia ... | 1.4 |
| Cádiz (Seville) | Mercado Central de Abastos | Mercado Central de Abastos, Calle Parada y Berreto, San Miguel, Jerez, Campiña ... | 21.7 |
| Cádiz (Seville) | Plaza de España | Plaza de España, Calle San Germán, San Carlos, Cádiz, Bay of Cádiz, Cádiz ... | 0.4 |
| Lisbon | Belém Tower | Tower of Belém, Avenida de Brasília, Pedrouços, São Francisco Xavier, Belém ... | 8.0 |
| Lisbon | Jerónimos Monastery | Jerónimos Monastery, Praça do Império, São Francisco Xavier, Belém, Lisbon ... | 7.0 |
| Lisbon | Alfama | Alfama, Santa Maria Maior, Madalena, Lisbon, 1100-095, Portugal | 0.2 |
| Lisbon | São Jorge Castle | São Jorge Castle, Rua de Santa Cruz do Castelo, Castelo, Santa Maria Maior ... | 0.7 |
| Lisbon | Pena Palace | Pena National Palace, Estrada da Pena, Quinta do Castanheiro, Sintra - São ... | 24.5 |
| Lisbon | Praça do Comércio | Praça do Comércio, São Nicolau, Santa Maria Maior, Madalena, Lisbon, 1100-148 ... | 0.9 |
| Lisbon | Oceanário de Lisboa | Oceanário de Lisboa, Esplanada Dom Carlos I, Parque das Nações, Lisbon ... | 6.6 |
| Lisbon | Cascais | Cascais, Lisbon, Portugal | 25.6 |
| Lisbon | Cabo da Roca | Cape Roca, Colares, Sintra, Lisbon, Portugal | 33.3 |
| Gibraltar | Upper Rock Nature Reserve | Upper Rock - Gibraltar Nature Reserve, Gibraltar | 2.4 |
| Gibraltar | St. Michael's Cave | St. Michael's Cave, St Michael's Road, Gibraltar, GX11 1AA, Gibraltar | 3.0 |
| Gibraltar | Great Siege Tunnels | Great Siege Tunnels, Garrod Road, Catalan Bay, Gibraltar, GX11 1AA, Gibraltar | 1.9 |
| Gibraltar | Gibraltar Cable Car | Cable Car Lower Station, Red Sands Road, Catalan Bay, Gibraltar, GX11 1AA ... | 2.1 |
| Gibraltar | Europa Point Lighthouse | Europa Point Trinity Lighthouse, Kusuma Promenade, Gibraltar, GX11 1AA ... | 4.6 |
| Gibraltar | Main Street | Main Street, Villa Vieja, Gibraltar, GX11 1AA, Gibraltar | 1.3 |
| Gibraltar | Gibraltar Botanic Gardens | Alameda Botanic Gardens, Catalan Bay, Gibraltar | 2.2 |
| Funchal, Madeira | Monte Palace Tropical Garden | Monte Palace Tropical Garden, 174, Monte, Funchal, Madeira, 9050-288, Portugal | 2.8 |
| Funchal, Madeira | Teleférico do Funchal | Funchal Cable Car, Via Rápida 1, Tabaiba, Pena, Santa Luzia, Funchal, Madeira ... | 1.5 |
| Funchal, Madeira | Mercado dos Lavradores | Mercado dos Lavradores, Rua Brigadeiro Oudinot, Mercado, Rochinha, Santa Maria ... | 0.5 |
| Funchal, Madeira | Cabo Girão | Cabo Girão, Miradouro do Cabo Girão, Fontainhas do Mar, Câmara de Lobos ... | 9.0 |
| Funchal, Madeira | Madeira Botanical Garden | Botanical Garden, Caminho das Voltas, Jardim Botânico, Bom Sucesso, Santa Maria ... | 2.0 |
| Funchal, Madeira | Blandy's Wine Lodge | Blandy's Wine Lodge, 28, Avenida Arriaga, São Francisco, Ilhéus, Sé, Funchal ... | 0.3 |
| Funchal, Madeira | Pico do Arieiro | Pico do Arieiro, Vereda do Areeiro, São Roque do Faial, Santana, Madeira ... | 9.8 |
| Funchal, Madeira | Câmara de Lobos | Câmara de Lobos, Madeira, Portugal | 6.2 |
| Santa Cruz de Tenerife | Teide National Park | Teide National Park, Santa Cruz de Tenerife, Canary Islands, 38413, Spain | 44.5 |
| Santa Cruz de Tenerife | Loro Parque | Loro Parque, Avenida Loro Parque, Punta Brava, Las Dehesas, Puerto de la Cruz ... | 31.9 |
| Santa Cruz de Tenerife | San Cristóbal de La Laguna | San Cristóbal de La Laguna, Santa Cruz de Tenerife, Canary Islands, Spain | 7.0 |
| Santa Cruz de Tenerife | Anaga Rural Park | Parque Rural de Anaga, Santa Cruz de Tenerife, Canary Islands, Spain | 6.9 |
| Santa Cruz de Tenerife | Playa de las Teresitas | Playa de las Teresitas, Anaga, Santa Cruz de Tenerife, Canary Islands, Spain | 6.9 |
| Santa Cruz de Tenerife | Auditorio de Tenerife | Auditorio de Tenerife Adán Martín, Plaza Alisios, Los Llanos, Salud-La Salle ... | 1.9 |
| Santa Cruz de Tenerife | Puerto de la Cruz | Puerto de la Cruz, Santa Cruz de Tenerife, Canary Islands, 38400, Spain | 30.7 |
| Las Palmas de Gran Canaria | Playa de Las Canteras | Playa de Las Canteras, Puerto, Santa Catalina-Canteras, Las Palmas, Canary ... | 1.2 |
| Las Palmas de Gran Canaria | Vegueta | Vegueta, Las Palmas, Canary Islands, 35001, Spain | 3.8 |
| Las Palmas de Gran Canaria | Casa de Colón | Casa de Colón, 1, Calle Colón, Vegueta, Las Palmas, Canary Islands, 35002, Spain | 3.7 |
| Las Palmas de Gran Canaria | Roque Nublo | Monumento Natural del Roque Nublo, Tejeda, Las Palmas, Canary Islands, Spain | 25.0 |
| Las Palmas de Gran Canaria | Dunas de Maspalomas | Maspalomas Dunes, San Bartolomé de Tirajana, Las Palmas, Canary Islands, Spain | 45.2 |
| Las Palmas de Gran Canaria | Jardín Botánico Canario Viera y Clavijo | Jardín Botánico Viera y Clavijo, Dragonal Bajo, Las Palmas, Canary Islands ... | 7.7 |
| Las Palmas de Gran Canaria | Teror | Teror, Las Palmas, Canary Islands, Spain | 13.5 |
| Las Palmas de Gran Canaria | Caldera de Bandama | Caldera de Bandama, Monte Lentiscal, Santa Brígida, Las Palmas, Canary Islands ... | 10.9 |
| Southampton | Stonehenge | Stonehenge, Amesbury, Wiltshire, England, United Kingdom | 42.3 |
| Southampton | Winchester Cathedral | Winchester Cathedral, Cathedral Close, The Close, Winchester, Hampshire ... | 19.2 |
| Southampton | SeaCity Museum | SeaCity Museum, Havelock Road, Cultural Quarter, The Polygon, Southampton ... | 1.0 |
| Southampton | New Forest National Park | New Forest National Park, Hampshire, England, United Kingdom | 13.7 |
| Southampton | Salisbury Cathedral | Salisbury Cathedral, The Close, Salisbury, Wiltshire, England, SP1 2EG, United ... | 32.5 |
| Southampton | Portsmouth Historic Dockyard | Portsmouth Historic Dockyard, Queen Street, Portsea, Portsmouth, England, PO1 ... | 24.1 |
| Southampton | National Motor Museum | National Motor Museum, Mill Pond Walk, Beaulieu, New Forest, Hampshire ... | 9.0 |
| Dover | Dover Castle | Dover Castle, Knight's Road, Tower Hamlets, Dover, Kent, England, CT16 1HU ... | 1.8 |
| Dover | White Cliffs of Dover | White Cliffs of Dover, Clarendon, Dover, Kent, England, CT16 1LW, United Kingdom | 1.4 |
| Dover | Canterbury Cathedral | Canterbury Cathedral, The Precincts, The King's Mile, Canterbury, Kent ... | 24.6 |
| Dover | South Foreland Lighthouse | South Foreland Lighthouse, Seaview Road, St. Margaret's at Cliffe, Dover, Kent ... | 4.9 |
| Dover | Leeds Castle | Leeds Castle, Ashford Road, Eyhorne Street, Broomfield and Kingswood ... | 50.0 |
| Dover | Walmer Castle | Walmer Castle, Moat Footpath, Upper Walmer, Walmer, Kingsdown, Dover, Kent ... | 11.3 |
| Copenhagen | Nyhavn | Nyhavn, Gammelholm, Christianshavn, Copenhagen, Copenhagen Municipality ... | 4.1 |
| Copenhagen | Tivoli Gardens | Tivoli Gardens, Bernstorffsgade, Postbyen, Vestervold, Meatpacking District ... | 5.4 |
| Copenhagen | The Little Mermaid | The Little Mermaid, Langelinie, Frederiksstaden, Indre By, Copenhagen ... | 2.6 |
| Copenhagen | Rosenborg Castle | Rosenborg Castle, Grønne Bro, Østervold, Indre By, Copenhagen, Copenhagen ... | 4.1 |
| Copenhagen | Christiansborg Palace | Christiansborg Palace, Rigsdagsgården, Gammelholm, Indre By, Copenhagen ... | 4.9 |
| Copenhagen | Strøget | Nørgaard på Strøget, Amagertorv, Gammelholm, Indre By, Copenhagen, Copenhagen ... | 4.7 |
| Copenhagen | Kronborg Castle | Kronborg Castle, Kronborg, Elsinore, Helsingør Municipality, Capital Region of ... | 36.2 |
| Copenhagen | Frederiksborg Castle | Frederiksborg Palace, Ydre Slotsgård, Teglgårdslund, Hillerød, Hillerød ... | 31.6 |
| Copenhagen | Louisiana Museum of Modern Art | Louisiana Museum of Modern Art, Gammel Strandvej, Gammel Humlebæk, Krogerup ... | 28.9 |
| Stockholm | Vasa Museum | Vasa Museum, Galärvarvsvägen, Djurgårdsstaden, Djurgården, Norra innerstadens ... | 2.9 |
| Stockholm | Gamla stan | Gamla stan, Södermalms stadsdelsområde, Stockholm, Stockholm Municipality ... | 4.1 |
| Stockholm | Skansen | Skansen, 49-51, Djurgårdsslätten, Djurgårdsstaden, Djurgården, Norra ... | 2.5 |
| Stockholm | Stockholm Palace | Royal Palace, 1, Slottsbacken, Gamla stan, Södermalms stadsdelsområde ... | 4.0 |
| Stockholm | ABBA The Museum | ABBA The Museum, 68, Djurgårdsvägen, Djurgårdsstaden, Djurgården, Norra ... | 3.0 |
| Stockholm | Drottningholm Palace | Drottningholm Palace, Ekerövägen, Malmen, Ängsholm, Drottningholm, Ekerö ... | 14.1 |
| Stockholm | Fotografiska | Fotografiska, 22, Stadsgårdshamnen, Södermalm, Södermalms stadsdelsområde ... | 4.0 |
| Stockholm | Stockholm City Hall | Stockholm City Hall, 1, Hantverkargatan, Kungsholmen, Kungsholmens ... | 4.8 |
| Helsinki | Suomenlinna | Suomenlinna, Southern major district, Helsinki, Helsinki sub-region, Uusimaa ... | 3.4 |
| Helsinki | Helsinki Cathedral | Helsinki Cathedral, 29, Unioninkatu, Kaisaniemi, Kluuvi, Southern major ... | 0.6 |
| Helsinki | Temppeliaukio Church | Temppeliaukio Church, 3, Lutherinkatu, Leppäsuo, Etu-Töölö, Southern major ... | 1.2 |
| Helsinki | Uspenski Cathedral | Uspenski Cathedral, 1, Kanavakatu, Katajanokka, Southern major district ... | 0.9 |
| Helsinki | Sibelius Monument | Sibelius Monument, Merikannontie, Töölö, Taka-Töölö, Southern major district ... | 2.4 |
| Helsinki | Seurasaari Open-Air Museum | Seurasaari open-air museum, Antin aukio, Meilahti, Western major district ... | 3.7 |
| Helsinki | Old Market Hall | Old Market Hall, 9, Eteläranta, Kaartinkaupunki, Southern major district ... | 0.5 |
| Tallinn | Tallinn Town Hall Square | Town Hall Square, All-linn, Vanalinn, City center, Tallinn, Harju County ... | 1.6 |
| Tallinn | Toompea Castle | Toompea Castle, 1a, Lossi plats, Toompea, Vanalinn, City center, Tallinn, Harju ... | 2.0 |
| Tallinn | Alexander Nevsky Cathedral | Alexander Nevsky Cathedral, 10, Lossi plats, Toompea, Vanalinn, City center ... | 2.0 |
| Tallinn | Kadriorg Palace | Kadriorg Palace, 37, August Weizenbergi, Kadriorg, City center, Tallinn, Harju ... | 1.8 |
| Tallinn | Estonian Open Air Museum | Estonian Open Air Museum, 12, Vabaõhumuuseumi tee, Õismäe, Haabersti linnaosa ... | 7.4 |
| Tallinn | Seaplane Harbour | Seaplane Harbour, 6, Vesilennuki, Krulli kvartal, Kalamaja, Põhja-Tallinna ... | 1.5 |
| Tallinn | Kohtuotsa viewing platform | Kohtuotsa vaateplatvorm, Pikk jalg, All-linn, Vanalinn, City center, Tallinn ... | 1.7 |
| Tallinn | St. Olaf's Church | St Olaf's Church, 50, Lai, All-linn, Vanalinn, City center, Tallinn, Harju ... | 1.2 |
| Oslo | Oslo Opera House | Oslo Opera House, Henny Mürers gang, Sjøtomta, Bjørvika, Sentrum, Oslo, 0185 ... | 1.0 |
| Oslo | Akershus Fortress | Akershus fortress, Akershusstranda, Akershus festning, Sentrum, Oslo, 0015 ... | 0.2 |
| Oslo | Fram Museum | Fram Museum, Bygdøynesveien, Skarpsno, Frogner, Oslo, 0286, Norway | 2.0 |
| Oslo | Norwegian Museum of Cultural History | The Norwegian Museum of Cultural History, Bygdøy, Frogner, Oslo, 0286, Norway | 2.7 |
| Oslo | Holmenkollen Ski Jump | Holmenkollbakken, Kongeveien, Marka, Oslo, 0787, Norway | 7.5 |
| Oslo | Munch Museum | Munchmuseet, Operatunnelen / Bjørvikatunnelen, Sjøtomta, Bjørvika, Gamle Oslo ... | 1.1 |
| Oslo | Kon-Tiki Museum | Kon-Tiki Museum, Bygdøynesveien, Skarpsno, Frogner, Oslo, 0286, Norway | 2.1 |
| Bergen | Bryggen | Bryggen, Skuteviken, Bergenhus, Bergen, Vestland, 5003, Norway | 0.2 |
| Bergen | Fløibanen | Fløibanen, Fjellien, Skansen, Skuteviken, Bergenhus, Bergen, Vestland, 5018 ... | 0.3 |
| Bergen | Bergen Fish Market | Bergen Fish Market, Fish market, Sentrum, Skuteviken, Bergenhus, Bergen ... | 0.1 |
| Bergen | Ulriken | Ulriken, Bergen, Vestland, 5096, Norway | 3.8 |
| Bergen | Troldhaugen | Edvard Grieg Museum Troldhaugen, Troldhaugvegen, Nesttun, Fana, Bergen ... | 8.3 |
| Bergen | Bergenhus Fortress | Bergenhus Fortress, Skuteviken, Bergenhus, Bergen, Vestland, Norway | 0.8 |
| Bergen | Fantoft Stave Church | Fantoft stavkirke, Birkelundsbakken, Paradis, Fantoft, Fana, Bergen, Vestland ... | 6.3 |
| Bergen | KODE | Kode 2, Rasmus Meyers allé, Nygård, Skuteviken, Bergenhus, Bergen, Vestland ... | 0.5 |
| Stavanger | Preikestolen | Pulpit Rock, Strand, Rogaland, Norway | 26.4 |
| Stavanger | Gamle Stavanger | Gamle Stavanger, Øvre Strandgate, Gamle Stavanger, Straen, Ledaal, Eiganes og ... | 0.4 |
| Stavanger | Norwegian Petroleum Museum | The Norwegian Petroleum Museum, Blå promenade, Holmen, Storhaug, Stavanger ... | 0.4 |
| Stavanger | Sverd i fjell | Sverd i fjell, Hafrsfjordruta, Nov, Madla, Stavanger, Sola, Rogaland, 4044 ... | 4.7 |
| Stavanger | Lysefjord | Lysefjorden, Rogaland, Norway | 35.4 |
| Geiranger | Dalsnibba | Dalsnibba, Stranda, Møre og Romsdal, Norway | 6.8 |
| Geiranger | Flydalsjuvet | Flydalsjuvet, Geirangervegen, Hole, Geiranger, Stranda, Møre og Romsdal, 6216 ... | 1.5 |
| Geiranger | Ørnesvingen | Ørnesvingen, Ørnevegen, Møllsæter, Stranda, Møre og Romsdal, 6216, Norway | 3.5 |
| Geiranger | Norsk Fjordsenter | Norsk Fjordsenter, Gjørvahaugane, Vinje, Geiranger, Stranda, Møre og Romsdal ... | 0.6 |
| Flåm | Flåmsbana | The Flåm Railway, Stasjonsvegen, Fretheim, Flåm, Aurland, Vestland, 5743, Norway | 0.1 |
| Flåm | Stegastein | Stegastein, Lunde, Aurlandsvangen, Aurland, Vestland, 5745, Norway | 7.4 |
| Flåm | Nærøyfjord | Nærøyfjord, Drægavegen, Dyrdal, Aurland, Vestland, Norway | 13.0 |
| Flåm | Ægir Bryggeri | Ægir bryggeri, A-feltvegen, Fretheim, Flåm, Aurland, Vestland, 5743, Norway | 0.2 |
| Flåm | Undredal | Undredal, Aurland, Vestland, 5746, Norway | 9.7 |
| Flåm | Brekkefossen | Brekkefossen, Brekkevegen, Fretheim, Flåm, Aurland, Vestland, 5743, Norway | 1.4 |
| Ålesund | Aksla | Aksla, Ålesund, Møre og Romsdal, 6003, Norway | 1.1 |
| Ålesund | Jugendstilsenteret | Jugendstilsenteret, Hellegata, Slinningen, Ålesund, Møre og Romsdal, 6004 ... | 0.2 |
| Ålesund | Sunnmøre Museum | Sunnmøre museum, Museumsvegen, Skuggen, Larsgården, Nørvasundet, Ålesund, Møre ... | 4.4 |
| Ålesund | Alnes Lighthouse | Alnes fyr, Nesbakken, Alnes, Giske, Møre og Romsdal, 6055, Norway | 9.6 |
| Tromsø | Arctic Cathedral | Arctic Cathedral, Alfred Hansens veg, Storsteinnes, Kollbakkbukt, Tromsdalen - ... | 3.4 |
| Tromsø | Fjellheisen | Fjellheisen, Heggåsvegen, Storsteintun, Tromsdalen - Romssavággi, Tromsø ... | 4.5 |
| Tromsø | Polaria | Polaria, Hjalmar Johansens gate, Mackkvartalet, Sørbyen, Tromsø, Troms, 9009 ... | 4.2 |
| Tromsø | Polar Museum | Polarmuseet, Søndre Tollbodgate, Vervet, Hansjordnesbukta, Tromsø, Troms, 9008 ... | 3.1 |
| Tromsø | Tromsø Museum | Tromsø Museum, Lysløypa, Nyløkken, Bjerkakerstranda, Sorgenfri, Tromsø, Troms ... | 5.7 |
| Tromsø | Mack Brewery | Ludwig Mack Brygghus, Storgata, Mackkvartalet, Sørbyen, Tromsø, Troms, 9009 ... | 4.0 |
| Reykjavík | Hallgrímskirkja | Hallgrímskirkja, 1, Hallgrímstorg, Tungan, Miðborg, Reykjavik, Capital Region ... | 3.3 |
| Reykjavík | Harpa | Harpa, 2, Austurbakki, Miðborg, Reykjavik, Capital Region, 101, Iceland | 3.3 |
| Reykjavík | Blue Lagoon | Blue Lagoon, Grindavík, Grindavíkurbær, Southern Peninsula, Iceland | 41.7 |
| Reykjavík | Þingvellir National Park | Þingvellir National Park, Bláskógabyggð, Southern Region, Iceland | 40.3 |
| Reykjavík | Gullfoss | Gullfoss, Bláskógabyggð, Southern Region, Iceland | 84.8 |
| Reykjavík | Perlan | The Pearl, 1, Varmahlíð, Hlíðar, Reykjavik, Capital Region, 105, Iceland | 3.9 |
| Reykjavík | Sun Voyager | Sun Voyager, Mánaleið, Austurbær, Miðborg, Reykjavik, Capital Region, 101 ... | 2.9 |
| Amsterdam | Rijksmuseum | Rijksmuseum, Stadhouderskade, Museumkwartier, Oud-Zuid, Zuid, Amsterdam, North ... | 2.9 |
| Amsterdam | Van Gogh Museum | Van Gogh Museum, 7, Paulus Potterstraat, Museumkwartier, Oud-Zuid, Zuid ... | 3.2 |
| Amsterdam | Anne Frank House | Anne Frank House, 267, Prinsengracht, Grachtengordel, Centrum, Amsterdam, North ... | 2.1 |
| Amsterdam | Jordaan | Jordaan, Centrum, Amsterdam, North Holland, Netherlands | 2.3 |
| Amsterdam | Vondelpark | Vondelpark, Zuid, Amsterdam, North Holland, Netherlands | 4.2 |
| Amsterdam | Zaanse Schans | Zaanse Schans, Zaandam, Zaanstad, North Holland, Netherlands | 12.7 |
| Amsterdam | Keukenhof | Keukenhof, Lisse, South Holland, Netherlands, 2163 KS, Netherlands | 27.6 |
| Amsterdam | Albert Cuyp Market | Albert Cuyp market, 1073, Albert Cuypstraat, Oude Pijp, De Pijp, Zuid ... | 3.0 |
| Rotterdam | Kinderdijk | Kinderdijk, Molenlanden, South Holland, Netherlands | 10.4 |
| Rotterdam | Kubuswoningen | Kubuswoningen, Overblaak, Stadsdriehoek, Centrum, Rotterdam, South Holland ... | 1.6 |
| Rotterdam | Euromast | Euromast, Westzeedijk, Scheepvaartkwartier, Centrum, Rotterdam, South Holland ... | 1.4 |
| Rotterdam | SS Rotterdam | SS Rotterdam, 25, 3e Katendrechtsehoofd, Katendrecht, Feijenoord, Rotterdam ... | 1.3 |
| Rotterdam | Erasmusbrug | Erasmus Bridge, Westerstraat, Scheepvaartkwartier, Centrum, Rotterdam, South ... | 0.4 |
| Rotterdam | Markt square, Delft | Markt, City Centre, Delft, South Holland, Netherlands, 2611 GV, Netherlands | 14.7 |
| Zeebrugge (Bruges) | Markt square, Bruges | Markt, Steenstraatkwartier, Brugge-Centrum, Brugge, Bruges, Brugge, West ... | 14.1 |
| Zeebrugge (Bruges) | Belfry of Bruges | Belfry, Markt, Steenstraatkwartier, Brugge-Centrum, Brugge, Bruges, Brugge ... | 14.2 |
| Zeebrugge (Bruges) | Basilica of the Holy Blood | Basilica of the Holy Blood, 13, Burg, Sint-Walburgakwartier, Brugge-Centrum ... | 14.2 |
| Zeebrugge (Bruges) | Groeningemuseum | Groeningemuseum, 12, Dijver, Onze-Lieve-Vrouwekwartier, Brugge-Centrum, Brugge ... | 14.4 |
| Zeebrugge (Bruges) | Gravensteen | Castle of the Counts, 11, Sint-Veerleplein, Patershol, Ghent, Gent, East ... | 47.2 |
| Zeebrugge (Bruges) | Minnewater | Minnewater, Onze-Lieve-Vrouwekwartier, Brugge-Centrum, Brugge, Bruges, Brugge ... | 15.1 |
| Le Havre (Normandy) | Falaise d'Aval | Falaise D'Aval, Étretat, Le Havre, Seine-Maritime, Normandy, Metropolitan ... | 25.9 |
| Le Havre (Normandy) | Honfleur | Honfleur, Lisieux, Calvados, Normandy, Metropolitan France, 14600, France | 11.4 |
| Le Havre (Normandy) | Rouen Cathedral | Cathédrale Notre-Dame, Place de la Cathédrale, Vieux-Marché-Cathédrale ... | 71.5 |
| Le Havre (Normandy) | Musée d'art moderne André Malraux | Musée d'Art Moderne André Malraux, Rue Benjamin Normand, Perrey, Le Havre ... | 0.6 |
| Le Havre (Normandy) | Église Saint-Joseph | Église Saint-Joseph, 130, Boulevard François 1er, Perrey, Le Havre ... | 1.2 |
| Le Havre (Normandy) | Normandy American Cemetery and Memorial | Normandy American Cemetery and Memorial, Le Cavey, Colleville-sur-Mer, Bayeux ... | 70.9 |
| Hamburg | Miniatur Wunderland | Miniature Wonderland, 2-4, Kehrwieder, Quartier Am Sandtorkai, HafenCity ... | 0.8 |
| Hamburg | Elbphilharmonie | Elbe Philharmonic Hall, 1, Platz der Deutschen Einheit, Quartier Am Sandtorkai ... | 0.9 |
| Hamburg | Speicherstadt | Speicherstadt, Kehrwieder, Hanseatic Trade Center, HafenCity, Hamburg-Mitte ... | 0.9 |
| Hamburg | St. Michael's Church | Church of St. Michael, 1A, Englische Planke, Portugiesenviertel, Neustadt ... | 1.6 |
| Hamburg | Planten un Blomen | Planten un Blomen, Edmund-Siemers-Allee, Rotherbaum, Eimsbüttel, Hamburg ... | 2.8 |
| Hamburg | Fischmarkt | Fischmarkt, Altona, Altona-Altstadt, Altona, Hamburg, 22767, Germany | 3.1 |
| Hamburg | Tierpark Hagenbeck | Tierpark Hagenbeck, 2, Lokstedter Grenzstraße, Lokstedt, Eimsbüttel, Hamburg ... | 7.5 |
| Warnemünde (Rostock) | Leuchtturm Warnemünde | Leuchtturm Warnemünde, 3, Seepromenade, Warnemünde, Ortsbeirat 1 : ... | 1.0 |
| Warnemünde (Rostock) | St. Mary's Church | St.-Marien-Kirche, 3, Bei der Marienkirche, Nördliche Altstadt, Stadtmitte ... | 9.9 |
| Warnemünde (Rostock) | Schwerin Castle | Schwerin Castle, 1, Lennéstraße, Altstadt, Schwerin, Mecklenburg-Vorpommern ... | 75.5 |
| Warnemünde (Rostock) | Doberaner Münster | Doberaner Münster, Klosterstraße, Kammerhof, Bad Doberan, Landkreis Rostock ... | 14.1 |
| Warnemünde (Rostock) | Molli | Mecklenburgische Bäderbahn Molli, Dammchaussee, Kammerhof, Bad Doberan ... | 14.4 |
| Warnemünde (Rostock) | Warnemünde Beach | Active Beach Warnemünde, Seepromenade, Warnemünde, Ortsbeirat 1 : ... | 1.4 |
| Warnemünde (Rostock) | Heiligendamm | Heiligendamm, Bad Doberan, Landkreis Rostock, Mecklenburg-Vorpommern, 18209 ... | 16.8 |
| Riga | House of the Blackheads | House of the Black Heads, 7, Mazā Grēcinieku iela, Old Riga, Latgales apkaime ... | 0.3 |
| Riga | Riga Cathedral | Riga Cathedral, 6, Herdera laukums, Old Riga, Latgales apkaime, Riga, LV-1050 ... | 0.0 |
| Riga | St. Peter's Church | St. Peter's Church, 1, Reformation Square, Old Riga, Latgales apkaime, Riga ... | 0.3 |
| Riga | Riga Central Market | Central Market, Centrāltirgus iela, Spīķeri, Latgale neighborhood, Latgales ... | 0.8 |
| Riga | Alberta iela | Alberta iela, Titurga, Baloži, Ķekavas novads, LV-2112, Latvia | 9.1 |
| Riga | Freedom Monument | Freedom Monument, Freedom Square, Centre, Centra apkaime, Riga, LV-1050, Latvia | 0.5 |
| Riga | Jūrmala | Jūrmala, Latvia | 19.4 |
| Riga | Latvian Ethnographic Open-Air Museum | Latvian Ethnographic Open-Air Museum, Mazā Lapu iela, Berģi, Garkalnes pagasts ... | 11.6 |
| Gdynia (Gdańsk) | Long Market | Long Market, Główne Miasto, Śródmieście, Gdansk, Gdańsk, Pomeranian ... | 20.1 |
| Gdynia (Gdańsk) | St. Mary's Church | St Mary’s Church, 5, Podkramarska, Zamczysko, Główne Miasto, Śródmieście ... | 19.9 |
| Gdynia (Gdańsk) | European Solidarity Centre | Solidarity Museum (European Solidarity Centre), 1, Plac Solidarności, Stare ... | 18.6 |
| Gdynia (Gdańsk) | Museum of the Second World War | Museum of the Second World War, 1, Plac Władysława Bartoszewskiego, Wiadrownia ... | 19.5 |
| Gdynia (Gdańsk) | Malbork Castle | Malbork Castle, Malbork, Malbork County, Pomeranian Voivodeship, 82-200, Poland | 61.7 |
| Gdynia (Gdańsk) | Sopot Pier | Sopot Pier, Skwer Kuracyjny, Sopot Dolny, Sopot, Pomeranian Voivodeship ... | 8.0 |
| Gdynia (Gdańsk) | Westerplatte | Westerplatte, Gdansk, Gdańsk, Pomeranian Voivodeship, Poland | 14.6 |
| Gdynia (Gdańsk) | ORP Błyskawica | ORP Błyskawica, Nabrzeże Pomorskie, Molo Południowe, Śródmieście, Gdynia ... | 0.8 |
| Dublin | Trinity College Dublin | Trinity College Dublin, College Green, Mansion House A ED, Dublin, County ... | 0.8 |
| Dublin | Guinness Storehouse | Guinness Storehouse, Market Street South, Guinness Brewery, Ushers C ED ... | 1.9 |
| Dublin | Dublin Castle | Dublin Castle, Castle Street, Royal Exchange A Ward 1986, Dublin, County ... | 0.9 |
| Dublin | St. Patrick's Cathedral | Saint Patrick's Cathedral, Patrick Street, Wood Quay A ED, Dublin, County ... | 1.3 |
| Dublin | Temple Bar | Temple Bar, Royal Exchange A Ward 1986, Dublin, County Dublin, Leinster, Ireland | 0.5 |
| Dublin | Kilmainham Gaol | Kilmainham Gaol, Inchicore Road, Kilmainham B ED, Dublin, County Dublin ... | 3.4 |
| Dublin | Glendalough | Glendalough, The Municipal District of Wicklow, County Wicklow, Leinster, A98 ... | 37.8 |
| Dublin | Howth | Howth, Fingal, County Dublin, Leinster, D13 V2F9, Ireland | 13.6 |
| Cobh (Cork) | Blarney Castle | Blarney Castle, River Bank Walk, Old Blarney, Blarney ED, Cork, County Cork ... | 20.9 |
| Cobh (Cork) | Titanic Experience Cobh | Titanic Experience, Westbourne Place, Cobh Urban ED, Municipal District of ... | 0.0 |
| Cobh (Cork) | St. Colman's Cathedral | St.Colman's Cathedral, Roches Row, Cobh Urban ED, Cobh, County Cork, Munster ... | 0.2 |
| Cobh (Cork) | Spike Island | Spike Island, Cobh Rural ED, County Cork, Munster, Ireland | 1.9 |
| Cobh (Cork) | Fota Wildlife Park | Fota Wildlife Park, R624, Cobh Rural ED, Municipal District of Cobh, County ... | 4.9 |
| Cobh (Cork) | Jameson Distillery Midleton | Jameson Distillery Midleton, Distillery Walk, Midleton Urban, The Municipal ... | 11.2 |
| Cobh (Cork) | Kinsale | Kinsale, County Cork, Munster, Ireland | 22.4 |
| Cobh (Cork) | English Market | English Market, 24, Grand Parade, Centre A ED, Cork, County Cork, Munster, T12 ... | 13.4 |
| Belfast | Titanic Belfast | Titanic Belfast, 1 Olympic Way, Queens Road, Titanic Quarter, Queen's Island ... | 2.6 |
| Belfast | Giant's Causeway | Giant's Causeway, Causeway Coast and Glens District, County Antrim, Northern ... | 79.3 |
| Belfast | Carrick-a-Rede Rope Bridge | Carrick-a-rede Rope Bridge, Ballintoy, Causeway Coast and Glens District ... | 74.0 |
| Belfast | Belfast City Hall | Belfast City Hall, Donegall Square South, Linen Quarter, Belfast City District ... | 4.4 |
| Belfast | St George's Market | Saint George's Market, 12-20, East Bridge Street, Markets, Belfast City ... | 4.1 |
| Belfast | Crumlin Road Gaol | Crumlin Road Gaol, 53-55, Crumlin Road, Edenderry, Shankill, Belfast City ... | 4.1 |
| Belfast | Ulster Museum | Ulster Museum, Stranmillis Road, Crescent, Queen's Quarter, Belfast City ... | 5.8 |
| Belfast | The Dark Hedges | The Dark Hedges, Causeway Coast and Glens District, County Antrim, Northern ... | 64.9 |
| Belfast | Carrickfergus Castle | Carrickfergus Castle, Marine Highway, Barn, Carrickfergus, Mid and East Antrim ... | 11.0 |
| Edinburgh (Leith and South Queensferry) | Edinburgh Castle | Edinburgh Castle, Castlehill, Abbeyhill, Old Town, City of Edinburgh, Scotland ... | 3.7 |
| Edinburgh (Leith and South Queensferry) | Palace of Holyroodhouse | Palace of Holyroodhouse, Canongate, Holyrood, Abbeyhill, Old Town, City of ... | 3.1 |
| Edinburgh (Leith and South Queensferry) | Arthur's Seat | Arthur's Seat, City of Edinburgh, Scotland, EH8 8HG, United Kingdom | 4.2 |
| Edinburgh (Leith and South Queensferry) | Royal Yacht Britannia | HMY Britannia, 100, Ocean Drive, Fort, North Leith, Leith, City of Edinburgh ... | 0.3 |
| Edinburgh (Leith and South Queensferry) | Forth Bridge | Forth Bridge, Post Office Lane, North Queensferry, Fife, Scotland, KY11 1JP ... | 13.0 |
| Edinburgh (Leith and South Queensferry) | National Museum of Scotland | National Museum of Scotland, Chambers Street, Abbeyhill, Old Town, City of ... | 3.7 |
| Edinburgh (Leith and South Queensferry) | Royal Botanic Garden Edinburgh | Royal Botanic Garden Edinburgh, Stockbridge/Inverleith, City of Edinburgh ... | 2.4 |
| Edinburgh (Leith and South Queensferry) | Rosslyn Chapel | Rosslyn Chapel, Chapel Loan, Dryden Farm, Roslin, Midlothian, Scotland, EH25 ... | 14.0 |
| Invergordon (Inverness) | Urquhart Castle | Urquhart Castle, Urquhart Castle Drive, Strone, Lewiston, Highland, Scotland ... | 43.2 |
| Invergordon (Inverness) | Culloden Battlefield | Culloden Battlefield, Leanach, Newlands of Culloden, Highland, Scotland, IV2 ... | 23.5 |
| Invergordon (Inverness) | Cawdor Castle | Cawdor Castle, Smiddy Brae, Cawdor, Highland, Scotland, IV12 5RD, United Kingdom | 23.0 |
| Invergordon (Inverness) | Fort George | Fort George, Skinner Road, Fortrose, Highland, Scotland, IV2 7TD, United Kingdom | 12.7 |
| Invergordon (Inverness) | Clava Cairns | Balnuaran of Clava, C22, Clava, Newlands of Culloden, Highland, Scotland, IV2 ... | 24.2 |
| Invergordon (Inverness) | Glenmorangie Distillery | Glenmorangie Distillery and Visitor Centre, A9, Tain, Highland, Scotland, IV19 ... | 16.5 |
| Invergordon (Inverness) | Dunrobin Castle | Dunrobin Castle, A9, Doll, Highland, Scotland, KW10 6SF, United Kingdom | 35.6 |
| Kirkwall, Orkney | Skara Brae | Skara Brae, B9056, Orkney Islands, Scotland, KW16 3LR, United Kingdom | 23.1 |
| Kirkwall, Orkney | Ring of Brodgar | Ring of Brodgar, Clouston, Orkney Islands, Scotland, United Kingdom | 15.6 |
| Kirkwall, Orkney | St Magnus Cathedral | Saint Magnus Cathedral, Palace Road, Kirkwall, Orkney Islands, Scotland, KW15 ... | 0.1 |
| Kirkwall, Orkney | Italian Chapel | The Italian Chapel, A961, Lamb Holm, St Mary's, Orkney Islands, Scotland, KW17 ... | 11.0 |
| Kirkwall, Orkney | Highland Park Distillery | Highland Park Distillery, Holm Road, Kirkwall, Orkney Islands, Scotland, KW15 ... | 1.4 |
| Kirkwall, Orkney | Maeshowe | Maes Howe, Stoneyhill Road, Bimbister, Orkney Islands, Scotland, KW16 3HQ ... | 13.2 |
| Kirkwall, Orkney | Standing Stones of Stenness | Stones of Stenness, Brodgar Road, Stenness, Orkney Islands, Scotland, KW16 3JY ... | 14.3 |
| Greenock (Glasgow) | Kelvingrove Art Gallery and Museum | Kelvingrove Art Gallery and Museum, Argyle Street, Kelvinhaugh, Finnieston ... | 30.4 |
| Greenock (Glasgow) | Loch Lomond Shores | Loch Lomond Shores, Tulliechewan Farm, Balloch, West Dunbartonshire, Scotland ... | 11.9 |
| Greenock (Glasgow) | Riverside Museum | Riverside Museum, 100, Pointhouse Place, Yorkhill, Partick, Glasgow, Glasgow ... | 29.6 |
| Greenock (Glasgow) | Stirling Castle | Stirling Castle, Ballengeich Pass, Top of the Town, Raploch, Stirling ... | 53.7 |
| Greenock (Glasgow) | Glasgow Necropolis | Glasgow Necropolis, 70, Garngad, Glasgow, Glasgow City, Scotland, G4 0UZ ... | 34.2 |
| Greenock (Glasgow) | Inveraray Castle | Inveraray Castle, Upper Avenue, Inveraray, Argyll and Bute, Scotland, PA32 8UR ... | 37.4 |
| Greenock (Glasgow) | Newark Castle | Newark Castle, Castle Road, Clune Park, Devol, Port Glasgow, Inverclyde ... | 5.2 |
| Liverpool | The Beatles Story | The Beatles Story, Britannia Pavilion, Gower Street, Waterfront, Vauxhall ... | 0.9 |
| Liverpool | Royal Albert Dock | Royal Albert Dock, Waterfront, Vauxhall, Liverpool, Liverpool City Region ... | 0.8 |
| Liverpool | Liverpool Cathedral | Liverpool Cathedral, St James Road, Baltic Triangle, Toxteth, Liverpool ... | 2.0 |
| Liverpool | The Cavern Club | Cavern Club, Mathew Street, Cavern Quarter, Liverpool, Liverpool City Region ... | 0.7 |
| Liverpool | Museum of Liverpool | Museum of Liverpool, Mann Island, Waterfront, Vauxhall, Liverpool, Liverpool ... | 0.5 |
| Liverpool | Chester Cathedral | Chester Cathedral, Newtown, City of Chester, Chester, Cheshire West and ... | 24.9 |
| Liverpool | Speke Hall | Speke Hall, The Walk, Speke, Liverpool, Liverpool City Region, England, L24 ... | 11.3 |
| Liverpool | World Museum | World Museum Liverpool, William Brown Street, St George's Quarter / Cultural ... | 1.2 |
| Sydney | Sydney Opera House | Sydney Opera House, 2, Macquarie Street, Quay Quarter, Sydney, New South Wales ... | 2.7 |
| Sydney | Sydney Harbour Bridge | Sydney Harbour Bridge, Dawes Point, Sydney, New South Wales, 2000, Australia | 2.2 |
| Sydney | The Rocks | The Rocks, Sydney, New South Wales, Australia | 2.0 |
| Sydney | Royal Botanic Garden Sydney | Royal Botanic Garden, Sydney, New South Wales, Australia | 2.7 |
| Sydney | Bondi Beach | Bondi Beach, Eastern Suburbs, Sydney, New South Wales, 2026, Australia | 8.6 |
| Sydney | Taronga Zoo | Taronga Zoo, Athol Wharf Road, Mosman, Lower North Shore, Sydney, New South ... | 5.2 |
| Sydney | Manly Beach | Manly Beach, Northern Beaches, Sydney, New South Wales, 2095, Australia | 11.9 |
| Sydney | Three Sisters | Three Sisters, Giant Stairway, Katoomba, New South Wales, 2780, Australia | 81.7 |
| Sydney | Darling Harbour | Darling Harbour, Sydney, New South Wales, Australia | 1.4 |
| Melbourne | Federation Square | Federation Square, Melbourne, Victoria, Australia | 0.7 |
| Melbourne | Queen Victoria Market | Queen Victoria Market, Queen Street, Melbourne, Victoria, 3000, Australia | 0.9 |
| Melbourne | Royal Botanic Gardens Victoria | Royal Botanic Gardens, Melbourne, Victoria, Australia | 2.3 |
| Melbourne | St Kilda Beach | St Kilda Beach, St Kilda, Melbourne, Victoria, 3182, Australia | 6.1 |
| Melbourne | Hosier Lane | Hosier Lane, East End Theatre District, Melbourne, Victoria, 3000, Australia | 0.6 |
| Melbourne | National Gallery of Victoria | National Gallery of Victoria, 130-180, St Kilda Road, Southbank, Melbourne ... | 1.1 |
| Melbourne | Puffing Billy Railway | Puffing Billy Railway, Belgrave, Melbourne, Victoria, 3160, Australia | 36.1 |
| Melbourne | Healesville Sanctuary | Healesville Sanctuary, Melbourne, Victoria, 3777, Australia | 51.3 |
| Melbourne | Melbourne Zoo | Melbourne Zoological Gardens, 1, Elliott Avenue, Parkville, Melbourne ... | 3.4 |
| Brisbane | Lone Pine Koala Sanctuary | Lone Pine Koala Sanctuary, 708, Jesmond Road, Fig Tree Pocket, Brisbane ... | 14.6 |
| Brisbane | South Bank Parklands | South Bank Parklands, South Brisbane, Brisbane, Queensland, Australia | 6.3 |
| Brisbane | Mount Coot-tha Lookout | Mt Coot-Tha Lookout, Lookout Trail, Mount Coot-tha, Brisbane, Queensland, 4066 ... | 12.1 |
| Brisbane | Story Bridge | Story Bridge, Bradfield Highway, Fortitude Valley, Brisbane, Queensland, 4006 ... | 4.3 |
| Brisbane | Queensland Museum | Queensland Museum, Grey Street, South Brisbane, Brisbane, Queensland, 4101 ... | 6.3 |
| Brisbane | Gallery of Modern Art | Gallery of Modern Art, Stanley Place, South Bank, South Brisbane, Brisbane ... | 6.2 |
| Brisbane | City Botanic Gardens | City Botanic Gardens Riverwalk, Golden Triangle, Brisbane City, Brisbane ... | 5.3 |
| Brisbane | Australia Zoo | Australia Zoo, 1638, Steve Irwin Way, Beerwah, Landsborough, Queensland, 4519 ... | 68.3 |
| Auckland | Sky Tower | Sky Tower, Victoria Street Cycleway, Victoria Quarter, Wynyard Quarter, City ... | 0.9 |
| Auckland | Auckland War Memorial Museum | Auckland War Memorial Museum, Museum Circuit, Parnell, Auckland, Waitematā ... | 2.5 |
| Auckland | Waiheke Island | Waiheke Island, Waiheke, Auckland, New Zealand | 29.2 |
| Auckland | Maungawhau | Maungawhau, Ruru Street, Newton, Mount Eden, Auckland, Waitematā, Auckland ... | 3.1 |
| Auckland | Piha Beach | North Piha Beach, Piha, Waitākere Ranges, Auckland, New Zealand | 29.3 |
| Auckland | Auckland Domain | Auckland Domain, Parnell, Auckland, Waitematā, Auckland, New Zealand | 2.3 |
| Auckland | Kelly Tarlton's Sea Life Aquarium | SEA LIFE Kelly Tarlton's Aquarium, 23, Tāmaki Drive, Ōrākei, Auckland, 1074 ... | 4.6 |
| Auckland | Devonport | Devonport, Devonport-Takapuna, Auckland, 0624, New Zealand | 3.1 |
| Auckland | Rangitoto Island | Rangitoto Island, Waiheke, Auckland, New Zealand | 10.4 |
| Wellington | Te Papa | Museum of New Zealand, 55, Cable Street, Te Aro, Wellington, Wellington City ... | 0.4 |
| Wellington | Wellington Cable Car | Wellington Cable Car, Wellington Urban Motorway, Lambton, Paekākā, Wellington ... | 0.6 |
| Wellington | Zealandia | Zealandia, Lake Road, Highbury, Kelburn, Wellington, Wellington City ... | 2.1 |
| Wellington | Mount Victoria Lookout | Mount Victoria Lookout, Lookout Road, Oriental Bay, Wellington, Wellington ... | 1.6 |
| Wellington | Wellington Botanic Garden | Wellington Botanic Garden, Kelburn, Wellington, Wellington City, Wellington ... | 1.0 |
| Wellington | Wētā Cave | The Wētā Cave, Weka Street, Maupuia, Wellington, Wellington City, Wellington ... | 4.4 |
| Wellington | Beehive | The Beehive, Bowen Street, Lambton, Paekākā, Wellington Central, Wellington ... | 1.2 |
| Wellington | Cuba Street | Cuba Street, Paekākā, Te Aro, Wellington, Wellington City, Wellington, 6011 ... | 0.2 |
| Singapore | Gardens by the Bay | Gardens by the Bay, Central Region, Singapore, 018593, Singapore | 5.5 |
| Singapore | Marina Bay Sands | Marina Bay Sands, 10, Bayfront Avenue, Bayfront Subzone, Civic District ... | 5.2 |
| Singapore | Singapore Botanic Gardens | Singapore Botanic Gardens, 1, Central Region, Singapore, 259569, Singapore | 5.6 |
| Singapore | Universal Studios Singapore | Universal Studios Singapore, 30, Sentosa Gateway, Sentosa, Southern Islands ... | 1.2 |
| Singapore | Singapore Zoo | Singapore Zoo, 80, Mandai Lake Road, Central Water Catchment, Mandai Nature ... | 15.8 |
| Singapore | Chinatown | Chinatown, Tanjong Pagar, Outram, Central Region, Singapore | 3.3 |
| Singapore | Merlion Park | Merlion Park, Civic District, Downtown Core, Central Region, Singapore | 4.7 |
| Singapore | Little India | Little India, Rochor, Central Region, Singapore, 210668, Singapore | 6.2 |
| Singapore | Lau Pa Sat | Lau Pa Sat, 18, Raffles Quay, Cecil, Civic District, Downtown Core, Central ... | 4.0 |
| Hong Kong | Victoria Peak | Victoria Peak, Hong Kong, China | 7.7 |
| Hong Kong | Star Ferry Pier | Tsim Sha Tsui Star Ferry Pier, Salisbury Road, Tsim Sha Tsui, Yau Tsim Mong ... | 4.9 |
| Hong Kong | Temple Street Night Market | Temple Street Night Market, Shanghai Street, Kwun Chung, Yau Ma Tei, Yau Tsim ... | 4.5 |
| Hong Kong | Man Mo Temple | Man Mo Temple, 124-126, Hollywood Road, Tai Ping Shan, Sheung Wan, Central and ... | 7.0 |
| Hong Kong | Hong Kong Park | Hong Kong Park, 19, Admiralty, Central and Western District, Hong Kong Island ... | 6.2 |
| Hong Kong | Avenue of Stars | Avenue of Stars, Salisbury Road Underpass, Tsim Sha Tsui, Yau Tsim Mong ... | 4.1 |
| Hong Kong | Ocean Park | Ocean Park Hong Kong, Ocean Park Road, Wong Chuk Hang San Wai, Southern ... | 9.0 |
| Hong Kong | Wong Tai Sin Temple | Wong Tai Sin Temple, 2, Wong Tai Sin, Wong Tai Sin District, Kowloon, Hong ... | 4.6 |
| Yokohama (Tokyo) | Sankeien | Sankeien Tenmangu Shrine, Kanshinbashi Bridge, Honmoku-Sannotani, Naka ward ... | 4.4 |
| Yokohama (Tokyo) | Yokohama Chinatown | Yokohama Chinatown, 港町, Naka ward, Yokohama, Kanagawa Prefecture, 231-0023 ... | 1.3 |
| Yokohama (Tokyo) | Yokohama Landmark Tower | Yokohama Landmark Tower, 1, Minato Mirai 2, Takashima, Nishi Ward, Yokohama ... | 0.5 |
| Yokohama (Tokyo) | Kōtoku-in | Kōtoku-in, Fujisawa-Kamakura Line, Hase 4, Hase, 御所ノ内, Kamakura, Kanagawa ... | 17.3 |
| Yokohama (Tokyo) | Tsurugaoka Hachimangū | Tsurugaoka Hachiman Shrine, 31, Yukinoshita 2-chome, Kamakura, Kanagawa ... | 15.6 |
| Yokohama (Tokyo) | Sensō-ji | Sensō-ji, 1, Asakusa 2, Asakusa, Taito, Tokyo, 111-0032, Japan | 32.7 |
| Yokohama (Tokyo) | Meiji Jingu | Meiji Jingu Main Shrine, 1, Yoyogi Kamizono-chō, Shibuya, Tokyo, 151-8557, Japan | 25.7 |
| Yokohama (Tokyo) | Cup Noodles Museum Yokohama | Cupnoodles Museum, 4, Shinko 2, Naka ward, Yokohama, Kanagawa Prefecture ... | 0.7 |
| Yokohama (Tokyo) | Tokyo Skytree | Tokyo Skytree, 2, Oshiage 1, Oshiage, Sumida, Tokyo, 131-0045, Japan | 33.0 |
| Kobe (Osaka and Kyoto) | Himeji Castle | Himeji Castle, 68, 備前丸, Yashiro-honcho 1-chome, Honmachi, Himeji, Hyogo ... | 49.7 |
| Kobe (Osaka and Kyoto) | Osaka Castle | Osaka Castle, 笹の小径, Osakajo, Chūō Ward, Osaka, Osaka Prefecture, 540-0002, Japan | 29.5 |
| Kobe (Osaka and Kyoto) | Fushimi Inari-taisha | Fushimi Inari-taisha, Fushimi Ward, Kyoto, Kyoto Prefecture, 612-0882, Japan | 61.6 |
| Kobe (Osaka and Kyoto) | Kiyomizu-dera | Kiyomizu-dera, Kiyomizu Slope, Kiyomizu 1-chōme, 辰巳町, Higashiyama Ward, Kyoto ... | 63.5 |
| Kobe (Osaka and Kyoto) | Kinkaku-ji | Kinkaku-ji, Kinkakuji-chō, 馬喰町, Kita Ward, Kyoto, Kyoto Prefecture, 603-8361 ... | 62.5 |
| Kobe (Osaka and Kyoto) | Nunobiki Herb Gardens | Kobe Nunobiki Herb Garden, Chuo Ward, Kobe, Hyogo Prefecture, Japan | 4.0 |
| Kobe (Osaka and Kyoto) | Dōtonbori | Dōtonbori, Dotonbori 1, Chūō Ward, Osaka, Osaka Prefecture, 542-0071, Japan | 27.3 |
| Kobe (Osaka and Kyoto) | Ikuta Shrine | Ikuta Shrine, Higashimon-suji, Shimoyamatedori 1-chome, Chuo Ward, Kobe, Hyogo ... | 1.9 |
| Busan | Gamcheon Culture Village | Gamcheon Culture Village, 감내1로, Gamcheon 2(i)-dong, Saha-gu, Busan, 49364 ... | 6.9 |
| Busan | Haedong Yonggungsa | Haedong Yonggungsa, Yonggung-gil, Gijang-eup, Gijang-gun, Busan, 46084, South ... | 17.3 |
| Busan | Jagalchi Market | Jagalchi Market, Jagalchihaean-ro, Nampo-dong 4(sa)-ga, Nampo-dong, Jung-gu ... | 4.9 |
| Busan | Haeundae Beach | Haeundae Beach, U 1(il)-dong, Haeundae-gu, Busan, South Korea | 10.7 |
| Busan | Beomeosa | Beomeosa, Jungang-daero, Namsan-dong, Cheongnyongnopo-dong, Geumjeong-gu ... | 21.1 |
| Busan | Busan Tower | Diamond Tower, 13, Daecheong-ro 116beon-gil, Daecheong-dong 2(i)-ga ... | 5.0 |
| Busan | Taejongdae | Taejongdae Catholic Church, Dongsamseo-ro, Dongsam-dong, Dongsam 1(il)-dong ... | 1.2 |
| Papeete, Tahiti | Marché de Papeete | Marché Municipal Mapuru a Paraita, Rue François Cardella, Centre de Papeete ... | 0.2 |
| Papeete, Tahiti | Pointe Vénus | Pointe Venus, Lotissement Villierme, Mahina, Māhina, Windward Islands, French ... | 9.0 |
| Papeete, Tahiti | Cascades de Faarumai | Les 3 Cascades, Tiarei, Hitiaʻa ʻo te Rā, Windward Islands, French Polynesia ... | 17.5 |
| Papeete, Tahiti | Trou du Souffleur | Trou du souffleur, Ancienne route de Ceinture Est (accès interdit), Tiarei ... | 18.7 |
| Papeete, Tahiti | Musée de Tahiti et des Îles | Musée de Tahiti et des Îles, Servitude du Musée de Tahiti et des Iles ... | 11.7 |
| Papeete, Tahiti | Jardin d'eau de Vaipahi | Jardin d'Eau de Vaipahi, Vaima, Mataiea, Teva I Uta, Windward Islands, French ... | 31.1 |
| Papeete, Tahiti | Grotte de Maraa | Māra’a Grotte, Grottes de Maraa, Paroa, Māra’a, Pāʻea, Windward Islands, French ... | 23.1 |
| Cape Town | Table Mountain | Table Mountain, Bakoven, Cape Town Ward 54, Cape Town, City of Cape Town ... | 5.8 |
| Cape Town | V&A Waterfront | V&A Waterfront, Cape Town, City of Cape Town, Western Cape, South Africa | 0.8 |
| Cape Town | Robben Island | Robben Island, Robben Island Village, City of Cape Town, Western Cape, South ... | 12.8 |
| Cape Town | Kirstenbosch National Botanical Garden | Kirstenbosch Botanical Gardens, Newlands, Cape Town, City of Cape Town, Western ... | 8.4 |
| Cape Town | Boulders Beach | Boulders Beach, The Boulders, Cape Town Ward 61, Simon's Town, City of Cape ... | 32.1 |
| Cape Town | Cape Point | Cape Point, Cape Town Ward 61, City of Cape Town, Western Cape, South Africa | 50.1 |
| Cape Town | Groot Constantia | Groot Constantia, Groot Constantia Road, High Constantia, Cape Town Ward 62 ... | 13.4 |
| Cape Town | Bo-Kaap | Bo-Kaap, Bo-Kaap (Schotschekloof), Cape Town Ward 77, Cape Town, City of Cape ... | 1.6 |
| Dubai | Burj Khalifa | Burj Khalifa, Downtown Dubai, Dubai, Dubai Emirate, United Arab Emirates | 17.8 |
| Dubai | The Dubai Mall | The Dubai Mall, Financial Center Street, Burj Khalifa, Downtown Dubai, Dubai ... | 18.7 |
| Dubai | Al Fahidi Historical Neighbourhood | Al Fahidi Historical Neighbourhood, Al Souk Al Kabeer, Dubai, Dubai Emirate ... | 25.4 |
| Dubai | Gold Souk | Gold Souk, Al Ras, Dubai, Dubai Emirate, United Arab Emirates | 25.7 |
| Dubai | Jumeirah Mosque | Jumeirah Mosque, 11th Street, Jumeirah 1, Jumeirah, Dubai, Dubai Emirate ... | 20.5 |
| Dubai | Dubai Frame | Dubai Frame, Jogging track, Bur Dubai, Al Kifaf, Zabeel, Dubai, Dubai Emirate ... | 23.1 |
| Dubai | Dubai Miracle Garden | Dubai Miracle Garden, Al Barsha South 3, Dubai Emirate, United Arab Emirates | 11.9 |

### Searched and left out (86)

| Port | Place | Why |
| --- | --- | --- |
| Puerto Plata (Amber Cove and Taino Bay) | 27 Charcos de Damajagua | rejected: matched only the river, not the falls; also searched as "Damajagua" with no usable match |
| Puerto Plata (Amber Cove and Taino Bay) | Parque Central de Puerto Plata | rejected: matched the central parks of other towns; also searched as "Parque Independencia" with no usable match |
| Road Town, Tortola | Brewers Bay | rejected: matched a bay of the same name on St. Thomas |
| Road Town, Tortola | Mount Healthy National Park | no match; also searched as "Mount Healthy" with no usable match |
| St. John's, Antigua | Dickenson Bay | rejected: matched a hotel; also searched as "Dickenson Bay Beach" with no usable match |
| Castries, St. Lucia | Fort Charlotte | rejected: matched the fort of the same name on St. Vincent |
| Bridgetown, Barbados | Mount Gay Visitor Centre | rejected: matched the hamlet of Mount Gay, not the visitor centre; also searched as "Mount Gay" with no usable match |
| Roseau, Dominica | Dominica Botanic Gardens | no match; also searched as "Botanic Gardens" with no usable match |
| Pointe-à-Pitre, Guadeloupe | Chutes du Carbet | rejected: matched bus stops only |
| Pointe-à-Pitre, Guadeloupe | Plage de la Caravelle | rejected: matched a resort; also searched as "Caravelle" with no usable match |
| Pointe-à-Pitre, Guadeloupe | Marché Saint-Antoine | rejected: matched a monastery in another town; also searched as "Saint-Antoine" with no usable match |
| Kralendijk, Bonaire | Pink Beach | no match |
| Kingstown, St. Vincent | St. Vincent Botanic Gardens | no match; also searched as "Botanic Gardens" with no usable match |
| Kingstown, St. Vincent | Dark View Falls | no match; also searched as "Dark View" with no usable match |
| Scarborough, Tobago | Argyle Waterfall | rejected: matched a parking lot; also searched as "Argyle Falls" with no usable match |
| Acapulco | Capilla de la Paz | no match; also searched as "Capilla Ecuménica de la Paz" with no usable match |
| Manzanillo | Barra de Navidad | rejected: matched a kindergarten |
| Zihuatanejo and Ixtapa | Playa El Palmar | rejected: matched a street |
| La Paz | Malecón de La Paz | rejected: matched a shop |
| La Paz | Museo Regional de Antropología e Historia de Baja California Sur | no match; also searched as "Museo Regional de Antropología" with no usable match |
| Santa Marta | Catedral de Santa Marta | rejected: matched the plaza and a hotel; also searched as "Catedral Basílica de Santa Marta" with no usable match |
| Panama City (Fuerte Amador) | Panamá Viejo | rejected: matched a housing area; also searched as "Conjunto Monumental Histórico de Panamá Viejo" with no usable match |
| Puerto Quetzal (Antigua Guatemala) | Iglesia de La Merced | rejected: matched La Merced church in Guatemala City, not the one in Antigua |
| Puerto Quetzal (Antigua Guatemala) | Parque Central de Antigua Guatemala | no match; also searched as "Parque Central Antigua Guatemala" with no usable match |
| Puerto Quetzal (Antigua Guatemala) | Cerro de la Cruz | rejected: matched a service road |
| Puerto Quetzal (Antigua Guatemala) | Catedral de San José | no result matched the name within 130 km |
| Valparaíso (Santiago) | Plaza de Armas de Santiago | rejected: matched a metro station and nearby buildings |
| Puerto Montt | Saltos del Petrohué | rejected: matched public toilets |
| Buenos Aires | Jardín Japonés | rejected: matched a garden in Escobar, 47 km away |
| Montevideo | Rambla de Montevideo | rejected: matched apartments and a different park |
| Punta del Este | Playa Brava | rejected: matched a beach of the same name in Atlántida |
| Punta del Este | Puerto de Punta del Este | rejected: matched a street |
| Rio de Janeiro | Pão de Açúcar | rejected: matched a peak of the same name in Mangaratiba |
| Charlottetown | Peake's Wharf | no match; also searched as "Peakes Wharf" with no usable match |
| Sydney, Nova Scotia | Big Fiddle | rejected: matched a cape named Fiddle Head; also searched as "Big Fiddle of the Ceilidh" with no usable match |
| Quebec City | Citadelle of Quebec | rejected: matched streets and steps; also searched as "La Citadelle de Québec" with no usable match |
| Mobile | Oakleigh Historic Complex | rejected: matched the historic district, not the house; also searched as "Oakleigh" with no usable match |
| Los Angeles (San Pedro) | Getty Center | rejected: matched the heliport |
| Long Beach | Earl Burns Miller Japanese Garden | rejected: matched a different Japanese garden 40 km away; also searched as "Japanese Garden" with no usable match |
| Cape Liberty (Bayonne) | National September 11 Memorial and Museum | no match; also searched as "National September 11 Memorial" with no usable match |
| Icy Strait Point (Hoonah) | Huna Tribal House | rejected: it stands in Glacier Bay, across the water, with no road from the port; also searched as "Xunaa Shuká Hít" with no usable match |
| Icy Strait Point (Hoonah) | Hoonah Marine Industrial Center | no match |
| Icy Strait Point (Hoonah) | Icy Strait Point | found, but the port was left out: fewer than four places found |
| Icy Strait Point (Hoonah) | Hoonah | found, but the port was left out: fewer than four places found |
| Icy Strait Point (Hoonah) | Spasski River Valley | found, but the port was left out: fewer than four places found |
| Seward | Mount Marathon | rejected: matched a peak 178 km away |
| Seward | Iditarod Trailhead | no match; also searched as "Iditarod Trail" with no usable match |
| Haines | Haines Brewing Company | no match; also searched as "Haines Brewing" with no usable match |
| Kodiak | Alutiiq Museum | no match; also searched as "Alutiiq" with no usable match |
| Prince Rupert, BC | Kwinitsa Railway Station Museum | rejected: matched the old station site 51 km away; also searched as "Kwinitsa" with no usable match |
| Nawiliwili, Kauai | Allerton Garden | no match; also searched as "Allerton" with no usable match |
| Naples | Spaccanapoli | rejected: matched streets under other names |
| Trieste | Roman Theatre of Trieste | rejected: matched a bicycle rental stand; also searched as "Teatro Romano" with no usable match |
| Katakolon (Olympia) | Archaeological Museum of Olympia | no match; also searched as "Archaeological Museum of Ancient Olympia" with no usable match |
| Katakolon (Olympia) | Katakolo Lighthouse | no match |
| Rhodes | Mandraki Harbour | rejected: matched a village on another island; also searched as "Mandraki" with no usable match |
| Chania (Souda Bay), Crete | Venetian Harbour of Chania | no match; also searched as "Old Venetian Harbour" with no usable match |
| Dubrovnik | Rector's Palace | rejected: matched the Rector's Palace on the island of Šipan |
| Split | Salona | rejected: matched the town of Solin, not the ancient site; also searched as "Arheološki park Salona" with no usable match |
| Kotor | Kotor Old Town | rejected: matched apartments and the old town of Budva; also searched as "Stari grad" with no usable match |
| Kotor | Fortress of St. John | no match; also searched as "San Giovanni Fortress" with no usable match |
| Marseille | Cours Mirabeau | rejected: matched a street in Marignane |
| Cannes | La Croisette | rejected: matched a district of Sainte-Maxime |
| Cannes | Le Suquet | rejected: matched a hamlet of Lantosque |
| Palma de Mallorca | Caves of Drach | no match; also searched as "Coves del Drac" with no usable match |
| Valencia | Mercado Central | rejected: matched a market in Almansa |
| Southampton | Tudor House and Garden | rejected: matched a Tudor House in Weymouth; also searched as "Tudor House" with no usable match |
| Helsinki | Kauppatori | rejected: matched the market square of Hämeenlinna |
| Oslo | Vigeland Park | rejected: matched a parking lot and a tram stop; also searched as "Vigelandsparken" with no usable match |
| Stavanger | Stavanger Cathedral | rejected: matched a defibrillator at the church; also searched as "Stavanger domkirke" with no usable match |
| Geiranger | De Syv Søstrene | no match; also searched as "Sju søstrene" with no usable match |
| Geiranger | Storseterfossen | no match |
| Flåm | Flåm Railway Museum | no match; also searched as "Flåmsbana Museet" with no usable match |
| Ålesund | Atlanterhavsparken | rejected: matched a defibrillator |
| Ålesund | Brosundet | rejected: matched a hotel |
| Reykjavík | Geysir | rejected: matched a charging station |
| Rotterdam | Markthal | rejected: matched an events hall in Purmerend |
| Zeebrugge (Bruges) | Grand-Place | rejected: matched the square of Tourcoing, France |
| Le Havre (Normandy) | Omaha Beach | rejected: matched information signs |
| Hamburg | Holstentor | rejected: matched a road in Hanerau-Hademarschen |
| Edinburgh (Leith and South Queensferry) | Royal Mile | rejected: matched streets under other names |
| Greenock (Glasgow) | Glasgow Cathedral | rejected: matched a bicycle rental stand |
| Hong Kong | Tian Tan Buddha | rejected: matched a different monastery and a temple in Guangzhou; also searched as "Big Buddha" with no usable match |
| Kobe (Osaka and Kyoto) | Arima Onsen | rejected: matched the railway stop |
| Busan | Bulguksa | rejected: matched Bulguksa railway station |
| Papeete, Tahiti | Plage de Taharuu | rejected: matched a stream; also searched as "Taharuu" with no usable match |
