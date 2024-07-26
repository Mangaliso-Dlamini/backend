const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');

// Record player performance
router.post('/', async (req, res) => {
  const { player, metrics } = req.body;
  try {
    const newPerformance = new Performance({ player, metrics });
    await newPerformance.save();
    res.status(201).send('Performance recorded successfully');
  } catch (error) {
    res.status(400).send('Error recording performance');
  }
});

router.post('/:id', async(req, res)=>{
  const playerId = req.params.id;
  const year = req.body.year;

  // Extract individual metrics from the request body
  const {
    goals,
    assists,
    appearances,
    minutes,
    shotsOnTarget,
    shotsOffTarget,
    passesAttempted,
    passesCompleted,
    tacklesAttempted,
    tacklesWon,
    interceptions,
    clearances,
    injuries
  } = req.body;

  try {
    // Find the performance document for the given player
    let performance = await Performance.findOne({ player: playerId });

    if (!performance) {
      return res.status(404).json({ message: 'Performance record not found' });
    }

    // Update the metrics for the given year
    const yearMetrics = performance.metrics.get(year.toString()) || {};
    if (goals !== undefined) yearMetrics.goals = goals;
    if (assists !== undefined) yearMetrics.assists = assists;
    if (appearances !== undefined) yearMetrics.appearances = appearances;
    if (minutes !== undefined) yearMetrics.minutes = minutes;
    if (shotsOnTarget !== undefined) yearMetrics.shots = { ...yearMetrics.shots, on_target: shotsOnTarget };
    if (shotsOffTarget !== undefined) yearMetrics.shots = { ...yearMetrics.shots, off_target: shotsOffTarget };
    if (passesAttempted !== undefined) yearMetrics.passes = { ...yearMetrics.passes, attempted: passesAttempted };
    if (passesCompleted !== undefined) yearMetrics.passes = { ...yearMetrics.passes, completed: passesCompleted };
    if (tacklesAttempted !== undefined) yearMetrics.tackles = { ...yearMetrics.tackles, attempted: tacklesAttempted };
    if (tacklesWon !== undefined) yearMetrics.tackles = { ...yearMetrics.tackles, won: tacklesWon };
    if (interceptions !== undefined) yearMetrics.interceptions = interceptions;
    if (clearances !== undefined) yearMetrics.clearances = clearances;
    if (injuries !== undefined) yearMetrics.injuries = injuries;

    // Update the metrics map
    performance.metrics.set(year.toString(), yearMetrics);

    // Save the updated performance document
    await performance.save();

    res.redirect(req.get('referer'))
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/get-performance-data', async (req, res) => {
  const playerId = '669f4d366761fca9af4d125a';

  try {
    const performance = await Performance.findOne({ player: playerId });

    if (!performance) {
      return res.status(404).json({ error: 'No performance data found for the player' });
    }

    res.json(Object.fromEntries(performance.metrics));
  } catch (error) {
    console.error('Error querying performance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get performance by player ID
router.get('/:id', async (req, res) => {
  const playerId = req.params.id

  try {
    const performance = await Performance.findOne({ player: playerId });

    if (!performance) {
      return res.status(404).json({ error: 'No performance data found for the player' });
    }

    res.json(Object.fromEntries(performance.metrics));
  } catch (error) {
    console.error('Error querying performance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
