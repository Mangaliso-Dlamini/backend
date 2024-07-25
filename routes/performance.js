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
