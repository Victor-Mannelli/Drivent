import paymentsService from "@/services/payments-service";
import ticketService from "@/services/tickets-service";
import { Payment } from "@/protocols";
import { Request, Response } from "express";

export async function getPayments(req: Request, res: Response) {
  const ticketId = req.query.ticketId;
  try {
    const paymentTicket = await paymentsService.getPaymentTicket(Number(ticketId));
    res.status(200).send(paymentTicket);
    res.sendStatus(200);
  } catch (error) {
    return res.status(401).send(error);
  }
}

export async function postPayment(req: Request, res: Response) {
  const paymentInfo: Payment = req.body;
  const ticketTypeId: number = req.body.ticketTypeId;
  try {
    const value = await ticketService.getPriceByTicketTypeId(ticketTypeId);
    const paymentTicket = await paymentsService.postPaymentTicket(paymentInfo, value.price);
    await paymentsService.updateTicketStatus(paymentInfo.ticketId);
    
    res.status(200).send(paymentTicket);
  } catch (error) {
    return res.status(401).send(error);
  }
}
