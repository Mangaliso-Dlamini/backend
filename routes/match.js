const express = require('express');
const Match = require('../models/Match');

const router = express.Router();

// Create a new match
router.post('/', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find().populate('homeTeam awayTeam');
    res.status(200).send(matches);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a match by ID
router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('homeTeam awayTeam');
    if (!match) {
      return res.status(404).send();
    }
    res.status(200).send(match);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a match by ID
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['date', 'homeTeam', 'awayTeam', 'result', 'status', 'venue'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).send();
    }

    updates.forEach(update => match[update] = req.body[update]);
    await match.save();
    res.status(200).send(match);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a match by ID
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).send();
    }

    res.status(200).send(match);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
