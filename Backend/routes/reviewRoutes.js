const express = require("express");
const {
  getReviews,
  getReviewsByJourney,
  createReview,
  getAllAdminReviews,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getReviews);
router.get("/journey/:journey", getReviewsByJourney);
router.post("/", protect, createReview);

// Admin routes
router.get("/admin/all", protect, getAllAdminReviews);
router.put("/:id/status", protect, updateReviewStatus);
router.delete("/:id", protect, deleteReview);

module.exports = router;