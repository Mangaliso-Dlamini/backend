const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  result: String,
  status: { type: String, default: 'scheduled' }, // scheduled, ongoing, completed, postponed
  venue: String,
});

module.exports = mongoose.model('Match', MatchSchema);
