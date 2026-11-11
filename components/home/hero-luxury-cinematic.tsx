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
  Volume2,
  VolumeX,
} from 'lucide-react';
import Link from 'next/link';
import { DestinationSearch } from './destination-search';

interface Slide {
  id: string;
  name: string;
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
    <section className="relative isolate overflow-hidden min-h-[780px] lg:min-h-[880px] flex items-center bg-brand-ink">
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-ink via-brand-ink/45 to-brand-ink/75" />
      <div className="absolute inset-0 -z-10 bg-radial-[at_center_bottom] from-transparent via-black/20 to-black/60" />

      {/* Subtle Gold Shimmer Accent Line on Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:items-center">
          {/* Left Column: Editorial Headline & Search */}
          <div className="max-w-2xl">
            {/* Slide Index & Tag Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono text-xs font-semibold tracking-widest text-brand-gold uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/30">
                Collection 0{currentSlideIndex + 1} / 0{SLIDES.length}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Gemini 1.5 Pro Concierge
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              key={`title-${current.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.06]"
            >
              Explore More. <br />
              <span className="italic font-normal text-brand-gold">Plan Smarter.</span> <br />
              Travel Better.
            </motion.h1>

            {/* Dynamic Destination Sub-narrative */}
            <motion.p
              key={`tagline-${current.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-lg sm:text-xl text-white/90 font-light leading-relaxed max-w-xl"
            >
              {current.tagline}
            </motion.p>

            {/* Luxury Interactive Search Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-10"
            >
              <DestinationSearch />
            </motion.div>
          </div>

          {/* Right Column: Floating Luxury VIP Reserve Card */}
          <motion.div
            key={`card-${current.id}`}
            initial={{ opacity: 0, x: 25, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col rounded-3xl border border-white/25 bg-brand-ink/80 backdrop-blur-2xl p-7 text-white shadow-2xl shadow-black/60 relative overflow-hidden group"
          >
            {/* Top Gold Border Glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            <div className="flex items-center justify-between pb-5 border-b border-white/15">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  Curated Private Reserve
                </span>
                <h3 className="text-xl font-serif text-white mt-0.5">{current.name}</h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest/60 text-brand-gold border border-brand-gold/40">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-5 space-y-3.5 text-xs">
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

            {/* Slide Navigation Dots */}
            <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    aria-label={`Switch to ${s.name}`}
                    className={`h-2 transition-all rounded-full ${
                      idx === currentSlideIndex
                        ? 'w-8 bg-brand-gold'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <Link
                href={`/planner?destination=${encodeURIComponent(current.name)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold hover:text-white transition-colors"
              >
                Plan {current.country}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Editorial Stats Strip */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/15 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-5xl">
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">120+</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Bespoke Destinations</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">30 Sec</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">AI Optimization Speed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight">$0 Hidden Fees</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Direct Provider Handoff</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white tracking-tight flex items-center gap-1">
              4.98 <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
            </div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Conde Nast Quality Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
