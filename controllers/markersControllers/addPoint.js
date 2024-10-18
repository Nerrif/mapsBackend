const Marker = require("../../models/markerModel");
const { clients } = require("../../clientsService/");
const sendEvent = require("../../clientsService/sendEventService");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { TIME } = require("../../constants");
const addPoint = async (req, res) => {
  const { region } = req.params;
  const creator = req.user.name;
  const { coordinate, description } = req.body;
  const timer = new Date(Date.now() + TIME);
  const newMarker = new Marker({
    coordinate,
    region,
    description,
    creator,
    expireAt: timer,
  });
  const dbAnswer = await Marker.create(newMarker);

  const responseObj = {
    _id: dbAnswer._id,
    coordinate: dbAnswer.coordinate,
    creator: dbAnswer.creator,
    region: dbAnswer.region,
    description: dbAnswer.description,
  };

  clients[region].forEach((element, index) => {
    console.log(clients[region].length);
    sendEvent(element, "updates", responseObj);
  });

  res.status(201);
  res.end();
};
module.exports = { addPoint: ctrlWrapper(addPoint) };
