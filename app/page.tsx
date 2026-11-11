import Link from 'next/link';
import { ArrowRight, Plane, Sparkles, Shield, Compass, CheckCircle2 } from 'lucide-react';
import { HeroSection } from '@/components/home/hero-section';
import { WorldTimeTicker } from '@/components/home/world-time-ticker';
import { LiveProductPreview } from '@/components/home/live-product-preview';
import { InteractiveRouteCanvas } from '@/components/home/interactive-route-canvas';
import { CuratedDestinations } from '@/components/home/curated-destinations';
import { AiComparisonSection } from '@/components/home/ai-comparison-section';
import { FaqSection } from '@/components/home/faq-section';

const STEPS = [
  {
    step: '01',
    title: 'Define Where, When & Who',
    description: 'Select one or more destinations, your origin airport, exact or flexible dates, and companions from solo to group travels.',
  },
  {
    step: '02',
    title: 'Set Your Pace & Exact Budget',
    description: 'Specify your budget in your preferred currency with zero rounding errors, choose travel styles, pace, and accessibility requests.',
  },
  {
    step: '03',
    title: 'Experience & Refine Day by Day',
    description: 'Receive an intelligent morning, afternoon, and evening plan. Edit, reorder, or regenerate individual days while your manual edits stay protected.',
  },
];

export default function Home() {
  return (
    <div className="bg-brand-mist/50">
      {/* 1. Cinematic Luxury Hero */}
      <HeroSection />

      {/* 2. Live World Hub Clocks Ticker */}
      <WorldTimeTicker />

      {/* 3. Interactive Live Product Preview */}
      <section className="py-20 sm:py-24 bg-white border-b border-brand-line/70">
        <LiveProductPreview />
      </section>

      {/* 4. Multi-Destination Grand Journeys Sequencer */}
      <InteractiveRouteCanvas />

      {/* 5. Curated Global Destinations Catalog */}
      <CuratedDestinations />

      {/* 6. Editorial How It Works Section */}
      <section id="how-it-works" className="bg-white border-y border-brand-line/80 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                Effortless Workflow
              </div>
              <h2 className="text-4xl sm:text-5xl text-brand-ink font-serif tracking-tight">
                From initial curiosity to a flawless, flexible itinerary.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-brand-muted leading-relaxed">
                TRIPORA AI replaces fragmented notes and open tabs with a unified planning studio that autosaves continuously.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/planner"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-forest/20 transition-all duration-300 hover:bg-[#254635] hover:shadow-lg"
                >
                  <Sparkles className="h-4 w-4 text-brand-gold" />
                  Launch Trip Studio
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-6 py-3.5 text-sm font-semibold text-brand-ink hover:border-brand-sage hover:bg-brand-mist transition-colors"
                >
                  Browse 120+ Guides
                </Link>
              </div>
            </div>

            {/* Stepper Cards */}
            <div className="space-y-4">
              {STEPS.map((s) => (
                <div
                  key={s.step}
                  className="group relative flex gap-5 rounded-3xl border border-brand-line bg-brand-mist/50 p-6 sm:p-8 transition-all duration-300 hover:border-brand-sage hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-forest font-serif text-lg font-bold text-white shadow-sm">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl text-brand-ink font-serif">{s.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-brand-muted leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. The TRIPORA Difference & Verified Testimonials */}
      <AiComparisonSection />

      {/* 8. Frequently Asked Questions */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-24 border-t border-brand-line/80">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
              <Compass className="h-3.5 w-3.5 text-brand-gold" />
              Clarity & Transparency
            </div>
            <h2 className="text-4xl sm:text-5xl text-brand-ink font-serif tracking-tight">
              Frequently asked questions.
            </h2>
            <p className="mt-4 text-base text-brand-muted leading-relaxed max-w-md">
              Everything you need to know about AI itinerary optimization, group expense calculation, and flight handoffs.
            </p>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* 9. Editorial Call to Action Banner */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="relative isolate overflow-hidden mx-auto max-w-7xl rounded-3xl bg-brand-forest px-8 py-16 text-white sm:px-14 sm:py-20 shadow-2xl">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-gold/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 -z-10 h-[250px] w-[250px] rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Zero Cost To Start
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight leading-tight">
                Your next unforgettable journey starts here.
              </h2>
              <p className="mt-4 text-base text-white/80 leading-relaxed">
                Build your complete itinerary in under a minute. No credit card required. Free forever for independent explorers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/planner"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-brand-forest shadow-xl transition-all duration-300 hover:bg-brand-mist hover:scale-105"
              >
                Plan Your Trip
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Editorial Luxury Footer */}
      <footer className="border-t border-brand-line bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-brand-line">
            {/* Brand Col */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-white shadow-sm">
                  <Plane className="h-4 w-4" />
                </span>
                <span className="font-serif text-2xl tracking-tight text-brand-ink">
                  TRIPORA <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-1.5 py-0.5 rounded-full">AI</span>
                </span>
              </div>
              <p className="mt-4 text-sm text-brand-muted max-w-sm leading-relaxed">
                The premier AI-powered travel planning and management platform. Handcrafted day-by-day itineraries, exact expense splits, and real-time travel intelligence.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational · AI Models Live
              </div>
            </div>

            {/* Col 1 */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-ink mb-4">Platform</div>
              <ul className="space-y-2.5 text-sm text-brand-muted">
                <li><Link href="/planner" className="hover:text-brand-forest transition-colors">AI Trip Planner</Link></li>
                <li><Link href="/destinations" className="hover:text-brand-forest transition-colors">Curated Catalog</Link></li>
                <li><Link href="/flights" className="hover:text-brand-forest transition-colors">Flight Discovery</Link></li>
                <li><Link href="/hotels" className="hover:text-brand-forest transition-colors">Stays & Resorts</Link></li>
                <li><Link href="/dashboard" className="hover:text-brand-forest transition-colors">Traveler Dashboard</Link></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-ink mb-4">Resources</div>
              <ul className="space-y-2.5 text-sm text-brand-muted">
                <li><Link href="/guides" className="hover:text-brand-forest transition-colors">Destination Guides</Link></li>
                <li><Link href="/pricing" className="hover:text-brand-forest transition-colors">Subscription Plans</Link></li>
                <li><Link href="/about" className="hover:text-brand-forest transition-colors">About Tripora</Link></li>
                <li><Link href="/contact" className="hover:text-brand-forest transition-colors">Contact Concierge</Link></li>
                <li><Link href="/admin" className="hover:text-brand-forest transition-colors">Admin Operations</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-ink mb-4">Legal & Security</div>
              <ul className="space-y-2.5 text-sm text-brand-muted">
                <li><Link href="/privacy" className="hover:text-brand-forest transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-brand-forest transition-colors">Terms of Service</Link></li>
                <li><span className="text-xs text-brand-muted/70">SOC2 Type II Compliant</span></li>
                <li><span className="text-xs text-brand-muted/70">GDPR Ready</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
            <p>© {new Date().getFullYear()} TRIPORA AI Technologies Inc. All rights reserved.</p>
            <p className="font-serif italic text-brand-ink">Explore More. Plan Smarter. Travel Better.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
