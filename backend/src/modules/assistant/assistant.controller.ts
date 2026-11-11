import { Request, Response, NextFunction } from 'express';
import { assistantService } from './assistant.service';

export class AssistantController {
  public async chat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { message, tripId } = req.body;
      const result = await assistantService.chat(req.user ? req.user.id : 'anon', message, tripId);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const assistantController = new AssistantController();
