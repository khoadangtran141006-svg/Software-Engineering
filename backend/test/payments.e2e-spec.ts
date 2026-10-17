import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
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
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterEach(async () => app.close());

  it('passes the authenticated user and idempotency key to payment processing', async () => {
    await request(app.getHttpServer()).post('/payments').set('Idempotency-Key', 'payment-1')
      .send({ orderId: 12, method: 'QR Code', token: 'approved' }).expect(201);
    expect(payments.pay).toHaveBeenCalledWith({ orderId: 12, method: 'QR Code', token: 'approved' }, 'payment-1', 7);
  });

  const post = (body: object) =>
    request(app.getHttpServer()).post('/payments').set('Idempotency-Key', 'k').send({ orderId: 1, ...body });

  it('thẻ ngân hàng: chỉ nhận 16–19 chữ số', async () => {
    await post({ method: 'Thẻ ngân hàng', cardNumber: '4'.repeat(16) }).expect(201);
    await post({ method: 'Thẻ ngân hàng', cardNumber: '4'.repeat(19) }).expect(201);
    await post({ method: 'Thẻ ngân hàng', cardNumber: '4' }).expect(400);
    await post({ method: 'Thẻ ngân hàng', cardNumber: '4'.repeat(30) }).expect(400);
  });

  it('ví điện tử: bắt buộc có ví, số điện thoại và OTP hợp lệ', async () => {
    const wallet = { method: 'Ví điện tử', walletProvider: 'MoMo', walletPhone: '0912345678', otp: '123456' };
    await post(wallet).expect(201);
    await post({ ...wallet, otp: undefined }).expect(400);
    await post({ ...wallet, walletPhone: '123' }).expect(400);
  });
});
