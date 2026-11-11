'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  Plane,
  X,
  Sparkles,
  User,
  ShieldCheck,
  ArrowRight,
  Compass,
  Crown,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Bookmark,
  PhoneCall,
  Globe,
  Headphones,
  Award,
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';
import { cn } from '@/lib/utils';

// Primary high-fashion desktop links: single-line, uppercase tracking, zero wrap
const PRIMARY_LINKS = [
  { href: '/destinations', label: 'Sanctuaries' },
  { href: '/hotels', label: 'Stays' },
  { href: '/flights', label: 'Aviation' },
  { href: '/planner', label: 'AI Studio' },
  { href: '/guides', label: 'Field Notes' },
  { href: '/pricing', label: 'Privileges' },
];

const DRAWER_ITEMS = [
  {
    num: '01',
    href: '/destinations',
    title: 'Curated Sanctuaries',
    desc: '120+ handpicked cultural & alpine havens across 6 continents',
    tag: 'Catalog',
  },
  {
    num: '02',
    href: '/hotels',
    title: 'Private Villas & Estates',
    desc: 'Aman, Belmond & Four Seasons partner properties with Virtuoso perks',
    tag: '5-Star Stays',
  },
  {
    num: '03',
    href: '/flights',
    title: 'Aviation & Lie-Flat Suites',
    desc: 'Emirates, Singapore Suites & Qatar Qsuite with live GDS fare locks',
    tag: 'Aviation',
  },
  {
    num: '04',
    href: '/planner',
    title: 'The AI Itinerary Studio',
    desc: 'Neural spatial optimization & paced day-by-day schedules by Gemini 1.5',
    tag: 'AI Studio',
  },
  {
    num: '05',
    href: '/guides',
    title: 'Editorial Field Notes',
    desc: 'Cultural etiquette, alpine rail loops, and multi-course kaiseki guides',
    tag: 'Dispatch',
  },
  {
    num: '06',
    href: '/pricing',
    title: 'Voyager & Reserve Privileges',
    desc: 'Bespoke annual memberships, off-market access & private concierge',
    tag: 'VIP Club',
  },
  {
    num: '07',
    href: '/trips',
    title: 'My Curated Expeditions',
    desc: 'Interactive day timelines, cent-level expense splits & packing matrices',
    tag: 'Traveler',
  },
];

