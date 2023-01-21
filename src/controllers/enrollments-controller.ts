import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import enrollmentsService from "@/services/enrollments-service";
import httpStatus from "http-status";

import joi from "joi";

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  try {
    const cep = req.query.cep;
    if(cep) {
      const validateQueryCep = joi.string().pattern(/^[0-9]{8}$/).required();
      const { error } = validateQueryCep.validate(cep, { abortEarly: false });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
      }
    }
    await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as Record<string, string>;

  try {
    const address = await enrollmentsService.getAddressFromCEP(cep);

    res.status(httpStatus.OK).send(address);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }
}
