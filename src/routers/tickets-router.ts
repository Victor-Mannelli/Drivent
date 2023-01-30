import { authenticateToken } from "@/middlewares";
import { addTickets, getTickets, ticketsTypes } from "@/controllers";
import { validateBody } from "@/middlewares";
import { ticketRequestValidation, ticketValidation } from "@/middlewares/tickets-middleware";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsTypes)
  .get("/", ticketRequestValidation, getTickets)
  .post("/", validateBody(ticketSchema), ticketValidation, addTickets);

export { ticketsRouter };
