# Projeto Back-end com Node.js e Express

Este projeto é um desafio de desenvolvimento Back-end usando Node.js, Express, e outras tecnologias. Ele inclui funcionalidades como autenticação JWT, caching, operações CRUD com banco de dados e testes automatizados.

## Funcionalidades

- CRUD para clientes, produtos e usuários
- Autenticação JWT
- Caching com node-cache
- Testes automatizados

## Configuração

1. Clone o repositório.
2. Execute `npm install`.
3. Configure o `.env`.
4. Crie as tabelas com os scripts SQL em `models/createTables.sql`.

## Endpoints

- **Clientes**: `GET`, `POST`, `PUT`, `DELETE` `/clientes`
- **Produtos**: `GET`, `POST`, `PUT`, `DELETE` `/produtos`
- **Usuários**: `GET`, `POST`, `PUT`, `DELETE` `/usuarios`
- **Login**: `POST` `/login`
- **Logout**: `POST` `/logout`

## Autenticação JWT

- Login gera um token JWT.
- Logout invalida o token.
- `/clientes` requer token JWT válido.

## Caching

- Cache em `/clientes`, expira em 30 segundos.
- Logs para cache e banco de dados.

## Testes

- Testes com Jest e Supertest para CRUD e autenticação.
- Para rodar os testes: `npm test`

## Como Executar

1. Inicie o servidor: `npm start`
2. Use Thunder Client para testar os endpoints.

## Vídeo Demonstrativo

Grave um vídeo mostrando a aplicação no GitHub, estrutura de arquivos, `git status`, tabelas do banco, testes dos endpoints, execução dos testes, logs e uso do token JWT.
