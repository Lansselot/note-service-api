import { Request } from 'express';
import { AppJwtPayload, JwtTokens } from '../types/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Boom from '@hapi/boom';

dotenv.config({ quiet: true });

export function getAccessTokenFromHeader(req: Request) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

export function generateTokens(payload: AppJwtPayload): JwtTokens {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '1d' }
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
