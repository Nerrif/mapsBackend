const app = require("./app");
const mongoose = require("mongoose");
require("colors");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Starting server on port ${PORT}`.bgBrightBlue);
    console.log("Database connection successful".bgBrightGreen);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.bgBrightBlue);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
