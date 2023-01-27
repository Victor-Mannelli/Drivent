import { Request, Response } from "express";
import { getTicketsTypes } from "@/services";

export async function ticketsTypes(_req: Request, res: Response) {
  try {
    const ticketsTypes = await getTicketsTypes();
    res.status(200).send(ticketsTypes);
  } catch (error) {
    console.log(error);
  }
}
