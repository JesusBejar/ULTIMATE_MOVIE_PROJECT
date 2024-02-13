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

app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  next();
});

app.use('/', require('./routes/index'));

// include the error handler in the application
app.use(errorHandler.errorHandler);

// add an event handler to catch unhandled errors
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// home page
app
// OAuth code starts here
// 1st part
.use(bodyParser.json())
.use(session({
    secret:'theBestAROUND12345',
    resave: false,
    saveUninitialized: true, 
}))
// basic express inicialization
.use(passport.initialize())
// init passport on every route call
.use(passport.session())
// let passport use express-session
.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-type, Accept, Z-key'
);
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
next();
})
// checks for traffic in routes/index.js
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({ origin: '*'}))
.use("/", require('./routes/index.js'))

// 2nd part
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(acessToken, refreshToken, profile, done) {
    return done(null, profile);
}))
// 2 functions to serialize and deserialize
passport.serializeUser((user, done) => {
    done(null, user)
})
    passport.deserializeUser((user, done) => {
    done(null, user)
})
// 2 endpoints
// 1st goes to the root
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : 'Logged Out')});
// 2nd goes to github which does a callback
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
})
      
app.get('/github/callback', passport.authenticate('github', {
failureRedirect: '/api-docs', session: false}),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
    
    app.get('/', (req, res) => {
        res.send(
          `<h1>Welcome to the Team 4 Movies Api Home Page.</h1><br><br>` +
            `<a href="/api-docs">Go to API Docs<a>`
        );
    })
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening on port ${port}`);
    });
  }
})