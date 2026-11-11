import bcrypt from 'bcryptjs';

export interface MockDestination {
  id: string;
  name: string;
  country: string;
  region: string;
  city: string;
  description: string;
  heroImage: string;
  bestSeasons: string;
  averageDailyBudgetMinor: number;
  currency: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isFeatured: boolean;
  attractions: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    estimatedDurationMin: number;
    entryFeeMinor: number;
    currency: string;
    openingHours: string;
    rating: number;
    imageUrl: string;
  }>;
  restaurants: Array<{
    id: string;
    name: string;
    cuisine: string;
    priceLevel: string;
    address: string;
    latitude: number;
    longitude: number;
    rating: number;
    openingHours: string;
    imageUrl: string;
  }>;
}

export interface MockTrip {
  id: string;
  ownerId: string;
  title: string;
  destinationId?: string;
  destination: string;
  origin: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'GENERATING' | 'READY' | 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  adults: number;
  children: number;
  infants: number;
  travelStyles: string[];
  budgetMinor: number;
  currency: string;
  notes: string;
  preferences?: Record<string, any>;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockItineraryActivity {
  id: string;
  itineraryDayId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  latitude?: number;
  longitude?: number;
  timeSlot: 'MORNING' | 'AFTERNOON' | 'EVENING';
  startTime?: string;
  endTime?: string;
  durationMinutes: number;
  estimatedCostMinor: number;
  currency: string;
  transportation?: string;
  reason?: string;
  position: number;
  isCustom: boolean;
}

export interface MockItineraryDay {
  id: string;
  itineraryId: string;
  dayNumber: number;
  date: string;
  theme: string;
  notes: string;
  activities: MockItineraryActivity[];
}

export interface MockItinerary {
  id: string;
  tripId: string;
  title: string;
  version: number;
  isCurrent: boolean;
  days: MockItineraryDay[];
}

export interface MockExpense {
  id: string;
  tripId: string;
  payerId: string;
  payerName: string;
  title: string;
  category: 'ACCOMMODATION' | 'FLIGHT' | 'ACTIVITY' | 'FOOD' | 'TRANSPORT' | 'MISCELLANEOUS';
  amountMinor: number;
  currency: string;
  exchangeRate: number;
  baseAmountMinor: number;
  expenseDate: string;
  isPaid: boolean;
  notes?: string;
  splits: Array<{
    memberId: string;
    memberName: string;
    shareMinor: number;
    isSettled: boolean;
  }>;
}

export interface MockPackingItem {
  id: string;
  packingListId: string;
  category: 'CLOTHING' | 'TOILETRIES' | 'ELECTRONICS' | 'DOCUMENTS' | 'HEALTH' | 'MISCELLANEOUS';
  name: string;
  quantity: number;
  isPacked: boolean;
  assignedMemberName?: string;
  isWeatherDependent: boolean;
}

export interface MockMember {
  id: string;
  tripId: string;
  userId: string;
  email: string;
  fullName: string;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
  joinedAt: string;
}

export interface MockBooking {
  id: string;
  tripId: string;
  type: 'FLIGHT' | 'HOTEL' | 'ACTIVITY' | 'TRANSPORT';
  referenceCode: string;
  providerName: string;
  status: 'SAVED' | 'PRICE_REVALIDATED' | 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalAmountMinor: number;
  currency: string;
  bookingDetails: Record<string, any>;
  confirmationUrl?: string;
  createdAt: string;
}

class MockDataStore {
  public users: Map<string, any> = new Map();
  public refreshTokens: Map<string, any> = new Map();
  public destinations: Map<string, MockDestination> = new Map();
  public trips: Map<string, MockTrip> = new Map();
  public members: Map<string, MockMember> = new Map();
  public invitations: Map<string, any> = new Map();
  public itineraries: Map<string, MockItinerary> = new Map();
  public expenses: Map<string, MockExpense> = new Map();
  public packingLists: Map<string, { id: string; tripId: string; items: MockPackingItem[] }> = new Map();
  public bookings: Map<string, MockBooking> = new Map();
  public conversations: Map<string, any> = new Map();
  public chatMessages: Map<string, any[]> = new Map();
  public aiUsageLogs: any[] = [];
  public notifications: Map<string, any[]> = new Map();
  public auditLogs: any[] = [];
  public providerConfigs: Map<string, any> = new Map();

