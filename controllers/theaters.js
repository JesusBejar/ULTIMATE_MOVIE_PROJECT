const mongodb = require('../data/data');
const Object = require('mongodb').ObjectId;

// This is the idea of how it should look the creation and
// the information that we will handle.

// "id": numeric
// "name": string
// "location": string

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db('sample_mflix')
    .collection('theaters')
    .find();
  result.toArray().then((theaters) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(theaters);
  });
};

module.exports = { getAll };
