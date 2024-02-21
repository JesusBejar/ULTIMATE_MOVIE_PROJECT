const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const validator = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', isAuthenticated, validator.validateMovieData, moviesController.createMovie);
router.put('/:id', isAuthenticated, validator.validateMovieData, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
