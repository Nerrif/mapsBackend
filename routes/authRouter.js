const express = require("express");
const validateBody = require("../middlewares/validateBody");
const {
  registerController,
  loginController,
  refreshController,
  POWTask,
} = require("../controllers/auth");
const { registerSchema, loginSchema } = require("../schemas");
const authenticate = require("../middlewares/authenticate");
const checkTaskSolution = require("../middlewares/checkTaskSolution");

const authRouter = express.Router();

authRouter.get('/task/:id',POWTask)
authRouter.post("/register/:id", validateBody(registerSchema),checkTaskSolution, registerController);
authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.get("/refresh", authenticate, refreshController);
module.exports = authRouter;
