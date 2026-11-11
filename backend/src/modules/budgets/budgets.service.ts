import { v4 as uuidv4 } from 'uuid';
import { mockStore, MockExpense } from '../../database/mock-store';
import { AppError } from '../../middleware/error';

export class BudgetsService {
  public async getBudgetOverview(tripId: string) {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    const expenses = Array.from(mockStore.expenses.values()).filter((e) => e.tripId === tripId);
    const totalSpentMinor = expenses.reduce((sum, e) => sum + e.amountMinor, 0);
    const remainingMinor = trip.budgetMinor - totalSpentMinor;
    const isOverBudget = totalSpentMinor > trip.budgetMinor;

    const categoryBreakdown: Record<string, number> = {
      ACCOMMODATION: 0,
      FLIGHT: 0,
      ACTIVITY: 0,
      FOOD: 0,
      TRANSPORT: 0,
      MISCELLANEOUS: 0,
    };

    expenses.forEach((e) => {
      categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amountMinor;
    });

    return {
      tripId,
      currency: trip.currency,
      totalBudgetMinor: trip.budgetMinor,
      totalSpentMinor,
      remainingMinor,
      isOverBudget,
      percentageUsed: trip.budgetMinor > 0 ? Math.min(100, Math.round((totalSpentMinor / trip.budgetMinor) * 100)) : 0,
      categoryBreakdown,
      expensesCount: expenses.length,
    };
  }

  public async listExpenses(tripId: string): Promise<MockExpense[]> {
    return Array.from(mockStore.expenses.values())
      .filter((e) => e.tripId === tripId)
      .sort((a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime());
  }

  public async addExpense(
    tripId: string,
    payerId: string,
    data: {
      title: string;
      category: MockExpense['category'];
      amountMinor: number;
      currency?: string;
      notes?: string;
      expenseDate?: string;
      splits?: Array<{ memberId: string; shareMinor: number }>;
    }
  ): Promise<MockExpense> {
    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      throw new AppError('Trip not found', 404, 'TRIP_NOT_FOUND');
    }

    const payer = mockStore.users.get(payerId);
    const expenseId = `exp-${uuidv4()}`;

    // Calculate default equal splits if not provided
    const tripMembers = Array.from(mockStore.members.values()).filter((m) => m.tripId === tripId);
    const splits = data.splits && data.splits.length > 0
      ? data.splits.map((s) => {
          const m = tripMembers.find((mem) => mem.id === s.memberId);
          return {
            memberId: s.memberId,
            memberName: m?.fullName || 'Traveler',
            shareMinor: s.shareMinor,
            isSettled: s.memberId === payerId,
          };
        })
      : tripMembers.map((m) => ({
          memberId: m.id,
          memberName: m.fullName,
          shareMinor: Math.round(data.amountMinor / Math.max(1, tripMembers.length)),
          isSettled: m.userId === payerId,
        }));

    const expense: MockExpense = {
      id: expenseId,
      tripId,
      payerId,
      payerName: payer?.profile?.fullName || 'Trip Planner',
      title: data.title,
      category: data.category || 'MISCELLANEOUS',
      amountMinor: data.amountMinor,
      currency: data.currency || trip.currency,
      exchangeRate: 1.0,
      baseAmountMinor: data.amountMinor,
      expenseDate: data.expenseDate || new Date().toISOString().slice(0, 10),
      isPaid: true,
      notes: data.notes,
      splits,
    };

    mockStore.expenses.set(expenseId, expense);
    return expense;
  }

  public async deleteExpense(tripId: string, expenseId: string): Promise<void> {
    const expense = mockStore.expenses.get(expenseId);
    if (!expense || expense.tripId !== tripId) {
      throw new AppError('Expense not found', 404, 'EXPENSE_NOT_FOUND');
    }
    mockStore.expenses.delete(expenseId);
  }
}

export const budgetsService = new BudgetsService();
