import { Injectable } from '@nestjs/common';

/** Mã OTP demo: nhập đúng mã này thì giao dịch ví thành công, nhập mã khác thì bị từ chối. */
export const WALLET_DEMO_OTP = '123456';
/** Số thẻ test luôn bị từ chối. */
const DECLINED_CARDS = ['4000000000000002'];

export type ChargeInput = {
  method: string;
  token?: string;
  cardNumber?: string;
  otp?: string;
};

@Injectable()
export class MockPaymentService {
  async charge(input: ChargeInput) {
    await Promise.resolve();
    let success: boolean;
    switch (input.method) {
      case 'Ví điện tử':
        success = input.otp === WALLET_DEMO_OTP;
        break;
      case 'Thẻ ngân hàng':
        success = !!input.cardNumber && !DECLINED_CARDS.includes(input.cardNumber);
        break;
      default:
        success = !!input.token && input.token !== 'decline';
    }
    return { success, reference: `MOCK-${Date.now()}` };
  }
}
