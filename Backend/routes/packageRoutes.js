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
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/admin/all", protect, adminOnly, getAllPackagesAdmin);

router.get("/", getPackages);
router.get("/:idOrSlug", getPackageById);
router.post("/", protect, adminOnly, createPackage);
router.put("/:id", protect, adminOnly, updatePackage);
router.delete("/:id", protect, adminOnly, deletePackage);

module.exports = router;