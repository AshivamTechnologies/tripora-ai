'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plane, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Globe, Heart } from 'lucide-react';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  }

  return (
    <footer className="relative border-t border-brand-line/80 bg-white overflow-hidden text-xs">
      {/* Top Gold Shimmer Accent Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      {/* Luxury Newsletter Capsule Strip */}
      <div className="border-b border-brand-line bg-brand-mist/40 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-3xl bg-brand-forest p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-gold mb-3">
                <Sparkles className="h-3 w-3" />
                The Private Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                Curated seasonal itineraries, directly to your inbox.
              </h3>
              <p className="mt-2 text-sm text-white/80 font-light leading-relaxed">
                Join 45,000+ discerning travelers receiving off-market villa collections, seasonal flight revalidations, and bespoke cultural itineraries twice monthly.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-2xl bg-white/20 px-6 py-3.5 text-sm font-semibold text-white border border-white/30 backdrop-blur-md">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                  <span>Welcome to The Private Dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="h-12 rounded-full px-5 bg-white/15 text-white placeholder:text-white/60 border border-white/25 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm w-full sm:w-72"
                  />
                  <button
                    type="submit"
                    className="h-12 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-brand-forest text-sm shadow-md hover:bg-brand-mist transition-all shrink-0"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 pb-14 border-b border-brand-line">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-white shadow-sm shadow-brand-forest/20">
                <Plane className="h-4 w-4" />
              </span>
              <span className="font-serif text-2xl tracking-tight text-brand-ink">
                TRIPORA <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-1.5 py-0.5 rounded-full">AI</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-brand-muted max-w-sm leading-relaxed font-light">
              The premier AI-powered travel planning and management platform. Handcrafted day-by-day itineraries, exact minor-unit currency splits, weather-synced packing, and verified booking handoffs.
            </p>

            {/* Live Operational Status Badge */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational · 99.98% Uptime</span>
              </div>
              <span className="font-mono text-[11px] text-brand-muted bg-brand-mist px-2.5 py-1 rounded-full border border-brand-line">
                Gemini 1.5 Pro Latency: 420ms
              </span>
            </div>
          </div>

          {/* Column 1: Studio & Exploration */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-ink mb-4">Studio</div>
            <ul className="space-y-3 text-sm text-brand-muted font-normal">
              <li><Link href="/planner" className="hover:text-brand-forest transition-colors">AI Trip Planner</Link></li>
              <li><Link href="/destinations" className="hover:text-brand-forest transition-colors">Curated Catalog</Link></li>
              <li><Link href="/flights" className="hover:text-brand-forest transition-colors">Flight Discovery</Link></li>
              <li><Link href="/hotels" className="hover:text-brand-forest transition-colors">Luxury Stays & Villas</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-forest transition-colors">Traveler Dashboard</Link></li>
              <li><Link href="/trips" className="hover:text-brand-forest transition-colors">My Itineraries</Link></li>
            </ul>
          </div>

          {/* Column 2: Private Reserve & Guides */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-ink mb-4">Collections</div>
            <ul className="space-y-3 text-sm text-brand-muted font-normal">
              <li><Link href="/destinations/dest-kyoto" className="hover:text-brand-forest transition-colors">Kyoto Imperial Trail</Link></li>
              <li><Link href="/destinations/dest-swiss-alps" className="hover:text-brand-forest transition-colors">Swiss Alpine Express</Link></li>
              <li><Link href="/destinations/dest-santorini" className="hover:text-brand-forest transition-colors">Santorini Caldera</Link></li>
              <li><Link href="/destinations/dest-bali" className="hover:text-brand-forest transition-colors">Bali Sacred Sanctuary</Link></li>
              <li><Link href="/guides" className="hover:text-brand-forest transition-colors">Editorial Travel Guides</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-forest transition-colors">Privileges & Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Compliance */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-ink mb-4">Enterprise Care</div>
            <ul className="space-y-3 text-sm text-brand-muted font-normal">
              <li><Link href="/about" className="hover:text-brand-forest transition-colors">About Tripora AI</Link></li>
              <li><Link href="/contact" className="hover:text-brand-forest transition-colors">Concierge Desk</Link></li>
              <li><Link href="/admin" className="hover:text-brand-forest transition-colors">Admin Operations</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-forest transition-colors">Privacy & GDPR</Link></li>
              <li><Link href="/terms" className="hover:text-brand-forest transition-colors">Terms of Service</Link></li>
              <li className="pt-2 text-[11px] text-brand-muted/70 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-forest" />
                <span>SOC2 Type II Certified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} TRIPORA AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-brand-forest" />
              <span>Global Edition · USD ($)</span>
            </span>
            <span className="font-serif italic text-brand-ink text-sm">
              Explore More. Plan Smarter. Travel Better.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
