import app, { init } from "@/app";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import * as jwt from "jsonwebtoken";
import { createBookedRoom, createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { createHotel, createValidHotelRoom, createInvalidHotelRoom } from "../factories/hotels-factory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /booking", () => {
  it("Should respond with status 401 if no token is given", async () => {
    const response = await server.get("/booking");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    it("Should responde with status 404 if user doesn't have a booked room", async () => {
      const token = await generateValidToken();

      const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("Should responde with status 200 and booked room data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createValidHotelRoom(hotel.id);
      await createBookedRoom(user.id, room.id);

      const response = await server.get("/booking").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        Room: {
          id: expect.any(Number),
          name: expect.any(String),
          capacity: expect.any(Number),
          hotelId: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }
      });
    });
  });
});

describe("POST /booking", () => {
  it("Should respond with status 401 if no token is given", async () => {
    const response = await server.post("/booking");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/booking").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    it("Should responde with status 400 if roomId is not received", async () => {
      const token = await generateValidToken();
      const response = await server.post("/booking").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("Should responde with status 404 if roomId is invalid", async () => {
      const token = await generateValidToken();
      const body = { roomId: 1 };
      const response = await server.post("/booking").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("Should responde with status 403 if room has 0 capacity", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createInvalidHotelRoom(hotel.id);
      const body = { roomId: room.id };

      const response = await server.post("/booking").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });
    it("Should responde with status 200 and bookingId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createValidHotelRoom(hotel.id);
      const body = { roomId: room.id };

      const response = await server.post("/booking").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        bookingId: expect.any(Number)
      });
    });
  });
});

describe("PUT /booking/:bookingId", () => {
  it("Should respond with status 401 if no token is given", async () => {
    const response = await server.put("/booking/1");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.put("/booking/1").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("Should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.put("/booking/1").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("When token is valid", () => {
    it("Should responde with status 400 if roomId is not received", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.put("/booking/1").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("Should responde with status 400 if bookingId is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = { roomId: 1 };

      const response = await server.put("/booking/a").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("Should responde with status 404 if bookingId doesn't match with any existing booking", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = { roomId: faker.datatype.number({ min: 1 }) };

      const response = await server.put("/booking/-1").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("Should responde with status 404 if user doesn't have a room booked", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const body = { roomId: faker.datatype.number({ min: 1 }) };

      const response = await server.put("/booking/1").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("Should responde with status 404 if new room doesn't exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room = await createValidHotelRoom(hotel.id);
      const bookedRoom = await createBookedRoom(user.id, room.id);
      const body = { roomId: -1 };

      const response = await server.put(`/booking/${bookedRoom.id}`).set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("Should responde with status 200 and bookingId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const hotel = await createHotel();
      const room1 = await createValidHotelRoom(hotel.id);
      const room2 = await createValidHotelRoom(hotel.id);
      const bookedRoom = await createBookedRoom(user.id, room1.id);
      const body = { roomId: room2.id };

      const response = await server.put(`/booking/${bookedRoom.id}`).set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        bookingId: expect.any(Number)
      });
    });
  });
});
