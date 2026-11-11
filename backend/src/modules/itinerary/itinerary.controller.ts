import { Request, Response, NextFunction } from 'express';
import { itineraryService } from './itinerary.service';

export class ItineraryController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const itinerary = await itineraryService.getItinerary(req.params.tripId);
      res.status(200).json({
        success: true,
        data: itinerary,
      });
    } catch (err) {
      next(err);
    }
  }

  public async generate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const itinerary = await itineraryService.generateAiItinerary(req.params.tripId, req.user!.id);
      res.status(200).json({
        success: true,
        data: itinerary,
      });
    } catch (err) {
      next(err);
    }
  }

  public async addActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activity = await itineraryService.addActivity(req.params.tripId, req.body.dayId, req.body);
      res.status(201).json({
        success: true,
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  public async updateActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activity = await itineraryService.updateActivity(req.params.tripId, req.params.activityId, req.body);
      res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await itineraryService.deleteActivity(req.params.tripId, req.params.activityId);
      res.status(200).json({
        success: true,
        message: 'Activity removed successfully',
      });
    } catch (err) {
      next(err);
    }
  }

  public async reorder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activities = await itineraryService.reorderActivities(
        req.params.tripId,
        req.body.dayId,
        req.body.orderedIds
      );
      res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (err) {
      next(err);
    }
  }

  public async optimize(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const activities = await itineraryService.optimizeSchedule(req.params.tripId, req.params.dayId);
      res.status(200).json({
        success: true,
        data: activities,
      });
    } catch (err) {
      next(err);
    }
  }

  public async regenerateDay(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const day = await itineraryService.regenerateDay(req.params.tripId, req.params.dayId, req.user!.id);
      res.status(200).json({
        success: true,
        data: day,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const itineraryController = new ItineraryController();
