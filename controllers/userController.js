const User = require("../models/user");

const test = (req, res) => {
  res.status(200).json({ message: "test successfully." });
};

module.exports = {
  test,
};
