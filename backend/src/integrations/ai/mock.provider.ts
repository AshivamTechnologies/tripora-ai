import { GenerateItineraryInput, GeneratedItineraryResponse } from './ai.types';

export class MockAiProvider {
  public async generateItinerary(input: GenerateItineraryInput): Promise<GeneratedItineraryResponse> {
    const s = new Date(input.startDate).getTime();
    const e = new Date(input.endDate).getTime();
    const dayCount = Math.max(1, Math.min(Math.round((e - s) / (1000 * 3600 * 24)) + 1, 14));

    const destination = input.destination;
    const styles = input.travelStyles.length > 0 ? input.travelStyles.join(', ') : 'Cultural & Sightseeing';

    const days = [];
    for (let i = 0; i < dayCount; i++) {
      const dayDate = new Date(s + i * 86400000).toISOString().slice(0, 10);
      const isFirst = i === 0;
      const isLast = i === dayCount - 1;

      let theme = `Highlights of ${destination} - Day ${i + 1}`;
      if (isFirst) theme = `Arrival & Settling in ${destination}`;
      if (isLast) theme = `Farewell & Memorable Discoveries`;

      days.push({
        dayNumber: i + 1,
        date: dayDate,
        theme,
        notes: `Enjoy a balanced pace with time for local food and scenic exploration.`,
        activities: [
          {
            name: isFirst ? `Check-in & Historic Old Town Stroll` : `Morning Cultural Discovery in ${destination}`,
            description: `Start the day exploring top landmarks, traditional architecture, and vibrant local streets.`,
            category: 'Attraction',
            location: {
              name: `${destination} Central Quarter`,
              latitude: 0,
              longitude: 0,
            },
            timeSlot: 'MORNING' as const,
            startTime: '09:30',
            endTime: '12:00',
            durationMinutes: 150,
            estimatedCost: {
              amount: Math.round((input.budgetMinor / (dayCount * 3)) * 0.3),
              currency: input.currency,
            },
            transportation: 'Walk or short metro ride',
            reason: `Matches your travel style: ${styles}`,
          },
          {
            name: `Afternoon Scenic Experience & Local Market`,
            description: `Immerse in local crafts, artisanal street food, and panoramic viewpoint photography.`,
            category: 'Activity',
            location: {
              name: `${destination} Panorama Point`,
              latitude: 0,
              longitude: 0,
            },
            timeSlot: 'AFTERNOON' as const,
            startTime: '13:30',
            endTime: '16:30',
            durationMinutes: 180,
            estimatedCost: {
              amount: Math.round((input.budgetMinor / (dayCount * 3)) * 0.4),
              currency: input.currency,
            },
            transportation: 'Local transport',
            reason: `Highly rated experience tailored to ${input.adults} adult(s)`,
          },
          {
            name: `Authentic Dinner & Evening Atmosphere`,
            description: `Savor culinary specialties, local desserts, and an ambient evening walk.`,
            category: 'Dining',
            location: {
              name: `${destination} Promenade`,
              latitude: 0,
              longitude: 0,
            },
            timeSlot: 'EVENING' as const,
            startTime: '19:00',
            endTime: '21:00',
            durationMinutes: 120,
            estimatedCost: {
              amount: Math.round((input.budgetMinor / (dayCount * 3)) * 0.3),
              currency: input.currency,
            },
            transportation: 'Leisurely walk',
            reason: `Curated dining with authentic local flavor`,
          },
        ],
      });
    }

    return {
      tripSummary: {
        destination,
        tagline: `An unforgettable journey crafted for ${styles}`,
        highlights: [
          `Signature highlights and hidden gems of ${destination}`,
          `Paced for ${input.adults} traveller(s) with daily morning, afternoon, and evening slots`,
          `Transparent budget allocation tailored to ${input.currency} ${Math.round(input.budgetMinor / 100)}`,
        ],
      },
      destinations: [destination],
      days,
      budgetBreakdown: {
        accommodationMinor: Math.round(input.budgetMinor * 0.4),
        activitiesMinor: Math.round(input.budgetMinor * 0.25),
        foodMinor: Math.round(input.budgetMinor * 0.2),
        transportationMinor: Math.round(input.budgetMinor * 0.15),
        currency: input.currency,
      },
      packingSuggestions: [
        'Weather-appropriate clothing in breathable layers',
        'Comfortable broken-in walking shoes',
        'Universal power travel adapter',
        'Compact reusable water bottle',
        'Digital copies of travel insurance & itinerary',
      ],
      travelTips: [
        'Carry a small amount of local currency for small vendors.',
        'Reserve popular museum and heritage site tickets in advance.',
        'Use local rideshare or public transit passes for efficient transit.',
      ],
    };
  }

  public async regenerateDay(destination: string, date: string, dayNumber: number, theme: string): Promise<any> {
    return {
      dayNumber,
      date,
      theme: `Refreshed ${theme}`,
      notes: `Freshly curated activities with alternative viewpoints and dining options.`,
      activities: [
        {
          name: `Curated Morning Heritage Walk in ${destination}`,
          description: `Discover serene botanical paths and historic landmark viewpoints away from the main rush.`,
          category: 'Cultural Landmark',
          location: `${destination} Old Quarter`,
          timeSlot: 'MORNING',
          startTime: '09:00',
          endTime: '11:30',
          durationMinutes: 150,
          estimatedCostMinor: 2500,
          currency: 'USD',
          transportation: 'Walk',
          position: 0,
        },
        {
          name: `Artisanal Craft Workshop & Tea Tasting`,
          description: `Interactive cultural session guided by local master artisans.`,
          category: 'Workshop',
          location: `${destination} Arts District`,
          timeSlot: 'AFTERNOON',
          startTime: '13:30',
          endTime: '15:30',
          durationMinutes: 120,
          estimatedCostMinor: 3500,
          currency: 'USD',
          transportation: 'Short taxi',
          position: 0,
        },
        {
          name: `Rooftop Sunset Tasting Dinner`,
          description: `Sunset dining overlooking the illuminated cityscape and waterfront.`,
          category: 'Dining',
          location: `${destination} High View`,
          timeSlot: 'EVENING',
          startTime: '18:30',
          endTime: '20:30',
          durationMinutes: 120,
          estimatedCostMinor: 6000,
          currency: 'USD',
          transportation: 'Walk',
          position: 0,
        },
      ],
    };
  }

  public async chatAssistant(message: string, context?: Record<string, any>): Promise<string> {
    const dest = context?.destination || 'your destination';
    const lower = message.toLowerCase();

    if (lower.includes('weather') || lower.includes('forecast')) {
      return `For ${dest}, expect moderate pleasant temperatures with clear skies in the morning and mild breezes in the afternoon. We recommend packing light layers and a compact umbrella just in case!`;
    }
    if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap')) {
      return `To optimize your budget in ${dest}: 1) Eat at neighborhood bistros/warungs away from main squares; 2) Take advantage of multi-day transit passes; 3) Reserve attraction tickets online in advance to avoid surge pricing!`;
    }
    if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat')) {
      return `In ${dest}, don't miss local specialties! For lunch, try regional market stalls for freshness and value. For dinner, reserving an artisanal family-run restaurant will give you the most memorable flavors.`;
    }
    return `I am your TRIPORA AI Travel Assistant for ${dest}! I can help optimize your day-by-day plan, find budget alternatives, recommend hidden attractions, and suggest weather-appropriate backup activities. What would you like to explore next?`;
  }
}
