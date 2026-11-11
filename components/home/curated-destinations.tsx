'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, MapPin, Sparkles, Sun, DollarSign, Calendar } from 'lucide-react';

interface DestinationItem {
  id: string;
  name: string;
  country: string;
  category: 'cultural' | 'nature' | 'coastal' | 'epicurean';
  tagline: string;
  image: string;
  season: string;
  dailyBudget: string;
  weather: string;
  rating: number;
}

const DESTINATIONS: DestinationItem[] = [
  {
    id: 'dest-kyoto',
    name: 'Kyoto',
    country: 'Japan',
    category: 'cultural',
    tagline: '1,600 Buddhist temples, tranquil moss gardens, and historic wooden geisha districts.',
    image: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    season: 'Mar–May & Oct–Nov',
    dailyBudget: '$145 / day',
    weather: '18°C · Clear',
    rating: 4.96,
  },
  {
    id: 'dest-swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    category: 'nature',
    tagline: 'Pristine glacial valleys, cogwheel alpine railways, and iconic Matterhorn chalets.',
    image: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    season: 'Jun–Sep & Dec–Mar',
    dailyBudget: '$220 / day',
    weather: '12°C · Crisp',
    rating: 4.98,
  },
  {
    id: 'dest-santorini',
    name: 'Santorini',
    country: 'Greece',
    category: 'coastal',
    tagline: 'Whitewashed cliffside villas hanging over the cobalt Aegean Sea with world-famous sunsets.',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    season: 'May to October',
    dailyBudget: '$175 / day',
    weather: '24°C · Sunny',
    rating: 4.94,
  },
  {
    id: 'dest-bali',
    name: 'Bali',
    country: 'Indonesia',
    category: 'coastal',
    tagline: 'Emerald rice terraces, spiritual water temples, surfing beaches, and private eco-villas.',
    image: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    season: 'April to October',
    dailyBudget: '$95 / day',
    weather: '29°C · Warm',
    rating: 4.95,
  },
  {
    id: 'dest-amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    category: 'epicurean',
    tagline: 'Cliffside lemon groves, Michelin coastal dining, and pastel villages tumbling into the sea.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=80',
    season: 'May to September',
    dailyBudget: '$260 / day',
    weather: '23°C · Sun',
    rating: 4.97,
  },
  {
    id: 'dest-iceland',
    name: 'Reykjavik & Ring Road',
    country: 'Iceland',
    category: 'nature',
    tagline: 'Cascading waterfalls, volcanic black sand beaches, geothermal lagoons, and Northern Lights.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&auto=format&fit=crop&q=80',
    season: 'Sep–Mar (Aurora) / Jun–Aug',
    dailyBudget: '$210 / day',
    weather: '8°C · Breezy',
    rating: 4.92,
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Curated' },
  { key: 'cultural', label: 'Cultural Heritage' },
  { key: 'nature', label: 'Alpine & Nature' },
  { key: 'coastal', label: 'Coastal & Islands' },
  { key: 'epicurean', label: 'Epicurean & Gastronomy' },
];

export function CuratedDestinations() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered = activeCategory === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.category === activeCategory);

  function toggleSave(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <section id="destinations" className="mx-auto max-w-7xl px-5 sm:px-8 py-24">
      {/* Title & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-2">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            Curated Global Catalog
          </div>
          <h2 className="text-4xl sm:text-5xl text-brand-ink font-serif tracking-tight">
            Destinations planned to perfection.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-muted max-w-xl">
            Each destination is enriched with verified local attractions, seasonal climate insights, and estimated daily budgets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-forest text-white shadow-md shadow-brand-forest/20'
                    : 'bg-white border border-brand-line text-brand-muted hover:text-brand-ink hover:border-brand-sage'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((dest) => {
            const isSaved = savedIds.has(dest.id);
            return (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-brand-line/80 bg-white shadow-sm hover:shadow-2xl hover:border-brand-sage/60 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-brand-ink">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/15 to-transparent" />

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleSave(dest.id, e)}
                    aria-label="Save destination"
                    className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-brand-ink shadow-md transition-all duration-200 hover:scale-110 hover:bg-white"
                  >
                    <Heart className={`h-4 w-4 transition-colors ${isSaved ? 'fill-red-500 text-red-500' : 'text-brand-ink'}`} />
                  </button>

                  {/* Weather & Budget Floating Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-medium">
                    <span className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 border border-white/20">
                      <Sun className="h-3 w-3 text-brand-gold" />
                      {dest.weather}
                    </span>
                    <span className="rounded-full bg-white/95 text-brand-forest px-3 py-1 font-semibold shadow-sm">
                      {dest.dailyBudget}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-forest" />
                      {dest.country}
                    </span>
                    <span className="font-semibold text-brand-forest">★ {dest.rating.toFixed(2)}</span>
                  </div>

                  <h3 className="mt-2 text-2xl font-serif text-brand-ink group-hover:text-brand-forest transition-colors">
                    {dest.name}
                  </h3>

                  <p className="mt-2 text-sm text-brand-muted line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="mt-4 pt-4 border-t border-brand-line flex items-center justify-between text-xs">
                    <span className="text-brand-muted flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand-forest" />
                      {dest.season}
                    </span>

                    <Link
                      href={`/planner?destination=${encodeURIComponent(`${dest.name}, ${dest.country}`)}`}
                      className="inline-flex items-center gap-1 font-semibold text-brand-forest group-hover:underline underline-offset-4"
                    >
                      Plan Trip
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
