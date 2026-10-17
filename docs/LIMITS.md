# Known limits and how the app handles them

| Limit | What happens | What the app does |
|---|---|---|
| Google Maps app takes at most 9 waypoints per route | Extra stops are dropped | Splits a day into consecutive parts that share an endpoint |
| A Waze link takes one destination | No multi-stop Waze route | One Waze link per stop, in travel order |
| The Google Maps phone app does not draw Google My Maps routes | You see pins only | Use the per-day Google Maps links on the road; My Maps is for planning on a computer |
| My Maps imports one layer per file, KML up to 5 MB, and may drop folders or MultiGeometry | Routes can fail to import | One KML per day with a single LineString and no folders |
| Public OSRM demo server is for light use and has no traffic data | Drive times run optimistic | Plan checker warns within 30 minutes of the cap; set your own OSRM server in Settings for heavy use |
| NWS forecasts reach about 7 days ahead | Far-off dates show no forecast | Shows "Not yet available"; check again 48 hours before you leave |
| OpenStreetMap place search allows about 1 request per second | Fast typing can be throttled | Searches are queued one per second; if you search a lot, add the optional contact email in Settings (no sign-up) |
| Catalog hours, fees, and seasonal road closures change | A stop can be closed | Every itinerary says to verify; the AI prompt marks unverified details |
| Straight-line drive estimates in the destination list | Mountain routes take longer | Check drive times replaces estimates with routed times |
| Data lives in one browser on one device | Clearing site data erases it | Settings, Back up all data; restore on any device |
| No ratings for places | The app cannot say how highly a place is rated | The free services the app uses carry no ratings; rating services need paid keys. The catalog lists widely known, visitor-open places instead |
| Posting feedback on GitHub needs a free account | Some testers cannot post | Save as a file or Copy text on the Feedback card |
| Alaska has no lighthouse stop | Lighthouse fans see none there | None near the Seward trip can be reached by road |
| A town you type in City is not in the catalog | The app has no hand-picked places for it | It finds the town on OpenStreetMap and builds the trip from catalog places within about an hour's drive (an estimate; mountain roads take longer). A town with none nearby gets free days to fill with the search box |
| Camping and RV parks marks parks with a campground nearby | The itinerary still books a hotel each night | Book campsites on the park's own site or [Recreation.gov](https://www.recreation.gov) and change the hotel stops to your campground |
| Fishing rules, ages, seasons, and fees differ by state, and national parks can set their own | A state license may not be enough everywhere | Each fishing trip links the state's official license page; check the park's rules too |
| Cruise Day times and prices are estimates | A plan can run longer than shown, and a price can be higher | Drive times use about 30 mph on port roads; driver and rental prices are rough ranges; every plan shows the minutes to spare and says to confirm times with the ship and prices with the seller |
| Whether a ship docks or uses tender boats changes by call | A tender port can need more time ashore than the plan allows | Tender ports add 30 minutes each way, ports that may tender add 15, and the page says to confirm on the ship's daily schedule (sources: docs/catalog-check.md) |
| The app cannot read cruise line booking systems | It cannot show excursion prices or space | It links each line's public excursion page and web searches; you book there |
| Some port points are the town or harbor, not the pier | Distances can be off by a few miles | The Cruise Day page shows times as estimates; the itinerary's Ship stop uses the point as coordinates, so confirm the berth on the ship's schedule |
| Spas, golf, music, and other businesses change hours, owners, or names | A place can close | The catalog favors long-running, well-known places; every itinerary says to verify |
