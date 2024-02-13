const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

// This is the idea of how it should look the creation and
// the information that we will handle.

// "id": numeric
// "username": string
// "email": email
// "password": password

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Finds all users'
  //#swagger.summary='Finds all users'
  const result = await mongodb
    .getDatabase()
    .db('sample_mflix')
    .collection('users')
    .find();
  result.toArray().then((users) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(users);
  });
};

module.exports = { getAll };
