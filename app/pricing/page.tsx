'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight, ShieldCheck, Crown, Star, PhoneCall, HelpCircle } from 'lucide-react';

const TIERS = [
  {
    name: 'Explorer Tier',
    priceMonthly: '$0',
    priceAnnual: '$0',
    period: 'forever',
    badge: 'Open Access',
    description: 'Perfect for independent explorers planning occasional bespoke journeys.',
    features: [
      'Up to 3 Active Journeys',
      'Gemini 1.5 Pro Neural Itinerary Generation',
      'Day-by-Day Spatial Activity Editing',
      'Weather-Synced Smart Packing Matrix',
      'Multi-Carrier Flight & Hotel Search Engine',
      'Standard Community Dispatch Support',
    ],
    cta: 'Start Planning Free',
    href: '/planner',
    popular: false,
  },
  {
    name: 'Voyager Club',
    priceMonthly: '$19',
    priceAnnual: '$15',
    period: '/ month',
    badge: 'Most Popular',
    description: 'Designed for couples, frequent jetsetters, and luxury wanderers.',
    features: [
      'Unlimited Active Journeys & Archives',
      'Priority Gemini 1.5 Pro Neural Queue',
      'Collaborative Planning (Up to 8 Co-Travelers)',
      'Precision Currency Expense Split Engine',
      'Interactive Route Sequences & Transit Buffers',
      'Live Flight Revalidation & Fare Monitoring',
      'Single-Day AI Regeneration & Pacing Toggles',
      'Offline Itinerary PDF & Calendar Sync',
    ],
    cta: 'Join Voyager Club',
    href: '/auth',
    popular: true,
  },
  {
    name: 'Private Reserve & Concierge',
    priceMonthly: '$49',
    priceAnnual: '$39',
    period: '/ month',
    badge: 'Ultra-Luxury',
    description: 'Bespoke high-touch travel tools with 24/7 aviation & itinerary concierge.',
    features: [
      'Everything in Voyager Club',
      'Unlimited Travel Collaborators',
      'Direct WhatsApp VIP Concierge Hotline (< 1h response)',
      'Aman, Belmond & Four Seasons Partner Perks',
      'Off-Market Private Villa Catalog Access',
      'Private Aviation & Charter Handoff Desk',
      'Automatic Flight Disruption Rebooking Assistant',
      'Dedicated Travel Producer Consultation',
    ],
    cta: 'Apply for Private Reserve',
    href: '/auth',
    popular: false,
  },
];

const COMPARISON_FEATURES = [
  { name: 'Active Itineraries', free: '3', voyager: 'Unlimited', reserve: 'Unlimited' },
  { name: 'AI Generation Engine', free: 'Standard', voyager: 'Priority Gemini 1.5', reserve: 'Dedicated Pro Pipeline' },
  { name: 'Group Expense Balancing', free: 'Basic', voyager: 'Multi-Currency Cent-Level', reserve: 'Corporate & Multi-Currency' },
  { name: 'Weather-Synced Packing', free: 'Included', voyager: 'Included', reserve: 'Real-Time Sync + Wardrobe Notes' },
  { name: 'Aman & Belmond VIP Perks', free: '—', voyager: '—', reserve: 'Full Virtuoso / FHR Equivalent' },
  { name: '24/7 Concierge Hotline', free: '—', voyager: 'Email Priority', reserve: 'WhatsApp & Aviation Dispatch' },
  { name: 'Offline PDF & Calendar Sync', free: '—', voyager: 'Included', reserve: 'Included' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Luxury Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-brand-forest/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-forest mb-4">
            <Crown className="h-3.5 w-3.5 text-brand-gold" />
            Bespoke Privileges & Membership
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-ink tracking-tight">
            Invest in Extraordinary Journeys.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-muted font-light leading-relaxed">
            Transparent pricing designed for modern travelers who value time, spatial harmony, and effortless group coordination.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white p-1.5 border border-brand-line shadow-xs">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                !annual ? 'bg-brand-forest text-white shadow-xs' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                annual ? 'bg-brand-forest text-white shadow-xs' : 'text-brand-muted hover:text-brand-ink'
              }`}
            >
              <span>Billed Annually</span>
              <span className="rounded-full bg-brand-gold text-brand-ink px-2 py-0.5 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Membership Cards Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl border bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl relative ${
                tier.popular ? 'border-brand-forest ring-2 ring-brand-forest/80 shadow-xl' : 'border-brand-line'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-forest px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-brand-gold" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-brand-ink">{tier.name}</h3>
                  {!tier.popular && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted bg-brand-mist px-2.5 py-1 rounded-full border border-brand-line">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-brand-muted font-light">{tier.description}</p>

                <div className="mt-6 flex items-baseline border-b border-brand-line/70 pb-6">
                  <span className="font-serif text-5xl font-bold text-brand-ink tracking-tight">
                    {annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="ml-2 text-sm text-brand-muted">{tier.period}</span>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-forest">
                    Included Privileges:
                  </p>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-brand-muted">
                      <Check className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                      <span className="font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-line/60">
                <Link
                  href={tier.href}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold transition-all ${
                    tier.popular
                      ? 'bg-brand-forest text-white shadow-md hover:bg-[#254635] hover:shadow-lg'
                      : 'bg-brand-mist text-brand-ink hover:bg-brand-line/60 border border-brand-line'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Feature Comparison Matrix */}
        <div className="mt-20 rounded-3xl border border-brand-line bg-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl text-brand-ink">Comprehensive Privileges Matrix</h2>
            <p className="mt-2 text-sm text-brand-muted font-light">
              Examine every capability across our tiered memberships with full clarity.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-line text-brand-ink font-semibold">
                  <th className="py-4 font-serif text-sm">Capability</th>
                  <th className="py-4 px-4 text-center">Explorer ($0)</th>
                  <th className="py-4 px-4 text-center text-brand-forest font-bold">Voyager ($19)</th>
                  <th className="py-4 px-4 text-center text-amber-900 font-bold">Private Reserve ($49)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-line/60 text-brand-muted">
                {COMPARISON_FEATURES.map((row) => (
                  <tr key={row.name} className="hover:bg-brand-mist/30 transition-colors">
                    <td className="py-3.5 font-medium text-brand-ink">{row.name}</td>
                    <td className="py-3.5 px-4 text-center">{row.free}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-brand-forest">{row.voyager}</td>
                    <td className="py-3.5 px-4 text-center font-semibold text-amber-900">{row.reserve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* VIP Concierge Consultation Box */}
        <div className="mt-12 rounded-3xl bg-brand-forest p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-gold mb-3">
              <PhoneCall className="h-3 w-3" />
              Private Aviation & Villa Desk
            </span>
            <h3 className="font-serif text-3xl text-white">Need a custom corporate or private charter tier?</h3>
            <p className="mt-2 text-sm text-white/80 font-light leading-relaxed">
              Our bespoke aviation desk structures multi-family safaris, off-market villa buyouts, and executive retreats with dedicated producers.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-brand-forest shadow-md hover:bg-brand-mist transition-all"
          >
            <span>Consult Concierge</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
