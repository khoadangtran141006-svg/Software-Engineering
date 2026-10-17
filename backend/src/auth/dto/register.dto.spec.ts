import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { describe, expect, it } from 'vitest';
import { RegisterDto } from './register.dto.js';

const emailErrors = async (email: string) => {
  const errors = await validate(plainToInstance(RegisterDto, { name: 'Khoa', email, password: 'matkhau123' }));
  return errors.filter((e) => e.property === 'email').flatMap((e) => Object.values(e.constraints ?? {}));
};

describe('RegisterDto – email', () => {
  it('chấp nhận email hợp lệ', async () => {
    for (const email of ['tdk@gmail.com', 'a.b@outlook.com', 'sv@student.sgu.edu.vn', 'x@congty.co']) {
      expect(await emailErrors(email)).toEqual([]);
    }
  });

  it('từ chối tên miền phổ biến bị gõ sai và gợi ý bản sửa', async () => {
    const errors = await emailErrors('tdk@gmail.co');
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('tdk@gmail.com');
    expect(await emailErrors('a@gmail.con')).not.toEqual([]);
    expect(await emailErrors('a@yahoo.co')).not.toEqual([]);
  });

  it('từ chối định dạng sai', async () => {
    for (const email of ['abc', 'abc@', 'abc@gmail', '@gmail.com']) {
      expect(await emailErrors(email)).not.toEqual([]);
    }
  });
});
