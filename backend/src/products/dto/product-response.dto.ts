import type { Product } from '@prisma/client';

export class ProductResponseDto {
  id!: number;
  name!: string;
  category!: string;
  price!: number;
  imageUrl!: string;
  stock!: number;

  static from(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
    };
  }
}
