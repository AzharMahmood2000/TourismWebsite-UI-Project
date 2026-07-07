const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    badge: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
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
    highlights: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const TourPackage = mongoose.model("TourPackage", packageSchema);

module.exports = TourPackage;