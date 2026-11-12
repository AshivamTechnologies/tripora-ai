'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Crown,
  ShieldCheck,
  Check,
  CreditCard,
  Lock,
  ArrowRight,
  Sparkles,
  Printer,
  Compass,
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';

export default function MembershipCheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const selectedTierParam = (searchParams.get('tier') || 'voyager').toLowerCase();
  const [tier, setTier] = useState<'voyager' | 'reserve'>(
    selectedTierParam === 'reserve' ? 'reserve' : 'voyager'
  );
  const [annual, setAnnual] = useState(true);

  // Form states
  const [fullName, setFullName] = useState(user?.fullName || 'Alex Vance');
  const [email, setEmail] = useState(user?.email || 'traveler@tripora.ai');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('11/28');
  const [cvv, setCvv] = useState('888');

  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [membershipRef, setMembershipRef] = useState('');

  const isReserve = tier === 'reserve';
  const price = annual
    ? isReserve
      ? 468
      : 180
    : isReserve
    ? 49
    : 19;
  const periodLabel = annual ? '/ year (billed annually)' : '/ month';

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);

    try {
      const code = `MEM-${isReserve ? 'RES' : 'VOY'}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Call checkout API to record and email receipt
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: isReserve ? 'Private Reserve Annual Privilege' : 'Voyager Club Membership',
          dates: annual ? '2026 – 2027 Annual Term' : 'Monthly Recurring Access',
          leadGuest: {
            fullName,
            email,
          },
          paymentMethod: 'CARD',
          cardDetails: { brand: 'Amex Centurion', last4: '4242' },
          amountMinor: price * 100,
          currency: 'USD',
          inclusions: isReserve
            ? [
                'Unlimited Bespoke Itinerary Atelier Synthesis',
                '24/7 Dedicated WhatsApp Concierge Hotline (<1h SLA)',
                'Aman, Belmond & Four Seasons Virtuoso Amenities',
                'Private Aviation Charter & Lie-Flat Fare Monitoring',
                'Off-Market Private Villa & Ryokan Catalog Access',
              ]
            : [
                'Unlimited Active Expeditions & Archives',
                'Priority Concierge Atelier Routing',
                'Multi-User Realtime Trip Collaboration (Up to 8 Co-Travelers)',
                'Cent-Level Currency Expense Split Engine',
                'Live Flight Price Revalidation & Offline PDF Sync',
              ],
        }),
      });

      setMembershipRef(code);
      setConfirmed(true);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#080E0A] py-16 px-4 sm:px-6 text-white selection:bg-[#F5D794] selection:text-[#0A120D]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-4">
            <Check className="h-4 w-4 text-emerald-400" />
            Membership Activated
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
            Welcome to {isReserve ? 'Private Reserve' : 'Voyager Club'}
          </h1>
          <p className="mt-3 text-sm text-white/70 font-light max-w-lg mx-auto">
            Your privileges have been activated. Membership confirmation and receipt have been dispatched to{' '}
            <span className="text-[#F5D794]">{email}</span>.
          </p>

          <div className="mt-8 rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-8 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/50">Membership Pass</p>
                <p className="font-serif text-xl text-[#F5D794]">{isReserve ? 'Private Reserve & Concierge' : 'Voyager Club'}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/50">Pass Reference</p>
                <p className="font-mono text-lg font-bold text-white">{membershipRef}</p>
              </div>
            </div>

            <div className="py-2 text-xs text-white/80 space-y-2">
              <p className="text-white/50 uppercase font-mono tracking-wider">Activated Privileges:</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Unlimited Itinerary Generation with Pacing Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>24/7 Dedicated Concierge Desks (Kyoto &amp; Zurich)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Virtuoso &amp; Luxury Partner Amenities ($100 Credit + Upgrades)</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
              >
                <Printer className="h-3.5 w-3.5 text-[#F5D794]" />
                Print Receipt
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] to-[#C5A46A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#080E0A] shadow-md hover:brightness-110 transition-all"
              >
                <span>Enter Traveler Cockpit</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080E0A] py-12 px-4 sm:px-6 text-white selection:bg-[#F5D794] selection:text-[#0A120D]">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            href="/pricing"
            className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-[#F5D794] transition-colors"
          >
            &larr; Back to Privileges
          </Link>
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit SSL Encrypted Settlement</span>
          </div>
        </div>

        <div className="mt-8 mb-8 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46A]/30 bg-[#F5D794]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#F5D794] mb-3">
            <Crown className="h-3.5 w-3.5" />
            Tripora Privileges &bull; Membership Terminal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
            Activate Your Privileges
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/70 font-light">
            Elevate your travel experience with priority concierge routing, partner perks, and real-time flight monitoring.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="grid lg:grid-cols-12 gap-8">
          {/* Plan Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 shadow-xl space-y-4">
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/50">Select Privilege Tier</p>
              
              <div
                onClick={() => setTier('voyager')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  tier === 'voyager'
                    ? 'border-[#C5A46A] bg-[#1C2C22]/80 shadow-md'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-white font-medium">Voyager Club</span>
                  <span className="font-mono text-sm text-[#F5D794]">{annual ? '$180/yr' : '$19/mo'}</span>
                </div>
                <p className="text-xs text-white/70 mt-1 font-light">
                  Unlimited journeys, collaborative splits, live flight alerts.
                </p>
              </div>

              <div
                onClick={() => setTier('reserve')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  tier === 'reserve'
                    ? 'border-[#C5A46A] bg-[#1C2C22]/80 shadow-md'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-white font-medium">Private Reserve</span>
                  <span className="font-mono text-sm text-[#F5D794]">{annual ? '$468/yr' : '$49/mo'}</span>
                </div>
                <p className="text-xs text-white/70 mt-1 font-light">
                  24/7 WhatsApp VIP concierge, off-market villas, partner amenities.
                </p>
              </div>

              {/* Billing Toggle */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-white/70">Annual Billing (Save 20%)</span>
                <button
                  type="button"
                  onClick={() => setAnnual(!annual)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    annual ? 'bg-[#C5A46A]' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      annual ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Payment Terminal (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-serif text-lg text-white">Payment Details</h3>
                <span className="text-xs font-serif text-[#F5D794] font-bold">
                  Total: ${price} {periodLabel}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-[#F5D794] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Billing Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-[#F5D794] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">
                  Card Number (Amex Centurion, World Elite, Visa Infinite)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white font-mono focus:border-[#F5D794] focus:outline-none pr-10"
                  />
                  <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-white/40" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white font-mono focus:border-[#F5D794] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-white/70 mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="•••"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white font-mono focus:border-[#F5D794] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase text-white/50">Amount Due</p>
                  <p className="font-serif text-2xl font-bold text-[#F5D794]">${price}</p>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] to-[#C5A46A] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#080E0A] shadow-lg hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {processing ? (
                    <>
                      <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Activating...</span>
                    </>
                  ) : (
                    <>
                      <span>Activate Privileges</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-white/40 font-mono">
                  ✦ Cancel anytime &bull; 14-day luxury satisfaction guarantee &bull; PCI-DSS Secure
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
