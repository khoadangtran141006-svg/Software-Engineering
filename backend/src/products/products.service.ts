import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductResponseDto } from './dto/product-response.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lấy danh sách sản phẩm, sắp xếp theo ID tăng dần.
   */
  async findAll() {
    const products = await this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });

    return products.map((product) => ProductResponseDto.from(product));
  }

  /**
   * Lấy thông tin chi tiết của một sản phẩm theo ID.
   */
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    return ProductResponseDto.from(product);
  }
}