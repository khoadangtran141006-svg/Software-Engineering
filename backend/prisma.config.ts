import { defineConfig } from 'prisma/config';

const username = encodeURIComponent(process.env.DB_USERNAME ?? 'postgres');
const password = encodeURIComponent(process.env.DB_PASSWORD ?? '');
const host = process.env.DB_HOST ?? 'localhost';
const port = process.env.DB_PORT ?? '5432';
const database = encodeURIComponent(process.env.DB_NAME ?? 'brewlite_db');
const databaseUrl = process.env.DATABASE_URL
  ?? `postgresql://${username}:${password}@${host}:${port}/${database}?schema=public`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node --experimental-strip-types prisma/seed.ts',
  },
  datasource: {
    url: databaseUrl,
  },
});
