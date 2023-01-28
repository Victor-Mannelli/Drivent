import ticketsRepository from "@/repositories/tickets-repository";

export async function getTicketsTypes() {
  return await ticketsRepository.findManyTicketsTypes();
}
export async function getTickets() {
  return await ticketsRepository.findManyTickets();
}
