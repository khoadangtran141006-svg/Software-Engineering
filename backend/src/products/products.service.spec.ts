import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('ProductsService', () => {
  const product = { id: 1, name: 'Cà phê sữa', category: 'coffee', price: 30000, imageUrl: '/coffee.jpg', stock: 20 };
  const prisma = { product: { findMany: vi.fn(), findUnique: vi.fn() } };

  beforeEach(async () => {
    vi.clearAllMocks();
    prisma.product.findMany.mockResolvedValue([product]);
    prisma.product.findUnique.mockResolvedValue(product);
    service = new ProductsService(prisma as unknown as PrismaService);
  });

  let service: ProductsService;

  it('lists products in stable id order', async () => {
    await expect(service.findAll()).resolves.toEqual([product]);
    expect(prisma.product.findMany).toHaveBeenCalledWith({ orderBy: { id: 'asc' } });
  });

  it('returns one product by id', async () => {
    await expect(service.findOne(1)).resolves.toEqual(product);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('returns 404 when the product is absent', async () => {
    prisma.product.findUnique.mockResolvedValueOnce(null);
    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });
});
