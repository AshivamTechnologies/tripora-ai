import { Router } from 'express';
import { budgetsController } from './budgets.controller';
import { authenticate, requireTripRole } from '../../middleware/auth';

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get('/', requireTripRole('VIEWER'), budgetsController.getOverview);
router.get('/expenses', requireTripRole('VIEWER'), budgetsController.listExpenses);
router.post('/expenses', requireTripRole('EDITOR'), budgetsController.addExpense);
router.delete('/expenses/:expenseId', requireTripRole('EDITOR'), budgetsController.deleteExpense);

export const budgetRoutes = router;
