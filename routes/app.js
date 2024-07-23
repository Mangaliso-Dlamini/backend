const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.js');
const teamController = require("../controllers/team.js");
const playerController = require('../controllers/player.js')
const paymentController = require('../controllers/payment.js');
const performanceController = require('../controllers/performance.js');
const mongoose = require('mongoose');
const {Types} = mongoose;



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
    const nextMatchMatch = await matchController.getNextScheduledMatch()
    const latestMatch = await matchController.getLatestMatch()
    const fixtures = await matchController.getNextFiveScheduledOrPostponedMatches()
    const results = await matchController.getLastFiveCompletedMatches()
    res.render('dashboard', {nextMatchMatch, latestMatch, fixtures, results})
});

router.get('/teams', async(req, res)=>{
    const teams = await teamController.getAllTeamsWithPlayerCount();
    teams.forEach((team, index) => {
        team.index = index + 1;
    });
    res.render('teams', {teams})
});

router.get('/players', async(req, res)=>{
    const players =  await playerController.getAllPlayersWithTeamName();
    players.forEach((player, index) => {
        player.index = index + 1;
    });
    res.render('players', {players})
});

router.get('/matches', async(req, res)=>{
    const { results, fixtures } = await matchController.getAllMatches();
    res.render('matches', { results, fixtures } )
});

router.get('/performance', async(req, res)=>{
    const seasonStats = await performanceController.getPerformanceMetrics("669f4d366761fca9af4d125a", "2024");
    console.log(seasonStats)
    res.render('performance',{seasonStats})
});

router.get('/messages', async(req, res)=>{
    res.render('messages')
});

router.get('/leagues', async(req, res)=>{
    res.render('leagues')
});

router.get('/training', async(req, res)=>{
    res.render('training');
})

router.get('/payments', async(req, res)=>{
   const payments = await paymentController.getAllPayments();
   payments.forEach((payment, index) => {
    payment.index = index + 1;
    });
   console.log(payments)
    res.render('payments', {payments})
})

router.get('/recommender', async(req, res)=>{
    res.render('recommender');
});

router.get('/messages', async(req, res)=>{
    res.render('messages')
})

router.get('/news', async(req, res)=>{
    res.render('news')
})

router.get('/logout', async(req, res)=>{
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
})

module.exports = router;