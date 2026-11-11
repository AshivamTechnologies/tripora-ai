import { v4 as uuidv4 } from 'uuid';
import { mockStore, MockItinerary, MockItineraryDay, MockItineraryActivity } from '../../database/mock-store';
import { AppError } from '../../middleware/error';
import { aiProvider } from '../../integrations/ai/ai.factory';

export class ItineraryService {
  public async getItinerary(tripId: string): Promise<MockItinerary> {
    const itinerary = mockStore.itineraries.get(tripId);
    if (!itinerary) {
      throw new AppError('Itinerary not found for this trip', 404, 'ITINERARY_NOT_FOUND');
    }
    return itinerary;
  }

  public async generateAiItinerary(tripId: string, userId: string): Promise<MockItinerary> {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    // Set trip status to GENERATING
    trip.status = 'GENERATING';
    mockStore.trips.set(tripId, trip);

    const startTime = Date.now();

    try {
      const generated = await aiProvider.generateItinerary({
        origin: trip.origin,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        adults: trip.adults,
        children: trip.children,
        infants: trip.infants,
        travelStyles: trip.travelStyles,
        budgetMinor: trip.budgetMinor,
        currency: trip.currency,
        notes: trip.notes,
        preferences: trip.preferences,
      });

      const itineraryId = `itin-${uuidv4()}`;
      const days: MockItineraryDay[] = generated.days.map((d, dayIdx) => {
        const dayId = `day-${uuidv4()}`;
        return {
          id: dayId,
          itineraryId,
          dayNumber: d.dayNumber,
          date: d.date,
          theme: d.theme,
          notes: d.notes,
          activities: d.activities.map((a, actIdx) => ({
            id: `act-${uuidv4()}`,
            itineraryDayId: dayId,
            title: a.name,
            description: a.description,
            category: a.category,
            location: a.location.name,
            latitude: a.location.latitude,
            longitude: a.location.longitude,
            timeSlot: a.timeSlot,
            startTime: a.startTime,
            endTime: a.endTime,
            durationMinutes: a.durationMinutes,
            estimatedCostMinor: a.estimatedCost.amount,
            currency: a.estimatedCost.currency,
            transportation: a.transportation,
            reason: a.reason,
            position: actIdx,
            isCustom: false,
          })),
        };
      });

      const newItinerary: MockItinerary = {
        id: itineraryId,
        tripId,
        title: `${trip.destination} AI Itinerary`,
        version: 1,
        isCurrent: true,
        days,
      };

      mockStore.itineraries.set(tripId, newItinerary);

      // Update trip status to READY
      trip.status = 'READY';
      mockStore.trips.set(tripId, trip);

      // Record AI Usage
      mockStore.aiUsageLogs.push({
        id: `ai-log-${uuidv4()}`,
        userId,
        tripId,
        operation: 'ITINERARY_GENERATION',
        promptTokens: 1100,
        completionTokens: 850,
        totalTokens: 1950,
        estimatedCostUsd: 0.0028,
        provider: 'GEMINI',
        model: 'gemini-1.5-flash',
        latencyMs: Date.now() - startTime,
        status: 'SUCCESS',
        createdAt: new Date().toISOString(),
      });

      return newItinerary;
    } catch (err: any) {
      trip.status = 'DRAFT';
      mockStore.trips.set(tripId, trip);
      throw new AppError(`AI Generation failed: ${err.message}`, 500, 'AI_GENERATION_FAILED');
    }
  }

  public async addActivity(
    tripId: string,
    dayId: string,
    data: {
      title: string;
      description?: string;
      category?: string;
      location?: string;
      timeSlot?: 'MORNING' | 'AFTERNOON' | 'EVENING';
      startTime?: string;
      durationMinutes?: number;
      estimatedCostMinor?: number;
      currency?: string;
    }
  ): Promise<MockItineraryActivity> {
    const itinerary = mockStore.itineraries.get(tripId);
    if (!itinerary) {
      throw new AppError('Itinerary not found', 404, 'ITINERARY_NOT_FOUND');
    }

    const day = itinerary.days.find((d) => d.id === dayId);
    if (!day) {
      throw new AppError('Itinerary day not found', 404, 'DAY_NOT_FOUND');
    }

    const slot = data.timeSlot || 'MORNING';
    const slotActivities = day.activities.filter((a) => a.timeSlot === slot);
    const position = slotActivities.length;

    const activity: MockItineraryActivity = {
      id: `act-${uuidv4()}`,
      itineraryDayId: dayId,
      title: data.title,
      description: data.description || '',
      category: data.category || 'Custom Activity',
      location: data.location || 'Central Location',
      timeSlot: slot,
      startTime: data.startTime || (slot === 'MORNING' ? '09:00' : slot === 'AFTERNOON' ? '14:00' : '19:00'),
      durationMinutes: data.durationMinutes || 90,
      estimatedCostMinor: data.estimatedCostMinor || 0,
      currency: data.currency || 'USD',
      position,
      isCustom: true,
    };

    day.activities.push(activity);
    mockStore.itineraries.set(tripId, itinerary);
    return activity;
  }

  public async updateActivity(
    tripId: string,
    activityId: string,
    data: Partial<MockItineraryActivity>
  ): Promise<MockItineraryActivity> {
    const itinerary = mockStore.itineraries.get(tripId);
    if (!itinerary) {
      throw new AppError('Itinerary not found', 404, 'ITINERARY_NOT_FOUND');
    }

    let foundAct: MockItineraryActivity | null = null;
    for (const day of itinerary.days) {
      const idx = day.activities.findIndex((a) => a.id === activityId);
      if (idx !== -1) {
        day.activities[idx] = { ...day.activities[idx], ...data };
        foundAct = day.activities[idx];
        break;
      }
    }

    if (!foundAct) {
      throw new AppError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
    }

    mockStore.itineraries.set(tripId, itinerary);
    return foundAct;
  }

