import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Order } from '../../orders/entities/order.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', unique: true, length: 150 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash!: string;

  @Column({ type: 'integer', default: 0 })
  loyaltyPoints!: number;

  @Column({ type: 'varchar', length: 20, default: 'CUSTOMER' })
  role!: 'CUSTOMER' | 'STAFF';

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany('Order', 'user')
  orders!: Order[];
}
