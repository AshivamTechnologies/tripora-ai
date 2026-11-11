import { Router } from 'express';
import { tripsController } from './trips.controller';
import { authenticate, requireTripRole } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { createTripSchema, updateTripSchema } from './trips.schema';

const router = Router();

router.use(authenticate);

router.get('/', tripsController.list);
router.post('/', validate(createTripSchema), tripsController.create);
router.get('/:id', requireTripRole('VIEWER'), tripsController.getById);
router.patch('/:id', requireTripRole('EDITOR'), validate(updateTripSchema), tripsController.update);
router.delete('/:id', requireTripRole('OWNER'), tripsController.delete);
router.post('/:id/complete', requireTripRole('EDITOR'), tripsController.complete);
router.post('/:id/cancel', requireTripRole('OWNER'), tripsController.cancel);

export const tripRoutes = router;
