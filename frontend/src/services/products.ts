import type { Product } from '@/types/product';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error('Không thể tải danh sách sản phẩm');
  }

  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Không tìm thấy sản phẩm');
    }

    throw new Error('Không thể tải thông tin sản phẩm');
  }

  return response.json();
}