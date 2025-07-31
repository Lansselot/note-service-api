import prisma from '../clients/prisma.client';
import { Note } from '@prisma/client';
import {
  CreateNoteDTO,
  GetNotesDTO,
  UpdateNoteDTO,
} from '../types/dto/note.dto';
import Boom from '@hapi/boom';
import { userService } from '.';
import { SortOrder } from '../types/enums/sort.enum';

export class NoteService {
  async createNote({ title, content, userId }: CreateNoteDTO): Promise<Note> {
    await userService.getUserById(userId);

    return prisma.note.create({
      data: { title, content, userId },
    });
  }

  async getNoteById(noteId: string, userId: string): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });
    if (!note || note!.userId !== userId) throw Boom.notFound('Note not found');

    return note;
  }

  async getAllNotesByUserId({
    userId,
    limit = 10,
    offset = 0,
    sortOrder = SortOrder.DESC,
  }: GetNotesDTO): Promise<Note[] | null> {
    await userService.getUserById(userId);

    return prisma.note.findMany({
      skip: offset,
      take: limit,
      where: { userId },
      orderBy: { createdAt: sortOrder },
    });
  }

  async updateNoteById(
    noteId: string,
    userId: string,
    { title, content }: UpdateNoteDTO
  ): Promise<Note | null> {
    const note = await this.getNoteById(noteId, userId);

    if (note!.userId !== userId) throw Boom.notFound('Note not found');

    return prisma.note.update({
      where: { id: noteId },
      data: { title, content },
    });
  }

  async deleteNote(noteId: string, userId: string): Promise<Note> {
    const note = await this.getNoteById(noteId, userId);

    if (note!.userId !== userId) throw Boom.notFound('Note not found');

    return prisma.note.delete({
      where: { id: noteId },
    });
  }
}
