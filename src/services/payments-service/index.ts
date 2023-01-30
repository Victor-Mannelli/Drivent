import paymentRepository from "@/repositories/payment-repository";
import { Payment } from "@/types/payment-type";

export async function getPaymentTicket(ticketId: number) {
  return await paymentRepository.getPaymentTicket(ticketId);
}
export async function postPaymentTicket(paymentInfo: Payment) {
  return await paymentRepository.postPaymentTicket(paymentInfo);
}

const paymentsService = {
  getPaymentTicket,
  postPaymentTicket
};

export default paymentsService;
