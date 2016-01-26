////////////////////////////////////////////////////////////////////////

// Give variables to all the npms to make them easier to access.
var express = require('express'); // Express is the core framework
var app = express(); // Function in exress to run application
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


// This connects the site to the local mongo-db
mongoose.connect('mongodb://localhost/sugar-rush');



var User = require('./models/user.js')["User"];
require('./config/passport')(passport)


// Loggs messages for development, as opposed to 'prod' for production
app.use(logger('dev'));

// Allows you to use json and clients like Insomia
// Second allows you to use url to post, view, delete, etc (rails does
// this automatically)
// Third lets the app read and save cookies.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ??? Starts up the passport module
// ??? Allows you to create sessions after login
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
require('./db/seed.js').seedRestaurants();



// Allows us to access and use the routes files.
// The '/' binds routes to that root.
// require('./config/routes')(passport);
// app.use('/', routes);


//login controller
require('./controllers/loginController.js')(app, passport)

// Copied routes

// app.get('/', users_controller.index)

// app.get('/users/test', users_controller.profile);


// ?????
// Sets the view engine to ejs, now you don't need to include ejs in
// calling the view pages.
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.listen(3000);
console.log("Ed's OCD");

////////////////////////////////////////////////////////////////////////


