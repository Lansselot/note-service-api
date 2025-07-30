import { NextFunction, Request, Response } from 'express';
import { authService, userService } from '../services';
import { ChangeEmailDTO, ChangePasswordDTO } from '../types/dto/user.dto';

export class UserController {
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;

      const user = await userService.getUserById(tokenUserId);

      res.json({
        id: user!.id,
        name: user!.name,
        email: user!.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;

      const data = req.body;

      const updatedUser = await userService.updateUserById(tokenUserId, data);
      res.json({
        id: updatedUser!.id,
        name: updatedUser!.name,
        email: updatedUser!.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;

      const accessToken = req.accessToken;

      await userService.deleteUser(tokenUserId);
      await authService.logout(accessToken!);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async changeEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const data: ChangeEmailDTO = req.body;

      const updatedUser = await userService.changeEmail(tokenUserId, data);
      res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const data: ChangePasswordDTO = req.body;

      await userService.changePassword(tokenUserId, data);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
