import { PLANNER_STEPS, createInitialDraft, type PlannerDraft } from '@/lib/planner-draft';

export type SavedPlannerDraft = {
  draft: PlannerDraft;
  stepIndex: number;
};

const STORAGE_KEY = 'tripora_planner_draft_v1';

export async function loadPlannerDraft(): Promise<SavedPlannerDraft | null> {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed.draft !== 'object') return null;
    return {
      draft: { ...createInitialDraft(''), ...parsed.draft },
      stepIndex: Math.min(Math.max(Number(parsed.stepIndex) || 0, 0), PLANNER_STEPS.length - 1),
    };
  } catch {
    return null;
  }
}

export async function savePlannerDraft(draft: PlannerDraft, stepIndex: number): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ draft, stepIndex, updatedAt: new Date().toISOString() }));
  } catch {}
}

export async function clearPlannerDraft(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
