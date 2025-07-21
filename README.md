# Loja de Produtos - Back-end

Bem-vindo ao back-end do projeto **Loja de Produtos**, uma API RESTful desenvolvida com Node.js/Express para suportar a vitrine de e-commerce. Esta API gerencia produtos e processa pedidos, integrando-se ao front-end (hospedado em outro repositório ou pasta `view`).

---

## 📋 Sobre o Projeto

O back-end da **Loja de Produtos** é responsável por:
- Fornecer endpoints para listar produtos e criar pedidos.
- Gerenciar a lógica de negócios e a persistência de dados (se aplicável).
- Integrar-se ao front-end via requisições HTTP.

O projeto foi criado para demonstrar habilidades em desenvolvimento de APIs com Node.js/Express, com foco em escalabilidade e manutenção.

---

## 🚀 Tecnologias Utilizadas

- **Framework**: Node.js/Express (ajuste se for diferente)
- **Linguagem**: JavaScript
- **Dependências**: `express`, `cors`, `body-parser` (ajuste conforme sua stack)
- **Ferramentas**: Node.js, npm
- **Banco de Dados** (opcional): [especifique, ex.: MongoDB, PostgreSQL]
- **Containerização**: Docker

---

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16.x ou superior) - para desenvolvimento local
- [npm](https://www.npmjs.com/) (geralmente incluído com Node.js)
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) - para execução via container
- [Banco de Dados] (se aplicável, ex.: MongoDB, PostgreSQL) e cliente correspondente

---

## 🛠️ Instalação

### 1. Instalação Local
1. Navegue até a pasta `backend`:
cd C:\Projects\Vitrine de Produtos\backend


2. Instale as dependências:
npm install

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do `backend` com as configurações necessárias (ex.: URL do banco, porta). Exemplo:
PORT=3000
DB_URL=mongodb://localhost:27017/loja

- Ajuste conforme sua configuração.

4. Inicie o servidor:
npm start

Ou, para desenvolvimento:
npm run dev

(Ajuste o script no `package.json` se necessário.)

5. A API estará disponível em `http://localhost:3000` (ajuste a porta conforme o `.env`).

### 2. Início com Docker
1. Certifique-se de que o Docker está instalado e em execução.

2. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do `backend` com as configurações necessárias (ex.: URL do banco, porta). Exemplo:
PORT=3000
DB_URL=mongodb://mongo:27017/loja

- Ajuste conforme sua configuração e o serviço de banco de dados no Docker.

3. Construa e inicie os containers:
- Se você tem um `docker-compose.yml`, execute:
docker-compose up --build


- Se usar apenas um `Dockerfile`, construa a imagem:
docker build -t loja-de-produtos-backend .

E inicie o container:
docker run -d -p 3000:3000 --env-file .env loja-de-produtos-backend


- Substitua `loja-de-produtos-backend` pelo nome da sua imagem, se diferente.

4. Verifique os containers em execução:
docker ps


5. A API estará disponível em `http://localhost:3000` (ajuste a porta conforme o mapeamento).

---

## Observações sobre Docker
- Certifique-se de que o `Dockerfile` ou `docker-compose.yml` está na pasta `backend` e configurado corretamente (ex.: expõe a porta 3000, mapeia volumes se necessário).
- Se usar um banco de dados como MongoDB, adicione-o ao `docker-compose.yml`. Exemplo básico:
```yaml
version: '3'
services:
 app:
   build: .
   ports:
     - "3000:3000"
   env_file:
     - .env
 mongo:
   image: mongo:latest
   ports:
     - "27017:27017"
🎮 Uso
Endpoints
GET /api/products - Lista todos os produtos.
POST /api/orders - Cria um novo pedido.
Body (exemplo):
json

{
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 2, "quantity": 1 }
  ]
}
Ajuste os endpoints e payloads conforme sua implementação.
