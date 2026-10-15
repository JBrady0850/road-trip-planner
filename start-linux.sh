#!/bin/sh
# Road Trip Planner: start on Linux.
cd "$(dirname "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  exec python3 desktop/roadtrip_desktop.py "$@"
fi
echo "Python 3 was not found. Opening the app directly in your browser instead."
xdg-open "app/index.html"
