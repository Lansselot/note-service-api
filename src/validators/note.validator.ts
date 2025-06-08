import { body, param } from 'express-validator';

export const createNoteValidator = [
  body('title')
    .isString()
    .withMessage('title must be string.')
    .isLength({ min: 2, max: 20 })
    .withMessage('title must be between 2 and 20 characters long.'),
  body('content')
    .isString()
    .withMessage('content must be string.')
    .isLength({ max: 300 })
    .withMessage('content must be no more than 300 characters long.'),
  body('userId').isUUID().withMessage('userId must be UUID'),
];

export const noteIdValidator = [
  param('id').isUUID().withMessage('id must be valid'),
];

export const updateNoteValidator = [
  body('title')
    .optional()
    .isString()
    .withMessage('title must be string.')
    .isLength({ min: 2, max: 20 })
    .withMessage('title must be between 2 and 20 characters long.'),
  body('content')
    .optional()
    .isString()
    .withMessage('content must be string.')
    .isLength({ max: 300 })
    .withMessage('content must be no more than 300 characters long.'),
  body('userId').optional().isUUID().withMessage('userId must be UUID'),
];
