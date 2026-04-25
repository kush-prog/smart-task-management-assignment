import request from 'supertest';
import app from '../app';
import { connectTestDB, clearTestDB, closeTestDB } from './setup';

let authToken: string;

beforeAll(async () => {
  await connectTestDB();

  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Task Tester',
      email: 'tasks@test.com',
      password: 'password123',
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'tasks@test.com',
      password: 'password123',
    });

  authToken = loginRes.body.token;
});

afterAll(async () => {
  await clearTestDB();
  await closeTestDB();
});

describe('Task Endpoints', () => {

  let taskId: string;

  describe('POST /api/tasks/create', () => {

    it('should create a task', async () => {
      const res = await request(app)
        .post('/api/tasks/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'A task for testing',
          priority: 'high',
          dueDate: '2026-06-01',
        });

      expect(res.status).toBe(201);
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .post('/api/tasks/create')
        .send({ title: 'No Auth Task' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/tasks/all', () => {

    it('should return user tasks', async () => {
      const res = await request(app)
        .get('/api/tasks/all')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/tasks/:id', () => {

    it('should return a single task', async () => {
      const createRes = await request(app)
        .post('/api/tasks/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Find Me', priority: 'low' });

      const id = createRes.body._id || createRes.body.task?._id;

      const res = await request(app)
        .get(`/api/tasks/${id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('PUT /api/tasks/:id', () => {

    it('should update a task', async () => {
      const createRes = await request(app)
        .post('/api/tasks/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Update Me', priority: 'low' });

      const id = createRes.body._id || createRes.body.task?._id;

      const res = await request(app)
        .put(`/api/tasks/${id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'completed', priority: 'high' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/tasks/:id', () => {

    it('should delete a task', async () => {
      const createRes = await request(app)
        .post('/api/tasks/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Delete Me' });

      const id = createRes.body._id || createRes.body.task?._id;

      const res = await request(app)
        .delete(`/api/tasks/${id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toContain('deleted');
    });
  });
});
