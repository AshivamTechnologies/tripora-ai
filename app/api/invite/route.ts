import { NextRequest, NextResponse } from 'next/server';
import { sendTripInvitationEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      role = 'EDITOR',
      tripId = 'trip-bali-001',
      tripDestination = 'Bali, Indonesia',
      tripDates = 'Nov 20 - Nov 26, 2026',
      inviterName = 'Alex Vance',
    } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Recipient email is required.' },
        { status: 400 }
      );
    }

    // Determine host origin dynamically
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://news-main-five.vercel.app';

    // Generate unique invitation token and link
    const inviteToken = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
    const inviteLink = `${origin}/trips/${tripId}?invite=${inviteToken}`;

    let emailSent = false;
    let messageId: string | undefined;
    let mailError: string | null = null;

    try {
      const info = await sendTripInvitationEmail({
        to: email.trim(),
        inviterName,
        tripDestination,
        tripDates,
        inviteLink,
        role: role === 'VIEWER' ? 'VIEWER' : 'EDITOR',
      });
      emailSent = true;
      messageId = info.messageId;
      console.log(`[TRIPORA MAILER] Invitation sent successfully to ${email}. MessageId: ${messageId}`);
    } catch (err: any) {
      console.error('[TRIPORA MAILER] SMTP dispatch error:', err);
      mailError = err?.message || 'SMTP dispatch failed';
    }

    return NextResponse.json({
      success: true,
      inviteLink,
      emailSent,
      recipient: email.trim(),
      messageId,
      mailError,
      member: {
        id: `mem-${inviteToken.substring(0, 8)}`,
        email: email.trim(),
        fullName: email.split('@')[0],
        role: role === 'VIEWER' ? 'VIEWER' : 'EDITOR',
        joinedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('API /api/invite error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
