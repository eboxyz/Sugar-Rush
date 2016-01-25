////////////////////////////////////////////////////////////////////////
//                          Users Controller                          //
////////////////////////////////////////////////////////////////////////

// Grabs the User model for the mongo database
var User = require('../models/user')

////////////////////////////////////////////////////////////////////////

// Renders the home page. ??? what's going on with the ternary?
exports.index = function(req, res){
  res.render('users/home_page', {user: req.user ? JSON.stringify(req.user) : 'null'});
};

// Renders the user profile page. ??? what's going on with the ternary?
exports.authCallback = function(req, res) {
  res.render('users/profile', {user: req.user ? JSON.stringify(req.user) : 'null'});
};

// ??? Is this necessary?
exports.signin = function(req, res) {
  res.render('users/signin');
};

// Renders the page we're using to test if there's a current user,
// ??? what's going on with the ternary?
exports.profile = function(req, res) {
  console.log(req);
  res.render('users/test', {user: req.user});
}
