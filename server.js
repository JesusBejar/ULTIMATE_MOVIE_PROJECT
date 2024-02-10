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

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening on port ${port}`);
    });
  }
});
