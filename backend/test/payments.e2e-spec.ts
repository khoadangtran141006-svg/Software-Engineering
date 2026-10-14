import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard.js';
import { PaymentsController } from '../src/payments/payments.controller.js';
import { PaymentsService } from '../src/payments/payments.service.js';

describe('Payments API (e2e)', () => {
  let app: INestApplication<App>;
  const payments = { pay: vi.fn().mockResolvedValue({ status: 'SUCCEEDED' }) };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [{ provide: PaymentsService, useValue: payments }],
    }).overrideGuard(JwtAuthGuard).useValue({
      canActivate: (context: any) => {
        context.switchToHttp().getRequest().user = { id: 7, role: 'CUSTOMER' };
        return true;
      },
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => app.close());

  it('passes the authenticated user and idempotency key to payment processing', async () => {
    await request(app.getHttpServer()).post('/payments').set('Idempotency-Key', 'payment-1')
      .send({ orderId: 12, method: 'QR Code', token: 'approved' }).expect(201);
    expect(payments.pay).toHaveBeenCalledWith({ orderId: 12, method: 'QR Code', token: 'approved' }, 'payment-1', 7);
  });
});
