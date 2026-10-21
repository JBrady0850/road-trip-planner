# Destination catalog

`app/data/catalog.js` holds 54 starter destinations covering all 50 states. Each
destination has a base town (where you would stay), the months it is usually best,
interest tags, one to three unique experiences, and 5 to 13 stops (444 in all) with
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

Every interest has places in at least five trips (the tests check this too), so every
chip changes the ranking. A few tags follow a rule:

- `camping`: an outdoor stop with a named campground or RV park in OpenStreetMap
  within 3 km.
- `fishing`: lakes, rivers, streams, and piers where fishing is a common activity.
  Picking Fishing shows each state's official license page (`data/states.js`).
- `golf`: golf courses, plus the nearest named public disc golf course in
  OpenStreetMap, within 25 km of the base town.
- A tag from the newer interests (wildlife, gardens, camping, golf, music, drinks,
  art, themeparks, family, spa, markets) on any stop also goes on its destination.

## Add a destination

```js
{id:"xx-unique-id", name:"Display name", states:["XX"], base:["Town, ST", lat, lon],
 months:[5,6,7,8,9], tags:["scenic","hiking"],
 experiences:["Something you can only do here, in plain words (say if it is seasonal)"], stops:[
   ["Stop name", "Street address or locality", lat, lon, minutesOnSite, ["scenic"]]
]}
```

Tags (24, the same keys as the interest chips): scenic, parks, hiking, waterfalls,
caves, wildlife, gardens, camping, golf, beach, lighthouses, water, fishing, history,
town, food, music, drinks, art, themeparks, family, spa, markets, lights. Add
`fly:true` for destinations that need a flight.

Addresses: use a house number only when OpenStreetMap gives both the number and the
road. Otherwise write the place name and town ("Marblehead Lighthouse, Marblehead,
OH"); map links search the address first, and a guessed number can send a driver to
the wrong spot.

## Cruise ports

`app/data/ports.js` holds 192 cruise ports with 1273 places near them, in the same stop
format as the catalog (name, address, latitude, longitude, minutes on site, interest
tags). A port also carries whether ships there usually dock (`pier`), usually use
tender boats (`tender`), may do either (`varies`), or are not confirmed (`unknown`),
whether traffic drives on the left, its country code (`cc`), and other names a
traveler may type (`aka`, so "Rome" finds Civitavecchia). Places were searched on OpenStreetMap
Nominatim and kept only when the match fit the name; the checks and the places left
out are in [catalog-check.md](catalog-check.md). Each port has at least four places.
