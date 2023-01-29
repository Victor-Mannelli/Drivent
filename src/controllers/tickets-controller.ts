import { Request, Response } from "express";
import { addTicket, getTickets, getTicketsTypes, getUserIdByToken } from "@/services";
import enrollmentsService from "@/services/enrollments-service";

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
export async function addTickets(req: Request, res: Response) {
  const ticketTypeId: number = req.body.ticketTypeId;
  const header: string = req.header("Authorization");
  const token: string = header.replace("Bearer ", "");

  try {
    const userId = await getUserIdByToken(token);
    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId.id);
    const ticket = await addTicket(ticketTypeId, enrollmentId.id);
    res.status(201).send(ticket);
    res.status(201);
  } catch (error) {
    return res.status(401).send(error);
  }
}
