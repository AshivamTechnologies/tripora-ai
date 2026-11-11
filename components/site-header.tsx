'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, Plane, X, Sparkles, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/flights', label: 'Flights' },
  { href: '/hotels', label: 'Hotels' },
  { href: '/planner', label: 'AI Planner' },
  { href: '/trips', label: 'My Trips' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-white transition-transform duration-300 group-hover:-rotate-12 shadow-sm">
            <Plane className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl tracking-tight text-brand-ink">
            TRIPORA <span className="font-sans text-xs font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-1.5 py-0.5 rounded-full">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-mist text-brand-forest font-semibold'
                    : 'text-brand-muted hover:bg-brand-mist hover:text-brand-ink',
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/admin"
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
              pathname.startsWith('/admin')
                ? 'bg-amber-100 text-amber-900'
                : 'text-amber-800/80 hover:bg-amber-50 hover:text-amber-900'
            )}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Admin
          </Link>

          <Link
            href="/planner"
            className="ml-2 flex items-center gap-1.5 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            Plan Trip
          </Link>

          {!loading &&
            (user ? (
              <div className="ml-2 flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs font-medium text-brand-ink transition-colors hover:border-brand-sage"
                >
                  <User className="h-3.5 w-3.5 text-brand-forest" />
                  <span className="max-w-[100px] truncate">{user.profile?.fullName || user.email.split('@')[0]}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-full px-3 py-1 text-xs font-medium text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="ml-2 rounded-full border border-brand-line px-4 py-1.5 text-xs font-semibold text-brand-ink transition-colors hover:bg-brand-mist"
              >
                Sign in
              </Link>
            ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-brand-ink transition-colors hover:bg-brand-mist lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-border bg-white px-5 py-4 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-base font-medium text-brand-ink transition-colors hover:bg-brand-mist"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-base font-medium text-amber-800 hover:bg-amber-50"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/planner"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-brand-forest px-5 py-3 text-center text-base font-semibold text-white shadow-sm"
            >
              Start AI Planning
            </Link>
            {!loading &&
              (user ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-1 rounded-xl px-4 py-2.5 text-left text-base font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Sign out ({user.email})
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 rounded-xl px-4 py-2.5 text-base font-medium text-brand-ink transition-colors hover:bg-brand-mist"
                >
                  Sign in / Create account
                </Link>
              ))}
          </div>
        </nav>
      )}
    </header>
  );
}
