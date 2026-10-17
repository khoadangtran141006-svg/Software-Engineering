import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';
import { Order } from '../orders/entities/order.entity.js';
import { User } from '../users/entities/user.entity.js';
import { OrderStateService } from '../orders/order-state.service.js';
import { OrderStatus } from '../orders/order-status.enum.js';
import { PromotionsService } from '../promotions/promotions.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { Payment } from './entities/payment.entity.js';
import { MockPaymentService } from './mock-payment.service.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly payments: Repository<Payment>,
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    private readonly dataSource: DataSource,
    private readonly mock: MockPaymentService,
    private readonly state: OrderStateService,
    private readonly promotions: PromotionsService,
  ) {}

  async pay(dto: CreatePaymentDto, key: string, userId: number) {
    if (!key || key.length > 100) throw new BadRequestException('Header Idempotency-Key là bắt buộc');
    const previous = await this.payments.findOne({ where: { idempotencyKey: key } });
    if (previous) {
      if (previous.orderId !== dto.orderId) throw new BadRequestException('Idempotency-Key đã được dùng cho đơn hàng khác');
      const existingOrder = await this.orders.findOne({ where: { id: previous.orderId } });
      if (!existingOrder || existingOrder.userId !== userId) throw new ForbiddenException('Bạn không có quyền xem giao dịch này');
      return previous;
    }
    try {
      return await this.dataSource.transaction(async (manager) => {
      // Khóa dòng đơn hàng để hai yêu cầu song song (khác key) không cùng thanh toán một đơn.
      const order = await manager.findOne(Order, {
        where: { id: dto.orderId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');
      if (order.userId !== userId) throw new ForbiddenException('Bạn không có quyền thanh toán đơn hàng này');
      if (order.status === OrderStatus.PAYMENT_FAILED) {
        this.state.assertTransition(OrderStatus.PAYMENT_FAILED, OrderStatus.PENDING);
        order.status = OrderStatus.PENDING;
      }
      const charge = await this.mock.charge(dto.token);
      const nextStatus = charge.success ? OrderStatus.PAID : OrderStatus.PAYMENT_FAILED;
      this.state.assertTransition(order.status as OrderStatus, nextStatus);
      order.status = nextStatus;
      if (charge.success) order.paymentMethod = dto.method;
      await manager.save(order);
      if (charge.success) {
        await manager.increment(User, { id: userId }, 'loyaltyPoints', this.promotions.loyaltyPoints(order.total));
      }
      return manager.save(Payment, manager.create(Payment, {
        idempotencyKey: key,
        orderId: order.id,
        method: dto.method,
        status: charge.success ? 'SUCCEEDED' : 'FAILED',
        amount: order.total,
      }));
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const duplicate = await this.payments.findOne({ where: { idempotencyKey: key } });
        if (duplicate && duplicate.orderId === dto.orderId) {
          const existingOrder = await this.orders.findOne({ where: { id: duplicate.orderId } });
          if (existingOrder?.userId === userId) return duplicate;
          throw new ForbiddenException('Bạn không có quyền xem giao dịch này');
        }
      }
      throw error;
    }
  }
}
