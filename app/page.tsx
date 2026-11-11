import Link from 'next/link';
import { ArrowRight, Plane } from 'lucide-react';
import { DestinationSearch } from '@/components/home/destination-search';
import { FaqSection } from '@/components/home/faq-section';

const DESTINATIONS = [
  {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Terraced rice fields in Ubud, Bali',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Kiyomizu-dera temple surrounded by autumn foliage',
  },
  {
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Alpine village of Pontresina under a clear blue sky',
  },
  {
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Whitewashed houses overlooking the Aegean Sea in Santorini',
  },
];

const STEPS = [
  {
    title: 'Tell us where and when',
    description: 'Pick one or more destinations, your origin, travel dates and who is coming along.',
  },
  {
    title: 'Shape the trip to you',
    description: 'Choose travel styles, a budget in your currency, accommodation, pace and any accessibility needs.',
  },
  {
    title: 'Build and refine your days',
    description: 'Get a clean day-by-day plan split into morning, afternoon and evening, then edit it as your plans change.',
  },
];

const FEATURES = [
  {
    title: 'Day-by-day itineraries',
    description: 'Every day of your trip is laid out with morning, afternoon and evening slots you can fill and reorder.',
  },
  {
    title: 'Budgets that add up',
    description: 'Estimated costs are stored with exact currency precision, so totals never drift from rounding errors.',
  },
  {
    title: 'Trips at a glance',
    description: 'See which trips are upcoming, underway or completed, with dates and travellers always in view.',
  },
];

export default function Home() {
  return (
    <div className="bg-brand-mist">
      <section className="relative isolate overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2883832/pexels-photo-2883832.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Misty mountain lake reflecting the surrounding peaks at dawn"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-ink/70 via-brand-ink/40 to-brand-ink/80" />

        <div className="mx-auto flex min-h-[640px] max-w-7xl flex-col justify-center px-5 pb-20 pt-24 sm:px-8 md:min-h-[720px]">
          <p className="animate-in fade-in slide-in-from-bottom-2 mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white duration-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
            Explore More. Plan Smarter. Travel Better.
          </p>
          <h1 className="animate-in fade-in slide-in-from-bottom-3 max-w-3xl text-5xl text-white duration-700 sm:text-6xl lg:text-7xl">
            Your journey, thoughtfully planned.
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom-3 mt-6 max-w-xl text-lg leading-[1.5] text-white/85 duration-700 delay-100">
            Turn a rough idea into a day-by-day plan with budgets, preferences and room to change your mind.
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-3 mt-10 max-w-2xl duration-700 delay-200">
            <DestinationSearch />
          </div>
          <div className="animate-in fade-in mt-6 flex flex-wrap gap-3 text-sm text-white/80 duration-700 delay-300">
            <Link href="/planner" className="underline-offset-4 transition-colors hover:text-white hover:underline">
              Start a new trip
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/trips" className="underline-offset-4 transition-colors hover:text-white hover:underline">
              Open my trips
            </Link>
          </div>
        </div>
      </section>

      <section id="destinations" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest">Destinations</p>
            <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">Inspiring places to begin</h2>
          </div>
          <p className="max-w-sm text-base leading-[1.5] text-brand-muted">
            Start from one of these, or search for anywhere in the world.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((destination) => (
            <Link
              key={destination.name}
              href={`/planner?destination=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`}
              className="group relative flex aspect-[3/4] overflow-hidden rounded-3xl bg-brand-ink shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={destination.image}
                alt={destination.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/85 via-brand-ink/20 to-transparent" />
              <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-sm text-white/80">{destination.country}</p>
                  <h3 className="mt-1 text-3xl text-white">{destination.name}</h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-forest transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest">How it works</p>
            <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">From first idea to a finished itinerary</h2>
            <p className="mt-5 max-w-md text-base leading-[1.5] text-brand-muted">
              The planner keeps every step short and saves your trip as you go, so nothing is lost if you pause halfway.
            </p>
            <Link
              href="/planner"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#274a39] hover:shadow-md"
            >
              Plan a trip
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ol className="relative flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-3xl border border-brand-line bg-brand-mist p-6 transition-colors duration-300 hover:border-brand-sage"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-forest font-serif text-lg text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-base leading-[1.5] text-brand-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-brand-line bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mist text-brand-forest">
                <Plane className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl text-brand-ink">{feature.title}</h3>
              <p className="mt-3 text-base leading-[1.5] text-brand-muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-8 sm:pb-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest">Questions</p>
          <h2 className="mt-3 text-4xl text-brand-ink sm:text-5xl">Frequently asked</h2>
        </div>
        <FaqSection />
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-brand-forest px-8 py-12 text-white sm:px-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Your next trip starts with one destination.</h2>
            <p className="mt-3 max-w-lg text-base leading-[1.5] text-white/80">
              Build a complete plan in a few minutes, then keep editing it as your trip takes shape.
            </p>
          </div>
          <Link
            href="/planner"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-forest transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Start planning
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-brand-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-serif text-lg text-brand-ink">TRIPORA AI</p>
          <nav className="flex gap-6" aria-label="Footer">
            <Link href="/planner" className="transition-colors hover:text-brand-forest">Plan a trip</Link>
            <Link href="/trips" className="transition-colors hover:text-brand-forest">My trips</Link>
          </nav>
          <p>Explore More. Plan Smarter. Travel Better.</p>
        </div>
      </footer>
    </div>
  );
}
