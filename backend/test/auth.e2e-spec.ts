import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AuthController } from '../src/auth/auth.controller.js';
import { AuthService } from '../src/auth/auth.service.js';

describe('Authentication API (e2e)', () => {
  let app: INestApplication<App>;
  const auth = {
    register: vi.fn().mockResolvedValue({ id: 1, email: 'test@example.com' }),
    login: vi.fn().mockResolvedValue({ accessToken: 'test-jwt', user: { id: 1, email: 'test@example.com' } }),
    forgotPassword: vi.fn().mockResolvedValue({ message: 'If the email exists, instructions will be sent.' }),
    resetPassword: vi.fn().mockResolvedValue({ message: 'Password updated.' }),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: auth }],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => app.close());

  it('rejects a mistyped popular email domain such as gmail.co', async () => {
    await request(app.getHttpServer()).post('/auth/register')
      .send({ name: 'Khoa', email: 'tdk@gmail.co', password: 'password123' }).expect(400);
  });

  it('registers valid credentials', async () => {
    await request(app.getHttpServer()).post('/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'secret12' })
      .expect(201)
      .expect({ id: 1, email: 'test@example.com' });
  });

  it('validates email and password input', async () => {
    await request(app.getHttpServer()).post('/auth/register')
      .send({ name: 'T', email: 'not-an-email', password: 'x' })
      .expect(400);
  });

  it('returns a JWT from login', async () => {
    await request(app.getHttpServer()).post('/auth/login')
      .send({ email: 'test@example.com', password: 'secret12' })
      .expect(201)
      .expect(({ body }) => expect(body.accessToken).toBe('test-jwt'));
  });

  it('accepts forgot-password requests and validates reset payloads', async () => {
    await request(app.getHttpServer()).post('/auth/forgot-password')
      .send({ email: 'test@example.com' }).expect(200);
    await request(app.getHttpServer()).post('/auth/forgot-password')
      .send({ email: 'invalid' }).expect(400);
    await request(app.getHttpServer()).post('/auth/reset-password')
      .send({ token: 'a'.repeat(64), password: 'newsecret12' }).expect(200);
    await request(app.getHttpServer()).post('/auth/reset-password')
      .send({ token: 'short', password: 'short' }).expect(400);
  });
});
