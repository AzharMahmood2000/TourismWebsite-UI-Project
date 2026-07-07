const express = require("express");
const {
  getDestinations,
  getDestinationBySlug,
  createDestination,
} = require("../controllers/destinationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getDestinations);
router.get("/:slug", getDestinationBySlug);
router.post("/", protect, createDestination);

module.exports = router;