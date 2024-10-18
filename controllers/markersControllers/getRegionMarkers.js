/* При першому запиті додає сокет користувача до масиву користувачів
отримує з бази всі мітки і повертає, при цьому запит залишаєтся відкритим
для подальшої відправки оновлень
При відключенні користувача, видаляє сокет з массиву відповідного регіону
*/
const { addClient, removeClient } = require("../../clientsService");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const sendEvent = require("../../helpers/sendEvent");
const Marker = require("../../models/markerModel");

const getRegionMarkers = async (req, res) => {
  // console.log("New connect");
  const { region } = req.params;
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const regMarkers = await Marker.find(
    { region: region },
    { expireAt: 0, createdAt: 0, updatedAt: 0 }
  );

  res.id = req.user._id;
  addClient(region, res);
  sendEvent(res, "message", regMarkers);
  req.on("close", () => {
    removeClient(res.id, region);
    console.log("close");
  });
};
module.exports = { getRegionMarkers: ctrlWrapper(getRegionMarkers) };
