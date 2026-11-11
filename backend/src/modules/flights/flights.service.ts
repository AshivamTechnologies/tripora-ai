import { v4 as uuidv4 } from 'uuid';
import { mockStore } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export interface FlightSearchQuery {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  cabinClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
}

export interface FlightOfferDto {
  id: string;
  airlineCode: string;
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  stopDetails?: string;
  priceMinor: number;
  currency: string;
  cabinClass: string;
  baggageInfo: string;
  isAvailable: boolean;
  bookingUrl: string;
}

export class FlightsService {
  public async searchFlights(query: FlightSearchQuery): Promise<{
    offers: FlightOfferDto[];
    isLive: boolean;
    provider: string;
  }> {
    const origin = query.origin.toUpperCase().slice(0, 3) || 'SFO';
    const dest = query.destination.toUpperCase().slice(0, 3) || 'DPS';
    const departure = query.departureDate || '2026-11-20';
    const cabin = query.cabinClass || 'ECONOMY';

    // Curate realistic flight options across major global carriers
    const mockFlights: FlightOfferDto[] = [
      {
        id: `fl-sq-${uuidv4()}`,
        airlineCode: 'SQ',
        airlineName: 'Singapore Airlines',
        airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop',
        flightNumber: 'SQ 31 / SQ 944',
        origin,
        destination: dest,
        departureTime: `${departure}T01:15:00Z`,
        arrivalTime: `${departure}T15:45:00Z`,
        durationMinutes: 1050,
        stops: 1,
        stopDetails: '1h 45m in Singapore (SIN)',
        priceMinor: 118000, // $1,180.00
        currency: 'USD',
        cabinClass: cabin,
        baggageInfo: '2 checked bags included (23kg each)',
        isAvailable: true,
        bookingUrl: 'https://www.singaporeair.com',
      },
      {
        id: `fl-cx-${uuidv4()}`,
        airlineCode: 'CX',
        airlineName: 'Cathay Pacific',
        airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop',
        flightNumber: 'CX 873 / CX 785',
        origin,
        destination: dest,
        departureTime: `${departure}T23:55:00Z`,
        arrivalTime: `${departure}T14:20:00Z`,
        durationMinutes: 1105,
        stops: 1,
        stopDetails: '2h 10m in Hong Kong (HKG)',
        priceMinor: 104500, // $1,045.00
        currency: 'USD',
        cabinClass: cabin,
        baggageInfo: '1 checked bag (23kg) + 1 carry-on',
        isAvailable: true,
        bookingUrl: 'https://www.cathaypacific.com',
      },
      {
        id: `fl-qr-${uuidv4()}`,
        airlineCode: 'QR',
        airlineName: 'Qatar Airways',
        airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=100&fit=crop',
        flightNumber: 'QR 738 / QR 962',
        origin,
        destination: dest,
        departureTime: `${departure}T16:00:00Z`,
        arrivalTime: `${departure}T21:30:00Z`,
        durationMinutes: 1290,
        stops: 1,
        stopDetails: '2h 30m in Doha (DOH)',
        priceMinor: 132000, // $1,320.00
        currency: 'USD',
        cabinClass: cabin,
        baggageInfo: '2 checked bags included',
        isAvailable: true,
        bookingUrl: 'https://www.qatarairways.com',
      },
    ];

    return {
      offers: mockFlights,
      isLive: false,
      provider: 'Amadeus / Skyscanner Travel Aggregator (Sandbox / Mock)',
    };
  }

  public async revalidateOffer(offerId: string): Promise<{
    offerId: string;
    isPriceGuaranteed: boolean;
    currentPriceMinor: number;
    currency: string;
    expiresInSeconds: number;
  }> {
    return {
      offerId,
      isPriceGuaranteed: true,
      currentPriceMinor: 118000,
      currency: 'USD',
      expiresInSeconds: 900, // 15 minute price lock window
    };
  }

  public async saveFlightToTrip(tripId: string, offer: FlightOfferDto) {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    const bookingId = `bk-fl-${uuidv4()}`;
    const booking = {
      id: bookingId,
      tripId,
      type: 'FLIGHT' as const,
      referenceCode: offer.flightNumber,
      providerName: offer.airlineName,
      status: 'PRICE_REVALIDATED' as const,
      totalAmountMinor: offer.priceMinor,
      currency: offer.currency,
      bookingDetails: {
        airline: offer.airlineName,
        flightNumber: offer.flightNumber,
        origin: offer.origin,
        destination: offer.destination,
        departureTime: offer.departureTime,
        stops: offer.stops,
        cabinClass: offer.cabinClass,
      },
      confirmationUrl: offer.bookingUrl,
      createdAt: new Date().toISOString(),
    };

    mockStore.bookings.set(bookingId, booking);
    return booking;
  }
}

export const flightsService = new FlightsService();
