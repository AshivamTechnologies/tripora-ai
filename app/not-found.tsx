'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-brand-mist/40 px-5 py-24">
      <div className="max-w-lg text-center rounded-3xl border border-brand-line bg-white/80 backdrop-blur-xl p-8 sm:p-14 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest border border-brand-gold/30">
          <Compass className="h-7 w-7 text-brand-forest animate-spin-slow" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">Expedition Error 404</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-brand-ink tracking-tight">This Sanctuary is Uncharted</h1>
        <p className="mt-4 text-sm leading-relaxed text-brand-muted font-light">
          The coordinates or dossier you requested have wandered beyond our active map. Allow our private concierge to guide you back to curated ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-brand-forest px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-[#254635] hover:scale-105"
          >
            Return to Sanctuary Home
          </Link>
          <Link
            href="/destinations"
            className="rounded-full border border-brand-forest/30 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-forest transition-all hover:bg-brand-forest/10"
          >
            Explore Sanctuaries
          </Link>
        </div>
      </div>
    </div>
  );
}
