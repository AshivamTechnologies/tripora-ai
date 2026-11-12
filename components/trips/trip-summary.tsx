import Link from 'next/link';
import { CalendarDays, Users, Wallet, Sparkles, DollarSign, CheckSquare, UserPlus, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { TripStatusBadge } from '@/components/trips/trip-card';
import { formatMoney } from '@/lib/money';
import { formatShortDate, inclusiveDayCount, parseISODate } from '@/lib/dates';
import { travellerCount } from '@/lib/planner-draft';
import type { TripDetail, TripStatus } from '@/lib/trips';

type TripSummaryProps = {
  trip: TripDetail;
  status: TripStatus;
  estimatedMinor: number;
};

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'default' | 'warning' }) {
  return (
    <div className="rounded-2xl bg-brand-mist p-4">
      <p className="text-xs font-medium text-brand-muted">{label}</p>
      <p className={tone === 'warning' ? 'mt-1 text-lg font-semibold text-destructive' : 'mt-1 text-lg font-semibold text-brand-ink'}>
        {value}
      </p>
    </div>
  );
}

export function TripSummary({ trip, status, estimatedMinor }: TripSummaryProps) {
  const days = inclusiveDayCount(trip.start_date, trip.end_date);
  const travellers = travellerCount(trip);
  const year = parseISODate(trip.start_date).getFullYear();
  const remaining = trip.budget_minor - estimatedMinor;
  const stops = [trip.destination, ...(trip.preferences.otherDestinations ?? [])];

  return (
    <section className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <TripStatusBadge status={status} />
          <span className="text-sm text-brand-muted">
            {days} {days === 1 ? 'day' : 'days'}
          </span>
        </div>

        {/* Quick Tools Navigation */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/trips/${trip.id}/itinerary`}
            className="flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist px-3.5 py-1.5 text-xs font-semibold text-brand-forest hover:bg-brand-forest hover:text-white transition-colors"
          >
            <Sparkles className="h-3 w-3 text-brand-gold" />
            Itinerary Studio
          </Link>
          <Link
            href={`/trips/${trip.id}/budget`}
            className="flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist px-3.5 py-1.5 text-xs font-semibold text-brand-forest hover:bg-brand-forest hover:text-white transition-colors"
          >
            <DollarSign className="h-3 w-3" />
            Budget & Splits
          </Link>
          <Link
            href={`/trips/${trip.id}/packing`}
            className="flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist px-3.5 py-1.5 text-xs font-semibold text-brand-forest hover:bg-brand-forest hover:text-white transition-colors"
          >
            <CheckSquare className="h-3 w-3" />
            Packing List
          </Link>
          <Link
            href={`/trips/${trip.id}/collaboration`}
            className="flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist px-3.5 py-1.5 text-xs font-semibold text-brand-forest hover:bg-brand-forest hover:text-white transition-colors"
          >
            <UserPlus className="h-3 w-3" />
            Collaborators
          </Link>
          <Link
            href={`/trips/${trip.id}/checkout`}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1C2C22] to-[#0A120D] text-[#F5D794] border border-[#C5A46A]/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm hover:brightness-125 transition-all"
          >
            <CreditCard className="h-3.5 w-3.5 text-[#F5D794]" />
            Reserve Expedition
          </Link>
        </div>
      </div>

      <h1 className="mt-4 font-serif text-4xl text-brand-ink sm:text-5xl">{stops.join(' · ')}</h1>

      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-brand-ink">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-brand-sage" aria-hidden="true" />
          <dd>
            {formatShortDate(trip.start_date)} to {formatShortDate(trip.end_date)}, {year}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-brand-sage" aria-hidden="true" />
          <dd>
            {travellers} {travellers === 1 ? 'traveller' : 'travellers'}
          </dd>
        </div>
        {trip.origin && (
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-brand-sage" aria-hidden="true" />
            <dd>From {trip.origin}</dd>
          </div>
        )}
      </dl>

      {trip.travel_styles.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Travel styles">
          {trip.travel_styles.map((style) => (
            <li key={style} className="rounded-full bg-brand-mist px-3 py-1 text-xs font-medium text-brand-forest">
              {style}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat
          label="Budget"
          value={trip.budget_minor > 0 ? formatMoney(trip.budget_minor, trip.currency) : 'Not set'}
        />
        <Stat label="Planned activities" value={formatMoney(estimatedMinor, trip.currency)} />
        <Stat
          label={remaining < 0 ? 'Over budget by' : 'Left in budget'}
          value={trip.budget_minor > 0 ? formatMoney(Math.abs(remaining), trip.currency) : 'Not set'}
          tone={remaining < 0 ? 'warning' : 'default'}
        />
      </div>
    </section>
  );
}
