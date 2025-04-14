# 📚 Projeto AprovaMais - Backend

## 💡 Introdução
Este projeto é o backend do sistema AprovaMais, desenvolvido para gerenciamento de questões e usuários. Ele utiliza Node.js, Express e Prisma, com um banco de dados PostgreSQL rodando em um container Podman.

---

## 📋 Pré-requisitos
Para rodar o projeto, certifique-se de ter instalado os seguintes programas:

- **Podman**: Para rodar os containers.
  - Instalação: [Podman](https://podman.io/docs/installation)
- **Node.js**: Para rodar o backend.
  - Download: [Node.js](https://nodejs.org/)
- **Git**: Para clonar o projeto.
  - Download: [Git](https://git-scm.com/)

---

## ⚙️ Configuração do Ambiente

### 📁 Estrutura do arquivo `.env`
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
# Banco de Dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=senhaexemplo
POSTGRES_DB=aprovamais
DB_PORT=5455
DB_HOST=localhost

# URL do Banco de Dados para Prisma
DATABASE_URL="postgres://postgres:senhaexemplo@localhost:5455/aprovamais"

# Porta da aplicação
PORT=3001
```

---

## 🐋 Rodando o Banco de Dados no Podman

### 🚀 Iniciando o Container do Banco de Dados

Execute o seguinte comando no terminal:

```
podman-compose up -d
```

Ou o comando:

```
podman run -p 5455:5432 --name aprovamais-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=senhaexemplo -e POSTGRES_DB=aprovamais -v aprovamais_data:/var/lib/postgresql/data -d docker.io/library/postgres:15
```

**Explicação do Comando:**
- `podman run`: Inicia um novo contêiner.
- `-p 5455:5432`: Mapeia a porta 5432 do container para a 5455 da máquina.
- `--name aprovamais-db`: Nome do container.
- `-e`: Define variáveis de ambiente.
- `-v`: Mapeia um volume para persistência dos dados.
- `-d`: Roda em segundo plano.
- `docker.io/library/postgres:15`: Imagem oficial do PostgreSQL.

### ✅ Verificando o Container
Para garantir que o container está rodando:
```
podman ps -a
```

---

---

## 🟢 Rodando o Backend no Modo Debug

Execute o seguinte comando para rodar o backend com depuração:
```
npm run debug
```

### 🔍 Acessando a API
Após iniciar, acesse no navegador ou via curl:
```
curl http://localhost:3001/
```

### 🛠️ Visualizando as Rotas
- GET /users -> Listar usuários
- POST /users -> Criar usuário
- PUT /users/:id -> Atualizar usuário
- DELETE /users/:id -> Deletar usuário
- POST /questions/filter -> Listar questões com filtros

---

## 🛑 Parando o Banco de Dados e o Backend

### 🔴 Parando o Container
```
podman stop aprovamais-db
```

### 🗑️ Remover o Container (opcional)
```
podman rm aprovamais-db
```

### 🚫 Parando o Backend
Se estiver rodando no terminal, pressione:
```
Ctrl + C
```

---

## ❓ Dúvidas e Problemas
Em caso de problemas, verifique os logs do Podman com:
```
podman logs aprovamais-db
```
Se precisar de ajuda, entre em contato com o time de desenvolvimento.

