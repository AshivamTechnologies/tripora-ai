import { Router } from 'express';
import { assistantController } from './assistant.controller';
import { optionalAuthenticate } from '../../middleware/auth';
import { aiLimiter } from '../../middleware/rate-limiter';

const router = Router();

router.post('/chat', optionalAuthenticate, aiLimiter, assistantController.chat);

export const assistantRoutes = router;
