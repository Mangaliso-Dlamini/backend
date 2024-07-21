const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.js');
const teamController = require("../controllers/team.js");
const playerController = require('../controllers/player.js')

router.get('/login', async (req, res) => {
 res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register')
   })
   
router.get('/', async(req, res)=> {
    res.send('<div><h1>this will be the home page</h1><a href="register">Sign Up</a><a href="login">Log In</a></div>')
});

router.get('/dashboard', async(req, res)=>{
    const nextMatchMatch = matchController.getNextScheduledMatch()
    const latestMatch = matchController.getLatestMatch()
    const fixtures = matchController.getNextFiveScheduledOrPostponedMatches()
    const results = matchController.getLastFiveCompletedMatches()
    res.render('dashboard', {nextMatchMatch, latestMatch, fixtures, results})
});

router.get('/teams', async(req, res)=>{
    const teams = teamController.getAllTeamsWithPlayerCount();
    res.render('teams', {teams})
});

router.get('/players', async(req, res)=>{
    const players = playerController.getAllPlayersWithTeamName
    res.render('players', {players})
});

router.get('/matches', async(req, res)=>{
    const { results, fixtures } = matchController.getAllMatches();
    res.render('matches', { results, fixtures } )
});

router.get('/performance', async(req, res)=>{
    res.render('performance')
});

router.get('/messages', async(req, res)=>{
    res.render('messages')
});

router.get('/leagues', async(req, res)=>{
    res.render('leagues')
});

router.get('/payments', async(req, res)=>{
    res.render('payments')
})

router.get('/recommender', async(req, res)=>{
    res.render('recommender');
});

module.exports = router;