# Suggest a change

Road Trip Planner gets better when travelers say what worked and what did not. You
do not need to write code to help.

## Tell us how it went

| You want to | Do this |
|---|---|
| Send feedback after testing | In the app, open **Feedback**, answer what you like, and tap **Open on GitHub**. The form fills in for you. |
| Report something that did not work | [Report a problem](https://github.com/JBrady0850/road-trip-planner/issues/new?template=bug-report.yml) |
| Suggest a feature or a destination | [Suggest an improvement](https://github.com/JBrady0850/road-trip-planner/issues/new?template=suggest-improvement.yml) |
| Talk an idea through first | [Ideas discussions](https://github.com/JBrady0850/road-trip-planner/discussions/categories/ideas) |

Posting on GitHub needs a free GitHub account. No account? In the app, tap **Save as
a file** on the Feedback card and send the file to the person who asked you to test.

These pages are public. Leave out your home address, phone number, email address,
and booking or confirmation numbers.

## Send a code or catalog change

1. Fork the repository and make your change on a branch.
2. Keep the app plain: classic scripts, no build step, and it must still open from
   `app/index.html` on a computer with no server.
3. New destinations go in `app/data/catalog.js` (see `docs/CATALOG.md`). Check every
   point against OpenStreetMap and note the result in `docs/catalog-check.md`.
4. Run the tests and open a pull request:

```
python -m pytest -q
python tests/ui_smoke.py
python tests/tablet_smoke.py
python tests/save_smoke.py
```

## Writing style

Plain words for travelers who are not technical, short sentences, and no personal
data in examples (the sample traveler is "Sam" from Knoxville, TN).
