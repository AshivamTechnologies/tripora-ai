import { GenerateItineraryInput, GeneratedItineraryResponse } from './ai.types';
import { MockAiProvider } from './mock.provider';

export class GeminiAiProvider {
  private apiKey: string;
  private mockFallback: MockAiProvider;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.mockFallback = new MockAiProvider();
  }

  public async generateItinerary(input: GenerateItineraryInput): Promise<GeneratedItineraryResponse> {
    if (!this.apiKey) {
      return this.mockFallback.generateItinerary(input);
    }

    try {
      const prompt = `You are the lead travel planner for TRIPORA AI.
Generate a structured travel itinerary in strict JSON format.
Trip parameters:
- Origin: ${input.origin}
- Destination: ${input.destination}
- Dates: ${input.startDate} to ${input.endDate}
- Travellers: ${input.adults} adults, ${input.children} children, ${input.infants} infants
- Travel Styles: ${input.travelStyles.join(', ')}
- Total Budget: ${input.currency} ${input.budgetMinor / 100}
- Notes/Preferences: ${input.notes || 'None'}

Return ONLY valid JSON matching this schema:
{
  "tripSummary": {
    "destination": "${input.destination}",
    "tagline": "string",
    "highlights": ["string"]
  },
  "destinations": ["${input.destination}"],
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
          "estimatedCost": { "amount": 0, "currency": "${input.currency}" },
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
    "currency": "${input.currency}"
  },
  "packingSuggestions": ["string"],
  "travelTips": ["string"]
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (!res.ok) {
        console.warn(`[Gemini API] Failed with status ${res.status}, falling back to dynamic generator.`);
        return this.mockFallback.generateItinerary(input);
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        return this.mockFallback.generateItinerary(input);
      }

      const parsed = JSON.parse(rawText);
      return parsed as GeneratedItineraryResponse;
    } catch (err) {
      console.warn('[Gemini API] Error encountered, falling back to mock provider:', err);
      return this.mockFallback.generateItinerary(input);
    }
  }

  public async regenerateDay(destination: string, date: string, dayNumber: number, theme: string): Promise<any> {
    return this.mockFallback.regenerateDay(destination, date, dayNumber, theme);
  }

  public async chatAssistant(message: string, context?: Record<string, any>): Promise<string> {
    if (!this.apiKey) {
      return this.mockFallback.chatAssistant(message, context);
    }

    try {
      const prompt = `You are TRIPORA AI's expert personal travel concierge.
Trip context: Destination is ${context?.destination || 'the trip'}, Dates: ${context?.dates || 'upcoming'}.
User message: "${message}".
Answer in a warm, helpful, editorial, concise tone with actionable travel suggestions.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!res.ok) {
        return this.mockFallback.chatAssistant(message, context);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || this.mockFallback.chatAssistant(message, context);
    } catch {
      return this.mockFallback.chatAssistant(message, context);
    }
  }
}
