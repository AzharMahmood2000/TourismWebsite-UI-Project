const TourPackage = require("../models/packageModel");

// GET /api/packages
const getPackages = async (req, res) => {
  try {
    const packages = await TourPackage.find().sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get packages",
      error: error.message,
    });
  }
};

// GET /api/packages/:packageId
const getPackageById = async (req, res) => {
  try {
    const tourPackage = await TourPackage.findOne({
      packageId: req.params.packageId,
    });

    if (!tourPackage) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    res.status(200).json(tourPackage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get package",
      error: error.message,
    });
  }
};

// POST /api/packages
const createPackage = async (req, res) => {
  try {
    const {
      packageId,
      title,
      badge,
      category,
      image,
      duration,
      price,
      description,
      tagline,
      highlights,
      inclusions,
    } = req.body;

    if (!packageId || !title || !category || !image || !duration || !price || !description) {
      return res.status(400).json({
        message:
          "packageId, title, category, image, duration, price and description are required",
      });
    }

    const packageExists = await TourPackage.findOne({ packageId });

    if (packageExists) {
      return res.status(409).json({
        message: "Package already exists with this packageId",
      });
    }

    const tourPackage = await TourPackage.create({
      packageId,
      title,
      badge,
      category,
      image,
      duration,
      price,
      description,
      tagline,
      highlights,
      inclusions,
    });

    res.status(201).json(tourPackage);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create package",
      error: error.message,
    });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
};