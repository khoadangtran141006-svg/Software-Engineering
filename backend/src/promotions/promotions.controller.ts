import { Controller, Get, Query } from '@nestjs/common';
import { PromotionsService } from './promotions.service.js';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotions: PromotionsService) {}

  /** Xem trước số tiền giảm của một mã (ném 400 nếu mã không hợp lệ). */
  @Get('validate')
  validate(@Query('code') code: string, @Query('subtotal') subtotal: string) {
    const amount = Math.max(0, Math.floor(Number(subtotal) || 0));
    return { code: code?.trim().toUpperCase(), discount: this.promotions.discount(code, amount) };
  }
}
