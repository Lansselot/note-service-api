import { Location } from 'express-validator';

export const idValidation = {
  in: ['params'] as Location[],
  isUUID: true,
  errorMessage: 'ID must be a valid UUID.',
};
