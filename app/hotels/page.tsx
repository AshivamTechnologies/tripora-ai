'use client';

import { useState, useEffect } from 'react';
import { Compass, Search, Star, Bookmark, ExternalLink, ShieldCheck, Check, MapPin, Sparkles, Coffee, Waves, Wifi, UtensilsCrossed } from 'lucide-react';
import { api } from '@/lib/api';
import { listTrips, TripRecord } from '@/lib/trips';

const STAY_COLLECTIONS = [
  { id: 'ALL', label: 'All Sanctuaries' },
  { id: '5STAR', label: '✦ 5-Star Private Reserves' },
  { id: 'VILLAS', label: 'Private Pool Villas' },
  { id: 'HERITAGE', label: 'Boutique Heritage & Historic' },
];

export default function HotelsPage() {
  const [destination, setDestination] = useState('Bali');
  const [checkInDate, setCheckInDate] = useState('2026-11-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-26');
  const [guests, setGuests] = useState(2);
  const [starRating, setStarRating] = useState<number>(0);
  const [selectedCollection, setSelectedCollection] = useState<string>('ALL');

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
    if (selectedCollection === '5STAR' && h.starRating < 5) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-14 text-white sm:px-14 sm:py-18 shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Private Estates & 5-Star Sanctuaries
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
              Curated Stays, Resorts & Villas
            </h1>
            <p className="mt-3 text-base text-white/80 font-light leading-relaxed">
              Verified luxury stays with Virtuoso & AMEX FHR privileges: complimentary daily breakfast, room upgrades, and $100 property credit.
            </p>
          </div>

          {/* Collection Filter Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {STAY_COLLECTIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCollection(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  selectedCollection === c.id
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Destination or City</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where would you like to stay?"
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-semibold text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Check-In</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Check-Out</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Guests</label>
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 2)}
                className="mt-1 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-forest p-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#254635] hover:shadow-md disabled:opacity-50"
              >
                <Search className="h-4 w-4" />
                <span>{loading ? 'Finding Stays...' : 'Search Sanctuaries'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Trip Targeting */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-brand-muted uppercase">Star Tier:</span>
            {[0, 5, 4].map((stars) => (
              <button
                key={stars}
                onClick={() => setStarRating(stars)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold ${
                  starRating === stars ? 'bg-brand-forest text-white' : 'bg-white text-brand-muted border border-brand-line'
                }`}
              >
                {stars === 0 ? 'All Ratings' : `${stars} Stars`}
              </button>
            ))}
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

        {/* Stays Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((h) => (
            <div
              key={h.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-sage"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-ink">
                  <img
                    src={h.imageUrl}
                    alt={h.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-brand-forest/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-brand-gold border border-brand-gold/30">
                    <Sparkles className="h-3 w-3" />
                    <span>Private Reserve</span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-amber-300">
                    <Star className="h-3 w-3 fill-amber-300" />
                    <span>{h.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-brand-forest font-medium">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{h.address || destination}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-brand-ink">{h.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-brand-muted font-light">{h.description}</p>

                  {/* Included VIP Privileges */}
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                    <span className="flex items-center gap-1 rounded-full bg-brand-mist px-2.5 py-1 text-brand-forest">
                      <Coffee className="h-3 w-3" /> Breakfast Included
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-brand-mist px-2.5 py-1 text-brand-forest">
                      <Waves className="h-3 w-3" /> Infinity Pool
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="border-t border-brand-line p-6 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-brand-muted">Starting from</span>
                  <p className="font-serif text-2xl font-bold text-brand-ink">
                    ${Math.round((h.pricePerNightMinor || 38000) / 100)} <span className="text-xs font-sans text-brand-muted font-normal">/ night</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {selectedTripId && (
                    <button
                      type="button"
                      onClick={() => handleSaveHotel(h)}
                      className="rounded-full border border-brand-line p-2.5 text-brand-ink hover:bg-brand-mist transition-colors"
                      title="Save to Trip"
                    >
                      <Bookmark className={`h-4 w-4 ${savedId === h.id ? 'fill-brand-forest text-brand-forest' : ''}`} />
                    </button>
                  )}
                  <a
                    href={h.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-full bg-brand-forest px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#254635] transition-all"
                  >
                    <span>Reserve Stay</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
