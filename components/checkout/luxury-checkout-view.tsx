'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Landmark,
  Users,
  Check,
  ArrowRight,
  Plane,
  Sparkles,
  Calendar,
  MapPin,
  Printer,
  Phone,
  MessageSquare,
  Lock,
  FileText,
  Clock,
  Compass,
} from 'lucide-react';
import { useAuth } from '@/components/auth/auth-provider';

export type CheckoutTripData = {
  tripId?: string;
  destination: string;
  dates: string;
  travelers: number;
  hotelName?: string;
  hotelPriceUSD?: number;
  flightRoute?: string;
  flightPriceUSD?: number;
  conciergePriceUSD?: number;
  totalUSD: number;
  inclusions?: string[];
};

export function LuxuryCheckoutView({ trip }: { trip?: CheckoutTripData }) {
  const router = useRouter();
  const { user } = useAuth();

  // Fallback default trip if none passed
  const currentTrip: CheckoutTripData = trip || {
    tripId: 'trip-bali-001',
    destination: 'Bali Sacred Sanctuary & Forest Spa',
    dates: 'Nov 20 – Nov 26, 2026',
    travelers: 2,
    hotelName: 'Mandapa, a Ritz-Carlton Reserve (Riverfront Pool Villa)',
    hotelPriceUSD: 7200,
    flightRoute: 'Singapore Airlines First Class Suites (SIN → DPS)',
    flightPriceUSD: 5400,
    conciergePriceUSD: 450,
    totalUSD: 14850,
    inclusions: [
      '5-Star Private Pool Villa at Mandapa, Ritz-Carlton Reserve',
      'Daily 3-Course Organic Breakfast & Afternoon High Tea',
      'First Class Lie-Flat Aviation Corridors with Priority VIP Boarding',
      'Dedicated 24/7 Master Concierge & WhatsApp Dispatch',
      'Private Chauffeur Airport VIP Tarmac Escort',
      '100% Gold Standard Certified Carbon-Neutral Travel Offsets',
    ],
  };

  // Form states
  const [guestName, setGuestName] = useState(user?.fullName || 'Alex Vance');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'traveler@tripora.ai');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-8900');
  const [specialRequests, setSpecialRequests] = useState('Pillow menu (goose down), high-floor suite, quiet arrival after 20:00.');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'WIRE' | 'SPLIT'>('CARD');

  // Card details
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState(user?.fullName || 'ALEX VANCE');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Submission & Confirmation state
  const [processing, setProcessing] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{
    bookingRef: string;
    status: string;
    emailSent: boolean;
    totalAmount: string;
    receiptLink: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Formatted amounts
  const totalFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currentTrip.totalUSD);

  const splitShareUSD = Math.round(currentTrip.totalUSD / currentTrip.travelers);
  const splitShareFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(splitShareUSD);

  async function handleCompleteReservation(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: currentTrip.tripId,
          destination: currentTrip.destination,
          dates: currentTrip.dates,
          leadGuest: {
            fullName: guestName,
            email: guestEmail,
            phone: guestPhone,
            specialRequests,
          },
          paymentMethod,
          cardDetails:
            paymentMethod === 'CARD'
              ? {
                  brand: 'Amex Centurion',
                  last4: cardNumber.replace(/\D/g, '').slice(-4) || '4242',
                }
              : undefined,
          amountMinor: (paymentMethod === 'SPLIT' ? splitShareUSD : currentTrip.totalUSD) * 100,
          currency: 'USD',
          inclusions: currentTrip.inclusions,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Payment authorization failed');
      }

      setConfirmedData(data);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'Payment system error. Please retry.');
    } finally {
      setProcessing(false);
    }
  }

  // If confirmed, render luxury voucher confirmation
  if (confirmedData) {
    return (
      <div className="min-h-screen bg-[#080E0A] py-16 px-4 sm:px-6 lg:px-8 text-white selection:bg-[#F5D794] selection:text-[#0A120D]">
        <div className="mx-auto max-w-3xl">
          {/* Header Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-4">
              <Check className="h-4 w-4 text-emerald-400" />
              Reservation Confirmed &amp; Dispatched
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
              Your Expedition is Reserved
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 font-light max-w-xl mx-auto">
              Welcome to Tripora Reserve. An official confirmation voucher has been dispatched to{' '}
              <span className="text-[#F5D794] font-medium">{guestEmail}</span>.
            </p>
          </div>

          {/* Official Luxury Voucher Card */}
          <div className="rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#C5A46A]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Voucher Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1C2C22] to-[#0A120D] text-[#F5D794] border border-[#C5A46A]/50">
                  <Plane className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl tracking-wider text-white">TRIPORA</span>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#F5D794] bg-[#F5D794]/15 px-2 py-0.5 rounded-full border border-[#C5A46A]/40">
                      RESERVE
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 tracking-wider font-mono uppercase">Official Itinerary Voucher</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-white/50 uppercase tracking-widest font-mono">Booking Reference</p>
                <p className="font-mono text-xl sm:text-2xl font-bold text-[#F5D794] tracking-wider">{confirmedData.bookingRef}</p>
              </div>
            </div>

            {/* Voucher Details */}
            <div className="grid sm:grid-cols-2 gap-6 py-6 border-b border-white/10 text-sm">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono">Sanctuary &amp; Destination</p>
                <p className="text-base font-serif text-white mt-1">{currentTrip.destination}</p>
                <p className="text-xs text-white/70 mt-1 font-light">{currentTrip.hotelName}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono">Expedition Dates &amp; Party</p>
                <p className="text-base font-serif text-white mt-1">{currentTrip.dates}</p>
                <p className="text-xs text-white/70 mt-1 font-light">{currentTrip.travelers} Guests &bull; Lead: {guestName}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono">Payment Settlement</p>
                <p className="text-base font-serif text-[#F5D794] mt-1 font-bold">{confirmedData.totalAmount}</p>
                <p className="text-xs text-emerald-400 mt-1 font-medium">Status: {confirmedData.status} (PCI-DSS 256-Bit Encrypted)</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono">24/7 Concierge Hotline</p>
                <p className="text-base font-serif text-white mt-1">Kyoto &amp; Zurich VIP Desks</p>
                <p className="text-xs text-white/70 mt-1 font-light">WhatsApp: +41 22 518 9000 &bull; PIN: {confirmedData.bookingRef.slice(-4)}</p>
              </div>
            </div>

            {/* Inclusions */}
            <div className="py-6 border-b border-white/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F5D794] font-mono mb-3">
                Confirmed Inclusions &amp; Diplomatic Amenities
              </p>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-xs text-white/80 font-light">
                {currentTrip.inclusions?.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Voucher Actions */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2.5 rounded-full transition-colors"
              >
                <Printer className="h-3.5 w-3.5 text-[#F5D794]" />
                Print Official Voucher
              </button>

              <div className="flex items-center gap-3">
                <Link
                  href={`/trips/${currentTrip.tripId}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] to-[#C5A46A] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#080E0A] shadow-lg hover:brightness-110 transition-all"
                >
                  <span>Open Itinerary Studio</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Form View
  return (
    <div className="min-h-screen bg-[#080E0A] py-12 px-4 sm:px-6 lg:px-8 text-white selection:bg-[#F5D794] selection:text-[#0A120D]">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10">
          <Link
            href={currentTrip.tripId ? `/trips/${currentTrip.tripId}` : '/trips'}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-[#F5D794] transition-colors"
          >
            &larr; Return to Expedition
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/60">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted &bull; PCI-DSS Level 1 Secure</span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-8 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46A]/30 bg-[#F5D794]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#F5D794] mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Tripora Reserve &bull; Expedition Settlement Terminal
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-white tracking-tight">
            Reserve Your Journey
          </h1>
          <p className="mt-2 text-sm text-white/70 font-light max-w-2xl leading-relaxed">
            Review your itinerary specifications, customize your arrival nuances, and complete payment settlement to activate your 24/7 dedicated concierge desk.
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-6 rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-xs text-destructive">
            {errorMsg}
          </div>
        )}

        {/* Main Grid: Ledger on Left, Payment on Right */}
        <form onSubmit={handleCompleteReservation} className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Itinerary Breakdown & Guest Protocol (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Expedition Summary Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 sm:p-8 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5D794]">Curated Destination</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">{currentTrip.destination}</h2>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/60 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#F5D794]" />
                      {currentTrip.dates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-[#F5D794]" />
                      {currentTrip.travelers} Guests
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">Expedition Total</span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#F5D794]">{totalFormatted}</p>
                </div>
              </div>

              {/* Itemized Allocation List */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3.5 text-xs">
                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#C5A46A]" />
                    {currentTrip.hotelName || '5-Star Sanctuary Villa (6 Nights)'}
                  </span>
                  <span className="font-mono text-white">${currentTrip.hotelPriceUSD?.toLocaleString() || '7,200.00'}</span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <Plane className="h-3.5 w-3.5 text-[#C5A46A]" />
                    {currentTrip.flightRoute || 'Lie-Flat Aviation Corridors (Return Suites)'}
                  </span>
                  <span className="font-mono text-white">${currentTrip.flightPriceUSD?.toLocaleString() || '5,400.00'}</span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <Compass className="h-3.5 w-3.5 text-[#C5A46A]" />
                    Private Tarmac Escort &amp; Bespoke Transfers
                  </span>
                  <span className="font-mono text-white">$950.00</span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#C5A46A]" />
                    Michelin Dining Reservations &amp; Private Tea Master
                  </span>
                  <span className="font-mono text-white">$850.00</span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#C5A46A]" />
                    24/7 Dedicated Concierge &amp; Diplomatic Liaison
                  </span>
                  <span className="font-mono text-white">${currentTrip.conciergePriceUSD || '450.00'}</span>
                </div>

                <div className="flex items-center justify-between text-emerald-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    100% Carbon-Neutral Gold Standard Offset
                  </span>
                  <span className="font-mono font-semibold">Complimentary</span>
                </div>
              </div>
            </div>

            {/* Guest Protocol & Preferences */}
            <div className="rounded-3xl border border-white/10 bg-[#0D1510] p-6 sm:p-8 shadow-xl space-y-4">
              <h3 className="font-serif text-xl text-white">Lead Guest &amp; Diplomatic Protocol</h3>
              <p className="text-xs text-white/60 font-light">
                Our concierge desk customizes every aspect of your arrival to match your personal preferences.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                    Lead Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-[#F5D794] focus:outline-none focus:ring-1 focus:ring-[#F5D794]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                    Email (for Official Voucher)
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-[#F5D794] focus:outline-none focus:ring-1 focus:ring-[#F5D794]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                  Mobile / WhatsApp (for 24/7 Concierge Hotline)
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-[#F5D794] focus:outline-none focus:ring-1 focus:ring-[#F5D794]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                  Arrival Nuances, Dietary Preferences &amp; Pillow Menu
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Goose down pillows, champagne on arrival, quiet suite location..."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-[#F5D794] focus:outline-none focus:ring-1 focus:ring-[#F5D794]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Payment Terminal (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-[#C5A46A]/40 bg-[#0D1510] p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-serif text-xl text-white">Payment Method</h3>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  PCI-DSS Level 1
                </span>
              </div>

              {/* Payment Method Switcher Tabs */}
              <div className="mt-4 grid grid-cols-3 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-[#1C2C22] text-[#F5D794] border border-[#C5A46A]/40 shadow-md font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mb-1" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('WIRE')}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all ${
                    paymentMethod === 'WIRE'
                      ? 'bg-[#1C2C22] text-[#F5D794] border border-[#C5A46A]/40 shadow-md font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Landmark className="h-4 w-4 mb-1" />
                  <span>Wire (SWIFT)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('SPLIT')}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all ${
                    paymentMethod === 'SPLIT'
                      ? 'bg-[#1C2C22] text-[#F5D794] border border-[#C5A46A]/40 shadow-md font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Users className="h-4 w-4 mb-1" />
                  <span>Split Share</span>
                </button>
              </div>

              {/* Tab 1: Credit / Centurion Card Form */}
              {paymentMethod === 'CARD' && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white uppercase focus:border-[#F5D794] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      Card Number (Visa Infinite, World Elite, Centurion)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F5D794] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F5D794] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white font-mono focus:border-[#F5D794] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Private Banking Wire (SWIFT / BACS) */}
              {paymentMethod === 'WIRE' && (
                <div className="mt-6 p-4 rounded-2xl border border-[#C5A46A]/30 bg-white/5 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-[#F5D794] font-semibold">
                    <Landmark className="h-4 w-4" />
                    <span>Private Banking Wire &bull; 72-Hour Rate Lock</span>
                  </div>
                  <p className="text-white/70 font-light leading-relaxed">
                    For high-value expeditions ($10,000+), an official Pro-Forma SWIFT/IBAN invoice is generated and dispatched to your private banker or family office.
                  </p>
                  <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-[11px] text-white/80">
                    <p><span className="text-white/50">Beneficiary:</span> Tripora Reserve Treasury Ltd</p>
                    <p><span className="text-white/50">Bank:</span> Pictet &amp; Cie Private Bankers (Zurich)</p>
                    <p><span className="text-white/50">SWIFT / BIC:</span> PICTCHZZXXX</p>
                    <p><span className="text-white/50">Guarantee:</span> Rates locked for 72 hours upon order submission</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Co-Traveler Split Settlement */}
              {paymentMethod === 'SPLIT' && (
                <div className="mt-6 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Users className="h-4 w-4" />
                    <span>Equal Split Settlement (1 of {currentTrip.travelers} Shares)</span>
                  </div>
                  <p className="text-white/70 font-light leading-relaxed">
                    Settle your individual portion today. Our automated split relay will dispatch personalized payment invitation links to your co-travelers via email.
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 flex items-center justify-between">
                    <span className="text-white/80">Your Personal Share:</span>
                    <span className="font-serif text-lg font-bold text-[#F5D794]">{splitShareFormatted}</span>
                  </div>
                </div>
              )}

              {/* Due Today Summary */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-white/50">Due Today</p>
                  <p className="font-serif text-2xl font-bold text-[#F5D794]">
                    {paymentMethod === 'SPLIT' ? splitShareFormatted : totalFormatted}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F5D794] to-[#C5A46A] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#080E0A] shadow-lg hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {processing ? (
                    <>
                      <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <span>{paymentMethod === 'WIRE' ? 'Generate Wire Lock' : 'Confirm & Reserve'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Guarantee badges */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/50 font-mono">
                <span>✦ Free cancellation within 48h</span>
                <span>✦ ATOL &amp; Virtuoso Protected</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
