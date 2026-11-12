import Link from 'next/link';
import { ArrowLeft, Plus, Sparkles, Compass } from 'lucide-react';
import { RequireAuth } from '@/components/auth/require-auth';
import { TripsList } from '@/components/trips/trips-list';

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-14 text-white sm:px-14 sm:py-18 shadow-2xl mb-10">
          <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Concierge Home
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-3 block w-fit">
                <Compass className="h-3.5 w-3.5" />
                Private Expeditions Portfolio
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                Your Curated Journeys
              </h1>
              <p className="mt-3 text-base text-white/80 font-light leading-relaxed">
                Manage day-by-day activity timelines, precision expense splits, collaborative invites, and weather-synced packing matrices.
              </p>
            </div>

            <Link
              href="/planner"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-brand-forest shadow-xl transition-all hover:bg-brand-mist hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              <span>Curate New Journey</span>
            </Link>
          </div>
        </div>

        {/* Trips List with Auth Protection */}
        <RequireAuth nextPath="/trips">
          <TripsList />
        </RequireAuth>
      </div>
    </div>
  );
}
