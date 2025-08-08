import { SortOrder } from '../enums/sort.enum';

export type CreateNoteDTO = { title: string; content: string; userId: string };
export type UpdateNoteDTO = {
  title?: string;
  content?: string;
  isFavorite?: boolean;
};

export type GetNotesDTO = {
  userId: string;
  offset?: number;
  limit?: number;
  sortOrder?: SortOrder;
  isFavorite?: boolean;
};
