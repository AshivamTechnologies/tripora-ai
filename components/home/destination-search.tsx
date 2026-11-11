'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, type FormEvent } from 'react';
import { ArrowRight, Search, Sparkles, MapPin, Calendar, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ROTATING_PROMPTS = [
  '7-day culinary & temple journey in Kyoto...',
  'Romantic Amalfi Coast cliffside escape...',
  'Family alpine adventure through the Swiss Alps...',
  'Eco-luxury wellness & rice terraces in Bali...',
  'Northern Lights & geothermal springs in Iceland...',
  'Cultural architecture & tapas tour in Barcelona...',
];

const QUICK_IDEAS = [
  { label: 'Kyoto, Japan', query: 'Kyoto, Japan', tag: 'Cultural' },
  { label: 'Swiss Alps', query: 'Swiss Alps, Switzerland', tag: 'Nature' },
  { label: 'Santorini, Greece', query: 'Santorini, Greece', tag: 'Romantic' },
  { label: 'Bali, Indonesia', query: 'Bali, Indonesia', tag: 'Wellness' },
];

export function DestinationSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Rotating placeholder interval
  useEffect(() => {
    if (isFocused || query.length > 0) return;
    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isFocused, query]);

  function handleSearch(destination: string) {
    const trimmed = destination.trim();
    const params = trimmed ? `?destination=${encodeURIComponent(trimmed)}` : '';
    router.push(`/planner${params}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearch(query || ROTATING_PROMPTS[promptIndex].replace(/\.\.\.$/, ''));
  }

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        role="search"
        className={`relative flex w-full flex-col gap-2 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-xl p-2.5 transition-all duration-300 shadow-2xl border ${
          isFocused ? 'ring-2 ring-brand-gold border-brand-gold/60 shadow-brand-forest/20' : 'border-white/40 shadow-black/25 hover:shadow-black/35'
        } sm:flex-row sm:items-center`}
      >
        <div className="flex flex-1 items-center gap-3 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-forest/10 text-brand-forest shrink-0">
            <Search className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="relative flex-1">
            <input
              id="destination-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="h-12 w-full bg-transparent text-base font-medium text-brand-ink placeholder:text-transparent focus:outline-none"
              maxLength={120}
              autoComplete="off"
            />
            {/* Animated Typewriter Placeholder */}
            {!query && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={promptIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="truncate text-base text-brand-muted/70 font-normal"
                  >
                    {ROTATING_PROMPTS[promptIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-forest px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#254635] hover:shadow-lg hover:shadow-brand-forest/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold shrink-0"
        >
          <Sparkles className="h-4 w-4 text-brand-gold transition-transform duration-300 group-hover:rotate-12" />
          <span>Curate Itinerary</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </form>

      {/* Luxury Quick Chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="flex items-center gap-1 font-medium uppercase tracking-wider text-white/70 mr-1">
          <Compass className="h-3.5 w-3.5 text-brand-gold" />
          Trending:
        </span>
        {QUICK_IDEAS.map((idea) => (
          <button
            key={idea.label}
            type="button"
            onClick={() => handleSearch(idea.query)}
            className="group flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-white/90 backdrop-blur-md transition-all duration-200 hover:bg-white/25 hover:border-brand-gold/60 hover:text-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold/80 group-hover:bg-brand-gold" />
            <span>{idea.label}</span>
            <span className="text-[10px] text-white/60 font-light">({idea.tag})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
