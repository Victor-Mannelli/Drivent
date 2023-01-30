/*
  Warnings:

  - A unique constraint covering the columns `[price]` on the table `TicketsTypes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TicketsTypes_price_key" ON "TicketsTypes"("price");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_value_fkey" FOREIGN KEY ("value") REFERENCES "TicketsTypes"("price") ON DELETE RESTRICT ON UPDATE CASCADE;
