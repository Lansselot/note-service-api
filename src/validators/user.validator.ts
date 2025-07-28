import { checkSchema } from 'express-validator';
import { nameValidation } from './fields/user.field';

export const putUserValidator = checkSchema({
  name: nameValidation,
});

export const patchUserValidator = checkSchema({
  name: { ...nameValidation, optional: true },
});
