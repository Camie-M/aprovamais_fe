import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(username: string, password: string, role: string, school: string) {
    return await prisma.users.create({
      data: { username, password, role, school },
    });
  }

  async updateUser(id: number, data: Partial<{ username: string, password: string, role: string, school: string }>) {
    return await prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return await prisma.users.delete({ where: { id } });
  }

  async listUsers() {
    return await prisma.users.findMany();
  }
}
