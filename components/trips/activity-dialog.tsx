'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, controlClass } from '@/components/planner/planner-field';
import { fromMinorUnits, toMinorUnits } from '@/lib/money';
import { TIME_SLOTS, type ActivityFields, type ActivityRecord, type TimeSlot } from '@/lib/trips';

type ActivityDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: ActivityRecord | null;
  defaultSlot: TimeSlot;
  currency: string;
  onSubmit: (fields: ActivityFields) => Promise<void>;
};

type FormState = {
  title: string;
  location: string;
  timeSlot: TimeSlot;
  startTime: string;
  durationMinutes: string;
  cost: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function initialState(activity: ActivityRecord | null, defaultSlot: TimeSlot, currency: string): FormState {
  if (!activity) {
    return {
      title: '',
      location: '',
      timeSlot: defaultSlot,
      startTime: '',
      durationMinutes: '',
      cost: '',
      description: '',
    };
  }
  return {
    title: activity.title,
    location: activity.location,
    timeSlot: activity.time_slot,
    startTime: activity.start_time ? activity.start_time.slice(0, 5) : '',
    durationMinutes: activity.duration_minutes ? String(activity.duration_minutes) : '',
    cost: activity.estimated_cost_minor > 0 ? String(fromMinorUnits(activity.estimated_cost_minor, currency)) : '',
    description: activity.description,
  };
}

function validate(form: FormState, currency: string): FormErrors {
  const errors: FormErrors = {};
  if (form.title.trim().length === 0) errors.title = 'Give this activity a name.';
  if (form.title.trim().length > 120) errors.title = 'Keep the name under 120 characters.';
  if (form.durationMinutes.trim() !== '') {
    const duration = Number(form.durationMinutes);
    if (!Number.isInteger(duration) || duration < 1 || duration > 1440) {
      errors.durationMinutes = 'Enter whole minutes between 1 and 1440.';
    }
  }
  if (form.cost.trim() !== '') {
    const cost = Number(form.cost);
    if (!Number.isFinite(cost) || cost < 0 || cost > 100_000_000) {
      errors.cost = 'Enter an estimate of zero or more.';
    }
  }
  if (form.description.length > 1000) errors.description = 'Keep the description under 1000 characters.';
  if (form.location.length > 200) errors.location = 'Keep the location under 200 characters.';
  return errors;
}

export function ActivityDialog({
  open,
  onOpenChange,
  activity,
  defaultSlot,
  currency,
  onSubmit,
}: ActivityDialogProps) {
  const [form, setForm] = useState<FormState>(() => initialState(activity, defaultSlot, currency));
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(initialState(activity, defaultSlot, currency));
      setErrors({});
      setSubmitError(null);
      setSaving(false);
    }
  }, [open, activity, defaultSlot, currency]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const found = validate(form, currency);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setSaving(true);
    setSubmitError(null);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.location.trim(),
        timeSlot: form.timeSlot,
        startTime: form.startTime || null,
        durationMinutes: form.durationMinutes.trim() === '' ? null : Number(form.durationMinutes),
        estimatedCostMinor: form.cost.trim() === '' ? 0 : toMinorUnits(Number(form.cost), currency),
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The activity could not be saved.');
      setSaving(false);
    }
  }

  const isEdit = activity !== null;

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-brand-line bg-white p-0 sm:max-w-xl">
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader className="border-b border-brand-line px-6 py-5 text-left">
            <DialogTitle className="font-serif text-2xl font-normal text-brand-ink">
              {isEdit ? 'Edit activity' : 'Add activity'}
            </DialogTitle>
            <DialogDescription className="text-sm text-brand-muted">
              Costs are your own estimates in {currency}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 px-6 py-6">
            <Field id="activity-title" label="Name" error={errors.title}>
              <input
                id="activity-title"
                value={form.title}
                onChange={(event) => update('title', event.target.value)}
                placeholder="e.g. Sunrise walk at Mount Batur"
                maxLength={120}
                aria-invalid={Boolean(errors.title)}
                className={controlClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="activity-slot" label="Part of the day">
                <select
                  id="activity-slot"
                  value={form.timeSlot}
                  onChange={(event) => update('timeSlot', event.target.value as TimeSlot)}
                  className={controlClass}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label} ({slot.hint})
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="activity-start" label="Start time" hint="Optional">
                <input
                  id="activity-start"
                  type="time"
                  value={form.startTime}
                  onChange={(event) => update('startTime', event.target.value)}
                  className={controlClass}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="activity-duration" label="Duration (minutes)" error={errors.durationMinutes} hint="Optional">
                <input
                  id="activity-duration"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={1440}
                  value={form.durationMinutes}
                  onChange={(event) => update('durationMinutes', event.target.value)}
                  aria-invalid={Boolean(errors.durationMinutes)}
                  className={controlClass}
                />
              </Field>
              <Field id="activity-cost" label={`Estimated cost (${currency})`} error={errors.cost} hint="Optional">
                <input
                  id="activity-cost"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="any"
                  value={form.cost}
                  onChange={(event) => update('cost', event.target.value)}
                  aria-invalid={Boolean(errors.cost)}
                  className={controlClass}
                />
              </Field>
            </div>

            <Field id="activity-location" label="Location" error={errors.location} hint="Optional">
              <input
                id="activity-location"
                value={form.location}
                onChange={(event) => update('location', event.target.value)}
                placeholder="e.g. Ubud, Bali"
                maxLength={200}
                aria-invalid={Boolean(errors.location)}
                className={controlClass}
              />
            </Field>

            <Field id="activity-description" label="Notes" error={errors.description} hint="Optional">
              <textarea
                id="activity-description"
                value={form.description}
                onChange={(event) => update('description', event.target.value)}
                rows={3}
                maxLength={1000}
                aria-invalid={Boolean(errors.description)}
                className={`${controlClass} resize-none`}
              />
            </Field>

            {submitError && (
              <p role="alert" className="rounded-xl bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {submitError}
              </p>
            )}
          </div>

          <DialogFooter className="gap-3 border-t border-brand-line px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#274a39] disabled:cursor-wait disabled:opacity-80"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isEdit ? 'Save changes' : 'Add activity'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
