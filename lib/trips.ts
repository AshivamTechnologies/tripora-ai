import { api } from '@/lib/api';

export const TRAVEL_STYLES = [
  'Adventure',
  'Luxury',
  'Budget',
  'Family',
  'Romantic',
  'Solo',
  'Cultural',
  'Nature',
  'Business',
  'Relaxation',
  'Food exploration',
] as const;

export type TravelStyle = (typeof TRAVEL_STYLES)[number];

export const TIME_SLOTS = [
  { value: 'MORNING', label: 'Morning', hint: 'Before 12 PM' },
  { value: 'AFTERNOON', label: 'Afternoon', hint: '12 PM to 5 PM' },
  { value: 'EVENING', label: 'Evening', hint: 'After 5 PM' },
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number]['value'];

const TIME_SLOT_ORDER: Record<TimeSlot, number> = { MORNING: 0, AFTERNOON: 1, EVENING: 2 };

export type TripPreferences = {
  accommodation?: string;
  transport?: string;
  pace?: string;
  food?: string;
  activities?: string;
  accessibility?: string;
  avoid?: string;
  specialRequests?: string;
  otherDestinations?: string[];
  flexibleDates?: boolean;
  budgetScope?: 'PER_PERSON' | 'GROUP';
};

export type TripRecord = {
  id: string;
  title: string;
  origin: string;
  destination: string;
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  infants: number;
  travel_styles: string[];
  budget_minor: number;
  currency: string;
  notes: string;
  preferences: TripPreferences;
  created_at: string;
};

export type ActivityRecord = {
  id: string;
  trip_id: string;
  trip_day_id: string;
  title: string;
  description: string;
  location: string;
  time_slot: TimeSlot;
  start_time: string | null;
  duration_minutes: number | null;
  estimated_cost_minor: number;
  position: number;
};

export type DayWithActivities = {
  id: string;
  trip_id: string;
  day_number: number;
  day_date: string;
  activities: ActivityRecord[];
};

export type TripDetail = TripRecord & { days: DayWithActivities[] };

export type TripStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED';

export type NewTripInput = {
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  infants: number;
  travelStyles: string[];
  budgetMinor: number;
  currency: string;
  notes: string;
  preferences: TripPreferences;
};

export type ActivityFields = {
  title: string;
  description: string;
  location: string;
  timeSlot: TimeSlot;
  startTime: string | null;
  durationMinutes: number | null;
  estimatedCostMinor: number;
};

export function getTripStatus(trip: Pick<TripRecord, 'start_date' | 'end_date'>, todayISO: string): TripStatus {
  if (todayISO < trip.start_date) return 'UPCOMING';
  if (todayISO > trip.end_date) return 'COMPLETED';
  return 'ONGOING';
}

export function compareActivities(a: ActivityRecord, b: ActivityRecord): number {
  const slotDiff = TIME_SLOT_ORDER[a.time_slot] - TIME_SLOT_ORDER[b.time_slot];
  if (slotDiff !== 0) return slotDiff;
  return a.position - b.position;
}

