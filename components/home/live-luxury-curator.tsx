'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle2,
  Coffee,
  Sun,
  Moon,
  Clock,
  MapPin,
  DollarSign,
  Hotel,
} from 'lucide-react';
import Link from 'next/link';

interface VibeOption {
  id: string;
  name: string;
  destination: string;
  headline: string;
  image: string;
  morningSlot: { title: string; time: string; cost: string; desc: string };
  afternoonSlot: { title: string; time: string; cost: string; desc: string };
  eveningSlot: { title: string; time: string; cost: string; desc: string };
  stayTitle: string;
  stayPrice: string;
  budgetPerDay: string;
}

const VIBES: VibeOption[] = [
  {
    id: 'zen',
    name: 'Zen & Thermal Wellness',
    destination: 'Kyoto, Japan',
    headline: 'Private moss gardens, authorized matcha ceremonies & natural mineral onsen.',
    image: 'https://images.pexels.com/photos/33229939/pexels-photo-33229939.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    morningSlot: {
      title: 'Dawn Zazen Meditation at Tenryu-ji',
      time: '07:30 - 09:30',
      cost: '$35.00',
      desc: 'Exclusive monk-guided sitting meditation overlooking the 700-year-old Sogenchi pond garden before public opening.',
    },
    afternoonSlot: {
      title: 'Private Urasenke Matcha Whisking',
      time: '14:00 - 15:30',
      cost: '$60.00',
      desc: 'Intimate tea room ritual with handmade wagashi confections in a preserved Gion machiya.',
    },
    eveningSlot: {
      title: 'Shojin Ryori Vegetarian Banquet',
      time: '19:00 - 21:00',
      cost: '$90.00',
      desc: '12-course temple cuisine prepared with seasonal Kyoto mountain vegetables and organic tofu.',
    },
    stayTitle: 'Sowaka Heritage Machiya Suite',
    stayPrice: '$480 / night',
    budgetPerDay: '$185.00',
  },
  {
    id: 'gastronomy',
    name: 'Michelin Gastronomy & Wine',
    destination: 'Amalfi & Naples, Italy',
    headline: 'Vineyard masterclasses, lemon grove private luncheons & cliffside tasting menus.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=80',
    morningSlot: {
      title: 'Ravello Lemon Grove Private Walk',
      time: '09:00 - 11:00',
      cost: '$40.00',
      desc: 'Walk hand-in-hand through terraced sfusato amalfitano groves with artisanal limoncello tasting.',
    },
    afternoonSlot: {
      title: 'Cliffside Pasta Masterclass with Chef',
      time: '13:00 - 15:30',
      cost: '$110.00',
      desc: 'Hand-rolling scialatielli pasta with freshly caught Adriatic seafood and organic buffalo mozzarella.',
    },
    eveningSlot: {
      title: '3-Star Michelin Dinner overlooking Capri',
      time: '20:00 - 23:00',
      cost: '$220.00',
      desc: '9-course sea-inspired epicurean journey paired with vintage Campanian Aglianico wines.',
    },
    stayTitle: 'Belmond Hotel Caruso Clifftop Villa',
    stayPrice: '$850 / night',
    budgetPerDay: '$370.00',
  },
  {
    id: 'alpine',
    name: 'High-Altitude Alpine Chalets',
    destination: 'Zermatt, Switzerland',
    headline: 'Panoramic cogwheel railways, private glacier walks & fireside champagne raclette.',
    image: 'https://images.pexels.com/photos/13602098/pexels-photo-13602098.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    morningSlot: {
      title: 'Gornergrat Sunrise Matterhorn Rail',
      time: '08:00 - 10:30',
      cost: '$75.00',
      desc: 'Ascend to 3,089 meters across alpine bridges with unobstructed views of 29 four-thousand-meter peaks.',
    },
    afternoonSlot: {
      title: 'Glacier Cave Walk & Snowshoe Trail',
      time: '13:30 - 15:30',
      cost: '$45.00',
      desc: 'Explore shimmering turquoise glacial ice chambers deep inside the Matterhorn glacier paradise.',
    },
    eveningSlot: {
      title: 'Fireside Truffle Fondue in Alpine Stube',
      time: '19:30 - 21:30',
      cost: '$85.00',
      desc: 'Aged Gruyere and Vacherin Fribourgeois melted with shaved black truffles and Valais white wine.',
    },
    stayTitle: 'The Omnia Modern Alpine Lodge',
    stayPrice: '$720 / night',
    budgetPerDay: '$205.00',
  },
  {
    id: 'sanctuary',
    name: 'Secluded Sanctuary & Eco-Luxury',
    destination: 'Ubud, Bali',
    headline: 'Jungle ravines, sacred mineral spring purification & oceanfront cliff sunsets.',
    image: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
    morningSlot: {
      title: 'Tirta Empul Private Melukat Cleansing',
      time: '07:00 - 09:00',
      cost: '$25.00',
      desc: 'Participate respectfully with a Balinese priest in sacred water purification before visiting crowds.',
    },
    afternoonSlot: {
      title: 'Artisanal Herbal Jamu Workshop',
      time: '14:00 - 15:30',
      cost: '$30.00',
      desc: 'Grinding organic turmeric, ginger, and wild forest honey into traditional restorative Balinese elixirs.',
    },
    eveningSlot: {
      title: 'Candlelit Bamboo Pavilion Dinner',
      time: '19:30 - 21:30',
      cost: '$70.00',
      desc: 'Multi-course contemporary Indonesian degustation floating over lotus ponds with live rindik bamboo music.',
    },
    stayTitle: 'Mandapa, a Ritz-Carlton Reserve Villa',
    stayPrice: '$690 / night',
    budgetPerDay: '$125.00',
  },
];

