var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure',
  })
);

///////// need to have authentication middleware to protect server side

router.get('/success', (req, res, next) => {
  res.send({
    isLoggedIn: true
  })
});

router.get('/failure', (req, res, next) => {
  res.send({
    isLoggedIn: false
  })
});

module.exports = router;
