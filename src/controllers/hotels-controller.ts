import hotelService from "@/services/hotel-service";
import { Request, Response } from "express";

export async function getAllHotels(_req: Request, res: Response) {
  try {
    const allHotels = await hotelService.getAllHotels();
    res.status(200).send(allHotels);
  } catch (error) {
    return res.status(401).send(error);
  }
}
export async function getHotelsRooms(req: Request, res: Response) {
  try {
    const hotelId: string = req.params.hotelId;
    const hotelsRooms = await hotelService.getHotelsRooms(Number(hotelId));
    res.status(200).send(hotelsRooms);
  } catch (error) {
    return res.status(401).send(error);
  }
}
