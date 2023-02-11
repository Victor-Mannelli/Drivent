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
async function putRoomChange(roomId: number, bookingId: number) {
  return await bookingRepository.updateBooking(roomId, bookingId);
}

const bookingService = {
  getBookingByUserId,
  getRoomById,
  postBooking,
  putRoomChange
};

export default bookingService;
