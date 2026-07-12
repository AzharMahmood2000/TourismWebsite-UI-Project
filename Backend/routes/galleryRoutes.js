const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const {
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
} = require("../controllers/galleryController");

const router = express.Router();

// Hero Slides Routes
router.get("/hero-slides", getHeroSlides);
router.get("/hero-slides/admin/all", protect, adminOnly, getAllHeroSlides);
router.post("/hero-slides", protect, adminOnly, createHeroSlide);
router.put("/hero-slides/:id", protect, adminOnly, updateHeroSlide);
router.delete("/hero-slides/:id", protect, adminOnly, deleteHeroSlide);

// Curated Escapes Routes
router.get("/curated-escapes", getActiveCuratedEscapes);
router.get("/curated-escapes/admin/all", protect, adminOnly, getAllCuratedEscapes);
router.post("/curated-escapes", protect, adminOnly, createCuratedEscape);
router.put("/curated-escapes/:id", protect, adminOnly, updateCuratedEscape);
router.delete("/curated-escapes/:id", protect, adminOnly, deleteCuratedEscape);

module.exports = router;
