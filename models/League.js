const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  league_name: { type: String, required: true, maxlength: 100 },
  created_at: { type: Date, default: Date.now },
  teams:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  status: String,
  age: String,
  sponsor: String
});

module.exports = mongoose.model('League', leagueSchema);