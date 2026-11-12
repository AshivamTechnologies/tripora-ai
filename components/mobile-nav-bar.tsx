'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Building2, Plane, Sparkles, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

// Core TRIPORA Business Flow Sequence
const FLOW_TABS = [
  {
    href: '/destinations',
    label: 'Sanctuaries',
    icon: Compass,
    step: '01',
  },
  {
    href: '/hotels',
    label: 'Stays',
    icon: Building2,
    step: '02',
  },
  {
    href: '/flights',
    label: 'Aviation',
    icon: Plane,
    step: '03',
  },
  {
    href: '/planner',
    label: 'Atelier',
    icon: Sparkles,
    step: '04',
    isPrimary: true,
  },
  {
    href: '/trips',
    label: 'My Trips',
    icon: Map,
    step: '05',
  },
];

export function MobileNavBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile Business Flow Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#080E0A]/95 backdrop-blur-2xl border-t border-[#C5A46A]/25 shadow-[0_-12px_32px_rgba(0,0,0,0.7)] pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] px-2 select-none"
    >
      <div className="mx-auto max-w-lg flex items-center justify-around">
        {FLOW_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href !== '/' && pathname.startsWith(`${tab.href}/`));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'group relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-200 rounded-xl',
                isActive ? 'text-[#F5D794]' : 'text-white/60 hover:text-white'
              )}
            >
              {/* Active Golden Glow Pill Indicator */}
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-1 w-6 bg-gradient-to-r from-transparent via-[#F5D794] to-transparent rounded-full shadow-[0_0_8px_#F5D794]" />
              )}

              {/* Icon Container */}
              <div
                className={cn(
                  'relative flex items-center justify-center rounded-full transition-all duration-200',
                  tab.isPrimary
                    ? isActive
                      ? 'h-9 w-9 bg-gradient-to-br from-[#F5D794] to-[#C5A46A] text-brand-ink shadow-md shadow-[#C5A46A]/30 scale-105'
                      : 'h-9 w-9 bg-white/10 text-[#F5D794] border border-[#C5A46A]/40'
                    : isActive
                    ? 'h-7 w-7 text-[#F5D794]'
                    : 'h-7 w-7 text-white/60 group-hover:text-white'
                )}
              >
                <Icon
                  className={cn(
                    tab.isPrimary ? 'h-4 w-4' : 'h-4 w-4',
                    tab.isPrimary && 'animate-pulse'
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[8.5px] xs:text-[9.5px] sm:text-[10px] tracking-normal xs:tracking-wider uppercase mt-1 transition-colors leading-none text-center truncate max-w-full',
                  isActive ? 'font-bold text-[#F5D794]' : 'font-medium text-white/60 group-hover:text-white/90'
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
