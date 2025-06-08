import { body, param } from 'express-validator';

export const createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('name must not be empty.')
    .isString()
    .withMessage('name must be string.')
    .isLength({ min: 2, max: 10 })
    .withMessage('name must be between 2 and 10 characters long.'),
  body('email')
    .notEmpty()
    .withMessage('email must not be empty.')
    .isEmail()
    .withMessage('email must be valid.'),
  body('password')
    .isString()
    .withMessage('name must be string.')
    .notEmpty()
    .withMessage('password must not be empty.'),
];

export const userIdValidator = [
  param('id').isUUID().withMessage('id must be valid'),
];

export const updateUserValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('name must not be empty.')
    .isString()
    .withMessage('name must be string.')
    .isLength({ min: 2, max: 10 })
    .withMessage('name must be between 2 and 10 characters long.'),
  body('email')
    .optional()
    .notEmpty()
    .withMessage('email must not be empty.')
    .isEmail()
    .withMessage('email must be valid.'),
  body('password')
    .optional()
    .isString()
    .withMessage('name must be string.')
    .notEmpty()
    .withMessage('password must not be empty.'),
];
