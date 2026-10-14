CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
