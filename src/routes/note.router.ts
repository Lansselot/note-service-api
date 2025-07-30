import { Router } from 'express';
import {
  createNoteValidator,
  noteIdValidator,
  putNoteValidator,
  patchNoteValidator,
  getNoteValidator,
} from '../validators/note.validator';
import { validate } from '../middleware/validate.middleware';
import { noteController } from '../controllers';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post(
  '/',
  createNoteValidator,
  validate,
  authenticate,
  noteController.createNote
);
router.get(
  '/',
  getNoteValidator,
  validate,
  authenticate,
  noteController.getAllNotesByUserId
);
router.get(
  '/:noteId',
  noteIdValidator,
  validate,
  authenticate,
  noteController.getNoteById
);
router.put(
  '/:noteId',
  noteIdValidator,
  putNoteValidator,
  validate,
  authenticate,
  noteController.updateNote
);
router.patch(
  '/:noteId',
  noteIdValidator,
  patchNoteValidator,
  validate,
  authenticate,
  noteController.updateNote
);
router.delete(
  '/:noteId',
  noteIdValidator,
  validate,
  authenticate,
  noteController.deleteNote
);

export default router;
