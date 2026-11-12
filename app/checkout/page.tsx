import { RequireAuth } from '@/components/auth/require-auth';
import { LuxuryCheckoutView } from '@/components/checkout/luxury-checkout-view';

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: {
    tripId?: string;
    destination?: string;
    sanctuary?: string;
    price?: string;
  };
}) {
  const dest = searchParams?.destination || 'Bali Sacred Sanctuary & Forest Spa';
  const customHotel = searchParams?.sanctuary || (searchParams?.destination ? searchParams.destination.split(',')[0] : 'Mandapa, a Ritz-Carlton Reserve');
  const basePrice = searchParams?.price ? parseInt(searchParams.price, 10) * 6 : 7200;

  return (
    <RequireAuth nextPath="/checkout">
      <LuxuryCheckoutView
        trip={{
          tripId: searchParams?.tripId || 'trip-bali-001',
          destination: dest,
          dates: 'Nov 20 – Nov 26, 2026',
          travelers: 2,
          hotelName: customHotel,
          hotelPriceUSD: basePrice,
          flightRoute: 'Singapore Airlines First Class Suites (SIN → DPS)',
          flightPriceUSD: 5400,
          conciergePriceUSD: 450,
          totalUSD: basePrice + 5400 + 450 + 950 + 850,
          inclusions: [
            `5-Star Private Sanctuary Reservation at ${customHotel}`,
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
