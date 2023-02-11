import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const bookingData = await bookingService.getBookingByUserId(req.userId);
    res.status(200).send(bookingData);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
