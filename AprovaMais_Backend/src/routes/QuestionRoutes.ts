import { Router } from 'express';
import { listQuestions } from '../Controller/QuestionController';

const router = Router();

router.post('/filter', listQuestions);

export default router;
