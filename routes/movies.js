const express = require('express');
const router = express.Router();
const validator = require('../middleware/validate');
const moviesController = require('../controllers/movies');
//
//
//
//
const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingleMovie);
router.post('/', isAuthenticated, validator, moviesController.createMovie);
router.put('/:id', isAuthenticated, validator, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
