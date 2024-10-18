const { REGIONS } = require("../constants");
const HttpError = require("../helpers/HTTPError");

const isValidRegion = (req, _, next) => {
  const { region } = req.params;
  const idx = REGIONS.findIndex((el) => el === region);
  if (idx === -1) {
    next(HttpError(400));
    return;
  }
  next();
};
module.exports = isValidRegion;
