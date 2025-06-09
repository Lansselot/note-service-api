import { Router } from 'express';
import {
  createNoteValidator,
  noteIdValidator,
  updateNoteValidator,
  userIdNoteValidator,
} from '../validators/note.validator';
import { validate } from '../middleware/validate';
import { noteController } from '../controllers';

const router = Router();

router.post('/', createNoteValidator, validate, noteController.createNote);
router.get('/', noteController.getAllNotes);
router.get(
  '/user/:userId',
  userIdNoteValidator,
  validate,
  noteController.getAllNotesByUserId
);
router.get('/:id', noteIdValidator, validate, noteController.getNoteById);
router.put(
  '/:id',
  createNoteValidator,
  noteIdValidator,
  validate,
  noteController.updateNote
);
router.patch(
  '/:id',
  updateNoteValidator,
  noteIdValidator,
  validate,
  noteController.updateNote
);
router.delete('/:id', noteIdValidator, validate, noteController.deleteNote);

export default router;
