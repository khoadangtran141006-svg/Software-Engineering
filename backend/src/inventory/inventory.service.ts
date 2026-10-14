import { BadRequestException, Injectable } from '@nestjs/common';
import type { EntityManager } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';

@Injectable()
export class InventoryService {
  async reserve(manager: EntityManager, product: Product, quantity: number) {
    const result = await manager
      .createQueryBuilder()
      .update(Product)
      .set({ stock: () => `stock - ${quantity}` })
      .where('id = :id AND stock >= :quantity', { id: product.id, quantity })
      .execute();
    if (!result.affected) {
      throw new BadRequestException(`Sản phẩm "${product.name}" không đủ số lượng trong kho`);
    }
  }
}
