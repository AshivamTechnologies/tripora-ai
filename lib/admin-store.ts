/**
 * TRIPORA RESERVE — Administrative Enterprise Data Store & Telemetry Matrix
 * Aman, Belmond, Virtuoso & NetJets Standard Back-Office Architecture
 * Synchronized with LocalStorage & Express REST Fallback
 */

export interface Sanctuary {
  id: string;
  name: string;
  brand: 'Aman' | 'Belmond' | 'Ritz-Carlton Reserve' | 'Four Seasons Private Retreat' | 'Independent Reserve';
  location: string;
  country: string;
  propertyType: 'PRIVATE_SANCTUARY' | 'HERITAGE_ESTATE' | 'ALPINE_CHALET' | 'OVERWATER_VILLA' | 'SAFARI_LODGE';
  pricePerNightUsd: number;
  starRating: number;
  reviewScore: number;
  curatedAmenities: string[];
  imageUrl: string;
  exclusivityBadge: string;
  availableSuites: number;
  status: 'ACTIVE' | 'SEASONAL_PAUSE' | 'FULLY_BOOKED';
}

export interface BespokeJourney {
  id: string;
  referenceCode: string;
  travelerName: string;
  travelerEmail: string;
  memberTier: 'SOVEREIGN_BLACK' | 'RESERVE_ELITE' | 'VOYAGER';
  destination: string;
  dates: string;
  durationDays: number;
  budgetVolumeUsd: number;
  assignedConciergeDesk: 'Kyoto Desk' | 'Zurich Desk' | 'Amalfi Desk' | 'St. Moritz Desk' | 'London Desk';
  status: 'PENDING_REVIEW' | 'SYNTHESIZING' | 'CONCIERGE_APPROVED' | 'EXPEDITION_ACTIVE' | 'COMPLETED';
  privateConciergeDirective: string;
  flightArrangement: string;
  sanctuaryName: string;
  createdAt: string;
}

export interface AviationCharter {
  id: string;
  tailNumber: string;
  aircraftModel: string;
  route: string;
  departureFBO: string;
  arrivalFBO: string;
  departureTime: string;
  capacitySeats: number;
  status: 'CONFIRMED' | 'DISPATCHED' | 'STANDBY' | 'EMPTY_LEG_OPEN';
  charterRateUsd: number;
  cateringNotes: string;
}

export interface VIPMember {
  id: string;
  fullName: string;
  email: string;
  memberTier: 'SOVEREIGN_BLACK' | 'RESERVE_ELITE' | 'VOYAGER';
  lifetimeSpendUsd: number;
  completedExpeditions: number;
  kycStatus: 'VERIFIED_DIPLOMATIC' | 'VERIFIED' | 'PENDING';
  homeCity: string;
  joinedDate: string;
  preferences: {
    aviation: string;
    hospitality: string;
    dietary: string;
    wellness: string;
  };
  conciergeNotes: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  slug: string;
  category: 'CULTURAL_DISPATCH' | 'HERITAGE_RAIL' | 'PRIVATE_RETREAT' | 'GASTRONOMY';
  author: string;
  readTimeMin: number;
  featuredImage: string;
  status: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT';
  publishDate: string;
  isSpotlightHero: boolean;
}

export interface ProviderCircuit {
  id: string;
  name: string;
  category: 'AI_NEURAL' | 'GDS_AVIATION' | 'HOSPITALITY_CRS' | 'METEOROLOGY' | 'PAYMENT_VAULT';
  status: 'OPERATIONAL' | 'DEGRADED' | 'CIRCUIT_TRIPPED';
  latencyMs: number;
  uptimePct: number;
  monthlyQuota: number;
  quotaUsed: number;
  endpointUrl: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  ipAddress: string;
  signature: string;
}

// ==========================================
// SEEDED LUXURY REFERENCE DATA
// ==========================================

