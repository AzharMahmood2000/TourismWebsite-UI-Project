const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

const aboutSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  story: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  mission: { type: String, default: '' },
  vision: { type: String, default: '' },
  members: [memberSchema]
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);

module.exports = About;
