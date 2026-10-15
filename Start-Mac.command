#!/bin/bash
# Road Trip Planner: double-click to start on macOS (first time: right-click, Open).
cd "$(dirname "$0")"
if command -v python3 >/dev/null 2>&1; then
  python3 desktop/roadtrip_desktop.py
else
  echo "Python 3 was not found. Opening the app directly in your browser instead."
  open "app/index.html"
fi
