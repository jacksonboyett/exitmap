var express = require('express');
var router = express.Router();
const passport = require('passport');

const { addExit, getExits } = require('../controllers/exitController')

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

///////// need to have authentication middleware to protect server side

router.get("/exits", (req, res) => {
  getInfo(req, res, getExits)
})


router.post('/exits', (req, res, next) => {
  const{ name, description, type, heightImpact, heightLanding, lat, long, city, state, country} = req.body.headers;
  addInfo(req, res, addExit, [
    name,
    description,
    type,
    heightImpact,
    heightLanding,
    lat,
    long,
    city, 
    state, 
    country,
  ])
})

// generic function to return all records from a table
async function getInfo(req, res, _function) {
  try {
    const info = await _function();
    res.json(info);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

// generic function to add data to postgres database
async function addInfo(req, res, _function, data) {
  try {
    const info = await _function(data);
    res.json(info);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.code);
  }
}


module.exports = router;
