import { SortOrder } from '../../types/enums/sort.enum';
import { Location } from 'express-validator';

export const limitValidation = {
  in: ['query'] as Location[],
  isInt: {
    options: { min: 0 },
    errorMessage: 'Limit must be a non-negative integer.',
  },
  toInt: true,
  optional: true,
};

export const offsetValidation = {
  in: ['query'] as Location[],
  isInt: {
    options: { min: 0 },
    errorMessage: 'Offset must be a non-negative integer.',
  },
  toInt: true,
  optional: true,
};

export const orderValidation = {
  in: ['query'] as Location[],
  isIn: {
    options: [Object.values(SortOrder)],
    errorMessage: `Sort order must be one of: ${Object.values(SortOrder).join(
      ', '
    )}.`,
  },
  toLowerCase: true,
  optional: true,
};
