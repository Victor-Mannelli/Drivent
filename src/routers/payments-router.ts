import { paymentSchema } from "@/schemas";
import { authenticateToken, validateBody, validatePayment, validateTicketId } from "@/middlewares";
import { getPayments } from "@/controllers";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", validateTicketId, getPayments)
  .post("/process", validateBody(paymentSchema), validatePayment );

export { paymentRouter };
