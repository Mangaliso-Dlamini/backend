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
router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true 
  })
);

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
