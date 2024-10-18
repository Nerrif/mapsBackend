const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required().min(5).max(50),
  password: Joi.string().min(8).max(64).required(),
  solution:Joi.string().required()
});

module.exports = registerSchema;
