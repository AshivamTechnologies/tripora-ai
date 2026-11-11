import Link from 'next/link';
import { Compass, Sparkles, Shield, HeartHandshake, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Our Story & Mission</p>
          <h1 className="mt-3 font-serif text-4xl text-brand-ink sm:text-5xl">Reimagining How the World Travels</h1>
          <p className="mt-4 text-base text-brand-muted leading-relaxed">
            TRIPORA AI was created with a clear, singular conviction: Travel planning should feel as inspiring and joyful as the journey itself.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          <div className="rounded-3xl border border-brand-line bg-white p-8 shadow-sm sm:p-12">
            <h2 className="font-serif text-3xl text-brand-ink">Editorial Quality Meets Advanced Intelligence</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
              Most travel tools overwhelm travelers with messy tabs, hallucinated schedules, and scattered booking notes. TRIPORA AI harmonizes rigorous spatial route optimization, transparent budget calculations, and real-time external data with the warmth of an editorial magazine.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
              Every morning, afternoon, and evening slot is structured to protect your personal travel rhythm—leaving room for serendipitous discoveries, relaxed meals, and scenic pauses.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest">
                <Compass className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-serif text-xl text-brand-ink">Thoughtful Pacing</h3>
              <p className="mt-2 text-xs text-brand-muted leading-relaxed">
                We believe great journeys aren&apos;t checklists of tourist traps. We pace every day with realistic transit times and open hours.
              </p>
            </div>

            <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest">
                <Shield className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-serif text-xl text-brand-ink">Transparent Budgets</h3>
              <p className="mt-2 text-xs text-brand-muted leading-relaxed">
                No hidden math. Every cost is recorded in exact currency units, giving you confidence from first inspiration to departure.
              </p>
            </div>

            <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest">
                <HeartHandshake className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-serif text-xl text-brand-ink">Seamless Together</h3>
              <p className="mt-2 text-xs text-brand-muted leading-relaxed">
                Invite friends and family with secure roles, collaborative packing lists, and shared expense balancing.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-brand-forest p-10 text-white sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl">Ready to craft your next journey?</h2>
              <p className="mt-2 text-sm text-white/80">Build your personalized itinerary in under 2 minutes.</p>
            </div>
            <Link
              href="/planner"
              className="shrink-0 rounded-full bg-white px-6 py-3.5 text-xs font-bold text-brand-forest shadow-md transition-all hover:bg-brand-mist"
            >
              Start AI Planning &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
