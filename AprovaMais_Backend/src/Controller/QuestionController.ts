import { Request, Response } from 'express';
import { QuestionEntity } from '../Entity/QuestionEntity';

export async function listQuestions(req: Request, res: Response) {
  try {
    const questions = await QuestionEntity.listQuestions(req.body);
    res.status(200).send(questions);
  } catch (error) {
    console.error('Erro ao listar questões:', error);
    res.status(500).json({ error: 'Erro ao listar questões' });
  }
}
