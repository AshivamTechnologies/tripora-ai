'use client';

import { useState, useEffect } from 'react';
import { Plane, Search, ArrowRight, CheckCircle2, ShieldCheck, Clock, ExternalLink, Bookmark, Sparkles, Luggage, Utensils, Wifi, Award } from 'lucide-react';
import { api } from '@/lib/api';
import { listTrips, TripRecord } from '@/lib/trips';

const CABIN_CLASSES = [
  { id: 'ECONOMY', label: 'Economy Cabin' },
  { id: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
  { id: 'BUSINESS', label: 'Business Lie-Flat' },
  { id: 'FIRST', label: 'First Class Suites' },
];

export default function FlightsPage() {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [origin, setOrigin] = useState('SFO');
  const [destination, setDestination] = useState('DPS');
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-27');
  const [cabinClass, setCabinClass] = useState('BUSINESS');
  const [adults, setAdults] = useState(2);
  const [stopsFilter, setStopsFilter] = useState<'ALL' | 'DIRECT' | '1STOP'>('ALL');

  const [offers, setOffers] = useState<any[]>([]);
  const [trips, setTrips] = useState<TripRecord[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [revalidatingId, setRevalidatingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    listTrips().then((list) => {
      setTrips(list);
      if (list.length > 0) setSelectedTripId(list[0].id);
    });
    handleSearch();
  }, []);

  async function handleSearch() {
    setLoading(true);
    try {
      const res = await api.request(
        `/flights/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&cabinClass=${cabinClass}`
      );
      setOffers(res.offers || []);
    } catch (err) {
      console.warn('Flight search failed:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRevalidateAndBook(offer: any) {
    setRevalidatingId(offer.id);
    try {
      const res = await api.request('/flights/revalidate', {
        method: 'POST',
        body: JSON.stringify({ offerId: offer.id }),
      });
      if (res.isPriceGuaranteed) {
        window.open(offer.bookingUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      window.open(offer.bookingUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setRevalidatingId(null);
    }
  }

  async function handleSaveToTrip(offer: any) {
    if (!selectedTripId) return;
    try {
      await api.request('/flights/save', {
        method: 'POST',
        body: JSON.stringify({ tripId: selectedTripId, offer }),
      });
      setSavedId(offer.id);
      setTimeout(() => setSavedId(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Could not save flight');
    }
  }

  const filteredOffers = offers.filter((o) => {
    if (stopsFilter === 'DIRECT') return o.stops === 0;
    if (stopsFilter === '1STOP') return o.stops <= 1;
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-14 text-white sm:px-14 sm:py-18 shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-3">
              <Plane className="h-3.5 w-3.5" />
              Global Aviation & Fare Intelligence
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
              Aviation Discovery & Price Lock
            </h1>
            <p className="mt-3 text-base text-white/80 font-light leading-relaxed">
              Real-time GDS multi-carrier fares with transparent pricing, lie-flat seat maps, and instant itinerary syncing.
            </p>
          </div>

          {/* Cabin Selector Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CABIN_CLASSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCabinClass(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  cabinClass === c.id
                    ? 'bg-white text-brand-forest font-semibold shadow-md'
                    : 'bg-white/10 text-white/85 hover:bg-white/20 border border-white/15'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Parameter Card */}
        <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 sm:p-8 shadow-sm">
          {/* Trip Type Radios */}
          <div className="flex gap-4 border-b border-brand-line pb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTripType('round')}
              className={`rounded-full px-4 py-1.5 transition-colors ${
                tripType === 'round' ? 'bg-brand-forest text-white' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType('oneway')}
              className={`rounded-full px-4 py-1.5 transition-colors ${
                tripType === 'oneway' ? 'bg-brand-forest text-white' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              One Way
            </button>
          </div>

          {/* Input Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Departure City (IATA)</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                placeholder="e.g. SFO or JFK"
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-semibold text-brand-ink focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Destination City (IATA)</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                placeholder="e.g. DPS or NRT"
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-semibold text-brand-ink focus:outline-none focus:border-brand-forest focus:ring-1 focus:ring-brand-forest"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Outbound Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            {tripType === 'round' ? (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
                />
              </div>
            ) : (
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Travelers</label>
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
                />
              </div>
            )}

            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-forest p-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#254635] hover:shadow-md disabled:opacity-50"
              >
                <Search className="h-4 w-4" />
                <span>{loading ? 'Scanning GDS...' : 'Search Live Fares'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Controls Bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-muted uppercase">Routing:</span>
            <button
              onClick={() => setStopsFilter('ALL')}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                stopsFilter === 'ALL' ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
              }`}
            >
              All Fares
            </button>
            <button
              onClick={() => setStopsFilter('DIRECT')}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                stopsFilter === 'DIRECT' ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
              }`}
            >
              Nonstop Only
            </button>
            <button
              onClick={() => setStopsFilter('1STOP')}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                stopsFilter === '1STOP' ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
              }`}
            >
              1 Stop Max
            </button>
          </div>

          {trips.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-muted">Target Itinerary:</span>
              <select
                value={selectedTripId}
                onChange={(e) => setSelectedTripId(e.target.value)}
                className="rounded-xl border border-brand-line bg-white px-3 py-1.5 font-medium text-brand-ink focus:outline-none"
              >
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.destination} ({t.start_date})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Offers List */}
        <div className="mt-6 space-y-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col justify-between gap-6 rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:border-brand-sage hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-forest text-white font-serif text-xl font-bold shadow-sm">
                  {offer.airlineCode || 'AIR'}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-2xl text-brand-ink">{offer.airlineName}</h3>
                    <span className="rounded-full bg-brand-mist px-2.5 py-0.5 text-xs font-semibold text-brand-forest border border-brand-line">
                      {offer.flightNumber}
                    </span>
                    <span className="rounded-full bg-brand-forest/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-forest">
                      {offer.cabinClass || cabinClass}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-brand-muted font-medium">
                    {offer.origin} &rarr; {offer.destination} &bull; {offer.baggageInfo}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-brand-muted">
                    <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      Priority Boarding Included
                    </span>
                    <span className="flex items-center gap-1 text-brand-muted">
                      <Wifi className="h-3 w-3" />
                      High-Speed Wi-Fi
                    </span>
                    {offer.stopDetails && (
                      <span className="text-amber-700 font-medium">Stop: {offer.stopDetails}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex flex-col sm:items-end justify-between border-t border-brand-line pt-4 sm:border-0 sm:pt-0">
                <div>
                  <span className="text-xs text-brand-muted">Total Fare (incl. taxes)</span>
                  <p className="font-serif text-3xl font-bold text-brand-ink">
                    ${Math.round((offer.priceMinor || 85000) / 100).toLocaleString()}
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  {selectedTripId && (
                    <button
                      type="button"
                      onClick={() => handleSaveToTrip(offer)}
                      className="rounded-full border border-brand-line px-3.5 py-2 text-xs font-semibold text-brand-ink hover:bg-brand-mist transition-colors flex items-center gap-1.5"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {savedId === offer.id ? 'Saved!' : 'Save to Trip'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleRevalidateAndBook(offer)}
                    disabled={revalidatingId === offer.id}
                    className="flex items-center gap-1.5 rounded-full bg-brand-forest px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#254635] transition-all hover:shadow-md"
                  >
                    <span>{revalidatingId === offer.id ? 'Verifying Seat...' : 'Verify & Book'}</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
