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

  it('should retrieve all interviews', async () => {
    const res = await request(app)
      .get('/api/interviews')
      .set('Cookie', authCookie);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  
  it('should retrieve a single interview', async () => {
    const createRes = await request(app)
      .post('/api/interviews')
      .set('Cookie', authCookie)
      .send({
        title: 'Test Interview',
        questions: ['What is Node.js?']
      });
    
    const interviewId = createRes.body._id;
    const res = await request(app)
      .get(`/api/interviews/${interviewId}`)
      .set('Cookie', authCookie);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test Interview');
  });
  
  /*
  it('should update an interview', async () => {
    const createRes = await request(app)
      .post('/api/interviews')
      .set('Cookie', authCookie)
      .send({
        title: 'Old Title',
        questions: ['Old question']
      });
    
    const updatedRes = await request(app)
      .put(`/api/interviews/${createRes.body._id}`)
      .set('Cookie', authCookie)
      .send({
        title: 'New Title',
        questions: ['Updated question']
      });
    
    expect(updatedRes.statusCode).toBe(200);
    expect(updatedRes.body.title).toBe('New Title');
  });
  
  it('should delete an interview', async () => {
    const createRes = await request(app)
      .post('/api/interviews')
      .set('Cookie', authCookie)
      .send({
        title: 'To Delete',
        questions: ['Delete me']
      });
    
    const deleteRes = await request(app)
      .delete(`/api/interviews/${createRes.body._id}`)
      .set('Cookie', authCookie);
    
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toContain('deleted');
  });
  */
});