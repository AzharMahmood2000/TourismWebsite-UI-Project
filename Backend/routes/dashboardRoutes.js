const express = require("express");
const { getDashboardStats, getInsights } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/insights", protect, getInsights);

module.exports = router;
