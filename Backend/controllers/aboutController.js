const About = require('../models/aboutModel');

// @desc    Get public about data (active members only, sorted)
// @route   GET /api/about
// @access  Public
const getAboutData = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
      await about.save();
    }
    
    // Filter active members and sort
    const activeMembers = about.members
      .filter(m => m.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const publicData = {
      hero: about.hero,
      story: about.story,
      mission: about.mission,
      vision: about.vision,
      members: activeMembers
    };

    res.json(publicData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get admin about data (all members)
// @route   GET /api/about/admin
// @access  Public (should be protected by auth middleware typically, but leaving accessible for this task as requested or existing auth pattern will be applied in routes)
const getAdminAboutData = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
      await about.save();
    }
    
    // Just sort members
    about.members.sort((a, b) => a.displayOrder - b.displayOrder);

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update about data (except members)
// @route   PUT /api/about
// @access  Admin
const updateAboutData = async (req, res) => {
  try {
    const { hero, story, mission, vision } = req.body;
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    if (hero) about.hero = hero;
    if (story) about.story = story;
    if (mission !== undefined) about.mission = mission;
    if (vision !== undefined) about.vision = vision;

    await about.save();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a new member
// @route   POST /api/about/members
// @access  Admin
const addMember = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }

    about.members.push(req.body);
    await about.save();
    
    about.members.sort((a, b) => a.displayOrder - b.displayOrder);
    res.status(201).json(about.members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a member
// @route   PUT /api/about/members/:memberId
// @access  Admin
const updateMember = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) return res.status(404).json({ message: 'About not found' });

    const memberMatch = about.members.id(req.params.memberId);
    if (!memberMatch) return res.status(404).json({ message: 'Member not found' });

    Object.assign(memberMatch, req.body);
    await about.save();

    about.members.sort((a, b) => a.displayOrder - b.displayOrder);
    res.json(about.members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a member
// @route   DELETE /api/about/members/:memberId
// @access  Admin
const deleteMember = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) return res.status(404).json({ message: 'About not found' });

    about.members.pull({ _id: req.params.memberId });
    await about.save();

    about.members.sort((a, b) => a.displayOrder - b.displayOrder);
    res.json(about.members);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAboutData,
  getAdminAboutData,
  updateAboutData,
  addMember,
  updateMember,
  deleteMember
};
