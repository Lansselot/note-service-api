import Boom from '@hapi/boom';
import { userService } from '.';
import bcrypt from 'bcryptjs';
import { AppJwtPayload, JwtTokens } from '../types/jwt';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';

export class AuthService {
  async login(email: string, password: string): Promise<JwtTokens> {
    const user = await userService.getUserByEmail(email);
    if (!user) throw Boom.unauthorized('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) throw Boom.unauthorized('Invalid email or password');

    const payload: AppJwtPayload = { userId: user.id };
    const tokens = generateTokens(payload);
    return tokens;
  }

  async refresh(refreshToken: string): Promise<JwtTokens> {
    const decoted = verifyRefreshToken(refreshToken);

    const payload: AppJwtPayload = { userId: decoted.userId };
    const tokens = generateTokens(payload);
    return tokens;
  }
}
