import { describe, expect, it } from 'vitest';
import { MockPaymentService } from './mock-payment.service.js';

describe('MockPaymentService', () => {
  const service = new MockPaymentService();

  it('chấp nhận thanh toán với token hợp lệ (ví / thẻ)', async () => {
    expect((await service.charge('approved')).success).toBe(true);
    expect((await service.charge('4242424242424242')).success).toBe(true);
  });

  it('từ chối với token "decline" và số thẻ test bị từ chối', async () => {
    expect((await service.charge('decline')).success).toBe(false);
    expect((await service.charge('4000000000000002')).success).toBe(false);
  });
});
