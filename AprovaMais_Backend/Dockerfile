# Imagem base
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start"]
