const ctrlWrapper = require("../../helpers/ctrlWrapper");

const refresh = async (req, res) => {
  const { name, verify, _id } = req.user;
  res.status(200).json({ name, verify, id: _id });
};
module.exports = { refreshController: ctrlWrapper(refresh) };