  constructor() {
    this.seed();
  }

  private seed() {
    const passwordHash = bcrypt.hashSync('Password123!', 10);

    // Seed Admin User
    const adminUser = {
      id: 'usr-admin-001',
      email: 'admin@tripora.ai',
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        fullName: 'Tripora Administrator',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        country: 'United States',
        city: 'San Francisco',
      },
      preference: {
        preferredCurrency: 'USD',
        preferredLanguage: 'en',
        travelPace: 'Balanced',
        budgetTier: 'Luxury',
      },
      createdAt: new Date().toISOString(),
    };
    this.users.set(adminUser.id, adminUser);
    this.users.set(adminUser.email, adminUser);

    // Seed Standard Demo User
    const demoUser = {
      id: 'usr-demo-002',
      email: 'traveler@tripora.ai',
      passwordHash,
      role: 'USER',
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        fullName: 'Alex Vance',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        country: 'United States',
        city: 'New York',
      },
      preference: {
        preferredCurrency: 'USD',
        preferredLanguage: 'en',
        travelPace: 'Balanced',
        budgetTier: 'Moderate',
      },
      createdAt: new Date().toISOString(),
    };
    this.users.set(demoUser.id, demoUser);
    this.users.set(demoUser.email, demoUser);

    // Seed Destinations
    const dests: MockDestination[] = [
      {
        id: 'dest-bali',
        name: 'Bali',
        country: 'Indonesia',
        region: 'Southeast Asia',
        city: 'Denpasar / Ubud',
        description: 'An Indonesian paradise known for forested volcanic mountains, iconic rice paddies, beaches, and coral reefs with ancient religious shrines.',
        heroImage: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        bestSeasons: 'April to October (Dry Season)',
        averageDailyBudgetMinor: 9500, // $95.00
        currency: 'USD',
        latitude: -8.3405,
        longitude: 115.092,
        timezone: 'Asia/Makassar',
        isFeatured: true,
        attractions: [
          {
            id: 'attr-ubud-monkey',
            name: 'Sacred Monkey Forest Sanctuary',
            category: 'Nature & Wildlife',
            description: 'A sanctuary and natural habitat of the Balinese long-tailed monkey within ancient Hindu temple grounds.',
            address: 'Jl. Monkey Forest, Ubud, Gianyar',
            latitude: -8.5194,
            longitude: 115.2606,
            estimatedDurationMin: 90,
            entryFeeMinor: 8000,
            currency: 'IDR',
            openingHours: '09:00 - 18:00',
            rating: 4.7,
            imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
          },
          {
            id: 'attr-tanah-lot',
            name: 'Tanah Lot Temple',
            category: 'Cultural Landmark',
            description: 'An ancient Hindu pilgrimage temple perched atop a unique offshore rock formation with spectacular sunset views.',
            address: 'Beraban, Kediri, Tabanan Regency',
            latitude: -8.6212,
            longitude: 115.0868,
            estimatedDurationMin: 120,
            entryFeeMinor: 6000,
            currency: 'IDR',
            openingHours: '07:00 - 19:00',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600',
          },
          {
            id: 'attr-tegallalang',
            name: 'Tegallalang Rice Terraces',
            category: 'Scenic Landscape',
            description: 'Famous emerald-green stepped rice paddies carved into hillsides using traditional Subak irrigation.',
            address: 'Jl. Raya Tegallalang, Gianyar',
            latitude: -8.4312,
            longitude: 115.2793,
            estimatedDurationMin: 100,
            entryFeeMinor: 2500,
            currency: 'IDR',
            openingHours: '08:00 - 18:00',
            rating: 4.6,
            imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600',
          },
        ],
        restaurants: [
          {
            id: 'rest-locavore',
            name: 'Locavore Next Door',
            cuisine: 'Modern Indonesian Fine Dining',
            priceLevel: '$$$',
            address: 'Jl. Dewisita No. 10, Ubud',
            latitude: -8.5085,
            longitude: 115.2638,
            rating: 4.9,
            openingHours: '12:00 - 22:00',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
          },
          {
            id: 'rest-warung-babi',
            name: 'Warung Babi Guling Ibu Oka',
            cuisine: 'Authentic Balinese Spit Roast',
            priceLevel: '$',
            address: 'Jl. Suweta No. 2, Ubud',
            latitude: -8.506,
            longitude: 115.2625,
            rating: 4.5,
            openingHours: '11:00 - 17:00',
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
          },
        ],
      },
      {
        id: 'dest-kyoto',
        name: 'Kyoto',
        country: 'Japan',
        region: 'East Asia',
        city: 'Kyoto',
        description: 'The cultural soul of Japan, featuring more than 1,600 Buddhist temples, 400 Shinto shrines, imperial palaces, and preserved wooden machiya neighborhoods.',
        heroImage: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        bestSeasons: 'March-May (Sakura) and October-November (Autumn foliage)',
        averageDailyBudgetMinor: 14500, // $145.00
        currency: 'USD',
        latitude: 35.0116,
        longitude: 135.7681,
        timezone: 'Asia/Tokyo',
        isFeatured: true,
        attractions: [
          {
            id: 'attr-fushimi-inari',
            name: 'Fushimi Inari Shrine',
            category: 'Shinto Shrine',
            description: 'Iconic mountain shrine famous for thousands of vermilion torii gates winding through tranquil woodland.',
            address: '68 Fukakusa Yabunouchicho, Fushimi Ward',
            latitude: 34.9671,
            longitude: 135.7727,
            estimatedDurationMin: 150,
            entryFeeMinor: 0,
            currency: 'JPY',
            openingHours: 'Open 24 Hours',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600',
          },
          {
            id: 'attr-kinkaku-ji',
            name: 'Kinkaku-ji (Golden Pavilion)',
            category: 'Zen Temple',
            description: 'A majestic Zen temple whose top two floors are completely covered in glittering gold leaf, overlooking a mirror pond.',
            address: '1 Kinkakujicho, Kita Ward',
            latitude: 35.0394,
            longitude: 135.7292,
            estimatedDurationMin: 75,
            entryFeeMinor: 500,
            currency: 'JPY',
            openingHours: '09:00 - 17:00',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600',
          },
        ],
        restaurants: [
          {
            id: 'rest-gion-karyo',
            name: 'Gion Karyo Kaiseki',
            cuisine: 'Traditional Kyoto Kaiseki',
            priceLevel: '$$$$',
            address: '570-235 Gionmachi Minamigawa, Higashiyama Ward',
            latitude: 35.0034,
            longitude: 135.7755,
            rating: 4.9,
            openingHours: '18:00 - 21:30',
            imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
          },
        ],
      },
      {
        id: 'dest-swiss-alps',
        name: 'Swiss Alps',
        country: 'Switzerland',
        region: 'Western Europe',
        city: 'Zermatt & Interlaken',
        description: 'Towering alpine peaks, pristine glacial lakes, scenic cogwheel railways, and world-class hiking and ski chalets.',
        heroImage: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        bestSeasons: 'June to September for hiking, December to March for skiing',
        averageDailyBudgetMinor: 22000, // $220.00
        currency: 'USD',
        latitude: 46.56,
        longitude: 8.56,
        timezone: 'Europe/Zurich',
        isFeatured: true,
        attractions: [
          {
            id: 'attr-matterhorn',
            name: 'Matterhorn Glacier Paradise',
            category: 'Alpine Landmark',
            description: 'The highest cable car station in Europe offering 360-degree panoramic views of 38 alpine peaks.',
            address: 'Schluhmattstrasse 28, 3920 Zermatt',
            latitude: 45.9383,
            longitude: 7.7297,
            estimatedDurationMin: 180,
            entryFeeMinor: 9500,
            currency: 'CHF',
            openingHours: '08:30 - 16:30',
            rating: 4.9,
            imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600',
          },
        ],
        restaurants: [
          {
            id: 'rest-chez-vrony',
            name: 'Chez Vrony',
            cuisine: 'Alpine Swiss & Valais Gourmet',
            priceLevel: '$$$',
            address: 'Findeln, 3920 Zermatt',
            latitude: 46.0125,
            longitude: 7.7712,
            rating: 4.8,
            openingHours: '11:30 - 16:00',
            imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
          },
        ],
      },
      {
        id: 'dest-santorini',
        name: 'Santorini',
        country: 'Greece',
        region: 'Southern Europe',
        city: 'Oia & Fira',
        description: 'Cycladic whitewashed villages clinging to volcanic caldera cliffs over the Aegean Sea, famed for dramatic sunsets and blue-domed churches.',
        heroImage: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
        bestSeasons: 'May to October',
        averageDailyBudgetMinor: 17500, // $175.00
        currency: 'USD',
        latitude: 36.3932,
        longitude: 25.4615,
        timezone: 'Europe/Athens',
        isFeatured: true,
        attractions: [
          {
            id: 'attr-oia-sunset',
            name: 'Oia Castle & Sunset Point',
            category: 'Historic Viewpoint',
            description: 'The world-famous vantage point to witness the sun sink into the Aegean Sea past the Byzantine Castle ruins.',
            address: 'Oia 847 02, Santorini',
            latitude: 36.4618,
            longitude: 25.3753,
            estimatedDurationMin: 90,
            entryFeeMinor: 0,
            currency: 'EUR',
            openingHours: 'Open 24 Hours',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600',
          },
        ],
        restaurants: [
          {
            id: 'rest-ambrosia',
            name: 'Ambrosia Restaurant',
            cuisine: 'Modern Greek Fine Dining',
            priceLevel: '$$$$',
            address: 'Cliffside, Oia 847 02',
            latitude: 36.4628,
            longitude: 25.3762,
            rating: 4.7,
            openingHours: '18:30 - 23:00',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
          },
        ],
      },
    ];

