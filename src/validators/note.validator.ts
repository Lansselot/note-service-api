import { checkSchema } from 'express-validator';
import {
  contentValidation,
  isFavoriteValidation,
  titleValidation,
} from './fields/note.field';
import { idValidation } from './fields/common.field';
import {
  isFavoriteQueryValidation,
  limitValidation,
  offsetValidation,
  orderValidation,
} from './fields/query-params.field';

export const createNoteValidator = checkSchema({
  title: titleValidation,
  content: contentValidation,
});

export const noteIdValidator = checkSchema({
  noteId: idValidation,
});

export const putNoteValidator = checkSchema({
  title: titleValidation,
  content: contentValidation,
  isFavorite: isFavoriteValidation,
});

export const patchNoteValidator = checkSchema({
  title: { ...titleValidation, optional: true },
  content: { ...contentValidation, optional: true },
  isFavorite: { ...isFavoriteValidation, optional: true },
});

export const getNoteValidator = checkSchema({
  offset: offsetValidation,
  limit: limitValidation,
  order: orderValidation,
  isFavorite: isFavoriteQueryValidation,
});
