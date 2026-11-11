'use client';

import Link from 'next/link';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const TIERS = [
  {
    name: 'Free Explorer',
    price: '$0',
    description: 'Perfect for casual travelers planning occasional getaways.',
    features: [
      'Up to 3 Active Trips',
      'AI-Powered 7-Day Itinerary Generation',
      'Basic Day-by-Day Activity Editing',
      'Packing Checklist Generator',
      'Flight & Hotel Discovery Engine',
      'Standard Community Support',
    ],
    cta: 'Start Planning Free',
    href: '/planner',
    popular: false,
  },
  {
    name: 'Explorer Pro',
    price: '$12',
    period: '/ month',
    description: 'Designed for avid wanderers and couple getaways.',
    features: [
      'Unlimited Active Trips',
      'High-Speed Gemini 1.5 Flash Itineraries',
      'Group Collaboration (Up to 5 co-travelers)',
      'Shared Expense Splitting & CSV Export',
      'Smart Schedule & Route Optimization',
      'Single-Day AI Regeneration',
      'Weather-Dependent Packing Intelligence',
    ],
    cta: 'Get Explorer Pro',
    href: '/auth',
    popular: true,
  },
  {
    name: 'Premium Nomads',
    price: '$29',
    period: '/ month',
    description: 'Ultimate power tools for group leaders, families, and long-term nomads.',
    features: [
      'Everything in Explorer Pro',
      'Unlimited Collaborators per Journey',
      'Priority Gemini AI Model Queue',
      'Direct Offline Itinerary Sync & PDF Export',
      'Price Alert Monitoring on Saved Flights',
      'Concierge Priority 24/7 Support',
      'Custom Multi-City Route Splitting',
    ],
    cta: 'Upgrade to Premium',
    href: '/auth',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Transparent Pricing</p>
          <h1 className="mt-3 font-serif text-4xl text-brand-ink sm:text-5xl">Invest in Better Journeys</h1>
          <p className="mt-3 text-base text-brand-muted">
            Choose the travel planning experience that fits your lifestyle. Start free, upgrade whenever your adventures demand it.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${
                tier.popular ? 'border-brand-forest ring-2 ring-brand-forest' : 'border-brand-line'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-brand-ink">{tier.name}</h3>
                  {tier.popular && (
                    <span className="rounded-full bg-brand-forest/10 px-3 py-1 text-xs font-bold text-brand-forest">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-brand-muted">{tier.description}</p>
                <div className="mt-6 flex items-baseline">
                  <span className="font-serif text-5xl text-brand-ink">{tier.price}</span>
                  {tier.period && <span className="ml-1 text-sm text-brand-muted">{tier.period}</span>}
                </div>

                <div className="mt-8 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-forest">Included Features:</p>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-brand-muted">
                      <Check className="h-4 w-4 text-brand-forest shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href={tier.href}
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold shadow-sm transition-all hover:-translate-y-0.5 ${
                    tier.popular
                      ? 'bg-brand-forest text-white hover:bg-[#274a39]'
                      : 'border border-brand-line bg-brand-mist text-brand-ink hover:bg-white'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
