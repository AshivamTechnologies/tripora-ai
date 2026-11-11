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
        <div className="max-w-md text-center">
          <LockKeyhole className="mx-auto h-10 w-10 text-brand-forest" aria-hidden="true" />
          <h1 className="mt-6 text-4xl text-brand-ink">Sign in to continue</h1>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            Your trips are private to your account. Sign in or create a free account to plan and view them.
          </p>
          <Link
            href={`/auth?next=${encodeURIComponent(nextPath)}`}
            className="mt-8 inline-flex rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
          >
            Sign in or create account
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
