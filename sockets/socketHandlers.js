const socketIo = require("socket.io");
const { getAllRegionMarkers, addMarker } = require("../markers");

const clients = {};

const setupSocket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("new connection");
    const { region } = socket.handshake.query;
    socket.join(region);
    console.log(`User ${socket.id} joined region: ${region}`);
    clients[socket.id] = socket;
    socket.emit("regionPoints", getAllRegionMarkers(region));

    socket.on("addPoint", (data) => {
      const updates = addMarker(data);
      console.log(updates);
      io.to(region).emit("regionPoints", updates);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      delete clients[socket.id];
    });
    socket.on("customDisconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      delete clients[socket.id];
      socket.disconnect();
    });
  });
};

module.exports = setupSocket;
