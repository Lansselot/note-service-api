import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Boom from '@hapi/boom';

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(Boom.badRequest('Validation failed', { errors: errors.array() }));
    return;
  }

  next();
};
