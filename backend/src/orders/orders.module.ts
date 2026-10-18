import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { User } from '../users/entities/user.entity.js';
import { JwtStrategy } from '../auth/jwt.strategy.js';
import { InventoryModule } from '../inventory/inventory.module.js';
import { PromotionsModule } from '../promotions/promotions.module.js';
import { OrderStateService } from './order-state.service.js';
import { OrderExpiryService } from './order-expiry.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Product,
      User,
    ]),
    InventoryModule,
    PromotionsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, JwtStrategy, OrderStateService, OrderExpiryService],
  exports: [OrdersService],
})
export class OrdersModule {}