const ANNOUNCEMENTS = [
  '✦ WINTER 2026 RELEASE: LIVE FLIGHT RADAR & WEATHER-SYNCED PACKING · COMPLIMENTARY VOYAGER ACCESS',
  '✦ AMAN & BELMOND PARTNER CURATIONS NOW ACTIVE IN TOKYO, KYOTO, AMALFI & ZERMATT',
  '✦ 45,000+ BESPOKE JOURNEYS SYNTHESIZED BY GEMINI 1.5 PRO NEURAL SPATIAL MATRIX',
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
    }, 5000);
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  async function handleSignOut() {
    setUserMenuOpen(false);
    setDrawerOpen(false);
    await signOut();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* 1. Ultra-Luxury Announcement Strip (Obsidian Dark with Gold Hairline) */}
      <div className="bg-[#070D09] text-white py-1 px-4 text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase border-b border-brand-gold/20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
          <Sparkles className="h-3 w-3 text-brand-gold shrink-0 animate-pulse" />
          <span className="font-light tracking-[0.14em] text-white/85 whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-500">
            {ANNOUNCEMENTS[activeAnnouncement]}
          </span>
          <Link
            href="/planner"
            className="underline underline-offset-4 font-bold text-brand-gold hover:text-white transition-colors ml-1 whitespace-nowrap hidden sm:inline tracking-[0.1em]"
          >
            Launch Studio &rarr;
          </Link>
        </div>
      </div>

      {/* 2. Obsidian Frosted Glass Navigation Bar (Aman & Pelorus Luxury Standard) */}
      <div className="border-b border-white/10 bg-[#0B130E]/90 backdrop-blur-2xl transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo (White Serif + Gold Badge) */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest text-brand-gold border border-brand-gold/40 transition-transform duration-300 group-hover:-rotate-12 shadow-sm shadow-brand-forest/40">
              <Plane className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-white">
              TRIPORA{' '}
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/15 px-1.5 py-0.5 rounded-full border border-brand-gold/40">
                AI
              </span>
            </span>
          </Link>

          {/* Center: Primary Navigation Links (High-Fashion Letter Spacing, Single Line, Crisp White) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {PRIMARY_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'whitespace-nowrap text-[11px] xl:text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-200 relative py-1.5',
                    active
                      ? 'text-brand-gold font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-4 after:bg-brand-gold after:rounded-full'
                      : 'text-white/75 hover:text-white hover:text-brand-gold',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Authenticated Menu or Guest CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Authenticated State */}
            {!loading && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/trips"
                  className={cn(
                    'hidden sm:inline-flex whitespace-nowrap text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors px-3 py-1.5 rounded-full',
                    pathname.startsWith('/trips')
                      ? 'bg-white/15 text-brand-gold'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  )}
                >
                  My Trips
                </Link>

                {/* Profile Pill with Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-brand-gold/60 hover:bg-white/15 shadow-2xs"
                  >
                    <div className="h-5 w-5 rounded-full bg-brand-gold text-brand-ink flex items-center justify-center text-[10px] font-bold">
                      {(user.profile?.fullName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="max-w-[80px] sm:max-w-[110px] truncate hidden md:inline">
                      {user.profile?.fullName || user.email.split('@')[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-white/60" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/15 bg-[#121c16] text-white p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="text-xs font-bold text-white truncate">
                          {user.profile?.fullName || 'Traveler'}
                        </p>
                        <p className="text-[11px] text-white/60 truncate font-light">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-brand-gold" />
                          <span>Traveler Cockpit</span>
                        </Link>
                        <Link
                          href="/trips"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Bookmark className="h-3.5 w-3.5 text-brand-gold" />
                          <span>My Expeditions</span>
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-amber-300 hover:bg-white/10 transition-colors"
                        >
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>Admin Portal</span>
                        </Link>
                      </div>

                      <div className="border-t border-white/10 pt-1">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-950/30 transition-colors text-left"
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
                  className="whitespace-nowrap text-[11px] font-semibold tracking-[0.16em] uppercase text-white/80 hover:text-brand-gold transition-colors px-3 py-1.5 hidden sm:inline"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Primary Action Button (Gold Luxury Pill) */}
            <Link
              href="/planner"
              className="whitespace-nowrap inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 sm:px-5 py-2.5 text-xs font-bold text-brand-ink shadow-lg shadow-brand-gold/20 transition-all duration-300 hover:bg-white hover:text-brand-forest hover:shadow-xl hover:-translate-y-0.5 shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-ink shrink-0 animate-pulse" />
              <span>Plan Journey</span>
            </Link>

            {/* Luxury Editorial Drawer Toggle */}
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 sm:px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/20 hover:border-brand-gold/40"
              aria-label={drawerOpen ? 'Close Menu' : 'Open Editorial Directory'}
            >
              <span className="hidden sm:inline text-[11px] font-bold tracking-[0.16em] text-white">Menu</span>
              {drawerOpen ? (
                <X className="h-4 w-4 text-brand-gold" />
              ) : (
                <div className="flex flex-col gap-1 w-4">
                  <span className="h-0.5 w-full bg-white rounded-full" />
                  <span className="h-0.5 w-3 bg-brand-gold rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Obsidian Dark Ultra-Luxury Editorial Drawer (Aman & Pelorus Standard) */}
      {drawerOpen && (
        <div className="fixed inset-0 top-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-xl h-full bg-[#0E1511] text-white shadow-[-30px_0_60px_rgba(0,0,0,0.8)] p-6 sm:p-10 lg:p-12 overflow-y-auto flex flex-col justify-between border-l border-brand-gold/30 relative animate-in slide-in-from-right duration-400">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-8 border-b border-white/15">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                    <Crown className="h-3 w-3" />
                    The Private Directory
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1 tracking-tight">
                    Editorial Index
                  </h3>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all hover:scale-105"
                  aria-label="Close Drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items with Gold Numerals */}
              <div className="mt-8 space-y-2">
                {DRAWER_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="group flex items-start gap-5 p-3.5 rounded-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
                  >
                    <span className="font-mono text-xs font-semibold text-brand-gold/80 mt-1">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xl sm:text-2xl text-white group-hover:text-brand-gold transition-colors">
                          {item.title}
                        </span>
                        <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-gold" />
                      </div>
                      <p className="text-xs text-white/70 font-light mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Section: 24/7 Concierge Hotline & VIP Status */}
            <div className="pt-8 border-t border-white/15 mt-8">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Kyoto & Zurich Desks Online</span>
                  </div>
                  <p className="font-serif text-lg text-white mt-0.5">24/7 Aviation & Concierge Desk</p>
                  <p className="font-mono text-xs text-brand-gold mt-0.5">+1 (800) 874-7672</p>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-xs font-bold text-brand-ink shadow-md hover:bg-white transition-all"
                >
                  <span>Connect Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* User Authentication Status */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/70">
                <p>
                  {user ? (
                    <span>Signed in as <strong className="text-white font-medium">{user.email}</strong></span>
                  ) : (
                    <span>Guest Traveler</span>
                  )}
                </p>

                {user ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-red-400 hover:text-red-300 transition-colors font-medium"
                  >
                    Sign Out &rarr;
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setDrawerOpen(false)}
                    className="text-brand-gold hover:text-white transition-colors font-semibold"
                  >
                    Sign In / Register &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
