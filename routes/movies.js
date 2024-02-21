const express = require('express');
const router = express.Router();
const validator = require('../middleware/validate');
const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)
// get all
router.get('/:id', moviesController.getSingle);
router.post('/', isAuthenticated, validator, moviesController.create);
router.put('/:id', isAuthenticated, validator, moviesController.update);
router.delete('/:id', moviesController.deleteMovies);

module.exports = router;
