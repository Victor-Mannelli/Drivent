import { prisma } from "@/config";

async function findManyTicketsTypes() {
  return prisma.ticketsTypes.findMany();
}
async function findManyTickets() {
  return prisma.tickets.findMany({
    include: {
      TicketType: true
    }
  });
}
async function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketsTypes.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}
async function addTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.tickets.create ({
    data: {
      status: "reserverd",
      ticketTypeId,
      enrollmentId
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: true,
      createdAt: true,
      updatedAt: true
    }
  });
}
async function ticketById(ticketId: number) {
  return prisma.tickets.findFirst({
    where: {
      id: ticketId
    }
  });
}
async function checkTicketOwnership(ticketId: number, enrollmentId: number) {
  return prisma.tickets.findMany({
    where: {
      id: ticketId,
      enrollmentId
    }
  });
}
async function priceByTicketTypeId(ticketTypeId: number) {
  return prisma.ticketsTypes.findFirst({
    where: {
      id: ticketTypeId
    },
    select: {
      price: true
    }
  });
}

const ticketsRepository = {
  findManyTicketsTypes,
  findManyTickets,
  findTicketTypeById,
  addTicket,
  ticketById,
  checkTicketOwnership,
  priceByTicketTypeId
};

export default ticketsRepository;
