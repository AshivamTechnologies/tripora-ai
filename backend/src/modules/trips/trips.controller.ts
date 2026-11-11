import { Request, Response, NextFunction } from 'express';
import { tripsService } from './trips.service';

export class TripsController {
  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trips = await tripsService.listUserTrips(req.user!.id);
      res.status(200).json({
        success: true,
        data: trips,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await tripsService.getTripById(req.params.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trip = await tripsService.createTrip(req.user!.id, req.body);
      res.status(201).json({
        success: true,
        data: trip,
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trip = await tripsService.updateTrip(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await tripsService.deleteTrip(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Trip removed successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  public async complete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trip = await tripsService.completeTrip(req.params.id);
      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (err) {
      next(err);
    }
  }

  public async cancel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const trip = await tripsService.cancelTrip(req.params.id);
      res.status(200).json({
        success: true,
        data: trip,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const tripsController = new TripsController();
