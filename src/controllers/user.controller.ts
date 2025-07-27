import { NextFunction, Request, Response } from 'express';
import { userService } from '../services';
import Boom from '@hapi/boom';

export class UserController {
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      if (!tokenUserId) throw Boom.unauthorized();

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
      if (!tokenUserId) throw Boom.unauthorized();

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
      if (!tokenUserId) throw Boom.unauthorized();

      await userService.deleteUser(tokenUserId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
