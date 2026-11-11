'use client';

import { useState, useEffect } from 'react';
import { Globe, Clock, Sparkles } from 'lucide-react';

interface CityClock {
  name: string;
  country: string;
  timeZone: string;
  flag: string;
  code: string;
}

const CITIES: CityClock[] = [
  { name: 'Tokyo', country: 'Japan', timeZone: 'Asia/Tokyo', flag: '🇯🇵', code: 'HND' },
  { name: 'Zurich', country: 'Switzerland', timeZone: 'Europe/Zurich', flag: '🇨🇭', code: 'ZRH' },
  { name: 'Kyoto', country: 'Japan', timeZone: 'Asia/Tokyo', flag: '🇯🇵', code: 'UKY' },
  { name: 'Santorini', country: 'Greece', timeZone: 'Europe/Athens', flag: '🇬🇷', code: 'JTR' },
  { name: 'Bali', country: 'Indonesia', timeZone: 'Asia/Makassar', flag: '🇮🇩', code: 'DPS' },
  { name: 'London', country: 'UK', timeZone: 'Europe/London', flag: '🇬🇧', code: 'LHR' },
  { name: 'New York', country: 'USA', timeZone: 'America/New_York', flag: '🇺🇸', code: 'JFK' },
];

export function WorldTimeTicker() {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function updateClocks() {
      const now = new Date();
      const updated: Record<string, string> = {};
      CITIES.forEach((c) => {
        try {
          updated[c.name] = now.toLocaleTimeString('en-US', {
            timeZone: c.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });
        } catch {
          updated[c.name] = '12:00:00 PM';
        }
      });
      setTimes(updated);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-y border-[#C5A46A]/30 bg-[#0A120D] text-white py-3 sm:py-4 overflow-hidden relative shadow-lg select-none">
      {/* Edge Gradient Fades for Editorial Marquee Look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#0A120D] via-[#0A120D]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0A120D] via-[#0A120D]/80 to-transparent z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left Live Telemetry Pill */}
        <div className="flex items-center gap-2 rounded-full bg-[#142219] px-3 sm:px-3.5 py-1.5 border border-[#C5A46A]/40 text-[#F5D794] font-bold uppercase tracking-[0.18em] text-[10px] sm:text-[11px] shrink-0 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="whitespace-nowrap font-mono">Hubs Telemetry</span>
        </div>

        {/* Clocks Container: Horizontally scrollable on mobile, spacious on desktop */}
        <div className="flex items-center gap-4 sm:gap-7 overflow-x-auto no-scrollbar py-1">
          {CITIES.map((c) => (
            <div
              key={c.name}
              className="group flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-3.5 py-1.5 border border-white/10 hover:border-[#C5A46A]/40 transition-all shrink-0 hover:bg-white/[0.08]"
            >
              <span className="text-base sm:text-lg leading-none" role="img" aria-label={c.country}>
                {c.flag}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="font-semibold text-white tracking-wide text-xs sm:text-[13px] whitespace-nowrap">
                  {c.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 hidden sm:inline">
                  [{c.code}]
                </span>
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-[#FCE1A6] font-bold bg-[#142219] px-2.5 py-0.5 rounded-full border border-[#C5A46A]/50 tracking-wider shadow-inner whitespace-nowrap">
                {mounted ? times[c.name] || '12:00:00 PM' : '12:00:00 PM'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
