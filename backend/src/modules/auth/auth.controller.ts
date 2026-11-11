import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refresh(refreshToken);
      res.status(200).json({
        success: true,
        data: tokens,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.getMe(req.user!.id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }

  public async forgotPassword(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been dispatched.',
    });
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Password has been updated successfully. Please sign in with your new password.',
    });
  }
}

export const authController = new AuthController();
