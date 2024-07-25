const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const League = require('../models/League');

// Create a new league
router.post('/', async (req, res) => {
  

  console.log(req.body);
  try {
    const newLeague = new League(req.body);
    await newLeague.save();
    res.status(201).send('League created successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const leagues = await League.find()
    console.log(leagues)
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a league by ID
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findById(req.params.id).populate('teams');
    res.status(200).json(league);
  } catch (error) {
    res.status(400).send('Error fetching league');
  }
});

// Add a team to a league
router.post('/:id/teams', async (req, res) => {
  const { name, location } = req.body;
  try {
    const league = await League.findById(req.params.id);
    const newTeam = new Team({ name, location, league: league._id });
    await newTeam.save();
    league.teams.push(newTeam);
    await league.save();
    res.status(201).send('Team added to league successfully');
  } catch (error) {
    res.status(400).send('Error adding team to league');
  }
});

module.exports = router;
