import { checkSchema } from 'express-validator';
import { contentValidation, titleValidation } from './fields/note.field';
import { idValidation } from './fields/common.field';
import { off } from 'process';
import {
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

export const putNoteValidator = createNoteValidator;

export const patchNoteValidator = checkSchema({
  title: { ...titleValidation, optional: true },
  content: { ...contentValidation, optional: true },
});

export const getNoteValidator = checkSchema({
  offset: offsetValidation,
  limit: limitValidation,
  order: orderValidation,
});
