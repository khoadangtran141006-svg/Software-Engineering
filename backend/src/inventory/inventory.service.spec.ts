import { BadRequestException } from '@nestjs/common';
import { InventoryService } from './inventory.service.js';
import type { EntityManager } from 'typeorm';
import { Product } from '../products/entities/product.entity.js';

describe('InventoryService', () => {
  const execute = vi.fn();
  const where = vi.fn(() => ({ execute }));
  const set = vi.fn(() => ({ where }));
  const update = vi.fn(() => ({ set }));
  const manager = { createQueryBuilder: () => ({ update }) };
  const inventory = new InventoryService();
  const product = { id: 3, name: 'Bạc xỉu' } as Product;

  beforeEach(() => {
    vi.clearAllMocks();
    execute.mockResolvedValue({ affected: 1 });
  });

  it('reserves stock with a conditional atomic update', async () => {
    await inventory.reserve(manager as unknown as EntityManager, product, 2);
    expect(update).toHaveBeenCalledWith(Product);
    expect(where).toHaveBeenCalledWith('id = :id AND stock >= :quantity', { id: 3, quantity: 2 });
  });

  it('rejects when concurrent orders consume the remaining stock', async () => {
    execute.mockResolvedValueOnce({ affected: 0 });
    await expect(inventory.reserve(manager as unknown as EntityManager, product, 2)).rejects.toBeInstanceOf(BadRequestException);
  });
});
