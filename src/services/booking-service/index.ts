import bookingRepository from "@/repositories/booking-repository";

async function getBookingByUserId(userId: number) {
  return await bookingRepository.findFirstUserBookedRoom(userId);
}

const bookingService = {
  getBookingByUserId
};

export default bookingService;
