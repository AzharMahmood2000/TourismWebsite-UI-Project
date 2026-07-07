const Destination = require("../models/destinationModel");

// GET /api/destinations
const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get destinations",
      error: error.message,
    });
  }
};

// GET /api/destinations/:slug
const getDestinationBySlug = async (req, res) => {
  try {
    const destination = await Destination.findOne({
      slug: req.params.slug,
    });

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get destination",
      error: error.message,
    });
  }
};

// POST /api/destinations
const createDestination = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      region,
      image,
      description,
      tagline,
      bestTime,
      highlights,
    } = req.body;

    if (!title || !slug || !category || !image || !description) {
      return res.status(400).json({
        message: "Title, slug, category, image and description are required",
      });
    }

    const destinationExists = await Destination.findOne({ slug });

    if (destinationExists) {
      return res.status(409).json({
        message: "Destination already exists with this slug",
      });
    }

    const destination = await Destination.create({
      title,
      slug,
      category,
      region,
      image,
      description,
      tagline,
      bestTime,
      highlights,
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create destination",
      error: error.message,
    });
  }
};

module.exports = {
  getDestinations,
  getDestinationBySlug,
  createDestination,
};