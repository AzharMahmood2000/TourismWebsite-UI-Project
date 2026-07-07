const express = require("express");
const {
  getPackages,
  getPackageById,
  createPackage,
} = require("../controllers/packageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPackages);
router.get("/:packageId", getPackageById);
router.post("/", protect, createPackage);

module.exports = router;