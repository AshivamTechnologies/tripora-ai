import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
const SMTP_FROM = process.env.SMTP_FROM || `"TRIPORA RESERVE Concierge" <${SMTP_USER || 'concierge@tripora.ai'}>`;

// Configure the nodemailer transporter with Gmail dynamically
function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL/TLS
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export interface SendInviteParams {
  to: string;
  inviterName: string;
  tripDestination: string;
  tripDates?: string;
  inviteLink: string;
  role: 'EDITOR' | 'VIEWER';
}

export async function sendTripInvitationEmail({
  to,
  inviterName,
  tripDestination,
  tripDates = 'Upcoming Journey',
  inviteLink,
  role,
}: SendInviteParams) {
  const roleLabel = role === 'EDITOR' ? 'Co-Editor (Can add & edit days)' : 'Viewer (Read-only access)';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TRIPORA RESERVE — Private Expedition Invitation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #080E0A;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #FFFFFF;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #080E0A;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0D1510;
      border: 1px solid rgba(197, 164, 106, 0.35);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    }
    .header {
      padding: 36px 36px 24px 36px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: linear-gradient(180deg, #121c16 0%, #0D1510 100%);
    }
    .brand-mark {
      display: inline-block;
      font-size: 22px;
      letter-spacing: 0.12em;
      color: #FFFFFF;
      font-weight: 400;
      text-transform: uppercase;
    }
    .reserve-badge {
      display: inline-block;
      font-size: 9px;
      letter-spacing: 0.2em;
      color: #F5D794;
      background: rgba(245, 215, 148, 0.15);
      border: 1px solid rgba(197, 164, 106, 0.4);
      padding: 2px 8px;
      border-radius: 9999px;
      margin-left: 6px;
      vertical-align: middle;
      font-weight: 700;
    }
    .content {
      padding: 36px;
    }
    .greeting {
      font-size: 24px;
      color: #F5D794;
      font-family: 'Times New Roman', Times, serif;
      font-weight: 400;
      margin: 0 0 16px 0;
    }
    .body-text {
      font-size: 14px;
      line-height: 1.65;
      color: rgba(255, 255, 255, 0.8);
      margin: 0 0 24px 0;
    }
    .trip-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .trip-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(255, 255, 255, 0.45);
      margin-bottom: 4px;
    }
    .trip-title {
      font-size: 18px;
      color: #FFFFFF;
      font-weight: 600;
      margin: 0 0 8px 0;
    }
    .trip-meta {
      font-size: 12px;
      color: #C5A46A;
      margin: 0;
    }
    .cta-container {
      text-align: center;
      margin: 32px 0 24px 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(90deg, #F5D794 0%, #edd9a8 50%, #C5A46A 100%);
      color: #0A120D !important;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 14px 32px;
      border-radius: 9999px;
      box-shadow: 0 6px 20px rgba(197, 164, 106, 0.25);
    }
    .footer {
      padding: 24px 36px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      background-color: #080E0A;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.4);
      line-height: 1.5;
    }
    .footer a {
      color: #C5A46A;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="brand-mark">TRIPORA</span>
        <span class="reserve-badge">RESERVE</span>
      </div>

      <div class="content">
        <h1 class="greeting">You Have Been Invited to Co-Curate</h1>
        <p class="body-text">
          <strong>${inviterName}</strong> has invited you to join their bespoke private expedition planning on <strong>TRIPORA RESERVE</strong>.
        </p>

        <div class="trip-card">
          <div class="trip-label">Expedition Destination</div>
          <div class="trip-title">${tripDestination}</div>
          <p class="trip-meta">&bull; Dates: ${tripDates} &bull; Access Tier: ${roleLabel}</p>
        </div>

        <p class="body-text">
          As a member of this expedition circle, you will have access to live AI itinerary synthesis, luxury sanctuary curation, private aviation routing, and seamless expense splitting.
        </p>

        <div class="cta-container">
          <a href="${inviteLink}" class="cta-button">Join Expedition & Co-Plan &rarr;</a>
        </div>

        <p class="body-text" style="font-size: 11px; color: rgba(255, 255, 255, 0.45); text-align: center;">
          Or paste this direct VIP access link in your browser:<br/>
          <span style="color: #F5D794; word-break: break-all;">${inviteLink}</span>
        </p>
      </div>

      <div class="footer">
        TRIPORA RESERVE &bull; Global Concierge & Neural Spatial Routing Matrix<br/>
        Dispatched by Kyoto &amp; Zurich Concierge Desks &bull; <a href="https://news-main-five.vercel.app">news-main-five.vercel.app</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const transporter = getTransporter();
  if (!transporter) {
    console.warn('[TRIPORA MAILER] SMTP credentials not configured in environment variables.');
    return {
      messageId: `simulated-${Date.now()}`,
      response: 'SMTP credentials not configured; simulation mode active',
    } as any;
  }

  return await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: `Private Invitation: Join ${inviterName} on ${tripDestination} — TRIPORA RESERVE`,
    text: `${inviterName} has invited you to collaborate on ${tripDestination} (${tripDates}). Access your invitation: ${inviteLink}`,
    html,
  });
}

export interface SendBookingConfirmationParams {
  to: string;
  guestName: string;
  bookingRef: string;
  destination: string;
  dates: string;
  totalAmount: string;
  paymentMethod: string;
  inclusions?: string[];
  receiptLink: string;
}

