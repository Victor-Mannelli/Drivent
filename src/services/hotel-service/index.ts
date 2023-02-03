import hotelRepository from "@/repositories/hotel-repository";

async function getAllHotels() {
  return await hotelRepository.findManyHotels();
}
async function getHotelsRooms(hotelId: number) {
  return await hotelRepository.findManyHotelsRooms(hotelId);
}

const hotelService = {
  getAllHotels,
  getHotelsRooms
};

export default hotelService;
