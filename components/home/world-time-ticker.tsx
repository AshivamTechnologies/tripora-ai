'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

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

  useEffect(() => {
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
          updated[c.name] = '--:--:--';
        }
      });
      setTimes(updated);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate for seamless 360-degree marquee loop
  const marqueeItems = [...CITIES, ...CITIES];

  return (
    <div className="w-full border-y border-[#C5A46A]/30 bg-[#0A120D] text-white py-3 sm:py-3.5 overflow-hidden relative shadow-lg select-none">
      {/* Edge Gradient Fades for Editorial Marquee Vignette */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#0A120D] via-[#0A120D]/90 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#0A120D] via-[#0A120D]/90 to-transparent z-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-4 sm:gap-6">
        {/* Left Stationary Telemetry Badge */}
        <div className="relative z-30 flex items-center gap-2 rounded-full bg-[#142219] px-3 sm:px-3.5 py-1.5 border border-[#C5A46A]/50 text-[#F5D794] font-bold uppercase tracking-[0.18em] text-[10px] sm:text-[11px] shrink-0 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="whitespace-nowrap font-mono">Hubs Telemetry</span>
        </div>

        {/* Seamless Marquee Track - Zero Scrollbars, Infinitely Gliding */}
        <div className="flex-1 overflow-hidden relative no-scrollbar">
          <div className="animate-marquee flex items-center gap-4 sm:gap-7 py-0.5">
            {marqueeItems.map((c, index) => (
              <div
                key={`${c.name}-${index}`}
                className="group flex items-center gap-2.5 rounded-2xl bg-white/[0.05] px-3.5 py-1.5 border border-white/10 hover:border-[#C5A46A]/50 transition-all shrink-0 hover:bg-white/[0.1] shadow-2xs"
              >
                <span className="text-base sm:text-lg leading-none" role="img" aria-label={c.country}>
                  {c.flag}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white tracking-wide text-xs sm:text-[13px] whitespace-nowrap">
                    {c.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#F5D794]/70">
                    [{c.code}]
                  </span>
                </div>
                <span className="font-mono text-[11px] sm:text-xs text-[#FCE1A6] font-bold bg-[#142219] px-2.5 py-0.5 rounded-full border border-[#C5A46A]/50 tracking-wider shadow-inner whitespace-nowrap">
                  {times[c.name] || '12:00:00 PM'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
