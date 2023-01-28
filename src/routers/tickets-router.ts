// import { authenticateToken } from "@/middlewares";
import { tickets, ticketsTypes } from "@/controllers";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  // .all("/*", authenticateToken)
  .get("/types", ticketsTypes)
  .get("/", tickets);
// .post("/" );

export { ticketsRouter };
