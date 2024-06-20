import app from '../src/app.js';
import {closePool} from '../src/configs/database.js';
import {setupDatabase, teardownDatabase} from './setupTests.js';
import supertest from 'supertest';

const server = supertest(app);

jest.setTimeout(30000);

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
  await closePool();
});

describe('Clientes API', () => {
  let token;

  beforeAll(async () => {
    // Criando um usuário de teste e obtendo o token
    await server.post('/usuarios').send({usuario: 'admin', senha: 'senha123'});
    const response = await server.post('/usuarios/login').send({usuario: 'admin', senha: 'senha123'});
    token = response.body.token;
  });

  describe('POST /clientes', () => {
    it('should create a new client', async () => {
      const newClient = {nome: 'John', sobrenome: 'Doe', email: 'john.doe@example.com', idade: 30};
      const response = await server.post('/clientes').set('Authorization', `Bearer ${token}`).send(newClient);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /clientes', () => {
    it('should return all clients and cache the result', async () => {
      const response1 = await server.get('/clientes').set('Authorization', `Bearer ${token}`);
      expect(response1.status).toBe(200);
      expect(response1.body).toBeInstanceOf(Array);

      const response2 = await server.get('/clientes').set('Authorization', `Bearer ${token}`);
      expect(response2.status).toBe(200);
      expect(response2.body).toBeInstanceOf(Array);
    });
  });

  describe('PUT /clientes/:id', () => {
    it('should update a client and invalidate the cache', async () => {
      const updatedClient = {nome: 'Jane', sobrenome: 'Doe', email: 'jane.doe@example.com', idade: 25};
      const response = await server.put('/clientes/1').set('Authorization', `Bearer ${token}`).send(updatedClient);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cliente atualizado com sucesso');
    });
  });

  describe('DELETE /clientes/:id', () => {
    it('should delete a client and invalidate the cache', async () => {
      const response = await server.delete('/clientes/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Cliente excluído com sucesso');
    });
  });
});
