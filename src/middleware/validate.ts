import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = validationResult(req);
  //console.log(result);

  if (!result.isEmpty()) {
    res.status(400).json(result);
    return;
  }
  next();
};
