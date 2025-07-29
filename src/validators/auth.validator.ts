import { checkSchema } from 'express-validator';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from './fields/user.field';

export const registerValidator = checkSchema({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const loginValidator = checkSchema({
  email: emailValidation,
  password: passwordValidation,
});

export const refreshTokenValidator = checkSchema({
  refreshToken: {
    isString: true,
    notEmpty: true,
    errorMessage: 'Refresh token is required',
  },
});
