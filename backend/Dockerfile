# Usar a imagem oficial do Node.js versão 20
FROM node:20

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta que o aplicativo vai usar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]