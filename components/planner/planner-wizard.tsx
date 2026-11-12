'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2, Plane, RotateCcw } from 'lucide-react';
import { BudgetStep, PreferencesStep, ReviewStep } from '@/components/planner/planner-detail-steps';
import { DatesStep, DestinationStep, StyleStep, TravellersStep } from '@/components/planner/planner-core-steps';
import { StartOverButton } from '@/components/planner/start-over-button';
import {
  PLANNER_STEPS,
  buildNewTrip,
  createInitialDraft,
  travellerCount,
  validateAllSteps,
  validateStep,
  type PlannerDraft,
  type PlannerErrors,
} from '@/lib/planner-draft';
import { createTrip } from '@/lib/trips';
import { clearPlannerDraft, loadPlannerDraft, savePlannerDraft } from '@/lib/planner-drafts';
import { formatShortDate, inclusiveDayCount } from '@/lib/dates';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function PlannerWizard({ initialDestination }: { initialDestination: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [draft, setDraft] = useState<PlannerDraft>(() => createInitialDraft(initialDestination));
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<PlannerErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(true);
  const submittingRef = useRef(false);

  const step = PLANNER_STEPS[stepIndex];
  const isReview = step.id === 'review';
  const isLastStep = stepIndex === PLANNER_STEPS.length - 1;

  useEffect(() => {
    let active = true;
    loadPlannerDraft()
      .then((saved) => {
        if (!active || !saved) return;
        setDraft(initialDestination ? { ...saved.draft, destination: initialDestination } : saved.draft);
        setStepIndex(saved.stepIndex);
      })
      .catch(() => {
        if (!active) return;
        toast({
          variant: 'destructive',
          title: 'Saved progress could not be loaded',
          description: 'We started a fresh plan. Check your connection and refresh to try again.',
        });
      })
      .finally(() => {
        if (active) setRestoring(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDestination]);

  function updateDraft(patch: Partial<PlannerDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      for (const key of Object.keys(patch) as (keyof PlannerDraft)[]) {
        delete next[key];
      }
      return next;
    });
  }

  function persistProgress(nextDraft: PlannerDraft, index: number) {
    savePlannerDraft(nextDraft, index).catch(() => {
      toast({
        variant: 'destructive',
        title: 'Progress could not be saved',
        description: 'Your answers are still on screen, but they may be lost if you leave. Check your connection.',
      });
    });
  }

  function goToStep(index: number) {
    setErrors({});
    setStepIndex(index);
    persistProgress(draft, index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNext() {
    const stepErrors = validateStep(step.id, draft);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    goToStep(Math.min(stepIndex + 1, PLANNER_STEPS.length - 1));
  }

  async function handleCreateTrip() {
    if (submittingRef.current) return;

    const invalid = validateAllSteps(draft);
    if (invalid) {
      setErrors(invalid.errors);
      goToStep(invalid.stepIndex);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const tripId = await createTrip(buildNewTrip(draft));
      clearPlannerDraft().catch(() => {
        toast({
          variant: 'destructive',
          title: 'Your planner draft could not be cleared',
          description: 'Your trip was created. The leftover draft will not affect it.',
        });
      });
      toast({ title: 'Trip created', description: 'Your day-by-day plan is ready to edit.' });
      router.push(`/trips/${tripId}`);
    } catch (error) {
      submittingRef.current = false;
      setSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  async function handleStartOver() {
    try {
      await clearPlannerDraft();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Could not start over',
        description: 'Your saved answers are still here. Check your connection and try again.',
      });
      return;
    }
    setDraft(createInitialDraft(initialDestination));
    setErrors({});
    setSubmitError(null);
    setStepIndex(0);
  }

  if (restoring) {
    return (
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14 py-10" aria-busy="true" aria-label="Loading your plan">
        <div className="h-[480px] animate-pulse rounded-3xl border border-brand-line bg-white" />
      </div>
    );
  }

  const stepProps = { draft, errors, onChange: updateDraft };

  return (
    <div className="mx-auto grid max-w-[1720px] w-full gap-8 px-4 py-10 sm:px-6 lg:px-10 2xl:px-14 lg:grid-cols-[1fr_340px] lg:py-14">
      <section aria-label="Trip planner" className="min-w-0">
        <ol className="mb-8 grid grid-cols-7 gap-2" aria-label="Planner progress">
          {PLANNER_STEPS.map((item, index) => {
            const complete = index < stepIndex;
            const current = index === stepIndex;
            return (
              <li key={item.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => index < stepIndex && goToStep(index)}
                  disabled={index > stepIndex || submitting}
                  aria-current={current ? 'step' : undefined}
                  className="group block w-full text-left disabled:cursor-default"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-colors duration-300',
                      complete || current ? 'bg-brand-forest' : 'bg-brand-line',
                      current && 'bg-brand-gold',
                    )}
                  />
                  <span
                    className={cn(
                      'mt-2 hidden truncate text-xs font-medium sm:block',
                      current ? 'text-brand-ink' : 'text-brand-muted',
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-brand-forest">
            Step {stepIndex + 1} of {PLANNER_STEPS.length}
          </p>
          <StartOverButton onConfirm={handleStartOver} disabled={submitting} />
        </div>

        <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm sm:p-10">
          <div key={step.id} className="animate-in fade-in slide-in-from-right-4 duration-300">
            {step.id === 'destination' && <DestinationStep {...stepProps} />}
            {step.id === 'dates' && <DatesStep {...stepProps} />}
            {step.id === 'travellers' && <TravellersStep {...stepProps} />}
            {step.id === 'style' && <StyleStep {...stepProps} />}
            {step.id === 'budget' && <BudgetStep {...stepProps} />}
            {step.id === 'preferences' && <PreferencesStep {...stepProps} />}
            {step.id === 'review' && <ReviewStep draft={draft} />}
          </div>

          {submitError && (
            <div role="alert" className="animate-in fade-in mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
              <p className="text-sm font-semibold text-destructive">We could not save your trip.</p>
              <p className="mt-1 text-sm text-brand-ink">{submitError}</p>
              <p className="mt-1 text-sm text-brand-muted">Your answers are still here. Check them and try again.</p>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-brand-line pt-6">
            <button
              type="button"
              onClick={() => goToStep(Math.max(stepIndex - 1, 0))}
              disabled={stepIndex === 0 || submitting}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>

            {isReview ? (
              <button
                type="button"
                onClick={handleCreateTrip}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md disabled:cursor-wait disabled:opacity-80"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Creating your trip
                  </>
                ) : submitError ? (
                  <>
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Try again
                  </>
                ) : (
                  <>
                    <Plane className="h-4 w-4" aria-hidden="true" />
                    Create my trip
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
              >
                {'Continue'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-forest">Trip snapshot</p>
          <h3 className="mt-3 text-2xl text-brand-ink">{draft.destination.trim() || 'Your destination'}</h3>
          {draft.otherDestinations.length > 0 && (
            <p className="mt-1 text-sm text-brand-muted">+ {draft.otherDestinations.join(', ')}</p>
          )}
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-brand-muted">Dates</dt>
              <dd className="text-right font-semibold text-brand-ink">
                {draft.startDate && draft.endDate && draft.endDate >= draft.startDate
                  ? `${formatShortDate(draft.startDate)} to ${formatShortDate(draft.endDate)}`
                  : 'Not set'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-brand-muted">Length</dt>
              <dd className="text-right font-semibold text-brand-ink">
                {draft.startDate && draft.endDate && draft.endDate >= draft.startDate
                  ? `${inclusiveDayCount(draft.startDate, draft.endDate)} days`
                  : 'Not set'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-brand-muted">Travellers</dt>
              <dd className="text-right font-semibold text-brand-ink">{travellerCount(draft)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-brand-muted">Styles</dt>
              <dd className="text-right font-semibold text-brand-ink">{draft.travelStyles.length || 'None yet'}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
