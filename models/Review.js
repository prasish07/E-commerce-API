const mongoose = require("mongoose");

const ReviewScheme = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide the rating"],
    },
    title: {
      type: String,
      trim: true,
      maxLength: [100, "Cannot excede 100 word"],
      required: [true, "Please provide the title"],
    },
    comment: {
      type: String,
      required: [true, "comment field is empty"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
ReviewScheme.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewScheme);
