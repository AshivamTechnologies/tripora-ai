import { Router } from 'express';
import { packingController } from './packing.controller';
import { authenticate, requireTripRole } from '../../middleware/auth';

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get('/', requireTripRole('VIEWER'), packingController.get);
router.post('/items', requireTripRole('EDITOR'), packingController.add);
router.patch('/items/:itemId/toggle', requireTripRole('EDITOR'), packingController.toggle);
router.delete('/items/:itemId', requireTripRole('EDITOR'), packingController.delete);
router.post('/generate-ai', requireTripRole('EDITOR'), packingController.generateAi);

export const packingRoutes = router;
