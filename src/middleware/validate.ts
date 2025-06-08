import express from 'express';
import { validationResult } from 'express-validator';

export const validate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const result = validationResult(req);
  //console.log(result);

  if (!result.isEmpty()) {
    res.status(400).json(result);
    return;
  }
  next();
};
