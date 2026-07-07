const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, (req, res) => {
  upload.single("image")(req, res, function (error) {
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image file uploaded",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(201).json({
      message: "Image uploaded successfully",
      url: imageUrl,
    });
  });
});

module.exports = router;