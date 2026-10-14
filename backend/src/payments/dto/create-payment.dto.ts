import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  orderId!: number;

  @IsString()
  @IsIn(['QR Code', 'Ví điện tử', 'Card'])
  method!: string;

  @IsString()
  @IsNotEmpty()
  token!: string;
}
