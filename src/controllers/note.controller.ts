import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';
import { UserService } from '../services/user.service';

const noteService = new NoteService();
const userService = new UserService();

export class NoteController {
  async createNote(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, userId } = req.body;

      const user = await userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: 'userId must be valid' });
        return;
      }

      const newNote = await noteService.createNote({ title, content, userId });
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create note' });
    }
  }

  async getAllNotes(req: Request, res: Response): Promise<void> {
    try {
      const notes = await noteService.getAllNotes();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get notes' });
    }
  }

  async getAllNotesByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const user = await userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
      }

      const notes = await noteService.getAllNotesByUserId(userId);

      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get note' });
    }
  }

  async getNoteById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const note = await noteService.getNoteById(id);

      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      res.json(note);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get note' });
    }
  }

  async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;

      const note = await noteService.getNoteById(id);

      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      const updatedNote = await noteService.updateNoteById(id, data);
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update note' });
    }
  }

  async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const note = await noteService.getNoteById(id);

      if (!note) {
        res.status(404).json({ message: 'Note not found' });
        return;
      }

      await noteService.deleteNote(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete note' });
    }
  }
}
