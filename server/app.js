var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const { pool } = require("./pool-config");

// Authentication dependencies
const bodyParser = require('body-parser'); // parser middleware
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const LocalStrategy = require('passport-local').Strategy;
const { v4: uuidv4 } = require('uuid'); // uuid, To call: uuidv4();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Authentication session
app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: "%M&zg2)n|Gmu/tfnOT!MBk<gxSNlf",
  resave: false, 
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 1000}
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
  email: 'email',
  password: 'password',
  passReqToCallback: true,
},
  function(req, email, password, done) {
    console.log('POOL QUERY IS BEING CALLED')
    pool.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
      if (err) 
      return done(err);
      if (!result.rows.length) {
        console.log('No user found!!!!!!!!!!!!!')
        return done(null, false)
      }
      if (!( result.rows[0].password == password)) {
        console.log('Wrong password!!!!!!!!!!!')
        return done(null, false)
      }
      return done(null, result.rows[0])
    });
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
/////////////////

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts("html")) {
    res.render("error", { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }
  // default to plain-text. send()
  res.type("txt").send("Not found");
});


module.exports = app;
