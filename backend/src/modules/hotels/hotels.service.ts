import { v4 as uuidv4 } from 'uuid';
import { mockStore } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export interface HotelSearchQuery {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  guests?: number;
  rooms?: number;
  starRating?: number;
  minPriceMinor?: number;
  maxPriceMinor?: number;
}

export interface HotelDto {
  id: string;
  name: string;
  propertyType: 'RESORT' | 'HOTEL' | 'VILLA' | 'BOUTIQUE' | 'APARTMENT';
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  address: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  mainImage: string;
  imageUrl?: string;
  images: string[];
  pricePerNightMinor: number;
  totalPriceMinor: number;
  currency: string;
  cancellationPolicy: string;
  bookingUrl: string;
}

export class HotelsService {
  public async searchHotels(query: HotelSearchQuery): Promise<{
    hotels: HotelDto[];
    isLive: boolean;
    provider: string;
  }> {
    const dest = query.destination || 'Bali';

    const mockHotels: HotelDto[] = [
      {
        id: `ht-mandapa-${uuidv4()}`,
        name: 'Mandapa, a Ritz-Carlton Reserve',
        propertyType: 'RESORT',
        starRating: 5,
        reviewScore: 9.8,
        reviewCount: 420,
        address: 'Jl. Kedewatan, Banjar Kedewatan, Ubud',
        latitude: -8.4862,
        longitude: 115.2447,
        amenities: ['Private Pool', 'Ayung River Views', 'Spa Sanctuary', 'Butler Service', 'Organic Dining'],
        mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        ],
        pricePerNightMinor: 78000, // $780.00
        totalPriceMinor: 312000,
        currency: 'USD',
        cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
        bookingUrl: 'https://www.ritzcarlton.com',
      },
      {
        id: `ht-kamandalu-${uuidv4()}`,
        name: 'Kamandalu Ubud Resort & Forest Spa',
        propertyType: 'BOUTIQUE',
        starRating: 5,
        reviewScore: 9.3,
        reviewCount: 890,
        address: 'Jl. Andong, Banjar Nagi, Ubud',
        latitude: -8.4975,
        longitude: 115.2755,
        amenities: ['Valley Infinity Pool', 'Floating Breakfast', 'Yoga Pavilion', 'Free Shuttle'],
        mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        ],
        pricePerNightMinor: 26000, // $260.00
        totalPriceMinor: 104000,
        currency: 'USD',
        cancellationPolicy: 'Free cancellation up to 7 days before arrival',
        bookingUrl: 'https://www.kamandaluresort.com',
      },
      {
        id: `ht-bambu-indah-${uuidv4()}`,
        name: 'Bambu Indah Eco Lifestyle Sanctuary',
        propertyType: 'VILLA',
        starRating: 4.5,
        reviewScore: 9.5,
        reviewCount: 310,
        address: 'Jl. Baung, Sayan, Ubud',
        latitude: -8.5123,
        longitude: 115.2412,
        amenities: ['Natural Swimming Pools', 'Permaculture Garden', 'Riverside Dining', 'Artisan Bamboo Villas'],
        mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        images: [
          'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
        ],
        pricePerNightMinor: 19500, // $195.00
        totalPriceMinor: 78000,
        currency: 'USD',
        cancellationPolicy: 'Non-refundable (Special promotional rate)',
        bookingUrl: 'https://www.bambuindah.com',
      },
    ];

    return {
      hotels: mockHotels,
      isLive: false,
      provider: 'Booking.com & Amadeus Hotel API (Sandbox / Mock)',
    };
  }

  public async saveHotelToTrip(tripId: string, hotel: HotelDto) {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    const bookingId = `bk-ht-${uuidv4()}`;
    const booking = {
      id: bookingId,
      tripId,
      type: 'HOTEL' as const,
      referenceCode: `HT-${hotel.name.slice(0, 3).toUpperCase()}-RES`,
      providerName: hotel.name,
      status: 'SAVED' as const,
      totalAmountMinor: hotel.totalPriceMinor,
      currency: hotel.currency,
      bookingDetails: {
        hotelName: hotel.name,
        propertyType: hotel.propertyType,
        starRating: hotel.starRating,
        address: hotel.address,
        cancellationPolicy: hotel.cancellationPolicy,
      },
      confirmationUrl: hotel.bookingUrl,
      createdAt: new Date().toISOString(),
    };

    mockStore.bookings.set(bookingId, booking);
    return booking;
  }
}

export const hotelsService = new HotelsService();
