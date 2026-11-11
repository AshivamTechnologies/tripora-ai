'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Plane,
} from 'lucide-react';
import Link from 'next/link';
import { DestinationSearch } from './destination-search';

interface Slide {
  id: string;
  name: string;
  label: string;
  country: string;
  tagline: string;
  image: string;
  curatorNote: string;
  temperature: string;
  elevation: string;
}

const SLIDES: Slide[] = [
  {
    id: 'kyoto',
    name: 'Kyoto Imperial Sanctuaries',
    label: 'Kyoto',
    country: 'Japan',
    tagline: 'Private machiya living, dawn torii gate strolls, and 3-Michelin-star Kaiseki banquets.',
    image: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    curatorNote: 'Private tea master ceremony arranged at Daitoku-ji',
    temperature: '19°C · Clear Autumn',
    elevation: '55m a.s.l.',
  },
  {
    id: 'swiss-alps',
    name: 'Zermatt & The Alpine Pinnacles',
    label: 'Zermatt',
    country: 'Switzerland',
    tagline: 'Private Matterhorn chalets, vintage glacier railway carriages, and fireside fondue.',
    image: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    curatorNote: 'Glacier Express Excellence Class salon car included',
    temperature: '11°C · Crisp Alpine',
    elevation: '1,608m a.s.l.',
  },
  {
    id: 'amalfi',
    name: 'Amalfi Clifftop Elegance',
    label: 'Amalfi',
    country: 'Italy',
    tagline: 'Pastel cliffside villas tumbling into cobalt waters, private yacht days around Capri.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&auto=format&fit=crop&q=85',
    curatorNote: 'Sunset cruise to the Faraglioni sea stacks reserved',
    temperature: '24°C · Sunny',
    elevation: 'Cliffside 120m',
  },
  {
    id: 'bali',
    name: 'Ubud Sacred Valley Sanctuaries',
    label: 'Ubud',
    country: 'Indonesia',
    tagline: 'Emerald ravine infinity pools, private melukat purification rituals, and artisanal cacao.',
    image: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920',
    curatorNote: 'Exclusive dawn blessing beneath Tirta Empul spring fountains',
    temperature: '29°C · Tropical',
    elevation: 'Highland 220m',
  },
];

export function HeroLuxuryCinematic() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const current = SLIDES[currentSlideIndex];

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden min-h-[720px] lg:min-h-[820px] flex items-center bg-brand-ink">
      {/* Background Images with Crossfade Animation */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 -z-20 overflow-hidden"
        >
          <img
            src={current.image}
            alt={current.name}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Luxury Vignette & Gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-brand-ink/70" />
      <div className="absolute inset-0 -z-10 bg-radial-[at_center_bottom] from-transparent via-black/20 to-black/60" />

      {/* Subtle Gold Shimmer Accent Line on Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-12 lg:items-center">
          {/* Left Column: Editorial Headline & Search */}
          <div className="max-w-2xl">
            {/* Interactive Destination Selection Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 text-xs text-white/90 font-medium mr-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Gemini 1.5 Pro Concierge
              </span>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                      idx === currentSlideIndex
                        ? 'bg-brand-gold text-brand-ink shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    0{idx + 1} {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Editorial Headline */}
            <motion.h1
              key={`title-${current.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08]"
            >
              Explore More. <br />
              <span className="italic font-normal text-brand-gold">Plan Smarter.</span> <br />
              Travel Better.
            </motion.h1>

            {/* Dynamic Destination Sub-narrative */}
            <motion.p
              key={`tagline-${current.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-xl"
            >
              {current.tagline}
            </motion.p>

            {/* Luxury Interactive Search Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8"
            >
              <DestinationSearch />
            </motion.div>
          </div>

          {/* Right Column: Floating Luxury VIP Reserve Card */}
          <motion.div
            key={`card-${current.id}`}
            initial={{ opacity: 0, x: 20, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden lg:flex flex-col rounded-3xl border border-white/20 bg-brand-ink/85 backdrop-blur-2xl p-6 sm:p-7 text-white shadow-2xl shadow-black/70 relative overflow-hidden"
          >
            {/* Top Gold Border Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Curated Private Reserve
                </span>
                <h3 className="text-xl font-serif text-white mt-0.5">{current.name}</h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest/60 text-brand-gold border border-brand-gold/40">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/70">Climate Telemetry</span>
                <span className="font-semibold text-emerald-300">{current.temperature}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-white/70">Topography</span>
                <span className="font-semibold text-white">{current.elevation}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-forest/30 border border-brand-forest/50">
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">
                  Private Concierge Note
                </div>
                <p className="text-white/90 text-xs leading-relaxed italic">
                  "{current.curatorNote}"
                </p>
              </div>
            </div>

            {/* Slide Navigation Dots & Direct Link */}
            <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Switch to ${s.name}`}
                    className={`h-2 transition-all rounded-full ${
                      idx === currentSlideIndex
                        ? 'w-7 bg-brand-gold'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <Link
                href={`/planner?destination=${encodeURIComponent(current.name)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-white transition-colors"
              >
                <span>Plan {current.country}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Editorial Stats Strip */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/15 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-5xl">
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">120+</div>
            <div className="text-[11px] text-white/70 mt-1 uppercase tracking-wider font-medium">Bespoke Destinations</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">30 Sec</div>
            <div className="text-[11px] text-white/70 mt-1 uppercase tracking-wider font-medium">AI Optimization Speed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">$0 Hidden Fees</div>
            <div className="text-[11px] text-white/70 mt-1 uppercase tracking-wider font-medium">Direct Provider Handoff</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight flex items-center gap-1">
              4.98 <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
            </div>
            <div className="text-[11px] text-white/70 mt-1 uppercase tracking-wider font-medium">Conde Nast Quality Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
