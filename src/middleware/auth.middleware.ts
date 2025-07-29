import { Request, Response, NextFunction } from 'express';
import { AppJwtPayload } from '../types/jwt';
import Boom from '@hapi/boom';
import { verifyAccessToken } from '../utils/jwt';

function getTokenFromHeader(req: Request) {
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

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = getTokenFromHeader(req);
  if (!token) {
    next(Boom.unauthorized('Invalid token'));
    return;
  }

  try {
    const decoted = verifyAccessToken(token);

    if (!req.user) req.user = {} as AppJwtPayload;
    req.user!.userId = decoted.userId;

    next();
  } catch (error) {
    next(Boom.unauthorized('Invalid token'));
  }
}
