'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Sparkles, Wand2, Clock, MapPin, DollarSign, Trash2, Edit3, ArrowUpDown, Check } from 'lucide-react';
import { api } from '@/lib/api';
import { getTripDetail, TripDetail, ActivityRecord } from '@/lib/trips';

export default function TripItineraryPage({ params }: { params: { tripId: string } }) {
  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // New activity form
  const [actTitle, setActTitle] = useState('');
  const [actDesc, setActDesc] = useState('');
  const [actLoc, setActLoc] = useState('');
  const [actSlot, setActSlot] = useState<'MORNING' | 'AFTERNOON' | 'EVENING'>('MORNING');
  const [actDuration, setActDuration] = useState(90);
  const [actCost, setActCost] = useState('0');

  useEffect(() => {
    load();
  }, [params.tripId]);

  async function load() {
    try {
      const data = await getTripDetail(params.tripId);
      setTrip(data);
      if (data && data.days.length > 0 && !selectedDayId) {
        setSelectedDayId(data.days[0].id);
      }
    } catch (err) {
      console.warn('Itinerary load error:', err);
    }
  }

  const selectedDay = trip?.days.find((d) => d.id === selectedDayId) || trip?.days[0];

  async function handleAddActivity(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !actTitle.trim()) return;

    try {
      await api.request(`/trips/${params.tripId}/itinerary/activities`, {
        method: 'POST',
        body: JSON.stringify({
          dayId: selectedDay.id,
          title: actTitle.trim(),
          description: actDesc.trim(),
          location: actLoc.trim(),
          timeSlot: actSlot,
          durationMinutes: actDuration,
          estimatedCostMinor: Math.round(parseFloat(actCost || '0') * 100),
        }),
      });

      setActTitle('');
      setActDesc('');
      setActLoc('');
      setShowAddModal(false);
      load();
    } catch (err: any) {
      alert(err.message || 'Could not add activity');
    }
  }

  async function handleDeleteActivity(actId: string) {
    try {
      await api.request(`/trips/${params.tripId}/itinerary/activities/${actId}`, { method: 'DELETE' });
      load();
    } catch (err: any) {
      alert(err.message || 'Could not delete activity');
    }
  }

  async function handleOptimizeDay() {
    if (!selectedDay) return;
    setOptimizing(true);
    try {
      await api.request(`/trips/${params.tripId}/itinerary/days/${selectedDay.id}/optimize`, { method: 'POST' });
      load();
    } catch (err: any) {
      alert(err.message || 'Optimization failed');
    } finally {
      setOptimizing(false);
    }
  }

  async function handleRegenerateDay() {
    if (!selectedDay) return;
    if (!confirm(`Regenerate Day ${selectedDay.day_number} activities with TRIPORA AI? Manual changes on other days will be preserved.`)) return;

    setRegenerating(true);
    try {
      await api.request(`/trips/${params.tripId}/itinerary/days/${selectedDay.id}/regenerate`, { method: 'POST' });
      load();
    } catch (err: any) {
      alert(err.message || 'Regeneration failed');
    } finally {
      setRegenerating(false);
    }
  }

  const morningActs = (selectedDay?.activities || []).filter((a) => a.time_slot === 'MORNING');
  const afternoonActs = (selectedDay?.activities || []).filter((a) => a.time_slot === 'AFTERNOON');
  const eveningActs = (selectedDay?.activities || []).filter((a) => a.time_slot === 'EVENING');

  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href={`/trips/${params.tripId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-forest"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Trip Hub
        </Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-brand-ink sm:text-4xl">
              {trip?.destination || 'Trip'} Day-by-Day Itinerary
            </h1>
            <p className="mt-1 text-sm text-brand-muted">
              Paced with morning, afternoon, and evening slots. Reorder, add, or optimize routes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleOptimizeDay}
              disabled={optimizing}
              className="flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-4 py-2 text-xs font-semibold text-brand-ink shadow-sm hover:bg-brand-mist"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-brand-forest" />
              {optimizing ? 'Optimizing Schedule...' : 'Optimize Day Route'}
            </button>
            <button
              type="button"
              onClick={handleRegenerateDay}
              disabled={regenerating}
              className="flex items-center gap-1.5 rounded-full border border-brand-gold/40 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-900 shadow-sm hover:bg-amber-100"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              {regenerating ? 'Regenerating Day...' : 'Regenerate This Day'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#274a39]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Activity
            </button>
          </div>
        </div>

        {/* Days Navigation Tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(trip?.days || []).map((day) => {
            const isSelected = day.id === (selectedDayId || trip?.days[0]?.id);
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDayId(day.id)}
                className={`flex shrink-0 flex-col items-start rounded-2xl border px-5 py-3 text-left transition-all ${
                  isSelected
                    ? 'border-brand-forest bg-white shadow-md'
                    : 'border-brand-line bg-white/60 hover:bg-white text-brand-muted'
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-brand-forest' : 'text-brand-muted'}`}>
                  Day {day.day_number}
                </span>
                <span className="font-serif text-sm font-semibold text-brand-ink">{day.day_date}</span>
              </button>
            );
          })}
        </div>

        {/* Slots Container */}
        <div className="mt-8 space-y-8">
          {/* Morning Slot */}
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-line pb-3">
              <span className="font-serif text-lg text-brand-forest font-semibold">Morning &bull; Before 12 PM</span>
              <span className="text-xs text-brand-muted">{morningActs.length} activity(s)</span>
            </div>
            <div className="mt-4 space-y-3">
              {morningActs.length === 0 ? (
                <p className="py-4 text-center text-xs text-brand-muted">No activities scheduled for the morning.</p>
              ) : (
                morningActs.map((act) => (
                  <ActivityCard key={act.id} activity={act} onDelete={() => handleDeleteActivity(act.id)} />
                ))
              )}
            </div>
          </div>

          {/* Afternoon Slot */}
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-line pb-3">
              <span className="font-serif text-lg text-brand-forest font-semibold">Afternoon &bull; 12 PM to 5 PM</span>
              <span className="text-xs text-brand-muted">{afternoonActs.length} activity(s)</span>
            </div>
            <div className="mt-4 space-y-3">
              {afternoonActs.length === 0 ? (
                <p className="py-4 text-center text-xs text-brand-muted">No activities scheduled for the afternoon.</p>
              ) : (
                afternoonActs.map((act) => (
                  <ActivityCard key={act.id} activity={act} onDelete={() => handleDeleteActivity(act.id)} />
                ))
              )}
            </div>
          </div>

          {/* Evening Slot */}
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-brand-line pb-3">
              <span className="font-serif text-lg text-brand-forest font-semibold">Evening &bull; After 5 PM</span>
              <span className="text-xs text-brand-muted">{eveningActs.length} activity(s)</span>
            </div>
            <div className="mt-4 space-y-3">
              {eveningActs.length === 0 ? (
                <p className="py-4 text-center text-xs text-brand-muted">No activities scheduled for the evening.</p>
              ) : (
                eveningActs.map((act) => (
                  <ActivityCard key={act.id} activity={act} onDelete={() => handleDeleteActivity(act.id)} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Add Activity Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
              <h3 className="font-serif text-2xl text-brand-ink">Add Day Activity</h3>
              <form onSubmit={handleAddActivity} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-brand-muted">Activity Title</label>
                  <input
                    type="text"
                    required
                    value={actTitle}
                    onChange={(e) => setActTitle(e.target.value)}
                    placeholder="e.g. Visit Kiyomizu-dera Temple"
                    className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-muted">Description</label>
                  <textarea
                    rows={2}
                    value={actDesc}
                    onChange={(e) => setActDesc(e.target.value)}
                    placeholder="Details about tickets, highlights, or tips..."
                    className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-muted">Location</label>
                    <input
                      type="text"
                      value={actLoc}
                      onChange={(e) => setActLoc(e.target.value)}
                      placeholder="Address or landmark"
                      className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted">Time Slot</label>
                    <select
                      value={actSlot}
                      onChange={(e) => setActSlot(e.target.value as any)}
                      className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                    >
                      <option value="MORNING">Morning (Before 12 PM)</option>
                      <option value="AFTERNOON">Afternoon (12 PM - 5 PM)</option>
                      <option value="EVENING">Evening (After 5 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-brand-muted">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={actDuration}
                      onChange={(e) => setActDuration(parseInt(e.target.value, 10) || 60)}
                      className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-brand-muted">Estimated Cost ($)</label>
                    <input
                      type="number"
                      value={actCost}
                      onChange={(e) => setActCost(e.target.value)}
                      placeholder="0.00"
                      className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-full border border-brand-line px-4 py-2 text-xs font-semibold text-brand-muted hover:bg-brand-mist"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-brand-forest px-5 py-2 text-xs font-semibold text-white hover:bg-[#274a39]"
                  >
                    Save Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityCard({ activity, onDelete }: { activity: ActivityRecord; onDelete: () => void }) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-brand-line bg-brand-mist/40 p-4 transition-colors hover:border-brand-sage">
      <div>
        <div className="flex items-center gap-2">
          {activity.start_time && (
            <span className="flex items-center gap-1 rounded bg-white px-2 py-0.5 text-xs font-bold text-brand-forest shadow-2xs">
              <Clock className="h-3 w-3" />
              {activity.start_time}
            </span>
          )}
          <h4 className="font-serif text-base text-brand-ink font-semibold">{activity.title}</h4>
        </div>
        {activity.description && <p className="mt-1 text-xs text-brand-muted">{activity.description}</p>}
        <div className="mt-3 flex items-center gap-4 text-[11px] text-brand-muted">
          {activity.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-brand-forest" />
              {activity.location}
            </span>
          )}
          {activity.duration_minutes && <span>{activity.duration_minutes} mins</span>}
          {activity.estimated_cost_minor > 0 && (
            <span className="font-semibold text-brand-ink">
              ${(activity.estimated_cost_minor / 100).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <button type="button" onClick={onDelete} className="text-brand-muted hover:text-red-600 p-1">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
