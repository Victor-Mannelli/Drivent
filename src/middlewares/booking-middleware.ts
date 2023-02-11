import bookingService from "@/services/booking-service";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import httpStatus from "http-status";

export async function validateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId: number = req.userId;
  const bookingData = await bookingService.getBookingByUserId(userId);

  if(bookingData === null) return res.sendStatus(httpStatus.NOT_FOUND);

  next();
}
