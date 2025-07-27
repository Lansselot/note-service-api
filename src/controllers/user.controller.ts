import { Request, Response } from 'express';
import { userService } from '../services';

export class UserController {
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const user = await userService.getUserById(tokenUserId);

      if (!user) {
        res.status(404).json({ message: 'Invalid token' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const data = req.body;

      const user = await userService.getUserById(tokenUserId);

      if (!user) {
        res.status(404).json({ message: 'Invalid token' });
        return;
      }

      const updatedUser = await userService.updateUserById(tokenUserId, data);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;

      const user = await userService.getUserById(tokenUserId);

      if (!user) {
        res.status(404).json({ message: 'Invalid token' });
        return;
      }

      await userService.deleteUser(tokenUserId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }
}
