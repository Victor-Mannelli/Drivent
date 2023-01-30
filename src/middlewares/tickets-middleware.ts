import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function ticketValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketTypeId: number = req.body.ticketTypeId;
  const userId: number = req.userId;

  try {
    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);
    if(!enrollmentId) return res.status(404).send("user doesnt have an enrollment yet");

    const ticketTypeExists = await ticketService.checkTicketType(ticketTypeId);
    if (!ticketTypeExists) return res.status(404).send({ message: "ticket type not found" });
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
}
export async function ticketRequestValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId: number = req.userId;

    const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);
    if(!enrollmentId) return res.status(404).send("user doesnt have an enrollment yet");

    const ticket = await ticketService.getTicketByEnrollmentId(enrollmentId.id);
    if (!ticket) return res.status(404).send("User doesnt have a ticket yet");
 
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
}
