import bookingRepository from "@/repositories/booking-repository";

async function getBookingByUserId(userId: number) {
  return await bookingRepository.findFirstUserBookedRoom(userId);
}
async function getRoomById(roomId: number) {
  return await bookingRepository.findRoomById(roomId);
}
async function postBooking(roomId: number, userId: number) {
  return await bookingRepository.createBooking(roomId, userId);
}

const bookingService = {
  getBookingByUserId,
  getRoomById,
  postBooking
};

export default bookingService;
