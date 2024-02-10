const router = require('express').Router();

router.use('/', require('./swagger.js'));

router.use('/theaters', require('./theaters'));
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/movies', require('./movies'));

module.exports = router;
