import enrollmentsService from "@/services/enrollments-service";
import hotelService from "@/services/hotel-service";
import ticketService from "@/services/tickets-service";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userEnrollment = await enrollmentsService.getEnrollmentIdByUserId(req.userId);
  if (userEnrollment === null) return res.status(404).send("User has no enrollments");

  const userTicket = await ticketService.getTicketByEnrollmentId(userEnrollment.id);
  if (userTicket === null) return res.status(404).send("User has no tickets");
  if (userTicket.status !== "PAID") return res.status(402).send("Ticket is yet to be paid");
  
  const ticketType = await ticketService.getTicketTypeByTicketTypeId(userTicket.ticketTypeId);
  if (ticketType.isRemote === true) return res.status(402).send("Ticket is remote");
  if (ticketType.includesHotel === false) return res.status(402).send("Ticket doesn't include hotel");
  
  const allHotels = await hotelService.getAllHotels();
  if (allHotels.length === 0) return res.status(404).send("No hotels found");

  next();
}

export async function validateHotelId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const hotelId = req.params.hotelId;
  const hotel = await hotelService.getHotelById(Number(hotelId));
  if (hotel.length === 0) return res.status(404).send("No valid hotel with corresponding id");

  next();
}
