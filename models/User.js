const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!!"],
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please enter your email!!"],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email!!",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password!!"],
    trim: true,
    minlength: [6, "Password must be at least 6 characters!!"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (candidate_password) {
  return await bcrypt.compare(candidate_password, this.password);
};

module.exports = mongoose.model("User", userSchema);
