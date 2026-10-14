import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    controller = new ProductsController({
      findAll: vi.fn().mockResolvedValue([]),
      findOne: vi.fn().mockResolvedValue({ id: 1 }),
    } as unknown as ProductsService);
  });

  it('delegates product list reads', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
  });

  it('delegates a product detail read', async () => {
    await expect(controller.findOne(1)).resolves.toEqual({ id: 1 });
  });
});
