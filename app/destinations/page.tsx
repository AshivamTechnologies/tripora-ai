'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, DollarSign, ArrowRight, Sparkles, Heart, Sun, Compass, SlidersHorizontal, Check } from 'lucide-react';
import { api } from '@/lib/api';

const COLLECTIONS = [
  { id: 'ALL', label: 'All Sanctuaries' },
  { id: 'Alpine', label: 'Alpine Chalets & Peaks' },
  { id: 'Heritage', label: 'Imperial Temples & Machiyas' },
  { id: 'Coastal', label: 'Mediterranean & Coastal' },
  { id: 'Tropical', label: 'Overwater & Tropical' },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedCollection, setSelectedCollection] = useState<string>('ALL');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.request('/destinations');
        setDestinations(data || []);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }
    load();

    try {
      const saved = localStorage.getItem('tripora_wishlist');
      if (saved) setBookmarked(JSON.parse(saved));
    } catch {}
  }, []);

  function toggleBookmark(id: string) {
    setBookmarked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('tripora_wishlist', JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const countries = ['ALL', ...Array.from(new Set(destinations.map((d) => d.country)))];

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase()) ||
      (d.description && d.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCountry = selectedCountry === 'ALL' || d.country === selectedCountry;

    let matchesCollection = true;
    if (selectedCollection === 'Alpine') {
      matchesCollection = d.name.toLowerCase().includes('alps') || d.country.toLowerCase().includes('switz');
    } else if (selectedCollection === 'Heritage') {
      matchesCollection = d.name.toLowerCase().includes('kyoto') || d.country.toLowerCase().includes('japan');
    } else if (selectedCollection === 'Coastal') {
      matchesCollection = d.name.toLowerCase().includes('santorini') || d.name.toLowerCase().includes('amalfi') || d.country.toLowerCase().includes('greece') || d.country.toLowerCase().includes('italy');
    } else if (selectedCollection === 'Tropical') {
      matchesCollection = d.name.toLowerCase().includes('bali') || d.country.toLowerCase().includes('indonesia');
    }

    return matchesSearch && matchesCountry && matchesCollection;
  });

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-16 text-white sm:px-14 sm:py-20 shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              The Private Reserve Catalog
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
              Curated World Sanctuaries.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-light leading-relaxed">
              Handpicked destinations thoroughly documented by on-the-ground cultural historians, certified alpine guides, and culinary correspondents.
            </p>
          </div>

          {/* Quick Collection Filter Chips inside Hero */}
          <div className="mt-8 flex flex-wrap gap-2">
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCollection(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  selectedCollection === c.id
                    ? 'bg-white text-brand-forest font-semibold shadow-md'
                    : 'bg-white/10 text-white/85 hover:bg-white/20 border border-white/15'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Dynamic Filter Controls Bar */}
        <div className="mt-10 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, country, landmark, or vibe..."
                className="w-full rounded-full border border-brand-line bg-brand-mist/40 py-3.5 pl-11 pr-4 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-forest shadow-xs"
              />
            </div>

            {/* Country Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs font-semibold text-brand-muted uppercase shrink-0">Region:</span>
              {countries.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCountry(c)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCountry === c
                      ? 'bg-brand-forest text-white font-semibold shadow-xs'
                      : 'bg-brand-mist/70 text-brand-muted hover:bg-brand-mist hover:text-brand-ink border border-brand-line'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-brand-muted border-t border-brand-line/70 pt-4">
            <p>
              Showing <span className="font-semibold text-brand-ink">{filtered.length}</span> curated destinations
              {selectedCountry !== 'ALL' && ` in ${selectedCountry}`}
              {selectedCollection !== 'ALL' && ` (${selectedCollection})`}
            </p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Weather & Seasonal Tariffs Active</span>
            </div>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest) => {
            const isSaved = bookmarked[dest.id];
            return (
              <div
                key={dest.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-sage/60"
              >
                {/* Visual Image Banner */}
                <div className="relative aspect-[16/11] overflow-hidden bg-brand-ink">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="rounded-full bg-brand-forest/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-brand-gold border border-brand-gold/30">
                      ✦ Private Reserve
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(dest.id)}
                      className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 hover:scale-110 ${
                        isSaved ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-white/80 font-medium">
                        {dest.country}
                      </span>
                      <h2 className="font-serif text-2xl text-white tracking-tight">{dest.name}</h2>
                    </div>
                    <span className="rounded-full bg-white/25 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/20">
                      ~${Math.round((dest.averageDailyBudgetMinor || 15000) / 100)}/day
                    </span>
                  </div>
                </div>

                {/* Editorial Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="line-clamp-3 text-sm leading-relaxed text-brand-muted font-light">
                      {dest.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-brand-forest font-medium bg-brand-mist/60 px-3 py-1.5 rounded-xl w-fit">
                      <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                      <span>Best Season: {dest.bestSeasons}</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-6 flex items-center justify-between border-t border-brand-line pt-4">
                    <Link
                      href={`/destinations/${dest.id}`}
                      className="text-xs font-semibold text-brand-forest hover:text-brand-ink transition-colors flex items-center gap-1"
                    >
                      <span>Field Guide & Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      href={`/planner?destination=${encodeURIComponent(`${dest.name}, ${dest.country}`)}`}
                      className="flex items-center gap-1.5 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#254635] hover:shadow-md hover:-translate-y-0.5"
                    >
                      <Sparkles className="h-3 w-3 text-brand-gold" />
                      <span>Plan Journey</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
