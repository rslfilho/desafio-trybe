const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': '"email" should be a "string"',
      'string.empty': '"email" is not allowed to be empty',
      'email.base': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': '"password" should be a "string"',
      'string.empty': '"password" is not allowed to be empty',
      'string.min': '"password" length must be at least {#limit} characters long',
      'any.required': '"password" is required',
    }),
});

module.exports = (obj) => schema.validate(obj);
