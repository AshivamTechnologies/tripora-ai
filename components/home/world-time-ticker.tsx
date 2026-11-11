'use client';

import { useState, useEffect } from 'react';
import { Clock, Globe, Sparkles } from 'lucide-react';

interface CityClock {
  name: string;
  country: string;
  timeZone: string;
}

const CITIES: CityClock[] = [
  { name: 'Tokyo', country: 'Japan', timeZone: 'Asia/Tokyo' },
  { name: 'Zurich', country: 'Switzerland', timeZone: 'Europe/Zurich' },
  { name: 'Santorini', country: 'Greece', timeZone: 'Europe/Athens' },
  { name: 'Bali', country: 'Indonesia', timeZone: 'Asia/Makassar' },
  { name: 'London', country: 'UK', timeZone: 'Europe/London' },
  { name: 'New York', country: 'USA', timeZone: 'America/New_York' },
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
            hour12: true,
          });
        } catch {
          updated[c.name] = '--:--';
        }
      });
      setTimes(updated);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-y border-brand-line/60 bg-white/80 backdrop-blur-md py-3 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6 text-xs">
        <div className="flex items-center gap-2 text-brand-forest font-semibold uppercase tracking-wider shrink-0">
          <Globe className="h-3.5 w-3.5 text-brand-gold animate-spin-slow" />
          <span>Global Hubs Live</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 text-brand-muted">
          {CITIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 shrink-0">
              <span className="font-semibold text-brand-ink">{c.name}</span>
              <span className="font-mono text-xs text-brand-forest font-medium bg-brand-mist px-2 py-0.5 rounded border border-brand-line">
                {times[c.name] || '12:00 PM'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
