'use client';

import { Check, X, Sparkles, Star, Quote } from 'lucide-react';
import Link from 'next/link';

const COMPARISON_ROWS = [
  {
    feature: 'Itinerary Generation Speed',
    traditional: '12–16 hours across blogs & forums',
    tripora: 'Instant tailored synthesis by our private atelier',
  },
  {
    feature: 'Day-by-Day Slot Balancing',
    traditional: 'Guesswork transit times & rush-hour delays',
    tripora: 'Intelligent morning, afternoon & evening sequencing',
  },
  {
    feature: 'Group Budget & Cost Split',
    traditional: 'Drifting spreadsheet math & lost receipts',
    tripora: 'Minor-unit exact integer math with 1-click shares',
  },
  {
    feature: 'Weather & Climate Adaptation',
    traditional: 'Checked once, forgotten during packing',
    tripora: 'Live 5-day forecast-reactive baggage checklist',
  },
  {
    feature: 'Flight & Hotel Handoff',
    traditional: 'Expired fares and hidden baggage fees',
    tripora: 'Revalidated price checks before reservation handoff',
  },
  {
    feature: '24/7 Contextual Assistance',
    traditional: 'Endless forum searches for local queries',
    tripora: 'Dedicated 24/7 Private Concierge with full trip context',
  },
];

const TESTIMONIALS = [
  {
    quote: 'TRIPORA AI planned our 10-day honeymoon to Kyoto and Hakone down to every train connection and Kaiseki dinner. We saved hours and spent zero time arguing over spreadsheets.',
    author: 'Elena & Marcus Vance',
    location: 'San Francisco, CA',
    tripTag: '10-Day Kyoto & Hakone Luxury Retreat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    quote: 'The precision budget split feature alone made our 6-person Swiss Alps trip effortless. Every euro was tracked cleanly and everyone knew their exact share with zero confusion.',
    author: 'Julian Meyer',
    location: 'Munich, Germany',
    tripTag: '7-Day Swiss Alps Glacier Hiking Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    quote: 'As an architect, I am obsessed with detail. TRIPORA balanced historical walking pacing with rest periods better than any bespoke travel agency I have ever hired.',
    author: 'Aria Takahashi',
    location: 'London, UK',
    tripTag: '8-Day Bali Eco-Architecture Tour',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',
    rating: 5,
  },
];

export function AiComparisonSection() {
  return (
    <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14 py-20 sm:py-24">
      {/* Editorial Comparison Table */}
      <div className="rounded-3xl border border-brand-line/80 bg-white p-6 sm:p-12 shadow-xl mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            The TRIPORA Difference
          </div>
          <h2 className="text-3xl sm:text-4xl text-brand-ink font-serif tracking-tight">
            Designed for travelers who value time as much as experiences.
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-brand-line">
                <th className="pb-4 text-xs font-bold uppercase tracking-wider text-brand-muted w-1/3">Capability</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-wider text-red-800/80 w-1/3">The Old Manual Way</th>
                <th className="pb-4 text-xs font-bold uppercase tracking-wider text-brand-forest w-1/3">TRIPORA RESERVE Atelier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-line/60 text-sm">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="hover:bg-brand-mist/40 transition-colors">
                  <td className="py-4 font-semibold text-brand-ink pr-4">{row.feature}</td>
                  <td className="py-4 text-brand-muted pr-4">
                    <div className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="py-4 text-brand-ink font-medium">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                      <span className="text-brand-forest">{row.tripora}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Travelers Testimonials */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
            <Star className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
            Verified Traveler Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl text-brand-ink font-serif tracking-tight">
            Loved by independent travelers & travel groups worldwide.
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between rounded-3xl border border-brand-line bg-white p-7 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-brand-ink leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-brand-line flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-11 w-11 rounded-full object-cover border border-brand-line"
                />
                <div>
                  <div className="text-sm font-bold text-brand-ink">{t.author}</div>
                  <div className="text-xs text-brand-muted">{t.location}</div>
                  <div className="text-[10px] text-brand-forest font-semibold uppercase tracking-wider mt-0.5">
                    {t.tripTag}
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
