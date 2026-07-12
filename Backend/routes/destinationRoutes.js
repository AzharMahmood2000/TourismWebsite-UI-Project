const express = require("express");
const {
  getDestinations,
  getDestinationByIdOrSlug,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getDestinations);
router.post("/", protect, adminOnly, createDestination);
router.get("/:idOrSlug", getDestinationByIdOrSlug);
router.put("/:id", protect, adminOnly, updateDestination);
router.delete("/:id", protect, adminOnly, deleteDestination);

module.exports = router;