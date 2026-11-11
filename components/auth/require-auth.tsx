'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';

export function RequireAuth({ nextPath, children }: { nextPath: string; children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8" aria-busy="true" aria-label="Checking your account">
        <div className="h-64 animate-pulse rounded-3xl border border-brand-line bg-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center px-5 py-20">
        <div className="max-w-md text-center rounded-3xl border border-brand-line bg-white/80 backdrop-blur-xl p-8 sm:p-12 shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-forest/10 text-brand-forest border border-brand-gold/30">
            <LockKeyhole className="h-6 w-6 text-brand-forest" aria-hidden="true" />
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Private Member Access
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-brand-ink">Enter The Private Studio</h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted font-light">
            Your itineraries, custom flight locks, and companion expenses are encrypted and private to your account. Sign in to curate your journey.
          </p>
          <Link
            href={`/auth?next=${encodeURIComponent(nextPath)}`}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-forest/20 transition-all duration-300 hover:bg-[#254635] hover:scale-105"
          >
            Sign In / Create Account &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
