import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity.js';
import { User } from '../users/entities/user.entity.js';
import { PromotionsModule } from '../promotions/promotions.module.js';
import { OrderStateService } from '../orders/order-state.service.js';
import { Payment } from './entities/payment.entity.js';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { MockPaymentService } from './mock-payment.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order, User]), PromotionsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, MockPaymentService, OrderStateService],
})
export class PaymentsModule {}
