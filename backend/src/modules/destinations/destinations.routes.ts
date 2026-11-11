import { Router } from 'express';
import { destinationsController } from './destinations.controller';

const router = Router();

router.get('/', destinationsController.list);
router.get('/:id', destinationsController.getById);
router.get('/:id/weather', destinationsController.getWeather);

export const destinationRoutes = router;
