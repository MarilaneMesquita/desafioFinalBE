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

describe('Usuarios API', () => {
  describe('POST /usuarios', () => {
    it('should create a new user', async () => {
      const newUser = {usuario: 'novoUsuario', senha: 'senha123'};
      const response = await server.post('/usuarios').send(newUser);
      console.log('POST /usuarios Response:', response.body);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('usuario', 'novoUsuario');
    });
  });

  describe('POST /login', () => {
    it('should login and return a token', async () => {
      const response = await server.post('/usuarios/login').send({usuario: 'admin', senha: 'senha123'});
      console.log('Login Response:', response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /logout', () => {
    it('should logout and invalidate the token', async () => {
      const loginResponse = await server.post('/usuarios/login').send({usuario: 'admin', senha: 'senha123'});
      const token = loginResponse.body.token;
      const response = await server.post('/usuarios/logout').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
