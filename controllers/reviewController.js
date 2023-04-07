const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
const { checkPermission } = require("../utils");

const createReview = async (req, res) => {
  const { rating, title, comment } = req.body;
  const reviews = await Review.create({
    rating,
    title,
    comment,
    user: req.user.userId,
  });
  res.status(200).send("create review");
};
const getAllReview = async (req, res) => {
  res.status(200).send("getAll review");
};
const updateReview = async (req, res) => {
  res.status(200).send("update review");
};
const getSingleReview = async (req, res) => {
  res.status(200).send("getSingle review");
};
const deleteReview = async (req, res) => {
  res.status(200).send("delete review");
};

module.exports = {
  createReview,
  getAllReview,
  updateReview,
  getSingleReview,
  deleteReview,
};
