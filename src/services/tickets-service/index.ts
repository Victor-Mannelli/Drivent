import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  return await ticketsRepository.findManyTicketsTypes();
}
async function getTickets() {
  return await ticketsRepository.findManyTickets();
}
async function checkTicketType(ticketTypeId: number) {
  return await ticketsRepository.findTicketTypeById(ticketTypeId);
}
async function addTicket(ticketTypeid: number, enrollmentId: number) {
  return await ticketsRepository.addTicket(ticketTypeid, enrollmentId);
}
async function getTicketById(ticketId: number) {
  return await ticketsRepository.ticketById(ticketId);
}
async function checkTicketOwnership(ticketId: number, enrollmentId: number) {
  return await ticketsRepository.checkTicketOwnership(ticketId, enrollmentId);
}
async function getTicketTypeByTicketTypeId(ticketTypeId: number) {
  return await ticketsRepository.TicketTypeByTicketTypeId(ticketTypeId);
}
async function getTicketByEnrollmentId(enrollmentId: number) {
  return await ticketsRepository.ticketByEnrollmentId(enrollmentId);
}

const ticketService = {
  getTicketsTypes,
  getTickets,
  checkTicketType,
  addTicket,
  getTicketById,
  checkTicketOwnership,
  getTicketTypeByTicketTypeId,
  getTicketByEnrollmentId
};

export default ticketService;
