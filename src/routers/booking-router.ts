import { Router } from "express";
import { authenticateToken, validateBooking } from "@/middlewares";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", validateBooking);

export { bookingRouter };
