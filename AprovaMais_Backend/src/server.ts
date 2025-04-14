import express from 'express';
import userRoutes from './routes/UserRoutes';
import questionRoutes from './routes/QuestionRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

app.get('/', (req, res) => {
  res.send('API AprovaMais está no ar!');
});

const showRoutes = () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log('📂 Rotas disponíveis:');
  console.log(`  - GET    /users          -> Listar usuários`);
  console.log(`  - POST   /users          -> Criar usuário`);
  console.log(`  - PUT    /users/:id      -> Atualizar usuário`);
  console.log(`  - DELETE /users/:id      -> Deletar usuário`);
  console.log(`  - POST   /questions/filter -> Listar questões com filtros`);
};

app.listen(PORT, () => {
  showRoutes();
});
