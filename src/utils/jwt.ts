import { AppJwtPayload, JwtTokens } from '../types/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Boom from '@hapi/boom';

dotenv.config({ quiet: true });

export function generateTokens(payload: AppJwtPayload): JwtTokens {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '10s' }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '10d' }
  );

  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): AppJwtPayload {
  try {
    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as AppJwtPayload;
  } catch (error) {
    throw Boom.unauthorized('Invalid access token');
  }
}

export function verifyRefreshToken(token: string): AppJwtPayload {
  try {
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as AppJwtPayload;
  } catch (error) {
    throw Boom.unauthorized('Invalid refresh token');
  }
}
