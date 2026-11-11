'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, Plane, X, Sparkles, User, ShieldCheck, ArrowRight, Compass, Crown } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/flights', label: 'Flights' },
  { href: '/hotels', label: 'Hotels & Villas' },
  { href: '/planner', label: 'AI Planner' },
  { href: '/guides', label: 'Field Notes' },
  { href: '/pricing', label: 'Privileges' },
  { href: '/trips', label: 'My Trips' },
  { href: '/dashboard', label: 'Dashboard' },
];

const ANNOUNCEMENTS = [
  '✦ Winter 2026 AI Release: Live Flight Tracking & Real-Time Weather Sync',
  '✦ Aman & Belmond Partner Curations Now Live in Tokyo, Kyoto & Amalfi',
  '✦ 45,000+ Journeys Powered by Gemini 1.5 Pro Neural Routing',
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  async function handleSignOut() {
    setMenuOpen(false);
    await signOut();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50">
      {/* 1. Luxury Top Announcement Ribbon */}
      <div className="bg-brand-forest text-white py-1.5 px-4 text-center text-xs font-medium border-b border-brand-forest/40 relative overflow-hidden transition-all">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold shrink-0 animate-pulse" />
          <span className="font-light tracking-wide transition-opacity duration-500">
            {ANNOUNCEMENTS[activeAnnouncement]}
          </span>
          <Link
            href="/planner"
            className="underline underline-offset-2 font-semibold text-brand-gold hover:text-white transition-colors ml-1 hidden sm:inline"
          >
            Launch Studio &rarr;
          </Link>
        </div>
      </div>

      {/* 2. Glassmorphic Main Navigation */}
      <div className="border-b border-brand-line/80 bg-white/90 backdrop-blur-xl transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-white transition-transform duration-300 group-hover:-rotate-12 shadow-sm shadow-brand-forest/20">
              <Plane className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl tracking-tight text-brand-ink">
              TRIPORA <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-1.5 py-0.5 rounded-full border border-brand-forest/20">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-brand-forest/10 text-brand-forest font-semibold shadow-xs'
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
                'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ml-1',
                pathname.startsWith('/admin')
                  ? 'bg-amber-100 text-amber-900'
                  : 'text-amber-800/80 hover:bg-amber-50 hover:text-amber-900'
              )}
            >
              <ShieldCheck className="h-3 w-3" />
              Admin
            </Link>

            <Link
              href="/planner"
              className="ml-2 flex items-center gap-1.5 rounded-full bg-brand-forest px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-brand-forest/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#254635] hover:shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              Plan Journey
            </Link>

            {!loading &&
              (user ? (
                <div className="ml-2 flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist px-3 py-1 text-xs font-medium text-brand-ink transition-colors hover:border-brand-sage"
                  >
                    <User className="h-3.5 w-3.5 text-brand-forest" />
                    <span className="max-w-[90px] truncate">{user.profile?.fullName || user.email.split('@')[0]}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-full px-2.5 py-1 text-xs font-medium text-brand-muted transition-colors hover:bg-brand-mist hover:text-brand-ink"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="ml-2 rounded-full border border-brand-line px-3.5 py-1.5 text-xs font-semibold text-brand-ink transition-colors hover:bg-brand-mist hover:border-brand-sage"
                >
                  Sign in
                </Link>
              ))}
          </nav>

          {/* Mobile Menu Button */}
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
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-b border-border bg-white px-5 py-5 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl"
        >
          <div className="flex flex-col gap-1.5">
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
              Admin Operations
            </Link>
            <Link
              href="/planner"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-brand-forest px-5 py-3 text-center text-base font-semibold text-white shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-brand-gold" />
              Start AI Planning
            </Link>
            {!loading &&
              (user ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 rounded-xl px-4 py-2.5 text-left text-base font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Sign out ({user.email})
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 rounded-xl px-4 py-2.5 text-base font-medium text-brand-ink transition-colors hover:bg-brand-mist"
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
