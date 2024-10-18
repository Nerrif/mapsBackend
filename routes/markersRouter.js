const express = require("express");
const validateBody = require("../middlewares/validateBody");
const markerSchema = require("../schemas/markerSchema");
const {
  addPoint,
  getRegionMarkers,
} = require("../controllers/markersControllers");
const authenticate = require("../middlewares/authenticate");
const isValidRegion = require("../middlewares/isValidRegion");

const markerRouter = express.Router();
markerRouter.get("/:region", isValidRegion, authenticate, getRegionMarkers);
markerRouter.post(
  "/:region",
  isValidRegion,
  validateBody(markerSchema),
  authenticate,
  addPoint
);

module.exports = markerRouter;
