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

Shore excursion pages were opened on 2026-10-17 with a page reader. The reader does not report redirects, so the address a visitor finally lands on is UNVERIFIED. Viator and GetYourGuide blocked the reader (robots rules), so the app links only to the nine cruise lines below and to web and map searches.

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
