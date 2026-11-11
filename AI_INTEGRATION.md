# AI Integration Architecture — TRIPORA AI

## 1. Provider Independence & Adapter Layer

TRIPORA AI implements a provider-independent AI service layer located at `backend/src/integrations/ai/`. The application does not hardcode vendor-specific formats into database records or business controllers.

Supported Providers:
1. **Google Gemini (Default / Recommended)**: Uses `gemini-1.5-flash` with structured JSON output enforcement (`responseMimeType: "application/json"`).
2. **OpenAI-Compatible Providers**: Pluggable via standard chat completions format.
3. **Resilient Dynamic Mock Adapter**: Automatically activates when external credentials are not supplied or when third-party rate limits/timeouts are encountered.

---

## 2. Structured Output Enforcement

To prevent arbitrary hallucinatory outputs or malformed responses, all AI generation prompts enforce a strict JSON schema:

```json
{
  "tripSummary": {
    "destination": "string",
    "tagline": "string",
    "highlights": ["string"]
  },
  "destinations": ["string"],
  "days": [
    {
      "dayNumber": 1,
      "date": "YYYY-MM-DD",
      "theme": "string",
      "notes": "string",
      "activities": [
        {
          "name": "string",
          "description": "string",
          "category": "string",
          "location": { "name": "string", "latitude": 0, "longitude": 0 },
          "timeSlot": "MORNING | AFTERNOON | EVENING",
          "startTime": "HH:MM",
          "endTime": "HH:MM",
          "durationMinutes": 90,
          "estimatedCost": { "amount": 0, "currency": "USD" },
          "transportation": "string",
          "reason": "string"
        }
      ]
    }
  ],
  "budgetBreakdown": {
    "accommodationMinor": 0,
    "activitiesMinor": 0,
    "foodMinor": 0,
    "transportationMinor": 0,
    "currency": "USD"
  },
  "packingSuggestions": ["string"],
  "travelTips": ["string"]
}
```

---

## 3. Telemetry & Cost Monitoring

Every AI operation (`ITINERARY_GENERATION`, `DAY_REGENERATION`, `CHAT_ASSISTANT`, `PACKING_SUGGESTIONS`) records:
- `promptTokens` & `completionTokens`
- Execution latency in milliseconds
- Provider and model names
- Estimated operational cost in USD
- Success or error diagnostics

These records are streamed into the `AIUsage` table and displayed on the Admin Operations Console (`/admin`).
