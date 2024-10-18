const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path')
const { authRouter, markerRouter } = require("./routes");

require("dotenv").config();

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use("/auth", authRouter);

app.use("/api/markers", markerRouter);


app.get('*', (req,res)=> {
  res.sendFile(path.join(__dirname,'build','index.html'))
})
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
