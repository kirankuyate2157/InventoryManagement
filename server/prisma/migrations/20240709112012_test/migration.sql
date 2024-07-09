-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "inv_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT,
    "unit" TEXT NOT NULL,
    "categories" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);
