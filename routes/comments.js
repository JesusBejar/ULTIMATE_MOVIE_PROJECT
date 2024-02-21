const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');
//
//
//
//
const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)
// get all
router.get('/', commentsController.getAll);
router.get('/:id', commentsController.getSingle);
router.post('/', commentsController.createComment);
router.put('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
