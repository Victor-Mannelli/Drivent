import ticketsRepository from "@/repositories/tickets-repository";

export async function getTicketsTypes() {
  return await ticketsRepository.findManyTicketsTypes();
}
export async function getTickets() {
  return await ticketsRepository.findManyTickets();
}
export async function checkTicketType(ticketTypeId: number) {
  return await ticketsRepository.findTicketTypeById(ticketTypeId);
}
export async function addTicket(ticketTypeid: number, enrollmentId: number) {
  await ticketsRepository.addTicket(ticketTypeid, enrollmentId);
}
