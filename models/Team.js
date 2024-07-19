const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  coach: String,
  location: String,
  stadium: String,
});

module.exports = mongoose.model('Team', TeamSchema);
