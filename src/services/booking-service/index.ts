import bookingRepository from "@/repositories/booking-repository";

async function getBookingByUserId(userId: number) {
  return await bookingRepository.findFirstUserBookedRoom(userId);
}
async function getRoomById(roomId: number) {
  return await bookingRepository.findRoomById(roomId);
}

const bookingService = {
  getBookingByUserId,
  getRoomById
};

export default bookingService;
