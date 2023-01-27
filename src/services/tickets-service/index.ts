import ticketsRepository from "@/repositories/tickets-repository";

export async function getTicketsTypes() {
  return await ticketsRepository.findManyTicketsTypes();
}
