import { Router } from 'express';
import {
  createNoteValidator,
  noteIdValidator,
  updateNoteValidator,
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
router.get('/', authenticate, noteController.getAllNotesByUserId);
router.get(
  '/:id',
  noteIdValidator,
  validate,
  authenticate,
  noteController.getNoteById
);
router.put(
  '/:id',
  createNoteValidator,
  noteIdValidator,
  validate,
  authenticate,
  noteController.updateNote
);
router.patch(
  '/:id',
  updateNoteValidator,
  noteIdValidator,
  validate,
  authenticate,
  noteController.updateNote
);
router.delete(
  '/:id',
  noteIdValidator,
  validate,
  authenticate,
  noteController.deleteNote
);

export default router;
