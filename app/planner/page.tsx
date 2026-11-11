import { RequireAuth } from '@/components/auth/require-auth';
import { PlannerWizard } from '@/components/planner/planner-wizard';

type PlannerPageProps = {
  searchParams: { destination?: string };
};

export default function PlannerPage({ searchParams }: PlannerPageProps) {
  const initialDestination = (searchParams.destination ?? '').slice(0, 120);
  const returnPath = initialDestination
    ? `/planner?destination=${encodeURIComponent(initialDestination)}`
    : '/planner';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist">
      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-forest">Trip planner</p>
        <h1 className="mt-3 text-4xl text-brand-ink sm:text-5xl">Plan your next journey</h1>
      </div>
      <RequireAuth nextPath={returnPath}>
        <PlannerWizard initialDestination={initialDestination} />
      </RequireAuth>
    </div>
  );
}
