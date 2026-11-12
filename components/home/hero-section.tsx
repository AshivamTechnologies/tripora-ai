'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Compass, Star, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { DestinationSearch } from './destination-search';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-[720px] lg:min-h-[820px] flex items-center">
      {/* Background Image with Ambient Subtle Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2883832/pexels-photo-2883832.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Misty alpine lake reflecting peaks at dawn"
          className="h-full w-full object-cover scale-105 animate-[subtle-zoom_20s_ease-in-out_infinite_alternate]"
        />
        {/* Editorial Gradients & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/50 to-brand-ink/75" />
        <div className="absolute inset-0 bg-radial-[at_center_bottom] from-transparent via-transparent to-brand-ink/40" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
        <div className="max-w-3xl">
          {/* Top Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md shadow-lg shadow-black/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-brand-gold">TRIPORA RESERVE</span>
            <span className="text-white/40">·</span>
            <span>Explore More. Plan Smarter. Travel Better.</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08]"
          >
            Your journey, <br />
            <span className="italic font-normal text-brand-mist/95">thoughtfully planned.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/85 font-light"
          >
            Turn vague ideas into tailored day-by-day itineraries with exact currency budgets, weather-synced packing, and verified flight & hotel handoffs.
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 max-w-2xl"
          >
            <DestinationSearch />
          </motion.div>
        </div>

        {/* Live Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/15 pt-8 max-w-4xl"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white">120+</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Countries Curated</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white">85,000+</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Days Planned</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white">100%</div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Minor-Unit Math</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif text-white flex items-center gap-1">
              4.97 <Star className="h-4 w-4 fill-brand-gold text-brand-gold inline" />
            </div>
            <div className="text-xs text-white/70 mt-1 uppercase tracking-wider font-medium">Verified Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
