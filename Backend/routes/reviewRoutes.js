const express = require("express");
const {
  getReviews,
  getReviewsByJourney,
  createReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getReviews);
router.get("/journey/:journey", getReviewsByJourney);
router.post("/", protect, createReview);

module.exports = router;