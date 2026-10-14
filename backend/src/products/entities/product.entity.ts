import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 50 })
  category: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'integer', default: 0 })
  stock: number;
}