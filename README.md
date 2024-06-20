### README.md

# Projeto de Desenvolvimento Back-end II

Este projeto é um desafio de desenvolvimento Back-end usando Node.js, Express, e outras tecnologias. Ele inclui funcionalidades como autenticação JWT, caching, operações CRUD com banco de dados e testes automatizados.

## Índice

- [Descrição do Projeto](#descrição-do-projeto)
- [Dependências](#dependências)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Endpoints](#endpoints)
- [Autenticação JWT](#autenticação-jwt)
- [Caching](#caching)
- [Testes](#testes)
- [Logs de Caching](#logs-de-caching)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Demonstrativo em Vídeo](#demonstrativo-em-vídeo)

## Descrição do Projeto

Este projeto foi desenvolvido para atender ao desafio de Desenvolvimento Back-end II, que inclui:

- Operações CRUD para `clientes`, `produtos` e `usuarios`
- Autenticação JWT
- Caching com `node-cache`
- Testes automatizados com Jest e Supertest
- Logs para operações de caching

## Dependências

As seguintes dependências são usadas neste projeto:

- node.js
- express
- dotenv
- http-errors
- jade
- morgan
- mysql2
- jsonwebtoken (JWT)
- node-cache
- jest
- supertest

## Configuração do Ambiente

1. Clone o repositório do GitHub.
2. Navegue até o diretório do projeto.
3. Execute `npm install` para instalar as dependências.
4. Configure o arquivo `.env` com as variáveis de ambiente necessárias.
5. Execute os scripts SQL em `models/createTables.sql` para criar as tabelas no banco de dados.

## Endpoints

### /clientes
- **GET**: `GET http://localhost:3000/clientes`
- **POST**: `POST http://localhost:3000/clientes`
  - Body: `{ "nome": "John", "sobrenome": "Doe", "email": "john.doe@example.com", "idade": 30 }`
- **PUT**: `PUT http://localhost:3000/clientes/:id`
  - Body: `{ "nome": "John", "sobrenome": "Doe", "email": "john.doe@example.com", "idade": 31 }`
- **DELETE**: `DELETE http://localhost:3000/clientes/:id`

### /produtos
- **GET**: `GET http://localhost:3000/produtos`
- **POST**: `POST http://localhost:3000/produtos`
  - Body: `{ "nome": "Produto A", "descricao": "Descricao do Produto A", "preco": 100, "data_atualizado": "2023-06-17T10:00:00Z" }`
- **PUT**: `PUT http://localhost:3000/produtos/:id`
  - Body: `{ "nome": "Produto A", "descricao": "Descricao do Produto A", "preco": 120, "data_atualizado": "2023-06-17T10:00:00Z" }`
- **DELETE**: `DELETE http://localhost:3000/produtos/:id`

### /usuarios
- **GET**: `GET http://localhost:3000/usuarios`
- **POST**: `POST http://localhost:3000/usuarios`
  - Body: `{ "usuario": "user1", "senha": "senha123" }`
- **PUT**: `PUT http://localhost:3000/usuarios/:id`
  - Body: `{ "usuario": "user1", "senha": "senha456" }`
- **DELETE**: `DELETE http://localhost:3000/usuarios/:id`

### /login
- **POST**: `POST http://localhost:3000/login`
  - Body: `{ "usuario": "admin", "senha": "senha123" }`

### /logout
- **POST**: `POST http://localhost:3000/logout`
  - Header: `Authorization: Bearer <token>`

## Autenticação JWT

- **Login**: Gera um token JWT ao fazer login com um usuário válido.
- **Logout**: Invalida o token JWT.
- **Endpoints Protegidos**: Requisições para `/clientes` exigem um token JWT válido.

## Caching

- Middleware de cache implementado para o endpoint `/clientes`.
- Cache expira em 30 segundos.
- Logs gerados para operações de cache e banco de dados.

## Testes

- Suite de testes automatizados com Jest e Supertest.
- Cobertura de testes para todas as operações CRUD e autenticação.
- Inclui casos de teste para validação de campos e autenticação JWT.

### Testes Implementados

#### Arquivo: `tests/health.test.js`

**GET /**

- **Testa se está tudo OK com o servidor:**
  - Verifica se a resposta contém o status `200` e o texto é `OK`.


#### Arquivo: `tests/clientes.test.js`

**POST /clientes**

- **Testa se um novo cliente é criado:**
  - Envia um cliente válido e verifica se a resposta contém um `id` e o status é `201`.

**GET /clientes**

- **Testa se todos os clientes são retornados e o resultado é cacheado:**
  - Faz uma requisição `GET` e verifica se o status é `200` e a resposta é um array.
  - Faz uma segunda requisição `GET` para verificar se o resultado é obtido do cache.

**PUT /clientes/:id**

- **Testa se um cliente é atualizado e o cache é invalidado:**
  - Atualiza um cliente existente e verifica se a resposta contém a mensagem de sucesso e o status é `200`.

**DELETE /clientes/:id**

- **Testa se um cliente é deletado e o cache é invalidado:**
  - Deleta um cliente existente e verifica se a resposta contém a mensagem de sucesso e o status é `200`.

#### Arquivo: `tests/produtos.test.js`

**POST /produtos**

- **Testa se um novo produto é criado:**
  - Envia um produto válido e verifica se a resposta contém um `id` e o status é `201`.

**GET /produtos**

- **Testa se todos os produtos são retornados:**
  - Faz uma requisição `GET` e verifica se o status é `200` e a resposta é um array.

**PUT /produtos/:id**

- **Testa se um produto é atualizado:**
  - Atualiza um produto existente e verifica se a resposta contém a mensagem de sucesso e o status é `200`.

**DELETE /produtos/:id**

- **Testa se um produto é deletado:**
  - Deleta um produto existente e verifica se a resposta contém a mensagem de sucesso e o status é `200`.

#### Arquivo: `tests/usuarios.test.js`

**POST /usuarios**

- **Testa se um novo usuário é criado:**
  - Envia um usuário válido e verifica se a resposta contém um `id` e o `usuario` e o status é `201`.

**POST /login**

- **Testa se o login retorna um token:**
  - Envia credenciais válidas e verifica se a resposta contém um `token` e o status é `200`.

**POST /logout**

- **Testa se o logout invalida o token:**
  - Faz login para obter um token, depois faz logout e verifica se a resposta contém a mensagem de sucesso e o status é `200`.

#### Arquivo: `tests/setupTests.js`

- **Configuração do Banco de Dados para Testes:**
  - Configura e limpa o banco de dados antes e depois dos testes.


Para rodar os testes:
```bash
npm test
```

## Logs de Caching

- Logs são gerados para indicar se a resposta veio do cache ou do banco de dados.

## Como Executar o Projeto

1. Inicie o servidor:
```bash
npm start
```
2. Use Thunder Client para testar os endpoints:
   - **GET /clientes**
   - **POST /clientes**
   - **PUT /clientes/:id**
   - **DELETE /clientes/:id**
   - **GET /produtos**
   - **POST /produtos**
   - **PUT /produtos/:id**
   - **DELETE /produtos/:id**
   - **GET /usuarios**
   - **POST /usuarios**
   - **PUT /usuarios/:id**
   - **DELETE /usuarios/:id**
   - **POST /login**
   - **POST /logout**

## Demonstrativo em Vídeo

Grave um vídeo conforme as seguintes etapas:

1. **Mostrando a aplicação no GitHub**:
   - Abra o repositório no GitHub e navegue pelo código.

2. **Mostrando a árvore de arquivos do projeto**:
   - No vscode, mostre os arquivos do projeto (geralmente localizado à esquerda).

3. **Rodando `git status` no terminal**:
   - Mostre que não há alterações não comitadas.

4. **Mostrando as tabelas do banco de dados com os dados**:
   - Use uma ferramenta de gerenciamento de banco de dados para mostrar as tabelas e os dados (Recomendo a extensão para o VSCODE "Database Client").

5. **Mostrando o resultado de todos os endpoints em uma ferramenta (Thunder Client)**:
   - Execute e mostre as requisições para `/clientes`, `/produtos`, `/usuarios`, `/login` e `/logout`.

6. **Rodando e mostrando a suite de testes**:
   - Execute `npm test` no terminal e mostre os resultados.

7. **Mostrando logs das chamadas na API (principalmente clientes)**:
   - Mostre os logs gerados no console indicando operações de cache e banco de dados.

8. **Mostrando a geração e manipulação de token JWT**:
   - Faça login para gerar um token JWT, use-o para acessar `/clientes` e depois faça logout para invalidar o token. Mostre uma tentativa de acesso com um token inválido.
