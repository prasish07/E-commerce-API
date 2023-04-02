const User = require("../models/User");
const { StatusCode } = require("http-status-codes");
const CustomerError = require("../errors");
const jwt = require("jsonwebtoken");
const { createJWT, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist)
    throw new CustomerError.BadRequestError("Email already exist");

  //first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const users = await User.create({ name, email, password, role });

  const tokenPayload = {
    name: users.name,
    userId: users._id,
    role: users.role,
  };

  // const token = createJWT({ payload: tokenPayload });
  // const oneDay = 1000 * 60 * 60 * 24;
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneDay),
  // });
  await attachCookiesToResponse({ res, tokenPayload });

  res.status("200").json({ success: true, data: users });
};
const login = async (req, res) => {
  res.send("login");
};
const logout = async (req, res) => {
  res.send("logout");
};

module.exports = { register, login, logout };
