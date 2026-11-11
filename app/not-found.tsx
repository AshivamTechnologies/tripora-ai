'use client';

import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-brand-mist px-5 py-24">
      <div className="max-w-md text-center">
        <Compass className="mx-auto h-10 w-10 text-brand-forest" aria-hidden="true" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand-muted">Error 404</p>
        <h1 className="mt-3 font-serif text-4xl text-brand-ink">This page has wandered off</h1>
        <p className="mt-4 text-base leading-relaxed text-brand-muted">
          The page you are looking for does not exist or has moved. Let us get you back on the way.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-brand-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#274a39]"
          >
            Back to home
          </Link>
          <Link
            href="/trips"
            className="rounded-full border border-brand-forest px-5 py-2.5 text-sm font-semibold text-brand-forest transition-colors hover:bg-brand-forest hover:text-white"
          >
            My trips
          </Link>
        </div>
      </div>
    </div>
  );
}
