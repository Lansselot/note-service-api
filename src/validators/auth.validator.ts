import { checkSchema } from 'express-validator';
import {
  emailValidation,
  nameValidation,
  otpValidation,
  passwordValidation,
} from './fields/user.field';
import { tokenValidation } from './fields/auth.field';

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
  refreshToken: tokenValidation,
});

export const loginOTPValidator = checkSchema({
  email: emailValidation,
});

export const verifyOTPValidator = checkSchema({
  otp: otpValidation,
  email: emailValidation,
});
