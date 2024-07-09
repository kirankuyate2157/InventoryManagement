-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "inv_id" SET DEFAULT 'inv_001';

-- CreateTable
CREATE TABLE "Combo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "total_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComboItem" (
    "id" SERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "comboPrice" DOUBLE PRECISION NOT NULL,
    "comboUnit" TEXT NOT NULL,
    "combo_id" INTEGER NOT NULL,

    CONSTRAINT "ComboItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ComboItem_inventory_id_combo_id_key" ON "ComboItem"("inventory_id", "combo_id");

-- AddForeignKey
ALTER TABLE "ComboItem" ADD CONSTRAINT "ComboItem_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "Combo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
