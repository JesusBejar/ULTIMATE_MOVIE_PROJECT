const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const validator = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.post('/', isAuthenticated, validator, userController.createUser);
router.put('/:id', isAuthenticated, validator, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;


