const User = require("../models/User");
const customeError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermission,
} = require("../utils");
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

  checkPermission(req.user, user._id);

  res.status(200).json({
    success: true,
    msg: user,
  });
};

const showCurrentUser = async (req, res) => {
  console.log(req.user);
  const { name, userId, role } = req.user;
  res.status(200).json({
    user: { name, userId, role },
  });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    throw new customeError.BadRequestError("Please provide name and email");
  // const user = await User.findOneAndUpdate(
  //   { _id: req.user.userId },
  //   { email, name },
  //   {
  //     new: true,
  //     runValida rs: true,
  //   }
  // );
  const user = await User.findById(req.user.userId);
  user.name = name;
  user.email = email;
  await user.save();
  const tokenPayload = createTokenUser(user);
  attachCookiesToResponse({ res, tokenPayload });

  res.status(200).json({
    success: true,
    msg: user,
  });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new customeError.BadRequestError(
      "Please provide old and new password"
    );
  const user = await User.findById(req.user.userId).select("+password");
  const check = await user.comparePassword(oldPassword);
  if (!check) throw new customeError.BadRequestError("Wrong password");
  user.password = newPassword;
  await user.save();
  console.log(user);
  res.status(200).json({
    success: true,
    status: "password updated",
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
