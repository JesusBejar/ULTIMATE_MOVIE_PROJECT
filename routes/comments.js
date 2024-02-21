const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');
const validator = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)
// get all
router.get('/', commentsController.getAll);
router.get('/:id', commentsController.getSingle);
router.post('/', isAuthenticated, validator.validateComment, commentsController.createComment);
router.put('/:id', isAuthenticated, validator.validateComment,  commentsController.updateComment);
router.delete('/:id', isAuthenticated, commentsController.deleteComment);

module.exports = router;
