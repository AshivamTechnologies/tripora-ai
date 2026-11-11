'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Headphones, Award, Compass } from 'lucide-react';

const GUIDES = [
  {
    slug: 'kyoto-autumn-machiya',
    title: 'Kyoto in Autumn: Navigating Morning Crowds and Secluded Machiya Dining',
    destination: 'Kyoto, Japan',
    category: 'Cultural Etiquette',
    author: 'Kenji Takahashi',
    authorRole: 'Kyoto Cultural Correspondent',
    readTime: '8 min read',
    hasAudio: true,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    summary: 'A curated itinerary for sunrise meditation at Kiyomizu-dera, private bamboo grove access in Arashiyama, and multi-course kaiseki in secluded Gion laneways.',
  },
  {
    slug: 'swiss-alps-rail-pass',
    title: 'The Art of Alpine Transit: Panoramic Rails, Glaciers & Cogwheel Loops',
    destination: 'Zermatt & Jungfrau, Switzerland',
    category: 'Scenic Rail & Aviation',
    author: 'Victoria Sterling',
    authorRole: 'Senior Alpine Journalist',
    readTime: '10 min read',
    hasAudio: true,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
    summary: 'How to harmonize the Glacier Express, Matterhorn Gotthard Bahn, and high-altitude cable cars into a single seamless luggage-forwarded journey.',
  },
  {
    slug: 'ubud-cultural-etiquette',
    title: 'The Modern Traveler’s Guide to Ubud Temple Etiquette and Sacred Springs',
    destination: 'Bali, Indonesia',
    category: 'Cultural Etiquette',
    author: 'Wayan Arisutha',
    authorRole: 'Balinese Heritage Fellow',
    readTime: '6 min read',
    hasAudio: false,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    summary: 'Essential protocols for holy spring purification rituals at Tirta Empul, proper sarong ceremonial dressing, and mindful temple contributions.',
  },
  {
    slug: 'amalfi-clifftop-trails',
    title: 'Path of the Gods: Walking the Amalfi Ridge Above Positano',
    destination: 'Amalfi Coast, Italy',
    category: 'Alpine Trails',
    author: 'Elena Rossi',
    authorRole: 'Maritime Historian',
    readTime: '7 min read',
    hasAudio: true,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    summary: 'Navigating the Sentiero degli Dei from Bomerano to Nocelle with recommendations for cliffside lemon granita stops and private boat transfers back to Amalfi.',
  },
  {
    slug: 'santorini-off-season',
    title: 'Santorini Without the Crowds: The Winter Caldera Experience',
    destination: 'Santorini, Greece',
    category: 'Cultural Etiquette',
    author: 'Dimitris Vlahos',
    authorRole: 'Aegean Architectural Guide',
    readTime: '9 min read',
    hasAudio: false,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    summary: 'Experiencing the dramatic caldera silence, winter wine tastings in Pyrgos, and serene hikes along the Oia ridge when the cruise ships are gone.',
  },
  {
    slug: 'kaiseki-gastronomy-protocol',
    title: 'Decoding the 12 Courses of Winter Kaiseki in Kyoto & Tokyo',
    destination: 'Japan',
    category: 'Culinary Craft',
    author: 'Chef Naoko Endo',
    authorRole: 'Culinary Specialist',
    readTime: '11 min read',
    hasAudio: true,
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    summary: 'An intimate masterclass on seasonal vessel selection, dashi craftsmanship, sashimi etiquette, and pairing fine junmai daiginjo sakes.',
  },
];

const CATEGORIES = ['ALL', 'Cultural Etiquette', 'Scenic Rail & Aviation', 'Culinary Craft', 'Alpine Trails'];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = GUIDES.filter((g) => {
    if (selectedCategory === 'ALL') return true;
    return g.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-14 text-white sm:px-14 sm:py-18 shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-3">
              <Compass className="h-3.5 w-3.5" />
              The Tripora Dispatch & Field Notes
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
              Curated Travel Field Notes
            </h1>
            <p className="mt-3 text-base text-white/80 font-light leading-relaxed">
              In-depth cultural dispatches, scenic rail loop blueprints, and culinary traditions documented by regional fellows and correspondents.
            </p>
          </div>

          {/* Category Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-brand-forest font-semibold shadow-md'
                    : 'bg-white/10 text-white/85 hover:bg-white/20 border border-white/15'
                }`}
              >
                {cat === 'ALL' ? 'All Field Notes' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Editorial Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g) => (
            <article
              key={g.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-brand-sage"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-ink">
                <img
                  src={g.image}
                  alt={g.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                  <span>{g.category}</span>
                </div>
                {g.hasAudio && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-brand-forest/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-brand-gold">
                    <Headphones className="h-3 w-3" />
                    <span>Audio Available</span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span className="font-semibold text-brand-forest">{g.destination}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {g.readTime}
                    </span>
                  </div>

                  <h2 className="mt-3 font-serif text-2xl text-brand-ink group-hover:text-brand-forest transition-colors leading-snug">
                    {g.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-brand-muted font-light">
                    {g.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-brand-line/70 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-brand-ink">{g.author}</p>
                      <p className="text-[11px] text-brand-muted font-light">{g.authorRole}</p>
                    </div>

                    <Link
                      href={`/planner?destination=${encodeURIComponent(g.destination)}`}
                      className="flex items-center gap-1 text-xs font-semibold text-brand-forest hover:text-brand-ink transition-colors"
                    >
                      <span>Explore Route</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
