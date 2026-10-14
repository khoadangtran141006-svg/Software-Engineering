import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    const username = encodeURIComponent(config.getOrThrow<string>('DB_USERNAME'));
    const password = encodeURIComponent(config.get<string>('DB_PASSWORD', ''));
    const host = config.getOrThrow<string>('DB_HOST');
    const port = config.get<string>('DB_PORT', '5432');
    const database = encodeURIComponent(config.getOrThrow<string>('DB_NAME'));
    const connectionString = config.get<string>('DATABASE_URL')
      ?? `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;
    super({ adapter: new PrismaPg({ connectionString }) });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
