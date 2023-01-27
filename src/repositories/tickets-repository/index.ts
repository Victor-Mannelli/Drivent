import { prisma } from "@/config";

async function findManyTicketsTypes() {
  return prisma.ticketsTypes.findMany();
}

const ticketsRepository = {
  findManyTicketsTypes
};

export default ticketsRepository;
