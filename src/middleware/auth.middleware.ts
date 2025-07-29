import { Request, Response, NextFunction } from 'express';
import { AppJwtPayload } from '../types/jwt';
import Boom from '@hapi/boom';
import { getAccessTokenFromHeader, verifyAccessToken } from '../utils/jwt';
import redis from '../redis-client';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = getAccessTokenFromHeader(req);
  if (!accessToken) {
    next(Boom.unauthorized('Invalid token'));
    return;
  }

  try {
    const decoted = verifyAccessToken(accessToken);

    if (!req.user) req.user = {} as AppJwtPayload;
    req.user!.userId = decoted.userId;

    const tokenRevoked = await redis.exists(`blacklist:${accessToken}`);
    if (tokenRevoked) next(Boom.unauthorized('Token is revoked'));

    next();
  } catch (error) {
    next(Boom.unauthorized('Invalid token'));
  }
}
