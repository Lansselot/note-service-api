import { checkSchema } from 'express-validator';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from './fields/user.field';

export const putUserValidator = checkSchema({
  name: nameValidation,
});

export const patchUserValidator = checkSchema({
  name: { ...nameValidation, optional: true },
});

export const changeEmailValidator = checkSchema({
  newEmail: emailValidation,
  password: passwordValidation,
});

export const changePasswordValidator = checkSchema({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
});
