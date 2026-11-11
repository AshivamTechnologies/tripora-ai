export interface GenerateItineraryInput {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  infants: number;
  travelStyles: string[];
  budgetMinor: number;
  currency: string;
  notes?: string;
  preferences?: Record<string, any>;
}

export interface GeneratedActivity {
  name: string;
  description: string;
  category: string;
  location: {
    name: string;
    latitude?: number;
    longitude?: number;
  };
  timeSlot: 'MORNING' | 'AFTERNOON' | 'EVENING';
  startTime: string;
  endTime: string;
  durationMinutes: number;
  estimatedCost: {
    amount: number; // in minor units
    currency: string;
  };
  transportation: string;
  reason: string;
}

export interface GeneratedDay {
  dayNumber: number;
  date: string;
  theme: string;
  notes: string;
  activities: GeneratedActivity[];
}

export interface GeneratedItineraryResponse {
  tripSummary: {
    destination: string;
    tagline: string;
    highlights: string[];
  };
  destinations: string[];
  days: GeneratedDay[];
  budgetBreakdown: {
    accommodationMinor: number;
    activitiesMinor: number;
    foodMinor: number;
    transportationMinor: number;
    currency: string;
  };
  packingSuggestions: string[];
  travelTips: string[];
}
