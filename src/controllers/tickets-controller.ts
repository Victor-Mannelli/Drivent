import { Request, Response } from "express";
import { getTickets, getTicketsTypes } from "@/services";

export async function ticketsTypes(_req: Request, res: Response) {
  try {
    const ticketsTypes = await getTicketsTypes();
    res.status(200).send(ticketsTypes);
  } catch (error) {
    return res.status(401).send(error);
  }
}
export async function tickets(_req: Request, res: Response) {
  try {
    const tickets = await getTickets();
    res.status(200).send(tickets);
  } catch (error) {
    return res.status(401).send(error);
  }
}
