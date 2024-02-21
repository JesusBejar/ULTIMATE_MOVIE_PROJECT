const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
//
//
//
//
const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)
// get all
router.get('/', moviesController.getAll);

module.exports = router;
