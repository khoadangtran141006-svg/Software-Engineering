import { BadRequestException } from '@nestjs/common';
import { PromotionsService } from './promotions.service.js';

describe('PromotionsService', () => {
  const promotions = new PromotionsService();

  it('applies the Brew10 discount to the subtotal', () => {
    expect(promotions.discount('brew10', 50000)).toBe(5000);
  });

  it('rejects unknown promotion codes', () => {
    expect(() => promotions.discount('NOT-A-CODE', 50000)).toThrow(BadRequestException);
  });

  it('awards one point per 10,000 VND paid', () => {
    expect(promotions.loyaltyPoints(59000)).toBe(5);
  });
});
