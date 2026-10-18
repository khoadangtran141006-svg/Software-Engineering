import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { OrdersController } from '../src/orders/orders.controller.js';
import { OrdersService } from '../src/orders/orders.service.js';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard.js';

describe('Orders API (e2e)', () => {
  let app: INestApplication<App>;
  const orders = {
    createOrder: vi.fn().mockResolvedValue({ orderCode: 'BL-100', status: 'PENDING' }),
    findMine: vi.fn().mockResolvedValue([]),
    updateStatus: vi.fn(),
    cancelMine: vi.fn().mockResolvedValue({ status: 'CANCELLED' }),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: orders }],
    }).overrideGuard(JwtAuthGuard).useValue({
      canActivate: (context: any) => {
        context.switchToHttp().getRequest().user = { id: 7, role: 'CUSTOMER' };
        return true;
      },
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(async () => app.close());

  it('creates an order for the authenticated account', async () => {
    await request(app.getHttpServer()).post('/orders').send({ items: [{ productId: 1, quantity: 2, size: 'M', toppings: [] }] }).expect(201);
    expect(orders.createOrder).toHaveBeenCalledWith(expect.any(Object), 7);
  });

  it('lets the authenticated customer cancel their own order', async () => {
    await request(app.getHttpServer()).patch('/orders/12/cancel').expect(200);
    expect(orders.cancelMine).toHaveBeenCalledWith(12, 7);
  });

  it('rejects invalid order bodies and lists account orders', async () => {
    await request(app.getHttpServer()).post('/orders').send({ items: [] }).expect(400);
    await request(app.getHttpServer()).get('/orders/me').expect(200).expect([]);
    expect(orders.findMine).toHaveBeenCalledWith(7);
  });
});
