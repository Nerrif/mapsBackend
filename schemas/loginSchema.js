const Joi = require("joi");

const loginSchema = Joi.object({
  name: Joi.string().required().min(5).max(50),
  password: Joi.string().min(8).max(64).required(),
});

module.exports = loginSchema;
