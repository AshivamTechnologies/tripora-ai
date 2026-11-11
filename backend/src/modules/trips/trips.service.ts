import { v4 as uuidv4 } from 'uuid';
import { mockStore, MockTrip, MockItinerary, MockItineraryDay } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

function getInclusiveDays(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  const diff = Math.round((e - s) / (1000 * 3600 * 24)) + 1;
  return Math.max(1, Math.min(diff, 60));
}

function computeTripLifecycle(trip: MockTrip): MockTrip['status'] {
  if (trip.status === 'CANCELLED' || trip.status === 'DRAFT' || trip.status === 'GENERATING') {
    return trip.status;
  }
  const today = new Date().toISOString().slice(0, 10);
  if (today < trip.startDate) return 'UPCOMING';
  if (today > trip.endDate) return 'COMPLETED';
  return 'ONGOING';
}

export class TripsService {
  public async listUserTrips(userId: string): Promise<MockTrip[]> {
    const userMemberships = Array.from(mockStore.members.values())
      .filter((m) => m.userId === userId)
      .map((m) => m.tripId);

    const trips = Array.from(mockStore.trips.values())
      .filter((t) => (t.ownerId === userId || userMemberships.includes(t.id)) && !t.isArchived)
      .map((t) => ({ ...t, status: computeTripLifecycle(t) }));

    return trips.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  public async getTripById(tripId: string): Promise<{
    trip: MockTrip;
    itinerary: MockItinerary | null;
    members: any[];
  }> {
    const trip = mockStore.trips.get(tripId);
    if (!trip || trip.isArchived) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    const updatedTrip = { ...trip, status: computeTripLifecycle(trip) };
    const itinerary = mockStore.itineraries.get(tripId) || null;
    const members = Array.from(mockStore.members.values()).filter((m) => m.tripId === tripId);

    return {
      trip: updatedTrip,
      itinerary,
      members,
    };
  }

  public async createTrip(
    userId: string,
    data: {
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
      preferences?: Record<string, any>;
    }
  ): Promise<MockTrip> {
    const tripId = `trip-${uuidv4()}`;
    const dayCount = getInclusiveDays(data.startDate, data.endDate);

    const trip: MockTrip = {
      id: tripId,
      ownerId: userId,
      title: `${data.destination} Adventure`,
      destination: data.destination,
      origin: data.origin,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'READY',
      adults: data.adults,
      children: data.children,
      infants: data.infants,
      travelStyles: data.travelStyles,
      budgetMinor: data.budgetMinor,
      currency: data.currency,
      notes: data.notes,
      preferences: data.preferences,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockStore.trips.set(tripId, trip);

    // Add owner as trip member
    const memberId = `mem-${uuidv4()}`;
    const user = mockStore.users.get(userId);
    mockStore.members.set(memberId, {
      id: memberId,
      tripId,
      userId,
      email: user?.email || '',
      fullName: user?.profile?.fullName || 'Trip Planner',
      role: 'OWNER',
      joinedAt: new Date().toISOString(),
    });

    // Create initial itinerary with day structure
    const itineraryId = `itin-${uuidv4()}`;
    const days: MockItineraryDay[] = [];
    const startTimestamp = new Date(data.startDate).getTime();

    for (let i = 0; i < dayCount; i++) {
      const dayDate = new Date(startTimestamp + i * 86400000).toISOString().slice(0, 10);
      days.push({
        id: `day-${uuidv4()}`,
        itineraryId,
        dayNumber: i + 1,
        date: dayDate,
        theme: i === 0 ? 'Arrival & Exploration' : i === dayCount - 1 ? 'Departure & Reflection' : `Exploring ${data.destination}`,
        notes: '',
        activities: [],
      });
    }

    mockStore.itineraries.set(tripId, {
      id: itineraryId,
      tripId,
      title: `${data.destination} Itinerary`,
      version: 1,
      isCurrent: true,
      days,
    });

    // Create packing list
    const packingListId = `pack-${uuidv4()}`;
    mockStore.packingLists.set(tripId, {
      id: packingListId,
      tripId,
      items: [
        { id: uuidv4(), packingListId, category: 'DOCUMENTS', name: 'Valid Passport / ID', quantity: data.adults + data.children, isPacked: false, isWeatherDependent: false },
        { id: uuidv4(), packingListId, category: 'ELECTRONICS', name: 'Mobile phone charger & adapter', quantity: 2, isPacked: false, isWeatherDependent: false },
        { id: uuidv4(), packingListId, category: 'HEALTH', name: 'Personal first aid & medicines', quantity: 1, isPacked: false, isWeatherDependent: false },
      ],
    });

    return trip;
  }

  public async updateTrip(tripId: string, data: Partial<MockTrip>): Promise<MockTrip> {
    const trip = mockStore.trips.get(tripId);
    if (!trip || trip.isArchived) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    if (trip.status === 'CANCELLED' && data.status !== 'READY' && data.status !== 'DRAFT') {
      throw new AppError('Cancelled trips cannot be modified unless reactivated', 400, 'TRIP_CANCELLED');
    }

    const updated: MockTrip = {
      ...trip,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    mockStore.trips.set(tripId, updated);
    return updated;
  }

  public async deleteTrip(tripId: string): Promise<void> {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    // Soft delete
    trip.isArchived = true;
    mockStore.trips.set(tripId, trip);
  }

  public async cancelTrip(tripId: string): Promise<MockTrip> {
    return this.updateTrip(tripId, { status: 'CANCELLED' });
  }

  public async completeTrip(tripId: string): Promise<MockTrip> {
    return this.updateTrip(tripId, { status: 'COMPLETED' });
  }
}

export const tripsService = new TripsService();
