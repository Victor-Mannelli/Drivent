import { prisma } from "@/config";

async function findManyHotels() {
  return prisma.hotel.findMany();
}
async function findManyHotelsRooms(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}
async function findHotelById(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId
    }
  });
}

const hotelRepository = {
  findManyHotels,
  findManyHotelsRooms,
  findHotelById
};

export default hotelRepository;
