import { checkSchema } from 'express-validator';
import { emailValidation, nameValidation } from './fields/user.field';

export const putUserValidator = checkSchema({
  name: nameValidation,
  email: emailValidation,
});

export const patchUserValidator = checkSchema({
  name: { ...nameValidation, optional: true },
  email: { ...emailValidation, optional: true },
});
