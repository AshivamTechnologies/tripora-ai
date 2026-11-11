import { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service';

export class AdminController {
  public async getOverview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await adminService.getOverview();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  public async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await adminService.listUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  public async listTrips(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trips = await adminService.listTrips();
      res.status(200).json({
        success: true,
        data: trips,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getAiUsage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const usage = await adminService.getAiUsage();
      res.status(200).json({
        success: true,
        data: usage,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getProviders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const providers = await adminService.getProviders();
      res.status(200).json({
        success: true,
        data: providers,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getAuditLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await adminService.getAuditLogs();
      res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const adminController = new AdminController();
