const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theaters');
const validator = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

// Routes for theaters
router.get('/', theaterController.getAll);
router.get('/:id', theaterController.getSingle);
router.post('/', isAuthenticated, validator, theaterController.createTheater);
router.put('/:id', isAuthenticated, validator, theaterController.updateTheater);
router.delete('/:id', isAuthenticated, theaterController.deleteTheater);

module.exports = router;

