const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger.js'));

router.use('/theaters', require('./theaters'));
router.use('/users', require('./users'));
router.use('/comments', require('./comments'));
router.use('/movies', require('./movies'));

app.use(passport.initialize());
app.use(passport.session());

// login
router.use(
  '/login',
  passport.authenticate('github', (req, res) => {})
);
// logout
router.use('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
