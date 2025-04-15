// QuestionEntity.ts
import { QuestionRepository } from "../Repository/QuestionRepository";

export class QuestionEntity {
  static async listQuestions(filters: any) {
    const repo = new QuestionRepository();
    return await repo.listQuestions(filters);
  }
}