  public async deleteActivity(tripId: string, activityId: string): Promise<void> {
    const itinerary = mockStore.itineraries.get(tripId);
    if (!itinerary) {
      throw new AppError('Itinerary not found', 404, 'ITINERARY_NOT_FOUND');
    }

    let removed = false;
    for (const day of itinerary.days) {
      const initialLen = day.activities.length;
      day.activities = day.activities.filter((a) => a.id !== activityId);
      if (day.activities.length !== initialLen) {
        removed = true;
        break;
      }
    }

    if (!removed) {
      throw new AppError('Activity not found', 404, 'ACTIVITY_NOT_FOUND');
    }

    mockStore.itineraries.set(tripId, itinerary);
  }

  public async reorderActivities(
    tripId: string,
    dayId: string,
    orderedIds: string[]
  ): Promise<MockItineraryActivity[]> {
    const itinerary = mockStore.itineraries.get(tripId);
    if (!itinerary) {
      throw new AppError('Itinerary not found', 404, 'ITINERARY_NOT_FOUND');
    }

    const day = itinerary.days.find((d) => d.id === dayId);
    if (!day) {
      throw new AppError('Day not found', 404, 'DAY_NOT_FOUND');
    }

    const actMap = new Map(day.activities.map((a) => [a.id, a]));
    const reordered: MockItineraryActivity[] = [];

    orderedIds.forEach((id, idx) => {
      const act = actMap.get(id);
      if (act) {
        act.position = idx;
        reordered.push(act);
      }
    });

    day.activities = reordered;
    mockStore.itineraries.set(tripId, itinerary);
    return day.activities;
  }

  public async optimizeSchedule(tripId: string, dayId: string): Promise<MockItineraryActivity[]> {
    const itinerary = mockStore.itineraries.get(tripId);
    if (!itinerary) {
      throw new AppError('Itinerary not found', 404, 'ITINERARY_NOT_FOUND');
    }

    const day = itinerary.days.find((d) => d.id === dayId);
    if (!day) {
      throw new AppError('Day not found', 404, 'DAY_NOT_FOUND');
    }

    // Optimization: Order by slot (MORNING -> AFTERNOON -> EVENING) and allocate non-conflicting time slots
    const slotWeights: Record<string, number> = { MORNING: 1, AFTERNOON: 2, EVENING: 3 };
    day.activities.sort((a, b) => (slotWeights[a.timeSlot] || 0) - (slotWeights[b.timeSlot] || 0));

    let currentHour = 9;
    day.activities.forEach((act, idx) => {
      act.position = idx;
      if (act.timeSlot === 'MORNING' && currentHour < 12) {
        act.startTime = `${String(currentHour).padStart(2, '0')}:00`;
        currentHour += Math.ceil((act.durationMinutes || 90) / 60);
      } else if (act.timeSlot === 'AFTERNOON') {
        if (currentHour < 13) currentHour = 13;
        act.startTime = `${String(currentHour).padStart(2, '0')}:30`;
        currentHour += Math.ceil((act.durationMinutes || 90) / 60);
      } else if (act.timeSlot === 'EVENING') {
        if (currentHour < 18) currentHour = 18;
        act.startTime = `${String(currentHour).padStart(2, '0')}:00`;
        currentHour += Math.ceil((act.durationMinutes || 90) / 60);
      }
    });

    mockStore.itineraries.set(tripId, itinerary);
    return day.activities;
  }

  public async regenerateDay(tripId: string, dayId: string, userId: string): Promise<MockItineraryDay> {
    const trip = mockStore.trips.get(tripId);
    const itinerary = mockStore.itineraries.get(tripId);
    if (!trip || !itinerary) {
      throw new AppError('Trip or itinerary not found', 404, 'NOT_FOUND');
    }

    const day = itinerary.days.find((d) => d.id === dayId);
    if (!day) {
      throw new AppError('Day not found', 404, 'DAY_NOT_FOUND');
    }

    const refreshed = await aiProvider.regenerateDay(trip.destination, day.date, day.dayNumber, day.theme);
    day.theme = refreshed.theme;
    day.notes = refreshed.notes;
    day.activities = refreshed.activities.map((a: any, idx: number) => ({
      id: `act-${uuidv4()}`,
      itineraryDayId: day.id,
      title: a.name,
      description: a.description,
      category: a.category,
      location: a.location,
      timeSlot: a.timeSlot,
      startTime: a.startTime,
      durationMinutes: a.durationMinutes,
      estimatedCostMinor: a.estimatedCostMinor,
      currency: a.currency,
      transportation: a.transportation,
      position: idx,
      isCustom: false,
    }));

    mockStore.itineraries.set(tripId, itinerary);

    mockStore.aiUsageLogs.push({
      id: `ai-log-${uuidv4()}`,
      userId,
      tripId,
      operation: 'DAY_REGENERATION',
      promptTokens: 450,
      completionTokens: 380,
      totalTokens: 830,
      estimatedCostUsd: 0.0012,
      provider: 'GEMINI',
      model: 'gemini-1.5-flash',
      latencyMs: 820,
      status: 'SUCCESS',
      createdAt: new Date().toISOString(),
    });

    return day;
  }
}

export const itineraryService = new ItineraryService();
