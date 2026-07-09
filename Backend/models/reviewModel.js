const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewerName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewTitle: {
      type: String,
      required: true,
      trim: true,
    },
    reviewComment: {
      type: String,
      required: true,
    },
    journey: {
      type: String,
      default: "",
    },
    serviceRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    authenticityRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    sustainabilityRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    isVerifiedBuyer: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Hidden"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;