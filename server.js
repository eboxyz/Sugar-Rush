////////////////////////////////////////////////////////////////////////
//                             Server.js                              //
////////////////////////////////////////////////////////////////////////

// Express is the core framework
// App is a function in express with child functions that run the app
// ??? Method Override has something to do with the version of the app
// Body Parser lets you parse through data
// Logger logs messages and errors
// Mongoose allows you to manipulate data in the mongo database
// Passport helps with authentication
// Connect-flash helps with flashed error messages
// VenmoStrategy helps setup a venmo authentication
// ??? Request
// ??? HTTP
// ??? Path
// Express Session allows you to set up sessions for the app
// Cookie Parser allows the app to store and read cookies
// ??? Dotenv lets you use the .env file
//require handlebars
var express = require('express');
var app = express();
var Promise = require('bluebird')
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = Promise.promisifyAll(require('mongoose'));
var passport = require('passport');
var flash = require('connect-flash');
var VenmoStrategy = require('passport-venmo').Strategy;
// var request = require('request');
var users_controller = require('./controllers/usersController.js');
var http = require('http');
var path = require('path');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv').config();
var handlebars = require('handlebars');
var rp = require('request-promise');
var favicon = require('serve-favicon');

var credentials = require('./config/credentials.js')
////////////////////////////////////////////////////////////////////////
//                            Middleware?                             //
////////////////////////////////////////////////////////////////////////

// This connects the site to the local mongo-db
// mongoose.connect('mongodb://localhost/sugar-rush');

//this connects the app to heroku mongolab
mongoose.connect('mongodb://heroku_2115hf7x:gl9vaq0avhmbnbr3di4cdu2jtv@ds051645.mongolab.com:51645/heroku_2115hf7x')

mongoose.connect('mongodb://localhost/sugar-rush');

// Allows access to usersController (was originally below request) and
// the user model
// Maybe remove
var users_controller = require('./controllers/usersController.js');
var User = require('./models/user.js')["User"];

// Loggs messages for development, as opposed to 'prod' for production
// All our assets can be stored in the public folder
// ??? App accesses overrides methods?
// Flash is a package that allows for easy error messages
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(methodOverride());
app.use(flash());

// Allows you to use json and clients like Insomia
// Second allows you to use url to post, view, delete, etc (rails does
// this automatically)
// Third lets the app read and save cookies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allows access to the methods in the passport file
// ??? Starts up the passport module
// ??? Allows you to create sessions after login
// ??? expressSessaybe not necessary
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());
// app.use(expressSession({ secret: 'sugarspiceeverythingnice'}));

// Local express sessions. Use cookieParser with password
// In express.session, you can set a different storage (mongostore)
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({resave: true, saveUninitialized: true, secret: credentials.cookieSecret }));
// app.use(app.router);

// Seeds restaurants
require('./db/seed.js').seedRestaurants();

////////////////////////////////////////////////////////////////////////
//                               Routes                               //
////////////////////////////////////////////////////////////////////////

// Allows us to access and use the routes files and binds routes to '/'
var routes = require('./config/routes');
app.use('/', routes);

// With (app, passport), you don't have to require it on the login file
require('./controllers/loginController.js')(app, passport)

////////////////////////////////////////////////////////////////////////

// NEED BOTH app.engine and app.set (they're bros)
// Sets the view engine to ejs, the localhost to 3000, and logs Ed's OCD
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


console.log("Ed's OCD");


