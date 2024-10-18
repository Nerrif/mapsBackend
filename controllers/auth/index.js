const { registerController } = require("./register");
const { loginController } = require("./login");
const { refreshController } = require("./refresh");
const { POWTask } = require("./POWTask");
module.exports = {
  registerController,
  loginController,
  refreshController,
  POWTask,
};
