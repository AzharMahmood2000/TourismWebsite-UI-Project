const Destination = require("../models/destinationModel");

// GET /api/destinations
const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ sortOrder: 1, createdAt: -1 });

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get destinations",
      error: error.message,
    });
  }
};

// GET /api/destinations/:idOrSlug
const getDestinationByIdOrSlug = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const param = req.params.idOrSlug;
    
    let destination;
    
    if (mongoose.isValidObjectId(param)) {
      destination = await Destination.findById(param);
    }
    
    if (!destination) {
      destination = await Destination.findOne({
        slug: param,
      });
    }

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
      location,
      mapUrl,
      image,
      description,
      tagline,
      bestTime,
      highlights,
      isPopular,
      singleVisit,
      showOnHome,
      isActive,
      sortOrder,
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
      location: location || "",
      mapUrl: mapUrl || "",
      image,
      description,
      tagline,
      bestTime,
      highlights,
      isPopular: isPopular ?? false,
      singleVisit: singleVisit || {},
      showOnHome: showOnHome ?? false,
      isActive: isActive ?? true,
      sortOrder: sortOrder || 0,
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create destination",
      error: error.message,
    });
  }
};

// PUT /api/destinations/:id
const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const {
      title,
      slug,
      category,
      region,
      location,
      mapUrl,
      image,
      description,
      tagline,
      bestTime,
      highlights,
      isPopular,
      singleVisit,
      showOnHome,
      isActive,
      sortOrder,
    } = req.body;

    destination.title = title || destination.title;
    destination.slug = slug || destination.slug;
    destination.category = category || destination.category;
    destination.region = region !== undefined ? region : destination.region;
    destination.location = location !== undefined ? location : destination.location;
    destination.mapUrl = mapUrl !== undefined ? mapUrl : destination.mapUrl;
    destination.image = image || destination.image;
    destination.description = description || destination.description;
    destination.tagline = tagline !== undefined ? tagline : destination.tagline;
    destination.bestTime = bestTime !== undefined ? bestTime : destination.bestTime;
    destination.highlights = highlights || destination.highlights;
    destination.isPopular = isPopular !== undefined ? isPopular : destination.isPopular;
    if (singleVisit) destination.singleVisit = singleVisit;
    destination.showOnHome = showOnHome !== undefined ? showOnHome : destination.showOnHome;
    destination.isActive = isActive !== undefined ? isActive : destination.isActive;
    destination.sortOrder = sortOrder !== undefined ? sortOrder : destination.sortOrder;

    const updatedDestination = await destination.save();
    res.status(200).json(updatedDestination);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update destination",
      error: error.message,
    });
  }
};

// DELETE /api/destinations/:id
const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    await destination.deleteOne();
    res.status(200).json({ message: "Destination removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete destination",
      error: error.message,
    });
  }
};

module.exports = {
  getDestinations,
  getDestinationByIdOrSlug,
  createDestination,
  updateDestination,
  deleteDestination,
};