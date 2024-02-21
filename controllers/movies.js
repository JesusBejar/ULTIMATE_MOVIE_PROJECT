const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Movies']
  //#swagger.description='Finds all the movies'
  //#swagger.summary='Finds all the movies'
  try {
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('movies')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleMovie = async (req, res, next) => {
  //#swagger.tags=['Movies']
  //#swagger.description='Finds a single movie'
  //#swagger.summary='Finds a single movie'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to get movie information.');
      return;
    }

    const movieId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('movies')
      .findOne({ _id: movieId });

    if (!result) {
      res.status(404).json('Movie not found');
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  //#swagger.description='Create a new movie'
  //#swagger.summary='Create a new movie'
  try {
    const movie = {
      plot: req.body.plot,
      genres: req.body.genres,
      runtime: req.body.runtime,
      cast: req.body.cast,
      poster: req.body.poster,
      title: req.body.title,
      fullplot: req.body.fullplot,
      languages: req.body.languages,
      released: req.body.released,
      directors: req.body.directors,
      rated: req.body.rated,
      awards: {
        wins: req.body.awards.wins,
        nominations: req.body.awards.nominations,
        text: req.body.awards.text,
        lastupdated: req.body.awards.lastupdated,
      },
      year: req.body.year,
      imdb: {
        rating: req.body.imdb.rating,
        votes: req.body.imdb.votes,
        id: req.body.imdb.id,
      },
      countries: req.body.countries,
      type: req.body.type,
      tomatoes: {
        viewer: {
          rating: req.body.tomatoes.viewer.rating,
          numReviews: req.body.tomatoes.viewer.numReviews,
          meter: req.body.tomatoes.viewer.meter,
          fresh: req.body.tomatoes.viewer.fresh,
        },
        critic: {
          rating: req.body.tomatoes.critic.rating,
          numReviews: req.body.tomatoes.critic.numReviews,
          meter: req.body.tomatoes.critic.meter,
          rotten: req.body.tomatoes.critic.rotten,
          lastUpdated: req.body.tomatoes.critic.lastUpdated,
        },
      },
      num_mflix_comments: req.body.num_mflix_comments,
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('movies')
      .insertOne(movie);

    res
      .status(201)
      .json({ message: 'Movie created successfully', movie: response.ops[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  //#swagger.description='Update a movie in the database'
  //#swagger.summary='Update a movie'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid movie id to update movie information.');
      return;
    }

    const movieId = new ObjectId(req.params.id);
    const update = {
      plot: req.body.plot,
      genres: req.body.genres,
      runtime: req.body.runtime,
      cast: req.body.cast,
      poster: req.body.poster,
      title: req.body.title,
      fullplot: req.body.fullplot,
      languages: req.body.languages,
      released: req.body.released,
      directors: req.body.directors,
      rated: req.body.rated,
      awards: {
        wins: req.body.awards.wins,
        nominations: req.body.awards.nominations,
        text: req.body.awards.text,
        lastupdated: req.body.awards.lastupdated,
      },
      year: req.body.year,
      imdb: {
        rating: req.body.imdb.rating,
        votes: req.body.imdb.votes,
        id: req.body.imdb.id,
      },
      countries: req.body.countries,
      type: req.body.type,
      tomatoes: {
        viewer: {
          rating: req.body.tomatoes.viewer.rating,
          numReviews: req.body.tomatoes.viewer.numReviews,
          meter: req.body.tomatoes.viewer.meter,
          fresh: req.body.tomatoes.viewer.fresh,
        },
        critic: {
          rating: req.body.tomatoes.critic.rating,
          numReviews: req.body.tomatoes.critic.numReviews,
          meter: req.body.tomatoes.critic.meter,
          rotten: req.body.tomatoes.critic.rotten,
          lastUpdated: req.body.tomatoes.critic.lastUpdated,
        },
      },
      num_mflix_comments: req.body.num_mflix_comments,
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('movies')
      .updateOne({ _id: movieId }, { $set: update });

    if (response.modifiedCount > 0) {
      res.status(200).json('Movie information updated successfully');
    } else {
      res.status(404).json('Movie not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  //#swagger.description='Deletes a movie from the database'
  //#swagger.summary='Deletes a movie'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to delete a movie.');
      return;
    }

    const movieId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('movies')
      .deleteOne({ _id: movieId });

    if (response.deletedCount > 0) {
      res.status(200).json('Movie deleted successfully');
    } else {
      res.status(404).json('Movie not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
