import hotelRepository from "@/repositories/hotel-repository";

async function getHotels() {
  return await hotelRepository.findManyHotels();
}

const hotelService = {
  getHotels
};

export default hotelService;
