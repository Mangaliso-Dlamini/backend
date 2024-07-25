const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, name, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const newUser = new User({ username,name, password, role });
    await newUser.save();
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login endpoint
/*router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true 
  })
);*/

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.user = { role: user.role };
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// Google OAuth endpoint
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google OAuth callback endpoint
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

module.exports = router;
