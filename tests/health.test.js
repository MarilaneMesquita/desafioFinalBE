import app from '../src/app.js';
import supertest from 'supertest';

const server = supertest(app);

beforeAll(async () => {
});

afterAll(async () => {
});

describe('HEALTH', () => {
  it('should return OK', async () => {
    const response = await server.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});


