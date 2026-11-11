import { Request, Response, NextFunction } from 'express';
import { flightsService } from './flights.service';

export class FlightsController {
  public async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await flightsService.searchFlights({
        origin: req.query.origin as string,
        destination: req.query.destination as string,
        departureDate: req.query.departureDate as string,
        returnDate: req.query.returnDate as string,
        adults: req.query.adults ? parseInt(req.query.adults as string, 10) : 1,
        cabinClass: req.query.cabinClass as any,
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  public async revalidate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await flightsService.revalidateOffer(req.body.offerId);
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
      const booking = await flightsService.saveFlightToTrip(req.body.tripId, req.body.offer);
      res.status(201).json({
        success: true,
        data: booking,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const flightsController = new FlightsController();
