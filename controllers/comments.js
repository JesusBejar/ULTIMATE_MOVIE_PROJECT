const mongodb = require('../data/data');
const ObjectId = require('mongodb').ObjectId;

// This is the idea of how it should look the creation and
// the information that we will handle.

//     "id": numeric
//     "user_id": numeric
//     "movie_id": numeric
//     "content": string

const getAll = async (req, res) => {
  //#swagger.tags=['Comments']
  //#swagger.description='Finds all comments'
  //#swagger.summary='Finds all comments'
  const result = await mongodb
    .getDatabase()
    .db('sample_mflix')
    .collection('comments')
    .find();
  result.toArray().then((comments) => {
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(comments);
  });
};

module.exports = { getAll };
