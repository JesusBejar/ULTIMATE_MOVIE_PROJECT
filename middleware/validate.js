const validator = require("../validator/validator");

const validateUserData = (req, res, next) => {
  const rules = {
    name: 'required|string',
    email: 'required|email',
    password: 'required|string|min:6',
  };

  validator(req.body, rules, {}, (errors, isValid) => { 
    if (isValid) {
      next();
    } else {
      res.status(400).json({ errors });
    }
  });
};

const validateComment = (req, res, next) => {
  const rules = {
    name: 'required|string',
    email: 'required|email',
    movie_id: 'required|string',
    text: 'required|string',
  };

  validator(req.body, rules, {}, (errors, isValid) => { 
    if (isValid) {
      next();
    } else {
      res.status(400).json({ errors });
    }
  });
};
const validateMovieData = (req, res, next) => {
  const rules = {
    plot: 'required|string',
    genres: 'required|array',
    runtime: 'required|numeric',
    cast: 'required|array',
    poster: 'required|string',
    title: 'required|string',
    fullplot: 'required|string',
    languages: 'required|array',
    released: 'required|date',
    directors: 'required|array',
    rated: 'required|string',
    'awards.wins': 'required|numeric',
    'awards.nominations': 'required|numeric',
    'awards.text': 'required|string',
    'awards.lastupdated': 'required|date',
    year: 'required|numeric',
    'imdb.rating': 'required|numeric',
    'imdb.votes': 'required|numeric',
    'imdb.id': 'required|string',
    countries: 'required|array',
    type: 'required|string',
    'tomatoes.viewer.rating': 'required|numeric',
    'tomatoes.viewer.numReviews': 'required|numeric',
    'tomatoes.viewer.meter': 'required|numeric',
    'tomatoes.viewer.fresh': 'required|numeric',
    'tomatoes.critic.rating': 'required|numeric',
    'tomatoes.critic.numReviews': 'required|numeric',
    'tomatoes.critic.meter': 'required|numeric',
    'tomatoes.critic.rotten': 'required|numeric',
    'tomatoes.critic.lastUpdated': 'required|date',
    num_mflix_comments: 'required|numeric',
  };

  validator(req.body, rules, {}, (errors, isValid) => { 
    if (isValid) {
      next();
    } else {
      res.status(400).json({ errors });
    }
  });
};
const validateTheaterData = (req, res, next) => {
const rules = {
  name: 'required|string',
  location: 'required|string',
  address: 'required|string',
  street1: 'required|string',
  city: 'required|string',
  state: 'required|string',
  zipcode: 'required|string',
};

validator(req.body, rules, {}, (errors, isValid) => { 
  if (isValid) {
    next();
  } else {
    res.status(400).json({ errors });
  }
});

};
  module.exports = {
  validateUserData,
  validateComment,
  validateMovieData,
  validateTheaterData};