@echo off
rem Road Trip Planner: double-click to start on Windows.
cd /d "%~dp0"
where py >nul 2>nul && (py -3 desktop\roadtrip_desktop.py & goto :eof)
where python >nul 2>nul && (python desktop\roadtrip_desktop.py & goto :eof)
echo Python 3 was not found. Opening the app directly in your browser instead.
echo (Install Python from https://www.python.org/downloads/ for the full desktop version.)
start "" "%~dp0app\index.html"
pause
