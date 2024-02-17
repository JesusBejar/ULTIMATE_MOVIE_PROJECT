const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theaters');
const validator = require('../middleware/validate');

// Routes for theaters
router.get('/', theaterController.getAll);
router.get('/:id', theaterController.getSingle);
router.post('/', validator, theaterController.createTheater);
router.put('/:id', validator, theaterController.updateTheater);
router.delete('/:id', theaterController.deleteTheater);

module.exports = router;

