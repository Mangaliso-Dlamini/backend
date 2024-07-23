const express = require('express');
const Player = require('../models/Player');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, position, team, jersey, age, games } = req.body;
    const newPlayer = new Player({ name, position, team, jersey, age, games });
    await newPlayer.save();
    res.redirect('/'); // Redirect to a success page or homepage
  });

router.get('/', async (req, res) => {
    try {
      const players = await Player.find()
      res.status(200).send(players);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  module.exports = router;