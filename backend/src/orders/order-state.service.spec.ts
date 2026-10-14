import { BadRequestException } from '@nestjs/common';
import { OrderStateService } from './order-state.service.js';
import { OrderStatus } from './order-status.enum.js';

describe('OrderStateService', () => {
  const state = new OrderStateService();

  it.each([
    [OrderStatus.PENDING, OrderStatus.PAID],
    [OrderStatus.PAID, OrderStatus.PREPARING],
    [OrderStatus.PREPARING, OrderStatus.READY],
    [OrderStatus.READY, OrderStatus.COMPLETED],
    [OrderStatus.PAYMENT_FAILED, OrderStatus.PENDING],
  ])('allows %s -> %s', (from, to) => {
    expect(() => state.assertTransition(from, to)).not.toThrow();
  });

  it.each([
    [OrderStatus.PENDING, OrderStatus.COMPLETED],
    [OrderStatus.COMPLETED, OrderStatus.PAID],
    [OrderStatus.CANCELLED, OrderStatus.PENDING],
  ])('rejects %s -> %s', (from, to) => {
    expect(() => state.assertTransition(from, to)).toThrow(BadRequestException);
  });
});
