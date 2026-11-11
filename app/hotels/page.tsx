'use client';

import { useState, useEffect } from 'react';
import { Compass, Search, Star, Bookmark, ExternalLink, ShieldCheck, Check, MapPin } from 'lucide-react';
import { api } from '@/lib/api';
import { listTrips, TripRecord } from '@/lib/trips';

export default function HotelsPage() {
  const [destination, setDestination] = useState('Bali');
  const [checkInDate, setCheckInDate] = useState('2026-11-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-26');
  const [guests, setGuests] = useState(2);
  const [starRating, setStarRating] = useState<number>(0);

  const [hotels, setHotels] = useState<any[]>([]);
  const [trips, setTrips] = useState<TripRecord[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [loading, setLoading] = useState(false);
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
        `/hotels/search?destination=${encodeURIComponent(destination)}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${guests}`
      );
      setHotels(res.hotels || []);
    } catch (err) {
      console.warn('Hotel search error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveHotel(hotel: any) {
    if (!selectedTripId) return;
    try {
      await api.request('/hotels/save', {
        method: 'POST',
        body: JSON.stringify({ tripId: selectedTripId, hotel }),
      });
      setSavedId(hotel.id);
      setTimeout(() => setSavedId(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Could not save hotel');
    }
  }

  const filteredHotels = hotels.filter((h) => {
    if (starRating > 0 && h.starRating < starRating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Accommodations</p>
          <h1 className="mt-2 font-serif text-4xl text-brand-ink sm:text-5xl">Hotels, Resorts & Private Villas</h1>
          <p className="mt-2 text-sm text-brand-muted">
            Find and compare verified stays with transparent cancellation policies and direct reservation links.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="text-xs font-semibold text-brand-muted">Destination or City</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to stay?"
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-semibold text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted">Check-In</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted">Check-Out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-muted">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/50 p-3 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              >
                <option value={1}>1 Guest (Solo)</option>
                <option value={2}>2 Guests (Couple)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests (Group)</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-forest p-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
              >
                <Search className="h-4 w-4" />
                Find Stays
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Target Trip */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-muted uppercase">Min Star Rating:</span>
            {[0, 3, 4, 5].map((stars) => (
              <button
                key={stars}
                onClick={() => setStarRating(stars)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  starRating === stars
                    ? 'bg-brand-forest text-white'
                    : 'bg-white text-brand-muted border border-brand-line hover:text-brand-ink'
                }`}
              >
                {stars === 0 ? 'All Stays' : `${stars}★ & above`}
              </button>
            ))}
          </div>

          {trips.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-brand-muted">Save to trip:</span>
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

        {/* Hotel Cards Grid */}
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] bg-brand-ink">
                <img src={hotel.mainImage} alt={hotel.name} className="h-full w-full object-cover" />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-300" />
                  {hotel.reviewScore} / 10
                </span>
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-forest backdrop-blur-sm">
                  {hotel.propertyType}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif text-xl text-brand-ink">{hotel.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-brand-muted">
                    <MapPin className="h-3.5 w-3.5 text-brand-forest shrink-0" />
                    {hotel.address}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(hotel.amenities || []).slice(0, 3).map((a: string) => (
                      <span key={a} className="rounded-full bg-brand-mist px-2.5 py-0.5 text-[11px] text-brand-muted">
                        {a}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-xs text-emerald-800 font-medium">
                    &bull; {hotel.cancellationPolicy}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-brand-line pt-4">
                  <div>
                    <span className="text-[11px] text-brand-muted uppercase">From</span>
                    <p className="font-serif text-2xl text-brand-ink">
                      ${Math.round(hotel.pricePerNightMinor / 100)}{' '}
                      <span className="text-xs font-sans text-brand-muted">/ night</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedTripId && (
                      <button
                        type="button"
                        onClick={() => handleSaveHotel(hotel)}
                        className="rounded-full border border-brand-line p-2 text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink"
                        title="Save to Trip"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    )}

                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#274a39]"
                    >
                      Reserve
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
