const mongoose = require('mongoose');

const galleryHeroSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    image: { type: String, required: true },
    location: String,
    category: String,
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryHero", galleryHeroSchema);
