const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HTTPError");
const User = require("../../models/userModel");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (!user) {
    throw HttpError(401, "Name or password is wrong");
  }

  //   if (!user.verify) {
  //     throw HttpError(401, "Email is not veriry");
  //   }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Name or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      verify: user.verify,
    },
  });
};

module.exports = {
  loginController: ctrlWrapper(login),
};
