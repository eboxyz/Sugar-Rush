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
// VenmoStrategy helps setup a venmo authentication
// ??? Request
// ??? HTTP
// ??? Path
// Express Session allows you to set up sessions for the app
// Cookie Parser allows the app to store and read cookies
// ??? Dotenv lets you use the .env file
var express = require('express');
var app = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser'); // Lets you parse data
var logger = require('morgan'); // Logs messages to help you build
var mongoose = require('mongoose'); // Database npm
var passport = require('passport'); // Helps with authentication
var flash = require('connect-flash');
var VenmoStrategy = require('passport-venmo').Strategy; // ?
var request = require('request') //?
var users_controller = require('./controllers/usersController.js'); // ?
var http = require('http'); //
var path = require('path'); //
var expressSession = require('express-session'); // ??? allows seshes
var cookieParser = require('cookie-parser'); // Allows app to store cookies
var dotenv = require('dotenv').config(); // ??? Something with environment vars


////////////////////////////////////////////////////////////////////////
//                            Middleware?                             //
////////////////////////////////////////////////////////////////////////

// This connects the site to the local mongo-db
mongoose.connect('mongodb://localhost/sugar-rush');

// Allows access to usersController (was originally below request) and
// the user model
var users_controller = require('./controllers/usersController.js');
var User = require('./models/user.js')["User"];

// Loggs messages for development, as opposed to 'prod' for production
// All our assets can be stored in the public folder
// ??? App accesses overrides methods?
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride());

// Allows you to use json and clients like Insomia
// Second allows you to use url to post, view, delete, etc (rails does
// this automatically)
// Third lets the app read and save cookies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Allows access to the methods in the passport file
// ??? Starts up the passport module
// ??? Allows you to create sessions after login
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
///////////////
// app.set('views', path.join(__dirname, 'app/views'));
app.use(methodOverride());


//required for passport
app.use(expressSession({ secret: 'sugarspiceeverythingnice'}))
app.use(passport.initialize());
app.use(passport.session());






// All our assets can be stored in the public folder
app.use(express.static(__dirname + '/public'));





// Seed users

// Seeds restaurants
require('./db/seed.js').seedRestaurants();

////////////////////////////////////////////////////////////////////////
//        Routes (move everything below break to routes file)         //
////////////////////////////////////////////////////////////////////////



// Allows us to access and use the routes files.
// The '/' binds routes to that root.
// require('./config/routes')(passport);
// app.use('/', routes);


// Allows us to access and use the routes files and binds routes to '/'
var routes = require('./config/routes');
app.use('/', routes);

////////////////////////////////////////////////////////////////////////


//login controller
require('./controllers/loginController.js')(app, passport)

app.get('/users/test', users_controller.profile);

////////////////////////////////////////////////////////////////////////

// ??? What does app.engine do? How is it different from app.set?
// Sets the view engine to ejs, the localhost to 3000, and logs Ed's OCD
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.listen(3000);
console.log("Ed's OCD");







// app.set('views', path.join(__dirname, 'app/views'));
