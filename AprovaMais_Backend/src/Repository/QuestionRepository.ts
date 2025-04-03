import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class QuestionRepository {
  async listQuestions(filters: any) {
    return await prisma.questoes.findMany({
      where: filters,
      include: { alternatives: true },
    });
  }
}
