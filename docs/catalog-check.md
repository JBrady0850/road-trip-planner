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

