# Known Limitations & External Boundaries — TRIPORA AI

1. **Commercial Travel API Approvals**:
   - Live production airline ticketing and automated PNR creation require IATA/ARC accreditation and commercial carrier agreements. TRIPORA AI connects through Amadeus self-service APIs and verified direct handoff links, transparently informing travelers that bookings are completed on the carrier portal.
2. **Weather Forecast Horizons**:
   - Meteorological data beyond a 14-day window is based on historical seasonal climate averages rather than pinpoint daily radar predictions.
3. **Third-Party Rate Limits**:
   - Free tiers of third-party APIs (such as OpenWeather or Amadeus) enforce strict requests-per-minute limits. TRIPORA AI's internal circuit breakers and cache layer shield the user from encountering unhandled errors.
