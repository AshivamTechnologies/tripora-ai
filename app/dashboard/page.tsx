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
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-forest shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              Traveler Workspace
            </div>
            <h1 className="mt-2 text-3xl font-serif text-brand-ink sm:text-4xl">
              Welcome back, {user?.profile?.fullName || user?.email?.split('@')[0] || 'Traveler'}
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Here is what is happening across your journeys and curated adventures.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              Plan New Trip
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-brand-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Total Trips</span>
              <Plane className="h-5 w-5" />
            </div>
            <p className="mt-3 text-3xl font-serif text-brand-ink">{trips.length}</p>
            <p className="mt-1 text-xs text-brand-muted">Active and upcoming plans</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Allocated Budget</span>
              <DollarSign className="h-5 w-5" />
            </div>
            <p className="mt-3 text-3xl font-serif text-brand-ink">${Math.round(totalSpentUSD).toLocaleString()}</p>
            <p className="mt-1 text-xs text-brand-muted">Across planned itineraries</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">AI Generations</span>
              <Sparkles className="h-5 w-5 text-brand-gold" />
            </div>
            <p className="mt-3 text-3xl font-serif text-brand-ink">{trips.length * 2 + 1}</p>
            <p className="mt-1 text-xs text-brand-muted">AI-crafted days & routes</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-brand-forest">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Destinations</span>
              <MapPin className="h-5 w-5" />
            </div>
            <p className="mt-3 text-3xl font-serif text-brand-ink">{destinations.length || 4}</p>
            <p className="mt-1 text-xs text-brand-muted">Curated guidebooks</p>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link
            href="/flights"
            className="group flex items-center justify-between rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Plane className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-ink">Flight Discovery</h3>
                <p className="text-xs text-brand-muted">Search global fares & compare</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-brand-muted transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/hotels"
            className="group flex items-center justify-between rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-ink">Hotels & Resorts</h3>
                <p className="text-xs text-brand-muted">Find handpicked retreats</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-brand-muted transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/destinations"
            className="group flex items-center justify-between rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-brand-ink">Explore Destinations</h3>
                <p className="text-xs text-brand-muted">Seasonal guides & insights</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-brand-muted transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trips Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif text-brand-ink">Your Planned Journeys</h2>
              <p className="text-sm text-brand-muted">Click any journey to manage itinerary, expenses, or packing list.</p>
            </div>
            <Link href="/trips" className="text-sm font-semibold text-brand-forest hover:underline">
              View all trips ({trips.length}) &rarr;
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="group flex flex-col justify-between rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-forest/10 px-2.5 py-1 text-xs font-semibold text-brand-forest">
                      <Calendar className="h-3 w-3" />
                      {trip.start_date}
                    </span>
                    <span className="text-xs font-semibold text-brand-gold">
                      ${Math.round((trip.budget_minor || 0) / 100).toLocaleString()} {trip.currency}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-brand-ink">{trip.destination}</h3>
                  <p className="mt-1 text-xs text-brand-muted">Origin: {trip.origin || 'Flexible origin'}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-brand-muted">
                    {trip.notes || 'Curated journey with day-by-day morning, afternoon, and evening slots.'}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(trip.travel_styles || []).slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-brand-mist px-2.5 py-0.5 text-[11px] text-brand-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-brand-line pt-4">
                  <div className="flex items-center gap-3 text-xs text-brand-muted">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {trip.adults} Adults
                    </span>
                  </div>
                  <Link
                    href={`/trips/${trip.id}`}
                    className="flex items-center gap-1 text-xs font-semibold text-brand-forest hover:underline"
                  >
                    Open Hub &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Recommendations */}
        <div className="mt-14">
          <h2 className="text-2xl font-serif text-brand-ink">Trending Destinations</h2>
          <p className="text-sm text-brand-muted">Handpicked by TRIPORA AI editors based on seasonal conditions.</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {destinations.map((dest: any) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-ink shadow-sm"
              >
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <p className="text-xs uppercase tracking-wider text-white/80">{dest.country}</p>
                  <h3 className="mt-1 font-serif text-2xl text-white">{dest.name}</h3>
                  <p className="mt-1 text-xs text-brand-gold">Best season: {dest.bestSeasons}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
