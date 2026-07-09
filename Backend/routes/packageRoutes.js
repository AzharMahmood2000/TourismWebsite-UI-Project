const express = require("express");
const {
  getPackages,
  getPackageById,
  getAllPackagesAdmin,
  createPackage,
  updatePackage,
  deletePackage
} = require("../controllers/packageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/admin/all", protect, getAllPackagesAdmin);

router.get("/", getPackages);
router.get("/:idOrSlug", getPackageById);
router.post("/", protect, createPackage);
router.put("/:id", protect, updatePackage);
router.delete("/:id", protect, deletePackage);

module.exports = router;