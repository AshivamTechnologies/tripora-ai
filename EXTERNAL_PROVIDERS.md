# External Provider Integrations & Fallback Policy

TRIPORA AI integrates with premier travel and cloud infrastructure providers. Every integration adheres to a strict **Dual-Mode Adapter Architecture**:

```
+-----------------------------------------------------------+
|                   External Provider Adapter               |
|                                                           |
|       Is live credential configured?                      |
|                  /           \                            |
|               (YES)          (NO)                         |
|                /               \                          |
|    Execute Live Provider    Activate Dynamic Mock         |
|    (Amadeus / OpenWeather)  Sandbox (Demo Ready)          |
|                |                                          |
|        Network Error?                                     |
|               /                                           |
|            (YES)                                          |
|             /                                             |
|   Circuit Breaker Trips -> Fallback with Clear Log        |
+-----------------------------------------------------------+
```

---

## Provider Inventory

| Service | Recommended Provider | Live Environment Var | Fallback Behavior |
|---|---|---|---|
| **AI Synthesis** | Google Gemini (1.5 Flash) | `GEMINI_API_KEY` | Dynamic multi-day algorithmic generator |
| **Flights** | Amadeus Self-Service API | `AMADEUS_CLIENT_ID`, `AMADEUS_CLIENT_SECRET` | Global multi-carrier sandbox schedules |
| **Hotels** | Amadeus / Booking.com | `AMADEUS_CLIENT_ID` | Curated boutique, villa & resort directory |
| **Weather** | OpenWeatherMap API | `OPENWEATHER_API_KEY` | 5-day seasonal meteorological forecast |
| **Maps & Routes** | Mapbox / OpenStreetMap | `NEXT_PUBLIC_MAPBOX_TOKEN` | Interactive coordinate mapping & route lines |
| **Payments** | Razorpay / Stripe | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Webhook verification architecture |

---

## Provider Circuit Breaker Policy
1. When external request errors exceed 5 consecutive failures within 60 seconds, the circuit trips to `OPEN`.
2. While `OPEN`, requests immediately fail over to the cached/sandbox provider without incurring external network latency.
3. Every 5 minutes, a probe is dispatched (`HALF_OPEN`). Upon success, the circuit resets to `CLOSED`.
