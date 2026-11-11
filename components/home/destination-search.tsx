'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Search } from 'lucide-react';

export function DestinationSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const destination = query.trim();
    const params = destination ? `?destination=${encodeURIComponent(destination)}` : '';
    router.push(`/planner${params}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:rounded-full"
    >
      <label htmlFor="destination-search" className="sr-only">
        Where do you want to go?
      </label>
      <div className="flex flex-1 items-center gap-3 px-4">
        <Search className="h-5 w-5 shrink-0 text-brand-sage" aria-hidden="true" />
        <input
          id="destination-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Where do you want to go? e.g. Kyoto, Japan"
          className="h-12 w-full bg-transparent text-base text-brand-ink placeholder:text-brand-muted/70 focus:outline-none"
          maxLength={120}
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-forest px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#274a39] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
      >
        Plan my trip
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
