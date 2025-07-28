import { checkSchema } from 'express-validator';
import { contentValidation, titleValidation } from './fields/note.field';
import { idValidation } from './fields/common.field';

export const createNoteValidator = checkSchema({
  title: titleValidation,
  content: contentValidation,
});

export const noteIdValidator = checkSchema({
  id: idValidation,
});

export const putNoteValidator = createNoteValidator;

export const patchNoteValidator = checkSchema({
  title: { ...titleValidation, optional: true },
  content: { ...contentValidation, optional: true },
});
