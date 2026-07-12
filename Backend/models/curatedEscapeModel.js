const mongoose = require("mongoose");

const curatedEscapeSchema = mongoose.Schema(
  {
    sourceType: {
      type: String,
      required: true,
      enum: ["destination", "package"]
    },
    sourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    badge: {
      type: String
    },
    image: {
      type: String
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CuratedEscape", curatedEscapeSchema);
