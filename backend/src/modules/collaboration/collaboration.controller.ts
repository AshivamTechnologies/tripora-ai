import { Request, Response, NextFunction } from 'express';
import { collaborationService } from './collaboration.service';

export class CollaborationController {
  public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const members = await collaborationService.listMembers(req.params.tripId);
      res.status(200).json({
        success: true,
        data: members,
      });
    } catch (err) {
      next(err);
    }
  }

  public async invite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await collaborationService.inviteMember(
        req.params.tripId,
        req.body.email,
        req.body.role
      );
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  public async accept(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const member = await collaborationService.acceptInvitation(req.params.token, req.user!.id);
      res.status(200).json({
        success: true,
        data: member,
      });
    } catch (err) {
      next(err);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await collaborationService.removeMember(req.params.tripId, req.params.memberId);
      res.status(200).json({
        success: true,
        message: 'Member removed from trip',
      });
    } catch (err) {
      next(err);
    }
  }
}

export const collaborationController = new CollaborationController();
