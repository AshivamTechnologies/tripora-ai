import { Router } from 'express';
import { hotelsController } from './hotels.controller';
import { optionalAuthenticate, authenticate } from '../../middleware/auth';

const router = Router();

router.get('/search', optionalAuthenticate, hotelsController.search);
router.post('/save', authenticate, hotelsController.save);

export const hotelRoutes = router;
