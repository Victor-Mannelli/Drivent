import paymentRepository from "@/repositories/payment-repository";
import { Payment } from "@/types/payment-type";

async function getPaymentTicket(ticketId: number) {
  return await paymentRepository.getPaymentTicket(ticketId);
}
async function postPaymentTicket(paymentInfo: Payment, price: number) {
  return await paymentRepository.postPaymentTicket(paymentInfo, price);
}
async function updateTicketStatus(ticketId: number) {
  await paymentRepository.updateTicketStatus(ticketId);
}

const paymentsService = {
  getPaymentTicket,
  postPaymentTicket,
  updateTicketStatus
};

export default paymentsService;
