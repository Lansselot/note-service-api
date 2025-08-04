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
import { jwtAuthenticate } from '../middleware/auth.middleware';
const router = Router();

router.post(
  '/',
  createNoteValidator,
  validate,
  jwtAuthenticate,
  noteController.createNote
);
router.get(
  '/',
  getNoteValidator,
  validate,
  jwtAuthenticate,
  noteController.getAllNotesByUserId
);
router.get(
  '/:noteId',
  noteIdValidator,
  validate,
  jwtAuthenticate,
  noteController.getNoteById
);
router.put(
  '/:noteId',
  noteIdValidator,
  putNoteValidator,
  validate,
  jwtAuthenticate,
  noteController.updateNote
);
router.patch(
  '/:noteId',
  noteIdValidator,
  patchNoteValidator,
  validate,
  jwtAuthenticate,
  noteController.updateNote
);
router.delete(
  '/:noteId',
  noteIdValidator,
  validate,
  jwtAuthenticate,
  noteController.deleteNote
);

export default router;
