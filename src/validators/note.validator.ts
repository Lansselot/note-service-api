import { body } from 'express-validator';

export const createUserValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title must not be empty.')
    .isLength({ min: 2, max: 20 })
    .withMessage('Title must be between 2 and 20 characters long.'),
  body('content')
    .notEmpty()
    .withMessage('Content must not be empty.')
    .isLength({ min: 2 })
    .withMessage('Title must be at least 2 characters long.'),
];
