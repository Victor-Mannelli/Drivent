import Joi from "joi";

export const ticketIdSchema = Joi.number().required();

export const paymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().min(3).required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required(),
  }
});
