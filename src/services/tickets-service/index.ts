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
  return await ticketsRepository.addTicket(ticketTypeid, enrollmentId);
}
export async function getTicketById(ticketId: number) {
  return await ticketsRepository.ticketById(ticketId);
}
export async function checkTicketOwnership(ticketId: number, enrollmentId: number) {
  return await ticketsRepository.checkTicketOwnership(ticketId, enrollmentId);
}

const ticketService = {
  getTicketsTypes,
  getTickets,
  checkTicketType,
  addTicket,
  getTicketById,
  checkTicketOwnership
};

export default ticketService;
