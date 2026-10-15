# Known limits and how the app handles them

| Limit | What happens | What the app does |
|---|---|---|
| Google Maps app takes at most 9 waypoints per route | Extra stops are dropped | Splits a day into consecutive parts that share an endpoint |
| A Waze link takes one destination | No multi-stop Waze route | One Waze link per stop, in travel order |
| The Google Maps phone app does not draw Google My Maps routes | You see pins only | Use the per-day Google Maps links on the road; My Maps is for planning on a computer |
| My Maps imports one layer per file, KML up to 5 MB, and may drop folders or MultiGeometry | Routes can fail to import | One KML per day with a single LineString and no folders |
| Public OSRM demo server is for light use and has no traffic data | Drive times run optimistic | Plan checker warns within 30 minutes of the cap; set your own OSRM server in Settings for heavy use |
| NWS forecasts reach about 7 days ahead | Far-off dates show no forecast | Shows "Not yet available"; check again 48 hours before you leave |
| OpenStreetMap place search allows about 1 request per second | Fast typing can be throttled | Searches are queued one per second; add a contact email in Settings |
| Catalog hours, fees, and seasonal road closures change | A stop can be closed | Every itinerary says to verify; the AI prompt marks unverified details |
| Straight-line drive estimates in the destination list | Mountain routes take longer | Route check replaces estimates with routed times |
| Data lives in one browser on one device | Clearing site data erases it | Settings, Back up all data; restore on any device |
| No ratings for places | The app cannot say how highly a place is rated | The free services the app uses carry no ratings; rating services need paid keys. The catalog lists widely known, visitor-open places instead |
| Posting feedback on GitHub needs a free account | Some testers cannot post | Save as a file or Copy text on the Feedback card |
| Alaska has no lighthouse stop | Lighthouse fans see none there | None near the Seward trip can be reached by road |
