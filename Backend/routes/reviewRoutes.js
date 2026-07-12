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
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getReviews);
router.get("/journey/:journey", getReviewsByJourney);
router.post("/", protect, createReview);

// Admin routes
router.get("/admin/all", protect, adminOnly, getAllAdminReviews);
router.put("/:id/status", protect, adminOnly, updateReviewStatus);
router.delete("/:id", protect, adminOnly, deleteReview);

module.exports = router;