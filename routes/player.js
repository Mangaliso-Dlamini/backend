const express = require('express');
const Player = require('../models/Player');
const Team = require('../models/Team');
const { ensureAdmin } = require('../middleware/auth');
const Performance = require('../models/Performance')

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, position, team, jersey, age, games } = req.body;
    const newPlayer = new Player({ name, position, team, jersey, age, games });
    const teamToAssign= await Team.findById(req.body.team)

    await newPlayer.save();
    teamToAssign.players.push(newPlayer);
    await teamToAssign.save();
    const performance = new Performance({player: newPlayer})
    await performance.save();
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
      const playerID = req.params.id;
      const player = await Player.findByIdAndDelete(playerID);
  
      if (!player) {
        return res.status(404).send('Player not found');
      }
  
      // Check if the player has a team associated
      if (player.team) {
        await Team.updateOne(
          { _id: player.team },
          { $pull: { players:playerID } }
        );
        console.log('Player removed successfully from team');
      }
  
      res.redirect(req.get('referer'));
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send(error.message);
    }
  });  
  
  module.exports = router;