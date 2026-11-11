import { Request, Response, NextFunction } from 'express';
import { destinationsService } from './destinations.service';

export class DestinationsController {
  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const search = req.query.search as string;
      const country = req.query.country as string;
      const featured = req.query.featured ? req.query.featured === 'true' : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      const destinations = await destinationsService.listDestinations({ search, country, featured, limit });
      res.status(200).json({
        success: true,
        data: destinations,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const destination = await destinationsService.getDestinationById(req.params.id);
      res.status(200).json({
        success: true,
        data: destination,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const weather = await destinationsService.getDestinationWeather(req.params.id);
      res.status(200).json({
        success: true,
        data: weather,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const destinationsController = new DestinationsController();
