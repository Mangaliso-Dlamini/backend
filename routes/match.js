const express = require('express');
const Match = require('../models/Match');

const router = express.Router();

// Create a new match
router.post('/', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.redirect(req.get('referer'))
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
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { date, homeGoals, awayGoals, status, venue } = req.body;

  // Construct the score object
  const score = {
    homeGoals: homeGoals !== undefined ? homeGoals : 0,
    awayGoals: awayGoals !== undefined ? awayGoals : 0
  };

  const updates = {
    date,
    score,
    status,
    venue
  };

  try {
    const match = await Match.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!match) {
      return res.status(404).send('Match not found');
    }

    res.redirect(req.get('referer'))
  } catch (error) {
    res.status(400).send(error.message);
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
