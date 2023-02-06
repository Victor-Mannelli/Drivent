import hotelRepository from "@/repositories/hotel-repository";

async function getAllHotels() {
  return await hotelRepository.findManyHotels();
}
async function getHotelsRooms(hotelId: number) {
  return await hotelRepository.findManyHotelsRooms(hotelId);
}
async function getHotelById(hotelId: number) {
  return await hotelRepository.findHotelById(hotelId);
}

const hotelService = {
  getAllHotels,
  getHotelsRooms,
  getHotelById
};

export default hotelService;
