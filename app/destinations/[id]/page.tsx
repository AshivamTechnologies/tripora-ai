'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, DollarSign, MapPin, Sparkles, Star, Sun, Utensils, Clock, Wind, Droplets, Compass, ShieldCheck } from 'lucide-react';
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
      <div className="min-h-screen bg-brand-mist/30 py-20">
        <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="h-96 animate-pulse rounded-3xl bg-white border border-brand-line" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28">
      {/* 1. Cinematic Hero Header */}
      <div className="relative isolate min-h-[520px] overflow-hidden bg-brand-ink">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.85] transition-transform duration-1000 scale-100 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative mx-auto flex min-h-[520px] max-w-[1720px] w-full flex-col justify-between px-4 pb-12 pt-8 sm:px-6 lg:px-10 2xl:px-14">
          <Link
            href="/destinations"
            className="flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/30 border border-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Curated Sanctuaries</span>
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold border border-brand-gold/40 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{destination.country} &bull; {destination.region || 'Private Reserve'}</span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none">
                {destination.name}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-xl">
                {destination.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/planner?destination=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-sm font-semibold text-brand-ink shadow-xl transition-all hover:bg-[#d6b77e] hover:scale-105 w-full sm:w-auto"
              >
                <Sparkles className="h-4 w-4" />
                <span>Curate Itinerary for {destination.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1720px] w-full px-4 pt-12 sm:px-6 lg:px-10 2xl:px-14">
        {/* 2. Key Intelligence Telemetry Bar */}
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-brand-line bg-white p-6 shadow-sm sm:grid-cols-4">
          <div className="p-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Average Daily Budget</span>
            <p className="mt-1 font-serif text-2xl text-brand-ink">
              ${Math.round((destination.averageDailyBudgetMinor || 15000) / 100)} <span className="text-xs font-sans text-brand-muted font-normal">/ day</span>
            </p>
          </div>
          <div className="p-2 border-l border-brand-line/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Prime Season</span>
            <p className="mt-1 font-serif text-xl text-brand-forest">{destination.bestSeasons}</p>
          </div>
          <div className="p-2 border-l border-brand-line/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Local Timezone</span>
            <p className="mt-1 font-serif text-xl text-brand-ink">{destination.timezone || 'Local Standard Time'}</p>
          </div>
          <div className="p-2 border-l border-brand-line/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Geo-Coordinates</span>
            <p className="mt-1 font-serif text-lg text-brand-muted font-mono">
              {destination.latitude}&deg;N, {destination.longitude}&deg;E
            </p>
          </div>
        </div>

        {/* 3. Live Weather & Microclimate Telemetry */}
        {weather && (
          <div className="mt-8 rounded-3xl border border-brand-line bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-line/70 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-forest">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Real-Time Atmospheric Forecast</span>
                </div>
                <h2 className="mt-1 font-serif text-2xl text-brand-ink">Local Climate & 5-Day Outlook</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 border border-emerald-200">
                  {weather.current?.condition} &bull; {weather.current?.tempC}&deg;C ({weather.current?.tempF}&deg;F)
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {(weather.forecast || []).map((f: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-brand-line bg-brand-mist/40 p-4 text-center transition-all hover:bg-brand-mist hover:border-brand-sage">
                  <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">{f.day}</p>
                  <p className="mt-2 font-serif text-2xl text-brand-ink">{f.tempHighC}&deg;C</p>
                  <p className="text-xs text-brand-muted">{f.tempLowC}&deg;C overnight</p>
                  <p className="mt-2 text-xs font-medium text-brand-forest bg-white px-2.5 py-1 rounded-full border border-brand-line/60">
                    {f.condition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Curated Iconic Landmarks & Sacred Sites */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Curated Encounters</span>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-brand-ink">Iconic Landmarks & Culture</h2>
              <p className="mt-1 text-sm text-brand-muted">Private access guidelines, optimal visiting hours, and spatial transit loops.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {(destination.attractions || []).map((attr: any) => (
              <div key={attr.id} className="group overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-sage">
                <div className="relative aspect-[16/10] bg-brand-ink overflow-hidden">
                  <img src={attr.imageUrl} alt={attr.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-amber-300">
                    <Star className="h-3 w-3 fill-amber-300" />
                    {attr.rating}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-2 py-0.5 rounded-full">
                    {attr.category}
                  </span>
                  <h3 className="mt-2 font-serif text-xl text-brand-ink">{attr.name}</h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-brand-muted font-light">{attr.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-brand-muted border-t border-brand-line pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-brand-forest" />
                      {attr.estimatedDurationMin} mins
                    </span>
                    <span>{attr.openingHours || 'Daily'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Michelin & Regional Culinary Gems */}
        <div className="mt-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Gastronomy</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-brand-ink">Culinary Craft & Fine Dining</h2>
            <p className="mt-1 text-sm text-brand-muted">Private dining rooms, multi-course kaiseki, and authentic regional heritage selections.</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(destination.restaurants || []).map((rest: any) => (
              <div key={rest.id} className="flex flex-col sm:flex-row gap-4 sm:gap-5 rounded-3xl border border-brand-line bg-white p-5 shadow-sm transition-all hover:border-brand-sage hover:shadow-md">
                <div className="relative h-44 sm:h-28 w-full sm:w-28 shrink-0 overflow-hidden rounded-2xl bg-brand-ink">
                  <img src={rest.imageUrl} alt={rest.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl text-brand-ink">{rest.name}</h3>
                      <span className="text-xs font-bold text-brand-forest bg-brand-forest/10 px-2 py-0.5 rounded-full">{rest.priceLevel}</span>
                    </div>
                    <p className="mt-1 text-xs text-brand-forest font-medium">{rest.cuisine}</p>
                    <p className="mt-1 text-xs text-brand-muted font-light line-clamp-1">{rest.address}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-brand-line/60 pt-2 mt-2">
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
