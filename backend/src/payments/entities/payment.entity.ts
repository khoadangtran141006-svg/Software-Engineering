import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 100 })
  idempotencyKey!: string;

  @Column({ type: 'integer' })
  orderId!: number;

  @Column({ length: 30 })
  method!: string;

  @Column({ length: 30 })
  status!: 'SUCCEEDED' | 'FAILED';

  @Column({ type: 'integer' })
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
