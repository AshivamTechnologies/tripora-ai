import { ArrowDown, ArrowUp, Clock, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import { formatMoney } from '@/lib/money';
import { formatTime } from '@/lib/dates';
import { TIME_SLOTS, type ActivityRecord, type TimeSlot } from '@/lib/trips';

type DayActivityListProps = {
  activities: ActivityRecord[];
  currency: string;
  onAdd: (slot: TimeSlot) => void;
  onEdit: (activity: ActivityRecord) => void;
  onDelete: (activity: ActivityRecord) => void;
  onMove: (activity: ActivityRecord, direction: -1 | 1) => void;
};

export function DayActivityList({ activities, currency, onAdd, onEdit, onDelete, onMove }: DayActivityListProps) {
  return (
    <div className="space-y-8">
      {TIME_SLOTS.map((slot) => {
        const slotActivities = activities
          .filter((activity) => activity.time_slot === slot.value)
          .sort((a, b) => a.position - b.position);

        return (
          <section key={slot.value} aria-labelledby={`slot-${slot.value}`}>
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <h3 id={`slot-${slot.value}`} className="text-lg font-semibold text-brand-ink">
                  {slot.label}
                </h3>
                <p className="text-xs text-brand-muted">{slot.hint}</p>
              </div>
              <button
                type="button"
                onClick={() => onAdd(slot.value)}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-forest px-3.5 py-1.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-forest hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                Add
              </button>
            </div>

            {slotActivities.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-brand-line px-5 py-6 text-center text-sm text-brand-muted">
                Nothing planned for the {slot.label.toLowerCase()} yet.
              </p>
            ) : (
              <ol className="space-y-3">
                {slotActivities.map((activity, index) => {
                  const time = formatTime(activity.start_time);
                  return (
                    <li
                      key={activity.id}
                      className="animate-in fade-in slide-in-from-bottom-1 group rounded-2xl border border-brand-line bg-white p-5 transition-all duration-200 hover:border-brand-sage hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold text-brand-ink">{activity.title}</h4>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-muted">
                            {time && (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                {time}
                                {activity.duration_minutes ? ` for ${activity.duration_minutes} min` : ''}
                              </span>
                            )}
                            {!time && activity.duration_minutes && (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                {activity.duration_minutes} min
                              </span>
                            )}
                            {activity.location && (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                {activity.location}
                              </span>
                            )}
                            {activity.estimated_cost_minor > 0 && (
                              <span className="font-medium text-brand-ink">
                                {formatMoney(activity.estimated_cost_minor, currency)} est.
                              </span>
                            )}
                          </div>
                          {activity.description && (
                            <p className="mt-3 text-sm leading-[1.5] text-brand-muted">{activity.description}</p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onMove(activity, -1)}
                            disabled={index === 0}
                            aria-label={`Move ${activity.title} up`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink disabled:opacity-30"
                          >
                            <ArrowUp className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onMove(activity, 1)}
                            disabled={index === slotActivities.length - 1}
                            aria-label={`Move ${activity.title} down`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink disabled:opacity-30"
                          >
                            <ArrowDown className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onEdit(activity)}
                            aria-label={`Edit ${activity.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-forest"
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(activity)}
                            aria-label={`Remove ${activity.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
    </div>
  );
}
