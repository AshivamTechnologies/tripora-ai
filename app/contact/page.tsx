'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-brand-mist pb-24 pt-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-forest">Support & Partnerships</p>
          <h1 className="mt-3 font-serif text-4xl text-brand-ink sm:text-5xl">Connect With Our Team</h1>
          <p className="mt-3 text-base text-brand-muted">
            Have questions about group travel, API integrations, enterprise accounts, or feedback? We are here to help.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-brand-line bg-white p-8 shadow-sm sm:p-12">
          {submitted ? (
            <div className="text-center py-10 animate-in fade-in">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
              <h2 className="mt-4 font-serif text-2xl text-brand-ink">Message Received</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Thank you for reaching out. A Tripora travel advisor will respond to {email} within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-brand-muted">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-muted">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-muted">Inquiry Subject</label>
                <select className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest">
                  <option>General Support & Itinerary Questions</option>
                  <option>Commercial Subscription & Billing</option>
                  <option>API & Provider Partnership</option>
                  <option>Feedback & Feature Suggestions</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-muted">Message</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your trip plans or inquiry..."
                  className="mt-1 w-full rounded-2xl border border-brand-line p-3 text-sm focus:outline-none focus:border-brand-forest"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-brand-forest px-8 py-3.5 text-xs font-semibold text-white shadow-sm hover:bg-[#274a39]"
              >
                <Send className="h-3.5 w-3.5" />
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
