import { describe, expect, it } from 'vitest';
import { MockPaymentService, WALLET_DEMO_OTP } from './mock-payment.service.js';

describe('MockPaymentService', () => {
  const service = new MockPaymentService();

  it('thẻ: chấp nhận số thẻ thường, từ chối số thẻ test bị từ chối', async () => {
    expect((await service.charge({ method: 'Thẻ ngân hàng', cardNumber: '4242424242424242' })).success).toBe(true);
    expect((await service.charge({ method: 'Thẻ ngân hàng', cardNumber: '4000000000000002' })).success).toBe(false);
  });

  it('ví điện tử: đúng OTP thì thành công, sai OTP thì bị từ chối', async () => {
    expect((await service.charge({ method: 'Ví điện tử', otp: WALLET_DEMO_OTP })).success).toBe(true);
    expect((await service.charge({ method: 'Ví điện tử', otp: '000000' })).success).toBe(false);
  });

  it('QR Code: token "decline" bị từ chối', async () => {
    expect((await service.charge({ method: 'QR Code', token: 'approved' })).success).toBe(true);
    expect((await service.charge({ method: 'QR Code', token: 'decline' })).success).toBe(false);
  });
});
