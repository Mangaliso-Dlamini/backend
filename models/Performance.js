const mongoose = require('mongoose');

// Schema for metrics of a single year
const YearlyMetricsSchema = new mongoose.Schema({
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  appearances: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 },
  shots: {
    on_target: { type: Number, default: 0 },
    off_target: { type: Number, default: 0 }
  },
  passes: {
    attempted: { type: Number, default: 0 },
    completed: { type: Number, default: 0 }
  },
  tackles: {
    attempted: { type: Number, default: 0 },
    won: { type: Number, default: 0 }
  },
  interceptions: { type: Number, default: 0 },
  clearances: { type: Number, default: 0 },
  injuries: { type: Number, default: 0 }
});

// Main performance schema
const PerformanceSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  metrics: {
    type: Map,
    of: YearlyMetricsSchema,
    default: () => new Map()
  },
  timestamp: { type: Date, default: Date.now }
});

// Adding an index for faster queries on player and timestamp
PerformanceSchema.index({ player: 1, timestamp: -1 });

module.exports = mongoose.model('Performance', PerformanceSchema);
