-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "stocks" INTEGER NOT NULL DEFAULT 0;