    dests.forEach((d) => this.destinations.set(d.id, d));

    // Seed Demo Trip 1: Bali Cultural & Nature Escape
    const tripId = 'trip-bali-001';
    const demoTrip: MockTrip = {
      id: tripId,
      ownerId: demoUser.id,
      title: 'Bali Cultural & Nature Escape',
      destinationId: 'dest-bali',
      destination: 'Bali, Indonesia',
      origin: 'San Francisco (SFO)',
      startDate: '2026-11-20',
      endDate: '2026-11-26',
      status: 'UPCOMING',
      adults: 2,
      children: 0,
      infants: 0,
      travelStyles: ['Cultural', 'Nature', 'Food exploration'],
      budgetMinor: 250000, // $2,500.00
      currency: 'USD',
      notes: 'Focus on Ubud culture, rice terraces, and quiet coastal sunsets.',
      preferences: {
        pace: 'Balanced',
        accommodation: 'Boutique eco-resort',
        transport: 'Private driver & scooter',
      },
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.trips.set(tripId, demoTrip);

    // Seed Trip Member
    const memberId = 'mem-001';
    this.members.set(memberId, {
      id: memberId,
      tripId,
      userId: demoUser.id,
      email: demoUser.email,
      fullName: 'Alex Vance',
      role: 'OWNER',
      joinedAt: new Date().toISOString(),
    });

    // Seed Itinerary
    const itineraryId = 'itin-bali-001';
    const days: MockItineraryDay[] = [
      {
        id: 'day-1',
        itineraryId,
        dayNumber: 1,
        date: '2026-11-20',
        theme: 'Arrival & Ubud Heartbeat',
        notes: 'Check-in, settle down, and explore Ubud center.',
        activities: [
          {
            id: 'act-1-1',
            itineraryDayId: 'day-1',
            title: 'Arrive at Ngurah Rai International Airport (DPS)',
            description: 'Private driver pickup and transfer through scenic Gianyar to Ubud hotel.',
            category: 'Transport',
            location: 'Denpasar DPS Airport',
            timeSlot: 'MORNING',
            startTime: '10:30',
            endTime: '12:00',
            durationMinutes: 90,
            estimatedCostMinor: 3000,
            currency: 'USD',
            transportation: 'Private AC Van',
            position: 0,
            isCustom: false,
          },
          {
            id: 'act-1-2',
            itineraryDayId: 'day-1',
            title: 'Sacred Monkey Forest Walk',
            description: 'Stroll among ancient mossy banyan trees and observe Balinese macaques in their sacred sanctuary.',
            category: 'Attraction',
            location: 'Monkey Forest Sanctuary, Ubud',
            timeSlot: 'AFTERNOON',
            startTime: '14:30',
            endTime: '16:00',
            durationMinutes: 90,
            estimatedCostMinor: 1500,
            currency: 'USD',
            transportation: 'Short walk from hotel',
            position: 0,
            isCustom: false,
          },
          {
            id: 'act-1-3',
            itineraryDayId: 'day-1',
            title: 'Welcome Dinner at Locavore Next Door',
            description: 'Multi-course contemporary Indonesian dinner highlighting sustainable local Balinese ingredients.',
            category: 'Dining',
            location: 'Jl. Dewisita, Ubud',
            timeSlot: 'EVENING',
            startTime: '19:00',
            endTime: '21:00',
            durationMinutes: 120,
            estimatedCostMinor: 7500,
            currency: 'USD',
            transportation: 'Walk',
            position: 0,
            isCustom: false,
          },
        ],
      },
      {
        id: 'day-2',
        itineraryId,
        dayNumber: 2,
        date: '2026-11-21',
        theme: 'Emerald Terraces & Holy Springs',
        notes: 'Morning photography before crowds arrive.',
        activities: [
          {
            id: 'act-2-1',
            itineraryDayId: 'day-2',
            title: 'Sunrise Walk at Tegallalang Rice Terraces',
            description: 'Watch morning sunbeams cut through palm groves over the world-famous UNESCO Subak terraces.',
            category: 'Nature',
            location: 'Tegallalang, Gianyar',
            timeSlot: 'MORNING',
            startTime: '06:30',
            endTime: '08:30',
            durationMinutes: 120,
            estimatedCostMinor: 1000,
            currency: 'USD',
            transportation: 'Driver',
            position: 0,
            isCustom: false,
          },
          {
            id: 'act-2-2',
            itineraryDayId: 'day-2',
            title: 'Tirta Empul Holy Water Temple Purification',
            description: 'Participate respectfully in the traditional Balinese melukat cleansing ritual beneath natural mineral springs.',
            category: 'Cultural Landmark',
            location: 'Tampaksiring, Gianyar',
            timeSlot: 'AFTERNOON',
            startTime: '13:00',
            endTime: '15:00',
            durationMinutes: 120,
            estimatedCostMinor: 2000,
            currency: 'USD',
            transportation: 'Driver',
            position: 0,
            isCustom: false,
          },
          {
            id: 'act-2-3',
            itineraryDayId: 'day-2',
            title: 'Traditional Legong Dance at Ubud Water Palace',
            description: 'Enthralling live gamelan orchestra accompanying dramatic palace dancers by the lotus pond.',
            category: 'Entertainment',
            location: 'Saraswati Temple, Ubud',
            timeSlot: 'EVENING',
            startTime: '19:30',
            endTime: '21:00',
            durationMinutes: 90,
            estimatedCostMinor: 2000,
            currency: 'USD',
            transportation: 'Walk',
            position: 0,
            isCustom: false,
          },
        ],
      },
    ];

    this.itineraries.set(tripId, {
      id: itineraryId,
      tripId,
      title: 'Bali 7-Day Curated Plan',
      version: 1,
      isCurrent: true,
      days,
    });

    // Seed Expenses
    const exp1: MockExpense = {
      id: 'exp-001',
      tripId,
      payerId: demoUser.id,
      payerName: 'Alex Vance',
      title: 'Ubud Private Pool Villa Deposit (4 nights)',
      category: 'ACCOMMODATION',
      amountMinor: 88000, // $880.00
      currency: 'USD',
      exchangeRate: 1.0,
      baseAmountMinor: 88000,
      expenseDate: '2026-11-05',
      isPaid: true,
      splits: [
        { memberId, memberName: 'Alex Vance', shareMinor: 44000, isSettled: true },
        { memberId: 'mem-002', memberName: 'Sarah Vance', shareMinor: 44000, isSettled: false },
      ],
    };

    const exp2: MockExpense = {
      id: 'exp-002',
      tripId,
      payerId: demoUser.id,
      payerName: 'Alex Vance',
      title: 'Roundtrip Flights (SFO <-> DPS)',
      category: 'FLIGHT',
      amountMinor: 124000, // $1,240.00
      currency: 'USD',
      exchangeRate: 1.0,
      baseAmountMinor: 124000,
      expenseDate: '2026-11-02',
      isPaid: true,
      splits: [
        { memberId, memberName: 'Alex Vance', shareMinor: 62000, isSettled: true },
        { memberId: 'mem-002', memberName: 'Sarah Vance', shareMinor: 62000, isSettled: true },
      ],
    };

    this.expenses.set(exp1.id, exp1);
    this.expenses.set(exp2.id, exp2);

    // Seed Packing List
    const packingListId = 'pack-bali-001';
    const items: MockPackingItem[] = [
      { id: 'p-1', packingListId, category: 'DOCUMENTS', name: 'Passports with 6+ months validity', quantity: 2, isPacked: true, isWeatherDependent: false },
      { id: 'p-2', packingListId, category: 'DOCUMENTS', name: 'Indonesia e-VOA & Customs Declaration QR', quantity: 2, isPacked: true, isWeatherDependent: false },
      { id: 'p-3', packingListId, category: 'CLOTHING', name: 'Lightweight linen shirts & modest temple sarong', quantity: 4, isPacked: false, isWeatherDependent: true },
      { id: 'p-4', packingListId, category: 'HEALTH', name: 'DEET mosquito repellent & sunscreen SPF 50', quantity: 2, isPacked: true, isWeatherDependent: true },
      { id: 'p-5', packingListId, category: 'ELECTRONICS', name: 'Universal power adapter (Type C/F) & power bank', quantity: 2, isPacked: false, isWeatherDependent: false },
    ];
    this.packingLists.set(tripId, { id: packingListId, tripId, items });

    // Seed Saved Booking
    const booking1: MockBooking = {
      id: 'bk-001',
      tripId,
      type: 'FLIGHT',
      referenceCode: 'SQ-93820',
      providerName: 'Singapore Airlines',
      status: 'PRICE_REVALIDATED',
      totalAmountMinor: 124000,
      currency: 'USD',
      bookingDetails: {
        flightNumber: 'SQ 31 / SQ 944',
        origin: 'SFO',
        destination: 'DPS',
        stops: 1,
        cabinClass: 'ECONOMY',
        departureTime: '2026-11-20T01:15:00Z',
      },
      createdAt: new Date().toISOString(),
    };
    this.bookings.set(booking1.id, booking1);

    // Seed Provider Configurations
    const providers = [
      { providerType: 'AI', providerName: 'Google Gemini', isLiveEnabled: true, circuitStatus: 'CLOSED', monthlyQuota: 50000 },
      { providerType: 'FLIGHTS', providerName: 'Amadeus Travel API', isLiveEnabled: false, circuitStatus: 'CLOSED', monthlyQuota: 2000 },
      { providerType: 'HOTELS', providerName: 'Amadeus Hotel API', isLiveEnabled: false, circuitStatus: 'CLOSED', monthlyQuota: 2000 },
      { providerType: 'WEATHER', providerName: 'OpenWeatherMap', isLiveEnabled: true, circuitStatus: 'CLOSED', monthlyQuota: 10000 },
      { providerType: 'MAPS', providerName: 'Mapbox / OpenStreetMap', isLiveEnabled: true, circuitStatus: 'CLOSED', monthlyQuota: 50000 },
      { providerType: 'PAYMENTS', providerName: 'Razorpay / Stripe Gateway', isLiveEnabled: false, circuitStatus: 'CLOSED', monthlyQuota: 5000 },
    ];
    providers.forEach((p) => this.providerConfigs.set(`${p.providerType}:${p.providerName}`, p));

    // Seed AI Usage Logs
    this.aiUsageLogs.push(
      {
        id: 'ai-log-1',
        userId: demoUser.id,
        tripId,
        operation: 'ITINERARY_GENERATION',
        promptTokens: 1240,
        completionTokens: 890,
        totalTokens: 2130,
        estimatedCostUsd: 0.0032,
        provider: 'GEMINI',
        model: 'gemini-1.5-flash',
        latencyMs: 1420,
        status: 'SUCCESS',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'ai-log-2',
        userId: demoUser.id,
        tripId,
        operation: 'PACKING_SUGGESTIONS',
        promptTokens: 410,
        completionTokens: 320,
        totalTokens: 730,
        estimatedCostUsd: 0.0011,
        provider: 'GEMINI',
        model: 'gemini-1.5-flash',
        latencyMs: 780,
        status: 'SUCCESS',
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      },
    );

    // Seed Audit Log
    this.auditLogs.push({
      id: 'audit-001',
      userId: demoUser.id,
      action: 'TRIP_CREATED',
      entityType: 'Trip',
      entityId: tripId,
      details: JSON.stringify({ destination: 'Bali, Indonesia', dates: '2026-11-20 to 2026-11-26' }),
      ipAddress: '127.0.0.1',
      userAgent: 'Tripora Web Client',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    });
  }
}

export const mockStore = new MockDataStore();
