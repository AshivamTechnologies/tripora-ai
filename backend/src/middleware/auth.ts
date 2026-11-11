import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { mockStore } from '../database/mock-store';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPPORT';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication token required' },
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwt.secret) as AuthenticatedUser;
    req.user = payload;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        error: { code: 'TOKEN_EXPIRED', message: 'Session expired. Please refresh your token.' },
      });
      return;
    }
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid or forged authentication token' },
    });
  }
}

export function optionalAuthenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, config.jwt.secret) as AuthenticatedUser;
      req.user = payload;
    } catch {
      // Ignore optional auth errors
    }
  }
  next();
}

export function requireRole(...roles: Array<'USER' | 'ADMIN' | 'SUPPORT'>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient permission for this resource' },
      });
      return;
    }

    next();
  };
}

export function requireTripRole(minimumRole: 'OWNER' | 'EDITOR' | 'VIEWER') {
  const roleHierarchy: Record<'OWNER' | 'EDITOR' | 'VIEWER', number> = {
    OWNER: 3,
    EDITOR: 2,
    VIEWER: 1,
  };

  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
      return;
    }

    // Admins always have access
    if (req.user.role === 'ADMIN') {
      return next();
    }

    const tripId = req.params.tripId || req.params.id;
    if (!tripId) {
      return next();
    }

    const trip = mockStore.trips.get(tripId);
    if (!trip) {
      res.status(404).json({ success: false, error: { code: 'TRIP_NOT_FOUND', message: 'Trip not found' } });
      return;
    }

    // Direct owner check
    if (trip.ownerId === req.user.id) {
      return next();
    }

    // Check membership
    const member = Array.from(mockStore.members.values()).find(
      (m) => m.tripId === tripId && m.userId === req.user?.id
    );

    if (!member || roleHierarchy[member.role] < roleHierarchy[minimumRole]) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: `Requires at least ${minimumRole} permissions on this trip` },
      });
      return;
    }

    next();
  };
}
