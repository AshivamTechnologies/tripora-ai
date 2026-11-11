import { Request, Response, NextFunction } from 'express';
import { hotelsService } from './hotels.service';

export class HotelsController {
  public async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await hotelsService.searchHotels({
        destination: req.query.destination as string,
        checkInDate: req.query.checkInDate as string,
        checkOutDate: req.query.checkOutDate as string,
        guests: req.query.guests ? parseInt(req.query.guests as string, 10) : 2,
        rooms: req.query.rooms ? parseInt(req.query.rooms as string, 10) : 1,
        starRating: req.query.starRating ? parseFloat(req.query.starRating as string) : undefined,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  public async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking = await hotelsService.saveHotelToTrip(req.body.tripId, req.body.hotel);
      res.status(201).json({
        success: true,
        data: booking,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const hotelsController = new HotelsController();
