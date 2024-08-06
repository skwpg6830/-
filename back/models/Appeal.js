const mongoose = require('mongoose');

const appealSchema = new mongoose.Schema({
  appealType: { type: String, required: true },
  report: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Appeal = mongoose.model('Appeal', appealSchema);

module.exports = Appeal;
