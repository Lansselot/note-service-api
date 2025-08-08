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
      const { offset, limit, order, isFavorite } = req.query;

      let isFavoriteParsed: boolean | undefined;
      if (isFavorite === 'true') isFavoriteParsed = true;
      else if (isFavorite === 'false') isFavoriteParsed = false;
      else if (typeof isFavorite === 'undefined') isFavoriteParsed = undefined;

      const options: GetNotesDTO = {
        userId: tokenUserId as string,
        offset: offset ? parseInt(offset as string) : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        sortOrder: order as SortOrder,
        isFavorite: isFavoriteParsed,
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
      const { title, content, isFavorite }: UpdateNoteDTO = req.body;

      const updatedNote = await noteService.updateNoteById(
        noteId,
        tokenUserId,
        { title, content, isFavorite }
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
