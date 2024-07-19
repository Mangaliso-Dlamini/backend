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

// Get performance by player ID
router.get('/:id', async (req, res) => {
  try {
    const performance = await Performance.find({ player: req.params.id }).populate('player');
    res.status(200).json(performance);
  } catch (error) {
    res.status(400).send('Error fetching performance');
  }
});

module.exports = router;
