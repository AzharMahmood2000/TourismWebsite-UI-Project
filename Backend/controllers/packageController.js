const TourPackage = require("../models/packageModel");
const mongoose = require("mongoose");

// GET /api/packages (public)
const getPackages = async (req, res) => {
  try {
    const packages = await TourPackage.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get packages",
      error: error.message,
    });
  }
};

// GET /api/packages/:idOrSlug (public)
const getPackageById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let query = { slug: idOrSlug };
    
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
        query = { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] };
    }

    const tourPackage = await TourPackage.findOne(query);

    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(tourPackage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get package",
      error: error.message,
    });
  }
};

// GET /api/packages/admin/all
const getAllPackagesAdmin = async (req, res) => {
  try {
    const packages = await TourPackage.find().sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to get packages", error: error.message });
  }
};

// POST /api/packages (admin)
const createPackage = async (req, res) => {
  try {
    const tourPackage = await TourPackage.create(req.body);
    res.status(201).json(tourPackage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create package",
      error: error.message,
    });
  }
};

// PUT /api/packages/:id (admin)
const updatePackage = async (req, res) => {
  try {
    const tourPackage = await TourPackage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(tourPackage);
  } catch (error) {
    res.status(500).json({ message: "Failed to update package", error: error.message });
  }
};

// DELETE /api/packages/:id (admin)
const deletePackage = async (req, res) => {
  try {
    const tourPackage = await TourPackage.findByIdAndDelete(req.params.id);
    if (!tourPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete package", error: error.message });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  getAllPackagesAdmin,
  createPackage,
  updatePackage,
  deletePackage
};