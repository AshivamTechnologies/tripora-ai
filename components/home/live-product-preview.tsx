'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Compass,
  DollarSign,
  MapPin,
  Plane,
  Sparkles,
  SunMedium,
  CheckCircle2,
  Users,
  ShieldCheck,
  ChevronRight,
  Luggage,
  Hotel,
} from 'lucide-react';
import Link from 'next/link';

type TabKey = 'itinerary' | 'budget' | 'flights' | 'packing';

interface TabItem {
  key: TabKey;
  label: string;
  badge: string;
  icon: any;
}

const TABS: TabItem[] = [
  { key: 'itinerary', label: 'Day-Wise Itinerary', badge: 'Bespoke Curated', icon: Calendar },
  { key: 'budget', label: 'Precision Split Engine', badge: 'Minor-Unit Accurate', icon: DollarSign },
  { key: 'flights', label: 'Live Flights & Stays', badge: 'Revalidated Fares', icon: Plane },
  { key: 'packing', label: 'Weather-Smart Packing', badge: 'Forecast Synced', icon: Luggage },
];

export function LiveProductPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>('itinerary');

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-brand-forest/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-forest mb-4">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
          Interactive Platform Experience
        </div>
        <h2 className="text-4xl sm:text-5xl text-brand-ink tracking-tight font-serif">
          Experience travel planning at the highest standard.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          Switch tabs below to test TRIPORA RESERVE’s handcrafted modules — from day-by-day sequencing and budget splits to automated baggage checklists.
        </p>

        {/* Tab Switcher Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white border border-brand-line shadow-sm max-w-2xl mx-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-brand-muted hover:text-brand-ink hover:bg-brand-mist'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 rounded-xl bg-brand-forest"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-brand-gold' : 'text-brand-muted'}`} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Display Canvas */}
      <div className="relative rounded-3xl border border-brand-line/80 bg-white shadow-2xl overflow-hidden">
        {/* Luxury Dossier Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-line bg-[#0D1510] text-white px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1C2C22] text-[#F5D794] border border-[#C5A46A]/40 text-xs font-serif font-bold">
              T
            </span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm tracking-wider text-white">TRIPORA RESERVE</span>
              <span className="text-[9px] font-mono tracking-widest text-[#F5D794] bg-[#F5D794]/15 px-2 py-0.5 rounded-full border border-[#C5A46A]/30 uppercase">
                Curated Dossier
              </span>
            </div>
            <span className="hidden sm:inline text-xs text-white/60 border-l border-white/10 pl-3 font-light">
              Kyoto &amp; Tokyo Imperial Journey &bull; 7-Day Itinerary
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#F5D794] bg-[#16241B] px-3.5 py-1 rounded-full border border-[#C5A46A]/40">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Verified Concierge Itinerary
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'itinerary' && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]"
              >
                {/* Left: Day 1 Schedule */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Day 1 Curated</span>
                      <h3 className="text-2xl sm:text-3xl text-brand-ink font-serif mt-0.5">Kyoto Arrival & Ancient Gion Lanterns</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-forest/10 px-3 py-1 text-xs font-semibold text-brand-forest">
                      <SunMedium className="h-3.5 w-3.5 text-brand-gold" />
                      19°C · Clear Sky
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Morning Activity */}
                    <div className="group relative flex gap-4 rounded-2xl border border-brand-line p-5 transition-all duration-300 hover:border-brand-sage hover:shadow-md bg-white">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-mist text-xs font-bold text-brand-forest">
                          AM
                        </span>
                        <div className="w-0.5 flex-1 bg-brand-line my-1" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-brand-forest">Morning · 09:30</span>
                          <span className="text-xs font-medium text-brand-muted">$25.00 · Entry</span>
                        </div>
                        <h4 className="text-lg font-semibold text-brand-ink mt-1">Fushimi Inari-taisha Shrine Walk</h4>
                        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                          Hike through thousands of vermilion torii gates winding up the sacred sacred Mount Inari forest path before crowds arrive.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-md bg-brand-mist px-2.5 py-1 text-brand-ink">Duration: 120 min</span>
                          <span className="rounded-md bg-brand-mist px-2.5 py-1 text-brand-ink">Transit: JR Nara Line</span>
                        </div>
                      </div>
                    </div>

                    {/* Afternoon Activity */}
                    <div className="group relative flex gap-4 rounded-2xl border border-brand-line p-5 transition-all duration-300 hover:border-brand-sage hover:shadow-md bg-white">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-mist text-xs font-bold text-brand-forest">
                          PM
                        </span>
                        <div className="w-0.5 flex-1 bg-brand-line my-1" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-brand-forest">Afternoon · 14:00</span>
                          <span className="text-xs font-medium text-brand-muted">$45.00 · Guided</span>
                        </div>
                        <h4 className="text-lg font-semibold text-brand-ink mt-1">Tea Ceremony at Camellia Flower Temple</h4>
                        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                          Intimate matcha preparation and wagashi sweets ritual conducted by an authorized Urasenke master.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-md bg-brand-mist px-2.5 py-1 text-brand-ink">Duration: 75 min</span>
                          <span className="rounded-md bg-brand-mist px-2.5 py-1 text-brand-ink">Culinary Experience</span>
                        </div>
                      </div>
                    </div>

                    {/* Evening Activity */}
                    <div className="group relative flex gap-4 rounded-2xl border border-brand-line p-5 transition-all duration-300 hover:border-brand-sage hover:shadow-md bg-white">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-mist text-xs font-bold text-brand-forest">
                          EVE
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-brand-forest">Evening · 19:30</span>
                          <span className="text-xs font-medium text-brand-muted">$80.00 · Multi-course</span>
                        </div>
                        <h4 className="text-lg font-semibold text-brand-ink mt-1">Kaiseki Dinner along Pontocho Alley</h4>
                        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
                          Seasonal 8-course banquet overlooking the Kamogawa River with views of historic wooden tea houses.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-md bg-brand-mist px-2.5 py-1 text-brand-ink">Reservation Confirmed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Smart Telemetry Card */}
                <div className="flex flex-col gap-5 rounded-2xl bg-brand-mist/80 p-6 border border-brand-line">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Route Telemetry</span>
                    <span className="text-xs font-mono bg-white px-2.5 py-1 rounded-md border border-brand-line">7 Days Total</span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-xl bg-white p-4 border border-brand-line shadow-sm">
                      <div className="text-xs text-brand-muted">Total Walking Distance</div>
                      <div className="text-2xl font-serif text-brand-ink mt-1">8.4 km</div>
                      <div className="text-xs text-brand-forest font-medium mt-1">Comfortable pace · 2 transit legs</div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-brand-line shadow-sm">
                      <div className="text-xs text-brand-muted">Day 1 Cost Allocation</div>
                      <div className="text-2xl font-serif text-brand-ink mt-1">$150.00</div>
                      <div className="w-full bg-brand-mist rounded-full h-2 mt-2 overflow-hidden">
                        <div className="bg-brand-forest h-full rounded-full w-[65%]" />
                      </div>
                      <div className="flex justify-between text-[11px] text-brand-muted mt-1.5">
                        <span>Under budget by $30.00</span>
                        <span>82% utilized</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-4 border border-brand-line shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand-ink">
                        <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                        Private Concierge Note
                      </div>
                      <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                        Fushimi Inari gets crowded after 10:30 AM. We scheduled your arrival at 09:30 AM so you capture the upper trails in silence.
                      </p>
                    </div>

                    <Link
                      href="/planner"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-forest py-3 text-sm font-semibold text-white transition-all hover:bg-[#254635]"
                    >
                      Curate Bespoke Journey
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'budget' && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-3"
              >
                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Total Trip Budget</span>
                  <div className="text-4xl font-serif text-brand-ink mt-2">$2,500.00</div>
                  <p className="text-xs text-brand-muted mt-1">Minor-unit precise calculation (USD 250,000 cents)</p>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-brand-muted">Spent So Far</span>
                      <span className="font-semibold text-brand-ink">$2,120.00</span>
                    </div>
                    <div className="w-full bg-brand-mist rounded-full h-2.5 overflow-hidden">
                      <div className="bg-brand-forest h-full rounded-full w-[84%]" />
                    </div>
                    <div className="flex justify-between text-xs text-brand-forest font-medium">
                      <span>Remaining Balance</span>
                      <span>$380.00</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Category Breakdown</span>
                  <div className="mt-4 space-y-3 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-line">
                      <span className="text-brand-muted">Flights (SFO ↔ DPS)</span>
                      <span className="font-semibold text-brand-ink">$1,240.00</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-line">
                      <span className="text-brand-muted">Luxury Private Villa</span>
                      <span className="font-semibold text-brand-ink">$880.00</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-brand-line">
                      <span className="text-brand-muted">Cultural Activities</span>
                      <span className="font-semibold text-brand-ink">$180.00</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-brand-muted">Dining & Tastings</span>
                      <span className="font-semibold text-brand-ink">$200.00</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Group Member Split</span>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-brand-mist">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-brand-forest text-white flex items-center justify-center text-xs font-bold">AV</div>
                        <div>
                          <div className="text-xs font-bold text-brand-ink">Alex Vance (Owner)</div>
                          <div className="text-[11px] text-brand-muted">50% share · Paid $2,120</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">+ $1,060 owed</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-brand-mist">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-brand-sage text-white flex items-center justify-center text-xs font-bold">SV</div>
                        <div>
                          <div className="text-xs font-bold text-brand-ink">Sarah Vance</div>
                          <div className="text-[11px] text-brand-muted">50% share · Paid $0</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full">Owes $1,060</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'flights' && (
              <motion.div
                key="flights"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Flight Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-brand-line bg-white hover:border-brand-sage hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 font-bold text-sm">
                      SQ
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-brand-ink">Singapore Airlines</span>
                        <span className="text-xs bg-brand-mist text-brand-muted px-2 py-0.5 rounded">SQ 31 / SQ 944</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-brand-muted mt-1">
                        <span>SFO 01:15</span>
                        <span className="font-mono text-brand-forest">── 1 stop (SIN 1h 45m) ──</span>
                        <span>DPS 11:35 (+1)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-brand-line">
                    <div className="text-right">
                      <div className="text-2xl font-serif text-brand-ink">$1,240.00</div>
                      <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-3 w-3" /> Price Verified
                      </div>
                    </div>
                    <Link
                      href="/flights"
                      className="rounded-xl bg-brand-forest px-4 py-2 text-xs font-semibold text-white hover:bg-[#254635]"
                    >
                      Book Handoff
                    </Link>
                  </div>
                </div>

                {/* Hotel Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-brand-line bg-white hover:border-brand-sage hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-900 font-bold text-sm">
                      <Hotel className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-brand-ink">Maya Ubud Resort & Spa</span>
                        <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">5-Star Luxury</span>
                      </div>
                      <div className="text-xs text-brand-muted mt-1">
                        Petanu River Valley, Ubud · Infinity Forest Pool, Balinese Spa & Breakfast Included
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-brand-line">
                    <div className="text-right">
                      <div className="text-2xl font-serif text-brand-ink">$220 / night</div>
                      <div className="text-[11px] text-brand-muted">Free cancellation</div>
                    </div>
                    <Link
                      href="/hotels"
                      className="rounded-xl bg-brand-forest px-4 py-2 text-xs font-semibold text-white hover:bg-[#254635]"
                    >
                      View Reserve
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'packing' && (
              <motion.div
                key="packing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 md:grid-cols-2"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Weather-Sensitive Essentials</span>
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-line bg-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-brand-ink">DEET 50 Mosquito Repellent</span>
                    </div>
                    <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">Tropical Climate</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-line bg-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-brand-ink">Lightweight Linen Shirts & Temple Sarong</span>
                    </div>
                    <span className="text-[11px] bg-brand-mist text-brand-muted px-2 py-0.5 rounded">Cultural Dress Code</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-line bg-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-brand-ink">Mineral Sunscreen SPF 50 (Reef Safe)</span>
                    </div>
                    <span className="text-[11px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded">UV Index 9+</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">Important Documents & Health</span>
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-line bg-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-brand-ink">Passports with 6+ Months Validity</span>
                    </div>
                    <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded">Mandatory</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-line bg-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-brand-ink">Universal Plug Adapter (Type C / F)</span>
                    </div>
                    <span className="text-[11px] bg-brand-mist text-brand-muted px-2 py-0.5 rounded">Electronics</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-line bg-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-brand-ink">Offline Maps & Transport QR Codes</span>
                    </div>
                    <span className="text-[11px] bg-brand-mist text-brand-muted px-2 py-0.5 rounded">Digital Pass</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
