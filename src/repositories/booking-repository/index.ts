import { prisma } from "@/config";

async function findFirstUserBookedRoom(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    select: {
      id: true,
      Room: true
    }
  });
}
async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    }
  });
}

const bookingRepository = {
  findFirstUserBookedRoom,
  findRoomById
};

export default bookingRepository;
