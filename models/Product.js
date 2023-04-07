const mongoose = require("mongoose");

const ProductScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter the name"],
      maxlength: [100, "Name cannot be more than 100 character"],
    },
    price: {
      type: String,
      required: [true, "Please provde the product price"],
      defaul: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide the description of the product"],
      maxlength: [1000, "Description cannot be more than 1000 character"],
    },
    image: {
      type: String,
      default: "uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: [true, "Please provide color"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: [true, "Please provide the inventory"],
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductScheme);