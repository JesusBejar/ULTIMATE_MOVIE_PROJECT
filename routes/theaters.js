const express = require('express');
const router = express.Router();

// Here it is where the coltrolers and middleware should be in

const theatersController = require('../controllers/theaters');
//
//
//
//

// Routes for each request (CRUD)
// get all
router.get('/', theatersController.getAll);

//get one by ID
router.get('/:id', theatersController.getById);

module.exports = router;
