const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const TrainingSession = require('../models/TrainingSession');

// Create a new match
router.post('/matches', async (req, res) => {
  const { date, homeTeam, awayTeam, result } = req.body;
  try {
    const newMatch = new Match({ date, homeTeam, awayTeam, result });
    await newMatch.save();
    res.status(201).send('Match scheduled successfully');
  } catch (error) {
    res.status(400).send('Error scheduling match');
  }
});

// Get a match by ID
router.get('/matches/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('homeTeam awayTeam');
    res.status(200).json(match);
  } catch (error) {
    res.status(400).send('Error fetching match');
  }
});

// Create a new training session
router.post('/training-sessions', async (req, res) => {
  const { date, team, location } = req.body;
  try {
    const newTrainingSession = new TrainingSession({ date, team, location });
    await newTrainingSession.save();
    res.status(201).send('Training session scheduled successfully');
  } catch (error) {
    res.status(400).send('Error scheduling training session');
  }
});

// Get a training session by ID
router.get('/training-sessions/:id', async (req, res) => {
  try {
    const trainingSession = await TrainingSession.findById(req.params.id).populate('team');
    res.status(200).json(trainingSession);
  } catch (error) {
    res.status(400).send('Error fetching training session');
  }
});

module.exports = router;