// In-memory / local storage cache for trips
function getLocalTrips(): TripDetail[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('tripora_local_trips');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }

  // Pre-seed default trip
  const defaultTrip: TripDetail = {
    id: 'trip-bali-001',
    title: 'Bali Cultural & Nature Escape',
    origin: 'San Francisco (SFO)',
    destination: 'Bali, Indonesia',
    start_date: '2026-11-20',
    end_date: '2026-11-26',
    adults: 2,
    children: 0,
    infants: 0,
    travel_styles: ['Cultural', 'Nature', 'Food exploration'],
    budget_minor: 250000,
    currency: 'USD',
    notes: 'Focus on Ubud culture, rice terraces, and quiet coastal sunsets.',
    preferences: {
      pace: 'Balanced',
      accommodation: 'Boutique eco-resort',
      transport: 'Private driver & scooter',
    },
    created_at: new Date().toISOString(),
    days: [
      {
        id: 'day-1',
        trip_id: 'trip-bali-001',
        day_number: 1,
        day_date: '2026-11-20',
        activities: [
          {
            id: 'act-1-1',
            trip_id: 'trip-bali-001',
            trip_day_id: 'day-1',
            title: 'Arrive at Ngurah Rai International Airport (DPS)',
            description: 'Private driver pickup and transfer through scenic Gianyar to Ubud hotel.',
            location: 'Denpasar DPS Airport',
            time_slot: 'MORNING',
            start_time: '10:30',
            duration_minutes: 90,
            estimated_cost_minor: 3000,
            position: 0,
          },
          {
            id: 'act-1-2',
            trip_id: 'trip-bali-001',
            trip_day_id: 'day-1',
            title: 'Sacred Monkey Forest Walk',
            description: 'Stroll among ancient mossy banyan trees and observe Balinese macaques.',
            location: 'Monkey Forest Sanctuary, Ubud',
            time_slot: 'AFTERNOON',
            start_time: '14:30',
            duration_minutes: 90,
            estimated_cost_minor: 1500,
            position: 0,
          },
          {
            id: 'act-1-3',
            trip_id: 'trip-bali-001',
            trip_day_id: 'day-1',
            title: 'Welcome Dinner at Locavore Next Door',
            description: 'Contemporary Indonesian dinner highlighting sustainable Balinese ingredients.',
            location: 'Jl. Dewisita, Ubud',
            time_slot: 'EVENING',
            start_time: '19:00',
            duration_minutes: 120,
            estimated_cost_minor: 7500,
            position: 0,
          },
        ],
      },
      {
        id: 'day-2',
        trip_id: 'trip-bali-001',
        day_number: 2,
        day_date: '2026-11-21',
        activities: [
          {
            id: 'act-2-1',
            trip_id: 'trip-bali-001',
            trip_day_id: 'day-2',
            title: 'Sunrise Walk at Tegallalang Rice Terraces',
            description: 'Watch morning sunbeams cut through palm groves over the world-famous UNESCO Subak terraces.',
            location: 'Tegallalang, Gianyar',
            time_slot: 'MORNING',
            start_time: '06:30',
            duration_minutes: 120,
            estimated_cost_minor: 1000,
            position: 0,
          },
          {
            id: 'act-2-2',
            trip_id: 'trip-bali-001',
            trip_day_id: 'day-2',
            title: 'Tirta Empul Holy Water Temple Purification',
            description: 'Participate respectfully in the traditional Balinese melukat cleansing ritual.',
            location: 'Tampaksiring, Gianyar',
            time_slot: 'AFTERNOON',
            start_time: '13:00',
            duration_minutes: 120,
            estimated_cost_minor: 2000,
            position: 0,
          },
        ],
      },
    ],
  };

  localStorage.setItem('tripora_local_trips', JSON.stringify([defaultTrip]));
  return [defaultTrip];
}

function saveLocalTrips(trips: TripDetail[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tripora_local_trips', JSON.stringify(trips));
  }
}

export async function listTrips(): Promise<TripRecord[]> {
  const token = typeof window !== 'undefined' ? api.getToken() : null;
  if (token && !token.startsWith('token-')) {
    try {
      const data = await api.request<any[]>('/trips');
      if (data && Array.isArray(data)) {
        return data.map((t) => ({
          id: t.id,
          title: t.title,
          origin: t.origin,
          destination: t.destination,
          start_date: t.startDate ? t.startDate.slice(0, 10) : t.start_date,
          end_date: t.endDate ? t.endDate.slice(0, 10) : t.end_date,
          adults: t.adults,
          children: t.children,
          infants: t.infants,
          travel_styles: Array.isArray(t.travelStyles) ? t.travelStyles : (t.travel_styles || []),
          budget_minor: t.budgetMinor || t.budget_minor || 0,
          currency: t.currency || 'USD',
          notes: t.notes || '',
          preferences: t.preferences || {},
          created_at: t.createdAt || t.created_at || new Date().toISOString(),
        }));
      }
    } catch {}
  }

  const local = getLocalTrips();
  return local.map(({ days, ...rest }) => rest);
}

