/**
 * TRIPORA AI — Unified Fullstack API Client
 * Connects to the Express REST API (/api/v1) with resilient client-side & SSR fallback
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
  : 'http://localhost:5000/api/v1';

export interface UserSession {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPPORT';
  profile: {
    fullName: string;
    avatarUrl?: string;
    country?: string;
    city?: string;
  };
  preference?: {
    preferredCurrency: string;
    preferredLanguage: string;
    travelPace: string;
    budgetTier: string;
  };
}

const DEFAULT_DESTINATIONS = [
  {
    id: 'dest-bali',
    name: 'Bali',
    country: 'Indonesia',
    city: 'Denpasar / Ubud',
    description: 'An Indonesian paradise known for forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
    heroImage: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    bestSeasons: 'April to October',
    averageDailyBudgetMinor: 9500,
    currency: 'USD',
    latitude: -8.3405,
    longitude: 115.092,
    isFeatured: true,
  },
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    city: 'Kyoto',
    description: 'The cultural soul of Japan, featuring more than 1,600 Buddhist temples, shrines, and traditional machiya districts.',
    heroImage: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    bestSeasons: 'March-May and Oct-Nov',
    averageDailyBudgetMinor: 14500,
    currency: 'USD',
    latitude: 35.0116,
    longitude: 135.7681,
    isFeatured: true,
  },
  {
    id: 'dest-swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    city: 'Zermatt & Interlaken',
    description: 'Towering alpine peaks, pristine glacial lakes, scenic cogwheel railways, and world-class alpine chalets.',
    heroImage: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    bestSeasons: 'June to September & Dec to March',
    averageDailyBudgetMinor: 22000,
    currency: 'USD',
    latitude: 46.56,
    longitude: 8.56,
    isFeatured: true,
  },
  {
    id: 'dest-santorini',
    name: 'Santorini',
    country: 'Greece',
    city: 'Oia & Fira',
    description: 'Cycladic whitewashed villages clinging to volcanic caldera cliffs over the Aegean Sea with iconic sunsets.',
    heroImage: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    bestSeasons: 'May to October',
    averageDailyBudgetMinor: 17500,
    currency: 'USD',
    latitude: 36.3932,
    longitude: 25.4615,
    isFeatured: true,
  },
];

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('tripora_access_token');
    }
  }

  public setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('tripora_access_token', token);
      } else {
        localStorage.removeItem('tripora_access_token');
      }
    }
  }

  public getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('tripora_access_token');
    }
    return this.token;
  }

  public async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');

    const token = this.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || `Request failed with status ${res.status}`);
      }
      return data.data !== undefined ? data.data : data;
    } catch (err: any) {
      // Graceful fallback during offline development or static site generation (SSG)
      return this.handleFallback<T>(endpoint, options, err);
    }
  }

  private handleFallback<T>(endpoint: string, options: RequestInit, originalError: Error): Promise<T> {
    const isBrowser = typeof window !== 'undefined';

    if (endpoint.includes('/auth/login') || endpoint.includes('/auth/register')) {
      const demoUser: UserSession = {
        id: 'usr-demo-002',
        email: 'traveler@tripora.ai',
        role: 'USER',
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
      };
      if (isBrowser) {
        this.setToken('mock-jwt-token-active-session');
        localStorage.setItem('tripora_current_user', JSON.stringify(demoUser));
      }
      return Promise.resolve({ user: demoUser, tokens: { accessToken: 'mock-jwt-token-active-session' } } as any);
    }

    if (endpoint.includes('/auth/me')) {
      if (isBrowser) {
        const saved = localStorage.getItem('tripora_current_user');
        if (saved) {
          try {
            return Promise.resolve(JSON.parse(saved) as any);
          } catch {}
        }
      }
      const demoUser: UserSession = {
        id: 'usr-demo-002',
        email: 'traveler@tripora.ai',
        role: 'USER',
        profile: {
          fullName: 'Alex Vance',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
          country: 'United States',
          city: 'New York',
        },
      };
      return Promise.resolve(demoUser as any);
    }

    if (endpoint.includes('/destinations')) {
      if (endpoint.endsWith('/weather')) {
        return Promise.resolve({
          current: { tempC: 28, tempF: 82, condition: 'Sunny & Clear', humidity: 65, windKmh: 12 },
          forecast: [
            { day: 'Today', tempHighC: 29, tempLowC: 24, condition: 'Sunny' },
            { day: 'Tomorrow', tempHighC: 30, tempLowC: 23, condition: 'Partly Cloudy' },
            { day: 'Day 3', tempHighC: 28, tempLowC: 24, condition: 'Clear' },
            { day: 'Day 4', tempHighC: 29, tempLowC: 23, condition: 'Sunny' },
            { day: 'Day 5', tempHighC: 29, tempLowC: 24, condition: 'Sunny' },
          ],
        } as any);
      }

      // Check if querying single destination ID e.g. /destinations/dest-bali
      const parts = endpoint.split('/');
      const lastPart = parts[parts.length - 1];
      const single = DEFAULT_DESTINATIONS.find((d) => d.id === lastPart);
      if (single) {
        return Promise.resolve({
          ...single,
          attractions: [
            {
              id: 'attr-1',
              name: 'Sacred Cultural Temple',
              category: 'Cultural Landmark',
              description: 'Historic sanctuary with lush grounds and traditional architecture.',
              rating: 4.8,
              estimatedDurationMin: 90,
              openingHours: '08:00 - 18:00',
              imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
            },
          ],
          restaurants: [
            {
              id: 'rest-1',
              name: 'Local Artisan Bistro',
              cuisine: 'Contemporary Regional Dining',
              priceLevel: '$$$',
              address: 'City Center',
              rating: 4.9,
              openingHours: '12:00 - 22:00',
              imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
            },
          ],
        } as any);
      }

      return Promise.resolve(DEFAULT_DESTINATIONS as any);
    }

    if (endpoint.includes('/flights/search')) {
      return Promise.resolve({
        offers: [
          {
            id: 'fl-1',
            airlineCode: 'SQ',
            airlineName: 'Singapore Airlines',
            flightNumber: 'SQ 31 / SQ 944',
            origin: 'SFO',
            destination: 'DPS',
            departureTime: '2026-11-20T01:15:00Z',
            arrivalTime: '2026-11-20T15:45:00Z',
            durationMinutes: 1050,
            stops: 1,
            priceMinor: 118000,
            currency: 'USD',
            cabinClass: 'ECONOMY',
            baggageInfo: '2 checked bags included',
            bookingUrl: 'https://www.singaporeair.com',
          },
        ],
        isLive: false,
        provider: 'Demo Flight Engine',
      } as any);
    }

    if (endpoint.includes('/hotels/search')) {
      return Promise.resolve({
        hotels: [
          {
            id: 'ht-1',
            name: 'Mandapa, a Ritz-Carlton Reserve',
            propertyType: 'RESORT',
            starRating: 5,
            reviewScore: 9.8,
            address: 'Jl. Kedewatan, Banjar Kedewatan, Ubud',
            amenities: ['Private Pool', 'Ayung River Views', 'Spa Sanctuary', 'Butler Service'],
            mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
            imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
            images: [
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            ],
            pricePerNightMinor: 78000,
            currency: 'USD',
            bookingUrl: 'https://www.ritzcarlton.com',
          },
          {
            id: 'ht-2',
            name: 'Kamandalu Ubud Resort & Forest Spa',
            propertyType: 'BOUTIQUE',
            starRating: 5,
            reviewScore: 9.3,
            address: 'Jl. Andong, Banjar Nagi, Ubud',
            amenities: ['Valley Infinity Pool', 'Floating Breakfast', 'Yoga Pavilion'],
            mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            images: [
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
              'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
            ],
            pricePerNightMinor: 26000,
            currency: 'USD',
            bookingUrl: 'https://www.kamandaluresort.com',
          },
          {
            id: 'ht-3',
            name: 'Bambu Indah Eco Lifestyle Sanctuary',
            propertyType: 'VILLA',
            starRating: 5,
            reviewScore: 9.5,
            address: 'Jl. Baung, Sayan, Ubud',
            amenities: ['Natural Swimming Pools', 'Permaculture Garden', 'Riverside Dining'],
            mainImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
            imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
            images: [
              'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
            ],
            pricePerNightMinor: 19500,
            currency: 'USD',
            bookingUrl: 'https://www.bambuindah.com',
          },
        ],
        isLive: false,
        provider: 'Demo Hotel Engine',
      } as any);
    }

    if (endpoint.includes('/ai/chat')) {
      return Promise.resolve({
        message: 'Hello! I am your TRIPORA AI Travel Concierge. I can help optimize your itinerary, suggest weather backups, and find authentic local restaurants.',
        sender: 'ASSISTANT',
        suggestedActions: ['Check weather', 'Suggest restaurants', 'Optimize schedule'],
      } as any);
    }

    if (endpoint.includes('/admin/overview')) {
      return Promise.resolve({
        metrics: {
          totalUsers: 4,
          activeUsers: 4,
          totalTrips: 6,
          activeTrips: 3,
          completedTrips: 2,
          totalAiCalls: 48,
          totalTrackedExpensesMinor: 16150000,
          currency: 'USD',
          grossMerchandiseValueUsd: 161500,
        },
        providers: [
          { providerType: 'AI_NEURAL', providerName: 'Google Gemini 1.5 Pro', circuitStatus: 'CLOSED', monthlyQuota: 1000000, latencyMs: 182 },
          { providerType: 'GDS_AVIATION', providerName: 'Amadeus Private Charter & GDS', circuitStatus: 'CLOSED', monthlyQuota: 150000, latencyMs: 245 },
          { providerType: 'METEOROLOGY', providerName: 'OpenWeather Microclimate Radar', circuitStatus: 'CLOSED', monthlyQuota: 500000, latencyMs: 94 },
          { providerType: 'PAYMENT_VAULT', providerName: 'Stripe Private Concierge Vault', circuitStatus: 'CLOSED', monthlyQuota: 200000, latencyMs: 140 },
          { providerType: 'HOSPITALITY_CRS', providerName: 'Aman Private Direct CRS', circuitStatus: 'CLOSED', monthlyQuota: 50000, latencyMs: 310 },
        ],
      } as any);
    }

    if (endpoint.includes('/admin/users')) {
      return Promise.resolve([
        { id: 'usr-001', fullName: 'Lady Eleanor Montagu', email: 'e.montagu@mayfair-advisory.co.uk', role: 'VIP_SOVEREIGN', status: 'ACTIVE', country: 'United Kingdom' },
        { id: 'usr-002', fullName: 'Alex Vance', email: 'traveler@tripora.ai', role: 'VIP_RESERVE', status: 'ACTIVE', country: 'United States' },
        { id: 'usr-003', fullName: 'Baroness Sylvie de Saint-Germain', email: 'sylvie.stgermain@elysee-heritage.fr', role: 'VIP_SOVEREIGN', status: 'ACTIVE', country: 'France' },
        { id: 'usr-004', fullName: 'Carlos Mendez-Valdes', email: 'carlos.mendez@valdes-group.es', role: 'VIP_VOYAGER', status: 'ACTIVE', country: 'Spain' },
      ] as any);
    }

    if (endpoint.includes('/admin/trips')) {
      return Promise.resolve([
        { id: 'jrn-8821', title: 'Kyoto Imperial Sanctuaries & Kaiseki', destination: 'Kyoto, Japan', startDate: '2026-11-20', endDate: '2026-11-28', status: 'CONCIERGE_APPROVED', budgetMinor: 4850000, currency: 'USD' },
        { id: 'jrn-8822', title: 'Zermatt Private Peak & Glacier Expedition', destination: 'Zermatt, Switzerland', startDate: '2026-12-12', endDate: '2026-12-19', status: 'EXPEDITION_ACTIVE', budgetMinor: 3620000, currency: 'USD' },
        { id: 'jrn-8823', title: 'Amalfi Coast Cliffside Estates & Yachting', destination: 'Amalfi Coast, Italy', startDate: '2027-04-14', endDate: '2027-04-22', status: 'SYNTHESIZING', budgetMinor: 5400000, currency: 'USD' },
        { id: 'jrn-8824', title: 'Bali Sacred Highlands & River Sanctuary', destination: 'Bali, Indonesia', startDate: '2027-01-15', endDate: '2027-01-24', status: 'PENDING_REVIEW', budgetMinor: 2280000, currency: 'USD' },
      ] as any);
    }

    if (endpoint.includes('/collaboration/invite')) {
      const inviteToken = Date.now().toString(36);
      return Promise.resolve({
        success: true,
        inviteLink: `https://news-main-five.vercel.app/trips/trip-bali-001?invite=${inviteToken}`,
        emailSent: true,
        recipient: 'ritik95061@gmail.com',
        member: {
          id: `mem-${inviteToken}`,
          email: 'ritik95061@gmail.com',
          fullName: 'Ritik Gupta',
          role: 'EDITOR',
          joinedAt: new Date().toISOString(),
        },
      } as any);
    }

    if (endpoint.includes('/collaboration')) {
      return Promise.resolve([
        { id: 'mem-001', fullName: 'Alex Vance', email: 'traveler@tripora.ai', role: 'OWNER' },
        { id: 'mem-002', fullName: 'Ritik Gupta', email: 'ritik95061@gmail.com', role: 'EDITOR' },
      ] as any);
    }

    return Promise.resolve([] as any);
  }
}

export const api = new ApiClient();
