import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('API de Questões está on!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