export const INITIAL_SANCTUARIES: Sanctuary[] = [
  {
    id: 'sanc-aman-kyoto',
    name: 'Aman Kyoto Secret Pavilion',
    brand: 'Aman',
    location: 'Takagamine, Kyoto',
    country: 'Japan',
    propertyType: 'PRIVATE_SANCTUARY',
    pricePerNightUsd: 2850,
    starRating: 5,
    reviewScore: 9.9,
    curatedAmenities: ['Private Onsen Sanctuary', 'Moss Garden Pavilion', 'Dedicated Butler', 'Kaiseki Banqueting', 'Helipad Access'],
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200',
    exclusivityBadge: 'Aman Curated',
    availableSuites: 4,
    status: 'ACTIVE',
  },
  {
    id: 'sanc-belmond-caruso',
    name: 'Belmond Hotel Caruso & Cliffside Suites',
    brand: 'Belmond',
    location: 'Ravello, Amalfi Coast',
    country: 'Italy',
    propertyType: 'HERITAGE_ESTATE',
    pricePerNightUsd: 3400,
    starRating: 5,
    reviewScore: 9.8,
    curatedAmenities: ['Infinity Caldera Pool', 'Private Riva Yacht', '11th-Century Frescoes', 'Sommelier Cellar', 'Terrace Dining'],
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200',
    exclusivityBadge: 'Belmond Signature',
    availableSuites: 2,
    status: 'ACTIVE',
  },
  {
    id: 'sanc-mandapa-ritz',
    name: 'Mandapa, a Ritz-Carlton Reserve',
    brand: 'Ritz-Carlton Reserve',
    location: 'Ayung River, Ubud',
    country: 'Indonesia',
    propertyType: 'PRIVATE_SANCTUARY',
    pricePerNightUsd: 1450,
    starRating: 5,
    reviewScore: 9.8,
    curatedAmenities: ['Riverfront Pool Villa', 'Private Patih Butler', 'Sacred Forest Spa', 'Organic Permaculture', 'Temple Ceremony'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
    exclusivityBadge: 'Private Reserve',
    availableSuites: 6,
    status: 'ACTIVE',
  },
  {
    id: 'sanc-zermatt-chalet',
    name: 'Chalet Zermatt Peak Estate',
    brand: 'Independent Reserve',
    location: 'Matterhorn View, Zermatt',
    country: 'Switzerland',
    propertyType: 'ALPINE_CHALET',
    pricePerNightUsd: 4800,
    starRating: 5,
    reviewScore: 9.9,
    curatedAmenities: ['Direct Matterhorn View', 'Private Michelin Chef', 'Wellness Grotto', 'Chauffeured Electric Taxi', 'Ski-in Ski-out'],
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200',
    exclusivityBadge: 'Rare Heritage',
    availableSuites: 1,
    status: 'ACTIVE',
  },
  {
    id: 'sanc-bambu-indah',
    name: 'Bambu Indah Eco Lifestyle Sanctuary',
    brand: 'Independent Reserve',
    location: 'Sayan Ridge, Ubud',
    country: 'Indonesia',
    propertyType: 'PRIVATE_SANCTUARY',
    pricePerNightUsd: 820,
    starRating: 5,
    reviewScore: 9.6,
    curatedAmenities: ['Natural River Pools', 'Antique Javanese Houses', 'Riverside Dining', 'Permaculture Gardens'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200',
    exclusivityBadge: 'Private Reserve',
    availableSuites: 5,
    status: 'ACTIVE',
  },
  {
    id: 'sanc-cheval-blanc',
    name: 'Cheval Blanc St-Tropez Seaside Penthouse',
    brand: 'Four Seasons Private Retreat',
    location: 'Baie des Bouillabaisse, St-Tropez',
    country: 'France',
    propertyType: 'HERITAGE_ESTATE',
    pricePerNightUsd: 5200,
    starRating: 5,
    reviewScore: 9.9,
    curatedAmenities: ['Private Plage Access', '3-Michelin Star Dining', 'Guerlain Cheval Blanc Spa', 'Private Boat Moorings'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
    exclusivityBadge: 'Rare Heritage',
    availableSuites: 2,
    status: 'ACTIVE',
  },
];

export const INITIAL_BESPOKE_JOURNEYS: BespokeJourney[] = [
  {
    id: 'jrn-8821',
    referenceCode: 'TR-VIP-8821',
    travelerName: 'Lady Eleanor Montagu',
    travelerEmail: 'e.montagu@mayfair-advisory.co.uk',
    memberTier: 'SOVEREIGN_BLACK',
    destination: 'Kyoto, Japan',
    dates: 'Nov 20 - Nov 28, 2026',
    durationDays: 8,
    budgetVolumeUsd: 48500,
    assignedConciergeDesk: 'Kyoto Desk',
    status: 'CONCIERGE_APPROVED',
    privateConciergeDirective: 'Private tea master ceremony confirmed at Daitoku-ji with 15th-generation master. High-floor machiya suite reserved. Airport tarmac escort via RJBB VIP lounge.',
    flightArrangement: 'Singapore Airlines Suites (SQ 31 / SQ 944) Lie-Flat',
    sanctuaryName: 'Aman Kyoto Secret Pavilion',
    createdAt: '2026-11-10T14:22:00Z',
  },
  {
    id: 'jrn-8822',
    referenceCode: 'TR-VIP-8822',
    travelerName: 'Alex Vance',
    travelerEmail: 'traveler@tripora.ai',
    memberTier: 'RESERVE_ELITE',
    destination: 'Zermatt & Swiss Alps',
    dates: 'Dec 12 - Dec 19, 2026',
    durationDays: 7,
    budgetVolumeUsd: 36200,
    assignedConciergeDesk: 'Zurich Desk',
    status: 'EXPEDITION_ACTIVE',
    privateConciergeDirective: 'Helicopter transfer Zurich FBO (LSZH) to Zermatt heliport. Matterhorn Glacier private ski instructor and Dom Pérignon vintage reception arranged.',
    flightArrangement: 'Private Bombardier Global 7500 Charter',
    sanctuaryName: 'Chalet Zermatt Peak Estate',
    createdAt: '2026-11-08T09:15:00Z',
  },
  {
    id: 'jrn-8823',
    referenceCode: 'TR-VIP-8823',
    travelerName: 'Baroness Sylvie de Saint-Germain',
    travelerEmail: 'sylvie.stgermain@elysee-heritage.fr',
    memberTier: 'SOVEREIGN_BLACK',
    destination: 'Amalfi Coast, Italy',
    dates: 'Apr 14 - Apr 22, 2027',
    durationDays: 8,
    budgetVolumeUsd: 54000,
    assignedConciergeDesk: 'Amalfi Desk',
    status: 'SYNTHESIZING',
    privateConciergeDirective: 'Synthesizing private Riva yacht excursion along Capri sea caves and private dinner at 2-Michelin Star Quattro Passi with cellar tour.',
    flightArrangement: 'Gulfstream G650ER Private Jet (Paris Le Bourget → Naples)',
    sanctuaryName: 'Belmond Hotel Caruso & Cliffside Suites',
    createdAt: '2026-11-12T11:04:00Z',
  },
  {
    id: 'jrn-8824',
    referenceCode: 'TR-VIP-8824',
    travelerName: 'Carlos Mendez-Valdes',
    travelerEmail: 'carlos.mendez@valdes-group.es',
    memberTier: 'VOYAGER',
    destination: 'Bali & Ubud Sacred Highlands',
    dates: 'Jan 15 - Jan 24, 2027',
    durationDays: 9,
    budgetVolumeUsd: 22800,
    assignedConciergeDesk: 'Kyoto Desk',
    status: 'PENDING_REVIEW',
    privateConciergeDirective: 'Requesting holy water temple purification ceremony at Tirta Empul with high priest and private helicopter flight over Mount Batur crater.',
    flightArrangement: 'Cathay Pacific First Class',
    sanctuaryName: 'Mandapa, a Ritz-Carlton Reserve',
    createdAt: '2026-11-12T16:30:00Z',
  },
];

export const INITIAL_AVIATION_CHARTERS: AviationCharter[] = [
  {
    id: 'av-701',
    tailNumber: 'N700TP',
    aircraftModel: 'Bombardier Global 7500',
    route: 'Teterboro FBO (KTEB) → Zurich Private (LSZH)',
    departureFBO: 'Jet Aviation KTEB',
    arrivalFBO: 'Cat Air Service LSZH',
    departureTime: '2026-11-20 22:30 UTC',
    capacitySeats: 14,
    status: 'DISPATCHED',
    charterRateUsd: 115000,
    cateringNotes: 'Imperial Ossetra Caviar, Krug Clos d’Ambonnay 2002, bespoke gluten-free tasting menu',
  },
  {
    id: 'av-702',
    tailNumber: 'HB-JSA',
    aircraftModel: 'Gulfstream G650ER',
    route: 'Zurich FBO (LSZH) → Samedan St. Moritz (LSZS)',
    departureFBO: 'Cat Air Service LSZH',
    arrivalFBO: 'Engadin Airport LSZS',
    departureTime: '2026-11-21 14:00 UTC',
    capacitySeats: 12,
    status: 'CONFIRMED',
    charterRateUsd: 28000,
    cateringNotes: 'Swiss mountain herbal infusion, hot Valais fondue bites, alpine thermal blankets',
  },
  {
    id: 'av-703',
    tailNumber: '9V-SKU',
    aircraftModel: 'Singapore Airlines A380 Suites',
    route: 'London Heathrow (EGLL) → Singapore Changi (WSSS)',
    departureFBO: 'Terminal 2 VIP Suites',
    arrivalFBO: 'JetQuay CIP Terminal',
    departureTime: '2026-11-23 11:20 UTC',
    capacitySeats: 6,
    status: 'CONFIRMED',
    charterRateUsd: 18500,
    cateringNotes: 'Book the Cook: Lobster Thermidor, Dom Pérignon 2013, Lalique pyjamas',
  },
  {
    id: 'av-704',
    tailNumber: 'F-HBLX',
    aircraftModel: 'Dassault Falcon 8X',
    route: 'Paris Le Bourget (LFPB) → Naples FBO (LIRN)',
    departureFBO: 'Signature Flight Le Bourget',
    arrivalFBO: 'Sky Services Capodichino',
    departureTime: '2026-11-25 09:45 UTC',
    capacitySeats: 14,
    status: 'EMPTY_LEG_OPEN',
    charterRateUsd: 19500,
    cateringNotes: 'Empty-leg special routing. French bakery selection, fresh Amalfi lemon sorbet upon descent',
  },
];

export const INITIAL_VIP_MEMBERS: VIPMember[] = [
  {
    id: 'mbr-001',
    fullName: 'Lady Eleanor Montagu',
    email: 'e.montagu@mayfair-advisory.co.uk',
    memberTier: 'SOVEREIGN_BLACK',
    lifetimeSpendUsd: 248000,
    completedExpeditions: 6,
    kycStatus: 'VERIFIED_DIPLOMATIC',
    homeCity: 'London & Geneva',
    joinedDate: '2024-03-12',
    preferences: {
      aviation: 'Non-stop private lie-flat suites only. Tarmac private car escort required at all FBOs.',
      hospitality: 'Top-floor corner suite with natural wood finishes. 800-fill Hungarian goose down pillows. Unscented botanical toiletries.',
      dietary: 'Strict pescatarian, zero shellfish. Burgundy Grand Cru enthusiast (Romanée-Conti, Coche-Dury).',
      wellness: 'Private morning Zen meditation master. Silent sunrise garden walks.',
    },
    conciergeNotes: 'Prefers quiet discrete check-in. Never solicit for feedback in person. All gratuities pre-arranged on master folio.',
  },
  {
    id: 'mbr-002',
    fullName: 'Alex Vance',
    email: 'traveler@tripora.ai',
    memberTier: 'RESERVE_ELITE',
    lifetimeSpendUsd: 84200,
    completedExpeditions: 3,
    kycStatus: 'VERIFIED',
    homeCity: 'New York',
    joinedDate: '2025-01-18',
    preferences: {
      aviation: 'Window seat forward cabin. Fast-track biometric customs line.',
      hospitality: 'High-speed encrypted fiber Wi-Fi. Quiet wing away from elevators. Espresso machine in dressing lounge.',
      dietary: 'Farm-to-table organic. Enjoys pairing local biodynamic wines with regional tasting menus.',
      wellness: 'Daily 7:00 AM lap pool availability and sports massage post-expedition.',
    },
    conciergeNotes: 'Active tech innovator. Appreciates receiving digital itinerary telemetry and weather radar overlays.',
  },
  {
    id: 'mbr-003',
    fullName: 'Baroness Sylvie de Saint-Germain',
    email: 'sylvie.stgermain@elysee-heritage.fr',
    memberTier: 'SOVEREIGN_BLACK',
    lifetimeSpendUsd: 312000,
    completedExpeditions: 8,
    kycStatus: 'VERIFIED_DIPLOMATIC',
    homeCity: 'Paris & Monaco',
    joinedDate: '2023-09-04',
    preferences: {
      aviation: 'Gulfstream G650ER or Falcon 8X. Cabin temperature strictly maintained at 19°C.',
      hospitality: 'Historical suites with heritage architecture. Fresh white orchids and lavender mist upon arrival.',
      dietary: 'Haute cuisine only. Prefers Michelin 3-star chefs and discreet private dining salons.',
      wellness: 'Private thermal spa access and bespoke restorative aromatherapy treatments.',
    },
    conciergeNotes: 'Travels with private security officer. Requires adjoining suite with secure interior connecting door.',
  },
  {
    id: 'mbr-004',
    fullName: 'Carlos Mendez-Valdes',
    email: 'carlos.mendez@valdes-group.es',
    memberTier: 'VOYAGER',
    lifetimeSpendUsd: 42500,
    completedExpeditions: 2,
    kycStatus: 'VERIFIED',
    homeCity: 'Madrid',
    joinedDate: '2025-07-29',
    preferences: {
      aviation: 'Business or First Class lie-flat. Priority baggage handling.',
      hospitality: 'Panoramic nature or ocean view. King bedding with firm mattress.',
      dietary: 'Mediterranean, loves authentic regional seafood and local cultural cuisine.',
      wellness: 'Outdoor adventure, private helicopter excursions, and guided diving.',
    },
    conciergeNotes: 'Enthusiastic explorer celebrating anniversary in Bali early 2027.',
  },
];

export const INITIAL_EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-001',
    title: 'The Architecture of Stillness: Inside Takagamine’s Secret Machiya Pavilions',
    slug: 'architecture-of-stillness-kyoto',
    category: 'CULTURAL_DISPATCH',
    author: 'Kenzo Tange Studio & Editorial Staff',
    readTimeMin: 7,
    featuredImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    status: 'PUBLISHED',
    publishDate: '2026-11-05',
    isSpotlightHero: true,
  },
  {
    id: 'art-002',
    title: 'Glacier Rail & The Private Salons of the Engadin Express',
    slug: 'glacier-rail-engadin-express',
    category: 'HERITAGE_RAIL',
    author: 'Lucerne Railway Historical Society',
    readTimeMin: 9,
    featuredImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
    status: 'PUBLISHED',
    publishDate: '2026-11-08',
    isSpotlightHero: true,
  },
  {
    id: 'art-003',
    title: 'The Last Riva Runabouts: Private Mooring Along Ravello’s Sunken Caves',
    slug: 'riva-runabouts-ravello-caves',
    category: 'PRIVATE_RETREAT',
    author: 'Amalfi Maritime Guild',
    readTimeMin: 6,
    featuredImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    status: 'PUBLISHED',
    publishDate: '2026-11-10',
    isSpotlightHero: false,
  },
  {
    id: 'art-004',
    title: 'Autumnal Matsutake & The Kaiseki Rituals of Gion',
    slug: 'autumn-matsutake-kaiseki-gion',
    category: 'GASTRONOMY',
    author: 'Master Chef Isao Murata',
    readTimeMin: 8,
    featuredImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    status: 'DRAFT',
    publishDate: '2026-11-15',
    isSpotlightHero: false,
  },
];

export const INITIAL_PROVIDER_CIRCUITS: ProviderCircuit[] = [
  {
    id: 'prv-gemini',
    name: 'Google Gemini 1.5 Pro Neural Engine',
    category: 'AI_NEURAL',
    status: 'OPERATIONAL',
    latencyMs: 182,
    uptimePct: 99.98,
    monthlyQuota: 1000000,
    quotaUsed: 142800,
    endpointUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro',
  },
  {
    id: 'prv-amadeus',
    name: 'Amadeus Private Charter & GDS Global Matrix',
    category: 'GDS_AVIATION',
    status: 'OPERATIONAL',
    latencyMs: 245,
    uptimePct: 99.92,
    monthlyQuota: 150000,
    quotaUsed: 31200,
    endpointUrl: 'https://api.amadeus.com/v2/shopping/flight-offers',
  },
  {
    id: 'prv-openweather',
    name: 'OpenWeather Hyperlocal Microclimate Radar',
    category: 'METEOROLOGY',
    status: 'OPERATIONAL',
    latencyMs: 94,
    uptimePct: 99.99,
    monthlyQuota: 500000,
    quotaUsed: 89400,
    endpointUrl: 'https://api.openweathermap.org/data/3.0/onecall',
  },
  {
    id: 'prv-stripe',
    name: 'Stripe Private Concierge Vault (PCI-DSS L1)',
    category: 'PAYMENT_VAULT',
    status: 'OPERATIONAL',
    latencyMs: 140,
    uptimePct: 99.99,
    monthlyQuota: 200000,
    quotaUsed: 42000,
    endpointUrl: 'https://api.stripe.com/v1/payment_intents',
  },
  {
    id: 'prv-aman-crs',
    name: 'Aman Private Direct CRS & Key Exchange',
    category: 'HOSPITALITY_CRS',
    status: 'OPERATIONAL',
    latencyMs: 310,
    uptimePct: 99.85,
    monthlyQuota: 50000,
    quotaUsed: 8200,
    endpointUrl: 'https://secure.aman.com/api/v3/inventory/reserve',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-991',
    timestamp: '2026-11-12 17:42:15 UTC',
    actor: 'Admin (Master Concierge)',
    action: 'HAIRLINE_DIVIDERS_DEPLOYED',
    details: 'Calibrated luxury gold hairline dividers framing navigation and 61.5px breathing room on production.',
    ipAddress: '192.168.1.10 (London Desk)',
    signature: 'SHA256:8f2a1b9c4d3e2f1a',
  },
  {
    id: 'aud-990',
    timestamp: '2026-11-12 16:30:10 UTC',
    actor: 'Zurich Concierge Desk',
    action: 'EXPEDITION_APPROVED',
    details: 'Approved Bombardier Global 7500 charter and Matterhorn Glacier helicopter slot for Alex Vance (TR-VIP-8822).',
    ipAddress: '194.230.14.88 (Zurich FBO)',
    signature: 'SHA256:7c3b2e1a9f0d4b8c',
  },
  {
    id: 'aud-989',
    timestamp: '2026-11-12 14:15:40 UTC',
    actor: 'Kyoto Concierge Desk',
    action: 'SANCTUARY_RATE_OVERRIDE',
    details: 'Updated seasonal autumn peak rate for Aman Kyoto Secret Pavilion to $2,850/night.',
    ipAddress: '133.242.18.90 (Kyoto Imperial)',
    signature: 'SHA256:5a9e3d7c1b2f8a4e',
  },
  {
    id: 'aud-988',
    timestamp: '2026-11-12 11:05:00 UTC',
    actor: 'AI Neural Matrix',
    action: 'GEMINI_15_PRO_SYNTHESIS',
    details: 'Synthesized 8-day bespoke Amalfi Coast itinerary for Baroness Sylvie de Saint-Germain.',
    ipAddress: '34.120.98.4 (Google Cloud Us-East1)',
    signature: 'SHA256:1d8f7c4b2a9e3b5a',
  },
];

// ==========================================
// STATE MANAGEMENT & LOCAL STORAGE SYNC
// ==========================================

const STORAGE_KEYS = {
  SANCTUARIES: 'tripora_admin_sanctuaries_v2',
  JOURNEYS: 'tripora_admin_journeys_v2',
  AVIATION: 'tripora_admin_aviation_v2',
  MEMBERS: 'tripora_admin_members_v2',
  EDITORIAL: 'tripora_admin_editorial_v2',
  CIRCUITS: 'tripora_admin_circuits_v2',
  AUDIT_LOGS: 'tripora_admin_audit_logs_v2',
};

class AdminStore {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getItem<T>(key: string, fallback: T): T {
    if (!this.isBrowser()) return fallback;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }
  }

  // --- Sanctuaries ---
  public getSanctuaries(): Sanctuary[] {
    return this.getItem(STORAGE_KEYS.SANCTUARIES, INITIAL_SANCTUARIES);
  }

  public addSanctuary(item: Omit<Sanctuary, 'id'>): Sanctuary {
    const all = this.getSanctuaries();
    const newSanctuary: Sanctuary = {
      ...item,
      id: `sanc-${Date.now().toString(36)}`,
    };
    all.unshift(newSanctuary);
    this.setItem(STORAGE_KEYS.SANCTUARIES, all);
    this.addAuditLog('SANCTUARY_CREATED', `Added new luxury sanctuary: ${newSanctuary.name} (${newSanctuary.location})`);
    return newSanctuary;
  }

  public updateSanctuary(id: string, updates: Partial<Sanctuary>): void {
    const all = this.getSanctuaries();
    const idx = all.findIndex((s) => s.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...updates };
      this.setItem(STORAGE_KEYS.SANCTUARIES, all);
      this.addAuditLog('SANCTUARY_UPDATED', `Updated sanctuary: ${all[idx].name}`);
    }
  }

  public deleteSanctuary(id: string): void {
    const all = this.getSanctuaries();
    const target = all.find((s) => s.id === id);
    const filtered = all.filter((s) => s.id !== id);
    this.setItem(STORAGE_KEYS.SANCTUARIES, filtered);
    if (target) {
      this.addAuditLog('SANCTUARY_DELETED', `Removed sanctuary from reserve: ${target.name}`);
    }
  }

  // --- Bespoke Journeys ---
  public getJourneys(): BespokeJourney[] {
    return this.getItem(STORAGE_KEYS.JOURNEYS, INITIAL_BESPOKE_JOURNEYS);
  }

  public updateJourneyStatus(id: string, status: BespokeJourney['status']): void {
    const all = this.getJourneys();
    const idx = all.findIndex((j) => j.id === id);
    if (idx !== -1) {
      all[idx].status = status;
      this.setItem(STORAGE_KEYS.JOURNEYS, all);
      this.addAuditLog('JOURNEY_STATUS_MUTATION', `Updated ${all[idx].referenceCode} status to ${status}`);
    }
  }

  public assignJourneyDesk(id: string, desk: BespokeJourney['assignedConciergeDesk']): void {
    const all = this.getJourneys();
    const idx = all.findIndex((j) => j.id === id);
    if (idx !== -1) {
      all[idx].assignedConciergeDesk = desk;
      this.setItem(STORAGE_KEYS.JOURNEYS, all);
      this.addAuditLog('CONCIERGE_DESK_REASSIGNED', `Assigned ${all[idx].referenceCode} to ${desk}`);
    }
  }

  public updateJourneyDirective(id: string, directive: string): void {
    const all = this.getJourneys();
    const idx = all.findIndex((j) => j.id === id);
    if (idx !== -1) {
      all[idx].privateConciergeDirective = directive;
      this.setItem(STORAGE_KEYS.JOURNEYS, all);
      this.addAuditLog('CONCIERGE_DIRECTIVE_UPDATED', `Updated private concierge directive for ${all[idx].referenceCode}`);
    }
  }

  // --- Aviation Charters ---
  public getAviationCharters(): AviationCharter[] {
    return this.getItem(STORAGE_KEYS.AVIATION, INITIAL_AVIATION_CHARTERS);
  }

  public updateAviationStatus(id: string, status: AviationCharter['status']): void {
    const all = this.getAviationCharters();
    const idx = all.findIndex((a) => a.id === id);
    if (idx !== -1) {
      all[idx].status = status;
      this.setItem(STORAGE_KEYS.AVIATION, all);
      this.addAuditLog('AVIATION_DISPATCH_MUTATED', `Flight ${all[idx].tailNumber} status changed to ${status}`);
    }
  }

  // --- VIP Members ---
  public getMembers(): VIPMember[] {
    return this.getItem(STORAGE_KEYS.MEMBERS, INITIAL_VIP_MEMBERS);
  }

  public updateMemberTier(id: string, tier: VIPMember['memberTier']): void {
    const all = this.getMembers();
    const idx = all.findIndex((m) => m.id === id);
    if (idx !== -1) {
      all[idx].memberTier = tier;
      this.setItem(STORAGE_KEYS.MEMBERS, all);
      this.addAuditLog('MEMBER_TIER_OVERRIDE', `Updated ${all[idx].fullName} to tier ${tier}`);
    }
  }

  public updateMemberPreferences(id: string, preferences: VIPMember['preferences'], conciergeNotes: string): void {
    const all = this.getMembers();
    const idx = all.findIndex((m) => m.id === id);
    if (idx !== -1) {
      all[idx].preferences = preferences;
      all[idx].conciergeNotes = conciergeNotes;
      this.setItem(STORAGE_KEYS.MEMBERS, all);
      this.addAuditLog('VIP_PREFERENCES_UPDATED', `Updated luxury preference dossier for ${all[idx].fullName}`);
    }
  }

  // --- Editorial Articles ---
  public getEditorialArticles(): EditorialArticle[] {
    return this.getItem(STORAGE_KEYS.EDITORIAL, INITIAL_EDITORIAL_ARTICLES);
  }

  public toggleArticleSpotlight(id: string): void {
    const all = this.getEditorialArticles();
    const idx = all.findIndex((a) => a.id === id);
    if (idx !== -1) {
      all[idx].isSpotlightHero = !all[idx].isSpotlightHero;
      this.setItem(STORAGE_KEYS.EDITORIAL, all);
      this.addAuditLog('EDITORIAL_SPOTLIGHT_TOGGLED', `Toggled hero spotlight for article: ${all[idx].title}`);
    }
  }

  public toggleArticleStatus(id: string): void {
    const all = this.getEditorialArticles();
    const idx = all.findIndex((a) => a.id === id);
    if (idx !== -1) {
      all[idx].status = all[idx].status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
      this.setItem(STORAGE_KEYS.EDITORIAL, all);
      this.addAuditLog('EDITORIAL_STATUS_CHANGED', `Changed publication status of: ${all[idx].title} to ${all[idx].status}`);
    }
  }

  // --- Provider Circuits ---
  public getProviderCircuits(): ProviderCircuit[] {
    return this.getItem(STORAGE_KEYS.CIRCUITS, INITIAL_PROVIDER_CIRCUITS);
  }

  public toggleProviderCircuit(id: string): void {
    const all = this.getProviderCircuits();
    const idx = all.findIndex((c) => c.id === id);
    if (idx !== -1) {
      all[idx].status = all[idx].status === 'OPERATIONAL' ? 'CIRCUIT_TRIPPED' : 'OPERATIONAL';
      this.setItem(STORAGE_KEYS.CIRCUITS, all);
      this.addAuditLog(
        'CIRCUIT_BREAKER_TOGGLED',
        `Manually toggled ${all[idx].name} circuit breaker to ${all[idx].status}`
      );
    }
  }

  // --- Audit Trail ---
  public getAuditLogs(): AuditLogEntry[] {
    return this.getItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  public addAuditLog(action: string, details: string, actor = 'Tripora Chief Administrator'): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now().toString(36)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actor,
      action,
      details,
      ipAddress: '127.0.0.1 (Executive Console)',
      signature: 'SHA256:' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
    };
    logs.unshift(newLog);
    // Keep max 100 entries
    if (logs.length > 100) logs.pop();
    this.setItem(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  // --- Reset All To Seeded Defaults ---
  public resetToDefaults(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.SANCTUARIES);
    localStorage.removeItem(STORAGE_KEYS.JOURNEYS);
    localStorage.removeItem(STORAGE_KEYS.AVIATION);
    localStorage.removeItem(STORAGE_KEYS.MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.EDITORIAL);
    localStorage.removeItem(STORAGE_KEYS.CIRCUITS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
  }

  // --- Executive Metrics Computation ---
  public getExecutiveMetrics() {
    const journeys = this.getJourneys();
    const sanctuaries = this.getSanctuaries();
    const members = this.getMembers();
    const aviation = this.getAviationCharters();

    const gmvVolumeUsd = journeys.reduce((sum, j) => sum + j.budgetVolumeUsd, 0) +
      aviation.reduce((sum, a) => sum + a.charterRateUsd, 0);

    const activeExpeditions = journeys.filter(
      (j) => j.status === 'EXPEDITION_ACTIVE' || j.status === 'CONCIERGE_APPROVED'
    ).length;

    const pendingRequests = journeys.filter((j) => j.status === 'PENDING_REVIEW' || j.status === 'SYNTHESIZING').length;

    return {
      grossMerchandiseValueUsd: gmvVolumeUsd,
      totalCuratedSanctuaries: sanctuaries.length,
      activeExpeditions,
      pendingRequests,
      totalVipMembers: members.length,
      activeAviationCharters: aviation.filter((a) => a.status === 'CONFIRMED' || a.status === 'DISPATCHED').length,
      averageConciergeSlaMin: 4.8,
      neuralMatrixLatencyMs: 182,
      conciergeDesks: [
        { name: 'Kyoto Desk', status: 'ONLINE', load: 'Nominal', time: '06:15 AM JST' },
        { name: 'Zurich Desk', status: 'ONLINE', load: 'Optimal', time: '10:15 PM CET' },
        { name: 'Amalfi Desk', status: 'ONLINE', load: 'Standby', time: '10:15 PM CET' },
        { name: 'St. Moritz Desk', status: 'ONLINE', load: 'Optimal', time: '10:15 PM CET' },
      ],
    };
  }
}

export const adminStore = new AdminStore();
