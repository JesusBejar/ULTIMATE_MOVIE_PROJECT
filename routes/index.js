const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger.js'));

router.use('/theaters', require('./theaters'));
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/movies', require('./movies'));

// login
router.use(
  '/login',
  passport.authenticate('github'), (req, res) => {}
);
// logout
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
