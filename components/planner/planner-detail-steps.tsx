import { Field, StepHeading, controlClass } from '@/components/planner/planner-field';
import { travellerCount, type PlannerDraft, type PlannerErrors } from '@/lib/planner-draft';
import { CURRENCIES, formatMoney, toMinorUnits } from '@/lib/money';
import { formatLongDate, inclusiveDayCount } from '@/lib/dates';

type StepProps = {
  draft: PlannerDraft;
  errors: PlannerErrors;
  onChange: (patch: Partial<PlannerDraft>) => void;
};

const ACCOMMODATION_OPTIONS = [
  'Budget hotel',
  'Mid-range hotel',
  'Luxury hotel',
  'Boutique stay',
  'Apartment or villa',
  'Resort',
  'Hostel',
];

const TRANSPORT_OPTIONS = [
  'Public transport',
  'Train',
  'Rental car',
  'Taxi or ride-hailing',
  'Walking and cycling',
  'Domestic flights',
];

const PACE_OPTIONS = ['Relaxed', 'Balanced', 'Packed'];

export function BudgetStep({ draft, errors, onChange }: StepProps) {
  const travellers = travellerCount(draft);
  const amount = Number(draft.budgetAmount);
  const hasAmount = draft.budgetAmount.trim() !== '' && Number.isFinite(amount) && amount >= 0;
  const groupTotal = hasAmount
    ? draft.budgetScope === 'PER_PERSON'
      ? amount * travellers
      : amount
    : 0;

  return (
    <div>
      <StepHeading
        title="What is your budget?"
        description="Enter an estimate. You can track actual spending against it later."
      />

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <Field id="budgetAmount" label="Budget" error={errors.budgetAmount}>
            <input
              id="budgetAmount"
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={draft.budgetAmount}
              onChange={(event) => onChange({ budgetAmount: event.target.value })}
              placeholder="e.g. 3000"
              aria-invalid={Boolean(errors.budgetAmount)}
              className={controlClass}
            />
          </Field>
          <Field id="currency" label="Currency">
            <select
              id="currency"
              value={draft.currency}
              onChange={(event) => onChange({ currency: event.target.value })}
              className={controlClass}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-ink">Is this amount</p>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-brand-mist p-1.5" role="radiogroup" aria-label="Budget scope">
            {[
              { value: 'GROUP', label: 'For the whole group' },
              { value: 'PER_PERSON', label: 'Per person' },
            ].map((option) => {
              const selected = draft.budgetScope === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange({ budgetScope: option.value as PlannerDraft['budgetScope'] })}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    selected ? 'bg-white text-brand-forest shadow-sm' : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {hasAmount && (
            <p className="text-sm text-brand-muted">
              Total for {travellers} {travellers === 1 ? 'traveller' : 'travellers'}:{' '}
              <span className="font-semibold text-brand-ink">
                {formatMoney(toMinorUnits(groupTotal, draft.currency), draft.currency)}
              </span>
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="accommodation" label="Accommodation" hint="Optional">
            <select
              id="accommodation"
              value={draft.accommodation}
              onChange={(event) => onChange({ accommodation: event.target.value })}
              className={controlClass}
            >
              <option value="">No preference</option>
              {ACCOMMODATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field id="transport" label="Getting around" hint="Optional">
            <select
              id="transport"
              value={draft.transport}
              onChange={(event) => onChange({ transport: event.target.value })}
              className={controlClass}
            >
              <option value="">No preference</option>
              {TRANSPORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
}

export function PreferencesStep({ draft, errors, onChange }: StepProps) {
  return (
    <div>
      <StepHeading
        title="Anything else we should know?"
        description="Everything here is optional, but it makes the plan far more useful."
      />

      <div className="space-y-6">
        <Field id="pace" label="Pace of travel">
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-brand-mist p-1.5" role="radiogroup" aria-label="Pace of travel">
            {PACE_OPTIONS.map((pace) => {
              const selected = draft.pace === pace;
              return (
                <button
                  key={pace}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange({ pace })}
                  className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    selected ? 'bg-white text-brand-forest shadow-sm' : 'text-brand-muted hover:text-brand-ink'
                  }`}
                >
                  {pace}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="food" label="Food preferences" error={errors.food} hint="e.g. vegetarian, seafood lover">
            <input
              id="food"
              value={draft.food}
              onChange={(event) => onChange({ food: event.target.value })}
              maxLength={500}
              aria-invalid={Boolean(errors.food)}
              className={controlClass}
            />
          </Field>
          <Field id="activities" label="Activities you enjoy" error={errors.activities} hint="e.g. hiking, museums">
            <input
              id="activities"
              value={draft.activities}
              onChange={(event) => onChange({ activities: event.target.value })}
              maxLength={500}
              aria-invalid={Boolean(errors.activities)}
              className={controlClass}
            />
          </Field>
          <Field id="accessibility" label="Accessibility needs" error={errors.accessibility} hint="e.g. step-free access">
            <input
              id="accessibility"
              value={draft.accessibility}
              onChange={(event) => onChange({ accessibility: event.target.value })}
              maxLength={500}
              aria-invalid={Boolean(errors.accessibility)}
              className={controlClass}
            />
          </Field>
          <Field id="avoid" label="Places to avoid" error={errors.avoid} hint="Crowds, certain areas, long drives">
            <input
              id="avoid"
              value={draft.avoid}
              onChange={(event) => onChange({ avoid: event.target.value })}
              maxLength={500}
              aria-invalid={Boolean(errors.avoid)}
              className={controlClass}
            />
          </Field>
        </div>

        <Field id="specialRequests" label="Special requests" error={errors.specialRequests}>
          <textarea
            id="specialRequests"
            value={draft.specialRequests}
            onChange={(event) => onChange({ specialRequests: event.target.value })}
            rows={4}
            maxLength={500}
            placeholder="Anniversary dinner, a birthday, a rest day after the flight..."
            aria-invalid={Boolean(errors.specialRequests)}
            className={`${controlClass} resize-none`}
          />
        </Field>
      </div>
    </div>
  );
}

export function ReviewStep({ draft }: { draft: PlannerDraft }) {
  const travellers = travellerCount(draft);
  const hasDates = Boolean(draft.startDate && draft.endDate && draft.endDate >= draft.startDate);
  const days = hasDates ? inclusiveDayCount(draft.startDate, draft.endDate) : 0;
  const amount = Number(draft.budgetAmount) || 0;
  const total = draft.budgetScope === 'PER_PERSON' ? amount * travellers : amount;
  const stops = [draft.destination, ...draft.otherDestinations].filter((stop) => stop.trim() !== '');

  const rows: { label: string; value: string }[] = [
    { label: 'Destinations', value: stops.join(', ') || 'Not set' },
    { label: 'Departing from', value: draft.origin.trim() || 'Not set' },
    {
      label: 'Dates',
      value: hasDates
        ? `${formatLongDate(draft.startDate)} to ${formatLongDate(draft.endDate)} (${days} ${days === 1 ? 'day' : 'days'})`
        : 'Not set',
    },
    { label: 'Travellers', value: `${travellers} (${draft.adults} adults, ${draft.children} children, ${draft.infants} infants)` },
    { label: 'Travel styles', value: draft.travelStyles.join(', ') || 'Not set' },
    {
      label: 'Budget',
      value: draft.budgetAmount
        ? `${formatMoney(toMinorUnits(total, draft.currency), draft.currency)} total`
        : 'Not set',
    },
    { label: 'Pace', value: draft.pace },
    { label: 'Accommodation', value: draft.accommodation || 'No preference' },
    { label: 'Getting around', value: draft.transport || 'No preference' },
  ];

  return (
    <div>
      <StepHeading
        title="Review your trip"
        description="Check the details. When you create the trip, it is saved with a plan for every day."
      />
      <dl className="divide-y divide-brand-line overflow-hidden rounded-3xl border border-brand-line bg-white">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
            <dt className="text-sm font-medium text-brand-muted">{row.label}</dt>
            <dd className="text-sm font-semibold text-brand-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
