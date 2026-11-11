'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AlertTriangle, Plane, RotateCcw } from 'lucide-react';
import { TripCard } from '@/components/trips/trip-card';
import { getTripStatus, listTrips, type TripRecord, type TripStatus } from '@/lib/trips';
import { todayISODate } from '@/lib/dates';
import { cn } from '@/lib/utils';

type Filter = 'ALL' | TripStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'ALL', label: 'All trips' },
  { value: 'UPCOMING', label: 'Upcoming' },
  { value: 'ONGOING', label: 'Ongoing' },
  { value: 'COMPLETED', label: 'Completed' },
];

export function TripsList() {
  const [trips, setTrips] = useState<TripRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [filter, setFilter] = useState<Filter>('ALL');

  useEffect(() => {
    let active = true;
    listTrips()
      .then((data) => {
        if (!active) return;
        setTrips(data);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Your trips could not be loaded.');
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  function retry() {
    setError(null);
    setTrips(null);
    setAttempt((value) => value + 1);
  }

  if (error) {
    return (
      <div role="alert" className="rounded-3xl border border-destructive/30 bg-white p-10 text-center">
        <AlertTriangle className="mx-auto h-8 w-8 text-destructive" aria-hidden="true" />
        <h2 className="mt-4 text-2xl text-brand-ink">We could not load your trips</h2>
        <p className="mt-2 text-sm text-brand-muted">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-forest px-5 py-2.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-forest hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }

  if (trips === null) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading trips">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-64 animate-pulse rounded-3xl border border-brand-line bg-white" />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-brand-sage bg-white px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-mist text-brand-forest">
          <Plane className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-3xl text-brand-ink">No trips yet</h2>
        <p className="mt-3 max-w-md text-base leading-[1.5] text-brand-muted">
          Plan your first journey and it will appear here, ready for day-by-day editing.
        </p>
        <Link
          href="/planner"
          className="mt-8 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
        >
          Plan a trip
        </Link>
      </div>
    );
  }

  const today = todayISODate();
  const withStatus = trips.map((trip) => ({ trip, status: getTripStatus(trip, today) }));
  const visible = withStatus.filter((item) => filter === 'ALL' || item.status === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter trips by status">
        {FILTERS.map((item) => {
          const count = item.value === 'ALL'
            ? withStatus.length
            : withStatus.filter((entry) => entry.status === item.value).length;
          const selected = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                selected
                  ? 'border-brand-forest bg-brand-forest text-white'
                  : 'border-brand-line bg-white text-brand-ink hover:border-brand-sage',
              )}
            >
              {item.label} <span className={selected ? 'text-white/70' : 'text-brand-muted'}>{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-3xl border border-brand-line bg-white p-10 text-center text-base text-brand-muted">
          No trips match this filter yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(({ trip, status }) => (
            <div key={trip.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <TripCard trip={trip} status={status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
