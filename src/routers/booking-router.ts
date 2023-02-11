import { Router } from "express";
import { authenticateToken, validateBody, validateGetBooking, validatePostBooking, validateRoomChanges } from "@/middlewares";
import { getBookingByUserId, postBooking, putRoomChange } from "@/controllers";
import { roomIdSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", validateGetBooking, getBookingByUserId)
  .post("/", validateBody(roomIdSchema), validatePostBooking, postBooking)
  .put("/:bookingId", validateBody(roomIdSchema), validateRoomChanges, putRoomChange);

export { bookingRouter };
