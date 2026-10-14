import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PromotionsService {
  discount(code: string | undefined, subtotal: number) {
    if (!code) return 0;
    if (code.trim().toUpperCase() === 'BREW10') return Math.floor(subtotal * 0.1);
    throw new BadRequestException('Mã khuyến mãi không hợp lệ');
  }

  loyaltyPoints(paidTotal: number) {
    return Math.floor(paidTotal / 10000);
  }
}
