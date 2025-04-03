import { QuestionRepository } from "../Repository/QuestionRepository";


const questionRepository = new QuestionRepository();

export class QuestionEntity {
  async listQuestions(filters: any) {
    return await questionRepository.listQuestions(filters);
  }
}
