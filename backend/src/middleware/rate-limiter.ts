import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const noopMiddleware = (_req: Request, _res: Response, next: NextFunction) => next();

export const standardLimiter =
  process.env.NODE_ENV === 'test'
    ? noopMiddleware
    : rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          success: false,
          error: {
            code: 'TOO_MANY_REQUESTS',
            message: 'Too many requests. Please slow down and try again later.',
          },
        },
      });

export const authLimiter =
  process.env.NODE_ENV === 'test'
    ? noopMiddleware
    : rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          success: false,
          error: {
            code: 'TOO_MANY_AUTH_ATTEMPTS',
            message: 'Too many authentication attempts. Please try again after 15 minutes.',
          },
        },
      });

export const aiLimiter =
  process.env.NODE_ENV === 'test'
    ? noopMiddleware
    : rateLimit({
        windowMs: 60 * 1000,
        max: 30,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
          success: false,
          error: {
            code: 'AI_RATE_LIMIT_EXCEEDED',
            message: 'AI generation rate limit exceeded. Please wait a moment before trying again.',
          },
        },
      });
