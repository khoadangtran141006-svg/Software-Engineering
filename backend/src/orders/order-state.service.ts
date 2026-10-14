import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStatus } from './order-status.enum.js';

const transitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.PAID, OrderStatus.PAYMENT_FAILED, OrderStatus.CANCELLED],
  [OrderStatus.PAYMENT_FAILED]: [OrderStatus.PENDING, OrderStatus.CANCELLED],
  [OrderStatus.PAID]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  [OrderStatus.PREPARING]: [OrderStatus.READY],
  [OrderStatus.READY]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
};

@Injectable()
export class OrderStateService {
  assertTransition(current: OrderStatus, next: OrderStatus) {
    if (!transitions[current]?.includes(next)) {
      throw new BadRequestException(`Không thể chuyển đơn từ ${current} sang ${next}`);
    }
  }
}
