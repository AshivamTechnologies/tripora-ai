import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Users, Wallet } from 'lucide-react';
import { formatMoney } from '@/lib/money';
import { formatShortDate, inclusiveDayCount, parseISODate } from '@/lib/dates';
import { travellerCount } from '@/lib/planner-draft';
import type { TripRecord, TripStatus } from '@/lib/trips';
import { cn } from '@/lib/utils';

const STATUS_LABELS: Record<TripStatus, string> = {
  UPCOMING: 'Upcoming',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
};

export function TripStatusBadge({ status }: { status: TripStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        status === 'ONGOING' && 'bg-brand-forest text-white',
        status === 'UPCOMING' && 'bg-brand-gold/20 text-[#7a5c25]',
        status === 'COMPLETED' && 'bg-brand-mist text-brand-muted',
      )}
    >
      {status === 'ONGOING' && <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />}
      {STATUS_LABELS[status]}
    </span>
  );
}

export function TripCard({ trip, status }: { trip: TripRecord; status: TripStatus }) {
  const days = inclusiveDayCount(trip.start_date, trip.end_date);
  const travellers = travellerCount(trip);
  const year = parseISODate(trip.start_date).getFullYear();

  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group flex flex-col rounded-3xl border border-brand-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-sage hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-brand-muted">{days} {days === 1 ? 'day' : 'days'}</p>
          <h2 className="mt-1 truncate text-3xl text-brand-ink">{trip.destination}</h2>
        </div>
        <TripStatusBadge status={status} />
      </div>

      <dl className="mt-6 grid gap-3 text-sm text-brand-ink">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-4 w-4 shrink-0 text-brand-sage" aria-hidden="true" />
          <dd>
            {formatShortDate(trip.start_date)} to {formatShortDate(trip.end_date)}, {year}
          </dd>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 shrink-0 text-brand-sage" aria-hidden="true" />
          <dd>
            {travellers} {travellers === 1 ? 'traveller' : 'travellers'}
          </dd>
        </div>
        <div className="flex items-center gap-3">
          <Wallet className="h-4 w-4 shrink-0 text-brand-sage" aria-hidden="true" />
          <dd>{trip.budget_minor > 0 ? `${formatMoney(trip.budget_minor, trip.currency)} budget` : 'No budget set'}</dd>
        </div>
      </dl>

      <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-brand-forest">
        Open itinerary
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
