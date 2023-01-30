import { ticketIdSchema } from "@/schemas";
import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import userService from "@/services/users-service";
import { Request, Response, NextFunction } from "express";

export async function validateTicketId(req: Request, res: Response, next: NextFunction) {
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

  const header: string = req.header("Authorization");
  const token: string = header.replace("Bearer ", "");
  const userId = await userService.getUserIdByToken(token);
  const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId.id);

  const ticketIsFromUser = await ticketService.checkTicketOwnership(Number(ticketId), enrollmentId.id);
  if (!ticketIsFromUser) return res.sendStatus(401);

  next();
}

export async function validatePayment(req: Request, res: Response, next: NextFunction) {
  const header: string = req.header("Authorization");
  const token: string = header.replace("Bearer ", "");
  const userId = await userService.getUserIdByToken(token);
  const enrollmentId = await enrollmentsService.getEnrollmentIdByUserId(userId.id);
  
  const { ticketId } = req.body;
  const ticketExists = await ticketService.getTicketById(Number(ticketId));
  if (!ticketExists) return res.sendStatus(404);

  const ticketIsFromUser = await ticketService.checkTicketOwnership(Number(ticketId), enrollmentId.id);
  if (!ticketIsFromUser) return res.sendStatus(401);

  next();
}
