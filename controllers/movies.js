const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Movies']
  //#swagger.description='Finds all movies'
  //#swagger.summary='Finds all movies'
  const result = await mongodb
    .getDatabase()
    .db('sample_mflix')
    .collection('movies')
    .find();
  result.toArray().then((movies) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(movies);
  });
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description='Finds a single user'
  //#swagger.summary='Finds a single user'
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

const create = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Create a new user'
  //#swagger.summary='Create a new user'
  try {
    const movie = {
      id: req.body.id,
      plot: req.body.plot,
      genres: req.body.genres,
      runtime: req.body.genres,
      num_mflix_comments: req.body.num_mflix_comments,
      title: req.body.title,
      fullplot: req.body.fullplot,
      languages: req.body.languages,
      fullplot: req.body.fullplot,
      released: req.body.released,
      directors: req.body.directors,
      fullplot: req.body.fullplot,
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('movies')
      .insertOne(movie);

    res.status(201).json({ message: 'Movie created successfully', movie: response.ops[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const update = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Update a user in the database'
  //#swagger.summary='Update a user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to update movie information.');
      return;
    }

    const movieId = new ObjectId(req.params.id);
    const update = {
      id: req.body.id,
      plot: req.body.plot,
      genres: req.body.genres,
      runtime: req.body.genres,
      num_mflix_comments: req.body.num_mflix_comments,
      title: req.body.title,
      fullplot: req.body.fullplot,
      languages: req.body.languages,
      fullplot: req.body.fullplot,
      released: req.body.released,
      directors: req.body.directors,
      fullplot: req.body.fullplot,
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

const deleteMovies = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Deletes a user from the database'
  //#swagger.summary='Deletes a user'
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
  getSingle,
  create,
  update,
  deleteMovies,
};
