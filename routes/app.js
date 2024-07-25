const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.js');
const teamController = require("../controllers/team.js");
const playerController = require('../controllers/player.js')
const paymentController = require('../controllers/payment.js');
const performanceController = require('../controllers/performance.js');
const announcementController = require('../controllers/announcements.js')
const authMiddleware = require('../middleware/auth.js')

const formatDateAndTime = (matches) => {
    return matches.map(match => {
        const dateObj = new Date(match.date);
        match.dateOnly = dateObj.toLocaleDateString();
        match.timeOnly = dateObj.toLocaleTimeString();
        return match;
    });
};

const path = require('path');
const public = path.join(__dirname,'public');
router.use(express.static(public));

router.get('/login', async (req, res) => {
 const title = 'Log In';
 res.render('login',{title})
})

router.get('/register', async (req, res) => {
    const title = 'Register';
    res.render('register', {title})
   })
   
router.get('/', async(req, res)=> {
    const title = 'Home';
    const fixtures = await matchController.getNextFiveScheduledOrPostponedMatches()
    const results = await matchController.getLastFiveCompletedMatches()
    const formattedResults = formatDateAndTime(results);
    const formattedFixtures = formatDateAndTime(fixtures);
    res.render('index', {title, results: formattedResults, fixtures: formattedFixtures});
});

router.get('/dashboard', async(req, res)=>{
    console.log(req.session)
    const title = 'Dashboard';
    const nextMatch = await matchController.getNextScheduledMatch()
    const latestMatch = await matchController.getLatestMatch()
    const fixtures = await matchController.getNextFiveScheduledOrPostponedMatches()
    const results = await matchController.getLastFiveCompletedMatches()

    const formattedResults = formatDateAndTime(results);
    const formattedFixtures = formatDateAndTime(fixtures);

    
    nextMatch.dateOnly = nextMatch.date.toLocaleDateString();
    nextMatch.timeOnly = nextMatch.date.toLocaleTimeString();

   // latestMatch.dateOnly = latestMatch.date.toLocaleDateString();
    //latestMatch.timeOnly = latestMatch.date.toLocaleTimeString();


    res.render('dashboard', {title, nextMatch, latestMatch, results: formattedResults, fixtures: formattedFixtures})
});

router.get('/teams', async(req, res)=>{
    const title = 'Teams';
    const teams = await teamController.getAllTeamsWithPlayerCount();
    teams.forEach((team, index) => {
        team.index = index + 1;
    });
    res.render('teams', {title, teams})
});

router.get('/players', async(req, res)=>{
    const title = 'Players';
    const players =  await playerController.getAllPlayersWithTeamName();
    players.forEach((player, index) => {
        player.index = index + 1;
    });
    res.render('players', {title, players})
});

router.get('/matches', async (req, res) => {
    const title = 'Schedule';
    const { results, fixtures } = await matchController.getAllMatches();

    // Function to format date and time separately

    const formattedResults = formatDateAndTime(results);
    const formattedFixtures = formatDateAndTime(fixtures);

    res.render('matches', { title, results: formattedResults, fixtures: formattedFixtures });
});

/*router.get('/performance', async(req, res)=>{
    const title = 'Player Performance';
    //const seasonStats = await performanceController.getPerformanceMetrics("669f4d366761fca9af4d125a", "2024");
    const overallStats = await performanceController.getOverallPerformanceMetrics("669f4d366761fca9af4d125a");
    const player = await playerController.getPlayerWithTeamName("669f4d366761fca9af4d125a");
    console.log(overallStats)
    res.render('performance',{title, overallStats, player});
});*/

router.get('/performance/:id', async(req, res)=>{
    const title = 'Player Performance';
    console.log(req.params)
    //const seasonStats = await performanceController.getPerformanceMetrics(req.param.id, "2024");
    const overallStats = await performanceController.getOverallPerformanceMetrics(req.params.id);
    const player = await playerController.getPlayerWithTeamName(req.params.id);
    console.log(overallStats)
    res.render('performance',{title, overallStats, player});
});

router.get('/messages', async(req, res)=>{
    const title = 'Messanger';
    res.render('messages', {title})
});

router.get('/leagues', async(req, res)=>{
    const title = 'Leagues';
    res.render('leagues', {title})
});

router.get('/training', async(req, res)=>{
    const title = 'Traing Sessions';
    res.render('training', title);
})

router.get('/payments', async(req, res)=>{
    const title = 'Payments';
    const payments = await paymentController.getAllPayments();
    payments.forEach((payment, index) => {
        payment.index = index + 1;
    });
   console.log(payments)
    res.render('payments', {title, payments})
})

router.get('/recommender', async(req, res)=>{
    const title = 'Training Focus Recommender';
    res.render('recommender', {title});
});


router.get('/announcements', async(req, res)=>{
    const title = 'Announcements';
    const announcements = await announcementController.getAnnouncements();
    res.render('announcements', {title, announcements})
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