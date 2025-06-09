import { Response } from 'express';
import { userService } from '../services';
import { AuthRequest } from '../types/auth';

export class UserController {
  async getUserById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tokenUserId = req.userId!;
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

  async updateUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tokenUserId = req.userId!;
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

  async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tokenUserId = req.userId!;

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
