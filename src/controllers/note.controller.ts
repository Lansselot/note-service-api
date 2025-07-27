import { NextFunction, Request, Response } from 'express';
import { userService, noteService } from '../services';

export class NoteController {
  async createNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, content } = req.body;
      const tokenUserId = req.user!.userId;

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
      next(error);
    }
  }

  async getAllNotesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenUserId = req.user!.userId;
      const user = await userService.getUserById(tokenUserId);

      if (!user) {
        res.status(404).json({ message: 'Invalid token' });
        return;
      }

      const notes = await noteService.getAllNotesByUserId(tokenUserId);

      res.json(notes);
    } catch (error) {
      next(error);
    }
  }

  async getNoteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const noteId = req.params.id;
      const note = await noteService.getNoteById(noteId);
      const tokenUserId = req.user!.userId;

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
      next(error);
    }
  }

  async updateNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const noteId = req.params.id;
      const note = await noteService.getNoteById(noteId);
      const data = req.body;
      const tokenUserId = req.user!.userId;

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
      next(error);
    }
  }

  async deleteNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const noteId = req.params.id;
      const note = await noteService.getNoteById(noteId);
      const tokenUserId = req.user!.userId;

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
      next(error);
    }
  }
}
