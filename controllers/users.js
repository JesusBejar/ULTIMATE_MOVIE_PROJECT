const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Finds all users'
  //#swagger.summary='Finds all users'
  try {
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('users')
      .find()
      .toArray();

    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleUser = async (req, res, next) => {
  //#swagger.tags=['Users']
  //#swagger.description='Finds a single user'
  //#swagger.summary='Finds a single user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to get user information.');
      return;
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('users')
      .findOne({ _id: userId });

    if (!result) {
      res.status(404).json('User not found');
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Create a new user'
  //#swagger.summary='Create a new user'

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('users')
      .insertOne(user);

    if (response.acknowledged > 0) {
      res.status(201).json('User created successfully');
    } else {
      res.status(500).json({ error: 'User creation failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Update a user in the database'
  //#swagger.summary='Update a user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to update user information.');
      return;
    }

    const userId = new ObjectId(req.params.id);
    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('users')
      .updateOne({ _id: userId }, { $set: updatedUser });

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'User information updated successfully' });
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.description='Deletes a user from the database'
  //#swagger.summary='Deletes a user'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to delete a user.');
      return;
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('users')
      .deleteOne({ _id: userId }, true);

    if (response.deletedCount > 0) {
      res.status(200).json('User deleted successfully');
    } else {
      res.status(404).json('User not found');
    }
  } catch (error) {
    res.status(500).json(response.error || "Some error occurred. Try again.");
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
