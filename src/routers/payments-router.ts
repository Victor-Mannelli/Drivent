import { authenticateToken, validatePayment, validateTicketId } from "@/middlewares";
import { getPayments, postPayment } from "@/controllers";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", validateTicketId, getPayments)
  .post("/process", validatePayment, postPayment);

export { paymentRouter };
