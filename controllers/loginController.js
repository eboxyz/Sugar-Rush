var express = require('express');
var User = require('../models/user');

module.exports = function (app, passport){

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
      // LOGIN ===============================
      // show the login form
      // process the login form

      // SIGNUP =================================
      // show the signup form
      // process the signup form
  app.get('/', function (req,res){
    if(req.session && req.session.email){
      console.log(req.session)
      User.findOne( {email: req.session.email}).then( function (user){
        res.render('./users/home_page', {
          curr_user: user.email,
          users: null
        })
      })
    } else{
      User.findAsync({})
        .then( function (users){
          res.render('./users/home_page', {
            curr_user: null,
            users: users
          });
        }).catch();
    }
  });

  app.get('/local/login', function (req, res){
    console.log(req.session)
    if(req.session && req.session.email){
        User.findOne({ email: req.session.email }).then(function(user){
            res.render('./users/profile',{
                curr_user: user.email,
                users: null,
                message: req.flash('loginMessage') });
        })
    }
    else{
        User.findAsync({})
            .then( function (users){
                res.render('./users/login', {
                    curr_user: null,
                    users: users,
                    message: req.flash('loginMessage') });
            }).catch();
    }
});

  app.post('/local/login', passport.authenticate('local-login', {
    successRedirect: '/local/profile',
    failureRedirect: '/local/login',
    failureFlash: true //allow flashing
  }));

  app.get('/local/signup', function (req, res){
     if(req.session && req.session.email){
        User.findOne({ email: req.session.email }).then(function(user){
            res.render('./users/signup',{
                curr_user: user.email,
                users: null,
                message: req.flash('signupMessage') });
        })
    }
    else{
        User.findAsync({})
            .then( function (users){
                res.render('./users/signup', {
                    curr_user: null,
                    users: users,
                    message: req.flash('signupMessage') });
            }).catch();
    }
  });

  app.post('/local/signup', passport.authenticate('local-signup', {
    successRedirect: '/local/profile',
    failureRedirect: '/local/signup',
    failureFlash: true //allow flashing
  }))


//isLoggedin goes here
  app.get('/local/profile', function (req, res){

  console.log(req.session);
  console.log(req.session.passport.user)
    User.findById({_id: req.session.passport.user}, function (err, data){
      console.log(data.local.email)
    res.render('./users/profile.ejs', {
      user: data,
      curr_user: data.local.email,
      users: null,
    })
  })

  req.session.save();
  }
  );

    // =====================================
    // Venmo Authentication =====================
    // =====================================
    // route for venmo authentication and login
    app.get('/auth/venmo', passport.authenticate('venmo', {
      scope: ['access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
      failureRedirect: '/'
    }));

    app.get('/auth/venmo/callback', passport.authenticate('venmo', {
      successRedirect: '/local/profile',
      failureRedirect: '/'
    }));

    //logout
    app.get('/local/logout', function (req, res){
      req.logout();
      res.redirect('/');
    });

    app.use(function (req, res, next){
      res.locals.login = req.isAuthenticated();
      next();
    })

    app.use( function (req, res, next){
      app.locals.user = User.findById({_id : req.user})
      });
    //send to venmo for authentication
    // app.get('/connect/venmo', passport.authorize('venmo', {scope: 'email'}));

    // //callback after venmo authorizes
    // app.get('/connect/venmo/callback',
    //   passport.authorize('venmo',{
    //     successRedirect: './users/profile',
    //     failureRedirect: '/'
    //   }));


  //route middleware to make sure user is logged in
//   function isLoggedIn (req, res, next){

//     //if user is authenticated, then continue
//     if (req.isAuthenticated())
//       return next();
//     //if they aren't loggedin, redirect to home
//     res.redirect('/');
//   }
}
