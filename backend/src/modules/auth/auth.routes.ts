import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { authLimiter } from '../../middleware/rate-limiter';
import {
  registerSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.schema';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getMe);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);

export const authRoutes = router;
