const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.base': '"displayName" should be a "string"',
      'string.empty': '"displayName" cannot be an empty field',
      'string.min': '"displayName" length must be at least {#limit} characters long',
      'any.required': '"displayName" is required',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': '"email" should be a "string"',
      'string.empty': '"email" cannot be an empty field',
      'email.base': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': '"password" should be a "string"',
      'string.empty': '"password" cannot be an empty field',
      'string.min': '"password" length must be at least {#limit} characters long',
      'any.required': '"password" is required',
    }),
  image: Joi.string()
    .required(),
});

module.exports = (obj) => schema.validate(obj);
