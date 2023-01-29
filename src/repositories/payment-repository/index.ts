import { prisma } from "@/config";

async function getPaymentTicket(ticketId: number) {
  return await prisma.payments.findFirst({
    where: {
      ticketId
    }
  });
}

const paymentRepository = {
  getPaymentTicket
};

export default paymentRepository;
