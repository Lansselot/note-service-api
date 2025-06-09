import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppJwtPayload } from '../types/jwt';
import { AuthRequest } from '../types/auth';

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

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = getTokenFromHeader(req);
  if (!token) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  try {
    const decoted = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AppJwtPayload;

    req.userId = decoted.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
