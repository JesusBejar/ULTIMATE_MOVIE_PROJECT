const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

// import error handling
const {
  emptyDbError,
  notFoundError,
  internalServerError,
} = require('../middleware/errors');

// This is the idea of how it should look the creation and
// the information that we will handle.

// "id": numeric
// "name": string
// "location": string

const getAll = async (req, res) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Finds all theaters'
  //#swagger.summary='Finds all theaters'
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

const getById = async (req, res, next) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Finds a single theater by ID'
  //#swagger.summary='Finds one theater by its ID'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to get theater information.');
      return;
    }

    const departmentID = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('theaters')
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
