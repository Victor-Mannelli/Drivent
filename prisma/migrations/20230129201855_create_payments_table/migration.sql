/*
  Warnings:

  - A unique constraint covering the columns `[enrollmentId]` on the table `Tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "cardIssuer" TEXT NOT NULL,
    "cardLastDigits" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_ticketId_key" ON "Payments"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_enrollmentId_key" ON "Tickets"("enrollmentId");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
