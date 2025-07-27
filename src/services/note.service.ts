import prisma from '../prisma-client';
import { Note } from '@prisma/client';
import { CreateNoteDTO, UpdateNoteDTO } from '../types/dto/note.dto';
import Boom from '@hapi/boom';
import { userService } from '.';

export class NoteService {
  async createNote(data: CreateNoteDTO): Promise<Note> {
    await userService.getUserById(data.userId);

    return prisma.note.create({
      data,
    });
  }

  async getNoteById(noteId: string): Promise<Note | null> {
    const note = prisma.note.findUnique({
      where: { id: noteId },
    });
    if (!note) throw Boom.notFound('Note not found');

    return note;
  }

  async getAllNotesByUserId(userId: string): Promise<Note[] | null> {
    await userService.getUserById(userId);

    return prisma.note.findMany({
      where: { userId },
    });
  }

  async updateNoteById(
    noteId: string,
    data: UpdateNoteDTO
  ): Promise<Note | null> {
    await this.getNoteById(noteId);

    return prisma.note.update({
      where: { id: noteId },
      data,
    });
  }

  async deleteNote(noteId: string): Promise<Note> {
    await this.getNoteById(noteId);

    return prisma.note.delete({
      where: { id: noteId },
    });
  }
}
