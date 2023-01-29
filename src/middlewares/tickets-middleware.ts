import { checkTicketType } from "@/services";
import { NextFunction, Request, Response } from "express";

export async function ticketValidation(req: Request, res: Response, next: NextFunction) {
  const ticketTypeId: number = req.body.ticketTypeId;
  try {
    const ticketTypeExists = await checkTicketType(ticketTypeId);
    if (!ticketTypeExists) return res.status(404).send({ message: "ticket type not found" });
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
}
