const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Comments']
  //#swagger.description='Finds all comments'
  //#swagger.summary='Finds all comments'
  const result = await mongodb
    .getDatabase()
    .db('sample_mflix')
    .collection('comments')
    .find();
  result.toArray().then((Comments) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(Comments);
  });
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Comments']
  //#swagger.description='Finds a single comment by ID'
  //#swagger.summary='Finds one comment by its ID'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to get comment information.');
      return;
    }

    const commentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('comments')
      .find({ _id: departmentID })
      .toArray();


    if (!result) {
      res.status(404).json('Comment not found');
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res) => {
  //#swagger.tags=['Comments']
  //#swagger.description='Create a new comment'
  //#swagger.summary='Create a new comment'
  try {
    const comment = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,

    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('commets')
      .insertOne(comment);

    if (response.acknowledged > 0) {
      res.status(201).json({ message: 'Comment created successfully' });
    } else {
      res.status(500).json({ error: 'Comment creation failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  //#swagger.tags=['Comments']
  //#swagger.description='Update a comment in the database'
  //#swagger.summary='Update a comment'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid comment id to update comment information.');
      return;
    }

    const commentId = new ObjectId(req.params.id);
    const updatedComment = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('comments')
      .updateOne({ _id: commentId }, { $set: updatedComment });

    if (response.modifiedCount > 0) {
      res.status(202).send('Comment information updated successfully');
    } else {
      res.status(404).send('comment not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  //#swagger.tags=['Comments']
  //#swagger.description='Deletes a comment from the database'
  //#swagger.summary='Deletes a comment'
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid comment id to delete a comment.');
      return;
    }

    const commentId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('sample_mflix')
      .collection('comments')
      .deleteOne({ _id: commentId });

    if (response.deletedCount > 0) {
      res.status(202).send('Comment deleted successfully');
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createComment,
  updateComment,
  deleteComment,
};
