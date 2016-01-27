////////////////////////////////////////////////////////////////////////
//                          Users Controller                          //
////////////////////////////////////////////////////////////////////////

// Grabs the User model for the mongo database
var User = require('../models/user');
var mongoose = require('mongoose')

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
};

// Render user prof
exports.show = function(req, res) {
  res.render('users/profile');
},

//show all users
exports.showUsers = function (req, res, next){
  User.find({}, function (err, users){
    res.json(users);
  })
},

exports.createUser = function (req, res, next){
  var newUser = new User();
  var keys = Object.keys(req.body);
  keys.forEach (function (key){
    newUser[key] = req.body[key];
  });
  newUser.save(function (err){
    if(err) console.log(err);
    else res.send('user created')
  });
};


//editUser
exports.editUserForm = function (req, res, next){
    res.render('users/edit')
};

exports.editUser = function (req, res, next){
  User.findById({_id: req.params.id}, function (err, user){
    var keys = Object.keys(req.body.local);
    keys.forEach(function(key){
      user.local[key] = req.body.local[key];
    });
    user.local.save();
  });
  res.send('user updated')
};

//deleteUser
exports.deleteUser = function (req, res, next){
  User.findOneAndRemove({_id: req.params.id}, function (err, data){
    if (err) res.json('user not deleted');
    else res.json('user has been deleted')
  })
}

