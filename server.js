const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const mongodb = require('./data/data');
const errorHandler = require('./middleware/errors');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Set up CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-type, Accept, Z-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

// Use routes
app.use('/', require('./routes/index'));

// Error handling middleware
app.use(errorHandler.errorHandler);

// OAuth related code
// OAuth middleware
app.use(session({
  secret: 'theBestAROUND12345',
  resave: false,
  saveUninitialized: true,
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport and OAuth routes
app.use('/', require('./routes/index.js'));

// Passport Github Strategy
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (acessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Home page route for logged-in user and user home.
app.get('/', (req, res) => {
  const message = req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out';
  res.send(
    `<h1>Welcome to the Team 4 Movies Api Home Page.</h1><br><br>` +
    `<a href="/api-docs">Go to API Docs<a>` +
    `<h2>${message}</h2>`
  );
});



// Github callback route
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

// Unhandled error handler
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// Start MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening on port ${port}`);
    });
  }
});
