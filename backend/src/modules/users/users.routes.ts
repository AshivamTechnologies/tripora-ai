import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/profile', usersController.getProfile);
router.patch('/profile', usersController.updateProfile);
router.patch('/preferences', usersController.updatePreferences);
router.delete('/account', usersController.deleteAccount);
router.get('/export', usersController.exportData);

export const userRoutes = router;
