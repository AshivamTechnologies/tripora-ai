'use client';

import { useState, useEffect } from 'react';
import { Clock, Globe, Sparkles } from 'lucide-react';

interface CityClock {
  name: string;
  country: string;
  timeZone: string;
  flag: string;
}

const CITIES: CityClock[] = [
  { name: 'Tokyo', country: 'Japan', timeZone: 'Asia/Tokyo', flag: '🇯🇵' },
  { name: 'Zurich', country: 'Switzerland', timeZone: 'Europe/Zurich', flag: '🇨🇭' },
  { name: 'Santorini', country: 'Greece', timeZone: 'Europe/Athens', flag: '🇬🇷' },
  { name: 'Bali', country: 'Indonesia', timeZone: 'Asia/Makassar', flag: '🇮🇩' },
  { name: 'London', country: 'UK', timeZone: 'Europe/London', flag: '🇬🇧' },
  { name: 'New York', country: 'USA', timeZone: 'America/New_York', flag: '🇺🇸' },
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

  return (
    <div className="w-full border-y border-brand-gold/25 bg-[#090F0C] text-white py-3 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 text-xs">
        {/* Left Live Telemetry Pill */}
        <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-[0.16em] text-[10px] sm:text-[11px] shrink-0">
          <Globe className="h-3.5 w-3.5 text-brand-gold animate-spin-slow" />
          <span>Global Hubs Live</span>
        </div>

        {/* Scrolling or Spaced Clocks */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-0.5 text-white/80">
          {CITIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 shrink-0">
              <span className="text-white/60">{c.flag}</span>
              <span className="font-semibold text-white tracking-wide text-xs">{c.name}</span>
              <span className="font-mono text-[11px] text-brand-gold font-medium bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                {times[c.name] || '12:00:00 PM'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
