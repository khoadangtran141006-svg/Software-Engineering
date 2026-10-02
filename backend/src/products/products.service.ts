import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    {
      id: 1,
      name: 'Cà phê sữa',
      category: 'coffee',
      price: 30000,
      imageUrl:
        'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=85',
      stock: 20,
    },
    {
      id: 2,
      name: 'Cà phê đen',
      category: 'coffee',
      price: 25000,
      imageUrl:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',
      stock: 20,
    },
    {
      id: 3,
      name: 'Bạc xỉu',
      category: 'coffee',
      price: 35000,
      imageUrl:
        'https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=1000&q=85',
      stock: 15,
    },
    {
      id: 4,
      name: 'Trà đào',
      category: 'tea',
      price: 40000,
      imageUrl:
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85',
      stock: 15,
    },
    {
      id: 5,
      name: 'Trà sữa',
      category: 'milk-tea',
      price: 45000,
      imageUrl:
        'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=1000&q=85',
      stock: 15,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    return product;
  }
}