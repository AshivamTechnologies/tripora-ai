'use client';

import { Check, Sparkles, Shield, Crown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TIERS = [
  {
    name: 'Explorer Tier',
    price: '$0',
    period: 'Free Forever',
    tagline: 'Ideal for independent travelers seeking intelligent day-by-day organization.',
    badge: 'Popular',
    features: [
      'Full AI Itinerary Studio (Morning / PM / Evening)',
      'Minor-Unit Integer Expense Split Engine',
      '5-Day Weather-Synced Baggage Checklist',
      'Flight & Stay Discovery with Booking Handoff',
      'Autosave and Offline Client Storage',
    ],
    ctaText: 'Start Free Planning',
    ctaHref: '/planner',
    isPrimary: false,
  },
  {
    name: 'Voyager Pass',
    price: '$19',
    period: 'per month',
    tagline: 'For frequent global travelers and couples who demand real-time telemetry.',
    badge: 'Most Comprehensive',
    features: [
      'Everything in Explorer Tier',
      'Real-Time Flight Price Revalidation & Alerts',
      'Multi-User Realtime Trip Collaboration (Editor / Viewer)',
      'Uncapped Gemini 1.5 Pro AI Generation Quota',
      'Comprehensive CSV & PDF Export for Travel Records',
    ],
    ctaText: 'Explore Voyager Pass',
    ctaHref: '/pricing',
    isPrimary: true,
  },
  {
    name: 'Private Reserve',
    price: '$49',
    period: 'per month',
    tagline: 'Bespoke luxury concierge service, private villa sourcing, and VIP travel care.',
    badge: 'Ultra-Luxury VIP',
    features: [
      'Everything in Voyager Pass',
      '24/7 Dedicated AI Travel Concierge with Full Trip Memory',
      'Off-Market Luxury Ryokan & Private Villa Access',
      'VIP Airport Lounge Access & Fast-Track Assistance',
      'Dedicated Travel Operations & Priority Support',
    ],
    ctaText: 'Join Private Reserve',
    ctaHref: '/pricing',
    isPrimary: false,
  },
];

export function LuxuryVipTiers() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
          <Crown className="h-3.5 w-3.5 text-brand-gold" />
          Transparent Privileges
        </div>
        <h2 className="text-4xl sm:text-5xl text-brand-ink font-serif tracking-tight">
          Bespoke travel, accessible to everyone.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          Start for free with complete day-by-day itinerary planning, or upgrade to Voyager for live airfare revalidation and collaborative group splits.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col justify-between rounded-3xl p-8 sm:p-10 transition-all duration-300 ${
              tier.isPrimary
                ? 'border-2 border-brand-forest bg-white shadow-2xl scale-[1.02] z-10'
                : 'border border-brand-line bg-white/80 shadow-md hover:shadow-xl hover:border-brand-sage'
            }`}
          >
            {tier.badge && (
              <span
                className={`absolute -top-3.5 left-8 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  tier.isPrimary
                    ? 'bg-brand-forest text-white shadow-md'
                    : 'bg-brand-mist text-brand-forest border border-brand-line'
                }`}
              >
                {tier.badge}
              </span>
            )}

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">{tier.name}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-brand-ink">{tier.price}</span>
                <span className="text-xs text-brand-muted">{tier.period}</span>
              </div>
              <p className="mt-4 text-xs text-brand-muted leading-relaxed pb-6 border-b border-brand-line">
                {tier.tagline}
              </p>

              <ul className="mt-6 space-y-3.5 text-xs text-brand-ink">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-line">
              <Link
                href={tier.ctaHref}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  tier.isPrimary
                    ? 'bg-brand-forest text-white hover:bg-[#254635] shadow-lg shadow-brand-forest/25'
                    : 'border border-brand-line bg-brand-mist/60 text-brand-ink hover:bg-white hover:border-brand-sage'
                }`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
