// Identifying required modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Learn2Gather'); //Using the default port that MongoDB uses... If you've changed this in your version of MongoDB, you'll have to change the port to whatever you're using.
// JWT Authentication Stuff:
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cookie = require('cookies'); // Used to set and retrieve client's cookies
//var config = require('./models/config'); // get our config file


// Learn2Gather Routes
var index = require('./routes/index'); // home page
var userlist = require('./routes/userlist'); // list of all users for troubleshooting purposes
var signup = require('./routes/signup'); // users signing up for an account
var about = require('./routes/about'); // the 'about' page
var login = require('./routes/login'); // handling logins
var logout = require('./routes/logout'); // handling logging out of the session
var viewgroups = require('./routes/viewgroups'); // viewing the groups in the database
var makeagroup = require('./routes/makeagroup'); // making a study group
var joingroup = require('./routes/joingroup'); // joining an existing study group
var mygroups = require('./routes/mygroups'); // looking at a user's joined groups
var settings = require('./routes/settings'); // looking at the user's account settings
var search = require('./routes/search'); // searching the eisting study groups
var changegroup = require ('./routes/changegroup')

var app = express(); // creating an instance of the express middleware to handle routing

var port = process.env.PORT || 8080; // used to create, sign, and verify web tokens

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // using jade as the type of file we process

// Establishing the required modules to use in the app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
// This NEEDS to go before establishing our routes' functions, because this hooks up the database to all the routes.
app.use(function(req,res,next){
    req.db = db;
    next();
});
// declaring what route to use with each handle
app.use('/', index);
app.use('/userlist', userlist);
app.use('/signup', signup);
app.use('/about', about);
app.use('/login', login);
app.use('/logout', logout);
app.use('/viewgroups', viewgroups);
app.use('/makeagroup', makeagroup);
app.use('/joingroup', joingroup);
app.use('/mygroups', mygroups);
app.use('/settings', settings);
app.use('/search', search);
app.use('/changegroup', changegroup);

// Troubleshooting Errors
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
