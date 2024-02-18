const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
//
//
//
//

// Routes for each request (CRUD)
// get all
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', moviesController.createMovie);
// router.put('/:id',moviesController.updatemovies);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
