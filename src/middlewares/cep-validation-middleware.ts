import { NextFunction, Request, Response } from "express";
import { cepValidationSchema } from "@/schemas";
import enrollmentsService from "@/services/enrollments-service";

export async function cepValidation(req: Request, res: Response, next: NextFunction) {
  type enrollmentPost = {
    "name": string,
    "cpf": string,
    "birthday": string,
    "phone": string,
    "address": {
      "cep": string,
      "street": string,
      "city": string,
      "number": string,
      "state": string,
      "neighborhood": string,
      "addressDetail": string,
    }
  }
  const { cep } = req.query as Record<string, string>;
  if (cep) {
    const { error } = cepValidationSchema.validate(cep, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    const addressFromQueryCep = await enrollmentsService.getAddressFromCEP(cep);
    if (addressFromQueryCep.error === true) {
      return res.sendStatus(400);
    }
  }
  const body = req.body as enrollmentPost;
  const body_cep = body.address.cep as string;
  if (body_cep) {
    const { error } = cepValidationSchema.validate(body_cep, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    const addressFromBodyCep = await enrollmentsService.getAddressFromCEP(body_cep);
    if (addressFromBodyCep.error === true) {
      return res.sendStatus(400);
    }
  }
  next();
}
