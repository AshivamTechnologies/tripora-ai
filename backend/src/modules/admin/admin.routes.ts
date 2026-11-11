import { Router } from 'express';
import { adminController } from './admin.controller';
import { authenticate, requireRole } from '../../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(requireRole('ADMIN'));

router.get('/overview', adminController.getOverview);
router.get('/users', adminController.listUsers);
router.get('/trips', adminController.listTrips);
router.get('/ai-usage', adminController.getAiUsage);
router.get('/providers', adminController.getProviders);
router.get('/audit-logs', adminController.getAuditLogs);

export const adminRoutes = router;
