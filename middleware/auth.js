module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  
  ensureAdmin: (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      return next();
    }
    res.send('Requires Admin Privileges');
  },
  
  ensureCoach: (req, res, next) => {
    if (req.session.user && req.session.user.role === 'coach') {
      return next();
    }
    res.send('Requires Coach Privileges');
  }
};

  