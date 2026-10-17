import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity.js';

/**
 * Tạo sẵn một tài khoản STAFF (barista) để demo chuyển trạng thái đơn.
 * Chỉ chạy khi STAFF_EMAIL và STAFF_PASSWORD được khai báo trong .env.
 */
@Injectable()
export class StaffSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(StaffSeedService.name);

  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const email = this.config.get<string>('STAFF_EMAIL')?.trim().toLowerCase();
    const password = this.config.get<string>('STAFF_PASSWORD');
    if (!email || !password) return;

    const existing = await this.users.findOne({ where: { email } });
    if (existing) {
      if (existing.role !== 'STAFF') {
        existing.role = 'STAFF';
        await this.users.save(existing);
      }
      return;
    }
    await this.users.save(
      this.users.create({
        name: 'Barista',
        email,
        passwordHash: await bcrypt.hash(password, 10),
        role: 'STAFF',
      }),
    );
    this.logger.log(`Đã tạo tài khoản STAFF: ${email}`);
  }
}
