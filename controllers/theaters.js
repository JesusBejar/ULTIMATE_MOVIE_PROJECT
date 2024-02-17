const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Finds all the theaters'
  //#swagger.summary='Finds all the theaters'
  try {
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('theaters')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Finds a single theater'
  //#swagger.summary='Finds a single theater'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid id to get theater information.');
    }

    const theaterId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('theaters')
      .findOne({ _id: theaterId });

    if (!result) {
      return res.status(404).json('Theater not found');
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTheater = async (req, res) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Create a new theater'
  //#swagger.summary='Create a new theater'
  try {
    const theater = {
      name: req.body.name,
      location: req.body.location,
      address: req.body.address,
      street1: req.body.street1,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('theaters')
      .insertOne(theater);

    res.status(201).json({ message: 'Theater created successfully', theater: response.ops[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTheater = async (req, res) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Update a theater'
  //#swagger.summary='Update a theater'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid theater id to update theater information.');
    }

    const theaterId = new ObjectId(req.params.id);
    const updatedTheater = {
      name: req.body.name,
      location: req.body.location,
      address: req.body.address,
      street1: req.body.street1,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('theaters')
      .updateOne({ _id: theaterId }, { $set: updatedTheater });

    if (response.modifiedCount > 0) {
      return res.status(200).json('Theater information updated successfully');
    } else {
      return res.status(404).json('Theater not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTheater = async (req, res) => {
  //#swagger.tags=['Theaters']
  //#swagger.description='Delete a theater'
  //#swagger.summary='Delete a theater'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid theater id to delete a theater.');
    }

    const theaterId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('theaters')
      .deleteOne({ _id: theaterId });

    if (response.deletedCount > 0) {
      return res.status(200).json('Theater deleted successfully');
    } else {
      return res.status(404).json('Theater not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTheater,
  updateTheater,
  deleteTheater,
};

