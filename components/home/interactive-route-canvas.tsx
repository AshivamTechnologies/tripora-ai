'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Plane,
  Sparkles,
  ArrowRight,
  Sun,
  Clock,
  Calendar,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

interface JourneyPreset {
  id: string;
  title: string;
  tagline: string;
  region: string;
  durationDays: number;
  estimatedBudget: string;
  climate: string;
  heroImage: string;
  stops: Array<{
    day: string;
    city: string;
    landmark: string;
    highlight: string;
    vibe: string;
  }>;
}

const JOURNEYS: JourneyPreset[] = [
  {
    id: 'japan-heritage',
    title: 'The Imperial Japan Odyssey',
    tagline: 'From neon high-rises in Shinjuku to ancient bamboo groves in Arashiyama.',
    region: 'East Asia',
    durationDays: 8,
    estimatedBudget: '$2,400 / traveler',
    climate: '18°C · Mild & Clear',
    heroImage: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    stops: [
      { day: 'Days 1-3', city: 'Tokyo', landmark: 'Shinjuku Gyoen & Senso-ji', highlight: 'Morning Tsukiji outer market sushi & teamLab digital art', vibe: 'Urban & Modern' },
      { day: 'Day 4', city: 'Hakone', landmark: 'Mount Fuji & Lake Ashi', highlight: 'Private onsen ryokan soak with traditional multi-course Kaiseki', vibe: 'Thermal Wellness' },
      { day: 'Days 5-7', city: 'Kyoto', landmark: 'Fushimi Inari & Gion', highlight: 'Early morning torii gate walk & private Urasenke tea ceremony', vibe: 'Ancient Heritage' },
      { day: 'Day 8', city: 'Osaka', landmark: 'Dotonbori & Osaka Castle', highlight: 'Farewell street food tour & artisanal knife making', vibe: 'Gastronomy' },
    ],
  },
  {
    id: 'swiss-alps-express',
    title: 'Alpine Swiss Glacier & Lakes',
    tagline: 'Panoramic cogwheel train crossings beneath the Matterhorn and glacial summits.',
    region: 'Central Europe',
    durationDays: 7,
    estimatedBudget: '$3,100 / traveler',
    climate: '11°C · Crisp Alpine',
    heroImage: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    stops: [
      { day: 'Days 1-2', city: 'Zurich & Lucerne', landmark: 'Chapel Bridge & Lake Lucerne', highlight: 'Steamer boat cruise across alpine fjord and Old Town walk', vibe: 'Historic Lakeside' },
      { day: 'Days 3-4', city: 'Interlaken & Lauterbrunnen', landmark: '72 Waterfalls Valley', highlight: 'Jungfraujoch Top of Europe rail journey & alpine cheese fondue', vibe: 'Mountain Wonder' },
      { day: 'Days 5-7', city: 'Zermatt', landmark: 'Gornergrat Matterhorn Viewpoint', highlight: 'Glacier Express first-class panoramic car & alpine wellness chalet', vibe: 'Iconic Peaks' },
    ],
  },
  {
    id: 'bali-wellness',
    title: 'Balinese Sanctuary & Sacred Reefs',
    tagline: 'Emerald volcanic valleys, spiritual water blessings, and secluded clifftop sunsets.',
    region: 'Southeast Asia',
    durationDays: 9,
    estimatedBudget: '$1,850 / traveler',
    climate: '29°C · Tropical Sunshine',
    heroImage: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    stops: [
      { day: 'Days 1-4', city: 'Ubud', landmark: 'Tegallalang & Tirta Empul', highlight: 'Sunrise holy water purification and private jungle infinity pool villa', vibe: 'Spiritual Sanctuary' },
      { day: 'Days 5-6', city: 'Munduk', landmark: 'Twin Lakes & Coffee Plantations', highlight: 'Mountain ridge trekking and organic Balinese cacao roasting', vibe: 'Highland Nature' },
      { day: 'Days 7-9', city: 'Uluwatu', landmark: 'Cliffside Temple & Padang Beach', highlight: 'Sunset Kecak fire dance and oceanfront seafood feast at Jimbaran', vibe: 'Coastal Elegance' },
    ],
  },
];

export function InteractiveRouteCanvas() {
  const [selectedJourney, setSelectedJourney] = useState<JourneyPreset>(JOURNEYS[0]);

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
            <Compass className="h-3.5 w-3.5 text-brand-gold" />
            Curated Grand Journeys
          </div>
          <h2 className="text-4xl sm:text-5xl text-brand-ink font-serif tracking-tight">
            Multi-destination routes, sequenced to perfection.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-muted max-w-xl">
            Choose a signature route below to inspect real transit legs, daily pacing, and verified local highlights.
          </p>
        </div>

        {/* Route Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {JOURNEYS.map((j) => {
            const isCurrent = selectedJourney.id === j.id;
            return (
              <button
                key={j.id}
                type="button"
                onClick={() => setSelectedJourney(j)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isCurrent
                    ? 'bg-brand-forest text-white shadow-lg shadow-brand-forest/25'
                    : 'bg-white border border-brand-line text-brand-muted hover:text-brand-ink hover:border-brand-sage'
                }`}
              >
                {j.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedJourney.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-brand-line bg-white shadow-2xl overflow-hidden grid lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Left: Journey Hero & Meta */}
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-brand-ink min-h-[380px]">
            <img
              src={selectedJourney.heroImage}
              alt={selectedJourney.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/40 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-8 sm:p-10 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand-ink">
                  {selectedJourney.durationDays} Days Curated
                </span>
                <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-medium text-white">
                  {selectedJourney.region}
                </span>
                <span className="rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-medium text-emerald-300 flex items-center gap-1">
                  <Sun className="h-3 w-3" />
                  {selectedJourney.climate}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif text-white">{selectedJourney.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-white/85 max-w-lg leading-relaxed font-light">
                {selectedJourney.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 pt-5 border-t border-white/20 text-xs sm:text-sm">
                <div>
                  <div className="text-white/60 text-xs uppercase font-medium">Estimated Total</div>
                  <div className="text-lg font-serif font-bold text-white mt-0.5">{selectedJourney.estimatedBudget}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase font-medium">Pacing</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Balanced Luxury</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs uppercase font-medium">Transit</div>
                  <div className="text-sm font-semibold text-white mt-0.5">High-Speed Rail & Driver</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Route Stops & Leg Timeline */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-brand-mist/30">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">
                  Sequential Itinerary Legs
                </span>
                <span className="text-xs font-mono text-brand-muted bg-white px-2.5 py-1 rounded-md border border-brand-line">
                  4 Coordinated Hubs
                </span>
              </div>

              <div className="space-y-4">
                {selectedJourney.stops.map((stop, index) => (
                  <div
                    key={stop.city}
                    className="relative flex gap-4 p-4 rounded-2xl border border-brand-line bg-white shadow-sm hover:shadow-md hover:border-brand-sage transition-all"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-forest text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      {index < selectedJourney.stops.length - 1 && (
                        <div className="w-0.5 flex-1 bg-brand-line my-1" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">{stop.day}</span>
                        <span className="text-[11px] font-medium bg-brand-mist text-brand-muted px-2 py-0.5 rounded">
                          {stop.vibe}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-brand-ink mt-0.5">{stop.city} · {stop.landmark}</h4>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">{stop.highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch CTA */}
            <div className="mt-8 pt-6 border-t border-brand-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-brand-muted flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Pre-calculated budget, booking links & weather checklist included</span>
              </div>

              <Link
                href={`/planner?destination=${encodeURIComponent(selectedJourney.title)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#254635] transition-all shrink-0"
              >
                Customize This Route
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
