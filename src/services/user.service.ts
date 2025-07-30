import prisma from '../prisma-client';
import { User } from '@prisma/client';
import {
  ChangeEmailDTO,
  ChangePasswordDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from '../types/dto/user.dto';
import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser({ name, email, password }: CreateUserDTO): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      throw Boom.conflict('User with this email already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw Boom.notFound('User not found');

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw Boom.notFound('User not found');

    return user;
  }

  async updateUserById(userId: string, { name }: UpdateUserDTO): Promise<User> {
    await this.getUserById(userId);

    return prisma.user.update({
      where: { id: userId },
      data: { name },
    });
  }

  async deleteUser(userId: string): Promise<User> {
    await this.getUserById(userId);

    return prisma.user.delete({
      where: { id: userId },
    });
  }
}
