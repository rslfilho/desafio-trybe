const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.base': '"title" should be a "string"',
      'string.empty': '"title" is not allowed to be empty',
      'any.required': '"title" is required',
    }),
  content: Joi.string()
    .required()
    .messages({
      'string.base': '"content" should be a "string"',
      'string.empty': '"content" is not allowed to be empty',
      'any.required': '"content" is required',
    }),
});

module.exports = (obj) => schema.validate(obj);
