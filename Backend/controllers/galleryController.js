const GalleryHero = require("../models/galleryHeroModel");
const CuratedEscape = require("../models/curatedEscapeModel");

// GET /api/gallery/hero-slides (Public)
const getHeroSlides = async (req, res) => {
  try {
    const slides = await GalleryHero.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ message: "Failed to get hero slides", error: error.message });
  }
};

// GET /api/gallery/hero-slides/admin/all
const getAllHeroSlides = async (req, res) => {
  try {
    const slides = await GalleryHero.find().sort({ displayOrder: 1 });
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all hero slides", error: error.message });
  }
};

// POST /api/gallery/hero-slides
const createHeroSlide = async (req, res) => {
  try {
    const slide = await GalleryHero.create(req.body);
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ message: "Failed to create hero slide", error: error.message });
  }
};

// PUT /api/gallery/hero-slides/:id
const updateHeroSlide = async (req, res) => {
  try {
    const slide = await GalleryHero.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!slide) return res.status(404).json({ message: "Hero slide not found" });
    res.status(200).json(slide);
  } catch (error) {
    res.status(400).json({ message: "Failed to update hero slide", error: error.message });
  }
};

// DELETE /api/gallery/hero-slides/:id
const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await GalleryHero.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: "Hero slide not found" });
    res.status(200).json({ message: "Hero slide deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hero slide", error: error.message });
  }
};

// GET /api/gallery/curated-escapes
const getActiveCuratedEscapes = async (req, res) => {
  try {
    const escapes = await CuratedEscape.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json(escapes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get curated escapes", error: error.message });
  }
};

// GET /api/gallery/curated-escapes/admin/all
const getAllCuratedEscapes = async (req, res) => {
  try {
    const escapes = await CuratedEscape.find().sort({ displayOrder: 1 });
    res.status(200).json(escapes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all curated escapes", error: error.message });
  }
};

// POST /api/gallery/curated-escapes
const createCuratedEscape = async (req, res) => {
  try {
    const escape = await CuratedEscape.create(req.body);
    res.status(201).json(escape);
  } catch (error) {
    res.status(400).json({ message: "Failed to create curated escape", error: error.message });
  }
};

// PUT /api/gallery/curated-escapes/:id
const updateCuratedEscape = async (req, res) => {
  try {
    const escape = await CuratedEscape.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!escape) return res.status(404).json({ message: "Curated escape not found" });
    res.status(200).json(escape);
  } catch (error) {
    res.status(400).json({ message: "Failed to update curated escape", error: error.message });
  }
};

// DELETE /api/gallery/curated-escapes/:id
const deleteCuratedEscape = async (req, res) => {
  try {
    const escape = await CuratedEscape.findByIdAndDelete(req.params.id);
    if (!escape) return res.status(404).json({ message: "Curated escape not found" });
    res.status(200).json({ message: "Curated escape deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete curated escape", error: error.message });
  }
};

module.exports = {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getActiveCuratedEscapes,
  getAllCuratedEscapes,
  createCuratedEscape,
  updateCuratedEscape,
  deleteCuratedEscape
};
