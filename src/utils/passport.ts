import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppJwtPayload } from '../types/jwt';
import Boom from '@hapi/boom';
import passport from '../config/passport/passport';
import { AuthStrategy } from '../types/passport';
import { AuthenticateOptions } from 'passport';

export function createPassportAuthMiddleware(
  strategy: AuthStrategy,
  options?: AuthenticateOptions
) {
  return function (req: Request, res: Response, next: NextFunction): void {
    passport.authenticate(
      strategy,
      { ...options },
      (err: any, user: AppJwtPayload | undefined, info: any) => {
        if (err || !user)
          return next(Boom.unauthorized('Invalid access token'));

        req.user = user;

        next();
      }
    )(req, res, next);
  };
}
