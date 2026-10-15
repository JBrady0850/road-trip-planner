# Destination catalog

`app/data/catalog.js` holds 49 starter destinations covering all 50 states. Each
destination has a base town (where you would stay), the months it is usually best,
interest tags, and 4 to 7 stops (287 in all) with coordinates and suggested time on site. The
app uses the stops to pack each day to your pace and ranks them by your interests,
so more stops per destination means better drafts.

## Accuracy

Coordinates were checked against OpenStreetMap Nominatim on 2026-10-15; see
`docs/catalog-check.md` for the result of every point. Hours, fees, seasonal road
closures (for example Going-to-the-Sun Road, Trail Ridge Road, Clingmans Dome Road,
and the Blue Ridge Parkway), and timed-entry rules change: verify before travel.

## Add a destination

```js
{id:"xx-unique-id", name:"Display name", states:["XX"], base:["Town, ST", lat, lon],
 months:[5,6,7,8,9], tags:["scenic","hiking"], stops:[
   ["Stop name", "Street address or locality", lat, lon, minutesOnSite, ["scenic"]]
]}
```

Tags: scenic, parks, waterfalls, beach, fishing, water, history, food, lights, hiking,
caves, town. Add `fly:true` for destinations that need a flight.
