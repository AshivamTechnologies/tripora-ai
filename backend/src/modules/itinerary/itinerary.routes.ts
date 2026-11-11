import { Router } from 'express';
import { itineraryController } from './itinerary.controller';
import { authenticate, requireTripRole } from '../../middleware/auth';
import { aiLimiter } from '../../middleware/rate-limiter';

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get('/', requireTripRole('VIEWER'), itineraryController.get);
router.post('/generate', requireTripRole('EDITOR'), aiLimiter, itineraryController.generate);
router.post('/activities', requireTripRole('EDITOR'), itineraryController.addActivity);
router.patch('/activities/:activityId', requireTripRole('EDITOR'), itineraryController.updateActivity);
router.delete('/activities/:activityId', requireTripRole('EDITOR'), itineraryController.deleteActivity);
router.post('/reorder', requireTripRole('EDITOR'), itineraryController.reorder);
router.post('/days/:dayId/optimize', requireTripRole('EDITOR'), itineraryController.optimize);
router.post('/days/:dayId/regenerate', requireTripRole('EDITOR'), aiLimiter, itineraryController.regenerateDay);

export const itineraryRoutes = router;
