const Joi = require("joi");
const {REGIONS} = require('../constants')
// const regions = [
//   "VIN",
//   "VOL",
//   "DNP",
//   "DON",
//   "JTM",
//   "ZAC",
//   "ZAP",
//   "IVF",
//   "KYV",
//   "KIR",
//   "LUG",
//   "LVI",
//   "MYK",
//   "ODE",
//   "POL",
//   "RIV",
//   "SUM",
//   "TER",
//   "HAR",
//   "HSN",
//   "HME",
//   'CRK',
//   "CRV",
//   "CHR",
// ];
const markerSchema = Joi.object({
  description: Joi.string().required().min(5).max(50),
  coordinate: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
});

module.exports = markerSchema;
