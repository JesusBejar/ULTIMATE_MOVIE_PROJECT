const express = require("express");
const router = express.Router();

// Here it is where the coltrolers and middleware should be in

const theatersController = require("../controllers/theaters");
//
//
//
//

// Routes for each request (CRUD)
router.get("/", theatersController.getAll);

module.exports = router;