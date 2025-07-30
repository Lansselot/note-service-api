import { NextFunction, Request, Response } from 'express';
import { noteService } from '../services';
import {
  CreateNoteDTO,
  GetNotesDTO,
  UpdateNoteDTO,
} from '../types/dto/note.dto';
import { SortOrder } from '../types/enums/sort.enum';

export class NoteController {
  async createNote(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, content }: CreateNoteDTO = req.body;
      const tokenUserId = req.user!.userId;

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
      const { offset, limit, order } = req.query;

      const options: GetNotesDTO = {
        userId: tokenUserId as string,
        offset: offset ? parseInt(offset as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        sortOrder: order as SortOrder,
      };

      const notes = await noteService.getAllNotesByUserId(options);

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
      const { noteId } = req.params;
      const tokenUserId = req.user!.userId;

      const note = await noteService.getNoteById(noteId, tokenUserId);

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
      const { noteId } = req.params;
      const tokenUserId = req.user!.userId;
      const data: UpdateNoteDTO = req.body;

      const updatedNote = await noteService.updateNoteById(
        noteId,
        tokenUserId,
        data
      );
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
      const { noteId } = req.params;
      const tokenUserId = req.user!.userId;

      await noteService.deleteNote(noteId, tokenUserId);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
