'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Menu, Plane, X, Sparkles, User, ShieldCheck, ArrowRight, Compass, Crown, ChevronDown, LogOut, LayoutDashboard, Bookmark, PhoneCall, Globe } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { cn } from '@/lib/utils';

// Primary desktop links: strictly 1-2 words, whitespace-nowrap, no clutter
const PRIMARY_LINKS = [
  { href: '/destinations', label: 'Destinations' },
  { href: '/hotels', label: 'Stays' },
  { href: '/flights', label: 'Flights' },
  { href: '/planner', label: 'AI Studio' },
  { href: '/guides', label: 'Field Notes' },
  { href: '/pricing', label: 'Privileges' },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Rotate announcement ribbon
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSignOut() {
    setUserMenuOpen(false);
    setDrawerOpen(false);
    await signOut();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* 1. Ultra-Luxury Announcement Strip */}
      <div className="bg-brand-forest text-white py-1.5 px-4 text-center text-[11px] sm:text-xs font-medium border-b border-brand-forest/40 relative overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
          <Sparkles className="h-3 w-3 text-brand-gold shrink-0 animate-pulse" />
          <span className="font-light tracking-wide whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-500">
            {ANNOUNCEMENTS[activeAnnouncement]}
          </span>
          <Link
            href="/planner"
            className="underline underline-offset-2 font-semibold text-brand-gold hover:text-white transition-colors ml-1 whitespace-nowrap hidden sm:inline"
          >
            Launch Studio &rarr;
          </Link>
        </div>
      </div>

      {/* 2. Glassmorphic Luxury Navigation Bar */}
      <div className="border-b border-brand-line/80 bg-white/95 backdrop-blur-xl transition-all shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex h-16 xl:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-white transition-transform duration-300 group-hover:-rotate-12 shadow-sm shadow-brand-forest/20">
              <Plane className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-brand-ink">
              TRIPORA{' '}
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-forest bg-brand-forest/10 px-1.5 py-0.5 rounded-full border border-brand-forest/20">
                AI
              </span>
            </span>
          </Link>

          {/* Center: Primary Navigation Links (Spacious, Single Line, No Wrapping) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {PRIMARY_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] xl:text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-brand-forest/10 text-brand-forest font-semibold shadow-xs'
                      : 'text-brand-muted hover:bg-brand-mist hover:text-brand-ink',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Authenticated Menu or Guest CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Authenticated State */}
            {!loading && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/trips"
                  className={cn(
                    'hidden sm:inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                    pathname.startsWith('/trips')
                      ? 'bg-brand-forest/10 text-brand-forest'
                      : 'text-brand-muted hover:text-brand-ink hover:bg-brand-mist'
                  )}
                >
                  My Trips
                </Link>

                {/* Profile Pill with Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 rounded-full border border-brand-line bg-brand-mist/60 px-3 py-1.5 text-xs font-semibold text-brand-ink transition-all hover:border-brand-sage hover:bg-brand-mist"
                  >
                    <div className="h-5 w-5 rounded-full bg-brand-forest text-white flex items-center justify-center text-[10px] font-bold">
                      {(user.profile?.fullName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="max-w-[80px] sm:max-w-[110px] truncate hidden md:inline">
                      {user.profile?.fullName || user.email.split('@')[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-brand-muted" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-brand-line bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <div className="px-3 py-2 border-b border-brand-line/60">
                        <p className="text-xs font-bold text-brand-ink truncate">
                          {user.profile?.fullName || 'Traveler'}
                        </p>
                        <p className="text-[11px] text-brand-muted truncate font-light">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-brand-ink hover:bg-brand-mist transition-colors"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-brand-forest" />
                          <span>Traveler Cockpit</span>
                        </Link>
                        <Link
                          href="/trips"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-brand-ink hover:bg-brand-mist transition-colors"
                        >
                          <Bookmark className="h-3.5 w-3.5 text-brand-forest" />
                          <span>My Expeditions</span>
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-amber-800 hover:bg-amber-50 transition-colors"
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Admin Operations</span>
                        </Link>
                      </div>

                      <div className="border-t border-brand-line/60 pt-1">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Guest State */
              <div className="flex items-center gap-2">
                <Link
                  href="/auth"
                  className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold text-brand-muted hover:text-brand-ink transition-colors hidden sm:inline"
                >
                  Sign in
                </Link>
              </div>
            )}

            {/* Primary Action Button */}
            <Link
              href="/planner"
              className="whitespace-nowrap inline-flex items-center gap-1.5 rounded-full bg-brand-forest px-4 xl:px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-brand-forest/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#254635] hover:shadow-md shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-gold shrink-0" />
              <span>Plan Journey</span>
            </Link>

            {/* Editorial Drawer Toggle (Mobile & Desktop) */}
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-line text-brand-ink transition-colors hover:bg-brand-mist"
              aria-label={drawerOpen ? 'Close Menu' : 'Open Directory Menu'}
            >
              {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Luxury Slide-Over Directory Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 top-[calc(2.25rem+4rem)] sm:top-[calc(2.25rem+4.5rem)] z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="ml-auto w-full max-w-md h-full bg-white shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between border-l border-brand-line animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-6 border-b border-brand-line">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-forest">
                    The Tripora Directory
                  </span>
                  <h3 className="font-serif text-2xl text-brand-ink mt-0.5">Explore the Studio</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center bg-brand-mist text-brand-ink hover:bg-brand-line/60"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links Group */}
              <div className="mt-6 space-y-1">
                {[
                  { href: '/destinations', label: 'Curated Sanctuaries', sub: '120+ handpicked world destinations' },
                  { href: '/hotels', label: 'Luxury Stays & Villas', sub: 'Aman, Belmond & private pool retreats' },
                  { href: '/flights', label: 'Aviation & Lie-Flat Fares', sub: 'First & Business class multi-carrier GDS' },
                  { href: '/planner', label: 'AI Itinerary Studio', sub: 'Neural spatial optimization by Gemini 1.5 Pro' },
                  { href: '/guides', label: 'Field Notes & Dispatches', sub: 'In-depth cultural & rail loop articles' },
                  { href: '/pricing', label: 'Voyager & Reserve Privileges', sub: 'Bespoke annual memberships & perks' },
                  { href: '/trips', label: 'My Curated Expeditions', sub: 'Schedules, expense splits & packing matrices' },
                  { href: '/dashboard', label: 'Traveler Cockpit', sub: 'Upcoming departures & budget management' },
                  { href: '/about', label: 'Brand Manifesto', sub: 'Our spatial design philosophy' },
                  { href: '/contact', label: 'Concierge Desk & Hotline', sub: '24/7 aviation & itinerary producers' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="group block rounded-2xl p-3 transition-colors hover:bg-brand-mist"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg text-brand-ink group-hover:text-brand-forest transition-colors">
                        {item.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-muted transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="text-xs text-brand-muted font-light mt-0.5">{item.sub}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Drawer Actions & Hotline */}
            <div className="pt-6 border-t border-brand-line mt-6">
              <div className="rounded-2xl bg-brand-forest p-4 text-white flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">VIP Concierge Desk</p>
                  <p className="text-xs font-mono font-medium">+1 (800) 874-7672</p>
                </div>
                <Link
                  href="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-forest shadow-xs hover:bg-brand-mist"
                >
                  Hotline &rarr;
                </Link>
              </div>

              {!loading &&
                (user ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-3 w-full rounded-full border border-brand-line py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out ({user.email})
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setDrawerOpen(false)}
                    className="mt-3 block text-center rounded-full border border-brand-line py-2 text-xs font-semibold text-brand-ink hover:bg-brand-mist transition-colors"
                  >
                    Sign In / Create Account
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
