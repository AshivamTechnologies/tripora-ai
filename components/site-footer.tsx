'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plane, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Globe, Heart, Crown, Headphones, Compass } from 'lucide-react';

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
    <footer className="relative border-t border-brand-gold/30 bg-[#0E1511] text-white overflow-hidden text-xs">
      {/* Top Gold Shimmer Accent Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      {/* Luxury Newsletter Capsule Strip */}
      <div className="border-b border-white/10 py-12 sm:py-16 relative">
        <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 rounded-3xl bg-[#142018] p-8 sm:p-12 text-white border border-brand-gold/25 relative overflow-hidden shadow-2xl">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold mb-3">
                <Sparkles className="h-3 w-3" />
                The Private Dispatch
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                Curated seasonal itineraries, directly to your inbox.
              </h3>
              <p className="mt-2 text-sm text-white/75 font-light leading-relaxed">
                Join 45,000+ discerning travelers receiving off-market villa collections, seasonal flight revalidations, and bespoke cultural itineraries twice monthly.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-6 py-4 text-sm font-semibold text-white border border-brand-gold/40 backdrop-blur-md">
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
                    className="h-12 rounded-full px-5 bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm w-full sm:w-72"
                  />
                  <button
                    type="submit"
                    className="h-12 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 font-bold text-brand-ink text-xs uppercase tracking-wider shadow-md hover:bg-[#d6b77e] transition-all shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-white shadow-sm border border-brand-gold/40">
                <Plane className="h-4 w-4" />
              </span>
              <span className="font-serif text-2xl tracking-tight text-white">
                TRIPORA <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/15 px-2 py-0.5 rounded-full border border-brand-gold/30">RESERVE</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-white/70 max-w-sm leading-relaxed font-light">
              The premier bespoke luxury travel atelier and expedition management platform. Handcrafted day-by-day itineraries, exact minor-unit currency splits, weather-synced packing, and verified booking handoffs.
            </p>

            {/* Luxury Accreditation & Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#F5D794] bg-[#16241B] px-3.5 py-1.5 rounded-full border border-[#C5A46A]/40 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Virtuoso Member · Verified Luxury Travel Guild</span>
              </div>
              <span className="text-[11px] font-medium tracking-wider uppercase text-white/75 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                IATA & ATOL Accredited · PCI-DSS Level 1 Secure
              </span>
            </div>
          </div>

          {/* Column 1: Studio */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold mb-4">Studio</div>
            <ul className="space-y-3 text-sm text-white/70 font-light">
              <li><Link href="/planner" className="hover:text-white transition-colors">Trip Atelier</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition-colors">Curated Sanctuaries</Link></li>
              <li><Link href="/flights" className="hover:text-white transition-colors">Aviation & Lie-Flat Fares</Link></li>
              <li><Link href="/hotels" className="hover:text-white transition-colors">Luxury Stays & Villas</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Traveler Cockpit</Link></li>
              <li><Link href="/trips" className="hover:text-white transition-colors">My Curated Expeditions</Link></li>
            </ul>
          </div>

          {/* Column 2: Collections */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold mb-4">Collections</div>
            <ul className="space-y-3 text-sm text-white/70 font-light">
              <li><Link href="/destinations/dest-kyoto" className="hover:text-white transition-colors">Kyoto Imperial Trail</Link></li>
              <li><Link href="/destinations/dest-swiss-alps" className="hover:text-white transition-colors">Swiss Alpine Express</Link></li>
              <li><Link href="/destinations/dest-santorini" className="hover:text-white transition-colors">Santorini Caldera</Link></li>
              <li><Link href="/destinations/dest-bali" className="hover:text-white transition-colors">Bali Sacred Sanctuary</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Editorial Field Notes</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Privileges & Membership</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Compliance */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold mb-4">Enterprise Care</div>
            <ul className="space-y-3 text-sm text-white/70 font-light">
              <li><Link href="/about" className="hover:text-white transition-colors">The Brand Manifesto</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">24/7 Concierge Hotline</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy & GDPR</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li className="pt-2 text-[11px] text-white/50 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-gold" />
                <span>SOC2 Type II Certified</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} TRIPORA AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-brand-gold" />
              <span>Global Edition · USD ($)</span>
            </span>
            <span className="font-serif italic text-white/80 text-sm">
              Explore More. Plan Smarter. Travel Better.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
