import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ProductsController } from '../src/products/products.controller.js';
import { ProductsService } from '../src/products/products.service.js';

describe('Products API (e2e)', () => {
  let app: INestApplication;

  const product = {
    id: 1,
    name: 'Cà phê sữa',
    category: 'coffee',
    price: 30000,
    imageUrl: '/coffee.jpg',
    stock: 20,
  };

  beforeEach(async () => {
    const products = {
      findAll: vi.fn().mockResolvedValue([product]),
      findOne: vi.fn().mockImplementation(async (id: number) => {
        if (id === 1) {
          return product;
        }

        throw new Error('not found');
      }),
    };

    const module = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: products,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /products returns the product contract', async () => {
    await request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect([product]);
  });

  it('GET /products/:id returns a product detail', async () => {
    await request(app.getHttpServer())
      .get('/products/1')
      .expect(200)
      .expect(product);
  });

  it('GET /products/:id rejects a non-integer id', async () => {
    await request(app.getHttpServer())
      .get('/products/abc')
      .expect(400);
  });
});