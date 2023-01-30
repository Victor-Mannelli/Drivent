import { prisma } from "@/config";
import { Payment } from "@/types/payment-type";

async function getPaymentTicket(ticketId: number) {
  return await prisma.payments.findFirst({
    where: {
      ticketId
    }
  });
}
async function postPaymentTicket(paymentInfo: Payment, price: number) {
  return await prisma.payments.create({
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

const paymentRepository = {
  getPaymentTicket,
  postPaymentTicket
};

export default paymentRepository;
