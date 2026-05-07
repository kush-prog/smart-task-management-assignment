import request from 'supertest';
import app from '../app';
import { connectTestDB, clearTestDB, closeTestDB } from './setup';

jest.mock('../services/aiService', () => ({
  suggestPriority: jest.fn().mockResolvedValue({
    suggestedPriority: 'high',
    reasoning: 'This task involves a production issue that needs immediate attention.',
  }),
  generateTaskSummary: jest.fn().mockResolvedValue({
    summary: 'Fix the critical production database storage issue before data loss occurs.',
  }),
}));

let authToken: string;

beforeAll(async () => {
  await connectTestDB();

  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'AI Tester',
      email: 'ai@test.com',
      password: 'password123',
    });

  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'ai@test.com',
      password: 'password123',
    });

  authToken = loginRes.body.token;
});

afterAll(async () => {
  await clearTestDB();
  await closeTestDB();
});

describe('AI Endpoints', () => {

  describe('POST /api/ai/suggest-priority', () => {

    it('should return a priority suggestion', async () => {
      const res = await request(app)
        .post('/api/ai/suggest-priority')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'The production database is running out of storage',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('suggestedPriority');
      expect(res.body).toHaveProperty('reasoning');
      expect(['low', 'medium', 'high']).toContain(res.body.suggestedPriority);
    });

    it('should return 400 if description is missing', async () => {
      const res = await request(app)
        .post('/api/ai/suggest-priority')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('description');
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .post('/api/ai/suggest-priority')
        .send({ description: 'Some task' });

      expect(res.status).toBe(401);
    });
  });


  describe('POST /api/ai/generate-summary', () => {

    it('should return a task summary', async () => {
      const res = await request(app)
        .post('/api/ai/generate-summary')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'Review all pull requests from frontend team for the dashboard feature',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('summary');
      expect(typeof res.body.summary).toBe('string');
    });

    it('should return 400 if description is missing', async () => {
      const res = await request(app)
        .post('/api/ai/generate-summary')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('description');
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .post('/api/ai/generate-summary')
        .send({ description: 'Some task' });

      expect(res.status).toBe(401);
    });
  });
});
