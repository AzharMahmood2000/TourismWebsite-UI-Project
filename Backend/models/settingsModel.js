const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "Gamanaya" },
    siteTagline: { type: String, default: "Travel the world" },
    supportEmail: { type: String, default: "support@gamanaya.com" },
    phone: { type: String, default: "+94 77 000 0000" },
    address: { type: String, default: "Colombo, Sri Lanka" },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      youtube: { type: String, default: "" }
    },
    currency: { type: String, default: "LKR" },
    bookingAutoConfirm: { type: Boolean, default: false },
    reviewAutoApprove: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
