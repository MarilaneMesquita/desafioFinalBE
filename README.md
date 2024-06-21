Projeto back-end usando Node.js e Express com autenticação JWT, caching, operações CRUD e testes automatizados.

Funcionalidades
CRUD para clientes, produtos e usuarios
Autenticação JWT
Caching com node-cache
Testes automatizados
Configuração
Clone o repositório.
Execute npm install.
Configure o .env.
Crie as tabelas com os scripts SQL em models/createTables.sql.
Endpoints
Clientes: GET, POST, PUT, DELETE /clientes
Produtos: GET, POST, PUT, DELETE /produtos
Usuários: GET, POST, PUT, DELETE /usuarios
Login: POST /login
Logout: POST /logout
Autenticação JWT
Login gera um token JWT.
Logout invalida o token.
/clientes requer token JWT válido.
Caching
Cache em /clientes, expira em 30 segundos.
Logs para cache e banco de dados.
Testes
Testes com Jest e Supertest para CRUD e autenticação.
Para rodar os testes: npm test
Como Executar
Inicie o servidor: npm start
Use Thunder Client para testar os endpoints.
Vídeo Demonstrativo
Grave um vídeo mostrando a aplicação no GitHub, estrutura de arquivos, git status, tabelas do banco, testes dos endpoints, execução dos testes, logs e uso do token JWT.