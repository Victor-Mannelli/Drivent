import { authenticateToken } from "@/middlewares";
import { addTickets, tickets, ticketsTypes } from "@/controllers";
import { validateBody } from "@/middlewares";
import { ticketValidation } from "@/middlewares/tickets-middleware";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsTypes)
  .get("/", tickets)
  .post("/", validateBody(ticketSchema), ticketValidation, addTickets);

export { ticketsRouter };
