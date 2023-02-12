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
async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    },
    select: {
      id: true
    }
  });
}
async function updateBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId
    },
    select: {
      id: true
    }
  });
}
async function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

const bookingRepository = {
  findFirstUserBookedRoom,
  findRoomById,
  createBooking,
  updateBooking,
  findBookingById
};

export default bookingRepository;
