const express = require('express');
const router = express.Router();
const validator = require('../middleware/validate');
const moviesController = require('../controllers/movies');

// Routes for each request (CRUD)
// get all
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', validator, moviesController.create);
router.put('/:id', validator, moviesController.update);
router.delete('/:id', moviesController.deleteMovies);

module.exports = router;
