import { prisma } from "@/config";
import { Payment } from "@/types/payment-type";

async function getPaymentTicket(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}
async function postPaymentTicket(paymentInfo: Payment, price: number) {
  return await prisma.payment.create({
    data: {
      ticketId: paymentInfo.ticketId,
      cardIssuer: paymentInfo.cardData.issuer,
      cardLastDigits: paymentInfo.cardData.number.toString().slice(-4),
      updatedAt: new Date().toISOString(),
      value: price
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true,
    }
  });
}
async function updateTicketStatus(ticketId: number) {
  await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID"
    }
  });
}
const paymentRepository = {
  getPaymentTicket,
  postPaymentTicket,
  updateTicketStatus
};

export default paymentRepository;
