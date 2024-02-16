  const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

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

const getById = async (req, res, next) => {

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to get theater information.');
      return;
    }

    const departmentID = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('users')
      .find({ _id: departmentID })
      .toArray();

    if (!result || result.length === 0) {
      throw notFoundError();
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById };
