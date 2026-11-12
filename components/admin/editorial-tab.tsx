'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Eye,
  Clock,
  User,
  CheckCircle2,
  Calendar,
  Star,
} from 'lucide-react';
import { EditorialArticle } from '@/lib/admin-store';

interface EditorialTabProps {
  articles: EditorialArticle[];
  onToggleSpotlight: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function EditorialTab({
  articles,
  onToggleSpotlight,
  onToggleStatus,
}: EditorialTabProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl text-white">Editorial & Field Notes Dispatches</h2>
          <p className="mt-1 text-xs text-white/60">
            Curate cultural travel stories, hero showcase collections, and seasonal spotlight narratives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/50">Published Stories:</span>
          <span className="rounded-full bg-[#C5A46A]/20 border border-[#C5A46A]/40 px-3 py-1 text-xs font-bold text-[#F5D794]">
            {articles.filter((a) => a.status === 'PUBLISHED').length} Active
          </span>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0D1510] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search article title or contributing author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-[#C5A46A] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'CULTURAL_DISPATCH', 'HERITAGE_RAIL', 'PRIVATE_RETREAT', 'GASTRONOMY'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#C5A46A] text-[#0A120D] font-bold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0D1510] transition-all hover:border-[#C5A46A]/50 hover:shadow-2xl"
          >
            <div className="relative h-48 w-full overflow-hidden bg-black/40">
              <img
                src={a.featuredImage}
                alt={a.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1510] via-transparent to-black/30" />

              <div className="absolute top-3 left-3">
                <span className="rounded-full bg-[#0A120D]/80 backdrop-blur-md border border-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#F5D794]">
                  {a.category.replace(/_/g, ' ')}
                </span>
              </div>

              {a.isSpotlightHero && (
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[#C5A46A] text-[#0A120D] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  <Star className="h-3 w-3 fill-[#0A120D]" />
                  <span>Hero Spotlight</span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#F5D794] transition-colors leading-snug">
                {a.title}
              </h3>

              <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3 text-white/40" /> {a.author}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-white/40" /> {a.readTimeMin} min read
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
                <button
                  onClick={() => onToggleStatus(a.id)}
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                    a.status === 'PUBLISHED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/10 text-white/60 border border-white/10'
                  }`}
                >
                  {a.status}
                </button>

                <button
                  onClick={() => onToggleSpotlight(a.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    a.isSpotlightHero
                      ? 'border-[#C5A46A] bg-[#C5A46A]/20 text-[#F5D794]'
                      : 'border-white/15 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <Star className={`h-3 w-3 ${a.isSpotlightHero ? 'fill-[#F5D794]' : ''}`} />
                  <span>{a.isSpotlightHero ? 'Featured in Hero' : 'Promote to Hero'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
