import Joi from "joi";

export const ticketIdSchema = Joi.number().required();
