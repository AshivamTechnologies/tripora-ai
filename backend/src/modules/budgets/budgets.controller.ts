import { Request, Response, NextFunction } from 'express';
import { budgetsService } from './budgets.service';

export class BudgetsController {
  public async getOverview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const overview = await budgetsService.getBudgetOverview(req.params.tripId);
      res.status(200).json({
        success: true,
        data: overview,
      });
    } catch (err) {
      next(err);
    }
  }

  public async listExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const expenses = await budgetsService.listExpenses(req.params.tripId);
      res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (err) {
      next(err);
    }
  }

  public async addExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const expense = await budgetsService.addExpense(req.params.tripId, req.user!.id, req.body);
      res.status(201).json({
        success: true,
        data: expense,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await budgetsService.deleteExpense(req.params.tripId, req.params.expenseId);
      res.status(200).json({
        success: true,
        message: 'Expense deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

export const budgetsController = new BudgetsController();
