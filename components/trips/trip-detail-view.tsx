'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowLeft, Loader2, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { ActivityDialog } from '@/components/trips/activity-dialog';
import { DayActivityList } from '@/components/trips/day-activity-list';
import { TripSummary } from '@/components/trips/trip-summary';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { formatLongDate, formatShortDate, todayISODate } from '@/lib/dates';
import {
  compareActivities,
  createActivity,
  deleteActivity,
  deleteTrip,
  getTripDetail,
  getTripStatus,
  setActivityPositions,
  updateActivity,
  type ActivityFields,
  type ActivityRecord,
  type TimeSlot,
  type TripDetail,
} from '@/lib/trips';

type EditorState = {
  dayId: string;
  activity: ActivityRecord | null;
  slot: TimeSlot;
};

function nextPosition(activities: ActivityRecord[], slot: TimeSlot): number {
  const positions = activities.filter((item) => item.time_slot === slot).map((item) => item.position);
  return positions.length === 0 ? 0 : Math.max(...positions) + 1;
}

export function TripDetailView({ tripId }: { tripId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [pendingActivityDelete, setPendingActivityDelete] = useState<ActivityRecord | null>(null);
  const [tripDeleteOpen, setTripDeleteOpen] = useState(false);
  const [deletingTrip, setDeletingTrip] = useState(false);

  useEffect(() => {
    let active = true;
    getTripDetail(tripId)
      .then((data) => {
        if (!active) return;
        setTrip(data);
        setLoaded(true);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setLoadError(err instanceof Error ? err.message : 'This trip could not be loaded.');
        setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [tripId, attempt]);

  const selectedDay = useMemo(() => {
    if (!trip || trip.days.length === 0) return null;
    return trip.days.find((day) => day.id === selectedDayId) ?? trip.days[0];
  }, [trip, selectedDayId]);

  const estimatedMinor = useMemo(
    () =>
      trip
        ? trip.days.reduce(
            (sum, day) => sum + day.activities.reduce((daySum, item) => daySum + item.estimated_cost_minor, 0),
            0,
          )
        : 0,
    [trip],
  );

  function patchDayActivities(dayId: string, update: (activities: ActivityRecord[]) => ActivityRecord[]) {
    setTrip((current) =>
      current
        ? {
            ...current,
            days: current.days.map((day) =>
              day.id === dayId ? { ...day, activities: update(day.activities).sort(compareActivities) } : day,
            ),
          }
        : current,
    );
  }

  async function handleSaveActivity(fields: ActivityFields) {
    if (!trip || !editor) return;
    const day = trip.days.find((item) => item.id === editor.dayId);
    if (!day) throw new Error('This day is no longer part of the trip.');

    if (!editor.activity) {
      const created = await createActivity(trip.id, day.id, fields, nextPosition(day.activities, fields.timeSlot));
      patchDayActivities(day.id, (activities) => [...activities, created]);
      setEditor(null);
      toast({ title: 'Activity added' });
      return;
    }

    const previous = editor.activity;
    const position =
      fields.timeSlot === previous.time_slot
        ? previous.position
        : nextPosition(
            day.activities.filter((item) => item.id !== previous.id),
            fields.timeSlot,
          );
    const updated: ActivityRecord = {
      ...previous,
      title: fields.title,
      description: fields.description,
      location: fields.location,
      time_slot: fields.timeSlot,
      start_time: fields.startTime,
      duration_minutes: fields.durationMinutes,
      estimated_cost_minor: fields.estimatedCostMinor,
      position,
    };

    patchDayActivities(day.id, (activities) =>
      activities.map((item) => (item.id === previous.id ? updated : item)),
    );
    try {
      await updateActivity(previous.id, fields, position);
      setEditor(null);
      toast({ title: 'Activity updated' });
    } catch (err) {
      patchDayActivities(day.id, (activities) =>
        activities.map((item) => (item.id === previous.id ? previous : item)),
      );
      throw err;
    }
  }

  async function handleDeleteActivity() {
    const activity = pendingActivityDelete;
    setPendingActivityDelete(null);
    if (!activity) return;

    patchDayActivities(activity.trip_day_id, (activities) =>
      activities.filter((item) => item.id !== activity.id),
    );
    try {
      await deleteActivity(activity.id);
      toast({ title: 'Activity removed' });
    } catch (err) {
      patchDayActivities(activity.trip_day_id, (activities) => [...activities, activity]);
      toast({
        variant: 'destructive',
        title: 'The activity could not be removed',
        description: err instanceof Error ? err.message : 'Please try again.',
      });
    }
  }

  async function handleMove(activity: ActivityRecord, direction: -1 | 1) {
    const day = trip?.days.find((item) => item.id === activity.trip_day_id);
    if (!day) return;

    const siblings = day.activities
      .filter((item) => item.time_slot === activity.time_slot)
      .sort((a, b) => a.position - b.position);
    const index = siblings.findIndex((item) => item.id === activity.id);
    const target = siblings[index + direction];
    if (!target) return;

    const movedPosition = target.position;
    const targetPosition = activity.position;
    patchDayActivities(day.id, (activities) =>
      activities.map((item) => {
        if (item.id === activity.id) return { ...item, position: movedPosition };
        if (item.id === target.id) return { ...item, position: targetPosition };
        return item;
      }),
    );

    try {
      await setActivityPositions([
        { id: activity.id, position: movedPosition },
        { id: target.id, position: targetPosition },
      ]);
    } catch (err) {
      patchDayActivities(day.id, (activities) =>
        activities.map((item) => {
          if (item.id === activity.id) return activity;
          if (item.id === target.id) return target;
          return item;
        }),
      );
      toast({
        variant: 'destructive',
        title: 'The order could not be saved',
        description: err instanceof Error ? err.message : 'Please try again.',
      });
    }
  }

  async function handleDeleteTrip() {
    if (!trip) return;
    setDeletingTrip(true);
    try {
      await deleteTrip(trip.id);
      toast({ title: 'Trip deleted' });
      router.push('/trips');
    } catch (err) {
      setDeletingTrip(false);
      setTripDeleteOpen(false);
      toast({
        variant: 'destructive',
        title: 'The trip could not be deleted',
        description: err instanceof Error ? err.message : 'Please try again.',
      });
    }
  }

  function retryLoad() {
    setLoaded(false);
    setLoadError(null);
    setAttempt((value) => value + 1);
  }

  if (!loaded) {
    return (
      <div className="mx-auto flex max-w-[1720px] w-full flex-col gap-6 px-4 py-16 sm:px-6 lg:px-10 2xl:px-14" aria-busy="true" aria-label="Loading trip">
        <div className="h-64 animate-pulse rounded-3xl border border-brand-line bg-white" />
        <div className="h-96 animate-pulse rounded-3xl border border-brand-line bg-white" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center" role="alert">
        <AlertTriangle className="mx-auto h-8 w-8 text-destructive" aria-hidden="true" />
        <h1 className="mt-4 text-3xl text-brand-ink">This trip could not be loaded</h1>
        <p className="mt-3 text-sm text-brand-muted">{loadError}</p>
        <button
          type="button"
          onClick={retryLoad}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-forest px-5 py-2.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-forest hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl text-brand-ink">Trip not found</h1>
        <p className="mt-3 text-sm text-brand-muted">It may have been deleted.</p>
        <Link href="/trips" className="mt-8 inline-block text-sm font-semibold text-brand-forest underline-offset-4 hover:underline">
          Back to my trips
        </Link>
      </div>
    );
  }

  const status = getTripStatus(trip, todayISODate());

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist">
      <div className="mx-auto max-w-[1720px] w-full space-y-8 px-4 py-10 sm:px-6 lg:px-10 2xl:px-14 sm:py-14">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-forest"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            My trips
          </Link>
          <button
            type="button"
            onClick={() => setTripDeleteOpen(true)}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-brand-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete trip
          </button>
        </div>

        <TripSummary trip={trip} status={status} estimatedMinor={estimatedMinor} />

        <section aria-labelledby="itinerary-heading" className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 id="itinerary-heading" className="text-3xl text-brand-ink">
              Day-by-day itinerary
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              Add activities to each part of the day, then reorder or edit them as your plans change.
            </p>
          </div>

          {trip.days.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-brand-line p-8 text-center text-sm text-brand-muted">
              This trip has no days yet.
            </p>
          ) : (
            <>
              <div className="-mx-2 mb-8 flex gap-2 overflow-x-auto px-2 pb-2" role="tablist" aria-label="Trip days">
                {trip.days.map((day) => {
                  const selected = selectedDay?.id === day.id;
                  return (
                    <button
                      key={day.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setSelectedDayId(day.id)}
                      className={`flex min-w-[112px] flex-col items-start rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                        selected
                          ? 'border-brand-forest bg-brand-forest text-white shadow-md'
                          : 'border-brand-line bg-white text-brand-ink hover:-translate-y-0.5 hover:border-brand-sage'
                      }`}
                    >
                      <span className={`text-xs font-medium ${selected ? 'text-white/75' : 'text-brand-muted'}`}>
                        Day {day.day_number}
                      </span>
                      <span className="mt-1 text-sm font-semibold">{formatShortDate(day.day_date)}</span>
                      <span className={`mt-1 text-xs ${selected ? 'text-white/75' : 'text-brand-muted'}`}>
                        {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedDay && (
                <div key={selectedDay.id} className="animate-in fade-in duration-300">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-brand-forest">Day {selectedDay.day_number}</p>
                      <p className="font-serif text-2xl text-brand-ink">{formatLongDate(selectedDay.day_date)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditor({ dayId: selectedDay.id, activity: null, slot: 'MORNING' })}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#274a39]"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Add activity
                    </button>
                  </div>

                  <DayActivityList
                    activities={selectedDay.activities}
                    currency={trip.currency}
                    onAdd={(slot) => setEditor({ dayId: selectedDay.id, activity: null, slot })}
                    onEdit={(activity) => setEditor({ dayId: selectedDay.id, activity, slot: activity.time_slot })}
                    onDelete={(activity) => setPendingActivityDelete(activity)}
                    onMove={handleMove}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <ActivityDialog
        open={editor !== null}
        onOpenChange={(open) => !open && setEditor(null)}
        activity={editor?.activity ?? null}
        defaultSlot={editor?.slot ?? 'MORNING'}
        currency={trip.currency}
        onSubmit={handleSaveActivity}
      />

      <AlertDialog open={pendingActivityDelete !== null} onOpenChange={(open) => !open && setPendingActivityDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this activity?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingActivityDelete?.title} will be removed from this day. This cannot be undone from the app.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteActivity}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={tripDeleteOpen} onOpenChange={(open) => !deletingTrip && setTripDeleteOpen(open)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this trip?</AlertDialogTitle>
            <AlertDialogDescription>
              The itinerary, every day and all of its activities for {trip.destination} will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingTrip} className="rounded-full">
              Keep trip
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleDeleteTrip();
              }}
              disabled={deletingTrip}
              className="inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingTrip && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Delete trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
