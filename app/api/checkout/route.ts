import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmationEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tripId,
      destination = 'Bespoke Expedition',
      dates = 'Upcoming Journey',
      leadGuest,
      paymentMethod = 'CARD',
      cardDetails,
      amountMinor = 1485000,
      currency = 'USD',
      inclusions,
    } = body;

    if (!leadGuest || !leadGuest.email) {
      return NextResponse.json(
        { success: false, error: 'Lead guest name and email are required.' },
        { status: 400 }
      );
    }

    // Format currency amount
    const totalAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amountMinor / 100);

    // Generate distinctive luxury booking reference: TRP-2026-XXXXX
    const codeSegment = Math.random().toString(36).substring(2, 6).toUpperCase();
    const bookingRef = `TRP-2026-${codeSegment}`;

    // Determine host origin for receipt link
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://news-main-five.vercel.app';

    const receiptLink = tripId
      ? `${origin}/trips/${tripId}?receipt=${bookingRef}`
      : `${origin}/dashboard?receipt=${bookingRef}`;

    // Format payment method descriptor
    let paymentDesc = 'Direct Centurion Card';
    if (paymentMethod === 'WIRE') {
      paymentDesc = 'Private Banking Wire (SWIFT / BACS Transfer)';
    } else if (paymentMethod === 'SPLIT') {
      paymentDesc = 'Co-Traveler Split Settlement (Share 1 of 3)';
    } else if (cardDetails?.brand && cardDetails?.last4) {
      paymentDesc = `${cardDetails.brand.toUpperCase()} ending in ${cardDetails.last4}`;
    }

    let emailSent = false;
    let messageId: string | undefined;
    let mailError: string | null = null;

    try {
      const mailInfo = await sendBookingConfirmationEmail({
        to: leadGuest.email.trim(),
        guestName: leadGuest.fullName || 'Discerning Traveler',
        bookingRef,
        destination,
        dates,
        totalAmount,
        paymentMethod: paymentDesc,
        inclusions: inclusions || [
          '5-Star Private Sanctuary Reservation with Villa Upgrade',
          'Lie-Flat Aviation Corridors with Priority VIP Boarding',
          '24/7 Dedicated Concierge & WhatsApp Dispatch Liaison',
          'Curated Michelin Dining Allocations & Private Transfers',
        ],
        receiptLink,
      });
      emailSent = true;
      messageId = mailInfo.messageId;
      console.log(`[TRIPORA CHECKOUT] Confirmation sent to ${leadGuest.email}. MessageId: ${messageId}`);
    } catch (err: any) {
      console.error('[TRIPORA CHECKOUT] SMTP relay error:', err);
      mailError = err?.message || 'SMTP relay failed';
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      status: paymentMethod === 'WIRE' ? 'WIRE_PENDING' : 'CONFIRMED',
      totalAmount,
      currency,
      emailSent,
      messageId,
      mailError,
      receiptLink,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('API /api/checkout error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment processing error' },
      { status: 500 }
    );
  }
}
