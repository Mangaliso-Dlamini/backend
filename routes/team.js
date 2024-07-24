const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');

// Create a new team
router.post('/', async (req, res) => {
  const { name, coach, location, stadium } = req.body;

  console.log(req.body);
  try {
    const newTeam = new Team({ name, coach, location, stadium });
    await newTeam.save();
    res.status(201).send('Team created successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()
    console.log(teams)
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    res.status(200).json(team);
  } catch (error) {
    res.status(400).send('Error fetching team');
  }
});

// Add a player to a team
router.post('/:id/players', async (req, res) => {
  const { name, position } = req.body;
  try {
    const team = await Team.findById(req.params.id);
    const newPlayer = new Player({ name, position, team: team._id });
    await newPlayer.save();
    team.players.push(newPlayer);
    await team.save();
    res.status(201).send('Player added to team successfully');
  } catch (error) {
    res.status(400).send('Error adding player to team');
  }
});

module.exports = router;
