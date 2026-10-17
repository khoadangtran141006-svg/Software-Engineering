import { Injectable } from '@nestjs/common';

const DECLINED_TOKENS = ['decline', '4000000000000002'];

@Injectable()
export class MockPaymentService {
  async charge(token: string) {
    await Promise.resolve();
    return {
      success: !DECLINED_TOKENS.includes(token),
      reference: `MOCK-${Date.now()}`,
    };
  }
}
