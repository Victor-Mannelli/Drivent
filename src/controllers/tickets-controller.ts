import { Request, Response } from "express";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import userService from "@/services/users-service";

export async function ticketsTypes(_req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketService.getTicketsTypes();
    res.status(200).send(ticketsTypes);
  } catch (error) {
    return res.status(401).send(error);
  }
}
export async function tickets(_req: Request, res: Response) {
  try {
    const tickets = await ticketService.getTickets();
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
    const userId = await userService.getUserIdByToken(token);
    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId.id);
    const ticket = await ticketService.addTicket(ticketTypeId, enrollmentId.id);
    res.status(201).send(ticket);
  } catch (error) {
    return res.status(401).send(error);
  }
}
