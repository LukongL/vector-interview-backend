// tests/interview.test.js
const request = require('supertest');
const app = require('../src/server');
const Interview = require('../src/models/Interview');

describe('Interview Routes', () => {
  let authCookie;

  beforeAll(async () => {
    // Create test user
    await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test',
        email: 'test@example.com',
        password: 'password'
      });

    // Login
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password'
      });

    authCookie = loginRes.headers['set-cookie'];
  }, 20000); // 20-second timeout

  it('should create a new interview', async () => {
    const res = await request(app)
      .post('/api/interviews')
      .set('Cookie', authCookie)
      .send({
        title: 'Technical Interview',
        questions: ['Explain REST principles']
      });

    expect(res.statusCode).toBe(201);
  }, 10000);
});