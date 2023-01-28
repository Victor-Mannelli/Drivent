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
const ticketsRepository = {
  findManyTicketsTypes,
  findManyTickets
};

export default ticketsRepository;
