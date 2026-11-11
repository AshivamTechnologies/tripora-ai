'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
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
  }, []);

  const countries = ['ALL', ...Array.from(new Set(destinations.map((d) => d.country)))];

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = selectedCountry === 'ALL' || d.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Curated Catalog</p>
          <h1 className="mt-3 font-serif text-4xl text-brand-ink sm:text-5xl">Explore World Destinations</h1>
          <p className="mt-3 text-base text-brand-muted">
            Handpicked cities and regions thoroughly documented with cultural attractions, culinary highlights, daily budgets, and seasonal advice.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination, country, or landmark..."
              className="w-full rounded-full border border-brand-line bg-white py-3 pl-11 pr-4 text-sm text-brand-ink placeholder:text-brand-muted focus:border-brand-forest focus:outline-none focus:ring-1 focus:ring-brand-forest shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCountry(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCountry === c
                    ? 'bg-brand-forest text-white shadow-sm'
                    : 'bg-white text-brand-muted hover:bg-brand-line/50 hover:text-brand-ink border border-brand-line'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-ink">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/80">{dest.country}</span>
                    <h2 className="font-serif text-2xl text-white">{dest.name}</h2>
                  </div>
                  <span className="rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white">
                    ~${Math.round((dest.averageDailyBudgetMinor || 15000) / 100)}/day
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-brand-muted">{dest.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-brand-forest">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="font-medium">Best season: {dest.bestSeasons}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-brand-line pt-4">
                  <Link
                    href={`/destinations/${dest.id}`}
                    className="text-xs font-semibold text-brand-forest hover:underline"
                  >
                    View Guide & Details &rarr;
                  </Link>

                  <Link
                    href={`/planner?destination=${encodeURIComponent(`${dest.name}, ${dest.country}`)}`}
                    className="flex items-center gap-1.5 rounded-full bg-brand-forest px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#274a39]"
                  >
                    <Sparkles className="h-3 w-3 text-brand-gold" />
                    Plan Trip
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
