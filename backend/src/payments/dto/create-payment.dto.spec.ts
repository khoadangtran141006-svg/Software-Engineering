import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { CreatePaymentDto } from './create-payment.dto.js';

const errorsOf = async (body: Record<string, unknown>) =>
  (await validate(plainToInstance(CreatePaymentDto, { orderId: 1, ...body }))).map((e) => e.property);

describe('CreatePaymentDto', () => {
  describe('Thẻ ngân hàng (16–19 chữ số)', () => {
    const card = (cardNumber: string) => errorsOf({ method: 'Thẻ ngân hàng', cardNumber });

    it('chấp nhận 16, 17, 18 và 19 chữ số', async () => {
      for (const length of [16, 17, 18, 19]) expect(await card('4'.repeat(length))).toEqual([]);
    });

    it('từ chối 1 chữ số, 15 chữ số, 20 chữ số và 30 chữ số', async () => {
      for (const length of [1, 15, 20, 30]) expect(await card('4'.repeat(length))).toContain('cardNumber');
    });

    it('từ chối số thẻ có chữ cái hoặc khoảng trắng', async () => {
      expect(await card('4242 4242 4242 4242')).toContain('cardNumber');
      expect(await card('abcdabcdabcdabcd')).toContain('cardNumber');
    });

    it('từ chối khi thiếu số thẻ', async () => {
      expect(await errorsOf({ method: 'Thẻ ngân hàng' })).toContain('cardNumber');
    });
  });

  describe('Ví điện tử', () => {
    const wallet = (extra: Record<string, unknown>) =>
      errorsOf({ method: 'Ví điện tử', walletProvider: 'MoMo', walletPhone: '0912345678', otp: '123456', ...extra });

    it('chấp nhận đủ ví, số điện thoại và OTP hợp lệ', async () => {
      expect(await wallet({})).toEqual([]);
    });

    it('từ chối ví không hỗ trợ, số điện thoại sai và OTP sai định dạng', async () => {
      expect(await wallet({ walletProvider: 'Abc' })).toContain('walletProvider');
      expect(await wallet({ walletPhone: '12345' })).toContain('walletPhone');
      expect(await wallet({ walletPhone: '0212345678' })).toContain('walletPhone');
      expect(await wallet({ otp: '12' })).toContain('otp');
    });
  });

  it('QR Code vẫn cần token', async () => {
    expect(await errorsOf({ method: 'QR Code', token: 'approved' })).toEqual([]);
    expect(await errorsOf({ method: 'QR Code' })).toContain('token');
  });

  it('từ chối phương thức không hợp lệ', async () => {
    expect(await errorsOf({ method: 'Tiền mặt', token: 'x' })).toContain('method');
  });
});
