export type ProductCategory = 'coffee' | 'tea' | 'milk-tea';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  imageUrl: string;
  stock: number;
}