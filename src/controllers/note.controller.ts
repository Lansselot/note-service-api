import { Response } from 'express';
import { userService, noteService } from '../services';
import { AuthRequest } from '../types/auth';

export class NoteController {
  async createNote(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const tokenUserId = req.userId!;

      const user = await userService.getUserById(tokenUserId);

      if (!user) {
        res.status(404).json({ message: 'Invalid token ' });
        return;
      }

      const newNote = await noteService.createNote({
        title,
        content,
        userId: tokenUserId,
      });
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create note' });
    }
  }

  async getAllNotesByUserId(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tokenUserId = req.userId!;
      const user = await userService.getUserById(tokenUserId);

      if (!user) {
        res.status(404).json({ message: 'Invalid token' });
        return;
      }

      const notes = await noteService.getAllNotesByUserId(tokenUserId);

      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get note' });
    }
  }

  async getNoteById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const noteId = req.params.id;
      const note = await noteService.getNoteById(noteId);
      const tokenUserId = req.userId!;

      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      if (note.userId !== tokenUserId) {
        res.status(403).json({ message: 'You do not have permission' });
        return;
      }

      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get note' });
    }
  }

  async updateNote(req: AuthRequest, res: Response): Promise<void> {
    try {
      const noteId = req.params.id;
      const note = await noteService.getNoteById(noteId);
      const data = req.body;
      const tokenUserId = req.userId!;

      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      if (note.userId !== tokenUserId) {
        res.status(403).json({ message: 'You do not have permission' });
        return;
      }

      const updatedNote = await noteService.updateNoteById(noteId, data);
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update note' });
    }
  }

  async deleteNote(req: AuthRequest, res: Response): Promise<void> {
    try {
      const noteId = req.params.id;
      const note = await noteService.getNoteById(noteId);
      const tokenUserId = req.userId!;

      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      if (note.userId !== tokenUserId) {
        res.status(403).json({ message: 'You do not have permission' });
        return;
      }

      await noteService.deleteNote(noteId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete note' });
    }
  }
}
