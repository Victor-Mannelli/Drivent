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

const bookingRepository = {
  findFirstUserBookedRoom
};

export default bookingRepository;
