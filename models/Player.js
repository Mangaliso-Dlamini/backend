const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  jersey: Number,
  age: Number,
  games: Number

});

module.exports = mongoose.model('Player', PlayerSchema);
