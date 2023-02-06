import { authenticateToken, validateHotelId, validateHotels, validateParams } from "@/middlewares";
import { getAllHotels, getHotelsRooms } from "@/controllers/hotels-controller";
import { Router } from "express";
import { hotelIdSchema } from "@/schemas/hotel-schemas";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", validateHotels, getAllHotels)
  .get("/:hotelId", validateParams(hotelIdSchema), validateHotels, validateHotelId, getHotelsRooms);

export { hotelsRouter };
