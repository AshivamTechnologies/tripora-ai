import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { RequireAuth } from '@/components/auth/require-auth';
import { TripsList } from '@/components/trips/trips-list';

export default function TripsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-forest"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest">Your travel</p>
            <h1 className="mt-3 text-4xl text-brand-ink sm:text-5xl">My trips</h1>
          </div>
          <Link
            href="/planner"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New trip
          </Link>
        </div>
        <RequireAuth nextPath="/trips">
          <TripsList />
        </RequireAuth>
      </div>
    </div>
  );
}
