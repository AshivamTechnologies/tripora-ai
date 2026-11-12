import { RequireAuth } from '@/components/auth/require-auth';
import { PlannerWizard } from '@/components/planner/planner-wizard';
import { Sparkles, Compass } from 'lucide-react';

type PlannerPageProps = {
  searchParams: { destination?: string };
};

export default function PlannerPage({ searchParams }: PlannerPageProps) {
  const initialDestination = (searchParams.destination ?? '').slice(0, 120);
  const returnPath = initialDestination
    ? `/planner?destination=${encodeURIComponent(initialDestination)}`
    : '/planner';

  return (
    <div className="min-h-screen bg-brand-mist/30 pb-28 pt-10">
      <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-forest/20 bg-brand-forest/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-forest mb-2">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            Bespoke Itinerary Studio &bull; Tripora Atelier
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-brand-ink tracking-tight">
            Curate Your Next Expedition
          </h1>
          <p className="mt-2 text-sm text-brand-muted font-light max-w-2xl leading-relaxed">
            Define your dates, travel tempo, budget, and cultural preferences. Our spatial atelier will optimize morning, afternoon, and evening slots with realistic walking buffers.
          </p>
        </div>
      </div>
      <RequireAuth nextPath={returnPath}>
        <PlannerWizard initialDestination={initialDestination} />
      </RequireAuth>
    </div>
  );
}
