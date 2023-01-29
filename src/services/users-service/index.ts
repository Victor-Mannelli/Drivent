import { User } from "@prisma/client";
import { cannotEnrollBeforeStartDateError } from "@/errors";
import { duplicatedEmailError } from "./errors";
import eventsService from "../events-service";
import bcrypt from "bcrypt";
import userRepository from "@/repositories/user-repository";

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}
export async function getUserIdByToken(token: string) {
  const userId = await userRepository.userIdByToken(token);
  return userId;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, "email" | "password">;

const userService = {
  createUser,
  getUserIdByToken
};

export * from "./errors";
export default userService;
