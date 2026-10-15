# Roadmap

Planned for later versions, in suggested order:

1. **Road closures and work zones:** read state Work Zone Data Exchange (WZDx) feeds
   from the USDOT feed registry and NPS alerts (free NPS API key) and flag closures on
   a planned route. Coverage varies by state.
2. **Fuel prices:** weekly regional retail gasoline prices from the EIA open data API
   (free key) instead of a typed price.
3. **GPX export** for offline navigation apps.
4. **Scheduled reminders:** a GitHub Actions workflow that emails a pre-trip reminder
   48 hours before departure and a morning brief each trip day, with credentials in
   GitHub Secrets.
5. **Claude skill package:** the master prompt and engine packaged as a Claude skill
   so an assistant can run the interview, the checks, and the exports.
6. More catalog destinations and community contributions (see CATALOG.md). The
   thinnest entries were deepened in October 2026; six to eight stops per entry is
   the target.
