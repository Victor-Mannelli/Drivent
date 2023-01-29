import paymentRepository from "@/repositories/payment-repository";

export async function getPaymentTicket(ticketId: number) {
  return await paymentRepository.getPaymentTicket(ticketId);
}

const paymentsService = {
  getPaymentTicket
};

export default paymentsService;
