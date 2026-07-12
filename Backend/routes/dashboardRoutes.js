const express = require("express");
const { getDashboardStats, getInsights } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/stats", protect, adminOnly, getDashboardStats);
router.get("/insights", protect, adminOnly, getInsights);

module.exports = router;
