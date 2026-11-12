'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Calendar,
  Compass,
  DollarSign,
  MapPin,
  Plane,
  Plus,
  Sparkles,
  Luggage,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Receipt,
  FileText
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { listTrips, TripRecord } from '@/lib/trips';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<TripRecord[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [tripList, destList] = await Promise.all([
          listTrips(),
          api.request('/destinations?featured=true&limit=3').catch(() => []),
        ]);
        setTrips(tripList);
        setDestinations(destList || []);
      } catch (err) {
        console.warn('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalSpentUSD = trips.reduce((sum, t) => sum + (t.budget_minor || 0) / 100, 0);

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Luxury Cockpit Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-brand-forest/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-forest mb-2">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              Private Traveler Cockpit
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-ink tracking-tight">
              Welcome back, {user?.profile?.fullName || user?.email?.split('@')[0] || 'Traveler'}
            </h1>
            <p className="mt-1 text-sm text-brand-muted font-light">
              Here is your active telemetry across curated journeys, group expenses, and departures.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#254635] hover:shadow-md hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4 text-brand-gold" />
              <span>Curate New Journey</span>
            </Link>
          </div>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Active Journeys</span>
              <Plane className="h-5 w-5 text-brand-forest" />
            </div>
            <p className="mt-3 text-3xl sm:text-4xl font-serif text-brand-ink">{trips.length}</p>
            <p className="mt-1 text-xs text-brand-muted font-light">Planned & archived itineraries</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Managed Budget</span>
              <DollarSign className="h-5 w-5 text-brand-forest" />
            </div>
            <p className="mt-3 text-3xl sm:text-4xl font-serif text-brand-ink">${Math.round(totalSpentUSD).toLocaleString()}</p>
            <p className="mt-1 text-xs text-brand-muted font-light">Exact minor-unit allocation</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Concierge Liaison</span>
              <Sparkles className="h-5 w-5 text-brand-gold" />
            </div>
            <p className="mt-3 text-3xl sm:text-4xl font-serif text-brand-ink">24/7 Active</p>
            <p className="mt-1 text-xs text-emerald-700 font-medium">Kyoto &amp; Zurich Desks Online</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Tier Status</span>
              <ShieldCheck className="h-5 w-5 text-brand-forest" />
            </div>
            <p className="mt-3 text-3xl sm:text-4xl font-serif text-brand-forest">Voyager</p>
            <p className="mt-1 text-xs text-brand-muted font-light">Priority routing active</p>
          </div>
        </div>

        {/* Active Journeys Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Your Curated Expeditions</span>
              <h2 className="mt-1 font-serif text-3xl text-brand-ink">Active Journeys & Itineraries</h2>
            </div>
            <Link href="/trips" className="text-xs font-semibold text-brand-forest hover:text-brand-ink transition-colors flex items-center gap-1">
              <span>View All ({trips.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {trips.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-brand-line bg-white p-12 text-center">
              <Compass className="mx-auto h-12 w-12 text-brand-muted" />
              <h3 className="mt-4 font-serif text-2xl text-brand-ink">No Journeys Planned Yet</h3>
              <p className="mt-2 text-sm text-brand-muted max-w-md mx-auto font-light">
                Launch the atelier to build your first day-by-day itinerary with spatial route pacing and budget tracking.
              </p>
              <Link
                href="/planner"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#254635]"
              >
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span>Start Planning Now</span>
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="group flex flex-col justify-between rounded-3xl border border-brand-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-sage"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-brand-forest/10 px-3 py-1 text-[11px] font-semibold text-brand-forest">
                        {trip.start_date || 'Upcoming'} &bull; {trip.end_date || 'Flexible'}
                      </span>
                      <span className="text-xs font-semibold text-brand-forest">
                        ${Math.round((trip.budget_minor || 0) / 100).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="mt-4 font-serif text-2xl text-brand-ink group-hover:text-brand-forest transition-colors">
                      {trip.destination}
                    </h3>
                    <p className="mt-1 text-xs text-brand-muted font-light">
                      Style: <span className="font-medium text-brand-ink capitalize">{trip.travel_style || 'Curated'}</span> &bull; {trip.party_size || 2} Travelers
                    </p>

                    {/* Quick Utility Matrix Buttons */}
                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-brand-line/70 pt-4 text-center text-xs">
                      <Link
                        href={`/trips/${trip.id}/itinerary`}
                        className="rounded-xl bg-brand-mist/60 py-2 font-medium text-brand-ink hover:bg-brand-mist transition-colors"
                      >
                        Schedule
                      </Link>
                      <Link
                        href={`/trips/${trip.id}/budget`}
                        className="rounded-xl bg-brand-mist/60 py-2 font-medium text-brand-ink hover:bg-brand-mist transition-colors"
                      >
                        Splits
                      </Link>
                      <Link
                        href={`/trips/${trip.id}/packing`}
                        className="rounded-xl bg-brand-mist/60 py-2 font-medium text-brand-ink hover:bg-brand-mist transition-colors"
                      >
                        Packing
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-brand-line/70 pt-4 flex items-center justify-between">
                    <Link
                      href={`/trips/${trip.id}`}
                      className="text-xs font-semibold text-brand-forest hover:text-brand-ink transition-colors flex items-center gap-1"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Curated Recommendations Rail */}
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Inspiration</span>
              <h2 className="mt-1 font-serif text-3xl text-brand-ink">Curated Sanctuaries For Your Next Escape</h2>
            </div>
            <Link href="/destinations" className="text-xs font-semibold text-brand-forest hover:text-brand-ink transition-colors">
              Explore All Sanctuaries &rarr;
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {destinations.slice(0, 3).map((d) => (
              <Link
                key={d.id}
                href={`/destinations/${d.id}`}
                className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-brand-ink shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={d.heroImage}
                  alt={d.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-white/80 font-medium">{d.country}</span>
                  <p className="font-serif text-2xl text-white">{d.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
