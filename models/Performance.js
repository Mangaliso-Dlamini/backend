const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  metrics: {
    goals: Number,
    assists: Number,
    appearances: Number,
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Performance', PerformanceSchema);
