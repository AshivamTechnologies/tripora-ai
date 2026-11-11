'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, DollarSign, MapPin, Sparkles, Star, Sun, Utensils, Clock } from 'lucide-react';
import { api } from '@/lib/api';

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const [destination, setDestination] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [destData, weatherData] = await Promise.all([
          api.request(`/destinations/${params.id}`),
          api.request(`/destinations/${params.id}/weather`).catch(() => null),
        ]);
        setDestination(destData);
        setWeather(weatherData);
      } catch (err) {
        console.warn('Destination load error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading || !destination) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-20 text-center">
        <div className="h-64 animate-pulse rounded-3xl bg-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-mist pb-24">
      {/* Hero Header */}
      <div className="relative isolate h-[480px] overflow-hidden bg-brand-ink">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-transparent" />
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-12 pt-8 sm:px-8">
          <Link
            href="/destinations"
            className="flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to destinations
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
                {destination.country} &bull; {destination.region || 'World Guide'}
              </span>
              <h1 className="mt-2 font-serif text-5xl text-white sm:text-6xl">{destination.name}</h1>
              <p className="mt-3 max-w-xl text-base text-white/85">{destination.description}</p>
            </div>

            <Link
              href={`/planner?destination=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-ink shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#d6b77e]"
            >
              <Sparkles className="h-4 w-4" />
              Build Itinerary for {destination.name}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-8">
        {/* Key Info Bar */}
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-brand-line bg-white p-6 shadow-sm sm:grid-cols-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Average Daily Budget</span>
            <p className="mt-1 font-serif text-2xl text-brand-ink">
              ${Math.round((destination.averageDailyBudgetMinor || 15000) / 100)} / day
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Recommended Seasons</span>
            <p className="mt-1 font-serif text-lg text-brand-forest">{destination.bestSeasons}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Timezone</span>
            <p className="mt-1 font-serif text-lg text-brand-ink">{destination.timezone || 'Local Standard Time'}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Coordinates</span>
            <p className="mt-1 font-serif text-lg text-brand-muted">
              {destination.latitude}&deg;N, {destination.longitude}&deg;E
            </p>
          </div>
        </div>

        {/* Weather Forecast Widget */}
        {weather && (
          <div className="mt-10 rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-forest">
                <Sun className="h-5 w-5 text-amber-500" />
                <h2 className="font-serif text-xl text-brand-ink">Live Weather & 5-Day Outlook</h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                {weather.current?.condition} &bull; {weather.current?.tempC}&deg;C ({weather.current?.tempF}&deg;F)
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {(weather.forecast || []).map((f: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-brand-line bg-brand-mist/50 p-4 text-center">
                  <p className="text-xs font-semibold text-brand-muted">{f.day}</p>
                  <p className="mt-2 font-serif text-xl text-brand-ink">{f.tempHighC}&deg;C</p>
                  <p className="text-xs text-brand-muted">{f.tempLowC}&deg;C low</p>
                  <p className="mt-1 text-[11px] font-medium text-brand-forest">{f.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Attractions */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl text-brand-ink">Iconic Landmarks & Attractions</h2>
              <p className="text-sm text-brand-muted">Curated highlights mapped with opening hours and admission guidelines.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(destination.attractions || []).map((attr: any) => (
              <div key={attr.id} className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm">
                <div className="relative aspect-[16/10] bg-brand-ink">
                  <img src={attr.imageUrl} alt={attr.name} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-amber-300">
                    <Star className="h-3 w-3 fill-amber-300" />
                    {attr.rating}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-forest">{attr.category}</span>
                  <h3 className="mt-1 font-serif text-xl text-brand-ink">{attr.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-brand-muted">{attr.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-brand-muted border-t border-brand-line pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {attr.estimatedDurationMin} mins
                    </span>
                    <span>{attr.openingHours || 'Daily'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Cuisine & Restaurants */}
        <div className="mt-14">
          <h2 className="font-serif text-3xl text-brand-ink">Culinary Gems</h2>
          <p className="text-sm text-brand-muted">Authentic flavors selected by our regional dining correspondents.</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {(destination.restaurants || []).map((rest: any) => (
              <div key={rest.id} className="flex gap-4 rounded-3xl border border-brand-line bg-white p-5 shadow-sm">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-brand-ink">
                  <img src={rest.imageUrl} alt={rest.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg text-brand-ink">{rest.name}</h3>
                      <span className="text-xs font-bold text-brand-forest">{rest.priceLevel}</span>
                    </div>
                    <p className="text-xs text-brand-muted">{rest.cuisine}</p>
                    <p className="mt-1 text-xs text-brand-muted">{rest.address}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {rest.rating}
                    </span>
                    <span className="text-brand-muted">{rest.openingHours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
