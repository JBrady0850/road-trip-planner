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
