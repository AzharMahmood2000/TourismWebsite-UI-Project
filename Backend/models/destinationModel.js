const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      default: "",
    },
    bestTime: {
      type: String,
      default: "",
    },
    highlights: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;