import { getPaymentTicket, postPaymentTicket } from "@/services";
import { Payment } from "@/types/payment-type";
import { Request, Response } from "express";

export async function getPayments(req: Request, res: Response) {
  const ticketId = req.query.ticketId;
  try {
    const paymentTicket = await getPaymentTicket(Number(ticketId));
    res.status(200).send(paymentTicket);
  } catch (error) {
    return res.status(401).send(error);
  }
}

export async function postPayment(req: Request, res: Response) {
  const paymentInfo: Payment = req.body;
  try {
    const paymentTicket = await postPaymentTicket(paymentInfo);
    res.status(200).send(paymentTicket);
  } catch (error) {
    return res.status(401).send(error);
  }
}
