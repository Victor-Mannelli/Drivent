import { Request, Response } from "express";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function ticketsTypes(_req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketService.getTicketsTypes();
    res.status(200).send(ticketsTypes);
  } catch (error) {
    return res.status(401).send(error);
  }
}
export async function getTickets(_req: Request, res: Response) {
  try {
    const tickets = await ticketService.getTickets();
    res.status(200).send(tickets);
  } catch (error) {
    return res.status(401).send(error);
  }
}
export async function addTickets(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId: number = req.body.ticketTypeId;
  const userId: number = req.userId;

  try {
    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);
    const ticket = await ticketService.addTicket(ticketTypeId, enrollmentId.id);
    res.status(201).send(ticket);
  } catch (error) {
    return res.status(401).send(error);
  }
}
