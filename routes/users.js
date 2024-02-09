const express = require("express");
const router = express.Router();

// Here it is where the coltrolers and middleware should be in

const userController = require("../controllers/users");
//
//
//
//

// Routes for each request (CRUD)
router.get("/", userController.getAll);

module.exports = router;