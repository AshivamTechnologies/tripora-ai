'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Hotel,
  Calendar,
  Luggage,
  Sparkles,
  Search,
  ArrowRight,
  MapPin,
  Users,
  Compass,
} from 'lucide-react';

type Mode = 'planner' | 'flights' | 'hotels';

export function QuickTravelBooker() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('planner');

  // Form states
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('New York (JFK)');
  const [departureDate, setDepartureDate] = useState('2026-12-01');
  const [returnDate, setReturnDate] = useState('2026-12-08');
  const [adults, setAdults] = useState('2');
  const [cabinClass, setCabinClass] = useState('ECONOMY');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'planner') {
      const q = destination.trim() || 'Kyoto, Japan';
      router.push(`/planner?destination=${encodeURIComponent(q)}&origin=${encodeURIComponent(origin)}`);
    } else if (mode === 'flights') {
      router.push(
        `/flights?origin=${encodeURIComponent(origin.slice(0, 3))}&destination=${encodeURIComponent(
          (destination || 'Tokyo').slice(0, 3)
        )}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`
      );
    } else if (mode === 'hotels') {
      router.push(
        `/hotels?destination=${encodeURIComponent(destination || 'Tokyo')}&checkInDate=${departureDate}&checkOutDate=${returnDate}&guests=${adults}`
      );
    }
  }

  return (
    <div className="w-full">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/30 shadow-lg w-fit mx-auto mb-4">
        <button
          type="button"
          onClick={() => setMode('planner')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
            mode === 'planner'
              ? 'bg-brand-forest text-white shadow-md'
              : 'text-brand-muted hover:text-brand-ink'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
          <span>Bespoke Itinerary</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('flights')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
            mode === 'flights'
              ? 'bg-brand-forest text-white shadow-md'
              : 'text-brand-muted hover:text-brand-ink'
          }`}
        >
          <Plane className="h-3.5 w-3.5" />
          <span>Flights</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('hotels')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
            mode === 'hotels'
              ? 'bg-brand-forest text-white shadow-md'
              : 'text-brand-muted hover:text-brand-ink'
          }`}
        >
          <Hotel className="h-3.5 w-3.5" />
          <span>Stays & Villas</span>
        </button>
      </div>

      {/* Interactive Input Form */}
      <form
        onSubmit={handleSearch}
        className="rounded-3xl border border-white/40 bg-white/95 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Destination Field */}
          <div className="rounded-2xl border border-brand-line bg-brand-mist/40 p-3 hover:border-brand-sage transition-colors">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-forest block">
              Destination
            </label>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-brand-forest shrink-0" />
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to? (e.g. Kyoto, Japan)"
                className="w-full bg-transparent text-sm font-semibold text-brand-ink placeholder:text-brand-muted/70 focus:outline-none"
              />
            </div>
          </div>

          {/* Origin / Departure Date Field */}
          {mode === 'flights' ? (
            <div className="rounded-2xl border border-brand-line bg-brand-mist/40 p-3 hover:border-brand-sage transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-forest block">
                Origin Airport
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Plane className="h-4 w-4 text-brand-forest shrink-0" />
                <input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="From (e.g. JFK, SFO, LHR)"
                  className="w-full bg-transparent text-sm font-semibold text-brand-ink placeholder:text-brand-muted/70 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-line bg-brand-mist/40 p-3 hover:border-brand-sage transition-colors">
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-forest block">
                Departure Date
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-brand-forest shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-ink focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Dates / Passengers */}
          <div className="rounded-2xl border border-brand-line bg-brand-mist/40 p-3 hover:border-brand-sage transition-colors">
            <label className="text-[10px] font-bold uppercase tracking-wider text-brand-forest block">
              {mode === 'flights' ? 'Dates' : 'Travelers'}
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-4 w-4 text-brand-forest shrink-0" />
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-brand-ink focus:outline-none cursor-pointer"
              >
                <option value="1">1 Solo Explorer</option>
                <option value="2">2 Travelers (Couple / Friends)</option>
                <option value="4">4 Travelers (Small Group / Family)</option>
                <option value="6">6+ Travelers (Large Group)</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-brand-forest px-6 text-sm font-semibold text-white shadow-lg shadow-brand-forest/30 hover:bg-[#254635] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="h-4 w-4 text-brand-gold" />
              <span>
                {mode === 'planner' ? 'Curate Journey' : mode === 'flights' ? 'Search Flights' : 'Discover Stays'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
