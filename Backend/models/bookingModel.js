const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: false,
    },
    destinationTitle: {
      type: String,
      default: "",
    },
    packageTitle: {
      type: String,
      default: "",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: false,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
      default: 1,
    },
    notes: {
      type: String,
      default: "",
    },
    bookingMode: {
      type: String,
      enum: ["destination", "package", "custom", "single"],
      default: "destination",
    },
    selectedServices: {
      type: Object,
      default: {},
    },
    estimatedTotal: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    adminMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;