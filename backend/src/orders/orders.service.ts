import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { InventoryService } from '../inventory/inventory.service.js';
import { PromotionsService } from '../promotions/promotions.service.js';
import { OrderStateService } from './order-state.service.js';
import { OrderStatus } from './order-status.enum.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly dataSource: DataSource,
    private readonly inventory: InventoryService,
    private readonly promotions: PromotionsService,
    private readonly orderState: OrderStateService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    return this.dataSource.transaction(async (manager) => {
      let total = 0;

      const orderItems: Partial<OrderItem>[] = [];

      for (const item of createOrderDto.items) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId },
        });

        if (!product) {
          throw new NotFoundException(
            `Không tìm thấy sản phẩm có id ${item.productId}`,
          );
        }

        await this.inventory.reserve(manager, product, item.quantity);

        const sizeExtra = this.getSizeExtra(item.size);

        const toppings = item.toppings ?? [];
        const unitPrice = product.price + sizeExtra + this.getToppingsExtra(toppings);

        const lineTotal = unitPrice * item.quantity;

        total += lineTotal;

        orderItems.push({
          productId: product.id,
          size: item.size,
          quantity: item.quantity,
          lineTotal,
          toppings,
        });
      }

      const discount = this.promotions.discount(createOrderDto.promotionCode, total);
      total -= discount;
      const orderCode = this.generateOrderCode();

      const order = manager.create(Order, {
        orderCode,
        status: 'PENDING',
        total,
        userId,
      });

      const savedOrder = await manager.save(Order, order);

      const itemsToSave = orderItems.map((item) =>
        manager.create(OrderItem, {
          ...item,
          orderId: savedOrder.id,
        }),
      );

      await manager.save(OrderItem, itemsToSave);

      return {
        id: savedOrder.id,
        orderCode: savedOrder.orderCode,
        status: savedOrder.status,
        total: savedOrder.total,
        discount,
      };
    });
  }

  async findMine(userId: number) {
    return this.orderRepository.find({
      where: { userId },
      relations: { items: { product: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: number, next: OrderStatus) {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });
      if (!order) throw new NotFoundException('Không tìm thấy đơn hàng');

      this.orderState.assertTransition(order.status as OrderStatus, next);

      if (next === OrderStatus.CANCELLED) {
        // Đơn bị hủy thì trả lại số lượng đã giữ chỗ lúc tạo đơn.
        const items = await manager.find(OrderItem, { where: { orderId: order.id } });
        for (const item of items) {
          await this.inventory.release(manager, item.productId, item.quantity);
        }
      }

      order.status = next;
      return manager.save(order);
    });
  }

  private getSizeExtra(size: string): number {
    switch (size) {
      case 'S':
        return 0;
      case 'M':
        return 5000;
      case 'L':
        return 10000;
      default:
        return 0;
    }
  }

  private getToppingsExtra(toppings: string[]) {
    const prices: Record<string, number> = {
      'Trân châu': 5000,
      'Kem cheese': 8000,
      Espresso: 10000,
    };
    return toppings.reduce((total, topping) => {
      const price = prices[topping];
      if (price === undefined) throw new BadRequestException('Topping không hợp lệ');
      return total + price;
    }, 0);
  }

  private generateOrderCode(): string {
    const now = new Date();

    const date = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('');

    const random = Math.floor(100000 + Math.random() * 900000);

    return `BL-${date}-${random}`;
  }
}
