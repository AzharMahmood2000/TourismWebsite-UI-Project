const express = require("express");
const {
  getDestinations,
  getDestinationByIdOrSlug,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getDestinations);
router.post("/", protect, createDestination);
router.get("/:idOrSlug", getDestinationByIdOrSlug);
router.put("/:id", protect, updateDestination);
router.delete("/:id", protect, deleteDestination);

module.exports = router;