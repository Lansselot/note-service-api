import prisma from '../prisma-client';
import { Note } from '@prisma/client';

export class NoteService {
  async createNote(data: {
    title: string;
    content: string;
    userId: string;
  }): Promise<Note> {
    return prisma.note.create({
      data,
    });
  }

  async getAllNotes(): Promise<Note[]> {
    return prisma.note.findMany();
  }

  async getNoteById(id: string): Promise<Note | null> {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  async updateNoteById(id: string, data: Partial<Note>): Promise<Note | null> {
    return prisma.note.update({
      where: { id },
      data,
    });
  }

  async deleteNote(id: string): Promise<Note> {
    return prisma.note.delete({
      where: { id },
    });
  }
}
