import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response) {
  try {
    const bookingData = await bookingService.getBookingByUserId(req.userId);
    res.status(200).send(bookingData);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}
export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const userId: number = req.userId;
    const roomId: number = req.body.roomId;
    const bookingId = await bookingService.postBooking(roomId, userId);
    res.status(200).send(bookingId.id);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}
export async function putRoomChange(req: AuthenticatedRequest, res: Response) {
  try {
    const roomId: number = req.body.roomId;
    const userId: number = req.userId;
    const userBookedRoom = await bookingService.getBookingByUserId(userId);
    const bookingId = await bookingService.putRoomChange(roomId, userBookedRoom.id);
    res.status(200).send(bookingId.id);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  } 
}
