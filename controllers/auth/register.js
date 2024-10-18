const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ctrlWrapper = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HTTPError");
const User = require("../../models/userModel");
const { removeTaskById } = require("../../taskDb");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { name, password } = req.body;
  const { id: taskId } = req.params;
  const user = await User.findOne({ name });

  if (user) {
    throw HttpError(409, "Name in use");
  }
  removeTaskById(taskId);
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = { id: newUser._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      name: newUser.name,
      verify: newUser.verify,
      token,
    },
  });
};

module.exports = {
  registerController: ctrlWrapper(register),
};
