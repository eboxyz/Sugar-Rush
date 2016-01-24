var User = require('../models/user')

/**
 * Module dependencies.
 */
// var Venmo = require('venmo');
// var venmo = new Venmo(client_id, client_secret);


exports.index = function(req, res){
  res.render('users/home_page', {user: req.user ? JSON.stringify(req.user) : 'null'});
};
/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
  res.render('users/profile', {user: req.user ? JSON.stringify(req.user) : 'null'});
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
  res.render('users/signin');
};

exports.profile = function(req, res) {
  res.render('users/test', {user: req.user ? JSON.stringify(req.user) : 'null'});
}

// , {user: req.user}
