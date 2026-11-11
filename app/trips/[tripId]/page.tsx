import { RequireAuth } from '@/components/auth/require-auth';
import { TripDetailView } from '@/components/trips/trip-detail-view';

export default function TripPage({ params }: { params: { tripId: string } }) {
  return (
    <RequireAuth nextPath={`/trips/${params.tripId}`}>
      <TripDetailView tripId={params.tripId} />
    </RequireAuth>
  );
}
