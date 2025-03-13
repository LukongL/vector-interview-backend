// tests/auth.test.js
const request = require('supertest');
const app = require('../src/server');
const User = require('../src/models/User');

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(testUser);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created successfully');
  }, 10000); // 10-second timeout
});