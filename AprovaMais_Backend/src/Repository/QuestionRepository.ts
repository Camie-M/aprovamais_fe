// QuestionRepository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class QuestionRepository {
  async listQuestions(filters: any) {
    const {
      university,
      startYear,
      endYear,
      theme,
      subject,
      topic,
    } = filters;

    return await prisma.questions.findMany({
      where: {
        ...(university && { university }),
        ...(startYear && endYear && {
          year: {
            gte: parseInt(startYear),
            lte: parseInt(endYear),
          },
        }),
        ...(Array.isArray(theme) && theme.length > 0 && {
          theme: {
            hasSome: theme,
          },
        }),
        ...(Array.isArray(subject) && subject.length > 0 && {
          subject: {
            hasSome: subject,
          },
        }),
        ...(Array.isArray(topic) && topic.length > 0 && {
          topic: {
            hasSome: topic,
          },
        }),
      },
      select: {
        year: true,
        fase: true,
        university: true,
        theme: true,
        subject: true,
        topic: true,
        difficulty: true,
        question: true,
        alternatives: true,
        correct: true,
        solution: true,
      },
    });
  }
}
