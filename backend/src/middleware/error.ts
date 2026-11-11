import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: any;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  // If headers already sent, delegate to default express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Zod Validation Errors
  if (err instanceof ZodError) {
    const formatted = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request input payload',
        details: formatted,
      },
    });
    return;
  }

  // Known Application Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  // Fallback internal server error
  console.error('[Unhandled Exception]:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' ? 'An unexpected server error occurred' : err.message,
    },
  });
}
