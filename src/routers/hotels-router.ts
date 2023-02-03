// import { authenticateToken } from "@/middlewares";
import { getHotels } from "@/controllers/hotels-controller";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter
  // .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", );

export { hotelsRouter };
