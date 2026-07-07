const Contact = require("../models/contactModel");

// POST /api/contact
const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: "Contact message submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit contact message",
      error: error.message,
    });
  }
};

// GET /api/contact
const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get contact messages",
      error: error.message,
    });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
};