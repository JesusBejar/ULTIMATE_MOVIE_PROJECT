const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const validator = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

// Routes for each request (CRUD)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.post('/', isAuthenticated, validator.validateUserData, userController.createUser);
router.put('/:id', isAuthenticated, validator.validateUserData, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;