export async function sendBookingConfirmationEmail({
  to,
  guestName,
  bookingRef,
  destination,
  dates,
  totalAmount,
  paymentMethod,
  inclusions = [
    '5-Star Private Sanctuary Reservation',
    'Lie-Flat Aviation Corridors with Priority Boarding',
    '24/7 Dedicated Concierge & WhatsApp Dispatch Hotline',
    'Curated Michelin Dining Allocations & Private Transfers',
  ],
  receiptLink,
}: SendBookingConfirmationParams) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TRIPORA RESERVE — Official Reservation Confirmation</title>
  <style>
    body { margin: 0; padding: 0; background-color: #080E0A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #080E0A; padding: 40px 0; }
    .container { max-width: 620px; margin: 0 auto; background-color: #0D1510; border: 1px solid rgba(197, 164, 106, 0.4); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
    .header { padding: 36px 36px 24px 36px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: linear-gradient(180deg, #14221A 0%, #0D1510 100%); }
    .brand-mark { font-size: 24px; letter-spacing: 0.15em; color: #FFFFFF; text-transform: uppercase; font-family: Georgia, serif; }
    .reserve-badge { font-size: 9px; letter-spacing: 0.2em; color: #F5D794; background: rgba(245, 215, 148, 0.18); border: 1px solid rgba(197, 164, 106, 0.5); padding: 3px 10px; border-radius: 9999px; margin-left: 8px; font-weight: 700; }
    .content { padding: 36px; }
    .status-badge { display: inline-block; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34D399; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; padding: 6px 14px; border-radius: 9999px; margin-bottom: 20px; }
    .h1 { font-family: Georgia, serif; font-size: 26px; line-height: 1.3; color: #FFFFFF; margin: 0 0 12px 0; }
    .sub { font-size: 14px; color: rgba(255, 255, 255, 0.7); line-height: 1.6; margin-bottom: 24px; }
    .card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(197, 164, 106, 0.25); border-radius: 16px; padding: 22px; margin-bottom: 24px; }
    .card-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 13px; }
    .card-row:last-child { border-bottom: none; }
    .label { color: rgba(255, 255, 255, 0.5); }
    .val { color: #FFFFFF; font-weight: 600; text-align: right; }
    .highlight { color: #F5D794; font-size: 16px; font-weight: 700; }
    .inclusions-list { margin: 16px 0 24px 0; padding-left: 20px; font-size: 13px; color: rgba(255, 255, 255, 0.8); line-height: 1.8; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #F5D794 0%, #C5A46A 100%); color: #080E0A; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
    .footer { padding: 24px 36px; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center; font-size: 11px; color: rgba(255, 255, 255, 0.4); line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="brand-mark">TRIPORA</span>
        <span class="reserve-badge">RESERVE</span>
      </div>
      <div class="content">
        <div style="text-align: center;">
          <span class="status-badge">✦ RESERVATION CONFIRMED &amp; DISPATCHED</span>
          <h1 class="h1">Your Expedition to ${destination} is Confirmed</h1>
          <p class="sub">Honored Guest <strong>${guestName}</strong>, your itinerary has been officially reserved through our private global desk. Our concierge team is actively preparing your arrival amenities.</p>
        </div>

        <div class="card">
          <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; color: #FFFFFF;">
            <tr>
              <td style="color: rgba(255,255,255,0.5);">Booking Reference</td>
              <td align="right" style="font-family: monospace; font-size: 14px; color: #F5D794; font-weight: 700;">${bookingRef}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.5);">Destination</td>
              <td align="right" style="font-weight: 600;">${destination}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.5);">Expedition Dates</td>
              <td align="right" style="font-weight: 600;">${dates}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.5);">Payment Method</td>
              <td align="right" style="font-weight: 600;">${paymentMethod}</td>
            </tr>
            <tr>
              <td style="color: rgba(255,255,255,0.5); padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">Total Amount Settled</td>
              <td align="right" style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 17px; color: #F5D794; font-weight: 700;">${totalAmount}</td>
            </tr>
          </table>
        </div>

        <h3 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #F5D794; margin: 24px 0 10px 0;">Confirmed Reserve Privileges</h3>
        <ul class="inclusions-list">
          ${inclusions.map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <div style="text-align: center; margin: 32px 0 16px 0;">
          <a href="${receiptLink}" class="cta-button">View Expedition Dossier &amp; Receipt &rarr;</a>
        </div>
      </div>
      <div class="footer">
        TRIPORA RESERVE &bull; Global Atelier &amp; Diplomatic Hospitality<br/>
        24/7 VIP Concierge Hotline: concierge@tripora.ai &bull; Zurich &amp; Kyoto Desks
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const transporter = getTransporter();
  if (!transporter) {
    console.warn('[TRIPORA MAILER] SMTP not configured; returning simulated confirmation.');
    return {
      messageId: `sim-booking-${Date.now()}`,
      response: 'Simulation mode',
    } as any;
  }

  return await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: `Reservation Confirmed [${bookingRef}]: ${destination} — TRIPORA RESERVE`,
    text: `Your reservation ${bookingRef} for ${destination} (${dates}) is confirmed. Total: ${totalAmount}. Access your receipt: ${receiptLink}`,
    html,
  });
}
