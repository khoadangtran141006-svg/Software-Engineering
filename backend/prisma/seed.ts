
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to seed products');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const products = [
  {
    id: 1,
    name: 'Cà phê sữa',
    category: 'coffee',
    price: 30000,
    imageUrl:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=85',
    stock: 20,
  },
  {
    id: 2,
    name: 'Cà phê đen',
    category: 'coffee',
    price: 25000,
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',
    stock: 20,
  },
  {
    id: 3,
    name: 'Bạc xỉu',
    category: 'coffee',
    price: 35000,
    imageUrl:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=85',
    stock: 15,
  },
  {
    id: 4,
    name: 'Trà đào',
    category: 'tea',
    price: 40000,
    imageUrl:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85',
    stock: 15,
  },
  {
    id: 5,
    name: 'Trà sữa',
    category: 'milk-tea',
    price: 45000,
    imageUrl:
      'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=1000&q=85',
    stock: 15,
  },
];

try {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      create: product,
      update: {},
    });
  }

  await prisma.$queryRaw`
    SELECT setval(
      pg_get_serial_sequence('"products"', 'id'),
      COALESCE(MAX(id), 1),
      MAX(id) IS NOT NULL
    )
    FROM "products"
  `;
} finally {
  await prisma.$disconnect();
}