export async function getTripDetail(tripId: string): Promise<TripDetail | null> {
  const token = typeof window !== 'undefined' ? api.getToken() : null;
  if (token && !token.startsWith('token-')) {
    try {
      const data = await api.request<any>(`/trips/${tripId}`);
      if (data?.trip) {
        const trip = data.trip;
        const days = (data.itinerary?.days || []).map((d: any) => ({
          id: d.id,
          trip_id: trip.id,
          day_number: d.dayNumber,
          day_date: d.date ? d.date.slice(0, 10) : d.day_date,
          activities: (d.activities || []).map((a: any) => ({
            id: a.id,
            trip_id: trip.id,
            trip_day_id: d.id,
            title: a.title,
            description: a.description || '',
            location: a.location || '',
            time_slot: a.timeSlot || a.time_slot || 'MORNING',
            start_time: a.startTime || a.start_time || null,
            duration_minutes: a.durationMinutes || a.duration_minutes || null,
            estimated_cost_minor: a.estimatedCostMinor || a.estimated_cost_minor || 0,
            position: a.position || 0,
          })),
        }));

        return {
          id: trip.id,
          title: trip.title,
          origin: trip.origin,
          destination: trip.destination,
          start_date: trip.startDate ? trip.startDate.slice(0, 10) : trip.start_date,
          end_date: trip.endDate ? trip.endDate.slice(0, 10) : trip.end_date,
          adults: trip.adults,
          children: trip.children,
          infants: trip.infants,
          travel_styles: Array.isArray(trip.travelStyles) ? trip.travelStyles : (trip.travel_styles || []),
          budget_minor: trip.budgetMinor || trip.budget_minor || 0,
          currency: trip.currency || 'USD',
          notes: trip.notes || '',
          preferences: trip.preferences || {},
          created_at: trip.createdAt || trip.created_at || new Date().toISOString(),
          days,
        };
      }
    } catch {}
  }

  const local = getLocalTrips();
  const found = local.find((t) => t.id === tripId);
  return found || null;
}

export async function createTrip(input: NewTripInput): Promise<string> {
  try {
    const res = await api.request<any>('/trips', {
      method: 'POST',
      body: JSON.stringify({
        destination: input.destination,
        origin: input.origin,
        startDate: input.startDate,
        endDate: input.endDate,
        adults: input.adults,
        children: input.children,
        infants: input.infants,
        travelStyles: input.travelStyles,
        budgetMinor: input.budgetMinor,
        currency: input.currency,
        notes: input.notes,
        preferences: input.preferences,
      }),
    });
    if (res?.id) {
      // Also initiate background AI generation
      api.request(`/trips/${res.id}/itinerary/generate`, { method: 'POST' }).catch(() => {});
      return res.id;
    }
  } catch {}

  // Local fallback
  const newId = `trip-${Date.now()}`;
  const s = new Date(input.startDate).getTime();
  const e = new Date(input.endDate).getTime();
  const count = Math.max(1, Math.min(Math.round((e - s) / 86400000) + 1, 30));

  const days: DayWithActivities[] = [];
  for (let i = 0; i < count; i++) {
    const dStr = new Date(s + i * 86400000).toISOString().slice(0, 10);
    days.push({
      id: `day-${newId}-${i + 1}`,
      trip_id: newId,
      day_number: i + 1,
      day_date: dStr,
      activities: [
        {
          id: `act-${newId}-${i + 1}-1`,
          trip_id: newId,
          trip_day_id: `day-${newId}-${i + 1}`,
          title: i === 0 ? `Arrival & Welcome in ${input.destination}` : `Explore Highlights of ${input.destination}`,
          description: `Curated discovery session matching ${input.travelStyles.join(', ') || 'your preferences'}.`,
          location: `${input.destination} Center`,
          time_slot: 'MORNING',
          start_time: '09:30',
          duration_minutes: 120,
          estimated_cost_minor: Math.round(input.budgetMinor / (count * 3)),
          position: 0,
        },
      ],
    });
  }

  const newTrip: TripDetail = {
    id: newId,
    title: `${input.destination} Adventure`,
    origin: input.origin,
    destination: input.destination,
    start_date: input.startDate,
    end_date: input.endDate,
    adults: input.adults,
    children: input.children,
    infants: input.infants,
    travel_styles: input.travelStyles,
    budget_minor: input.budgetMinor,
    currency: input.currency,
    notes: input.notes,
    preferences: input.preferences,
    created_at: new Date().toISOString(),
    days,
  };

  const trips = getLocalTrips();
  trips.push(newTrip);
  saveLocalTrips(trips);
  return newId;
}

