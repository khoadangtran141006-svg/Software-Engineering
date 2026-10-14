import { IsIn } from 'class-validator';
import { OrderStatus } from '../order-status.enum.js';

export class UpdateOrderStatusDto {
  @IsIn(Object.values(OrderStatus))
  status!: OrderStatus;
}
