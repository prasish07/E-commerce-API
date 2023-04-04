const User = require("../models/User");
const customeError = require("../errors");
const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(200).json({
    success: true,
    msg: users,
  });
};
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) throw new customeError.NotFoundError("User not found");
  res.status(200).json({
    success: true,
    msg: user,
  });
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: `show current user`,
  });
};

const updateUser = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: req.body,
  });
};

const updateUserPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: req.body,
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
