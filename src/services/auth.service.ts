import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import { AppJwtPayload, JwtTokens } from '../types/jwt';
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/jwt';
import redis from '../clients/redis.client';
import { randomUUID } from 'crypto';
import prisma from '../clients/prisma.client';
import { generateOTP } from '../utils/otp';
import { emailService, userService } from '.';
import { GoogleUserData } from '../types/passport';

export class AuthService {
  private async createSessionAndGenerateTokens(
    userId: string,
    sessionId?: string
  ): Promise<JwtTokens> {
    if (!sessionId) sessionId = randomUUID();

    const payload: AppJwtPayload = { userId, sessionId };
    const tokens = generateTokens(payload);

    await redis.set(
      `refresh:${userId}:${sessionId}`,
      tokens.refreshToken,
      'EX',
      60 * 60 * 24
    );

    return tokens;
  }

  async login(email: string, password: string): Promise<JwtTokens> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw Boom.unauthorized('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw Boom.unauthorized('Invalid email or password');

    return this.createSessionAndGenerateTokens(user.id);
  }

  async refresh(oldRefreshToken: string): Promise<JwtTokens> {
    const { userId, sessionId } = verifyRefreshToken(oldRefreshToken);
    const storedRefreshToken = await redis.get(
      `refresh:${userId}:${sessionId}`
    );

    if (!storedRefreshToken) throw Boom.unauthorized('Invalid refresh token');

    await redis.del(`refresh:${userId}:${sessionId}`);

    return this.createSessionAndGenerateTokens(userId, sessionId);
  }

  async logout(accessToken: string): Promise<void> {
    const { userId, sessionId } = verifyAccessToken(accessToken);

    await redis.del(`refresh:${userId}:${sessionId}`);
  }

  async loginOTP(email: string): Promise<void> {
    await userService.getUserByEmail(email);

    const otp = generateOTP();

    await redis.set(`otp:${email}`, otp.toString(), 'EX', 300);

    await emailService.sendEmail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });
  }

  async verifyOTP(email: string, otp: string): Promise<JwtTokens> {
    const user = await userService.getUserByEmail(email);

    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) throw Boom.unauthorized('Invalid OTP');

    await redis.del(`otp:${email}`);

    return this.createSessionAndGenerateTokens(user!.id);
  }

  async googleLogin(userData: GoogleUserData): Promise<JwtTokens> {
    const user = await userService.getUserByEmail(userData.email);

    return this.createSessionAndGenerateTokens(user!.id);
  }
}
