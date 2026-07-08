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
    location: {
      type: String,
      trim: true,
      default: "",
    },
    mapUrl: {
      type: String,
      trim: true,
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
    },
    bestTime: {
      type: String,
    },
    highlights: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    showOnHome: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    singleVisit: {
      pricePerPerson: {
        type: Number,
        default: 0
      },
      duration: {
        type: String,
        trim: true,
        default: ""
      },
      bestTime: {
        type: String,
        trim: true,
        default: ""
      },
      guidedExpedition: {
        type: Boolean,
        default: true
      },
      addOns: [
        {
          name: {
            type: String,
            trim: true
          },
          price: {
            type: Number,
            default: 0
          }
        }
      ]
    }
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;