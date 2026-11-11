import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';

export class UsersController {
  public async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await usersService.getProfile(req.user!.id);
      res.status(200).json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  public async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await usersService.updateProfile(req.user!.id, req.body);
      res.status(200).json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  }

  public async updatePreferences(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const prefs = await usersService.updatePreferences(req.user!.id, req.body);
      res.status(200).json({ success: true, data: prefs });
    } catch (err) {
      next(err);
    }
  }

  public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await usersService.deleteAccount(req.user!.id);
      res.status(200).json({ success: true, message: 'Account deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  public async exportData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await usersService.exportUserData(req.user!.id);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
