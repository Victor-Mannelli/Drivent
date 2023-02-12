import { Router } from "express";
import { authenticateToken, validateBody, validateGetBooking, validateParams, validatePostBooking, validateRoomChanges } from "@/middlewares";
import { getBookingByUserId, postBooking, putRoomChange } from "@/controllers";
import { bookingIdSchema, roomIdSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", validateGetBooking, getBookingByUserId)
  .post("/", validateBody(roomIdSchema), validatePostBooking, postBooking)
  .put("/:bookingId", validateBody(roomIdSchema), validateParams(bookingIdSchema), validateRoomChanges, putRoomChange);

export { bookingRouter };
