const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const passport = require('passport');
const session = require('express-session');
require('./config/passport');

const mustache = require('mustache-express')
app.engine('mustache', mustache());
app.set('view engine', 'mustache');


const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));

app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const authRoute = require('./routes/auth');
const teamRoute = require('./routes/team');
const scheduleRoute = require('./routes/schedule');
const messageRoute = require('./routes/messages');
const performanceRoute = require('./routes/performance');
const appRoutes = require('./routes/app');
const paymentRoutes = require('./routes/payment');
const predictRoutes = require('./routes/predictRoutes');
const messagesRouter = require('./routes/messages');
const announcementRouter = require('./routes/announcements')
app.use('/announcements', announcementRouter);
app.use('/messages', messagesRouter);
app.use('/', appRoutes);
app.use('/api/performance', performanceRoute);
app.use('/api/messages', messageRoute);
app.use('/api/schedules', scheduleRoute);
app.use('/api/teams', teamRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', paymentRoutes);
app.use('/predict', predictRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://mdlamini:hQcXeAtFUeKyQtEx@hp.54gjgph.mongodb.net/?retryWrites=true&w=majority&appName=HP')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// Example root route
app.get('/', (req, res) => {
  res.send('Welcome to Grassroots Football Management Platform');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));