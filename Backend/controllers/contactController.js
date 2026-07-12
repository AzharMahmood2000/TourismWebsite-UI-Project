const Contact = require("../models/contactModel");

// POST /api/contact
const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, preferredTravelCategory } = req.body;

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
      preferredTravelCategory,
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

// PUT /api/contact/:id/read
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, status: "Read" },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to mark as read", error: error.message });
  }
};

// DELETE /api/contact/:id
const deleteMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete message", error: error.message });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  markAsRead,
  deleteMessage,
};