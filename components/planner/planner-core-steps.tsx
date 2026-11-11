import { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Field, StepHeading, controlClass } from '@/components/planner/planner-field';
import { MAX_TRIP_DAYS, travellerCount, type PlannerDraft, type PlannerErrors } from '@/lib/planner-draft';
import { formatLongDate, inclusiveDayCount, todayISODate } from '@/lib/dates';
import { TRAVEL_STYLES, type TravelStyle } from '@/lib/trips';

type StepProps = {
  draft: PlannerDraft;
  errors: PlannerErrors;
  onChange: (patch: Partial<PlannerDraft>) => void;
};

const MAX_EXTRA_STOPS = 5;

export function DestinationStep({ draft, errors, onChange }: StepProps) {
  const [pendingStop, setPendingStop] = useState('');
  const [stopError, setStopError] = useState<string | undefined>();

  function addStop() {
    const value = pendingStop.trim();
    if (!value) return;
    if (value.length > 120) {
      setStopError('Keep each stop under 120 characters.');
      return;
    }
    const alreadyAdded =
      value.toLowerCase() === draft.destination.trim().toLowerCase() ||
      draft.otherDestinations.some((stop) => stop.toLowerCase() === value.toLowerCase());
    if (alreadyAdded) {
      setStopError('That destination is already on your trip.');
      return;
    }
    if (draft.otherDestinations.length >= MAX_EXTRA_STOPS) {
      setStopError(`You can add up to ${MAX_EXTRA_STOPS} extra stops.`);
      return;
    }
    onChange({ otherDestinations: [...draft.otherDestinations, value] });
    setPendingStop('');
    setStopError(undefined);
  }

  return (
    <div>
      <StepHeading
        title="Where are you going?"
        description="Start with your main destination. Add more stops if your trip covers several places."
      />

      <div className="space-y-6">
        <Field id="destination" label="Main destination" error={errors.destination}>
          <input
            id="destination"
            value={draft.destination}
            onChange={(event) => onChange({ destination: event.target.value })}
            placeholder="e.g. Bali, Indonesia"
            maxLength={120}
            aria-invalid={Boolean(errors.destination)}
            className={controlClass}
          />
        </Field>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-ink">Additional stops</p>
          {draft.otherDestinations.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Additional stops">
              {draft.otherDestinations.map((stop) => (
                <li
                  key={stop}
                  className="animate-in fade-in zoom-in-95 flex items-center gap-2 rounded-full bg-brand-mist py-1.5 pl-4 pr-1.5 text-sm font-medium text-brand-forest duration-200"
                >
                  {stop}
                  <button
                    type="button"
                    onClick={() =>
                      onChange({ otherDestinations: draft.otherDestinations.filter((item) => item !== stop) })
                    }
                    className="flex h-6 w-6 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-white hover:text-brand-ink"
                    aria-label={`Remove ${stop}`}
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={pendingStop}
              onChange={(event) => setPendingStop(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addStop();
                }
              }}
              placeholder="Add another city or country"
              maxLength={120}
              aria-label="Add another stop"
              aria-invalid={Boolean(stopError)}
              className={controlClass}
            />
            <button
              type="button"
              onClick={addStop}
              className="inline-flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl border border-brand-forest px-5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-forest hover:text-white"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add stop
            </button>
          </div>
          {stopError && (
            <p role="alert" className="text-sm text-destructive">
              {stopError}
            </p>
          )}
        </div>

        <Field
          id="origin"
          label="Departing from"
          error={errors.origin}
          hint="City or airport. Optional, but needed for flight search later."
        >
          <input
            id="origin"
            value={draft.origin}
            onChange={(event) => onChange({ origin: event.target.value })}
            placeholder="e.g. Mumbai, India"
            maxLength={120}
            aria-invalid={Boolean(errors.origin)}
            className={controlClass}
          />
        </Field>
      </div>
    </div>
  );
}

export function DatesStep({ draft, errors, onChange }: StepProps) {
  const today = todayISODate();
  const hasValidRange =
    draft.startDate && draft.endDate && draft.endDate >= draft.startDate && !errors.endDate;
  const nights = hasValidRange ? inclusiveDayCount(draft.startDate, draft.endDate) - 1 : 0;

  return (
    <div>
      <StepHeading
        title="When are you travelling?"
        description={`Choose your dates. A trip can be up to ${MAX_TRIP_DAYS} days long.`}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="startDate" label="Departure date" error={errors.startDate}>
          <input
            id="startDate"
            type="date"
            min={today}
            value={draft.startDate}
            onChange={(event) => onChange({ startDate: event.target.value })}
            aria-invalid={Boolean(errors.startDate)}
            className={controlClass}
          />
        </Field>
        <Field id="endDate" label="Return date" error={errors.endDate}>
          <input
            id="endDate"
            type="date"
            min={draft.startDate || today}
            value={draft.endDate}
            onChange={(event) => onChange({ endDate: event.target.value })}
            aria-invalid={Boolean(errors.endDate)}
            className={controlClass}
          />
        </Field>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-line bg-white p-5 transition-colors hover:border-brand-sage">
        <input
          type="checkbox"
          checked={draft.flexibleDates}
          onChange={(event) => onChange({ flexibleDates: event.target.checked })}
          className="mt-0.5 h-4 w-4 accent-brand-forest"
        />
        <span>
          <span className="block text-sm font-semibold text-brand-ink">My dates are flexible</span>
          <span className="mt-1 block text-sm text-brand-muted">
            Saved with the trip so you remember these dates can move.
          </span>
        </span>
      </label>

      {hasValidRange && (
        <div className="animate-in fade-in mt-6 rounded-2xl bg-brand-mist p-5 text-sm text-brand-ink duration-300">
          <p className="font-semibold">
            {formatLongDate(draft.startDate)} to {formatLongDate(draft.endDate)}
          </p>
          <p className="mt-1 text-brand-muted">
            {nights} {nights === 1 ? 'night' : 'nights'}, {nights + 1} {nights + 1 === 1 ? 'day' : 'days'} in total
          </p>
        </div>
      )}
    </div>
  );
}

function Counter({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-brand-line bg-white p-5">
      <div>
        <p className="text-base font-semibold text-brand-ink">{label}</p>
        <p className="text-sm text-brand-muted">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="w-8 text-center text-lg font-semibold tabular-nums text-brand-ink" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line text-brand-ink transition-colors hover:border-brand-forest hover:text-brand-forest disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function TravellersStep({ draft, errors, onChange }: StepProps) {
  return (
    <div>
      <StepHeading
        title="Who is coming along?"
        description="Counting everyone helps us size budgets and accommodation correctly."
      />
      <div className="space-y-3">
        <Counter
          label="Adults"
          description="Aged 12 and over"
          value={draft.adults}
          min={1}
          max={20}
          onChange={(adults) => onChange({ adults })}
        />
        <Counter
          label="Children"
          description="Aged 2 to 11"
          value={draft.children}
          min={0}
          max={20}
          onChange={(children) => onChange({ children })}
        />
        <Counter
          label="Infants"
          description="Under 2"
          value={draft.infants}
          min={0}
          max={20}
          onChange={(infants) => onChange({ infants })}
        />
      </div>
      {errors.adults && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {errors.adults}
        </p>
      )}
      <p className="mt-6 text-sm text-brand-muted">
        Total travellers: <span className="font-semibold text-brand-ink">{travellerCount(draft)}</span>
      </p>
    </div>
  );
}

export function StyleStep({ draft, errors, onChange }: StepProps) {
  function toggleStyle(style: TravelStyle) {
    const selected = draft.travelStyles.includes(style);
    onChange({
      travelStyles: selected
        ? draft.travelStyles.filter((item) => item !== style)
        : [...draft.travelStyles, style],
    });
  }

  return (
    <div>
      <StepHeading
        title="What kind of trip is this?"
        description="Pick every style that fits. These shape the activities we suggest."
      />
      <div className="flex flex-wrap gap-3" role="group" aria-label="Travel styles">
        {TRAVEL_STYLES.map((style) => {
          const selected = draft.travelStyles.includes(style);
          return (
            <button
              key={style}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleStyle(style)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                selected
                  ? 'border-brand-forest bg-brand-forest text-white shadow-sm'
                  : 'border-brand-line bg-white text-brand-ink hover:-translate-y-0.5 hover:border-brand-sage'
              }`}
            >
              {style}
            </button>
          );
        })}
      </div>
      {errors.travelStyles && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {errors.travelStyles}
        </p>
      )}
    </div>
  );
}
