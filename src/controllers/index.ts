import { AuthController } from './auth.controller';
import { NoteController } from './note.controller';
import { UserController } from './user.controller';

export const userController = new UserController();
export const noteController = new NoteController();
export const authController = new AuthController();