export function LiveLuxuryCurator() {
  const [activeVibeId, setActiveVibeId] = useState<string>('zen');
  const current = VIBES.find((v) => v.id === activeVibeId) || VIBES[0];

  return (
    <section className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14 py-20 sm:py-28">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-forest mb-3">
          <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
          Bespoke Experience Atelier
        </div>
        <h2 className="text-4xl sm:text-5xl text-brand-ink font-serif tracking-tight">
          Curate by mood, atmosphere, and taste.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
          Select your travel aesthetic below to preview how our private atelier arranges matching morning, afternoon, and evening experiences.
        </p>

        {/* Vibe Chips Switcher */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {VIBES.map((v) => {
            const isSelected = v.id === activeVibeId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveVibeId(v.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'bg-brand-forest text-white shadow-lg shadow-brand-forest/25'
                    : 'bg-white border border-brand-line text-brand-muted hover:text-brand-ink hover:border-brand-sage'
                }`}
              >
                <Sparkles className={`h-3.5 w-3.5 ${isSelected ? 'text-brand-gold' : 'text-brand-muted'}`} />
                <span>{v.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Interactive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-brand-line bg-white shadow-2xl overflow-hidden grid lg:grid-cols-[1fr_1.3fr]"
        >
          {/* Left Column: Visual & Stay Highlights */}
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-brand-ink min-h-[380px] sm:min-h-[440px] lg:min-h-full">
            <img
              src={current.image}
              alt={current.name}
              className="h-full w-full object-cover object-[center_top] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5D794]">
                {current.destination}
              </span>
              <h3 className="text-xl sm:text-3xl font-serif text-white mt-1">{current.name}</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/85 leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
                {current.headline}
              </p>

              {/* Stay Preview Card */}
              <div className="mt-3.5 sm:mt-5 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-[#F5D794]">
                    <Hotel className="h-3.5 w-3.5" />
                    Recommended Stay
                  </span>
                  <span className="font-mono text-white/90 text-[11px] sm:text-xs">{current.stayPrice}</span>
                </div>
                <div className="text-xs sm:text-sm font-serif font-bold text-white mt-1 truncate">{current.stayTitle}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Morning/Afternoon/Evening Slots */}
          <div className="p-6 sm:p-10 flex flex-col justify-between bg-brand-mist/20">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-line">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">
                  Bespoke Day Schedule
                </span>
                <span className="text-xs font-semibold text-brand-forest bg-brand-mist px-3 py-1 rounded-full border border-brand-line">
                  Daily Activities: {current.budgetPerDay}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Morning */}
                <div className="p-4 rounded-2xl border border-brand-line bg-white shadow-xs hover:border-brand-sage transition-all">
                  <div className="flex items-center justify-between text-brand-forest font-semibold mb-1">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <Sun className="h-3.5 w-3.5 text-brand-gold" />
                      Morning · {current.morningSlot.time}
                    </span>
                    <span className="text-brand-muted">{current.morningSlot.cost}</span>
                  </div>
                  <h4 className="text-base font-bold text-brand-ink">{current.morningSlot.title}</h4>
                  <p className="text-brand-muted mt-1 leading-relaxed">{current.morningSlot.desc}</p>
                </div>

                {/* Afternoon */}
                <div className="p-4 rounded-2xl border border-brand-line bg-white shadow-xs hover:border-brand-sage transition-all">
                  <div className="flex items-center justify-between text-brand-forest font-semibold mb-1">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <Coffee className="h-3.5 w-3.5 text-brand-gold" />
                      Afternoon · {current.afternoonSlot.time}
                    </span>
                    <span className="text-brand-muted">{current.afternoonSlot.cost}</span>
                  </div>
                  <h4 className="text-base font-bold text-brand-ink">{current.afternoonSlot.title}</h4>
                  <p className="text-brand-muted mt-1 leading-relaxed">{current.afternoonSlot.desc}</p>
                </div>

                {/* Evening */}
                <div className="p-4 rounded-2xl border border-brand-line bg-white shadow-xs hover:border-brand-sage transition-all">
                  <div className="flex items-center justify-between text-brand-forest font-semibold mb-1">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <Moon className="h-3.5 w-3.5 text-brand-gold" />
                      Evening · {current.eveningSlot.time}
                    </span>
                    <span className="text-brand-muted">{current.eveningSlot.cost}</span>
                  </div>
                  <h4 className="text-base font-bold text-brand-ink">{current.eveningSlot.title}</h4>
                  <p className="text-brand-muted mt-1 leading-relaxed">{current.eveningSlot.desc}</p>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="mt-8 pt-5 border-t border-brand-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-brand-muted">Autosaves into your account · Free forever</span>
              <Link
                href={`/planner?destination=${encodeURIComponent(current.destination)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-forest px-7 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#254635] transition-all"
              >
                Launch in Trip Studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
