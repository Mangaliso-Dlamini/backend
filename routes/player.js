const express = require('express');
const Player = require('../models/Player');
const Team = require('../models/Team');
const { ensureAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, position, team, jersey, age, games } = req.body;
    const newPlayer = new Player({ name, position, team, jersey, age, games });
    const teamToAssign= await Team.findById(req.body.team)

    await newPlayer.save();
    teamToAssign.players.push(newPlayer);
    await teamToAssign.save();
    res.redirect(req.get('referer')) 
  });

router.get('/', async (req, res) => {
    try {
      const players = await Player.find()
      res.status(200).send(players);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.get('/delete/:id', ensureAdmin, async (req, res) => {
    try {
      const player = await Player.findByIdAndDelete(req.params.id);
  
      if (!player) {
        return res.status(404).send();
      }
  
      res.redirect(req.get('referer'))
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
  module.exports = router;