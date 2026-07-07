const Booking = require("../models/bookingModel");

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      destination,
      packageTitle,
      travelDate,
      travelers,
      notes,
      bookingMode,
      selectedServices,
      estimatedTotal,
    } = req.body;

    if (!fullName || !phone || !destination || !travelDate || !travelers) {
      return res.status(400).json({
        message:
          "Full name, phone, destination, travel date and travelers are required",
      });
    }

    const booking = await Booking.create({
      user: req.user._id,
      fullName,
      email: req.user.email,
      phone,
      destination,
      packageTitle,
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
    const bookings = await Booking.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get your bookings",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};