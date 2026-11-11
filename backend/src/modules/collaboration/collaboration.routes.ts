import { Router } from 'express';
import { collaborationController } from './collaboration.controller';
import { authenticate, requireTripRole } from '../../middleware/auth';

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get('/', requireTripRole('VIEWER'), collaborationController.list);
router.post('/invite', requireTripRole('OWNER'), collaborationController.invite);
router.post('/accept/:token', collaborationController.accept);
router.delete('/:memberId', requireTripRole('OWNER'), collaborationController.remove);

export const collaborationRoutes = router;
