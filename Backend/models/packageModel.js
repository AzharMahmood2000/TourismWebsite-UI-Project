const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, required: true },
    location: { type: String, default: "Sri Lanka" },
    duration: { type: String, required: true },
    pricePerPerson: { type: Number, required: true },
    minTravelers: { type: Number, default: 1 },
    maxTravelers: { type: Number, default: 10 },
    availableFrom: { type: Date },
    availableTo: { type: Date },
    pickupLocation: { type: String, default: "" },
    meetingPoint: { type: String, default: "" },
    destinations: [{ type: String }],
    highlights: [{ type: String }],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary: [
      {
        day: { type: String },
        title: { type: String },
        description: { type: String },
        places: { type: String }
      },
    ],
    coverImage: { type: String, default: "" },
    galleryImages: [{ type: String }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TourPackage = mongoose.model("Package", packageSchema);
module.exports = TourPackage;