'use client';

import { useState, useEffect } from 'react';
import { Plane, Search, ArrowRight, CheckCircle2, ShieldCheck, Clock, ExternalLink, Bookmark } from 'lucide-react';
import { api } from '@/lib/api';
import { listTrips, TripRecord } from '@/lib/trips';

export default function FlightsPage() {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [origin, setOrigin] = useState('SFO');
  const [destination, setDestination] = useState('DPS');
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-27');
  const [cabinClass, setCabinClass] = useState('ECONOMY');
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
    <div className="min-h-screen bg-brand-mist pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Fare Intelligence</p>
          <h1 className="mt-2 font-serif text-4xl text-brand-ink sm:text-5xl">Flight Search & Comparison</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Search multi-carrier routes with live transparent pricing and verified itinerary protection.
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="text-xs font-semibold text-brand-muted">Origin</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                placeholder="Airport (e.g. SFO)"
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-semibold text-brand-ink uppercase focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                placeholder="Airport (e.g. DPS)"
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-semibold text-brand-ink uppercase focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted">Departure Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            {tripType === 'round' && (
              <div>
                <label className="text-xs font-semibold text-brand-muted">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
                />
              </div>
            )}

            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-forest p-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
              >
                <Search className="h-4 w-4" />
                Search Fares
              </button>
            </div>
          </div>
        </div>

        {/* Results Controls */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-muted uppercase">Stops:</span>
            <button
              onClick={() => setStopsFilter('ALL')}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                stopsFilter === 'ALL' ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
              }`}
            >
              All Fares
            </button>
            <button
              onClick={() => setStopsFilter('DIRECT')}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                stopsFilter === 'DIRECT' ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
              }`}
            >
              Nonstop only
            </button>
            <button
              onClick={() => setStopsFilter('1STOP')}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                stopsFilter === '1STOP' ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
              }`}
            >
              Up to 1 stop
            </button>
          </div>

          {trips.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-muted">Target trip:</span>
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
              className="flex flex-col justify-between gap-6 rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:border-brand-sage sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-mist text-brand-forest font-serif text-lg font-bold">
                  {offer.airlineCode || 'AIR'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl text-brand-ink">{offer.airlineName}</h3>
                    <span className="rounded-full bg-brand-mist px-2.5 py-0.5 text-[11px] font-semibold text-brand-muted">
                      {offer.flightNumber}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-brand-muted">
                    {offer.origin} &rarr; {offer.destination} &bull; {offer.baggageInfo}
                  </p>
                  {offer.stopDetails && (
                    <p className="mt-1 text-xs font-medium text-amber-700">Stop: {offer.stopDetails}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-xs text-brand-muted uppercase">Roundtrip per person</span>
                  <p className="font-serif text-3xl text-brand-ink">
                    ${Math.round(offer.priceMinor / 100).toLocaleString()}{' '}
                    <span className="text-sm font-sans font-medium text-brand-muted">{offer.currency}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleRevalidateAndBook(offer)}
                    disabled={revalidatingId === offer.id}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-brand-forest px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#274a39]"
                  >
                    {revalidatingId === offer.id ? 'Revalidating Fare...' : 'Book on Airline'}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>

                  {selectedTripId && (
                    <button
                      type="button"
                      onClick={() => handleSaveToTrip(offer)}
                      className="flex items-center justify-center gap-1 rounded-full border border-brand-line px-4 py-1.5 text-xs font-medium text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      {savedId === offer.id ? 'Saved to Trip!' : 'Save to Trip'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
