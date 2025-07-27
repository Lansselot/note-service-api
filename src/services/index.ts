import { AuthService } from './auth.service';
import { NoteService } from './note.service';
import { UserService } from './user.service';

export const userService = new UserService();
export const noteService = new NoteService();
export const authService = new AuthService();
