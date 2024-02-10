const router = require("express").Router();


router.use("/", require("./swagger.js"));

router.use("/theaters", require('./theaters'));
router.use("/users", require('./users'));

module.exports = router;