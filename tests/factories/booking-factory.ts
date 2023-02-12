import { prisma } from "@/config";

export async function createBookedRoom(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}
