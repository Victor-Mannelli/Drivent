import { authenticateToken, validateParams } from "@/middlewares";
import { getAllHotels, getHotelsRooms } from "@/controllers/hotels-controller";
import { Router } from "express";
import { hotelIdSchema } from "@/schemas/hotel-schemas";
import { validateHotels } from "@/middlewares/hotels-middleware";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", validateHotels, getAllHotels)
  .get("/:hotelId", validateParams(hotelIdSchema), validateHotels, getHotelsRooms);

export { hotelsRouter };
