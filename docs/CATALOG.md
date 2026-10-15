# Destination catalog

`app/data/catalog.js` holds 54 starter destinations covering all 50 states. Each
destination has a base town (where you would stay), the months it is usually best,
interest tags, one to three unique experiences, and 4 to 10 stops (338 in all) with
coordinates and suggested time on site. The
app uses the stops to pack each day to your pace and ranks them by your interests,
so more stops per destination means better drafts.

## Accuracy

Coordinates were checked against OpenStreetMap Nominatim on 2026-10-15; see
`docs/catalog-check.md` for the result of every point. Hours, fees, seasonal road
closures (for example Going-to-the-Sun Road, Trail Ridge Road, Clingmans Dome Road,
and the Blue Ridge Parkway), and timed-entry rules change: verify before travel.

Every ocean, Gulf, and Great Lakes state has at least one lighthouse stop (tag
`lighthouses`); Alaska is the exception, with none reachable by road near the Seward
trip. The tests check this, so a new coastal trip should keep it true.

## Add a destination

```js
{id:"xx-unique-id", name:"Display name", states:["XX"], base:["Town, ST", lat, lon],
 months:[5,6,7,8,9], tags:["scenic","hiking"],
 experiences:["Something you can only do here, in plain words (say if it is seasonal)"], stops:[
   ["Stop name", "Street address or locality", lat, lon, minutesOnSite, ["scenic"]]
]}
```

Tags: scenic, parks, waterfalls, beach, lighthouses, fishing, water, history, food,
lights, hiking, caves, town. Add `fly:true` for destinations that need a flight.

Addresses: use a house number only when OpenStreetMap gives both the number and the
road. Otherwise write the place name and town ("Marblehead Lighthouse, Marblehead,
OH"); map links search the address first, and a guessed number can send a driver to
the wrong spot.
