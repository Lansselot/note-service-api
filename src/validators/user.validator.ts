import { body } from 'express-validator';

export const createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name must not be empty.')
    .isLength({ min: 2, max: 10 })
    .withMessage('Name must be between 2 and 10 characters long.'),
  body('email')
    .notEmpty()
    .withMessage('Email must not be empty.')
    .isEmail()
    .withMessage('Email must be valid.'),
];
