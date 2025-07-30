import Boom from '@hapi/boom';
import { userService } from '.';
import bcrypt from 'bcryptjs';
import { AppJwtPayload, JwtTokens } from '../types/jwt';
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/jwt';
import '../redis-client';
import redis from '../redis-client';
import { randomUUID } from 'crypto';

export class AuthService {
  async login(email: string, password: string): Promise<JwtTokens> {
    const user = await userService.getUserByEmail(email);
    if (!user) throw Boom.unauthorized('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw Boom.unauthorized('Invalid email or password');

    const sessionId = randomUUID();
    const payload: AppJwtPayload = { userId: user.id, sessionId };

    const tokens = generateTokens(payload);

    await redis.set(
      `refresh:${user.id}:${sessionId}`,
      tokens.refreshToken,
      'EX',
      60 * 60 * 24
    );

    return tokens;
  }

  async refresh(oldRefreshToken: string): Promise<JwtTokens> {
    const { userId, sessionId } = verifyRefreshToken(oldRefreshToken);
    const storedRefreshToken = await redis.get(
      `refresh:${userId}:${sessionId}`
    );

    if (!storedRefreshToken) throw Boom.unauthorized('Invalid refresh token');

    await redis.del(`refresh:${userId}:${sessionId}`);

    const payload: AppJwtPayload = {
      userId: userId,
      sessionId: sessionId,
    };

    const tokens = generateTokens(payload);

    await redis.set(
      `refresh:${payload.userId}:${payload.sessionId}`,
      tokens.refreshToken,
      'EX',
      60 * 60 * 24
    );

    return tokens;
  }

  async logout(accessToken: string): Promise<void> {
    const { userId, sessionId } = verifyAccessToken(accessToken);

    await redis.del(`refresh:${userId}:${sessionId}`);

    await redis.set(`blacklist:${accessToken}`, 'logout', 'EX', 60 * 60);
  }
}
