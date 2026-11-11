import { toMinorUnits } from '@/lib/money';
import { inclusiveDayCount, todayISODate } from '@/lib/dates';
import type { NewTripInput, TravelStyle } from '@/lib/trips';

export const PLANNER_STEPS = [
  { id: 'destination', label: 'Destination' },
  { id: 'dates', label: 'Dates' },
  { id: 'travellers', label: 'Travellers' },
  { id: 'style', label: 'Travel style' },
  { id: 'budget', label: 'Budget' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'review', label: 'Review' },
] as const;

export const MAX_TRIP_DAYS = 61;

export type PlannerDraft = {
  destination: string;
  otherDestinations: string[];
  origin: string;
  startDate: string;
  endDate: string;
  flexibleDates: boolean;
  adults: number;
  children: number;
  infants: number;
  travelStyles: TravelStyle[];
  budgetAmount: string;
  budgetScope: 'PER_PERSON' | 'GROUP';
  currency: string;
  accommodation: string;
  transport: string;
  pace: string;
  food: string;
  activities: string;
  accessibility: string;
  avoid: string;
  specialRequests: string;
};

export type PlannerErrors = Partial<Record<keyof PlannerDraft, string>>;

export function createInitialDraft(initialDestination: string): PlannerDraft {
  return {
    destination: initialDestination,
    otherDestinations: [],
    origin: '',
    startDate: '',
    endDate: '',
    flexibleDates: false,
    adults: 2,
    children: 0,
    infants: 0,
    travelStyles: [],
    budgetAmount: '',
    budgetScope: 'GROUP',
    currency: 'USD',
    accommodation: '',
    transport: '',
    pace: 'Balanced',
    food: '',
    activities: '',
    accessibility: '',
    avoid: '',
    specialRequests: '',
  };
}

export function travellerCount(draft: Pick<PlannerDraft, 'adults' | 'children' | 'infants'>): number {
  return draft.adults + draft.children + draft.infants;
}

export function validateStep(stepId: (typeof PLANNER_STEPS)[number]['id'], draft: PlannerDraft): PlannerErrors {
  const errors: PlannerErrors = {};

  if (stepId === 'destination') {
    if (draft.destination.trim().length < 2) {
      errors.destination = 'Enter the main destination (at least 2 characters).';
    }
    if (draft.origin.trim().length > 120) {
      errors.origin = 'Keep the origin under 120 characters.';
    }
  }

  if (stepId === 'dates') {
    if (!draft.startDate) errors.startDate = 'Choose a departure date.';
    if (!draft.endDate) errors.endDate = 'Choose a return date.';
    if (draft.startDate && draft.startDate < todayISODate()) {
      errors.startDate = 'The departure date cannot be in the past.';
    }
    if (draft.startDate && draft.endDate) {
      if (draft.endDate < draft.startDate) {
        errors.endDate = 'The return date must be on or after the departure date.';
      } else if (inclusiveDayCount(draft.startDate, draft.endDate) > MAX_TRIP_DAYS) {
        errors.endDate = `Trips can be at most ${MAX_TRIP_DAYS} days long.`;
      }
    }
  }

  if (stepId === 'travellers') {
    if (draft.adults < 1) errors.adults = 'At least one adult is required.';
    if (draft.adults > 20 || draft.children > 20 || draft.infants > 20) {
      errors.adults = 'Group size is limited to 20 per age group.';
    }
  }

  if (stepId === 'style') {
    if (draft.travelStyles.length === 0) {
      errors.travelStyles = 'Choose at least one travel style.';
    }
  }

  if (stepId === 'budget') {
    const amount = Number(draft.budgetAmount);
    if (draft.budgetAmount.trim() === '' || !Number.isFinite(amount) || amount < 0) {
      errors.budgetAmount = 'Enter a budget of zero or more.';
    } else if (amount > 100_000_000) {
      errors.budgetAmount = 'Enter a realistic budget.';
    }
  }

  if (stepId === 'preferences') {
    const longFields: (keyof PlannerDraft)[] = [
      'food',
      'activities',
      'accessibility',
      'avoid',
      'specialRequests',
    ];
    for (const field of longFields) {
      if (String(draft[field]).length > 500) {
        errors[field] = 'Keep this under 500 characters.';
      }
    }
  }

  return errors;
}

export function validateAllSteps(draft: PlannerDraft): { stepIndex: number; errors: PlannerErrors } | null {
  for (let index = 0; index < PLANNER_STEPS.length - 1; index += 1) {
    const errors = validateStep(PLANNER_STEPS[index].id, draft);
    if (Object.keys(errors).length > 0) return { stepIndex: index, errors };
  }
  return null;
}

export function buildNewTrip(draft: PlannerDraft): NewTripInput {
  const travellers = travellerCount(draft);
  const amount = Number(draft.budgetAmount);
  const totalAmount = draft.budgetScope === 'PER_PERSON' ? amount * travellers : amount;

  return {
    destination: draft.destination.trim(),
    origin: draft.origin.trim(),
    startDate: draft.startDate,
    endDate: draft.endDate,
    adults: draft.adults,
    children: draft.children,
    infants: draft.infants,
    travelStyles: draft.travelStyles,
    budgetMinor: toMinorUnits(totalAmount, draft.currency),
    currency: draft.currency,
    notes: draft.specialRequests.trim(),
    preferences: {
      accommodation: draft.accommodation,
      transport: draft.transport,
      pace: draft.pace,
      food: draft.food.trim(),
      activities: draft.activities.trim(),
      accessibility: draft.accessibility.trim(),
      avoid: draft.avoid.trim(),
      specialRequests: draft.specialRequests.trim(),
      otherDestinations: draft.otherDestinations,
      flexibleDates: draft.flexibleDates,
      budgetScope: draft.budgetScope,
    },
  };
}
