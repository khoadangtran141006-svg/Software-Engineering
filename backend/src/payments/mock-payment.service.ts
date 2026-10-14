import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPaymentService {
  async charge(token: string) {
    await Promise.resolve();
    return { success: token !== 'decline', reference: `MOCK-${Date.now()}` };
  }
}
