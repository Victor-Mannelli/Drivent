import { Router } from "express";
import { authenticateToken, validateBody, validateGetBooking, validatePostBooking } from "@/middlewares";
import { getBookingByUserId } from "@/controllers";
import { roomIdSchema } from "@/schemas/booking-schemas";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", validateGetBooking, getBookingByUserId)
  .post("/", validateBody(roomIdSchema), validatePostBooking);

export { bookingRouter };
