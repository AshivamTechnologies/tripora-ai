'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, PhoneCall, ShieldCheck, Clock, Sparkles, Headphones, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Itinerary Guidance');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        {/* Luxury Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest px-8 py-14 text-white sm:px-14 sm:py-18 shadow-2xl">
          <div className="absolute top-0 right-0 -z-10 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold mb-3">
              <Headphones className="h-3.5 w-3.5" />
              24/7 Global Concierge & Support Desk
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
              Connect with Our Travel Concierge
            </h1>
            <p className="mt-3 text-base text-white/80 font-light leading-relaxed">
              Inquiries regarding multi-city journeys, off-market private villa access, corporate enterprise seats, or API integrations.
            </p>
          </div>
        </div>

        {/* 3 Channels Quick Bar */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-forest/10 text-brand-forest">
              <PhoneCall className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-serif text-lg text-brand-ink">Private Aviation & VIP Desk</h3>
            <p className="mt-1 text-xs text-brand-muted font-light">Dedicated emergency flight rebooking & private jet charters.</p>
            <p className="mt-3 text-xs font-semibold text-brand-forest font-mono">+1 (800) 874-7672</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-forest/10 text-brand-forest">
              <MessageSquare className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-serif text-lg text-brand-ink">WhatsApp VIP Concierge</h3>
            <p className="mt-1 text-xs text-brand-muted font-light">Direct messaging with on-duty travel producers in Kyoto & Zurich.</p>
            <p className="mt-3 text-xs font-semibold text-emerald-700">&bull; Available for Voyager & Reserve</p>
          </div>

          <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-forest/10 text-brand-forest">
              <Clock className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-serif text-lg text-brand-ink">Response Guarantee</h3>
            <p className="mt-1 text-xs text-brand-muted font-light">All dispatches processed under strict service-level agreements.</p>
            <p className="mt-3 text-xs font-semibold text-brand-ink font-mono">&lt; 1 hour (Reserve) &bull; &lt; 24h (Standard)</p>
          </div>
        </div>

        {/* Main Inquiry Form */}
        <div className="mt-10 rounded-3xl border border-brand-line bg-white p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-12 animate-in fade-in">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <h2 className="mt-5 font-serif text-3xl text-brand-ink">Inquiry Received by Concierge Desk</h2>
              <p className="mt-3 text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-brand-ink">{name}</span>. A Tripora travel advisor has been assigned to your ticket and will reply to <span className="font-semibold text-brand-ink">{email}</span> within your tier SLA.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full bg-brand-forest px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#254635] transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-forest">Direct Dispatch</span>
                <h2 className="mt-1 font-serif text-3xl text-brand-ink">Submit an Itinerary Inquiry</h2>
                <p className="mt-1 text-xs text-brand-muted font-light">
                  Our regional correspondents and concierge team review every submission individually.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lord Julian Sterling"
                    className="mt-1.5 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-semibold text-brand-ink focus:outline-none focus:border-brand-forest"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="mt-1.5 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-semibold text-brand-ink focus:outline-none focus:border-brand-forest"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Subject / Category</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:border-brand-forest"
                >
                  <option>General Itinerary Guidance & Curation</option>
                  <option>Private Reserve & Aman Partner Access</option>
                  <option>Private Aviation & Multi-Carrier Flights</option>
                  <option>Corporate Retreat & Group Split Engine</option>
                  <option>API & Provider Partnership</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Message Details</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your destination goals, travel dates, party size, or specific inquiries..."
                  className="mt-1.5 w-full rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 text-sm font-light text-brand-ink focus:outline-none focus:border-brand-forest leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <ShieldCheck className="h-4 w-4 text-brand-forest" />
                  <span>256-Bit Encrypted Concierge Channel</span>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-brand-forest px-8 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#254635] transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit to Concierge</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
