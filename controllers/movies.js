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

module.exports = { getAll };
