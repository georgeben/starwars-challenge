import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string().trim().required().max(500),
});

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const characterQueryParamsSchema = Joi.object({
  sortBy: Joi.string().trim().valid("name", "gender", "height")
    .allow(""),
  order: Joi.string().trim().valid("asc", "desc").default("asc")
    .allow(""),
  gender: Joi.string().trim().valid("male", "female")
    .allow(""),
});
