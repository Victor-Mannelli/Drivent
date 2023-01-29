import { getPayments } from "@/controllers";
import { authenticateToken, validateTicketId } from "@/middlewares";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", validateTicketId, getPayments);
// .post("/process", );

export { paymentRouter };
