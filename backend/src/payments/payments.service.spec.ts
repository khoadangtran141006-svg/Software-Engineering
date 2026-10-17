import { BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { OrderStateService } from '../orders/order-state.service.js';
import { PromotionsService } from '../promotions/promotions.service.js';
import { OrderStatus } from '../orders/order-status.enum.js';
import { Order } from '../orders/entities/order.entity.js';
import { Payment } from './entities/payment.entity.js';
import type { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';

describe('PaymentsService', () => {
  const order = { id: 2, orderCode: 'BL-ORDER-2', userId: 5, status: OrderStatus.PENDING, total: 40000, paymentMethod: null };
  const payment = { id: 1, idempotencyKey: 'idem-1', orderId: 2, method: 'QR Code', status: 'SUCCEEDED', amount: 40000 };
  const manager = {
    findOne: vi.fn(),
    save: vi.fn(async (...args: unknown[]) => args.at(-1)),
    create: vi.fn((_entity: unknown, data: unknown) => data),
    increment: vi.fn(),
  };
  const dataSource = { transaction: vi.fn(async (callback: (tx: any) => unknown) => callback(manager)) };
  const paymentRepository = { findOne: vi.fn() };
  const orderRepository = { findOne: vi.fn() };
  const mock = { charge: vi.fn().mockResolvedValue({ success: true, reference: 'mock-ref' }) };
  let service: PaymentsService;

  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(order, { status: OrderStatus.PENDING, paymentMethod: null });
    paymentRepository.findOne.mockResolvedValue(null);
    orderRepository.findOne.mockResolvedValue(order);
    manager.findOne.mockImplementation(async (entity: unknown) => (entity === Order ? order : null));
    manager.save.mockImplementation(async (...args: unknown[]) => args.at(-1));
    manager.create.mockImplementation((_entity: unknown, data: unknown) => data);
    mock.charge.mockResolvedValue({ success: true, reference: 'mock-ref' });
    service = new PaymentsService(
      paymentRepository as unknown as Repository<Payment>,
      orderRepository as unknown as Repository<Order>,
      dataSource as unknown as DataSource,
      mock as never,
      new OrderStateService(),
      new PromotionsService(),
    );
  });

  it('marks a successful payment paid and awards loyalty points', async () => {
    await service.pay({ orderId: 2, method: 'QR Code', token: 'approved' }, 'idem-1', 5);
    expect(order.status).toBe(OrderStatus.PAID);
    expect(order.paymentMethod).toBe('QR Code');
    expect(manager.increment).toHaveBeenCalledWith(User, { id: 5 }, 'loyaltyPoints', 4);
  });

  it('returns the recorded payment for a repeated idempotency key', async () => {
    paymentRepository.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(payment);
    await service.pay({ orderId: 2, method: 'QR Code', token: 'approved' }, 'idem-1', 5);
    const result = await service.pay({ orderId: 2, method: 'QR Code', token: 'approved' }, 'idem-1', 5);
    expect(result).toEqual(payment);
    expect(mock.charge).toHaveBeenCalledTimes(1);
  });

  it('returns the existing payment without charging again when a parallel request with the same key finished while waiting for the order lock', async () => {
    manager.findOne.mockImplementation(async (entity: unknown) => (entity === Order ? order : entity === Payment ? payment : null));
    const result = await service.pay({ orderId: 2, method: 'QR Code', token: 'approved' }, 'idem-1', 5);
    expect(result).toEqual(payment);
    expect(mock.charge).not.toHaveBeenCalled();
    expect(manager.increment).not.toHaveBeenCalled();
  });

  it('rejects paying an order that is no longer awaiting payment', async () => {
    order.status = OrderStatus.PAID;
    await expect(service.pay({ orderId: 2, method: 'QR Code', token: 'approved' }, 'other-key', 5)).rejects.toBeInstanceOf(BadRequestException);
    expect(mock.charge).not.toHaveBeenCalled();
  });

  it('does not allow an idempotency key to be reused for another order', async () => {
    paymentRepository.findOne.mockResolvedValue(payment);
    await expect(service.pay({ orderId: 99, method: 'QR Code', token: 'approved' }, 'idem-1', 5)).rejects.toBeInstanceOf(BadRequestException);
  });
});
