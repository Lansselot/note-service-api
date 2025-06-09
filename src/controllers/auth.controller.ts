import { Request, Response } from 'express';
import { userService } from '../services';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        res
          .status(409)
          .json({ message: 'User with this email already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userService.createUser({
        name,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await userService.getUserByEmail(email);

      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  }
}
