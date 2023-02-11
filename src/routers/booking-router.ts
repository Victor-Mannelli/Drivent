import { Router } from "express";
import { authenticateToken, validateBooking } from "@/middlewares";
import { getBookingByUserId } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", validateBooking, getBookingByUserId);

export { bookingRouter };
