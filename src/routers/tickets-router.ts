import { authenticateToken } from "@/middlewares";
import { ticketsTypes } from "@/controllers";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsTypes);

export { ticketsRouter };
