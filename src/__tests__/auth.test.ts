import request from 'supertest';
import app from '../app';
import { connectTestDB, clearTestDB, closeTestDB } from './setup';

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe('Auth Endpoints', () => {

  describe('POST /api/auth/register', () => {

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('test@test.com');
      expect(res.body.user.role).toBe('user');
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('should return 400 if fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@test.com' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBeDefined();
    });

    it('should return 400 if email already exists', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'test@test.com',
          password: 'password456',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {

    const registerUser = async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@test.com',
          password: 'password123',
        });
    };

    it('should login with correct credentials', async () => {
      await registerUser();

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password123',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@test.com');
    });

    it('should return 401 for wrong password', async () => {
      await registerUser();

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword',
        });

      expect(res.status).toBe(401);
    });

    it('should return 401 for non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nobody@test.com',
          password: 'password123',
        });

      expect(res.status).toBe(401);
    });
  });
});
