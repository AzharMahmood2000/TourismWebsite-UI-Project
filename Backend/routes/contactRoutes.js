const express = require("express");
const {
  createContactMessage,
  getContactMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", protect, adminOnly, getContactMessages);
router.put("/:id/read", protect, adminOnly, markAsRead);
router.delete("/:id", protect, adminOnly, deleteMessage);

module.exports = router;