export async function deleteTrip(tripId: string): Promise<void> {
  try {
    await api.request(`/trips/${tripId}`, { method: 'DELETE' });
  } catch {}

  const trips = getLocalTrips().filter((t) => t.id !== tripId);
  saveLocalTrips(trips);
}

export async function createActivity(
  tripId: string,
  dayId: string,
  fields: ActivityFields,
  position: number
): Promise<ActivityRecord> {
  try {
    const res = await api.request(`/trips/${tripId}/itinerary/activities`, {
      method: 'POST',
      body: JSON.stringify({
        dayId,
        title: fields.title,
        description: fields.description,
        location: fields.location,
        timeSlot: fields.timeSlot,
        startTime: fields.startTime,
        durationMinutes: fields.durationMinutes,
        estimatedCostMinor: fields.estimatedCostMinor,
      }),
    });
    if (res?.id) {
      return {
        id: res.id,
        trip_id: tripId,
        trip_day_id: dayId,
        title: res.title,
        description: res.description,
        location: res.location,
        time_slot: res.timeSlot,
        start_time: res.startTime,
        duration_minutes: res.durationMinutes,
        estimated_cost_minor: res.estimatedCostMinor,
        position,
      };
    }
  } catch {}

  const newAct: ActivityRecord = {
    id: `act-${Date.now()}`,
    trip_id: tripId,
    trip_day_id: dayId,
    title: fields.title,
    description: fields.description,
    location: fields.location,
    time_slot: fields.timeSlot,
    start_time: fields.startTime,
    duration_minutes: fields.durationMinutes,
    estimated_cost_minor: fields.estimatedCostMinor,
    position,
  };

  const trips = getLocalTrips();
  const trip = trips.find((t) => t.id === tripId);
  if (trip) {
    const day = trip.days.find((d) => d.id === dayId);
    if (day) day.activities.push(newAct);
    saveLocalTrips(trips);
  }

  return newAct;
}

export async function updateActivity(
  activityId: string,
  fields: ActivityFields,
  position: number
): Promise<void> {
  const trips = getLocalTrips();
  for (const t of trips) {
    for (const d of t.days) {
      const idx = d.activities.findIndex((a) => a.id === activityId);
      if (idx !== -1) {
        d.activities[idx] = {
          ...d.activities[idx],
          title: fields.title,
          description: fields.description,
          location: fields.location,
          time_slot: fields.timeSlot,
          start_time: fields.startTime,
          duration_minutes: fields.durationMinutes,
          estimated_cost_minor: fields.estimatedCostMinor,
          position,
        };
        saveLocalTrips(trips);
        return;
      }
    }
  }
}

export async function deleteActivity(activityId: string): Promise<void> {
  const trips = getLocalTrips();
  for (const t of trips) {
    for (const d of t.days) {
      d.activities = d.activities.filter((a) => a.id !== activityId);
    }
  }
  saveLocalTrips(trips);
}

export async function setActivityPositions(updates: { id: string; position: number }[]): Promise<void> {
  const trips = getLocalTrips();
  const map = new Map(updates.map((u) => [u.id, u.position]));
  for (const t of trips) {
    for (const d of t.days) {
      for (const a of d.activities) {
        if (map.has(a.id)) {
          a.position = map.get(a.id)!;
        }
      }
    }
  }
  saveLocalTrips(trips);
}
