
const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/theaters", require("./theaters"));



module.exports = router;