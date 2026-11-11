import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

const GUIDES = [
  {
    slug: 'ubud-cultural-etiquette',
    title: 'The Modern Traveler’s Guide to Ubud Temple Etiquette',
    destination: 'Bali, Indonesia',
    readTime: '6 min read',
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600',
    summary: 'Everything you need to know about sarong dressing, Holy Spring purification rituals, and temple contributions.',
  },
  {
    slug: 'kyoto-autumn-machiya',
    title: 'Kyoto in Autumn: Navigating Morning Crowds and Machiya Dining',
    destination: 'Kyoto, Japan',
    readTime: '8 min read',
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600',
    summary: 'A curated itinerary for sunrise visits to Kiyomizu-dera and evening kaiseki in secluded Gion laneways.',
  },
  {
    slug: 'swiss-alps-rail-pass',
    title: 'Maximizing the Swiss Travel Pass: Glaciers, Cogwheels & Boats',
    destination: 'Switzerland',
    readTime: '10 min read',
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600',
    summary: 'How to combine scenic panoramic trains with high-alpine cable cars for the most spectacular mountain loops.',
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Editorial Publications</p>
          <h1 className="mt-2 font-serif text-4xl text-brand-ink sm:text-5xl">Curated Travel Field Notes</h1>
          <p className="mt-2 text-base text-brand-muted">
            In-depth guides crafted by our global correspondents, covering local customs, rail navigation, and culinary craft.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {GUIDES.map((g) => (
            <article
              key={g.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-ink">
                <img
                  src={g.image}
                  alt={g.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-muted">
                    <span className="font-semibold text-brand-forest">{g.destination}</span>
                    <span>{g.readTime}</span>
                  </div>
                  <h2 className="mt-2 font-serif text-xl text-brand-ink group-hover:text-brand-forest transition-colors">
                    {g.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-brand-muted">{g.summary}</p>
                </div>

                <div className="mt-6 border-t border-brand-line pt-4 flex items-center justify-between text-xs font-semibold text-brand-forest">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
