# Catalog coordinate check (2026-10-15)

Every base town and stop (236 points) was geocoded with OpenStreetMap Nominatim and
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

Still UNVERIFIED (coordinates from published park maps, not matched in
OpenStreetMap by name): Cumberland Falls State Resort Park, Trail Ridge Road Alpine
Visitor Center, Painted Canyon overlook, South Unit Scenic Loop, North Unit River
Bend Overlook, Punaluu Black Sand Beach. Use the Trip tab "Find location" button to
confirm these before travel.
