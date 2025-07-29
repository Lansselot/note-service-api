import Boom from '@hapi/boom';
import { userService } from '.';
import bcrypt from 'bcryptjs';
import { AppJwtPayload, JwtTokens } from '../types/jwt';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import '../redis-client';
import redis from '../redis-client';

export class AuthService {
  async login(email: string, password: string): Promise<JwtTokens> {
    const user = await userService.getUserByEmail(email);
    if (!user) throw Boom.unauthorized('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw Boom.unauthorized('Invalid email or password');

    const payload: AppJwtPayload = { userId: user.id };
    const tokens = generateTokens(payload);

    await redis.set(
      `refresh:${user.id}:${tokens.refreshToken}`,
      1,
      'EX',
      60 * 60 * 24
    );

    return tokens;
  }

  async refresh(oldRefreshToken: string): Promise<JwtTokens> {
    const decoted = verifyRefreshToken(oldRefreshToken);
    const storedRefreshToken = await redis.exists(
      `refresh:${decoted.userId}:${oldRefreshToken}`
    );

    if (!storedRefreshToken) throw Boom.unauthorized('Invalid refresh token');

    await redis.del(`refresh:${decoted.userId}:${oldRefreshToken}`);

    const payload: AppJwtPayload = { userId: decoted.userId };
    const tokens = generateTokens(payload);

    await redis.set(
      `refresh:${decoted.userId}:${tokens.refreshToken}`,
      1,
      'EX',
      60 * 60 * 24
    );

    return tokens;
  }
}
