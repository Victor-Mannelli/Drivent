-- CreateTable
CREATE TABLE "TicketsTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isRemote" BOOLEAN NOT NULL,
    "includesHotel" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketsTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "ticketTypeId" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_ticketTypeId_key" ON "Tickets"("ticketTypeId");

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "TicketsTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
