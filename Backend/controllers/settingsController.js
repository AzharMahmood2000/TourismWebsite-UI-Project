const Settings = require("../models/settingsModel");

// @desc    Get website settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to load settings", error: error.message });
  }
};

// @desc    Update website settings
// @route   PUT /api/settings
// @access  Protected
const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings({});
    }

    settings.siteName = req.body.siteName !== undefined ? req.body.siteName : settings.siteName;
    settings.siteTagline = req.body.siteTagline !== undefined ? req.body.siteTagline : settings.siteTagline;
    settings.supportEmail = req.body.supportEmail !== undefined ? req.body.supportEmail : settings.supportEmail;
    settings.phone = req.body.phone !== undefined ? req.body.phone : settings.phone;
    settings.address = req.body.address !== undefined ? req.body.address : settings.address;
    
    if (req.body.socialLinks) {
      settings.socialLinks = {
        ...settings.socialLinks,
        ...req.body.socialLinks
      };
    }
    
    settings.currency = req.body.currency !== undefined ? req.body.currency : settings.currency;
    settings.bookingAutoConfirm = req.body.bookingAutoConfirm !== undefined ? req.body.bookingAutoConfirm : settings.bookingAutoConfirm;
    settings.reviewAutoApprove = req.body.reviewAutoApprove !== undefined ? req.body.reviewAutoApprove : settings.reviewAutoApprove;

    const updatedSettings = await settings.save();
    res.status(200).json(updatedSettings);

  } catch (error) {
    res.status(500).json({ message: "Failed to update settings", error: error.message });
  }
};

module.exports = { getSettings, updateSettings };
