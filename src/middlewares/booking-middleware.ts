import bookingService from "@/services/booking-service";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import httpStatus from "http-status";

export async function validateGetBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId: number = req.userId;
  const bookingData = await bookingService.getBookingByUserId(userId);

  if (bookingData === null) return res.sendStatus(httpStatus.NOT_FOUND);

  next();
}
export async function validatePostBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const roomId: number = req.body.roomId;

  const Room = await bookingService.getRoomById(roomId);
  if (Room === null) return res.sendStatus(httpStatus.NOT_FOUND);
  if (Room.capacity !== 0) return res.sendStatus(httpStatus.FORBIDDEN);

  next();
}
