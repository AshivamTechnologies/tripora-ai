import { Request, Response, NextFunction } from 'express';
import { packingService } from './packing.service';

export class PackingController {
  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await packingService.getPackingList(req.params.tripId);
      res.status(200).json({
        success: true,
        data: list,
      });
    } catch (err) {
      next(err);
    }
  }

  public async toggle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await packingService.toggleItem(req.params.tripId, req.params.itemId, req.body.isPacked);
      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (err) {
      next(err);
    }
  }

  public async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await packingService.addItem(req.params.tripId, req.body);
      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await packingService.deleteItem(req.params.tripId, req.params.itemId);
      res.status(200).json({
        success: true,
        message: 'Item removed from packing list',
      });
    } catch (err) {
      next(err);
    }
  }

  public async generateAi(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await packingService.generateAiSuggestions(req.params.tripId);
      res.status(200).json({
        success: true,
        data: list,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const packingController = new PackingController();
