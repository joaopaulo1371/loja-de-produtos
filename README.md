# Loja de Produtos

Bem-vindo ao projeto **Loja de Produtos**, uma aplicação full-stack que simula uma vitrine de e-commerce. O projeto é composto por um **front-end** (desenvolvido com Angular, na pasta `view`) e um **back-end** (uma API RESTful em Node.js/Express, na pasta `backend`), permitindo a gestão de produtos, filtros, carrinho de compras e pedidos, com uma interface moderna e responsiva.

---

## 📋 Sobre o Projeto

A **Loja de Produtos** oferece:
- **Front-end**: Vitrine de produtos com filtros interativos (categoria, marca e pesquisa), carrinho de compras e notificações via pop-ups.
- **Back-end**: API RESTful para gerenciar produtos e processar pedidos.
- Design moderno com gradientes, animações e responsividade para dispositivos móveis e desktops.

O projeto foi criado para demonstrar habilidades em desenvolvimento full-stack, utilizando Angular, Node.js/Express e Sass para estilização avançada.

---

## 🚀 Tecnologias Utilizadas

### Front-end (pasta `view`)
- **Framework**: Angular
- **Linguagem**: TypeScript, HTML5, Sass
- **Dependências**: Poppins (via Google Fonts)
- **Ferramentas**: Node.js, npm, Angular CLI

### Back-end (pasta `backend`)
- **Framework**: Node.js/Express (ajuste se for diferente)
- **Linguagem**: JavaScript
- **Dependências**: `express`, `cors`, `body-parser` (ajuste conforme sua stack)
- **Ferramentas**: Node.js, npm
- **Banco de Dados** (opcional): [especifique, ex.: MongoDB, PostgreSQL]

---

## 📦 Pré-requisitos

### Para o Front-end
- [Node.js](https://nodejs.org/) (versão 16.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com Node.js)
- [Angular CLI](https://angular.io/cli) (instale com `npm install -g @angular/cli`)

### Para o Back-end
- [Node.js](https://nodejs.org/) (versão 16.x ou superior)
- [npm](https://www.npmjs.com/)
- [Banco de Dados] (se aplicável, ex.: MongoDB, PostgreSQL) e cliente correspondente

---

## 🛠️ Instalação

### 1. Configuração do Front-end
1. Navegue até a pasta `view`:

2. Instale as dependências:
npm install

3. Inicie o projeto:
 npm start/ ng serve

### 2. Configuração do Back-end
1. Navegue até a pasta `backend`:

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
