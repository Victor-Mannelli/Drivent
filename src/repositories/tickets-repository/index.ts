import { prisma } from "@/config";

async function findManyTicketsTypes() {
  return prisma.ticketType.findMany();
}
async function findManyTickets() {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true
    }
  });
}
async function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}
async function addTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create ({
    data: {
      status: "RESERVED",
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
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    }
  });
}
async function checkTicketOwnership(ticketId: number, enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      enrollmentId
    }
  });
}
async function priceByTicketTypeId(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    },
    select: {
      price: true
    }
  });
}
async function ticketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId
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
  priceByTicketTypeId,
  ticketByEnrollmentId
};

export default ticketsRepository;
