const Review = require("../models/reviewModel");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "Approved" })
      .populate("user", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};

const getReviewsByJourney = async (req, res) => {
  try {
    const reviews = await Review.find({
      journey: req.params.journey,
      status: "Approved",
    })
      .populate("user", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get journey reviews",
      error: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const {
      rating,
      reviewTitle,
      reviewComment,
      journey,
      serviceRating,
      authenticityRating,
      sustainabilityRating,
    } = req.body;

    if (!rating || !reviewTitle || !reviewComment) {
      return res.status(400).json({
        message: "Rating, review title and review comment are required",
      });
    }

    const review = await Review.create({
      user: req.user._id,
      reviewerName: req.user.name,
      rating,
      reviewTitle,
      reviewComment,
      journey,
      serviceRating,
      authenticityRating,
      sustainabilityRating,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};

const getAllAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get all reviews",
      error: error.message,
    });
  }
};

const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Hidden"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update review status",
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

module.exports = {
  getReviews,
  getReviewsByJourney,
  createReview,
  getAllAdminReviews,
  updateReviewStatus,
  deleteReview,
};