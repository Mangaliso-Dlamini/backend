const express=require('express');
const router = express.Router();
const predictController= require('../controllers/predictController');

router.post('/', predictController.predict);

router.use(function(req, res) {
    res.status(404);
    res.render('404');
})

module.exports = router;
