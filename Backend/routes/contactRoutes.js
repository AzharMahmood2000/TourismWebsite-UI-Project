const express = require("express");
const {
  createContactMessage,
  getContactMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, getContactMessages);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;