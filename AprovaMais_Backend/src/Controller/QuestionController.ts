import { Request, Response } from 'express';
import { QuestionEntity } from '../Entity/QuestionEntity';

const questionEntity = new QuestionEntity();

export const listQuestions = async (req: Request, res: Response) => {
  const filters = req.body;
  const questions = await questionEntity.listQuestions(filters);
  res.json(questions);
};
