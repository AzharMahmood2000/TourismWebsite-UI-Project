const Booking = require("../models/bookingModel");

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const fullName = req.body.fullName;
    const phone = req.body.phone;
    const mongoose = require("mongoose");
    const rawDestination = req.body.destinationId || req.body.destination;
    let destination = null;
    let destinationTitle = "";

    if (rawDestination) {
      if (mongoose.Types.ObjectId.isValid(rawDestination) && (String(new mongoose.Types.ObjectId(rawDestination)) === String(rawDestination))) {
        destination = rawDestination;
      } else {
        destinationTitle = rawDestination;
      }
    }
    
    const packageTitle = req.body.packageTitle;
    const packageId = req.body.packageId;
    const travelDate = req.body.travelDate;
    const travelers = req.body.travelers;
    const notes = req.body.specialRequests || req.body.notes;
    const bookingMode = req.body.bookingType || req.body.bookingMode;
    const selectedServices = req.body.selectedAddOns || req.body.selectedServices;
    const estimatedTotal = req.body.totalAmount || req.body.estimatedTotal;

    if (!fullName || !phone || (!destination && !destinationTitle && !packageId) || !travelDate || !travelers) {
      return res.status(400).json({
        message:
          "Full name, phone, destination/package, travel date and travelers are required",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      fullName,
      email: req.user.email,
      phone,
      destination,
      destinationTitle,
      packageTitle,
      packageId,
      travelDate,
      travelers,
      notes,
      bookingMode,
      selectedServices,
      estimatedTotal,
    });

    res.status(201).json({
      message: "Booking request submitted successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// GET /api/bookings/mybookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("destination", "title name image region location")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get your bookings",
      error: error.message,
    });
  }
};

// GET /api/bookings/admin/all
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone avatar")
      .populate("destination", "title name image region location")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings || []);
  } catch (error) {
    res.status(500).json({ message: "Failed to get bookings", error: error.message });
  }
};

// PUT /api/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Status in model is capitalized by default but we accept lowercase
    const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Capitalize the first letter if your model enforces uppercase "Pending", etc.
    const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = normalizedStatus;
    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
};

// DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    await booking.deleteOne();
    res.status(200).json({ message: "Booking removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking
};