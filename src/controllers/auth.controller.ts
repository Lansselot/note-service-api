import { NextFunction, Request, Response } from 'express';
import { authService, userService } from '../services';
import {
  LoginUserDTO,
  verifyOtpDTO,
  RegisterUserDTO,
} from '../types/dto/auth.dto';

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: RegisterUserDTO = req.body;

      const newUser = await userService.createUser(data);
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: LoginUserDTO = req.body;

      const tokens = await authService.login(data);

      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;

      const tokens = await authService.refresh(refreshToken);

      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accessToken = req.accessToken;

      await authService.logout(accessToken!);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async loginOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;

      await authService.loginOTP(email);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async verifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: verifyOtpDTO = req.body;

      const tokens = await authService.verifyOTP(data);

      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokens = await authService.googleLogin(req.googleUser!);
      res.json(tokens);
    } catch (error) {
      next(error);
    }
  }
}
