import { ticketIdSchema } from "@/schemas";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketId = req.query.ticketId;
  
  if (!ticketId) return res.sendStatus(400);
  if (ticketId) {
    const { error } = ticketIdSchema.validate(ticketId, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  }

  const ticketExists = await ticketService.getTicketById(Number(ticketId));
  if (!ticketExists) return res.sendStatus(404);

  const userId: number = req.userId;
  const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);

  const ticketIsFromUser = await ticketService.checkTicketOwnership(Number(ticketId), enrollmentId.id);
  if (!ticketIsFromUser) return res.sendStatus(401);

  next();
}

export async function validatePayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId: number = req.userId;
  const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId);
  
  const { ticketId } = req.body;
  const ticketExists = await ticketService.getTicketById(Number(ticketId));
  if (!ticketExists) return res.sendStatus(404);

  const ticketIsFromUser = await ticketService.checkTicketOwnership(Number(ticketId), enrollmentId.id);
  if (!ticketIsFromUser) return res.sendStatus(401);

  next();
}
