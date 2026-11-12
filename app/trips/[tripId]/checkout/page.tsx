import { RequireAuth } from '@/components/auth/require-auth';
import { LuxuryCheckoutView } from '@/components/checkout/luxury-checkout-view';

export default function TripCheckoutPage({
  params,
}: {
  params: { tripId: string };
}) {
  return (
    <RequireAuth nextPath={`/trips/${params.tripId}/checkout`}>
      <LuxuryCheckoutView
        trip={{
          tripId: params.tripId,
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
        }}
      />
    </RequireAuth>
  );
}
