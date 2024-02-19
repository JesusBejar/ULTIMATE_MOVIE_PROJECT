const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const validator = require('../middleware/validate');

// Routes for each request (CRUD)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.post('/', validator, userController.createUser);
router.put('/:id', validator, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;


