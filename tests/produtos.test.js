import app from '../src/app.js';
import {closePool} from '../src/configs/database.js';
import {setupDatabase, teardownDatabase} from './setupTests.js';
import supertest from 'supertest';

const server = supertest(app);

jest.setTimeout(30000); // Aumentar o tempo limite dos testes para 30 segundos

beforeAll(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await teardownDatabase();
  await closePool(); // Fechar o pool de conexões após todos os testes
});

beforeEach(async () => {
  await teardownDatabase();
  await setupDatabase();
});

describe('Produtos API', () => {
  describe('POST /produtos', () => {
    it('should create a new product', async () => {
      const newProduct = {nome: 'Produto A', descricao: 'Descrição do Produto A', preco: 100};
      const response = await server.post('/produtos').send(newProduct);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET /produtos', () => {
    it('should return all products', async () => {
      const response = await server.get('/produtos');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('PUT /produtos/:id', () => {
    it('should update a product', async () => {
      const updatedProduct = {nome: 'Produto B', descricao: 'Descrição do Produto B', preco: 150};
      const response = await server.put('/produtos/1').send(updatedProduct);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Produto atualizado com sucesso');
    });
  });

  describe('DELETE /produtos/:id', () => {
    it('should delete a product', async () => {
      const response = await server.delete('/produtos/1');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Produto excluído com sucesso');
    });
  });
});
