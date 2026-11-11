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
  '✦ WINTER 2026 DISPATCH: BESPOKE AMAN & BELMOND CURATIONS ACTIVE · 24/7 CONCIERGE',
  '✦ LIVE FLIGHT RADAR & WEATHER-SYNCED PACKING · KYOTO & ZURICH DESKS ONLINE',
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

  const isHome = pathname === '/';

  // Rotate announcement ribbon
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 6000);
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
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 select-none bg-[#080E0A]/95 backdrop-blur-2xl border-b border-[#C5A46A]/25 shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-300"
      >
        {/* 1. Ultra-Refined Announcement & Telemetry Ribbon */}
        <div className="bg-[#050906] text-white py-1.5 px-3 sm:px-6 text-center text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase border-b border-[#C5A46A]/20">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 sm:gap-4">
            {/* Live Telemetry Pill */}
            <div className="hidden md:flex items-center gap-2 text-[#F5D794] shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-mono tracking-widest text-emerald-300">
                Kyoto &amp; Zurich Desks Online
              </span>
            </div>

            {/* Rotating Dispatch */}
            <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
              <Sparkles className="h-3 w-3 text-[#F5D794] shrink-0 animate-pulse" />
              <span className="font-light tracking-[0.12em] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-500">
                {ANNOUNCEMENTS[activeAnnouncement]}
              </span>
              <Link
                href="/planner"
                className="underline underline-offset-4 font-bold text-[#F5D794] hover:text-white transition-colors ml-1 whitespace-nowrap hidden sm:inline tracking-[0.1em]"
              >
                Launch Studio &rarr;
              </Link>
            </div>

            {/* Global Currency / Region */}
            <div className="hidden lg:flex items-center gap-2 text-white/70 text-[10px] tracking-wider shrink-0 font-mono">
              <Globe className="h-3 w-3 text-[#F5D794]" />
              <span>GLOBAL EDITION · USD ($)</span>
            </div>
          </div>
        </div>

        {/* 2. Haute Horlogerie / Editorial Navigation Bar */}
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
          {/* Brand Mark (Obsidian Crest + Serif Logo + Reserve Badge) */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 shrink-0"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1C2C22] to-[#0A120D] text-[#F5D794] border border-[#C5A46A]/50 shadow-md transition-transform duration-300 group-hover:-rotate-12">
              <Plane className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-lg sm:text-2xl tracking-[0.05em] text-white font-normal">
                TRIPORA
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em] text-[#F5D794] bg-[#F5D794]/15 px-1.5 sm:px-2 py-0.5 rounded-full border border-[#C5A46A]/40">
                RESERVE
              </span>
            </div>
          </Link>

          {/* Center: Primary Navigation Links (Desktop Only, High-Fashion Spacing, 100% Legible) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {PRIMARY_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'whitespace-nowrap text-[11px] xl:text-[12px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 relative py-1.5',
                    active
                      ? 'text-[#F5D794] font-bold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-4 after:bg-[#F5D794] after:rounded-full'
                      : 'text-white/80 hover:text-white hover:text-[#F5D794]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Authenticated Menu or Guest CTAs */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Authenticated State */}
            {!loading && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/trips"
                  className={cn(
                    'hidden md:inline-flex whitespace-nowrap text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors px-3 py-1.5 rounded-full',
                    pathname.startsWith('/trips')
                      ? 'bg-white/15 text-[#F5D794]'
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
                    className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-[#C5A46A]/60 hover:bg-white/15 shadow-2xs"
                  >
                    <div className="h-5 w-5 rounded-full bg-[#F5D794] text-brand-ink flex items-center justify-center text-[10px] font-bold">
                      {(user.profile?.fullName || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="max-w-[70px] sm:max-w-[100px] truncate hidden md:inline text-[11px]">
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
                        <p className="text-[11px] text-white/60 truncate font-light">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <LayoutDashboard className="h-3.5 w-3.5 text-[#F5D794]" />
                          <span>Traveler Cockpit</span>
                        </Link>
                        <Link
                          href="/trips"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Bookmark className="h-3.5 w-3.5 text-[#F5D794]" />
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
                  className="whitespace-nowrap text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-white/80 hover:text-[#F5D794] transition-colors px-2.5 sm:px-3 py-1.5 hidden sm:inline"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Primary Action Button (Gold Luxury Pill - Adaptive on Mobile) */}
            <Link
              href="/planner"
              className="whitespace-nowrap inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-[#F5D794] via-[#edd9a8] to-[#C5A46A] px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold text-brand-ink shadow-lg shadow-[#C5A46A]/25 transition-all duration-300 hover:scale-105 hover:shadow-[#C5A46A]/40 shrink-0"
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-brand-ink shrink-0 animate-pulse" />
              <span className="hidden xs:inline">Plan Journey</span>
              <span className="xs:hidden">Plan</span>
            </Link>

            {/* Luxury Editorial Drawer Toggle */}
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/20 hover:border-[#C5A46A]/40"
              aria-label={drawerOpen ? 'Close Menu' : 'Open Editorial Directory'}
            >
              <span className="hidden md:inline text-[11px] font-bold tracking-[0.16em] text-white">
                Index
              </span>
              {drawerOpen ? (
                <X className="h-4 w-4 text-[#F5D794]" />
              ) : (
                <div className="flex flex-col gap-1 w-3.5 sm:w-4">
                  <span className="h-0.5 w-full bg-white rounded-full" />
                  <span className="h-0.5 w-2.5 sm:w-3 bg-[#F5D794] rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for all pages so content starts smoothly below the fixed header */}
      <div className="h-24 sm:h-26 w-full" aria-hidden="true" />

      {/* 3. Obsidian Dark Ultra-Luxury Editorial Drawer (Aman & Pelorus Standard) */}
      {drawerOpen && (
        <div className="fixed inset-0 top-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-lg h-full bg-[#0A120D] text-white shadow-[-30px_0_80px_rgba(0,0,0,0.9)] p-6 sm:p-10 overflow-y-auto flex flex-col justify-between border-l border-[#C5A46A]/30 relative animate-in slide-in-from-right duration-400">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-[#C5A46A]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div>
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-white/15">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5D794]">
                    <Crown className="h-3 w-3" />
                    The Private Directory
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl text-white mt-1 tracking-tight">
                    Editorial Index
                  </h3>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all hover:scale-105"
                  aria-label="Close Drawer"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Navigation Items with Gold Numerals */}
              <div className="mt-6 sm:mt-8 space-y-1.5 sm:space-y-2">
                {DRAWER_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="group flex items-start gap-4 p-3 rounded-2xl transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
                  >
                    <span className="font-mono text-xs font-semibold text-[#F5D794] mt-1">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg sm:text-xl text-white group-hover:text-[#F5D794] transition-colors">
                          {item.title}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#F5D794]" />
                      </div>
                      <p className="text-xs text-white/70 font-light mt-0.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Section: 24/7 Concierge Hotline & VIP Status */}
            <div className="pt-6 sm:pt-8 border-t border-white/15 mt-6 sm:mt-8">
              <div className="rounded-2xl bg-white/10 p-4 sm:p-5 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Kyoto &amp; Zurich Desks Online</span>
                  </div>
                  <p className="font-serif text-base sm:text-lg text-white mt-0.5">24/7 Aviation &amp; Concierge Desk</p>
                  <p className="font-mono text-xs text-[#F5D794] mt-0.5 font-bold">+1 (800) 874-7672</p>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#F5D794] px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-brand-ink shadow-md hover:bg-white transition-all"
                >
                  <span>Connect Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* User Authentication Status */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/70">
                <p className="truncate mr-2">
                  {user ? (
                    <span>
                      Signed in: <strong className="text-white font-medium">{user.email}</strong>
                    </span>
                  ) : (
                    <span>Guest Traveler</span>
                  )}
                </p>

                {user ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-red-400 hover:text-red-300 transition-colors font-medium shrink-0"
                  >
                    Sign Out &rarr;
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setDrawerOpen(false)}
                    className="text-[#F5D794] hover:text-white transition-colors font-semibold shrink-0"
                  >
                    Sign In &rarr;
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
