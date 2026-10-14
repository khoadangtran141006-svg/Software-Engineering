import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { User } from '../users/entities/user.entity.js';

describe('AuthService', () => {
  const passwordHash = '$2b$10$T5q9AZdKpU4s0TlpfuQ01uEkCc7yj5sgZyxNaNf4szjJpE.JQ0rHS';
  const user = { id: 7, name: 'Test User', email: 'test@example.com', passwordHash, role: 'CUSTOMER', createdAt: new Date() };
  const repository = {
    findOne: vi.fn(),
    create: vi.fn((data: Partial<User>) => data),
    save: vi.fn(),
  };
  const resetTokens = { create: vi.fn((data: unknown) => data), save: vi.fn(), delete: vi.fn(), findOne: vi.fn() };
  const dataSource = { transaction: vi.fn(async (callback: (manager: { update: ReturnType<typeof vi.fn> }) => unknown) => callback({ update: vi.fn().mockResolvedValue({ affected: 1 }) })) };
  const jwt = { signAsync: vi.fn().mockResolvedValue('signed-token') };
  let service: AuthService;

  beforeEach(() => {
    vi.clearAllMocks();
    resetTokens.findOne.mockResolvedValue(null);
    service = new AuthService(repository as never, jwt as never, resetTokens as never, dataSource as never);
  });

  it('registers a user and does not return the password hash', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.save.mockImplementation(async (data: Partial<User>) => ({ ...data, id: 7, createdAt: user.createdAt }));
    const result = await service.register({ name: 'Test User', email: 'test@example.com', password: 'secret12' });
    expect(result).toMatchObject({ id: 7, name: 'Test User', email: 'test@example.com' });
    expect(result).not.toHaveProperty('passwordHash');
    expect(repository.save.mock.calls[0][0].passwordHash).not.toBe('secret12');
  });

  it('rejects duplicate email registration', async () => {
    repository.findOne.mockResolvedValue(user);
    await expect(service.register({ name: 'Test User', email: user.email, password: 'secret12' })).rejects.toBeInstanceOf(ConflictException);
  });

  it('issues a signed JWT for valid credentials', async () => {
    const bcrypt = await import('bcrypt');
    const validHash = await bcrypt.hash('secret12', 4);
    repository.findOne.mockResolvedValue({ ...user, passwordHash: validHash });
    await expect(service.login({ email: user.email, password: 'secret12' })).resolves.toMatchObject({ accessToken: 'signed-token', user: { id: 7 } });
    expect(jwt.signAsync).toHaveBeenCalledWith({ sub: 7, email: user.email, role: 'CUSTOMER' });
  });

  it('rejects incorrect credentials', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.login({ email: user.email, password: 'wrong' })).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('creates a short-lived development reset token without storing it in plain text', async () => {
    repository.findOne.mockResolvedValue(user);
    resetTokens.save.mockImplementation(async (value: unknown) => value);
    const result = await service.forgotPassword(user.email);
    expect(result).toHaveProperty('resetToken');
    expect(resetTokens.save.mock.calls[0][0].tokenHash).not.toBe(result.resetToken);
    expect(resetTokens.save.mock.calls[0][0].expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it('rejects an unknown or expired reset token', async () => {
    resetTokens.findOne.mockResolvedValue(null);
    await expect(service.resetPassword('a'.repeat(64), 'newsecret12')).rejects.toThrow();
  });
});
