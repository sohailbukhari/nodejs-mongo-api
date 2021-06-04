import Joi from '../../utils/joi';

export const ENUMS = {
  SCOPES: ['ADMIN', 'USER'],
};

export const create = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(),
    scope: Joi.string()
      .valid(...ENUMS.SCOPES)
      .default('USER'),
    attributes: Joi.array().items(
      Joi.object({
        key: Joi.string().default(''),
        value: Joi.string().default(''),
      })
        .default([])
        .options({ stripUnknown: true })
    ),
  }).options({ stripUnknown: true }),
};

export const signin = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ stripUnknown: true }),
};

export const list = {
  query: Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(25),
  }).options({ stripUnknown: true }),
};

export const single = {
  params: Joi.object({
    id: Joi.objectId().required(),
  }).options({ stripUnknown: true }),
};

export const update = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string(),
    scope: Joi.string().valid(...ENUMS.SCOPES),
    attributes: Joi.array().items(
      Joi.object({
        key: Joi.string().default(''),
        value: Joi.string().default(''),
      }).options({ stripUnknown: true })
    ),
  }).options({ stripUnknown: true }),
  ...single,
};
