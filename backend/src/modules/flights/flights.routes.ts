import { Router } from 'express';
import { flightsController } from './flights.controller';
import { optionalAuthenticate, authenticate } from '../../middleware/auth';

const router = Router();

router.get('/search', optionalAuthenticate, flightsController.search);
router.post('/revalidate', optionalAuthenticate, flightsController.revalidate);
router.post('/save', authenticate, flightsController.save);

export const flightRoutes = router;
