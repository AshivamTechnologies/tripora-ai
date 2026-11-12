'use client';

import Link from 'next/link';
import { Compass, Sparkles, Shield, HeartHandshake, ArrowRight, Award, Globe, Cpu, Users, Building2, CheckCircle2 } from 'lucide-react';

const STATS = [
  { value: '45,000+', label: 'Discerning Journeys Curated', sub: 'Across 6 continents' },
  { value: '$12.8M', label: 'Balanced Minor-Unit Expenses', sub: 'Zero penny drift' },
  { value: '184', label: 'World Sanctuaries Mapped', sub: 'Verified by regional fellows' },
  { value: '100%', label: 'Carbon-Neutral Journeys', sub: 'Gold Standard certified offsets' },
];

const PRINCIPLES = [
  {
    icon: Compass,
    title: 'Spatial Pacing & Breathing Room',
    description:
      'We reject the manic 15-stop checklist. Every TRIPORA AI journey incorporates generous buffers, realistic walking geometry, and quiet transitions between cultural landmarks and dining pauses.',
  },
  {
    icon: Shield,
    title: 'Mathematical Budget Truth',
    description:
      'Travel expenses are never rounded or guessed. We record costs down to the exact minor currency unit (cents, yen, pence) with transparent proportional or exact splits, leaving zero ambiguity.',
  },
  {
    icon: Cpu,
    title: 'Real-Time Flight & Climate Radar',
    description:
      'Our spatial planning engine doesn’t rely on static scraped blogs. It queries live GDS flight corridors, atmospheric micro-forecasts, and verified local opening hours to guarantee reliable days.',
  },
  {
    icon: HeartHandshake,
    title: 'Frictionless Co-Exploration',
    description:
      'From couple anniversary getaways to multi-generational family reunions, our real-time collaboration canvas allows everyone to contribute ideas while one curator maintains executive control.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-16 text-white sm:px-14 sm:py-24 shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              The Tripora AI Manifesto
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
              Where Spatial Intelligence Meets Uncompromising Luxury.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/85 font-light leading-relaxed">
              We set out to dismantle the chaos of 40 open browser tabs, disorganized group spreadsheets, and hallucinated travel itineraries.
            </p>
          </div>
        </div>

        {/* Live Statistics Telemetry Banner */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-3xl border border-brand-line bg-white p-6 sm:p-8 shadow-sm lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="p-2 sm:p-4 border-r last:border-0 border-brand-line/60">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">{s.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-ink">{s.label}</p>
              <p className="mt-0.5 text-xs text-brand-muted font-light">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Editorial Story Section */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-brand-muted font-light leading-relaxed text-sm sm:text-base">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Our Genesis</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-ink leading-tight">
              Crafted for those who consider travel an art form.
            </h2>
            <p>
              Before TRIPORA AI, discerning travelers faced a false dichotomy: either surrender their trip to cookie-cutter bus tours and mass-market OTAs, or spend 20+ hours piecing together scattered booking confirmations and fragmented blogs.
            </p>
            <p>
              We believed travel curation could do better. By marrying the editorial rigor of an Aman or Belmond concierge with advanced spatial intelligence, we created a private atelier that crafts bespoke day-by-day itineraries with unprecedented precision—without sacrificing intimacy or spatial logic.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="h-10 w-10 rounded-full bg-brand-forest flex items-center justify-center text-white font-serif font-bold">
                T
              </div>
              <div>
                <p className="text-xs font-bold text-brand-ink">The Founding Architecture Team</p>
                <p className="text-[11px] text-brand-muted">TRIPORA AI Technologies Inc. &bull; San Francisco & Tokyo</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-line shadow-xl aspect-[4/3] bg-brand-ink">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
              alt="Luxury Travel Sanctuary"
              className="h-full w-full object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Curated Sanctuary</p>
              <p className="font-serif text-2xl">Bespoke spatial design for every continent.</p>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">The Pillars</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-brand-ink">Engineered with Architectural Precision</h2>
            <p className="mt-2 text-sm text-brand-muted font-light">
              Every curation decision in TRIPORA RESERVE is designed to protect your peace of mind.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-3xl border border-brand-line bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-sage"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-brand-ink">{p.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-brand-muted font-light">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Capsule */}
        <div className="mt-20 rounded-3xl bg-brand-forest p-10 text-white sm:p-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-gold mb-3">
              <Sparkles className="h-3 w-3" />
              Complimentary Access
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">Experience the difference yourself.</h3>
            <p className="mt-2 text-sm text-white/80 font-light leading-relaxed">
              Create your next day-wise itinerary in under 60 seconds. Zero fee, zero credit card required.
            </p>
          </div>

          <Link
            href="/planner"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold text-brand-forest shadow-xl transition-all hover:bg-brand-mist hover:scale-105"
          >
            <span>Launch Travel Atelier</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
