import { getPaymentTicket } from "@/services";
import { Request, Response } from "express";

export async function getPayments(req: Request, res: Response) {
  try {
    const ticketId = req.query.ticketId;
    const paymentTicket = await getPaymentTicket(Number(ticketId));
    res.status(200).send(paymentTicket);
  } catch (error) {
    return res.status(401).send(error);
  }
}
