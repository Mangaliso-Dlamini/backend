// TrainingSession.js
const mongoose = require('mongoose');

const TrainingSessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  location: String,
});

module.exports = mongoose.model('TrainingSession', TrainingSessionSchema);
