-- AddForeignKey
ALTER TABLE "ComboItem" ADD CONSTRAINT "ComboItem_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
