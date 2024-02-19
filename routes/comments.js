const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');
//
//
//
//

// Routes for each request (CRUD)
// get all
router.get('/', commentsController.getAll);
router.get('/:id', commentsController.getSingle);

module.exports = router;
